import React, { useState, useEffect } from 'react';
import { 
  TrendingUp, 
  TrendingDown, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  DollarSign,
  Users,
  Target,
  Utensils,
  Activity,
  Bell,
  Eye,
  MoreHorizontal,
  Calendar,
  PieChart,
  BarChart3
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/Components/ui/card';
import { Button } from '@/Components/ui/button';
import { Badge } from '@/Components/ui/badge';
import { Progress } from '@/Components/ui/progress';
import { Alert, AlertDescription } from '@/Components/ui/alert';

// Types (using the provided interfaces)
interface User {
  user_id: number;
  username: string;
  email: string;
  password: string;
}

interface Mess {
  mess_id: number;
  mess_name: string;
  mess_code: string;
  description: string;
  address: string;
  monthly_service_charge: number;
  max_members: number;
  manager: User;
  created_at: string;
  updated_at: string;
  is_active: boolean;
}

interface BazarExpense {
  expense_id: number;
  mess: Mess;
  vendor: any;
  category: any;
  expense_date: string;
  total_amount: number;
  description?: string;
  entered_by: User;
  entered_at: string;
  payment_method: string;
  is_guest_meal: boolean;
}

// API Service
class ApiService {
  static async getAllMesses(): Promise<Mess[]> {
    return [
      {
        mess_id: 1,
        mess_name: "Mess Alpha",
        mess_code: "MESS001",
        description: "Premium mess facility",
        address: "123 Main St",
        monthly_service_charge: 5000,
        max_members: 50,
        manager: { user_id: 1, username: "john_doe", email: "john@example.com", password: "" },
        created_at: "2024-01-15",
        updated_at: "2024-01-15",
        is_active: true
      },
      {
        mess_id: 2,
        mess_name: "Mess Beta",
        mess_code: "MESS002",
        description: "Budget-friendly mess",
        address: "456 Oak Ave",
        monthly_service_charge: 3500,
        max_members: 30,
        manager: { user_id: 2, username: "jane_smith", email: "jane@example.com", password: "" },
        created_at: "2024-02-01",
        updated_at: "2024-02-01",
        is_active: true
      }
    ];
  }

  static async getAIInsights() {
    // Simulate AI analysis
    await new Promise(resolve => setTimeout(resolve, 1000));
    return {
      summary: {
        totalCost: 2450,
        nutritionBalance: 67,
        costSavings: 340
      },
      forecasting: {
        nextMonth: { amount: 2800, confidence: 85 },
        savings: { amount: 450, percentage: 14 }
      },
      anomalies: [
        {
          id: 1,
          type: "Vegetables",
          amount: 500,
          description: "Unusually high for this week",
          severity: "high"
        },
        {
          id: 2,
          type: "Rice",
          amount: 120,
          description: "10% below average",
          severity: "medium"
        }
      ],
      nutrition: {
        grade: "B+",
        recommendations: "Add more fiber-rich foods",
        deficiencies: ["Fiber", "Vitamin D"]
      },
      recipes: [
        {
          name: "Lentil Soup",
          rating: "Healthy",
          description: "High protein and fiber recommended for big groups"
        },
        {
          name: "Vegetable Stir Fry",
          rating: "Budget",
          description: "Cost-effective and nutritious option for dinner"
        }
      ],
      alerts: [
        {
          id: 1,
          type: "payment",
          message: "Your bill is ₹150 more than last month",
          priority: "medium"
        },
        {
          id: 2,
          type: "nutrition",
          message: "Lacking balanced intake over last week",
          priority: "low"
        },
        {
          id: 3,
          type: "expense",
          message: "Above budget",
          priority: "high"
        }
      ]
    };
  }
}

// AI Service (Gemini integration placeholder)
class AIService {
  static async generateInsights(messData: any) {
    // This would integrate with Gemini AI
    // For now, return mock data
    console.log('Generating AI insights for:', messData);
    return ApiService.getAIInsights();
  }
}

// Components
const AISummaryCard = ({ insights }: { insights: any }) => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleAnalyze = async () => {
    setIsAnalyzing(true);
    try {
      // This would call AIService.generateInsights()
      await new Promise(resolve => setTimeout(resolve, 2000));
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <Card className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
      <CardHeader className="flex flex-row items-center space-y-0 pb-2">
        <div className="flex items-center space-x-2">
          <Activity className="h-5 w-5" />
          <CardTitle className="text-lg font-semibold">AI Summary</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm opacity-90 mb-4">
          Smart analytics and forecasting for your mess management
        </p>
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div>
            <div className="text-2xl font-bold">₹{insights.summary.totalCost}</div>
            <div className="text-xs opacity-80">This month cost</div>
          </div>
          <div>
            <div className="text-2xl font-bold">{insights.summary.nutritionBalance}%</div>
            <div className="text-xs opacity-80">Nutrition balance</div>
          </div>
          <div>
            <div className="text-2xl font-bold">₹{insights.summary.costSavings}</div>
            <div className="text-xs opacity-80">Cost savings</div>
          </div>
        </div>
        <Button 
          onClick={handleAnalyze}
          disabled={isAnalyzing}
          className="w-full bg-white text-blue-600 hover:bg-gray-100"
        >
          {isAnalyzing ? 'Analyzing...' : 'Generate New Insights'}
        </Button>
      </CardContent>
    </Card>
  );
};

const CostForecastingCard = ({ insights }: { insights: any }) => {
  const [activeTab, setActiveTab] = useState('monthly');

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-base font-medium flex items-center">
          <TrendingUp className="h-4 w-4 mr-2" />
          Cost Forecasting
        </CardTitle>
        <div className="flex space-x-1">
          {['Monthly', 'Weekly', 'Daily'].map((tab) => (
            <Button
              key={tab}
              variant={activeTab === tab.toLowerCase() ? "default" : "ghost"}
              size="sm"
              onClick={() => setActiveTab(tab.toLowerCase())}
              className="text-xs"
            >
              {tab}
            </Button>
          ))}
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <Alert>
            <TrendingUp className="h-4 w-4" />
            <AlertDescription>
              Next month prediction: ₹{insights.forecasting.nextMonth.amount} 
              ({insights.forecasting.nextMonth.confidence}% confidence)
            </AlertDescription>
          </Alert>
          
          <div className="bg-green-50 p-3 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm font-medium text-green-800">Cost Savings</div>
                <div className="text-xs text-green-600">
                  Following our AI recommendations for 6% savings
                </div>
              </div>
              <div className="text-right">
                <div className="text-lg font-bold text-green-800">₹{insights.forecasting.savings.amount}</div>
                <div className="text-xs text-green-600">next month</div>
              </div>
            </div>
          </div>
          
          <Button className="w-full bg-blue-600 text-white">
            Apply Optimization
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

const ExpenseAnomaliesCard = ({ insights }: { insights: any }) => {
  const handleAction = (anomalyId: number, action: 'confirm' | 'ignore') => {
    console.log(`${action} anomaly ${anomalyId}`);
    // This would call the API to update anomaly status
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center space-y-0 pb-2">
        <AlertTriangle className="h-4 w-4 mr-2 text-orange-500" />
        <CardTitle className="text-base font-medium">Expense Anomalies</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {insights.anomalies.map((anomaly: any) => (
            <div key={anomaly.id} className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex-1">
                <div className="flex items-center space-x-2">
                  <Badge variant={anomaly.severity === 'high' ? 'destructive' : 'secondary'}>
                    {anomaly.type}
                  </Badge>
                  <span className="text-sm font-medium">₹{anomaly.amount}</span>
                </div>
                <div className="text-xs text-gray-600 mt-1">{anomaly.description}</div>
              </div>
              <div className="flex space-x-1">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleAction(anomaly.id, 'confirm')}
                  className="text-xs px-2"
                >
                  Confirm
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => handleAction(anomaly.id, 'ignore')}
                  className="text-xs px-2"
                >
                  Ignore
                </Button>
              </div>
            </div>
          ))}
        </div>
        <Button variant="ghost" className="w-full mt-3 text-blue-600">
          Optimize Costs
        </Button>
      </CardContent>
    </Card>
  );
};

