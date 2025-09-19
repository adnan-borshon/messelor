import React, { useState, useEffect } from 'react';
import { 
  Plus,
  TrendingUp,
  TrendingDown,
  Calendar,
  DollarSign,
  ShoppingCart,
  AlertTriangle,
  Eye,
  Edit,
  Trash2,
  X,
  ChevronDown,
  Target,
  Lightbulb,
  BarChart3,
  PieChart,
  Activity
} from 'lucide-react';


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

interface Vendor {
  vendor_id: number;
  vendor_name: string;
  address: string;
  vendor_type: "Grocery" | "Vegetable" | "Meat" | "Dairy" | "Fish" | "Other";
  created_at: string;
}

interface ExpenseCategory {
  category_id: number;
  category_name: string;
  category_code: string;
  description: string;
  is_active: boolean;
}

interface BazarExpense {
  expense_id: number;
  mess: Mess;
  vendor: Vendor;
  category: ExpenseCategory;
  expense_date: string;
  total_amount: number;
  description?: string;
  entered_by: User;
  entered_at: string;
  payment_method: "CASH" | "CARD" | "UPI" | "BANK_TRANSFER" | "CREDIT";
  is_guest_meal: boolean;
}

// Mock Data
const mockMess: Mess = {
  mess_id: 1,
  mess_name: "Mess Alpha",
  mess_code: "ALPHA001",
  description: "Premium mess facility",
  address: "123 Main Street",
  monthly_service_charge: 3000,
  max_members: 50,
  manager: {
    user_id: 1,
    username: "manager1",
    email: "manager@mess.com",
    password: ""
  },
  created_at: "2024-01-01",
  updated_at: "2024-01-01",
  is_active: true
};

const mockVendors: Vendor[] = [
  {
    vendor_id: 1,
    vendor_name: "Fresh Vegetables Store",
    address: "Market Street 1",
    vendor_type: "Vegetable",
    created_at: "2024-01-01"
  },
  {
    vendor_id: 2,
    vendor_name: "Golden Rice Supplier",
    address: "Rice Market 2",
    vendor_type: "Grocery",
    created_at: "2024-01-01"
  },
  {
    vendor_id: 3,
    vendor_name: "Daily Chicken",
    address: "Meat Street 3",
    vendor_type: "Meat",
    created_at: "2024-01-01"
  }
];

const mockCategories: ExpenseCategory[] = [
  {
    category_id: 1,
    category_name: "Vegetables",
    category_code: "VEG",
    description: "Fresh vegetables and greens",
    is_active: true
  },
  {
    category_id: 2,
    category_name: "Grains",
    category_code: "GRAIN",
    description: "Rice, wheat and other grains",
    is_active: true
  },
  {
    category_id: 3,
    category_name: "Meat",
    category_code: "MEAT",
    description: "Chicken, mutton and fish",
    is_active: true
  }
];

