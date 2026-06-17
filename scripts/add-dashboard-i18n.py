import re

with open('/home/z/my-project/src/components/asanhesab/i18n/dictionary.ts', 'r', encoding='utf-8') as f:
    content = f.read()

# Dari (fa) dashboard namespace
fa_dashboard = '''  dashboard: {
    sidebar: {
      dashboard: "داشبورد",
      sales: "فروش",
      purchases: "خریداری",
      items: "اجناس",
      suppliers: "عرضه‌کنندگان",
      treasury: "خزانه‌داری و پرداخت‌ها",
      reports: "گزارش‌ها",
      help: "راهنما",
      shortcuts: "میانبرها",
      reportIssue: "Report Issue",
      changeDb: "تغییر دیتابیس",
    },
    topbar: {
      search: "جستجو",
      business: "TEST BUSSINESS",
      user: "آقای محمدی",
    },
    greeting: {
      goodDay: "روز بخیر",
      date: "۱۰ جوزا ۱۴۰۵",
      time: "۰۵:۳۳",
      weekday: "یکشنبه",
    },
    kpi: {
      cashBankLabel: "مجموع نقد و بانک",
      incomeLabel: "عاید",
      expenseLabel: "مصارف",
      profitLabel: "فایده خالص",
      cashBankValue: "۹,۶۳۵.۸۵",
      incomeValue: "۳,۰۰۰",
      expenseValue: "۳۲,۸۵۰",
      profitValue: "-۱۵,۵۴۰",
      trend: "۰.۰٪ —",
    },
    actions: {
      newSale: "فروش جدید",
      newPurchase: "خریداری جدید",
      addExpense: "افزودن مصرف",
      addCustomer: "افزودن مشتری",
      addItem: "افزودن جنس",
      closeDay: "بستن روز",
      reports: "گزارشات",
    },
    summary: {
      totalIn: "مجموع ورودی",
      totalOut: "مجموع خروجی",
      netCashFlow: "جریان نقدی خالص",
      cashOnHand: "نقد در دست",
      totalInValue: "۱۶,۹۱۰",
      totalOutValue: "-۳۴,۴۵۰",
      netCashFlowValue: "-۱۷,۵۴۰",
      cashOnHandValue: "-۱۵,۵۴۰",
    },
    chart: {
      title: "نمودار مالی",
      y18k: "۱۸k",
      y14k: "۱۴k",
      y9k: "۹k",
      y5k: "۵k",
      y0: "۰",
      x1: "۰۲/۱۰",
      x2: "۰۳/۰۲",
      x3: "۰۳/۰۹",
    },
    bottom: {
      alertsTitle: "هشدارهای فوری",
      alertsValue: "۲",
      alertsSub: "فوری",
      perfTitle: "عملکرد فروش",
      perfValue: "۱۰۰.۰٪",
    },
  },
  hero: {'''

# Pashto (ps) dashboard namespace
ps_dashboard = '''  dashboard: {
    sidebar: {
      dashboard: "ډشبورډ",
      sales: "پلور",
      purchases: "پیرود",
      items: "اجناس",
      suppliers: "عرضه کوونکي",
      treasury: "خزانه او تادیات",
      reports: "راپورونه",
      help: "لارښود",
      shortcuts: "شارټ‌کټونه",
      reportIssue: "Report Issue",
      changeDb: "ډیټابیس بدلول",
    },
    topbar: {
      search: "پلټنه",
      business: "TEST BUSSINESS",
      user: "آقای محمدی",
    },
    greeting: {
      goodDay: "ښه راغلاست",
      date: "۱۰ جوزا ۱۴۰۵",
      time: "۰۵:۳۳",
      weekday: "یکشنبه",
    },
    kpi: {
      cashBankLabel: "ټول نغد او بانک",
      incomeLabel: "عاید",
      expenseLabel: "مصارف",
      profitLabel: "خالص ګټه",
      cashBankValue: "۹,۶۳۵.۸۵",
      incomeValue: "۳,۰۰۰",
      expenseValue: "۳۲,۸۵۰",
      profitValue: "-۱۵,۵۴۰",
      trend: "۰.۰٪ —",
    },
    actions: {
      newSale: "نوی پلور",
      newPurchase: "نوی پیرود",
      addExpense: "مصرف اضافه کړئ",
      addCustomer: "پیرودونکی اضافه کړئ",
      addItem: "جنس اضافه کړئ",
      closeDay: "ورځ تړل",
      reports: "راپورونه",
    },
    summary: {
      totalIn: "ټول ورودي",
      totalOut: "ټول وتلی",
      netCashFlow: "خالص نغد بهیر",
      cashOnHand: "نغد په لاس کې",
      totalInValue: "۱۶,۹۱۰",
      totalOutValue: "-۳۴,۴۵۰",
      netCashFlowValue: "-۱۷,۵۴۰",
      cashOnHandValue: "-۱۵,۵۴۰",
    },
    chart: {
      title: "مالي چارټ",
      y18k: "۱۸k",
      y14k: "۱۴k",
      y9k: "۹k",
      y5k: "۵k",
      y0: "۰",
      x1: "۰۲/۱۰",
      x2: "۰۳/۰۲",
      x3: "۰۳/۰۹",
    },
    bottom: {
      alertsTitle: "بيړني خبرداري",
      alertsValue: "۲",
      alertsSub: "بيړنی",
      perfTitle: "د پلور فعالیت",
      perfValue: "۱۰۰.۰٪",
    },
  },
  hero: {'''

