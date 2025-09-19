import React, { useState, useEffect } from 'react';
import { 
  Users, 
  UserPlus, 
  TrendingUp, 
  Calendar, 
  DollarSign, 
  AlertTriangle, 
  CheckCircle, 
  Clock,Plus, 
  X,
  Search,
  Phone,
  Mail,
  MapPin,
  Settings,
  Bell,
  Eye,
  Trash2
} from 'lucide-react';

// Types (imported from your types.ts file)
interface User {
  user_id: number;
  username: string;
  email: string;
  password: string;
}

interface UserProfile {
  user_profile_id: number;
  user: User;
  name: string;
  phone: string;
  date_of_birth: string;
  gender: "MALE" | "FEMALE" | "OTHER";
  height: number;
  weight: number;
  activity_level: "SEDENTARY" | "LIGHT" | "MODERATE" | "ACTIVE" | "VERY_ACTIVE";
  dietary_preferences: string;
  allergies: string;
  created_at: string;
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
  meals?: {
    breakfast: boolean;
    lunch: boolean;
    dinner: boolean;
  };
  isActive?: boolean;
  lastLogin?: string;
}

interface MealLog {
  meal_log_id: number;
  user: User;
  mess: Mess;
  meal_type: any;
  meal_date: string;
  logged_at: string;
  logged_by: User;
  notes?: string;
}

// Mock data
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

const mockMembers: MessMember[] = [
  {
    mess_member_id: 1,
    user: {
      user_id: 2,
      username: "john_doe",
      email: "john@example.com",
      password: ""
    },
    mess: mockMess,
    joined_date: "2024-01-15",
    is_active: true,
    created_at: "2024-01-15",
    updated_at: "2024-01-15",
    meals: {
      breakfast: true,
      lunch: true,
      dinner: false
    },
    isActive: true,
    lastLogin: "2024-01-20T10:30:00Z"
  },
  {
    mess_member_id: 2,
    user: {
      user_id: 3,
      username: "jane_smith",
      email: "jane@example.com",
      password: ""
    },
    mess: mockMess,
    joined_date: "2024-02-01",
    is_active: true,
    created_at: "2024-02-01",
    updated_at: "2024-02-01",
    meals: {
      breakfast: true,
      lunch: false,
      dinner: true
    },
    isActive: false,
    lastLogin: "2024-01-18T14:20:00Z"
  }
];

// Modal Component
const Modal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}> = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">{title}</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X size={20} />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};


// Add Member Form Component
interface AddMemberFormProps {
  onSubmit: (value: string) => void;
  onClose: () => void;
}

const AddMemberForm: React.FC<AddMemberFormProps> = ({ onSubmit, onClose }) => {
  const [inputValue, setInputValue] = useState("");

  const handleSendRequest = () => {
    onSubmit(inputValue); // call parent function
    onClose(); // close modal
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50">
      <div className="bg-white p-6 rounded-xl shadow-lg w-96 relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
        >
          <X className="w-5 h-5" />
        </button>

        <h2 className="text-lg font-semibold mb-4">Add Member</h2>
        <input
          type="text"
          placeholder="Enter username or email"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
        <button
          onClick={handleSendRequest}
          className="w-full py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600"
        >
          Send Request to Admin
        </button>
      </div>
    </div>
  );
};