const mockExpenses: BazarExpense[] = [
  {
    expense_id: 1,
    mess: mockMess,
    vendor: mockVendors[0],
    category: mockCategories[0],
    expense_date: "2025-01-15",
    total_amount: 450,
    description: "Fresh vegetables for daily cooking",
    entered_by: mockMess.manager,
    entered_at: "2025-01-15T10:30:00",
    payment_method: "CASH",
    is_guest_meal: false
  },
  {
    expense_id: 2,
    mess: mockMess,
    vendor: mockVendors[1],
    category: mockCategories[1],
    expense_date: "2025-01-14",
    total_amount: 830,
    description: "Basmati Rice 25kg",
    entered_by: mockMess.manager,
    entered_at: "2025-01-14T14:20:00",
    payment_method: "UPI",
    is_guest_meal: false
  },
  {
    expense_id: 3,
    mess: mockMess,
    vendor: mockVendors[2],
    category: mockCategories[2],
    expense_date: "2025-01-13",
    total_amount: 680,
    description: "Fresh chicken 5kg",
    entered_by: mockMess.manager,
    entered_at: "2025-01-13T16:45:00",
    payment_method: "CARD",
    is_guest_meal: false
  },
  {
    expense_id: 4,
    mess: mockMess,
    vendor: mockVendors[0],
    category: mockCategories[0],
    expense_date: "2025-01-12",
    total_amount: 320,
    description: "Leafy greens and onions",
    entered_by: mockMess.manager,
    entered_at: "2025-01-12T09:15:00",
    payment_method: "CASH",
    is_guest_meal: false
  },
  {
    expense_id: 5,
    mess: mockMess,
    vendor: mockVendors[2],
    category: mockCategories[1],
    expense_date: "2025-01-11",
    total_amount: 1200,
    description: "Wheat flour 50kg",
    entered_by: mockMess.manager,
    entered_at: "2025-01-11T11:00:00",
    payment_method: "BANK_TRANSFER",
    is_guest_meal: false
  },
  {
    expense_id: 6,
    mess: mockMess,
    vendor: mockVendors[1],
    category: mockCategories[2],
    expense_date: "2025-01-10",
    total_amount: 950,
    description: "Mutton 3kg",
    entered_by: mockMess.manager,
    entered_at: "2025-01-10T17:25:00",
    payment_method: "CREDIT",
    is_guest_meal: true
  },
  {
    expense_id: 7,
    mess: mockMess,
    vendor: mockVendors[1],
    category: mockCategories[1],
    expense_date: "2025-01-09",
    total_amount: 500,
    description: "Lentils and pulses",
    entered_by: mockMess.manager,
    entered_at: "2025-01-09T13:40:00",
    payment_method: "UPI",
    is_guest_meal: false
  },
  {
    expense_id: 8,
    mess: mockMess,
    vendor: mockVendors[0],
    category: mockCategories[0],
    expense_date: "2025-01-08",
    total_amount: 300,
    description: "Tomatoes, carrots, and cucumbers",
    entered_by: mockMess.manager,
    entered_at: "2025-01-08T08:50:00",
    payment_method: "CASH",
    is_guest_meal: false
  },
  {
    expense_id: 9,
    mess: mockMess,
    vendor: mockVendors[2],
    category: mockCategories[2],
    expense_date: "2025-01-07",
    total_amount: 720,
    description: "Fish 6kg",
    entered_by: mockMess.manager,
    entered_at: "2025-01-07T15:10:00",
    payment_method: "CARD",
    is_guest_meal: false
  },
  {
    expense_id: 10,
    mess: mockMess,
    vendor: mockVendors[0],
    category: mockCategories[1],
    expense_date: "2025-01-06",
    total_amount: 1050,
    description: "Cooking oil 20L",
    entered_by: mockMess.manager,
    entered_at: "2025-01-06T12:05:00",
    payment_method: "BANK_TRANSFER",
    is_guest_meal: false
  }
];


// Modal Component
const Modal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg';
}> = ({ isOpen, onClose, title, children, size = 'md' }) => {
 useEffect(() => {
    if (isOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }

   
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [isOpen]);


  if (!isOpen) return null;

  const sizeClasses = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl'
  };

  return (
    <div className="fixed inset-0 backdrop-blur-xs bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className={`bg-white rounded-lg w-full ${sizeClasses[size]} max-h-[90vh] overflow-y-auto`}>
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X size={20} />
          </button>
        </div>
        <div className="p-6">
          {children}
        </div>
      </div>
    </div>
  );
};