# English (en) dashboard namespace
en_dashboard = '''  dashboard: {
    sidebar: {
      dashboard: "Dashboard",
      sales: "Sales",
      purchases: "Purchases",
      items: "Items",
      suppliers: "Suppliers",
      treasury: "Treasury & Payments",
      reports: "Reports",
      help: "Help",
      shortcuts: "Shortcuts",
      reportIssue: "Report Issue",
      changeDb: "Change Database",
    },
    topbar: {
      search: "Search",
      business: "TEST BUSSINESS",
      user: "Mr. Mohammadi",
    },
    greeting: {
      goodDay: "Good day",
      date: "10 Jawza 1405",
      time: "05:33",
      weekday: "Sunday",
    },
    kpi: {
      cashBankLabel: "Total Cash & Bank",
      incomeLabel: "Income",
      expenseLabel: "Expenses",
      profitLabel: "Net Profit",
      cashBankValue: "9,635.85",
      incomeValue: "3,000",
      expenseValue: "32,850",
      profitValue: "-15,540",
      trend: "0.0% —",
    },
    actions: {
      newSale: "New Sale",
      newPurchase: "New Purchase",
      addExpense: "Add Expense",
      addCustomer: "Add Customer",
      addItem: "Add Item",
      closeDay: "Close Day",
      reports: "Reports",
    },
    summary: {
      totalIn: "Total Inflow",
      totalOut: "Total Outflow",
      netCashFlow: "Net Cash Flow",
      cashOnHand: "Cash on Hand",
      totalInValue: "16,910",
      totalOutValue: "-34,450",
      netCashFlowValue: "-17,540",
      cashOnHandValue: "-15,540",
    },
    chart: {
      title: "Financial Chart",
      y18k: "18k",
      y14k: "14k",
      y9k: "9k",
      y5k: "5k",
      y0: "0",
      x1: "02/10",
      x2: "03/02",
      x3: "03/09",
    },
    bottom: {
      alertsTitle: "Urgent Alerts",
      alertsValue: "2",
      alertsSub: "Urgent",
      perfTitle: "Sales Performance",
      perfValue: "100.0%",
    },
  },
  hero: {'''

# Find positions of all `  hero: {` occurrences
hero_marker = "  hero: {"
positions = []
idx = 0
while True:
    pos = content.find(hero_marker, idx)
    if pos == -1:
        break
    positions.append(pos)
    idx = pos + 1

print("Found", len(positions), "hero positions")

# Replace in reverse order to preserve positions
dashboards = [fa_dashboard, ps_dashboard, en_dashboard]
for i in reversed(range(len(positions))):
    pos = positions[i]
    dashboard_block = dashboards[i]
    content = content[:pos] + dashboard_block + content[pos + len(hero_marker):]

# Verify replacements
print("After replacement, hero count:", len(re.findall(r"^  hero: \{", content, re.MULTILINE)))
print("dashboard count:", len(re.findall(r"^  dashboard: \{", content, re.MULTILINE)))

with open('/home/z/my-project/src/components/asanhesab/i18n/dictionary.ts', 'w', encoding='utf-8') as f:
    f.write(content)
print("Saved")