// Member Management Component
const MemberManagement: React.FC<{
  members: MessMember[];
  onAddMember: (memberData: any) => void;
  onRemoveMember: (memberId: number) => void;
}> = ({ members, onAddMember, onRemoveMember }) => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('Members');

  const filteredMembers = members.filter(member =>
    (member.user.username || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
    (member.user.email || "").toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleMemberAction = (memberId: number, action: 'view' | 'remove') => {
    if (action === 'remove') {
      if (window.confirm('Are you sure you want to remove this member?')) {
        onRemoveMember(memberId);
      }
    } else if (action === 'view') {
      alert(`Viewing details for member ID: ${memberId}`);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-center mb-4">
        <div className="flex space-x-4">
          <button
            onClick={() => setActiveTab('Members')}
            className={`px-4 py-2 rounded-md ${activeTab === 'Members' 
              ? 'bg-blue-600 text-white' 
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            Members
          </button>
          <button
            onClick={() => setActiveTab('Managers')}
            className={`px-4 py-2 rounded-md ${activeTab === 'Managers' 
              ? 'bg-blue-600 text-white' 
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            Managers
          </button>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 flex items-center gap-2"
        >
          <UserPlus size={16} />
          Add Member
        </button>
      </div>

      <div className="mb-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
          <input
            type="text"
            placeholder="Search members"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left py-2">Members</th>
              <th className="text-left py-2">Today's Meals</th>
              <th className="text-left py-2">Emails</th>
              <th className="text-left py-2">Last Login</th>
              <th className="text-left py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
  {filteredMembers.map((member) => (
    <tr key={member.mess_member_id} className="border-b hover:bg-gray-50">
      <td className="py-3">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-medium">
           
            {member.user.username?.charAt(0).toUpperCase()}
          </div>
          <div>
            <div className="font-medium text-gray-900">{member.user.username}</div>
            <div className="text-sm text-gray-500">{member.user.email}</div>
          </div>
        </div>
      </td>

      {/* Today's Meals */}
      <td className="py-3">
        <div className="flex space-x-1">
          <span
            className={`w-3 h-3 rounded-full ${
              member.meals?.breakfast ? "bg-green-500" : "bg-gray-300"
            }`}
            title="Breakfast"
          ></span>
          <span
            className={`w-3 h-3 rounded-full ${
              member.meals?.lunch ? "bg-green-500" : "bg-gray-300"
            }`}
            title="Lunch"
          ></span>
          <span
            className={`w-3 h-3 rounded-full ${
              member.meals?.dinner ? "bg-green-500" : "bg-gray-300"
            }`}
            title="Dinner"
          ></span>
        </div>
        <div className="text-xs text-gray-500 mt-1">
          {member.meals
            ? `${[member.meals.breakfast, member.meals.lunch, member.meals.dinner].filter(Boolean).length}/3 meals`
            : "0/3 meals"}
        </div>
      </td>

      {/* Status */}
      <td className="py-3">
        <span
          className={`inline-flex items-center px-2 py-1 rounded-full text-xs ${
            member.isActive ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-600"
          }`}
        >
          {member.isActive ? "Active" : "Inactive"}
        </span>
      </td>

      {/* Last Login */}
      <td className="py-3 text-gray-500 text-sm">
        {member.lastLogin
          ? new Date(member.lastLogin).toLocaleString()
          : "Never"}
      </td>

      {/* Actions */}
      <td className="py-3">
        <div className="flex space-x-2">
          <button
            onClick={() => handleMemberAction(member.mess_member_id, "view")}
            className="p-1 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded"
            title="View Details"
          >
            <Eye size={16} />
          </button>
          <button
            onClick={() => handleMemberAction(member.mess_member_id, "remove")}
            className="p-1 text-red-600 hover:text-red-800 hover:bg-red-50 rounded"
            title="Remove Member"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </td>
    </tr>
  ))}
</tbody>

        </table>
      </div>

      <Modal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        title="Add New Member"
      >
        <AddMemberForm
          onSubmit={onAddMember}
          onClose={() => setShowAddModal(false)}
        />
      </Modal>
    </div>
  );
};

// Stats Card Component
const StatsCard: React.FC<{
  title: string;
  value: string | number;
  subtitle?: string;
  color: string;
  icon: React.ReactNode;
}> = ({ title, value, subtitle, color, icon }) => {
  const getColorClasses = (color: string) => {
    switch (color) {
      case 'text-blue-600':
        return { text: 'text-blue-600', bg: 'bg-blue-100' };
      case 'text-green-600':
        return { text: 'text-green-600', bg: 'bg-green-100' };
      case 'text-yellow-600':
        return { text: 'text-yellow-600', bg: 'bg-yellow-100' };
      case 'text-red-600':
        return { text: 'text-red-600', bg: 'bg-red-100' };
      default:
        return { text: 'text-gray-600', bg: 'bg-gray-100' };
    }
  };

  const colorClasses = getColorClasses(color);

  return (
    <div className="bg-white rounded-lg shadow p-6 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-500 text-sm font-medium">{title}</p>
          <p className={`text-2xl font-bold ${colorClasses.text} mt-1`}>{value}</p>
          {subtitle && <p className="text-sm text-gray-400 mt-1">{subtitle}</p>}
        </div>
        <div className={`p-3 rounded-full ${colorClasses.bg}`}>
          <div className={colorClasses.text}>
            {icon}
          </div>
        </div>
      </div>
    </div>
  );
};

// Nutrition Overview Component
const NutritionOverview: React.FC = () => {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <TrendingUp className="text-green-600" size={20} />
          Health & Nutrition Overview
        </h3>
        <span className="text-sm font-medium text-green-600 bg-green-100 px-2 py-1 rounded">8,210 kcal</span>
      </div>
      
      <div className="mb-6">
        <div className="flex justify-between text-sm mb-2">
          <span className="text-gray-600">Daily Target Progress</span>
          <span className="text-gray-600">75%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div className="bg-gradient-to-r from-green-400 to-green-600 h-3 rounded-full shadow-sm" style={{ width: '75%' }}></div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="text-center p-4 bg-red-50 rounded-lg border border-red-100">
          <div className="text-2xl font-bold text-red-600">33g</div>
          <div className="text-sm text-gray-600 font-medium">Sugar</div>
        </div>
        <div className="text-center p-4 bg-yellow-50 rounded-lg border border-yellow-100">
          <div className="text-2xl font-bold text-yellow-600">145g</div>
          <div className="text-sm text-gray-600 font-medium">Carbs</div>
        </div>
        <div className="text-center p-4 bg-blue-50 rounded-lg border border-blue-100">
          <div className="text-2xl font-bold text-blue-600">25g</div>
          <div className="text-sm text-gray-600 font-medium">Protein</div>
        </div>
        <div className="text-center p-4 bg-green-50 rounded-lg border border-green-100">
          <div className="text-2xl font-bold text-green-600">18g</div>
          <div className="text-sm text-gray-600 font-medium">Fat</div>
        </div>
      </div>
    </div>
  );
};

// Meal Logging Component
const MealLogging: React.FC = () => {
  const [showReminder, setShowReminder] = useState(true);

  const handleSendReminder = () => {
    alert('Reminder sent to all members who haven\'t logged their meals!');
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
        <Calendar className="text-blue-600" size={20} />
        Meal Logging Overview
      </h3>
      
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="text-center p-4 bg-green-50 rounded-lg border border-green-100">
          <div className="text-2xl font-bold text-green-600">18</div>
          <div className="text-sm text-gray-600 font-medium">Logged today</div>
        </div>
        <div className="text-center p-4 bg-yellow-50 rounded-lg border border-yellow-100">
          <div className="text-2xl font-bold text-yellow-600">4</div>
          <div className="text-sm text-gray-600 font-medium">Pending</div>
        </div>
        <div className="text-center p-4 bg-red-50 rounded-lg border border-red-100">
          <div className="text-2xl font-bold text-red-600">2</div>
          <div className="text-sm text-gray-600 font-medium">Missed</div>
        </div>
      </div>

      {showReminder && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <AlertTriangle className="text-red-500" size={16} />
              <span className="text-red-700 font-medium text-sm">Missing Meal Logs</span>
            </div>
            <button
              onClick={() => setShowReminder(false)}
              className="text-red-500 hover:text-red-700"
            >
              <X size={16} />
            </button>
          </div>
          <p className="text-red-600 text-sm mt-1">
            3 members haven't logged dinner yet
          </p>
        </div>
      )}

      <button 
        onClick={handleSendReminder}
        className="w-full bg-red-600 text-white py-3 rounded-md hover:bg-red-700 transition-colors font-medium"
      >
        Send Reminder
      </button>
    </div>
  );
};

// Expense Component
const ExpenseSection: React.FC = () => {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
        <DollarSign className="text-yellow-600" size={20} />
        Expense & Billing Details
      </h3>
      
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="text-center p-4 bg-blue-50 rounded-lg border border-blue-100">
          <div className="text-xl font-bold text-blue-600">₹16,430</div>
          <div className="text-sm text-gray-600 font-medium">This Month</div>
          <div className="text-xs text-blue-500 mt-1">Monthly Budget</div>
        </div>
        <div className="text-center p-4 bg-green-50 rounded-lg border border-green-100">
          <div className="text-xl font-bold text-green-600">₹17,200</div>
          <div className="text-sm text-gray-600 font-medium">Last Month</div>
          <div className="text-xs text-green-500 mt-1">Avg Expenditure</div>
        </div>
        <div className="text-center p-4 bg-yellow-50 rounded-lg border border-yellow-100">
          <div className="text-xl font-bold text-yellow-600">₹78.5</div>
          <div className="text-sm text-gray-600 font-medium">Avg Cost/Day</div>
          <div className="text-xs text-yellow-500 mt-1">Per Member</div>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <div className="flex justify-between text-sm mb-3 font-medium">
            <span>Recent Expenses</span>
            <span>As per bills</span>
          </div>
          
          <div className="space-y-3">
            <div className="flex justify-between items-center py-3 px-4 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-sm font-medium">Vegetables</span>
              </div>
              <span className="font-bold text-gray-900">₹450</span>
            </div>
            <div className="flex justify-between items-center py-3 px-4 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                <span className="text-sm font-medium">Rice</span>
              </div>
              <span className="font-bold text-gray-900">₹800</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Main Dashboard Component
const MessManagementDashboard: React.FC = () => {
  const [members, setMembers] = useState<MessMember[]>(mockMembers);
  const [mess] = useState<Mess>(mockMess);

  const handleAddMember = (memberData: any) => {
    const newMember: MessMember = {
      mess_member_id: members.length + 1,
      user: {
        user_id: members.length + 10,
        username: memberData.username,
        email: memberData.email,
        password: ""
      },
      mess: mess,
      joined_date: new Date().toISOString().split('T')[0],
      is_active: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
    
    setMembers([...members, newMember]);
    alert('Member added successfully!');
  };

  const handleRemoveMember = (memberId: number) => {
    setMembers(members.filter(member => member.mess_member_id !== memberId));
    alert('Member removed successfully!');
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Mess Management Dashboard</h1>
          <p className="text-gray-600">Detailed management for <span className="font-medium text-blue-600">{mess.mess_name}</span></p>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatsCard
            title="Total Members"
            value={members.length}
            subtitle="Active Members"
            color="text-blue-600"
            icon={<Users size={24} />}
          />
          <StatsCard
            title="Meals Today"
            value={68}
            subtitle="Total Served"
            color="text-green-600"
            icon={<Calendar size={24} />}
          />
          <StatsCard
            title="Monthly Charge"
            value={`₹${mess.monthly_service_charge}`}
            subtitle="Monthly Revenue"
            color="text-yellow-600"
            icon={<DollarSign size={24} />}
          />
          <StatsCard
            title="Overdue"
            value={`₹${(mess.monthly_service_charge * 0.1).toFixed(0)}`}
            subtitle="Pending Payments"
            color="text-red-600"
            icon={<AlertTriangle size={24} />}
          />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            <MemberManagement
              members={members}
              onAddMember={handleAddMember}
              onRemoveMember={handleRemoveMember}
            />
            <MealLogging />
            <ExpenseSection />
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            <NutritionOverview />
            
            {/* Additional Info Card */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Settings className="text-gray-600" size={20} />
                Mess Information
              </h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-sm">
                  <MapPin className="text-gray-400" size={16} />
                  <span className="text-gray-600">{mess.address}</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Users className="text-gray-400" size={16} />
                  <span className="text-gray-600">Max Capacity: {mess.max_members} members</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Mail className="text-gray-400" size={16} />
                  <span className="text-gray-600">{mess.manager.email}</span>
                </div>
                <div className="mt-4 p-3 bg-green-50 rounded-lg">
                  <div className="text-sm font-medium text-green-800">Mess Code</div>
                  <div className="text-lg font-bold text-green-600">{mess.mess_code}</div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Bell className="text-blue-600" size={20} />
                Quick Actions
              </h3>
              <div className="space-y-3">
                <button className="w-full text-left p-3 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors">
                  <div className="font-medium text-blue-800">Generate Monthly Bill</div>
                  <div className="text-sm text-blue-600">Create bills for all members</div>
                </button>
                <button className="w-full text-left p-3 bg-green-50 hover:bg-green-100 rounded-lg transition-colors">
                  <div className="font-medium text-green-800">Export Reports</div>
                  <div className="text-sm text-green-600">Download expense reports</div>
                </button>
                <button className="w-full text-left p-3 bg-yellow-50 hover:bg-yellow-100 rounded-lg transition-colors">
                  <div className="font-medium text-yellow-800">Mess Settings</div>
                  <div className="text-sm text-yellow-600">Configure mess preferences</div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessManagementDashboard;