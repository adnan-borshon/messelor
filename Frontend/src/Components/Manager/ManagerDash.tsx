import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, AreaChart, Area, BarChart, Bar } from 'recharts';
import { 
  AlertTriangle,
  TrendingUp,
  Users,
  DollarSign,
  Utensils,
  Calendar,
  Download,
  FileText,
  Plus,
  Star,
  Trophy,
  Target,
  CheckCircle,
  UserPlus,
  Settings,
  Eye,
  Edit,
  Trash2, X
} from 'lucide-react';

// Mock data
const dashboardStats = {
  todayMeals: 42,
  totalRevenue: 94200,
  totalExpenses: 850,
  totalMembers: 12,
  activePlans: 18
};

const mealLogsData = [
  { day: 'Mon', meals: 45 },
  { day: 'Tue', meals: 52 },
  { day: 'Wed', meals: 38 },
  { day: 'Thu', meals: 65 },
  { day: 'Fri', meals: 42 },
  { day: 'Sat', meals: 55 },
  { day: 'Sun', meals: 48 }
];

const costForecastData = [
  { month: 'Jan', cost: 85000 },
  { month: 'Feb', cost: 92000 },
  { month: 'Mar', cost: 88000 },
  { month: 'Apr', cost: 95000 },
  { month: 'May', cost: 94200 },
  { month: 'Jun', cost: 98000 }
];

const members = [
  { id: 1, name: 'Sarah Johnson', avatar: '👩', mealCount: 24, lastActive: 'Online', status: 'Active' },
  { id: 2, name: 'Mike Chen', avatar: '👨', mealCount: 31, lastActive: '2h ago', status: 'Inactive' }
];

const achievements = [
  { title: 'Gold Streak', description: 'Logged meals for 30 days', icon: Trophy, color: 'text-yellow-500' },
  { title: 'Health Champion', description: 'Made 50 healthy choices', icon: Target, color: 'text-green-500' }
];

const alerts = [
  { type: 'expense', message: 'Expense Anomaly Detected', detail: 'Unusual cost detected for vegetables today', severity: 'warning' },
  { type: 'inventory', message: 'Inventory Reminder', detail: 'Consider restocking staples this week', severity: 'info' }
];

// PDF Generation utility
const generatePDFContent = (content: string, title: string): string => {
  return `
%PDF-1.4
1 0 obj
<<
/Type /Catalog
/Pages 2 0 R
>>
endobj

2 0 obj
<<
/Type /Pages
/Kids [3 0 R]
/Count 1
>>
endobj

3 0 obj
<<
/Type /Page
/Parent 2 0 R
/MediaBox [0 0 612 792]
/Contents 4 0 R
/Resources <<
/Font <<
/F1 5 0 R
>>
>>
>>
endobj

4 0 obj
<<
/Length ${content.length + 200}
>>
stream
BT
/F1 16 Tf
72 720 Td
(${title}) Tj
0 -30 Td
/F1 12 Tf
${content.split('\n').map((line, index) => `0 -${index === 0 ? 0 : 15} Td\n(${line.trim()}) Tj`).join('\n')}
ET
endstream
endobj

5 0 obj
<<
/Type /Font
/Subtype /Type1
/BaseFont /Helvetica
>>
endobj

xref
0 6
0000000000 65535 f 
0000000010 00000 n 
0000000053 00000 n 
0000000125 00000 n 
0000000348 00000 n 
0000000565 00000 n 
trailer
<<
/Size 6
/Root 1 0 R
>>
startxref
625
%%EOF`;
};

