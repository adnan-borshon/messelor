

// -------------------- USER --------------------
export interface User {
  user_id: number;             // PK
  username: string;            // unique
  email: string;               // unique
  password: string;
}

// -------------------- SUPER_ADMIN --------------------
export interface SuperAdmin {
  super_admin_id: number;      // PK
  username: string;            // unique
  email: string;               // unique
  password: string;
  created_at: string;
  updated_at: string;
  is_active: boolean;
}

// -------------------- USER_PROFILE --------------------
export interface UserProfile {
  user_profile_id: number;     // PK
  user: User;                  // FK → USER.user_id
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

// -------------------- MESS --------------------
export interface Mess {
  mess_id: number;             // PK
  mess_name: string;
  mess_code: string;           // unique
  description: string;
  address: string;
  monthly_service_charge: number;
  max_members: number;
  manager: User;               // FK → USER.user_id
  created_at: string;
  updated_at: string;
  is_active: boolean;
}

// -------------------- MESS_MEMBER --------------------
export interface MessMember {
  mess_member_id: number;      // PK
  user: User;                  // FK → USER.user_id
  mess: Mess;                  // FK → MESS.mess_id
  joined_date: string;
  left_date?: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

// -------------------- MESS_ADMIN --------------------
export interface MessAdmin {
  mess_admin_id: number;       // PK
  mess: Mess;                  // FK → MESS.mess_id
  admin: User;                 // FK → USER.user_id
  assigned_date: string;
  updated_at: string;
}

// -------------------- MEMBER_REMOVAL_REQUEST --------------------
export interface MemberRemovalRequest {
  request_id: number;          // PK
  mess: Mess;                  // FK → MESS.mess_id
  member: User;                // FK → USER.user_id
  requested_by: User;          // FK → USER.user_id
  guest_count: number;
  reason: string;
  status: "PENDING" | "APPROVED" | "REJECTED";
  reviewed_by?: User;          // FK → USER.user_id
  admin_comments?: string;
  requested_at: string;
  reviewed_at?: string;
  created_at: string;
}

// -------------------- MEAL_TYPE --------------------
export interface MealType {
  meal_type_id: number;        // PK
  type: "Breakfast" | "Lunch" | "Dinner";
  meal_name: string;
  is_active: boolean;
}

// -------------------- MEAL_LOG --------------------
export interface MealLog {
  meal_log_id: number;         // PK
  user: User;                  // FK → USER.user_id
  mess: Mess;                  // FK → MESS.mess_id
  meal_type: MealType;         // FK → MEAL_TYPE.meal_type_id
  meal_date: string;
  logged_at: string;
  logged_by: User;             // FK → USER.user_id
  notes?: string;
}

// -------------------- VENDOR --------------------
export interface Vendor {
  vendor_id: number;           // PK
  vendor_name: string;
  address: string;
  vendor_type: "Grocery" | "Vegetable" | "Meat" | "Dairy" | "Fish" | "Other";
  created_at: string;
}

// -------------------- EXPENSE_CATEGORY --------------------
export interface ExpenseCategory {
  category_id: number;         // PK
  category_name: string;
  category_code: string;
  description: string;
  is_active: boolean;
}

// -------------------- BAZAR_EXPENSE --------------------
export interface BazarExpense {
  expense_id: number;          // PK
  mess: Mess;                  // FK → MESS.mess_id
  vendor: Vendor;              // FK → VENDOR.vendor_id
  category: ExpenseCategory;   // FK → EXPENSE_CATEGORY.category_id
  expense_date: string;
  total_amount: number;
  description?: string;
  entered_by: User;            // FK → USER.user_id
  entered_at: string;
  payment_method: "CASH" | "CARD" | "UPI" | "BANK_TRANSFER" | "CREDIT";
  is_guest_meal: boolean;
}

// -------------------- FOOD_ITEM --------------------
export interface FoodItem {
  food_item_id: number;        // PK
  item_name: string;
  item_code: string;           // unique
  description?: string;
  category: ExpenseCategory;   // FK → EXPENSE_CATEGORY.category_id
  calories_per_100g: number;
  protein_per_100g: number;
  carbs_per_100g: number;
  fat_per_100g: number;
  fiber_per_100g: number;
  sugar_per_100g: number;
  sodium_per_100g: number;
  default_unit: string;
  is_active: boolean;
}

// -------------------- EXPENSE_ITEM --------------------
export interface ExpenseItem {
  expense_item_id: number;     // PK
  expense: BazarExpense;       // FK → BAZAR_EXPENSE.expense_id
  food_item: FoodItem;         // FK → FOOD_ITEM.food_item_id
  item_name: string;
  quantity: number;
  unit: string;
  unit_price: number;
  total_price: number;
  notes?: string;
}

// -------------------- MEAL_FOOD_ITEM --------------------
export interface MealFoodItem {
  meal_food_id: number;        // PK
  meal_log: MealLog;           // FK → MEAL_LOG.meal_log_id
  food_item: FoodItem;         // FK → FOOD_ITEM.food_item_id
  quantity: number;
  unit: string;
  calories_consumed: number;
  protein_consumed: number;
  carbs_consumed: number;
  fat_consumed: number;
  fiber_consumed: number;
  expense_item: ExpenseItem;   // FK → EXPENSE_ITEM.expense_item_id
}

// -------------------- MONTHLY_BILL --------------------
export interface MonthlyBill {
  bill_id: number;             // PK
  mess: Mess;                  // FK → MESS.mess_id
  user: User;                  // FK → USER.user_id
  billing_month: number;
  billing_year: number;
  total_meals: number;
  total_expense_share: number;
  total_amount: number;
  amount_paid: number;
  balance: number;
  bill_status: "GENERATED" | "SENT" | "PAID" | "PARTIALLY_PAID" | "OVERDUE";
  generated_date: string;
  due_date: string;
}

// -------------------- PAYMENT --------------------
export interface Payment {
  payment_id: number;          // PK
  bill: MonthlyBill;           // FK → MONTHLY_BILL.bill_id
  user: User;                  // FK → USER.user_id
  amount: number;
  payment_date: string;
  payment_method: "CASH" | "CARD" | "UPI" | "BANK_TRANSFER" | "CHEQUE";
  transaction_reference?: string;
  notes?: string;
  deviation_percentage?: number;
}

// -------------------- COST_FORECAST --------------------
export interface CostForecast {
  forecast_id: number;         // PK
  mess: Mess;                  // FK → MESS.mess_id
  user: User;                  // FK → USER.user_id
  forecast_month: string;
  predicted_total_cost: number;
  predicted_personal_cost: number;
  confidence_score: number;
  forecast_breakdown: any;     // JSON
  influencing_factors: any;    // JSON
  generated_at: string;
  created_at: string;
}

// -------------------- ANOMALY_DETECTION --------------------
export interface AnomalyDetection {
  anomaly_id: number;          // PK
  expense: BazarExpense;       // FK → BAZAR_EXPENSE.expense_id
  anomaly_type: string;
  expected_value: number;
  description?: string;
  severity_level: "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";
  is_resolved: boolean;
  resolved_by?: User;          // FK → USER.user_id
  resolved_at?: string;
  detected_at: string;
}

// -------------------- REMINDER --------------------
export interface Reminder {
  reminder_id: number;         // PK
  user: User;                  // FK → USER.user_id
  mess: Mess;                  // FK → MESS.mess_id
  reminder_type: "MEAL_LOG" | "EXPENSE_ENTRY" | "PAYMENT_DUE" | "BILL_GENERATED";
  message: string;
  reminder_data: any;          // JSON
  is_sent: boolean;
  scheduled_at: string;
  sent_at?: string;
  is_acknowledged: boolean;
  acknowledged_at?: string;
}

// -------------------- NUTRITIONAL_GOAL --------------------
export interface NutritionalGoal {
  goal_id: number;             // PK
  user: User;                  // FK → USER.user_id
  daily_calories_target: number;
  protein_target: number;
  carbs_target: number;
  fat_target: number;
  actual_value: number;
  fiber_target: number;
  water_target: number;
}

// -------------------- AUDIT_LOG --------------------
export interface AuditLog {
  audit_id: number;            // PK
  table_name?: string;
  start_date: string;
  end_date: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

// -------------------- DAILY_NUTRITION_SUMMARY --------------------
export interface DailyNutritionSummary {
  summary_id: number;          // PK
  user: User;                  // FK → USER.user_id
  summary_date: string;
  total_calories: number;
  total_protein: number;
  total_carbs: number;
  total_fat: number;
  total_fiber: number;
  total_sugar: number;
  total_sodium: number;
  water_intake: number;
  calculated_at: string;
}

// -------------------- MESS_SETTINGS --------------------
export interface MessSettings {
  setting_id: number;          // PK
  mess: Mess;                  // FK → MESS.mess_id
  setting_key: string;
  setting_value: string;
  description?: string;
  updated_at: string;
  updated_by: User;            // FK → USER.user_id
  audit_id: number;            // PK
  table_name: string;
  action_type: "INSERT" | "UPDATE" | "DELETE";
  record_id: number;
  old_values: any;             // JSON
  new_values: any;             // JSON
  ip_address: string;
  user_agent?: string;
  created_at: string;
}

// -------------------- NOTIFICATION --------------------
export interface Notification {
  notification_id: number;     // PK
  user: User;                  // FK → USER.user_id
  mess: Mess;                  // FK → MESS.mess_id
  title: string;
  message: string;
  notification_type: "BILL" | "PAYMENT" | "REMINDER" | "ANNOUNCEMENT" | "ALERT";
  metadata: any;               // JSON
  is_read: boolean;
  read_at?: string;
  created_at: string;
}
