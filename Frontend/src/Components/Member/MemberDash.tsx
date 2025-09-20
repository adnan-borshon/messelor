import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { 
  Calendar, 
  DollarSign, 
  TrendingUp, 
  Utensils, 
  Eye, 
  Lightbulb, 
  Award, 
  Target,
  Star,
  Trophy,
  Gift,
  Heart,
  X,
  Clock,
  AlertTriangle,
  Loader
} from 'lucide-react';
import type { User, UserProfile, Mess, MessMember, MealLog, MealType, BazarExpense, FoodItem, MealFoodItem, MonthlyBill, NutritionalGoal, DailyNutritionSummary } from "@/lib/types"
import { Link } from 'react-router-dom';


interface DashboardProps {
  userId: number;
  messId: number;
  apiBaseUrl?: string;
}

const MemberDash: React.FC<DashboardProps> = ({ 
  userId=1, 
  messId=1, 
  apiBaseUrl = 'http://localhost:8080/api' 
}) => {
  // State for all dashboard data
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Individual data states
  const [user, setUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [mess, setMess] = useState<Mess | null>(null);
  const [todaysMeals, setTodaysMeals] = useState(0);
  const [monthlyBill, setMonthlyBill] = useState<MonthlyBill | null>(null);
  const [recentMealLogs, setRecentMealLogs] = useState<MealLog[]>([]);
  const [nutritionSummary, setNutritionSummary] = useState<DailyNutritionSummary | null>(null);
  const [monthlyExpenses, setMonthlyExpenses] = useState<BazarExpense[]>([]);
  const [mealStreak, setMealStreak] = useState(0);
  const [healthScore, setHealthScore] = useState(0);
  
  // Alert states
  const [showAlert1, setShowAlert1] = useState(true);
  const [showAlert2, setShowAlert2] = useState(true);

  // Fetch all required data
useEffect(() => {
  const fetchDashboardData = async () => {
    setLoading(true);
    setError(null);

    // Fetch user data
    try {
      const userResponse = await fetch(`${apiBaseUrl}/users/${userId}`);
      if (!userResponse.ok) throw new Error('Failed to fetch user data');
      const userData = await userResponse.json();

      setUser(userData);
    } catch (err) {
      console.error('User fetch error:', err);
      setUser(null); // or {}
    }

    // Fetch user profile
    try {
      const profileResponse = await fetch(`${apiBaseUrl}/user-profiles?user_id=${userId}`);
      if (!profileResponse.ok) throw new Error('Failed to fetch user profile');
      const profileData = await profileResponse.json();
      setUserProfile(profileData);
    } catch (err) {
      console.error('Profile fetch error:', err);
      setUserProfile(null); // or {}
    }

    // Fetch mess data
    try {
      const messResponse = await fetch(`${apiBaseUrl}/mess/${messId}`);
      if (!messResponse.ok) throw new Error('Failed to fetch mess data');
      const messData = await messResponse.json();
      setMess(messData);
    } catch (err) {
      console.error('Mess fetch error:', err);
      setMess(null);
    }

    // Fetch today's meals
    try {
      const today = new Date().toISOString().split('T')[0];
      const mealsResponse = await fetch(`${apiBaseUrl}/meal-logs?user_id=${userId}&meal_date=${today}`);
      if (!mealsResponse.ok) throw new Error('Failed to fetch meal logs');
      const mealsData = await mealsResponse.json();
      setTodaysMeals(mealsData.length);
    } catch (err) {
      console.error('Todays meals fetch error:', err);
      setTodaysMeals(0);
    }

    // Fetch recent meal logs
    try {
      const recentMealsResponse = await fetch(`${apiBaseUrl}/meal-logs?user_id=${userId}&limit=5&order=desc`);
      if (!recentMealsResponse.ok) throw new Error('Failed to fetch recent meals');
      const recentMealsData = await recentMealsResponse.json();
      setRecentMealLogs(recentMealsData);
    } catch (err) {
      console.error('Recent meals fetch error:', err);
      setRecentMealLogs([]);
    }

    // Fetch monthly bill
    try {
      const currentMonth = new Date().getMonth() + 1;
      const currentYear = new Date().getFullYear();
      const billResponse = await fetch(`${apiBaseUrl}/monthly-bills?user_id=${userId}&billing_month=${currentMonth}&billing_year=${currentYear}`);
      if (!billResponse.ok) throw new Error('Failed to fetch monthly bill');
      const billData = await billResponse.json();
      setMonthlyBill(billData[0] || null);
    } catch (err) {
      console.error('Monthly bill fetch error:', err);
      setMonthlyBill(null);
    }

    // Fetch nutrition summary
    try {
      const today = new Date().toISOString().split('T')[0];
      const nutritionResponse = await fetch(`${apiBaseUrl}/daily-nutrition-summary?user_id=${userId}&summary_date=${today}`);
      if (!nutritionResponse.ok) throw new Error('Failed to fetch nutrition data');
      const nutritionData = await nutritionResponse.json();
      setNutritionSummary(nutritionData[0] || null);
      calculateHealthScore(nutritionData[0]);
    } catch (err) {
      console.error('Nutrition fetch error:', err);
      setNutritionSummary(null);
    }

    // Fetch monthly expenses
    try {
      const currentMonth = new Date().getMonth() + 1;
      const currentYear = new Date().getFullYear();
      const expensesResponse = await fetch(`${apiBaseUrl}/bazar-expenses?mess_id=${messId}&month=${currentMonth}&year=${currentYear}`);
      if (!expensesResponse.ok) throw new Error('Failed to fetch expenses');
      const expensesData = await expensesResponse.json();
      setMonthlyExpenses(expensesData);
    } catch (err) {
      console.error('Expenses fetch error:', err);
      setMonthlyExpenses([]);
    }

    // Calculate meal streak (optional, can handle error inside function)
    try {
      await calculateMealStreak();
    } catch (err) {
      console.error('Meal streak calculation error:', err);
    }

    setLoading(false);
  };

  if (userId && messId) {
    fetchDashboardData();
  }
}, [userId, messId, apiBaseUrl]);


  // Calculate meal streak
  const calculateMealStreak = async () => {
    try {
      const streakResponse = await fetch(`${apiBaseUrl}/meal-logs/streak?user_id=${userId}`);
      if (!streakResponse.ok) throw new Error('Failed to fetch meal streak');
      const streakData = await streakResponse.json();
      setMealStreak(streakData.streak || 0);
    } catch (err) {
      console.error('Meal streak calculation error:', err);
      setMealStreak(0);
    }
  };

  // Calculate health score based on nutrition data
  const calculateHealthScore = (nutrition: DailyNutritionSummary | null) => {
    if (!nutrition || !userProfile) {
      setHealthScore(0);
      return;
    }

    let score = 0;
    
    // Basic scoring logic - you can customize this based on your requirements
    const caloriesTarget = 2000; // You might want to calculate this based on user profile
    const caloriesScore = Math.min(100, (nutrition.total_calories / caloriesTarget) * 100);
    
    const proteinTarget = 50; // grams
    const proteinScore = Math.min(100, (nutrition.total_protein / proteinTarget) * 100);
    
    const fiberTarget = 25; // grams
    const fiberScore = Math.min(100, (nutrition.total_fiber / fiberTarget) * 100);

    score = (caloriesScore + proteinScore + fiberScore) / 3;
    setHealthScore(Math.round(score));
  };

  // Calculate derived values
  const monthCost = monthlyBill?.total_amount || 0;
  const avgCostPerDay = monthCost > 0 ? Math.round(monthCost / new Date().getDate()) : 0;
  const dueInDays = monthlyBill ? Math.ceil((new Date(monthlyBill.due_date).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)) : 0;

  // Nutrition breakdown for pie chart
  const nutritionBreakdown = nutritionSummary ? [
    { 
      name: "Carbs", 
      value: Math.round((nutritionSummary.total_carbs * 4 / nutritionSummary.total_calories) * 100) || 0, 
      color: "#3B82F6" 
    },
    { 
      name: "Protein", 
      value: Math.round((nutritionSummary.total_protein * 4 / nutritionSummary.total_calories) * 100) || 0, 
      color: "#10B981" 
    },
    { 
      name: "Fats", 
      value: Math.round((nutritionSummary.total_fat * 9 / nutritionSummary.total_calories) * 100) || 0, 
      color: "#F59E0B" 
    },
  ] : [];

  // Add "Others" to make it 100%
  const totalNutrition = nutritionBreakdown.reduce((sum, item) => sum + item.value, 0);
  if (totalNutrition < 100) {
    nutritionBreakdown.push({
      name: "Others",
      value: 100 - totalNutrition,
      color: "#EF4444"
    });
  }

  const getIcon = (type: string) => {
    switch (type?.toLowerCase()) {
      case "breakfast": return "🍞";
      case "lunch": return "🍛";
      case "dinner": return "🍽️";
      default: return "🍴";
    }
  };

  // Mock achievements for now - you can create an achievements table later
  const achievements = [
    { name: "Streak Master", description: `${mealStreak} days logging streak`, icon: "streak" },
    { name: "Budget Saver", description: "Saved money this month", icon: "budget" },
    { name: "Healthy Eater", description: `${healthScore}+ health score`, icon: "health" }
  ];

  const getAchievementIcon = (type: string) => {
    switch (type) {
      case "streak": return <Star className="w-5 h-5 text-yellow-500" />;
      case "budget": return <Gift className="w-5 h-5 text-green-500" />;
      case "health": return <Heart className="w-5 h-5 text-red-500" />;
      default: return <Trophy className="w-5 h-5 text-blue-500" />;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader className="w-8 h-8 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <AlertTriangle className="w-8 h-8 text-red-600 mx-auto mb-4" />
          <p className="text-red-600 mb-4">Error: {error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 lg:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Alerts */}
        <div className="space-y-3 mb-6">
          {showAlert1 && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 flex items-center justify-between">
              <div className="flex items-center">
                <AlertTriangle className="w-4 h-4 text-yellow-600 mr-2 flex-shrink-0" />
                <span className="text-yellow-800 text-sm">
                  Unusual cost detected for vegetables today - 25% higher than average
                </span>
              </div>
              <button 
                onClick={() => setShowAlert1(false)}
                className="ml-2 flex-shrink-0"
              >
                <X className="w-4 h-4 text-yellow-600" />
              </button>
            </div>
          )}
          
          {showAlert2 && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 flex items-center justify-between">
              <div className="flex items-center">
                <Clock className="w-4 h-4 text-blue-600 mr-2 flex-shrink-0" />
                <span className="text-blue-800 text-sm">
                  Don't forget to log dinner by 9 PM - Only 2 hours left!
                </span>
              </div>
              <button 
                onClick={() => setShowAlert2(false)}
                className="ml-2 flex-shrink-0"
              >
                <X className="w-4 h-4 text-blue-600" />
              </button>
            </div>
          )}
        </div>

        {/* Top Stats Row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {/* Today's Meals */}
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-600 text-xs lg:text-sm">Today's Meals</span>
              <Utensils className="w-4 h-4 lg:w-5 lg:h-5 text-blue-500" />
            </div>
            <div className="text-xl lg:text-2xl font-bold text-gray-900">{todaysMeals}</div>
          </div>

          {/* This Month's Cost */}
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-600 text-xs lg:text-sm">This Month's Cost</span>
              <span className="text-green-600 font-semibold text-sm">Rs</span>
            </div>
            <div className="text-xl lg:text-2xl font-bold text-green-600">₹{monthCost.toLocaleString()}</div>
          </div>

          {/* Average Cost */}
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-600 text-xs lg:text-sm">Average Cost</span>
              <TrendingUp className="w-4 h-4 lg:w-5 lg:h-5 text-orange-500" />
            </div>
            <div className="text-xl lg:text-2xl font-bold text-orange-600">₹{avgCostPerDay}/day</div>
          </div>

          {/* Meal Streak */}
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-600 text-xs lg:text-sm">Meal Streak</span>
              <div className="w-6 h-6 lg:w-8 lg:h-8 bg-purple-100 rounded-full flex items-center justify-center">
                <span className="text-purple-600 text-xs font-bold">🔥</span>
              </div>
            </div>
            <div className="text-xl lg:text-2xl font-bold text-purple-600">{mealStreak}</div>
            <div className="text-xs text-purple-500">days</div>
          </div>
        </div>

        {/* Main Content - 3 Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Left Column */}
          <div className="space-y-6">
            {/* Log Meal Card */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="flex items-center mb-4">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                  <Utensils className="w-4 h-4 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold">Log Meal</h3>
              </div>
              <p className="text-gray-600 text-sm mb-4">Quick meal entry with AI suggestions</p>
             <Link to={`/${localStorage.getItem("username")}/log-meal`}>
              <button className="w-full cursor-pointer bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium">
                Log Now
              </button>
             </Link>
            </div>

            {/* Recent Meal Logs */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="text-lg font-semibold mb-4">Recent Meal Logs</h3>
              <div className="space-y-3">
                {recentMealLogs.length > 0 ? (
                  recentMealLogs.map((log, index) => (
                    <div key={log.meal_log_id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center">
                        <span className="text-lg mr-3">{getIcon(log.meal_type?.type)}</span>
                        <span className="text-sm text-gray-900">
                          {log.meal_type?.meal_name || 'Meal'} - {log.notes}
                        </span>
                      </div>
                      <span className="text-xs text-gray-500">
                        {new Date(log.logged_at).toLocaleDateString()}
                      </span>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-4 text-gray-500 text-sm">
                    No recent meals logged
                  </div>
                )}
              </div>
            </div>

            {/* Community Stats */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="text-lg font-semibold mb-4">Community Stats</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Your vs Average Cost</span>
                  </div>
                  <div className="text-lg font-bold text-green-600">
                    ₹{avgCostPerDay} 
                    <span className="text-sm text-gray-500"> vs ₹95 avg</span>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Ranking</span>
                  </div>
                  <div className="text-xl font-bold text-green-600">
                    #12 
                    <span className="text-sm text-gray-500"> out of {mess?.max_members || 50} members</span>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Logging Consistency</span>
                  </div>
                  <div className="text-xl font-bold text-blue-600">
                    95% 
                    <span className="text-sm text-gray-500"> vs 78% avg</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Middle Column */}
          <div className="space-y-6">
            {/* View Bill Card */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="flex items-center mb-4">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3">
                  <Eye className="w-4 h-4 text-green-600" />
                </div>
                <h3 className="text-lg font-semibold">View Bill</h3>
              </div>
              <p className="text-gray-600 text-sm mb-4">
                Current month: ₹{monthCost.toLocaleString()} | Due: {dueInDays} days
              </p>
              <Link to={`/${localStorage.getItem("username")}/billing`} >
              <button className="w-full cursor-pointer bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 transition-colors font-medium">
                View Details
              </button>
              </Link>
            </div>

            {/* Health Score */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="text-lg font-semibold mb-4">Health Score</h3>
              <div className="text-center mb-4">
                <div className="text-4xl font-bold text-green-600 mb-2">{healthScore}</div>
                <div className="text-sm text-gray-600">
                  {healthScore >= 85 ? 'Excellent' : healthScore >= 70 ? 'Good' : 'Needs Improvement'}
                </div>
              </div>
              
              <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                <div 
                  className="bg-green-600 h-2 rounded-full transition-all duration-500" 
                  style={{ width: `${Math.min(healthScore, 100)}%` }}
                ></div>
              </div>
              
              <div className="space-y-2 text-xs">
                <div>• Balanced nutrition: 90%</div>
                <div>• Regular meals: 85%</div>
                <div>• Variety score: 80%</div>
              </div>
            </div>

            {/* Nutritional Breakdown */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="text-lg font-semibold mb-4">Nutritional Breakdown</h3>
              {nutritionBreakdown.length > 0 && nutritionSummary ? (
                <>
                  <div className="h-48 mb-4">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={nutritionBreakdown}
                          cx="50%"
                          cy="50%"
                          innerRadius={40}
                          outerRadius={80}
                          paddingAngle={5}
                          dataKey="value"
                        >
                          {nutritionBreakdown.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {nutritionBreakdown.map((item, index) => (
                      <div key={index} className="flex items-center text-sm">
                        <div 
                          className="w-3 h-3 rounded-full mr-2" 
                          style={{ backgroundColor: item.color }}
                        ></div>
                        <span>{item.name}: {item.value}%</span>
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <div className="text-center py-8 text-gray-500 text-sm">
                  No nutrition data available
                </div>
              )}
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* AI Insights Card */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="flex items-center mb-4">
                <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center mr-3">
                  <Lightbulb className="w-4 h-4 text-orange-600" />
                </div>
                <h3 className="text-lg font-semibold">AI Insights</h3>
              </div>
              <p className="text-gray-600 text-sm mb-4">Recommendations & forecasts</p>
             <Link to={`/${localStorage.getItem("username")}/ai-insights`}>
             
              <button className="w-full cursor-pointer bg-orange-600 text-white py-3 px-4 rounded-lg hover:bg-orange-700 transition-colors font-medium">
                Explore
              </button>
             </Link>
            </div>

            {/* Achievements */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="text-lg font-semibold mb-4">Achievements</h3>
              <div className="space-y-3">
                {achievements.map((achievement, index) => (
                  <div key={index} className="flex items-center p-3 bg-gray-50 rounded-lg">
                    <div className="mr-3 flex-shrink-0">
                      {getAchievementIcon(achievement.icon)}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="font-medium text-sm">{achievement.name}</div>
                      <div className="text-xs text-gray-500">{achievement.description}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MemberDash;