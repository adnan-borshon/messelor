import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from 'recharts';
import { 
  Download, 
  FileText, 
  TrendingUp, 
  Utensils, 
  Calendar,
  ChevronRight
} from 'lucide-react';

// Mock data
const monthlyData = [
  { month: 'Aug', amount: 8200 },
  { month: 'Sep', amount: 8450 },
  { month: 'Oct', amount: 8100 },
  { month: 'Nov', amount: 8300 },
  { month: 'Dec', amount: 8600 },
  { month: 'Jan', amount: 8450 },
];

const billHistory = [
  {
    id: 1,
    month: 'January 2025',
    totalMeals: 90,
    costPerMeal: 94,
    totalAmount: 8450,
    color: 'bg-blue-500'
  },
  {
    id: 2,
    month: 'December 2024',
    totalMeals: 93,
    costPerMeal: 89,
    totalAmount: 8277,
    color: 'bg-purple-500'
  },
  {
    id: 3,
    month: 'November 2024',
    totalMeals: 87,
    costPerMeal: 92,
    totalAmount: 8004,
    color: 'bg-orange-500'
  },
  {
    id: 4,
    month: 'October 2024',
    totalMeals: 91,
    costPerMeal: 88,
    totalAmount: 8008,
    color: 'bg-red-500'
  }
];

// PDF Generation utility functions
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
const BillingHeader: React.FC = () => (
  <div className="bg-white rounded-lg p-6 shadow-sm">
    <h1 className="text-2xl font-bold text-gray-900 mb-2">Billing Management</h1>
    <p className="text-gray-600">Track expenses, generate bills, and manage mess finances</p>
  </div>
);

// Metric Card Component
interface MetricCardProps {
  title: string;
  value: string | number;
  subtitle: string;
  icon: React.ReactNode;
  bgColor: string;
  iconColor: string;
  textColor: string;
}

const MetricCard: React.FC<MetricCardProps> = ({ 
  title, 
  value, 
  subtitle, 
  icon, 
  bgColor, 
  iconColor, 
  textColor 
}) => (
  <div className={`${bgColor} rounded-lg p-4`}>
    <div className="flex items-center justify-between mb-2">
      <span className={`${textColor} text-sm font-medium`}>{title}</span>
      <div className={iconColor}>{icon}</div>
    </div>
    <div className="text-2xl font-bold text-gray-900 mb-1">{value}</div>
    <div className="text-sm text-gray-600">{subtitle}</div>
  </div>
);

