import React, { useState } from 'react';
import { 
  Users, 
  Utensils, 
  DollarSign,
  TrendingUp,
  Award,
  Calendar,
  Clock,
  Star,
  Trophy,
  CheckCircle,
  Target,
  Download,
  FileText
} from 'lucide-react';

// Mock data
const messOverviewData = {
  totalMembers: 12,
  mealsLogged: 28,
  totalSpend: 894
};

const recentActivity = [
  { user: 'Anmrita', action: 'logged lunch', time: '2 mins ago', icon: Utensils },
  { user: 'Nishita', action: 'added expenses for vegetables', time: '5 mins ago', icon: DollarSign },
  { user: 'Rahul', action: 'logged breakfast', time: '1 hour ago', icon: Utensils }
];

const topMembers = [
  { id: 1, name: 'Nishita', role: '5th member', rank: 1, avatar: '👩', score: 95 },
  { id: 2, name: 'Devi', role: '3rd year', rank: 2, avatar: '👨', score: 87 },
  { id: 3, name: 'Ashwin', role: '2nd year', rank: 3, avatar: '👨', score: 82 }
];

const topMesses = [
  { id: 1, name: 'Green Valley Mess', satisfaction: '91% satisfaction', rank: 1, score: 91 },
  { id: 2, name: 'Sunrise Mess', satisfaction: '85% satisfaction', rank: 2, score: 85 },
  { id: 3, name: 'Campus Central', satisfaction: '78% satisfaction', rank: 3, score: 78 }
];

const memberActivities = [
  { name: 'Ashwin', status: 'Online 9m+', meals: 9, expenses: 2, health: 87, healthColor: 'bg-green-500' },
  { name: 'Nishita', status: 'Offline 30m', meals: 12, expenses: 1, health: 92, healthColor: 'bg-green-500' },
  { name: 'Rahul', status: 'Offline 40m', meals: 8, expenses: 3, health: 75, healthColor: 'bg-yellow-500' },
  { name: 'Priya', status: 'Online 10m', meals: 11, expenses: 1, health: 85, healthColor: 'bg-green-500' }
];

const achievements = [
  { title: '7-Day Meal Streak', description: 'Achieved by 8 members', icon: Target, color: 'text-green-500' },
  { title: 'Healthy Choice Award', description: 'Awarded to 3 members', icon: Award, color: 'text-blue-500' }
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
const CommunityHeader: React.FC = () => (
  <div className="bg-white rounded-lg p-6 shadow-sm">
    <h1 className="text-2xl font-bold text-gray-900 mb-2">Community Stats</h1>
    <p className="text-gray-600">Track mess performance and member activities</p>
  </div>
);

// Metric Overview Card Component
interface MetricCardProps {
  icon: React.ReactNode;
  value: string | number;
  label: string;
  bgColor: string;
  iconColor: string;
  textColor: string;
}

const MetricCard: React.FC<MetricCardProps> = ({ 
  icon, 
  value, 
  label, 
  bgColor, 
  iconColor, 
  textColor 
}) => (
  <div className={`${bgColor} rounded-lg p-4 flex items-center gap-3`}>
    <div className={`p-2 rounded-lg ${iconColor}`}>
      {icon}
    </div>
    <div>
      <div className="text-2xl font-bold text-gray-900">{value}</div>
      <div className={`text-sm ${textColor} font-medium`}>{label}</div>
    </div>
  </div>
);

// Recent Activity Item Component
interface ActivityItemProps {
  user: string;
  action: string;
  time: string;
  icon: React.ComponentType<{ className?: string }>;
}

const ActivityItem: React.FC<ActivityItemProps> = ({ user, action, time, icon: Icon }) => (
  <div className="flex items-center gap-3 py-2">
    <div className="p-1 rounded-full bg-blue-100">
      <Icon className="h-4 w-4 text-blue-600" />
    </div>
    <div className="flex-1">
      <span className="font-medium text-gray-900">{user}</span>
      <span className="text-gray-600"> {action}</span>
      <div className="text-xs text-gray-500">{time}</div>
    </div>
  </div>
);

// Recent Activity Component
const RecentActivity: React.FC = () => (
  <div className="mt-6">
    <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
    <div className="space-y-2">
      {recentActivity.map((activity, index) => (
        <ActivityItem
          key={index}
          user={activity.user}
          action={activity.action}
          time={activity.time}
          icon={activity.icon}
        />
      ))}
    </div>
  </div>
);

// Mess Overview Component
interface MessOverviewProps {
  onGenerateReport: () => void;
  isGenerating: boolean;
}

const MessOverview: React.FC<MessOverviewProps> = ({ onGenerateReport, isGenerating }) => (
  <div className="bg-white rounded-lg p-6 shadow-sm">
    <div className="flex justify-between items-center mb-6">
      <h2 className="text-xl font-semibold text-gray-900">Mess Overview</h2>
      <button
        onClick={onGenerateReport}
        disabled={isGenerating}
        className="flex cursor-pointer items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-blue-300"
      >
        <FileText className="h-4 w-4" />
        {isGenerating ? 'Generating...' : 'Export Report'}
      </button>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <MetricCard
        icon={<Users className="h-6 w-6 text-white" />}
        value={messOverviewData.totalMembers}
        label="Total Members"
        bgColor="bg-blue-50"
        iconColor="bg-blue-500"
        textColor="text-blue-600"
      />
      <MetricCard
        icon={<Utensils className="h-6 w-6 text-white" />}
        value={messOverviewData.mealsLogged}
        label="Meals Logged"
        bgColor="bg-green-50"
        iconColor="bg-green-500"
        textColor="text-green-600"
      />
      <MetricCard
        icon={<DollarSign className="h-6 w-6 text-white" />}
        value={`₹${messOverviewData.totalSpend}`}
        label="Total Spend"
        bgColor="bg-orange-50"
        iconColor="bg-orange-500"
        textColor="text-orange-600"
      />
    </div>

    <RecentActivity />
  </div>
);

// Ranking Item Component
interface RankingItemProps {
  rank: number;
  name: string;
  subtitle: string;
  score?: number;
  avatar?: string;
}

const RankingItem: React.FC<RankingItemProps> = ({ rank, name, subtitle, score, avatar }) => {
  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1: return <Trophy className="h-5 w-5 text-yellow-500" />;
      case 2: return <Award className="h-5 w-5 text-gray-400" />;
      case 3: return <Star className="h-5 w-5 text-orange-500" />;
      default: return <span className="text-gray-500 font-bold">{rank}</span>;
    }
  };

  const getRankBg = (rank: number) => {
    switch (rank) {
      case 1: return 'bg-yellow-50 border-yellow-200';
      case 2: return 'bg-gray-50 border-gray-200';
      case 3: return 'bg-orange-50 border-orange-200';
      default: return 'bg-white border-gray-200';
    }
  };

  return (
    <div className={`flex items-center justify-between p-3 rounded-lg border ${getRankBg(rank)}`}>
      <div className="flex items-center gap-3">
        <div className="flex items-center justify-center w-8 h-8">
          {getRankIcon(rank)}
        </div>
        <div className="flex items-center gap-3">
          {avatar && <span className="text-2xl">{avatar}</span>}
          <div>
            <div className="font-semibold text-gray-900">{name}</div>
            <div className="text-sm text-gray-600">{subtitle}</div>
          </div>
        </div>
      </div>
      {score && (
        <div className="text-right">
          <div className="font-bold text-gray-900">{score}%</div>
        </div>
      )}
    </div>
  );
};