const downloadPDF = (content: string, filename: string, title: string) => {
  const pdfContent = generatePDFContent(content, title);
  const blob = new Blob([pdfContent], { type: 'application/pdf' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};

// Header Component
const ManagerHeader: React.FC = () => (
  <div className="bg-white rounded-lg p-6 shadow-sm">
    <h1 className="text-2xl font-bold text-gray-900 mb-2">Manager Dashboard</h1>
    <p className="text-gray-600">Manage your mess operations and restaurant insights</p>
  </div>
);

// Alert Component
interface AlertProps {
  type: string;
  message: string;
  detail: string;
  severity: 'warning' | 'info' | 'error';
}

const Alert: React.FC<AlertProps> = ({ type, message, detail, severity }) => {
  const getAlertStyles = (severity: string) => {
    switch (severity) {
      case 'warning': return 'bg-orange-50 border-orange-200 text-orange-800';
      case 'info': return 'bg-blue-50 border-blue-200 text-blue-800';
      case 'error': return 'bg-red-50 border-red-200 text-red-800';
      default: return 'bg-gray-50 border-gray-200 text-gray-800';
    }
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'expense': return <AlertTriangle className="h-5 w-5" />;
      case 'inventory': return <TrendingUp className="h-5 w-5" />;
      default: return <AlertTriangle className="h-5 w-5" />;
    }
  };

  return (
    <div className={`p-4 rounded-lg border ${getAlertStyles(severity)} mb-4`}>
      <div className="flex items-start gap-3">
        {getIcon(type)}
        <div>
          <h4 className="font-semibold">{message}</h4>
          <p className="text-sm mt-1 opacity-80">{detail}</p>
        </div>
      </div>
    </div>
  );
};

// Alerts Section Component
// const AlertsSection: React.FC = () => (
//   <div className="space-y-4">
//     {alerts.map((alert, index) => (
//       <Alert
//         key={index}
//         type={alert.type}
//         message={alert.message}
//         detail={alert.detail}
//         severity={alert.severity}
//       />
//     ))}
//   </div>
// );

// Metric Card Component
interface MetricCardProps {
  icon: React.ReactNode;
  value: string | number;
  label: string;
  bgColor: string;
  iconColor: string;
  textColor: string;
  buttonText: string;
  buttonColor: string;
  onButtonClick?: () => void;
}

const MetricCard: React.FC<MetricCardProps> = ({ 
  icon, 
  value, 
  label, 
  bgColor, 
  iconColor, 
  textColor,
  buttonText,
  buttonColor,
  onButtonClick 
}) => (
  <div className={`${bgColor} rounded-lg p-6`}>
    <div className="flex items-center justify-between mb-4">
      <div className={`p-2 rounded-lg ${iconColor}`}>
        {icon}
      </div>
      <div className="text-right">
        <div className="text-2xl font-bold text-gray-900">{value}</div>
        <div className={`text-sm ${textColor} font-medium`}>{label}</div>
      </div>
    </div>
    <button 
      onClick={onButtonClick}
      className={`w-full py-2 px-4 rounded-lg text-white font-medium ${buttonColor} hover:opacity-90 transition-opacity`}
    >
      {buttonText}
    </button>
  </div>
);

// Dashboard Stats Component
interface DashboardStatsProps {
  onExportReport: () => void;
  isExporting: boolean;
}

import { useNavigate } from "react-router-dom";

const DashboardStats: React.FC<DashboardStatsProps> = ({ onExportReport, isExporting }) => {
  const navigate = useNavigate();

  const handleLogMeal = () => navigate("/log-meal");
  const handleViewBill = () => navigate("/billing");
  const handleBookTable = () => navigate("/book-table");
  const handleManageMembers = () => navigate("/manage-members");

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
      <MetricCard
        icon={<Utensils className="h-6 w-6 text-white" />}
        value={dashboardStats.todayMeals}
        label="Today Meals"
        bgColor="bg-blue-50"
        iconColor="bg-blue-500"
        textColor="text-blue-600"
        buttonText="Log Meal"
        buttonColor="bg-blue-500 cursor-pointer"
        onButtonClick={handleLogMeal}
      />
      <MetricCard
        icon={<DollarSign className="h-6 w-6 text-white" />}
        value={`₹${dashboardStats.totalRevenue.toLocaleString()}`}
        label="Total Revenue"
        bgColor="bg-green-50"
        iconColor="bg-green-500"
        textColor="text-green-600"
        buttonText="View Bill"
        buttonColor="bg-green-500 cursor-pointer"
        onButtonClick={handleViewBill}
      />
      <MetricCard
        icon={<TrendingUp className="h-6 w-6 text-white" />}
        value={`₹${dashboardStats.totalExpenses}`}
        label="Total Expenses"
        bgColor="bg-purple-50"
        iconColor="bg-purple-500"
        textColor="text-purple-600"
        buttonText="Book Table"
        buttonColor="bg-purple-500 cursor-pointer"
        onButtonClick={handleBookTable}
      />
      <MetricCard
        icon={<Users className="h-6 w-6 text-white" />}
        value={dashboardStats.totalMembers}
        label="Total Members"
        bgColor="bg-orange-50"
        iconColor="bg-orange-500"
        textColor="text-orange-600"
        buttonText="Manage Members"
        buttonColor="bg-orange-500 cursor-pointer"
        onButtonClick={handleManageMembers}
      />
      <MetricCard
        icon={<Calendar className="h-6 w-6 text-white" />}
        value={dashboardStats.activePlans}
        label="Active Plans"
        bgColor="bg-indigo-50"
        iconColor="bg-indigo-500"
        textColor="text-indigo-600"
        buttonText="Download Report"
        buttonColor="bg-indigo-500 cursor-pointer"
        onButtonClick={onExportReport}
      />
    </div>
  );
};