// Action Buttons Component
interface ActionButtonsProps {
  onGenerateBill: () => void;
  onDownloadReport: () => void;
  isGenerating: boolean;
  isDownloading: boolean;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({
  onGenerateBill,
  onDownloadReport,
  isGenerating,
  isDownloading,
}) => (
  <div className="flex gap-3">
    <button
      onClick={onGenerateBill}
      disabled={isGenerating}
      className="flex items-center gap-2 cursor-pointer px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-blue-300 transition-colors"
    >
      <FileText className="h-4 w-4" />
      {isGenerating ? 'Generating...' : 'Generate Bill'}
    </button>
    <button
      onClick={onDownloadReport}
      disabled={isDownloading}
      className="flex items-center gap-2 px-4 py-2 cursor-pointer bg-green-500 text-white rounded-lg hover:bg-green-600 disabled:bg-green-300 transition-colors"
    >
      <Download className="h-4 w-4" />
      {isDownloading ? 'Downloading...' : 'Download Report'}
    </button>
  </div>
);

// Billing Overview Component
interface BillingOverviewProps {
  onGenerateBill: () => void;
  onDownloadReport: () => void;
  isGenerating: boolean;
  isDownloading: boolean;
}

const BillingOverview: React.FC<BillingOverviewProps> = ({
  onGenerateBill,
  onDownloadReport,
  isGenerating,
  isDownloading,
}) => (
  <div className="bg-white rounded-lg p-6 shadow-sm">
    <div className="flex justify-between items-center mb-6">
      <h2 className="text-xl font-semibold text-gray-900">Billing Overview</h2>
      <ActionButtons
        onGenerateBill={onGenerateBill}
        onDownloadReport={onDownloadReport}
        isGenerating={isGenerating}
        isDownloading={isDownloading}
      />
    </div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <MetricCard
        title="This Month"
        value="₹8450"
        subtitle="Total Billed"
        icon={<Calendar className="h-5 w-5" />}
        bgColor="bg-blue-50"
        iconColor="text-blue-500"
        textColor="text-blue-600"
      />
      <MetricCard
        title="Average"
        value="₹94"
        subtitle="Cost per Meal"
        icon={<TrendingUp className="h-5 w-5" />}
        bgColor="bg-green-50"
        iconColor="text-green-500"
        textColor="text-green-600"
      />
      <MetricCard
        title="Total"
        value="30"
        subtitle="Discounted Meals"
        icon={<Utensils className="h-5 w-5" />}
        bgColor="bg-orange-50"
        iconColor="text-orange-500"
        textColor="text-orange-600"
      />
    </div>
  </div>
);

// Period Selector Component
interface PeriodSelectorProps {
  selectedPeriod: '6-months' | '1-year';
  onPeriodChange: (period: '6-months' | '1-year') => void;
}

const PeriodSelector: React.FC<PeriodSelectorProps> = ({ selectedPeriod, onPeriodChange }) => (
  <div className="flex gap-2">
    <button
      onClick={() => onPeriodChange('6-months')}
      className={`px-3 py-1 rounded text-sm ${
        selectedPeriod === '6-months'
          ? 'bg-blue-100 text-blue-700'
          : 'text-gray-600 hover:bg-gray-100'
      }`}
    >
      6 Months
    </button>
    <button
      onClick={() => onPeriodChange('1-year')}
      className={`px-3 py-1 rounded text-sm ${
        selectedPeriod === '1-year'
          ? 'bg-blue-100 text-blue-700'
          : 'text-gray-600 hover:bg-gray-100'
      }`}
    >
      1 Year
    </button>
  </div>
);

// Chart Component
const BillChart: React.FC = () => (
  <div className="h-80 mb-6">
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={monthlyData}>
        <XAxis 
          dataKey="month" 
          axisLine={false}
          tickLine={false}
          tick={{ fill: '#6B7280', fontSize: 12 }}
        />
        <YAxis 
          axisLine={false}
          tickLine={false}
          tick={{ fill: '#6B7280', fontSize: 12 }}
          tickFormatter={(value) => `₹${value}`}
        />
        <Bar 
          dataKey="amount" 
          fill="#3B82F6" 
          radius={[4, 4, 0, 0]}
        />
      </BarChart>
    </ResponsiveContainer>
  </div>
);

// Monthly Insights Component
interface MonthlyInsightsProps {
  selectedPeriod: '6-months' | '1-year';
  onPeriodChange: (period: '6-months' | '1-year') => void;
  onGenerateBill: () => void;
  onDownloadReport: () => void;
  isGenerating: boolean;
  isDownloading: boolean;
}

const MonthlyInsights: React.FC<MonthlyInsightsProps> = ({
  selectedPeriod,
  onPeriodChange,
  onGenerateBill,
  onDownloadReport,
  isGenerating,
  isDownloading,
}) => (
  <div className="bg-white rounded-lg p-6 shadow-sm">
    <div className="flex justify-between items-center mb-6">
      <h2 className="text-xl font-semibold text-gray-900">Monthly Bill Insights</h2>
      <PeriodSelector selectedPeriod={selectedPeriod} onPeriodChange={onPeriodChange} />
    </div>

    <BillChart />

    <div className="flex justify-center gap-3">
      <ActionButtons
        onGenerateBill={onGenerateBill}
        onDownloadReport={onDownloadReport}
        isGenerating={isGenerating}
        isDownloading={isDownloading}
      />
    </div>
  </div>
);

// Bill History Row Component
interface BillHistoryRowProps {
  bill: typeof billHistory[0];
  onGenerate: () => void;
  onDownload: () => void;
}

const BillHistoryRow: React.FC<BillHistoryRowProps> = ({ bill, onGenerate, onDownload }) => (
  <tr className="border-b border-gray-100 hover:bg-gray-50">
    <td className="py-4 px-4">
      <div className="flex items-center gap-3">
        <div className={`w-3 h-3 rounded ${bill.color}`}></div>
        <span className="font-medium text-gray-900">{bill.month}</span>
      </div>
    </td>
    <td className="py-4 px-4 text-gray-600">{bill.totalMeals}</td>
    <td className="py-4 px-4 text-gray-600">₹{bill.costPerMeal}</td>
    <td className="py-4 px-4 font-medium text-gray-900">₹{bill.totalAmount}</td>
    <td className="py-4 px-4">
      <div className="flex gap-2">
        <button
          onClick={onGenerate}
          className="px-3 py-1 bg-blue-500 text-white text-xs rounded hover:bg-blue-600"
        >
          Generate
        </button>
        <button
          onClick={onDownload}
          className="px-3 py-1 bg-green-500 text-white text-xs rounded hover:bg-green-600"
        >
          Download
        </button>
      </div>
    </td>
  </tr>
);

// Bill History Component
interface BillHistoryProps {
  onGenerateBill: () => void;
}

const BillHistory: React.FC<BillHistoryProps> = ({ onGenerateBill }) => {
  const handleMonthlyDownload = (monthData: typeof billHistory[0]) => {
    const monthlyReport = `
MONTHLY BILL - ${monthData.month}
================================

Total Meals Consumed: ${monthData.totalMeals}
Cost per Meal: ₹${monthData.costPerMeal}
Total Amount: ₹${monthData.totalAmount}

Billing Details:
- Base meal cost calculation
- Applied discounts and offers
- Additional charges (if any)
- Tax calculations

Payment Information:
- Due Date: End of current month
- Payment Methods: Online/Offline
- Late Fee: ₹50 after due date

Generated on: ${new Date().toLocaleDateString()}
Contact: mess-billing@example.com
    `;
    
    downloadPDF(
      monthlyReport, 
      `${monthData.month.replace(' ', '-').toLowerCase()}-bill.pdf`,
      `Monthly Bill - ${monthData.month}`
    );
  };

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Recent Bill History</h2>
        <button className="flex items-center gap-1 text-blue-600 hover:text-blue-700 text-sm font-medium">
          View All
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>

      <div className="overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-3 px-4 font-medium text-gray-700">Month</th>
              <th className="text-left py-3 px-4 font-medium text-gray-700">Total Meals</th>
              <th className="text-left py-3 px-4 font-medium text-gray-700">Cost per Meal</th>
              <th className="text-left py-3 px-4 font-medium text-gray-700">Total Amount</th>
              <th className="text-left py-3 px-4 font-medium text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {billHistory.map((bill) => (
              <BillHistoryRow
                key={bill.id}
                bill={bill}
                onGenerate={onGenerateBill}
                onDownload={() => handleMonthlyDownload(bill)}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// Main Component
const Billing: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState<'6-months' | '1-year'>('6-months');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  const handleGenerateBill = async () => {
    setIsGenerating(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const billContent = `
MESS BILLING INVOICE
====================

Invoice No: INV-${Date.now()}
Date: ${new Date().toLocaleDateString()}

BILLING SUMMARY:
Current Month: January 2025
Total Meals Consumed: 90
Cost per Meal: ₹94
Subtotal: ₹8,460

DISCOUNTS & ADJUSTMENTS:
Special Discount: ₹10
Total Amount: ₹8,450

PAYMENT DETAILS:
Due Date: ${new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString()}
Payment Method: Online/Bank Transfer
Late Fee: ₹50 (applicable after due date)

MEAL BREAKDOWN:
Breakfast: 30 meals × ₹30 = ₹900
Lunch: 30 meals × ₹35 = ₹1,050
Dinner: 30 meals × ₹29 = ₹870

Contact Information:
Mess Management Office
Email: billing@messmanagement.com
Phone: +91-XXXXXXXXXX

Thank you for your prompt payment!
      `;
      
      downloadPDF(
        billContent,
        `mess-bill-${new Date().toISOString().slice(0, 7)}.pdf`,
        'Mess Billing Invoice'
      );
      
      alert('Bill generated and downloaded successfully!');
    } catch (error) {
      alert('Failed to generate bill. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownloadReport = async () => {
    setIsDownloading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const reportContent = `
COMPREHENSIVE BILLING REPORT
===========================

Period: ${selectedPeriod === '6-months' ? 'Last 6 Months' : 'Last 1 Year'}
Generated on: ${new Date().toLocaleDateString()}
Report ID: RPT-${Date.now()}

EXECUTIVE SUMMARY:
Current Month Total: ₹8,450
Average Monthly Spending: ₹8,300
Average Cost per Meal: ₹94
Total Discounted Meals: 30

MONTHLY BREAKDOWN:
${billHistory.map(bill => 
  `${bill.month}: ${bill.totalMeals} meals × ₹${bill.costPerMeal} = ₹${bill.totalAmount}`
).join('\n')}

FINANCIAL ANALYSIS:
Total Expenditure (6 months): ₹49,739
Average Monthly Cost: ₹8,290
Highest Spending Month: January 2025 (₹8,450)
Lowest Spending Month: November 2024 (₹8,004)

COST TRENDS:
- Monthly variation: ±5.4%
- Cost per meal range: ₹88 - ₹94
- Discount utilization: 12% of total meals

RECOMMENDATIONS:
- Consider bulk purchasing for cost reduction
- Optimize meal planning to reduce wastage
- Negotiate better rates with suppliers
- Implement more discount schemes during low-demand periods

COMPLIANCE & AUDIT:
All transactions properly recorded
Tax compliance: Up to date
Audit trail: Complete
Documentation: Available

Prepared by: Billing Management System
Authorized by: Mess Administrator
Next Review Date: ${new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString()}
      `;
      
      downloadPDF(
        reportContent,
        `billing-report-${new Date().toISOString().slice(0, 7)}.pdf`,
        'Comprehensive Billing Report'
      );
      
      alert('Report downloaded successfully!');
    } catch (error) {
      alert('Failed to download report. Please try again.');
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        <BillingHeader />
        
        <BillingOverview
          onGenerateBill={handleGenerateBill}
          onDownloadReport={handleDownloadReport}
          isGenerating={isGenerating}
          isDownloading={isDownloading}
        />
        
        <MonthlyInsights
          selectedPeriod={selectedPeriod}
          onPeriodChange={setSelectedPeriod}
          onGenerateBill={handleGenerateBill}
          onDownloadReport={handleDownloadReport}
          isGenerating={isGenerating}
          isDownloading={isDownloading}
        />
        
        <BillHistory onGenerateBill={handleGenerateBill} />
      </div>
    </div>
  );
};

export default Billing;