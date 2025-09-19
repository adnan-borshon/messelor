import React, { useState, useEffect } from 'react';
import { 
  Bell, 
  Users, 
  DollarSign, 
  TrendingUp, 
  AlertTriangle, 
  Plus,
  Eye,
  Edit,
  Trash2,
  X,
  Check,
  Filter,
  Download,
  BarChart3,
  UserPlus
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

interface MessMember {
  mess_member_id: number;
  user: User;
  mess: Mess;
  joined_date: string;
  left_date?: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

// API Service
class ApiService {
  static async getAllMesses(): Promise<Mess[]> {
    // Simulate API call
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

  static async getAllUsers(): Promise<User[]> {
    return [
      { user_id: 1, username: "john_doe", email: "john@example.com", password: "" },
      { user_id: 2, username: "jane_smith", email: "jane@example.com", password: "" },
      { user_id: 3, username: "sarah_wilson", email: "sarah@example.com", password: "" }
    ];
  }

  static async createMess(mess: Partial<Mess>): Promise<Mess> {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    return { ...mess, mess_id: Date.now() } as Mess;
  }

  static async createUser(user: Partial<User>): Promise<User> {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    return { ...user, user_id: Date.now() } as User;
  }
}

// Alert Card Component
const AlertCard: React.FC<{
  type: 'warning' | 'info' | 'success';
  title: string;
  message: string;
  onClose: () => void;
}> = ({ type, title, message, onClose }) => {
  const bgColor = {
    warning: 'bg-yellow-50 border-yellow-200',
    info: 'bg-blue-50 border-blue-200',
    success: 'bg-green-50 border-green-200'
  };

  const textColor = {
    warning: 'text-yellow-800',
    info: 'text-blue-800',
    success: 'text-green-800'
  };

  const iconColor = {
    warning: 'text-yellow-500',
    info: 'text-blue-500',
    success: 'text-green-500'
  };

  return (
    <div className={`p-4 border rounded-lg ${bgColor[type]} flex items-start justify-between`}>
      <div className="flex items-start">
        <AlertTriangle className={`w-5 h-5 mr-3 mt-0.5 ${iconColor[type]}`} />
        <div>
          <h4 className={`font-medium ${textColor[type]}`}>{title}</h4>
          <p className={`text-sm ${textColor[type]} opacity-80`}>{message}</p>
        </div>
      </div>
      <button onClick={onClose} className={`${textColor[type]} hover:opacity-75`}>
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};

// Mess Overview Card Component
const MessOverviewCard: React.FC<{
  mess: Mess;
  memberCount: number;
  monthlyExpense: number;
  costPerMeal: number;
  onView: (messId: number) => void;
  onEdit: (mess: Mess) => void;
  onDelete: (messId: number) => void;
}> = ({ mess, memberCount, monthlyExpense, costPerMeal, onView, onEdit, onDelete }) => {
  return (
    <div className="bg-white p-6 rounded-lg border">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="font-semibold text-lg">{mess.mess_name}</h3>
          <p className="text-sm text-gray-500">{mess.mess_code}</p>
        </div>
        <span className={`px-2 py-1 rounded text-xs font-medium ${mess.is_active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
          {mess.is_active ? 'Active' : 'Inactive'}
        </span>
      </div>
      
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="text-center">
          <div className="text-2xl font-bold text-blue-600">{memberCount}</div>
          <div className="text-sm text-gray-500">Members</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-green-600">{mess.max_members}</div>
          <div className="text-sm text-gray-500">Max Today</div>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="text-center">
          <div className="text-lg font-semibold">₹{monthlyExpense.toLocaleString()}</div>
          <div className="text-sm text-gray-500">Monthly Expense</div>
        </div>
        <div className="text-center">
          <div className="text-lg font-semibold">₹{costPerMeal}</div>
          <div className="text-sm text-gray-500">Cost/Meal</div>
        </div>
      </div>
      
      <div className="flex gap-2">
        <button 
          onClick={() => onView(mess.mess_id)}
          className="flex-1 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors"
        >
          View
        </button>
        <button 
          onClick={() => onEdit(mess)}
          className="bg-gray-600 text-white py-2 px-4 rounded hover:bg-gray-700 transition-colors"
        >
          Edit
        </button>
        <button 
          onClick={() => onDelete(mess.mess_id)}
          className="bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700 transition-colors"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

// System Summary Component
const SystemSummary: React.FC = () => {
  const [stats] = useState({
    totalMembers: 42,
    totalMonthlyExpenses: 32650,
    avgCostPerMeal: 27.8,
    mealsLoggedToday: 120
  });

  return (
    <div className="bg-white p-6 rounded-lg border">
      <h3 className="font-semibold text-lg mb-4 flex items-center">
        <BarChart3 className="w-5 h-5 mr-2" />
        System Summary
      </h3>
      
      <div className="space-y-4">
        <div>
          <div className="text-3xl font-bold text-blue-600">{stats.totalMembers}</div>
          <div className="text-sm text-gray-500">Total Members</div>
        </div>
        
        <div>
          <div className="text-3xl font-bold text-green-600">₹{stats.totalMonthlyExpenses.toLocaleString()}</div>
          <div className="text-sm text-gray-500">Total Monthly Expenses</div>
        </div>
        
        <div>
          <div className="text-3xl font-bold text-purple-600">₹{stats.avgCostPerMeal}</div>
          <div className="text-sm text-gray-500">Average Cost/Meal</div>
        </div>
        
        <div>
          <div className="text-3xl font-bold text-orange-600">{stats.mealsLoggedToday}</div>
          <div className="text-sm text-gray-500">Meals Logged Today</div>
        </div>
      </div>
    </div>
  );
};

// AI Insights Component
const AIInsights: React.FC = () => {
  const insights = [
    {
      type: 'forecast',
      title: 'Cost Forecast',
      message: 'Next month: 5% increase expected across all messes',
      color: 'text-pink-600'
    },
    {
      type: 'nutrition',
      title: 'Nutrition Trend',
      message: 'Protein intake improved by 12% system-wide',
      color: 'text-green-600'
    },
    {
      type: 'anomaly',
      title: 'Anomaly Alert',
      message: 'Mess Alpha: Unusual vegetable expense spike detected',
      color: 'text-red-600'
    }
  ];

  return (
    <div className="bg-white p-6 rounded-lg border">
      <h3 className="font-semibold text-lg mb-4 flex items-center">
        <TrendingUp className="w-5 h-5 mr-2" />
        AI Insights
      </h3>
      
      <div className="space-y-4">
        {insights.map((insight, index) => (
          <div key={index} className="p-3 rounded-lg bg-gray-50">
            <div className={`font-medium ${insight.color}`}>{insight.title}</div>
            <div className="text-sm text-gray-600 mt-1">{insight.message}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Manager & Member Management Component
const ManagerMemberManagement: React.FC<{
  onAddUser: () => void;
}> = ({ onAddUser }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedMess, setSelectedMess] = useState('All Messes');
  const [selectedRole, setSelectedRole] = useState('All Roles');

  useEffect(() => {
    ApiService.getAllUsers().then(setUsers);
  }, []);

  const mockUserData = [
    { user: users[0] || { user_id: 1, username: 'john_doe', email: 'john@example.com', password: '' }, role: 'Manager', mess: 'Mess Alpha', status: 'Pending' },
    { user: users[1] || { user_id: 2, username: 'sarah_wilson', email: 'sarah@example.com', password: '' }, role: 'Member', mess: 'Mess Beta', status: 'Active' }
  ];

  return (
    <div className="bg-white p-6 rounded-lg border">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold text-lg flex items-center">
          <Users className="w-5 h-5 mr-2" />
          Manager & Member Management
        </h3>
        <button 
          onClick={onAddUser}
          className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 transition-colors flex items-center"
        >
          <UserPlus className="w-4 h-4 mr-2" />
          Add User
        </button>
      </div>
      
      <div className="flex gap-4 mb-4">
        <select 
          value={selectedMess}
          onChange={(e) => setSelectedMess(e.target.value)}
          className="border rounded px-3 py-2"
        >
          <option>All Messes</option>
          <option>Mess Alpha</option>
          <option>Mess Beta</option>
        </select>
        
        <select 
          value={selectedRole}
          onChange={(e) => setSelectedRole(e.target.value)}
          className="border rounded px-3 py-2"
        >
          <option>All Roles</option>
          <option>Manager</option>
          <option>Member</option>
        </select>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left py-2">Name</th>
              <th className="text-left py-2">Role</th>
              <th className="text-left py-2">Mess</th>
              <th className="text-left py-2">Status</th>
              <th className="text-left py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {mockUserData.map((item, index) => (
              <tr key={index} className="border-b">
                <td className="py-3">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-gray-300 rounded-full mr-3"></div>
                    <div>
                      <div className="font-medium">{item.user.username}</div>
                      <div className="text-sm text-gray-500">{item.user.email}</div>
                    </div>
                  </div>
                </td>
                <td className="py-3">
                  <span className={`px-2 py-1 rounded text-xs font-medium ${item.role === 'Manager' ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800'}`}>
                    {item.role}
                  </span>
                </td>
                <td className="py-3">{item.mess}</td>
                <td className="py-3">
                  <span className={`px-2 py-1 rounded text-xs font-medium ${item.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                    {item.status}
                  </span>
                </td>
                <td className="py-3">
                  <div className="flex gap-2">
                    <button className="text-green-600 hover:bg-green-50 p-1 rounded">
                      <Check className="w-4 h-4" />
                    </button>
                    <button className="text-red-600 hover:bg-red-50 p-1 rounded">
                      <X className="w-4 h-4" />
                    </button>
                    <button className="text-blue-600 hover:bg-blue-50 p-1 rounded">
                      <Edit className="w-4 h-4" />
                    </button>
                    <button className="text-red-600 hover:bg-red-50 p-1 rounded">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// System Reports Component
const SystemReports: React.FC = () => {
  return (
    <div className="bg-white p-6 rounded-lg border">
      <h3 className="font-semibold text-lg mb-4 flex items-center">
        <BarChart3 className="w-5 h-5 mr-2" />
        System Reports
      </h3>
      
      <div className="space-y-3">
        <button className="w-full bg-blue-600 text-white py-3 px-4 rounded hover:bg-blue-700 transition-colors flex items-center justify-center">
          <Download className="w-4 h-4 mr-2" />
          Export All Mess Reports
        </button>
        
        <button className="w-full bg-green-600 text-white py-3 px-4 rounded hover:bg-green-700 transition-colors flex items-center justify-center">
          <BarChart3 className="w-4 h-4 mr-2" />
          Consolidated Analytics
        </button>
      </div>
    </div>
  );
};

// Add Mess Modal Component
const AddMessModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (mess: Partial<Mess>) => Promise<void>;
}> = ({ isOpen, onClose, onSubmit }) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    mess_name: '',
    mess_code: '',
    description: '',
    address: '',
    monthly_service_charge: 0,
    max_members: 0,
    manager_id: 0
  });

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await onSubmit({
        ...formData,
        manager: { user_id: formData.manager_id, username: '', email: '', password: '' },
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        is_active: true
      });
      onClose();
      setFormData({
        mess_name: '',
        mess_code: '',
        description: '',
        address: '',
        monthly_service_charge: 0,
        max_members: 0,
        manager_id: 0
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-md mx-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Add New Mess</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Mess Name</label>
            <input
              type="text"
              value={formData.mess_name}
              onChange={(e) => setFormData({ ...formData, mess_name: e.target.value })}
              className="w-full border rounded px-3 py-2"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Mess Code</label>
            <input
              type="text"
              value={formData.mess_code}
              onChange={(e) => setFormData({ ...formData, mess_code: e.target.value })}
              className="w-full border rounded px-3 py-2"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full border rounded px-3 py-2"
              rows={3}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Address</label>
            <input
              type="text"
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              className="w-full border rounded px-3 py-2"
              required
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Service Charge</label>
              <input
                type="number"
                value={formData.monthly_service_charge}
                onChange={(e) => setFormData({ ...formData, monthly_service_charge: Number(e.target.value) })}
                className="w-full border rounded px-3 py-2"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Max Members</label>
              <input
                type="number"
                value={formData.max_members}
                onChange={(e) => setFormData({ ...formData, max_members: Number(e.target.value) })}
                className="w-full border rounded px-3 py-2"
                required
              />
            </div>
          </div>
          
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 border border-gray-300 py-2 px-4 rounded hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors disabled:opacity-50"
            >
              {loading ? 'Creating...' : 'Create Mess'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Add User Modal Component
const AddUserModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (user: Partial<User>) => Promise<void>;
}> = ({ isOpen, onClose, onSubmit }) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await onSubmit(formData);
      onClose();
      setFormData({ username: '', email: '', password: '' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-md mx-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Add New User</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Username</label>
            <input
              type="text"
              value={formData.username}
              onChange={(e) => setFormData({ ...formData, username: e.target.value })}
              className="w-full border rounded px-3 py-2"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full border rounded px-3 py-2"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="w-full border rounded px-3 py-2"
              required
            />
          </div>
          
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 border border-gray-300 py-2 px-4 rounded hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 transition-colors disabled:opacity-50"
            >
              {loading ? 'Creating...' : 'Create User'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Main Dashboard Component
const AdminDash: React.FC = () => {
  const [alerts, setAlerts] = useState([
    { id: 1, type: 'warning' as const, title: 'Expense Anomaly', message: 'Mess A: Vegetables cost 40% higher' },
    { id: 2, type: 'info' as const, title: 'Pending Request', message: '3 manager approvals pending' },
    { id: 3, type: 'success' as const, title: 'Smart Reminder', message: '12 meals logged in Mess C' }
  ]);

  const [messes, setMesses] = useState<Mess[]>([]);
  const [isAddMessModalOpen, setIsAddMessModalOpen] = useState(false);
  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);

  useEffect(() => {
    ApiService.getAllMesses().then(setMesses);
  }, []);

  const handleRemoveAlert = (id: number) => {
    setAlerts(alerts.filter(alert => alert.id !== id));
  };

  const handleViewMess = (messId: number) => {
    // Navigate to mess management page
    console.log(`Redirecting to /mess-management/${messId}`);
    // In a real app: navigate(`/mess-management/${messId}`);
  };

  const handleEditMess = (mess: Mess) => {
    console.log('Edit mess:', mess);
  };

  const handleDeleteMess = (messId: number) => {
    console.log('Delete mess:', messId);
    setMesses(messes.filter(m => m.mess_id !== messId));
  };

  const handleAddMess = async (messData: Partial<Mess>) => {
    const newMess = await ApiService.createMess(messData);
    setMesses([...messes, newMess]);
  };

  const handleAddUser = async (userData: Partial<User>) => {
    const newUser = await ApiService.createUser(userData);
    console.log('User created:', newUser);
  };

  const getRandomMemberCount = () => Math.floor(Math.random() * 30) + 10;
  const getRandomExpense = () => Math.floor(Math.random() * 20000) + 10000;
  const getRandomCostPerMeal = () => Math.floor(Math.random() * 50) + 20;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
          <p className="text-gray-600">Manage all messes, members, and system-wide operations</p>
        </div>

        {/* Alerts */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {alerts.map(alert => (
            <AlertCard
              key={alert.id}
              type={alert.type}
              title={alert.title}
              message={alert.message}
              onClose={() => handleRemoveAlert(alert.id)}
            />
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Mess Overview */}
          <div className="lg:col-span-2">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold flex items-center">
                <Eye className="w-5 h-5 mr-2" />
                Mess Overview
              </h2>
              <button 
                onClick={() => setIsAddMessModalOpen(true)}
                className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 transition-colors flex items-center"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add New Mess
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {messes.map(mess => (
                <MessOverviewCard
                  key={mess.mess_id}
                  mess={mess}
                  memberCount={getRandomMemberCount()}
                  monthlyExpense={getRandomExpense()}
                  costPerMeal={getRandomCostPerMeal()}
                  onView={handleViewMess}
                  onEdit={handleEditMess}
                  onDelete={handleDeleteMess}
                />
              ))}
            </div>

            {/* Manager & Member Management */}
            <ManagerMemberManagement onAddUser={() => setIsAddUserModalOpen(true)} />
          </div>

          {/* Right Column - System Summary & AI Insights */}
          <div className="space-y-8">
            <SystemSummary />
            <AIInsights />
            <SystemReports />
          </div>
        </div>

        {/* Modals */}
        <AddMessModal
          isOpen={isAddMessModalOpen}
          onClose={() => setIsAddMessModalOpen(false)}
          onSubmit={handleAddMess}
        />

        <AddUserModal
          isOpen={isAddUserModalOpen}
          onClose={() => setIsAddUserModalOpen(false)}
          onSubmit={handleAddUser}
        />
      </div>
    </div>
  );
};

export default AdminDash;