// Chart Card Component
interface ChartCardProps {
  title: string;
  children: React.ReactNode;
  actions?: React.ReactNode;
}

const ChartCard: React.FC<ChartCardProps> = ({ title, children, actions }) => (
  <div className="bg-white rounded-lg p-6 shadow-sm">
    <div className="flex justify-between items-center mb-6">
      <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
      {actions}
    </div>
    {children}
  </div>
);

// Meal Logs Chart Component
const MealLogsChart: React.FC = () => (
  <ChartCard title="📊 Meal Logs Overview">
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={mealLogsData}>
          <XAxis dataKey="day" axisLine={false} tickLine={false} />
          <YAxis axisLine={false} tickLine={false} />
          <Line 
            type="monotone" 
            dataKey="meals" 
            stroke="#3B82F6" 
            strokeWidth={3}
            dot={{ fill: '#3B82F6', strokeWidth: 2, r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  </ChartCard>
);

// Health Score Component
const HealthScore: React.FC = () => (
  <ChartCard title="🏥 Health Score">
    <div className="text-center py-8">
      <div className="inline-flex items-center justify-center w-32 h-32 rounded-full bg-green-100 mb-4">
        <div className="text-4xl font-bold text-green-600">87%</div>
      </div>
      <p className="text-gray-600">Overall Health Score</p>
      <p className="text-sm text-gray-500 mt-2">Based on meal quality and nutrition</p>
    </div>
  </ChartCard>
);

// Achievement Card Component
interface AchievementCardProps {
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
}

const AchievementCard: React.FC<AchievementCardProps> = ({ title, description, icon: Icon, color }) => (
  <div className="flex items-center gap-4 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
    <div className="p-3 bg-yellow-100 rounded-full">
      <Icon className={`h-6 w-6 ${color}`} />
    </div>
    <div>
      <h4 className="font-semibold text-gray-900">{title}</h4>
      <p className="text-sm text-gray-600">{description}</p>
    </div>
  </div>
);

// Achievements Component
const Achievements: React.FC = () => (
  <ChartCard title="🏆 Achievements">
    <div className="space-y-4">
      {achievements.map((achievement, index) => (
        <AchievementCard
          key={index}
          title={achievement.title}
          description={achievement.description}
          icon={achievement.icon}
          color={achievement.color}
        />
      ))}
    </div>
  </ChartCard>
);

// Monthly Cost Forecast Component
interface MonthlyCostForecastProps {
  onGenerateReport: () => void;
  onDownloadReport: () => void;
  isGenerating: boolean;
  isDownloading: boolean;
}

const MonthlyCostForecast: React.FC<MonthlyCostForecastProps> = ({
  onGenerateReport,
  onDownloadReport,
  isGenerating,
  isDownloading
}) => (
  <ChartCard 
    title="💰 Monthly Cost Forecast"
    actions={
      <div className="flex gap-2">
        <button
          onClick={onGenerateReport}
          disabled={isGenerating}
          className="flex items-center gap-2 px-3 py-1 bg-green-500 text-white rounded text-sm hover:bg-green-600 disabled:bg-green-300"
        >
          <FileText className="h-4 w-4" />
          {isGenerating ? 'Generating...' : 'Generate Report'}
        </button>
        <button
          onClick={onDownloadReport}
          disabled={isDownloading}
          className="flex items-center gap-2 px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600 disabled:bg-blue-300"
        >
          <Download className="h-4 w-4" />
          {isDownloading ? 'Downloading...' : 'Download Report'}
        </button>
      </div>
    }
  >
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={costForecastData}>
          <XAxis dataKey="month" axisLine={false} tickLine={false} />
          <YAxis axisLine={false} tickLine={false} tickFormatter={(value) => `₹${value/1000}k`} />
          <Area 
            type="monotone" 
            dataKey="cost" 
            stroke="#8B5CF6" 
            fill="url(#colorCost)"
            strokeWidth={2}
          />
          <defs>
            <linearGradient id="colorCost" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0}/>
            </linearGradient>
          </defs>
        </AreaChart>
      </ResponsiveContainer>
    </div>
  </ChartCard>
);

// Member Row Component
interface MemberRowProps {
  member: typeof members[0];
  onView: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

const MemberRow: React.FC<MemberRowProps> = ({ member, onView, onEdit, onDelete }) => (
  <tr className="hover:bg-gray-50">
    <td className="py-4 px-6">
      <div className="flex items-center gap-3">
        <span className="text-2xl">{member.avatar}</span>
        <span className="font-medium text-gray-900">{member.name}</span>
      </div>
    </td>
    <td className="py-4 px-6 text-gray-600">{member.mealCount}</td>
    <td className="py-4 px-6 text-gray-600">{member.lastActive}</td>
    <td className="py-4 px-6">
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
        member.status === 'Active' 
          ? 'bg-green-100 text-green-800' 
          : 'bg-yellow-100 text-yellow-800'
      }`}>
        {member.status}
      </span>
    </td>
    <td className="py-4 px-6">
      <div className="flex items-center gap-2">
        <button
          onClick={onView}
          className="p-1 text-blue-600 hover:bg-blue-50 rounded"
          title="View"
        >
          <Eye className="h-4 w-4" />
        </button>
        <button
          onClick={onEdit}
          className="p-1 text-green-600 hover:bg-green-50 rounded"
          title="Edit"
        >
          <Edit className="h-4 w-4" />
        </button>
        <button
          onClick={onDelete}
          className="p-1 text-red-600 hover:bg-red-50 rounded"
          title="Delete"
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </div>
    </td>
  </tr>
);

// Manage Members Component
const ManageMembers: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const handleAddMember = () => setIsModalOpen(true);

  const handleSendRequest = () => {
    alert(`Request sent to admin for: ${inputValue}`);
    setIsModalOpen(false);
    setInputValue("");
  };

  return (
    <ChartCard
      title="👥 Manage Members"
      actions={
        <button
          onClick={handleAddMember}
          className="flex items-center cursor-pointer gap-2 px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600"
        >
          <Plus className="h-4 w-4" />
          Add Member
        </button>
      }
    >
      {/* Search Bar */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search members..."
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
      </div>

      {/* Members Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-3 px-6 font-medium text-gray-700">Member Name</th>
              <th className="text-left py-3 px-6 font-medium text-gray-700">Meal Count</th>
              <th className="text-left py-3 px-6 font-medium text-gray-700">Last Active</th>
              <th className="text-left py-3 px-6 font-medium text-gray-700">Status</th>
              <th className="text-left py-3 px-6 font-medium text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {members.map((member) => (
              <MemberRow
                key={member.id}
                member={member}
                onView={() => alert(`View member ${member.id}`)}
                onEdit={() => alert(`Edit member ${member.id}`)}
                onDelete={() => alert(`Delete member ${member.id}`)}
              />
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          {/* Background Blur */}
          <div
            className="absolute inset-0 backdrop-blur-xs"
            onClick={() => setIsModalOpen(false)}
          ></div>

          {/* Modal Box */}
          <div className="relative bg-white rounded-2xl shadow-lg p-6 w-full max-w-md z-10">
            {/* Close Button */}
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute cursor-pointer top-3 right-3 text-gray-500 hover:text-gray-700"
            >
              <X className="w-5 h-5" />
            </button>

            <h2 className="text-lg font-semibold text-gray-800 mb-4">Add Member</h2>
            <input
              type="text"
              placeholder="Enter username or email"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <button
              onClick={handleSendRequest}
              className="w-full cursor-pointer py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600"
            >
              Send Request to Admin
            </button>
          </div>
        </div>
      )}
    </ChartCard>
  );
};
// Main Component
const ManagerDash: React.FC = () => {
  const [isExporting, setIsExporting] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  const handleExportReport = async () => {
    setIsExporting(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const reportContent = `
MANAGER DASHBOARD REPORT
=======================

Generated on: ${new Date().toLocaleDateString()}
Report Period: Current Month

DASHBOARD OVERVIEW:
Today's Meals: ${dashboardStats.todayMeals}
Total Revenue: ₹${dashboardStats.totalRevenue.toLocaleString()}
Total Expenses: ₹${dashboardStats.totalExpenses}
Total Members: ${dashboardStats.totalMembers}
Active Plans: ${dashboardStats.activePlans}

MEAL LOGS ANALYSIS:
Weekly meal distribution shows consistent patterns
Average daily meals: ${Math.round(mealLogsData.reduce((sum, day) => sum + day.meals, 0) / mealLogsData.length)}
Peak day: ${mealLogsData.reduce((max, day) => day.meals > max.meals ? day : max).day} (${mealLogsData.reduce((max, day) => day.meals > max.meals ? day : max).meals} meals)

COST FORECAST:
Current month projection: ₹${dashboardStats.totalRevenue.toLocaleString()}
6-month average: ₹${Math.round(costForecastData.reduce((sum, month) => sum + month.cost, 0) / costForecastData.length).toLocaleString()}
Trend: Steady growth with seasonal variations

MEMBER MANAGEMENT:
Total Active Members: ${members.filter(m => m.status === 'Active').length}
Total Inactive Members: ${members.filter(m => m.status === 'Inactive').length}
Average Meals per Member: ${Math.round(members.reduce((sum, member) => sum + member.mealCount, 0) / members.length)}

HEALTH METRICS:
Overall Health Score: 87%
Health trend: Positive improvement over last month
Nutritional compliance: High

ACHIEVEMENTS UNLOCKED:
${achievements.map(achievement => `- ${achievement.title}: ${achievement.description}`).join('\n')}

ALERTS & NOTIFICATIONS:
${alerts.map(alert => `- ${alert.message}: ${alert.detail}`).join('\n')}

RECOMMENDATIONS:
1. Continue monitoring expense anomalies
2. Plan inventory restocking for next week
3. Maintain current member engagement levels
4. Consider expanding meal options based on demand patterns

OPERATIONAL METRICS:
- Member satisfaction: High
- Cost efficiency: Optimized
- Food quality: Excellent
- Service delivery: On-time

Contact: manager@messmanagement.com
Next Review: ${new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString()}
      `;
      
      downloadPDF(
        reportContent,
        `manager-dashboard-${new Date().toISOString().slice(0, 7)}.pdf`,
        'Manager Dashboard Report'
      );
      
      alert('Dashboard report exported successfully!');
    } catch (error) {
      alert('Failed to export report. Please try again.');
    } finally {
      setIsExporting(false);
    }
  };

  const handleGenerateReport = async () => {
    setIsGenerating(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const costAnalysisContent = `
MONTHLY COST ANALYSIS REPORT
===========================

Generated on: ${new Date().toLocaleDateString()}
Analysis Period: Last 6 Months

COST BREAKDOWN BY MONTH:
${costForecastData.map(month => 
  `${month.month}: ₹${month.cost.toLocaleString()}`
).join('\n')}

FINANCIAL SUMMARY:
Total Spending (6 months): ₹${costForecastData.reduce((sum, month) => sum + month.cost, 0).toLocaleString()}
Average Monthly Cost: ₹${Math.round(costForecastData.reduce((sum, month) => sum + month.cost, 0) / costForecastData.length).toLocaleString()}
Highest Month: ${costForecastData.reduce((max, month) => month.cost > max.cost ? month : max).month} (₹${costForecastData.reduce((max, month) => month.cost > max.cost ? month : max).cost.toLocaleString()})
Lowest Month: ${costForecastData.reduce((min, month) => month.cost < min.cost ? month : min).month} (₹${costForecastData.reduce((min, month) => month.cost < min.cost ? month : min).cost.toLocaleString()})

VARIANCE ANALYSIS:
Monthly variance: ±8.5%
Budget adherence: 94%
Cost per meal trend: Stable

FORECAST PROJECTIONS:
Next month estimate: ₹96,000
Quarter estimate: ₹285,000
Cost optimization opportunities: 12%

RECOMMENDATIONS:
- Monitor seasonal cost fluctuations
- Negotiate better supplier rates
- Implement bulk purchasing strategies
- Optimize portion control to reduce waste
      `;
      
      downloadPDF(
        costAnalysisContent,
        `cost-analysis-${new Date().toISOString().slice(0, 7)}.pdf`,
        'Monthly Cost Analysis Report'
      );
      
      alert('Cost analysis report generated successfully!');
    } catch (error) {
      alert('Failed to generate report. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownloadReport = async () => {
    setIsDownloading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const detailedReportContent = `
COMPREHENSIVE OPERATIONS REPORT
==============================

Generated on: ${new Date().toLocaleDateString()}
Report ID: RPT-${Date.now()}

EXECUTIVE SUMMARY:
The mess operations are performing well with consistent meal delivery
and member satisfaction. Revenue targets are being met with controlled
expense management.

OPERATIONAL PERFORMANCE:
Daily Meal Average: ${Math.round(mealLogsData.reduce((sum, day) => sum + day.meals, 0) / mealLogsData.length)} meals
Service Efficiency: 96%
Member Retention Rate: 94%
Food Quality Score: 8.7/10

FINANCIAL PERFORMANCE:
Revenue Growth: +12% MoM
Cost Control: Within budget (-3%)
Profit Margin: 23%
ROI: 18%

MEMBER SATISFACTION:
Overall Satisfaction: 87%
Service Rating: 4.4/5
Food Quality Rating: 4.2/5
Value for Money: 4.5/5

OPERATIONAL CHALLENGES:
- Occasional supply chain delays
- Peak hour service bottlenecks
- Seasonal ingredient price fluctuations

STRATEGIC RECOMMENDATIONS:
1. Invest in additional kitchen equipment
2. Expand supplier network for better reliability
3. Implement dynamic pricing for peak hours
4. Enhance staff training programs
5. Introduce loyalty programs for long-term members

COMPLIANCE STATUS:
Food Safety: Compliant
Health Department: Approved
Financial Audit: Clean
Staff Certifications: Up-to-date

Prepared by: Manager Dashboard System
Approved by: Operations Manager
Distribution: Stakeholders, Board of Directors
      `;
      
      downloadPDF(
        detailedReportContent,
        `operations-report-${new Date().toISOString().slice(0, 7)}.pdf`,
        'Comprehensive Operations Report'
      );
      
      alert('Detailed operations report downloaded successfully!');
    } catch (error) {
      alert('Failed to download report. Please try again.');
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <ManagerHeader />
        
        {/* <AlertsSection /> */}
        
        <DashboardStats 
          onExportReport={handleExportReport}
          isExporting={isExporting}
        />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <MealLogsChart />
             <ManageMembers />
          </div>
          <div className="space-y-6">
            <HealthScore />
            <Achievements />
          </div>
        </div>

        <MonthlyCostForecast
          onGenerateReport={handleGenerateReport}
          onDownloadReport={handleDownloadReport}
          isGenerating={isGenerating}
          isDownloading={isDownloading}
        />
        
       
      </div>
    </div>
  );
};

export default ManagerDash;