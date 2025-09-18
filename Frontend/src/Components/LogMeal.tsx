import React, { useState, useEffect } from 'react';
import { Calendar, ChevronRight, Edit, Plus, Clock } from 'lucide-react';
import type {User, Mess, MealType, MealLog,FoodItem, ExpenseItem, MealFoodItem,} from "../lib/types.ts"


interface LogMealsProps {
  userId?: number;
  messId?: number;
  apiBaseUrl?: string;
  onEditMeal?: (mealLog: MealLog) => void;
  onLogMeal?: (mealType: string) => void;
}

const LogMeals: React.FC<LogMealsProps> = ({
  userId,
  messId,
  apiBaseUrl = 'http://localhost:8080/api',
  onEditMeal,
  onLogMeal
}) => {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [todaysMealLogs, setTodaysMealLogs] = useState<MealLog[]>([]);
  const [recentMealHistory, setRecentMealHistory] = useState<MealLog[]>([]);
  const [loading, setLoading] = useState(true);

  // Mock data for demonstration - replace with your API calls
  useEffect(() => {
    const fetchMealData = async () => {
      setLoading(true);
      
      // Mock today's meal logs
      const mockTodaysMeals: MealLog[] = [
        {
          meal_log_id: 1,
          user: {} as User,
          mess: {} as Mess,
          meal_type: { meal_type_id: 1, type: "Breakfast", meal_name: "Breakfast", is_active: true },
          meal_date: selectedDate,
          logged_at: `${selectedDate}T08:00:00`,
          logged_by: {} as User,
          notes: "Poha, Tea, Banana"
        },
        {
          meal_log_id: 2,
          user: {} as User,
          mess: {} as Mess,
          meal_type: { meal_type_id: 2, type: "Lunch", meal_name: "Lunch", is_active: true },
          meal_date: selectedDate,
          logged_at: `${selectedDate}T13:00:00`,
          logged_by: {} as User,
          notes: "Rice, Dal, Mixed Vegetables, Curd"
        }
      ];

      setTodaysMealLogs(mockTodaysMeals);

      // Mock recent meal history
      const mockRecentHistory: MealLog[] = [
        {
          meal_log_id: 3,
          user: {} as User,
          mess: {} as Mess,
          meal_type: { meal_type_id: 3, type: "Dinner", meal_name: "Dinner", is_active: true },
          meal_date: "2024-01-16",
          logged_at: "2024-01-16T20:30:00",
          logged_by: {} as User,
          notes: "Roti, Dal, Sabzi"
        },
        {
          meal_log_id: 4,
          user: {} as User,
          mess: {} as Mess,
          meal_type: { meal_type_id: 2, type: "Lunch", meal_name: "Lunch", is_active: true },
          meal_date: "2024-01-16",
          logged_at: "2024-01-16T13:15:00",
          logged_by: {} as User,
          notes: "Rice, Chicken Curry, Salad"
        },
        {
          meal_log_id: 5,
          user: {} as User,
          mess: {} as Mess,
          meal_type: { meal_type_id: 1, type: "Breakfast", meal_name: "Breakfast", is_active: true },
          meal_date: "2024-01-16",
          logged_at: "2024-01-16T08:45:00",
          logged_by: {} as User,
          notes: "Poha, Tea, Fruits"
        },
        {
          meal_log_id: 6,
          user: {} as User,
          mess: {} as Mess,
          meal_type: { meal_type_id: 3, type: "Dinner", meal_name: "Dinner", is_active: true },
          meal_date: "2024-01-14",
          logged_at: "2024-01-14T21:00:00",
          logged_by: {} as User,
          notes: "Biryani, Raita"
        }
      ];

      setRecentMealHistory(mockRecentHistory);
      setLoading(false);
    };

    fetchMealData();
  }, [selectedDate, userId, messId]);

  const getMealIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'breakfast': return '🍳';
      case 'lunch': return '🍛';
      case 'dinner': return '🍽️';
      default: return '🍴';
    }
  };

  const isMealLogged = (mealType: string) => {
    return todaysMealLogs.some(log => 
      log.meal_type.type.toLowerCase() === mealType.toLowerCase()
    );
  };

  const getMealDetails = (mealType: string) => {
    const meal = todaysMealLogs.find(log => 
      log.meal_type.type.toLowerCase() === mealType.toLowerCase()
    );
    return meal?.notes || "";
  };

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (date.toDateString() === yesterday.toDateString()) {
      return 'Yesterday';
    } else {
      const diffTime = today.getTime() - date.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return `${diffDays} days ago`;
    }
  };

  const loggedMealsCount = todaysMealLogs.length;
  const totalMeals = 3;
  const progressPercentage = Math.round((loggedMealsCount / totalMeals) * 100);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-4 lg:p-6">
        <div className="max-w-4xl mx-auto">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-gray-200 rounded w-48"></div>
            <div className="bg-white rounded-xl p-6 space-y-4">
              <div className="h-6 bg-gray-200 rounded w-40"></div>
              <div className="grid grid-cols-3 gap-4">
                {[1, 2, 3].map(i => (
                  <div key={i} className="h-32 bg-gray-200 rounded-lg"></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 lg:p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">Log Meals</h1>
          <p className="text-gray-600">Track your daily meals and maintain a healthy eating routine</p>
        </div>

        {/* Today's Meal Summary */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-semibold mb-4">Today's Meal Summary</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {/* Breakfast */}
            <div className="bg-green-50 border-2 border-green-200 rounded-lg p-4 relative">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center">
                  <span className="text-lg mr-2">🍳</span>
                  <span className="font-medium">Breakfast</span>
                </div>
                {isMealLogged('breakfast') && (
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs">✓</span>
                  </div>
                )}
              </div>
              <div className="text-sm text-green-600 font-medium">
                {isMealLogged('breakfast') ? 'Logged' : 'Not logged yet'}
              </div>
            </div>

            {/* Lunch */}
            <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-4 relative">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center">
                  <span className="text-lg mr-2">🍛</span>
                  <span className="font-medium">Lunch</span>
                </div>
                {isMealLogged('lunch') && (
                  <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs">✓</span>
                  </div>
                )}
              </div>
              <div className="text-sm text-blue-600 font-medium">
                {isMealLogged('lunch') ? 'Logged' : 'Not logged yet'}
              </div>
            </div>

            {/* Dinner */}
            <div className="bg-orange-50 border-2 border-orange-200 rounded-lg p-4 relative">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center">
                  <span className="text-lg mr-2">🍽️</span>
                  <span className="font-medium">Dinner</span>
                </div>
                {isMealLogged('dinner') && (
                  <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs">✓</span>
                  </div>
                )}
              </div>
              <div className="text-sm text-orange-600 font-medium">
                {isMealLogged('dinner') ? 'Logged' : 'Pending'}
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="flex items-center justify-between">
            <div>
              <span className="text-sm font-medium text-gray-700">Progress</span>
              <div className="text-lg font-bold text-gray-900">
                {loggedMealsCount} of {totalMeals} meals logged
              </div>
            </div>
            <div className="flex items-center">
              <div className="w-32 bg-gray-200 rounded-full h-2 mr-3">
                <div 
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${progressPercentage}%` }}
                ></div>
              </div>
              <span className="text-sm font-medium text-gray-700">{progressPercentage}%</span>
            </div>
          </div>
        </div>
    {/* Log Meals Section */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Log Meals</h2>
            <div className="flex items-center border border-gray-200 rounded-lg px-3 py-2">
              <Calendar className="w-4 h-4 text-gray-500 mr-2" />
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="text-sm border-none outline-none bg-transparent"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Breakfast Log */}
            <div className="bg-green-50 border-2 border-green-200 rounded-lg p-4">
              <div className="flex items-center mb-3">
                <span className="text-lg mr-2">🍳</span>
                <span className="font-medium">Breakfast</span>
                <span className="ml-auto text-xs px-2 py-1 rounded-full bg-green-100 text-green-700">
                  {isMealLogged('breakfast') ? 'Logged' : 'Pending'}
                </span>
              </div>
              
              <div className="text-sm text-gray-600 mb-3">
                {isMealLogged('breakfast') ? 'Today\'s Entry' : 'Not logged yet'}
              </div>
              
              {getMealDetails('breakfast') && (
                <div className="text-sm text-gray-800 mb-3 font-medium">
                  {getMealDetails('breakfast')}
                </div>
              )}

              <button 
                onClick={() => onLogMeal?.('breakfast')}
                className="w-full py-2 px-4 bg-green-600 cursor-pointer text-white rounded-lg font-medium hover:bg-green-700 transition-colors flex items-center justify-center"
              >
                {isMealLogged('breakfast') ? (
                  <>
                    <Edit className="w-4 h-4 mr-2" />
                    Edit Entry
                  </>
                ) : (
                  <>
                    <Plus className="w-4 h-4 mr-2" />
                    Log Meal
                  </>
                )}
              </button>
            </div>

            {/* Lunch Log */}
            <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-4">
              <div className="flex items-center mb-3">
                <span className="text-lg mr-2">🍛</span>
                <span className="font-medium">Lunch</span>
                <span className="ml-auto text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-700">
                  {isMealLogged('lunch') ? 'Logged' : 'Pending'}
                </span>
              </div>
              
              <div className="text-sm text-gray-600 mb-3">
                {isMealLogged('lunch') ? 'Today\'s Entry' : 'Not logged yet'}
              </div>
              
              {getMealDetails('lunch') && (
                <div className="text-sm text-gray-800 mb-3 font-medium">
                  {getMealDetails('lunch')}
                </div>
              )}

              <button 
                onClick={() => onLogMeal?.('lunch')}
                className="w-full py-2 px-4 bg-blue-600 cursor-pointer text-white rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center"
              >
                {isMealLogged('lunch') ? (
                  <>
                    <Edit className="w-4 h-4 mr-2" />
                    Edit Entry
                  </>
                ) : (
                  <>
                    <Plus className="w-4 h-4 mr-2" />
                    Log Meal
                  </>
                )}
              </button>
            </div>

            {/* Dinner Log */}
            <div className="bg-orange-50 border-2 flex flex-col border-orange-200 rounded-lg p-4">
              <div className="flex items-center mb-3">
                <span className="text-lg mr-2">🍽️</span>
                <span className="font-medium">Dinner</span>
                <span className="ml-auto text-xs px-2 py-1 rounded-full bg-orange-100 text-orange-700">
                  {isMealLogged('dinner') ? 'Logged' : 'Pending'}
                </span>
              </div>
              
              <div className="text-sm text-gray-600 mb-3">
                {isMealLogged('dinner') ? 'Today\'s Entry' : 'Click below to log your dinner'}
              </div>
              
              {getMealDetails('dinner') && (
                <div className="text-sm text-gray-800 mb-3 font-medium">
                  {getMealDetails('dinner')}
                </div>
              )}

                <div className="mt-auto">
    <button
      onClick={() => onLogMeal?.("dinner")}
      className="w-full py-2 px-4 bg-orange-600 text-white cursor-pointer rounded-lg font-medium hover:bg-orange-700 transition-colors flex items-center justify-center"
    >
      {isMealLogged("dinner") ? (
        <>
          <Edit className="w-4 h-4 mr-2" />
          Edit Entry
        </>
      ) : (
        <>
          <Plus className="w-4 h-4 mr-2" />
          Log Meal
        </>
      )}
    </button>
  </div>
            </div>
          </div>
        </div>
        {/* Recent Meal History */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Recent Meal History</h2>
            <button className="flex items-center text-blue-600 hover:text-blue-700 text-sm font-medium cursor-pointer">
              View All History
              <ChevronRight className="w-4 h-4 ml-1" />
            </button>
          </div>

          <div className="space-y-4">
            {recentMealHistory.map((meal) => (
              <div key={meal.meal_log_id} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0">
                <div className="flex items-center">
                  <span className="text-lg mr-3">{getMealIcon(meal.meal_type.type)}</span>
                  <div>
                    <div className="font-medium text-gray-900">{meal.meal_type.type}</div>
                    <div className="text-sm text-gray-600">{meal.notes}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-gray-600">
                    {formatDate(meal.meal_date)}
                  </div>
                  <div className="text-xs text-gray-500">
                    {formatTime(meal.logged_at)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

    
      </div>
    </div>
  );
};

export default LogMeals;