// Top Performing Members Component
const TopPerformingMembers: React.FC = () => (
  <div className="bg-white rounded-lg p-6 shadow-sm">
    <h2 className="text-xl font-semibold text-gray-900 mb-4">Top Performing Members</h2>
    <div className="space-y-3">
      {topMembers.map((member) => (
        <RankingItem
          key={member.id}
          rank={member.rank}
          name={member.name}
          subtitle={member.role}
          score={member.score}
          avatar={member.avatar}
        />
      ))}
    </div>
  </div>
);

// Top Performing Messes Component
const TopPerformingMesses: React.FC = () => (
  <div className="bg-white rounded-lg p-6 shadow-sm">
    <h2 className="text-xl font-semibold text-gray-900 mb-4">Top Performing Messes</h2>
    <div className="space-y-3">
      {topMesses.map((mess) => (
        <RankingItem
          key={mess.id}
          rank={mess.rank}
          name={mess.name}
          subtitle={mess.satisfaction}
          score={mess.score}
        />
      ))}
    </div>
  </div>
);

// Health Score Component
const CommunityHealthScore: React.FC = () => (
  <div className="bg-white rounded-lg p-6 shadow-sm">
    <h2 className="text-xl font-semibold text-gray-900 mb-4">Community Health Score</h2>
    
    <div className="mb-6">
      <div className="flex items-center gap-2 mb-2">
        <TrendingUp className="h-5 w-5 text-blue-500" />
        <span className="text-blue-600 font-medium">AI Insights</span>
      </div>
      <p className="text-gray-600 text-lg">
        Community has eaten 16% better recommended foods this week. Consider adding more vegetable and smaller 
        grains to meals.
      </p>
    </div>
  </div>
);

// Member Activity Card Component
interface MemberActivityCardProps {
  name: string;
  status: string;
  meals: number;
  expenses: number;
  health: number;
  healthColor: string;
}