const NutritionAnalysisCard = ({ insights }: { insights: any }) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center space-y-0 pb-2">
        <Target className="h-4 w-4 mr-2 text-green-500" />
        <CardTitle className="text-base font-medium">Nutrition Analysis</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-green-600">{insights.nutrition.grade}</div>
              <div className="text-xs text-gray-600">This week nutrition grade</div>
            </div>
          </div>
          
          <Alert variant="destructive">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              Warning: {insights.nutrition.recommendations}
            </AlertDescription>
          </Alert>
          
          <div className="flex space-x-2">
            <Button className="flex-1 bg-green-600 text-white">
              TT Nutrition Optimization
            </Button>
            <Button variant="outline" className="text-blue-600 border-blue-600">
              Meal Plan
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const RecipeSuggestionsCard = ({ insights }: { insights: any }) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center space-y-0 pb-2">
        <Utensils className="h-4 w-4 mr-2 text-purple-500" />
        <CardTitle className="text-base font-medium">Recipe Suggestions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {insights.recipes.map((recipe: any, index: number) => (
            <div key={index} className="p-3 border rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <div className="font-medium">{recipe.name}</div>
                <div className="flex items-center space-x-1">
                  <Badge variant={recipe.rating === 'Healthy' ? 'default' : 'secondary'}>
                    {recipe.rating}
                  </Badge>
                  <MoreHorizontal className="h-4 w-4 text-gray-400" />
                </div>
              </div>
              <div className="text-xs text-gray-600">{recipe.description}</div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

const SmartAlertsCard = ({ insights }: { insights: any }) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center space-y-0 pb-2">
        <Bell className="h-4 w-4 mr-2 text-red-500" />
        <CardTitle className="text-base font-medium">Smart Alerts</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {insights.alerts.map((alert: any) => (
            <div key={alert.id} className="flex items-start space-x-3">
              <div className={`w-2 h-2 rounded-full mt-2 ${
                alert.priority === 'high' ? 'bg-red-500' : 
                alert.priority === 'medium' ? 'bg-yellow-500' : 'bg-blue-500'
              }`} />
              <div className="flex-1">
                <div className="text-sm">{alert.message}</div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

const WeeklyNutritionTrends = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('This Week');
  
  const nutritionData = [
    { day: 'Mon', protein: 45, carbs: 60, fat: 30, fiber: 25 },
    { day: 'Tue', protein: 50, carbs: 65, fat: 35, fiber: 30 },
    { day: 'Wed', protein: 40, carbs: 55, fat: 25, fiber: 20 },
    { day: 'Thu', protein: 55, carbs: 70, fat: 40, fiber: 35 },
    { day: 'Fri', protein: 48, carbs: 62, fat: 32, fiber: 28 },
    { day: 'Sat', protein: 52, carbs: 68, fat: 38, fiber: 32 },
    { day: 'Sun', protein: 46, carbs: 58, fat: 28, fiber: 26 }
  ];

  return (
    <Card className="col-span-2">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-base font-medium flex items-center">
          <BarChart3 className="h-4 w-4 mr-2" />
          Weekly Nutrition Trends
        </CardTitle>
        <Button variant="outline" size="sm">
          {selectedPeriod}
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="p-3 bg-red-50 rounded-lg">
              <div className="text-sm font-medium text-red-800">Low</div>
              <div className="text-xs text-red-600">Risk Status</div>
            </div>
            <div className="p-3 bg-green-50 rounded-lg">
              <div className="text-sm font-medium text-green-800">Good</div>
              <div className="text-xs text-green-600">Overall</div>
            </div>
            <div className="p-3 bg-yellow-50 rounded-lg">
              <div className="text-sm font-medium text-yellow-800">High</div>
              <div className="text-xs text-yellow-600">Potential</div>
            </div>
          </div>
          
          <div className="h-32 bg-gray-50 rounded-lg flex items-center justify-center">
            <div className="text-gray-500 text-sm">Chart visualization would go here</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

// Main Dashboard Component
const AiInsights = () => {
  const [insights, setInsights] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadInsights = async () => {
      try {
        const data = await ApiService.getAIInsights();
        setInsights(data);
      } catch (error) {
        console.error('Error loading insights:', error);
      } finally {
        setLoading(false);
      }
    };

    loadInsights();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!insights) {
    return (
      <div className="text-center py-8">
        <div className="text-gray-500">Failed to load insights</div>
        <Button onClick={() => window.location.reload()} className="mt-4">
          Retry
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 flex items-center">
            <Activity className="h-6 w-6 mr-2 text-blue-600" />
            AI Insights
          </h1>
          <p className="text-gray-600 text-sm">Smart analytics and forecasting for your mess management</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* AI Summary - Full Width */}
          <div className="lg:col-span-3">
            <AISummaryCard insights={insights} />
          </div>

          {/* Cost Forecasting */}
          <CostForecastingCard insights={insights} />

          {/* Recipe Suggestions */}
          <RecipeSuggestionsCard insights={insights} />

          {/* Smart Alerts */}
          <SmartAlertsCard insights={insights} />

          {/* Expense Anomalies */}
          <ExpenseAnomaliesCard insights={insights} />

          {/* Nutrition Analysis */}
          <NutritionAnalysisCard insights={insights} />

          {/* Weekly Nutrition Trends - Full Width */}
          <WeeklyNutritionTrends />
        </div>
      </div>
    </div>
  );
};

export default AiInsights;