// Add Expense Form Component
const AddExpenseForm: React.FC<{
  onSubmit: (expenseData: any) => void;
  onClose: () => void;
  vendors: Vendor[];
  categories: ExpenseCategory[];
}> = ({ onSubmit, onClose, vendors, categories }) => {
  const [formData, setFormData] = useState({
    vendor_id: '',
    category_id: '',
    expense_date: new Date().toISOString().split('T')[0],
    total_amount: '',
    description: '',
    payment_method: 'CASH' as const,
    is_guest_meal: false
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.vendor_id) newErrors.vendor_id = 'Please select a vendor';
    if (!formData.category_id) newErrors.category_id = 'Please select a category';
    if (!formData.total_amount) newErrors.total_amount = 'Please enter amount';
    if (!formData.expense_date) newErrors.expense_date = 'Please select date';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onSubmit({
      ...formData,
      vendor_id: parseInt(formData.vendor_id),
      category_id: parseInt(formData.category_id),
      total_amount: parseFloat(formData.total_amount)
    });
    onClose();
  };

  const handleChange = (field: string, value: any) => {
    setFormData({ ...formData, [field]: value });
    if (errors[field]) {
      setErrors({ ...errors, [field]: '' });
    }
  };

  return (
    <div className="space-y-6 backdrop-blur-md">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Item Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            placeholder="e.g. Vegetables, Rice, Fish"
            value={formData.description}
            onChange={(e) => handleChange('description', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Amount (₹) <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            step="0.01"
            placeholder="0.00"
            value={formData.total_amount}
            onChange={(e) => handleChange('total_amount', e.target.value)}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              errors.total_amount ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.total_amount && (
            <p className="text-red-500 text-xs mt-1">{errors.total_amount}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Category <span className="text-red-500">*</span>
          </label>
          <select
            value={formData.category_id}
            onChange={(e) => handleChange('category_id', e.target.value)}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              errors.category_id ? 'border-red-500' : 'border-gray-300'
            }`}
          >
            <option value="">Select Category</option>
            {categories.map((category) => (
              <option key={category.category_id} value={category.category_id}>
                {category.category_name}
              </option>
            ))}
          </select>
          {errors.category_id && (
            <p className="text-red-500 text-xs mt-1">{errors.category_id}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Date <span className="text-red-500">*</span>
          </label>
          <input
            type="date"
            value={formData.expense_date}
            onChange={(e) => handleChange('expense_date', e.target.value)}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              errors.expense_date ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.expense_date && (
            <p className="text-red-500 text-xs mt-1">{errors.expense_date}</p>
          )}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Vendor <span className="text-red-500">*</span>
        </label>
        <select
          value={formData.vendor_id}
          onChange={(e) => handleChange('vendor_id', e.target.value)}
          className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
            errors.vendor_id ? 'border-red-500' : 'border-gray-300'
          }`}
        >
          <option value="">Select Vendor</option>
          {vendors.map((vendor) => (
            <option key={vendor.vendor_id} value={vendor.vendor_id}>
              {vendor.vendor_name} - {vendor.vendor_type}
            </option>
          ))}
        </select>
        {errors.vendor_id && (
          <p className="text-red-500 text-xs mt-1">{errors.vendor_id}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Payment Method
        </label>
        <select
          value={formData.payment_method}
          onChange={(e) => handleChange('payment_method', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="CASH">Cash</option>
          <option value="CARD">Card</option>
          <option value="UPI">UPI</option>
          <option value="BANK_TRANSFER">Bank Transfer</option>
          <option value="CREDIT">Credit</option>
        </select>
      </div>

      <div className="flex items-center">
        <input
          type="checkbox"
          id="guest_meal"
          checked={formData.is_guest_meal}
          onChange={(e) => handleChange('is_guest_meal', e.target.checked)}
          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
        />
        <label htmlFor="guest_meal" className="ml-2 text-sm text-gray-700">
          This expense is for guest meals
        </label>
      </div>

      <div className="flex justify-end space-x-3 pt-4 border-t">
        <button
          onClick={onClose}
          className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
        >
          Cancel
        </button>
        <button
          onClick={handleSubmit}
          className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors flex items-center gap-2"
        >
      
          Add Expense
        </button>
      </div>
    </div>
  );
};

// Stats Card Component
const StatsCard: React.FC<{
  title: string;
  value: string | number;
  subtitle?: string;
  trend?: 'up' | 'down' | 'neutral';
  trendValue?: string;
  color: string;
  icon: React.ReactNode;
}> = ({ title, value, subtitle, trend, trendValue, color, icon }) => {
  const getTrendIcon = () => {
    if (trend === 'up') return <TrendingUp size={18} className="text-green-600" />;
    if (trend === 'down') return <TrendingDown size={18} className="text-red-600" />;
    return null;
  };

  const getColorClasses = (color: string) => {
    const colors = {
      'blue': { text: 'text-blue-600', bg: 'bg-blue-100' },
      'green': { text: 'text-green-600', bg: 'bg-green-100' },
      'yellow': { text: 'text-yellow-600', bg: 'bg-yellow-100' },
      'purple': { text: 'text-purple-600', bg: 'bg-purple-100' }
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  const colorClasses = getColorClasses(color);

  return (
    <div className="bg-white rounded-lg shadow-sm border p-6 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between">
        <div className="flex-1">
    <div className={`p-3 rounded-lg w-max ${colorClasses.bg}`}>
          <div className={colorClasses.text}>
            {icon}
          </div>
        </div>

          <div className="flex mt-2 items-center gap-2 mb-1">
               <p className={`text-2xl font-bold ${colorClasses.text} mb-1`}>
            {typeof value === 'number' && title.includes('₹') ? `₹${value.toLocaleString()}` : value}
          </p>
       
            {trendValue && getTrendIcon()}
          </div>
            <p className="text-gray-600 text-xl font-medium">{title}</p>
          {subtitle && (
            <p className="text-xs text-gray-700">{subtitle}</p>
          )}
          {trendValue && (
            <p className={`text-sm ${trend === 'up' ? 'text-green-600' : trend === 'down' ? 'text-red-600' : 'text-gray-600'}`}>
              {trendValue}
            </p>
          )}
        </div>
    
      </div>
    </div>
  );
};

// Recent Expenses Component
const RecentExpenses: React.FC<{
  expenses: BazarExpense[];
  onEdit: (expense: BazarExpense) => void;
  onDelete: (expenseId: number) => void;
}> = ({ expenses, onEdit, onDelete }) => {
  const [showModal, setShowModal] = useState(false);

  const getCategoryColor = (categoryName: string) => {
    const colors = {
      Vegetables: "bg-green-100 text-green-800",
      Grains: "bg-yellow-100 text-yellow-800",
      Meat: "bg-red-100 text-red-800",
    };
    return colors[categoryName as keyof typeof colors] || "bg-gray-100 text-gray-800";
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <Activity className="text-blue-600" size={20} />
          Recent Expenses
        </h3>
        <button
          onClick={() => setShowModal(true)}
          className="text-blue-600 hover:text-blue-800 text-sm font-medium"
        >
          View All
        </button>
      </div>

      {/* Small preview table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200 text-left">
              <th className="pb-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th className="pb-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Item</th>
              <th className="pb-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
              <th className="pb-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
              <th className="pb-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {expenses.slice(0, 5).map((expense) => ( // only show first 5 in preview
              <tr key={expense.expense_id} className="hover:bg-gray-50">
                <td className="py-4 text-sm text-gray-900">
                  {new Date(expense.expense_date).toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "short",
                  })}
                </td>
                <td className="py-4">
                  <div>
                    <div className="text-sm font-medium text-gray-900">
                      {expense.description || expense.category.category_name}
                    </div>
                    <div className="text-xs text-gray-500">
                      {expense.vendor.vendor_name}
                    </div>
                  </div>
                </td>
                <td className="py-4">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getCategoryColor(
                      expense.category.category_name
                    )}`}
                  >
                    {expense.category.category_name}
                  </span>
                </td>
                <td className="py-4 text-sm font-medium text-gray-900">
                  ₹{expense.total_amount.toLocaleString()}
                </td>
                <td className="py-4">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => onEdit(expense)}
                      className="p-1 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded"
                      title="Edit"
                    >
                      <Edit size={14} />
                    </button>
                    <button
                      onClick={() => onDelete(expense.expense_id)}
                      className="p-1 text-red-600 hover:text-red-800 hover:bg-red-50 rounded"
                      title="Delete"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal for all expenses */}
      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title="All Expenses"
        size="lg"
      >
        <div className="max-h-[70vh] overflow-y-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 text-left">
                <th className="pb-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="pb-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Item</th>
                <th className="pb-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                <th className="pb-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                <th className="pb-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {expenses.map((expense) => (
                <tr key={expense.expense_id} className="hover:bg-gray-50">
                  <td className="py-4 text-sm text-gray-900">
                    {new Date(expense.expense_date).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "short",
                    })}
                  </td>
                  <td className="py-4">
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        {expense.description || expense.category.category_name}
                      </div>
                      <div className="text-xs text-gray-500">
                        {expense.vendor.vendor_name}
                      </div>
                    </div>
                  </td>
                  <td className="py-4">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getCategoryColor(
                        expense.category.category_name
                      )}`}
                    >
                      {expense.category.category_name}
                    </span>
                  </td>
                  <td className="py-4 text-sm font-medium text-gray-900">
                    ₹{expense.total_amount.toLocaleString()}
                  </td>
                  <td className="py-4">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => onEdit(expense)}
                        className="p-1 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded"
                        title="Edit"
                      >
                        <Edit size={14} />
                      </button>
                      <button
                        onClick={() => onDelete(expense.expense_id)}
                        className="p-1 text-red-600 hover:text-red-800 hover:bg-red-50 rounded"
                        title="Delete"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Modal>
    </div>
  );
};


// Budget Tracker Component
const BudgetTracker: React.FC<{
  monthlyBudget: number;
  currentSpent: number;
  remainingBudget: number;
}> = ({ monthlyBudget, currentSpent, remainingBudget }) => {
  const spentPercentage = (currentSpent / monthlyBudget) * 100;
  
  return (
    <div className="bg-white rounded-lg shadow-sm border p-6">
      <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
        <Target className="text-green-600" size={20} />
        Budget Tracker
      </h3>
      
      <div className="space-y-4">
        <div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-700">Monthly Budget</span>
            <span className="text-lg font-bold text-blue-600">
              ₹{currentSpent.toLocaleString()} / ₹{monthlyBudget.toLocaleString()}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div 
              className={`h-3 rounded-full transition-all duration-500 ${
                spentPercentage > 90 ? 'bg-red-500' : 
                spentPercentage > 75 ? 'bg-yellow-500' : 'bg-green-500'
              }`}
              style={{ width: `${Math.min(spentPercentage, 100)}%` }}
            />
          </div>
          <p className="text-xs text-gray-500 mt-1">
            {spentPercentage.toFixed(1)}% of budget used
          </p>
        </div>

        <div className="grid grid-cols-1 gap-3">
          <div className="p-3 bg-green-50 rounded-lg">
            <div className="text-sm text-green-700 font-medium">Remaining Budget</div>
            <div className="text-xl font-bold text-green-600">₹{remainingBudget.toLocaleString()}</div>
          </div>
          
          <div className="p-3 bg-blue-50 rounded-lg">
            <div className="text-sm text-blue-700 font-medium">Daily Average</div>
            <div className="text-xl font-bold text-blue-600">₹{Math.round(currentSpent / new Date().getDate())}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Smart Suggestions Component
const SmartSuggestions: React.FC = () => {
  const suggestions = [
    {
      type: 'alert',
      icon: <AlertTriangle size={16} className="text-yellow-600" />,
      title: 'Budget Alert',
      message: "You're at 83% of monthly budget with 11 days remaining",
      color: 'bg-yellow-50 border-yellow-200'
    },
    {
      type: 'insight',
      icon: <Lightbulb size={16} className="text-blue-600" />,
      title: 'Cost Insight',
      message: "Vegetable cost 15% more than last month average",
      color: 'bg-blue-50 border-blue-200'
    },
    {
      type: 'suggestion',
      icon: <TrendingUp size={16} className="text-green-600" />,
      title: 'Suggestion',
      message: "Consider buying seasonal vegetables to save 200/week",
      color: 'bg-green-50 border-green-200'
    }
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm border p-6">
      <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
        <Lightbulb className="text-yellow-600" size={20} />
        Smart Suggestions
      </h3>
      
      <div className="space-x-4 flex grid-cols-3">
        {suggestions.map((suggestion, index) => (
          <div key={index} className={`p-3 rounded-lg border ${suggestion.color}`}>
            <div className="flex items-start gap-3">
              {suggestion.icon}
              <div className="flex-1">
                <div className="font-medium text-sm text-gray-800">{suggestion.title}</div>
                <div className="text-xs text-gray-600 mt-1">{suggestion.message}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Quick Stats Component
const QuickStats: React.FC<{
  expenses: BazarExpense[];
}> = ({ expenses }) => {
  const highestExpense = Math.max(...expenses.map(e => e.total_amount));
  const mostFrequentCategory = expenses.reduce((acc, expense) => {
    acc[expense.category.category_name] = (acc[expense.category.category_name] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  
  const topCategory = Object.entries(mostFrequentCategory).sort(([,a], [,b]) => b - a)[0];
  const avgDaily = expenses.reduce((sum, exp) => sum + exp.total_amount, 0) / new Date().getDate();
  
  return (
    <div className="bg-white rounded-lg shadow-sm border p-6">
      <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
        <BarChart3 className="text-purple-600" size={20} />
        Quick Stats
      </h3>
      
      <div className="space-y-4">
        <div className="flex justify-between items-center py-2 border-b">
          <span className="text-sm text-gray-600">Highest Expense</span>
          <span className="font-bold text-gray-900">₹{highestExpense} (Chicken)</span>
        </div>
        
        <div className="flex justify-between items-center py-2 border-b">
          <span className="text-sm text-gray-600">Most Frequent Category</span>
          <span className="font-bold text-gray-900">{topCategory?.[0] || 'N/A'}</span>
        </div>
        
        <div className="flex justify-between items-center py-2 border-b">
          <span className="text-sm text-gray-600">Average Daily Spend</span>
          <span className="font-bold text-gray-900">₹{Math.round(avgDaily)}</span>
        </div>
        
        <div className="flex justify-between items-center py-2">
          <span className="text-sm text-gray-600">Total Transactions</span>
          <span className="font-bold text-gray-900">{expenses.length}</span>
        </div>
      </div>
    </div>
  );
};
// Month Selector Component
const MonthSelector: React.FC<{
  expenses: BazarExpense[];
  selectedMonth: string;
  setSelectedMonth: (value: string) => void;
}> = ({ expenses, selectedMonth, setSelectedMonth }) => {
  // Extract unique months from expenses
  const months = Array.from(
    new Set(
      expenses.map((expense) => {
        const date = new Date(expense.expense_date);
        return date.toLocaleString("en-US", { month: "long", year: "numeric" });
      })
    )
  ).sort((a, b) => new Date(b).getTime() - new Date(a).getTime()); // sort by latest first

  return (
    <div className="bg-white rounded-lg shadow-sm border p-6 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between mb-4">
        <span className="text-gray-600 text-sm font-medium">Select Month</span>
        <ChevronDown size={16} className="text-gray-400" />
      </div>
      <select
        value={selectedMonth}
        onChange={(e) => setSelectedMonth(e.target.value)}
        className="w-full text-lg font-bold text-purple-600 bg-transparent border-none focus:outline-none cursor-pointer"
      >
        {months.map((month) => (
          <option key={month} value={month}>
            {month}
          </option>
        ))}
      </select>
    </div>
  );
};

// Expense Analytics Component
const ExpenseAnalytics: React.FC<{
  expenses: BazarExpense[];
}> = ({ expenses }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border p-6">
      <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
        <PieChart className="text-indigo-600" size={20} />
        Expense Analytics
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h4 className="font-medium text-gray-700 mb-3">Category Breakdown</h4>
          <div className="space-y-2">
            {mockCategories.map((category) => {
              const categoryExpenses = expenses.filter(e => e.category.category_id === category.category_id);
              const total = categoryExpenses.reduce((sum, exp) => sum + exp.total_amount, 0);
              const percentage = expenses.length > 0 ? (categoryExpenses.length / expenses.length) * 100 : 0;
              
              return (
                <div key={category.category_id} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                                          <div className={`w-3 h-3 rounded-full ${
                        category.category_name === 'Vegetables' ? 'bg-green-500' :
                        category.category_name === 'Grains' ? 'bg-yellow-500' : 'bg-red-500'
                      }`} />
                    <span className="text-sm text-gray-700">{category.category_name}</span>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium">₹{total.toLocaleString()}</div>
                    <div className="text-xs text-gray-500">{percentage.toFixed(0)}%</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        
        <div>
          <h4 className="font-medium text-gray-700 mb-3">Daily Spending Trend</h4>
          <div className="text-sm text-gray-500 mb-2">Last 7 days average</div>
          <div className="space-y-2">
            {Array.from({length: 7}, (_, i) => {
              const date = new Date();
              date.setDate(date.getDate() - i);
              const dayExpenses = expenses.filter(e => 
                new Date(e.expense_date).toDateString() === date.toDateString()
              );
              const total = dayExpenses.reduce((sum, exp) => sum + exp.total_amount, 0);
              
              return (
                <div key={i} className="flex items-center justify-between">
                  <span className="text-xs text-gray-600">
                    {date.toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric' })}
                  </span>
                  <div className="flex items-center gap-2">
                    <div className="w-16 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-500 h-2 rounded-full" 
                        style={{ width: `${Math.min((total / 1000) * 100, 100)}%` }}
                      />
                    </div>
                    <span className="text-xs font-medium w-12 text-right">₹{total}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

// Main Expense Management Dashboard Component
const Expenses: React.FC = () => {
  const [expenses, setExpenses] = useState<BazarExpense[]>(mockExpenses);
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState('January 2025');
  
  // Calculate stats
  const totalExpenses = expenses.reduce((sum, exp) => sum + exp.total_amount, 0);
  const totalMealsServed = 486;
  const costPerMeal = totalExpenses / totalMealsServed;
  const monthlyBudget = 15000;
  const remainingBudget = monthlyBudget - totalExpenses;

  const handleAddExpense = (expenseData: any) => {
    const selectedVendor = mockVendors.find(v => v.vendor_id === expenseData.vendor_id);
    const selectedCategory = mockCategories.find(c => c.category_id === expenseData.category_id);
    
    if (!selectedVendor || !selectedCategory) return;

    const newExpense: BazarExpense = {
      expense_id: expenses.length + 1,
      mess: mockMess,
      vendor: selectedVendor,
      category: selectedCategory,
      expense_date: expenseData.expense_date,
      total_amount: expenseData.total_amount,
      description: expenseData.description,
      entered_by: mockMess.manager,
      entered_at: new Date().toISOString(),
      payment_method: expenseData.payment_method,
      is_guest_meal: expenseData.is_guest_meal
    };

    setExpenses([newExpense, ...expenses]);
    alert('Expense added successfully!');
  };

  const handleEditExpense = (expense: BazarExpense) => {
    alert(`Edit expense: ${expense.description} - ₹${expense.total_amount}`);
  };

  const handleDeleteExpense = (expenseId: number) => {
    if (window.confirm('Are you sure you want to delete this expense?')) {
      setExpenses(expenses.filter(exp => exp.expense_id !== expenseId));
      alert('Expense deleted successfully!');
    }
  };
useEffect(() => {
  if (mockExpenses.length > 0) {
    const latest = new Date(
      Math.max(...mockExpenses.map((e) => new Date(e.expense_date).getTime()))
    );
    setSelectedMonth(
      latest.toLocaleString("en-US", { month: "long", year: "numeric" })
    );
  }
}, []);
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Expense Management</h1>
          <p className="text-gray-600">Track and manage all mess expenses efficiently</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatsCard
            title="₹12,450"
            value="Total Expenses"
            subtitle="This month"
            trend="down"
            trendValue="2.3%↓"
            color="blue"
            icon={<DollarSign size={24} />}
          />
          <StatsCard
            title="486"
            value="Total Meals Served"
            subtitle="This month"
            trend="up"
            trendValue="1.4%↑"
            color="green"
            icon={<ShoppingCart size={24} />}
          />
          <StatsCard
            title="₹25.6"
            value="Cost per Meal"
            subtitle="Average cost"
            trend="neutral"
            color="purple"
            icon={<Calendar size={24} />}
          />
          <MonthSelector
      expenses={mockExpenses}
      selectedMonth={selectedMonth}
      setSelectedMonth={setSelectedMonth}
    />
        </div>

        {/* Add Expense Button */}
        <div className="mb-6">
          <button
            onClick={() => setShowAddModal(true)}
            className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors font-medium flex items-center gap-2 shadow-sm"
          >
            <Plus size={20} />
            Add New Expense
          </button>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <RecentExpenses
              expenses={expenses}
              onEdit={handleEditExpense}
              onDelete={handleDeleteExpense}
            />
            <ExpenseAnalytics expenses={expenses} />
                  <SmartSuggestions />
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-6">
            <BudgetTracker
              monthlyBudget={monthlyBudget}
              currentSpent={totalExpenses}
              remainingBudget={remainingBudget}
            />
             <QuickStats expenses={expenses} />
      
           
          </div>
        </div>

        {/* Add Expense Modal */}
        <Modal
          isOpen={showAddModal}
          onClose={() => setShowAddModal(false)}
          title="Add New Expense"
          size="lg"
        >
          <AddExpenseForm
            onSubmit={handleAddExpense}
            onClose={() => setShowAddModal(false)}
            vendors={mockVendors}
            categories={mockCategories}
          />
        </Modal>
      </div>
    </div>
  );
};

export default Expenses;