const MemberActivityCard: React.FC<MemberActivityCardProps> = ({
  name,
  status,
  meals,
  expenses,
  health,
  healthColor
}) => (
  <div className="bg-gray-50 rounded-lg p-4">
    <div className="flex items-center gap-3 mb-3">
      <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
        <span className="text-sm font-medium">{name[0]}</span>
      </div>
      <div>
        <div className="font-semibold text-gray-900">{name}</div>
        <div className="text-xs text-gray-500">{status}</div>
      </div>
    </div>
    
    <div className="grid grid-cols-3 gap-2 text-center mb-3">
      <div>
        <div className="text-lg font-bold text-gray-900">{meals}</div>
        <div className="text-xs text-gray-600">Meals</div>
      </div>
      <div>
        <div className="text-lg font-bold text-gray-900">{expenses}</div>
        <div className="text-xs text-gray-600">Expenses</div>
      </div>
      <div>
        <div className="text-lg font-bold text-gray-900">{health}</div>
        <div className="text-xs text-gray-600">Health</div>
      </div>
    </div>
    
    <div className="w-full bg-gray-200 rounded-full h-2">
      <div 
        className={`h-2 rounded-full ${healthColor}`} 
        style={{ width: `${health}%` }}
      ></div>
    </div>
    <div className="text-xs text-gray-500 mt-1">Health Score: {health}%</div>
  </div>
);

// Today's Member Activity Component
const TodaysMemberActivity: React.FC = () => (
  <div className="bg-white rounded-lg p-6 shadow-sm">
    <h2 className="text-xl font-semibold text-gray-900 mb-4">Today's Member Activity</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {memberActivities.map((member, index) => (
        <MemberActivityCard
          key={index}
          name={member.name}
          status={member.status}
          meals={member.meals}
          expenses={member.expenses}
          health={member.health}
          healthColor={member.healthColor}
        />
      ))}
    </div>
  </div>
);

// Achievement Card Component
interface AchievementCardProps {
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
}

const AchievementCard: React.FC<AchievementCardProps> = ({ title, description, icon: Icon, color }) => (
  <div className="bg-white rounded-lg p-6 shadow-sm border-l-4 border-green-400">
    <div className="flex items-center gap-4">
      <div className="p-3 bg-green-50 rounded-full">
        <Icon className={`h-8 w-8 ${color}`} />
      </div>
      <div>
        <h3 className="font-bold text-gray-900 text-lg">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>
    </div>
  </div>
);

// Community Achievements Component
const CommunityAchievements: React.FC = () => (
  <div className="bg-white rounded-lg p-6 shadow-sm">
    <h2 className="text-xl font-semibold text-gray-900 mb-4">Community Achievements</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
  </div>
);

// Main Component
const Community: React.FC = () => {
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerateReport = async () => {
    setIsGenerating(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const reportContent = `
COMMUNITY STATS REPORT
=====================

Generated on: ${new Date().toLocaleDateString()}
Report Period: Current Month

COMMUNITY OVERVIEW:
Total Members: ${messOverviewData.totalMembers}
Meals Logged: ${messOverviewData.mealsLogged}
Total Spend: ₹${messOverviewData.totalSpend}

TOP PERFORMING MEMBERS:
${topMembers.map((member, index) => 
  `${index + 1}. ${member.name} (${member.role}) - Score: ${member.score}%`
).join('\n')}

TOP PERFORMING MESSES:
${topMesses.map((mess, index) => 
  `${index + 1}. ${mess.name} - ${mess.satisfaction}`
).join('\n')}

MEMBER ACTIVITY TODAY:
${memberActivities.map(member => 
  `${member.name}: ${member.meals} meals, ${member.expenses} expenses, Health: ${member.health}%`
).join('\n')}

RECENT ACTIVITIES:
${recentActivity.map(activity => 
  `- ${activity.user} ${activity.action} (${activity.time})`
).join('\n')}

COMMUNITY ACHIEVEMENTS:
${achievements.map(achievement => 
  `- ${achievement.title}: ${achievement.description}`
).join('\n')}

HEALTH INSIGHTS:
- Community has improved eating habits by 16%
- Recommended to add more vegetables and smaller grains
- Overall community health score trending upward

RECOMMENDATIONS:
1. Continue promoting healthy eating habits
2. Encourage more member participation in meal logging
3. Consider implementing group challenges for better engagement
4. Maintain current satisfaction levels in top-performing messes

Contact: community-stats@messmanagement.com
      `;
      
      downloadPDF(
        reportContent,
        `community-stats-${new Date().toISOString().slice(0, 7)}.pdf`,
        'Community Stats Report'
      );
      
      alert('Community stats report downloaded successfully!');
    } catch (error) {
      alert('Failed to generate report. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <CommunityHeader />
        
        <div className="grid grid-cols-1 lg:grid-cols-3  gap-6">
          <div className="lg:col-span-2 space-y-6">
            <MessOverview 
              onGenerateReport={handleGenerateReport}
              isGenerating={isGenerating}
            />
                <CommunityHealthScore />
          </div>
          
          <div className="space-y-6">
            <TopPerformingMembers />
            <TopPerformingMesses />
          </div>
        </div>

    
        
        <TodaysMemberActivity />
        
        <CommunityAchievements />
      </div>
    </div>
  );
};

export default Community;