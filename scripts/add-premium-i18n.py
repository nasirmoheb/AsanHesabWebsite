import re

with open('/home/z/my-project/src/components/asanhesab/i18n/dictionary.ts', 'r', encoding='utf-8') as f:
    content = f.read()

# Dari (fa) premium namespace
fa_premium = '''  premium: {
    floatingWhatsapp: "پشتیبانی واتساپ",
    floatingWhatsappSub: "پاسخ در کمتر از ۱۰ دقیقه",
    backToTop: "بازگشت به بالا",
    mobileCta: "دانلود رایگان",
    mobileCtaSub: "نصب در ۵ دقیقه",
    trustBar: {
      title: "مورد اعتماد دکانداران، عمده‌فروشان و داروسازان افغان",
      subtitle: "در ۳۲ ولایت افغانستان",
    },
    roi: {
      eyebrow: "ماشین حساب فایده",
      title: "ببینید چقدر",
      highlight: "پول و وقت",
      titleTail: "صرفه‌جویی می‌کنید",
      subtitle: "اعداد را تغییر دهید تا ببینید آسان حساب چقدر برای تجارت شما فایده دارد.",
      monthlySalesLabel: "فروش ماهانه (افغانی)",
      employeesLabel: "تعداد کارمندان",
      hoursLabel: "ساعت‌های صرف‌شده در هفته برای حسابداری",
      resultTimeSaved: "ساعت‌های صرفه‌جویی‌شده در ماه",
      resultMoneySaved: "افغانی صرفه‌جویی‌شده در ماه",
      resultExtraProfit: "فایده اضافی از قرض‌های فراموش‌شده",
      resultTotal: "مجموع صرفه‌جویی سالانه",
      cta: "شروع کنید — همین امروز",
      vsBefore: "قبل از آسان حساب",
      vsAfter: "با آسان حساب",
    },
    countdown: {
      title: "پیشنهاد محدود زمانی",
      subtitle: "۲۰٪ تخفیف برای ۱۰۰ مشتری اول",
      days: "روز",
      hours: "ساعت",
      minutes: "دقیقه",
      seconds: "ثانیه",
      expired: "پیشنهاد به پایان رسید",
    },
    marquee: {
      title: "تجربه‌های واقعی کاربران",
    },
    security: {
      eyebrow: "امنیت و اعتماد",
      title: "داده‌های شما",
      highlight: "امن و محرمانه",
      subtitle: "آسان حساب با استانداردهای بین‌المللی امنیت طراحی شده است. داده‌های تجارت شما هرگز بدون اجازه شما به اشتراک گذاشته نمی‌شود.",
      card1Title: "رمزگذاری AES-256",
      card1Body: "تمام داده‌های حساس با استاندارد نظامی رمزگذاری می‌شوند.",
      card2Title: "بکاپ اتوماتیک ابری",
      card2Body: "هر شب داده‌های شما به‌صورت رمزگذاری‌شده در سرور امن کپی می‌شود.",
      card3Title: "کارکرد کامل آفلاین",
      card3Body: "داده‌های شما روی کامپیوتر شما می‌ماند. اینترنت لازم نیست.",
      card4Title: "بدون اشتراک اجباری",
      card4Body: "مالک دایمی داده‌های خود هستید. ما قفل‌گذاری نمی‌کنیم.",
    },
  },
  hero: {'''

# Pashto (ps) premium namespace
ps_premium = '''  premium: {
    floatingWhatsapp: "واټساپ ملاتړ",
    floatingWhatsappSub: "پاسخ په کمتر له ۱۰ دقیقو کې",
    backToTop: "بیرته ته پورته",
    mobileCta: "وړیا ډاونلوډ",
    mobileCtaSub: "په ۵ دقیقو کې نصب",
    trustBar: {
      title: "د افغان دکاندارانو، عمده‌فروشانو او داروسازانو باور",
      subtitle: "په ۳۲ افغان ولایتونو کې",
    },
    roi: {
      eyebrow: "د ګټې ماشین حساب",
      title: "وګورئ څومره",
      highlight: "پیسې او وخت",
      titleTail: "سپموی",
      subtitle: "اعداد بدل کړئ ترڅو وګورئ آسان حساب ستاسو لپاره څومره ګټور دی.",
      monthlySalesLabel: "میاشتنی پلور (افغاني)",
      employeesLabel: "د کارمندانو شمیر",
      hoursLabel: "په اونۍ کې د حسابداري لپاره ساعتونه",
      resultTimeSaved: "په میاشت کې سپمول شوي ساعتونه",
      resultMoneySaved: "په میاشت کې سپمول شوې افغاني",
      resultExtraProfit: "د هیر شویو پورونو څخه اضافي ګټه",
      resultTotal: "کلنی ټوله سپمون",
      cta: "پیل وکړئ — همدا نن",
      vsBefore: "د آسان حساب څخه مخکې",
      vsAfter: "د آسان حساب سره",
    },
    countdown: {
      title: "محدود وخت وړاندیز",
      subtitle: "د لومړیو ۱۰۰ پیرودونکو لپاره ۲۰٪ تخفیف",
      days: "ورځې",
      hours: "ساعتونه",
      minutes: "دقیقې",
      seconds: "ثانیې",
      expired: "وړاندیز پای ته ورسېد",
    },
    marquee: {
      title: "د کاروونکو ریښتیني تجربې",
    },
    security: {
      eyebrow: "خوندیتوب او باور",
      title: "ستاسو معلومات",
      highlight: "خوندي او محرم",
      subtitle: "آسان حساب د نړیوالو خوندیتوب معیارونو سره ډیزاین شوی. ستاسو د سوداګرۍ معلومات هیڅکال ستاسو د اجازې پرته شریک نه کېږي.",
      card1Title: "AES-256 کوډګذاري",
      card1Body: "ټول حساس معلومات د نظامي معیار سره کوډګذاري کېږي.",
      card2Title: "خودکار ابر بیک‌اپ",
      card2Body: "هره شپه ستاسو معلومات په کوډ شوي ډول خوندي سرور ته کاپی کېږي.",
      card3Title: "بشپړ آفلاین کار",
      card3Body: "ستاسو معلومات ستاسو په کمپیوټر کې پاتې کېږي. اینټرنېټ ضروري نه دی.",
      card4Title: "بې اړینې ګډون",
      card4Body: "تاسو د خپلو معلوماتو دایمي مالک یاست. موږ قفل نه کوو.",
    },
  },
  hero: {'''

# English (en) premium namespace
en_premium = '''  premium: {
    floatingWhatsapp: "WhatsApp Support",
    floatingWhatsappSub: "Reply in under 10 minutes",
    backToTop: "Back to top",
    mobileCta: "Download free",
    mobileCtaSub: "Install in 5 minutes",
    trustBar: {
      title: "Trusted by Afghan shopkeepers, wholesalers, and pharmacists",
      subtitle: "Across 32 provinces of Afghanistan",
    },
    roi: {
      eyebrow: "Savings Calculator",
      title: "See how much",
      highlight: "money and time",
      titleTail: "you save",
      subtitle: "Adjust the numbers to see how much AsanHesab benefits your business.",
      monthlySalesLabel: "Monthly sales (AFN)",
      employeesLabel: "Number of employees",
      hoursLabel: "Hours per week on accounting",
      resultTimeSaved: "Hours saved per month",
      resultMoneySaved: "AFN saved per month",
      resultExtraProfit: "Extra profit from forgotten debts",
      resultTotal: "Total annual savings",
      cta: "Get started — today",
      vsBefore: "Before AsanHesab",
      vsAfter: "With AsanHesab",
    },
    countdown: {
      title: "Limited-time offer",
      subtitle: "20% discount for the first 100 customers",
      days: "Days",
      hours: "Hours",
      minutes: "Minutes",
      seconds: "Seconds",
      expired: "Offer ended",
    },
    marquee: {
      title: "Real user experiences",
    },
    security: {
      eyebrow: "Security & Trust",
      title: "Your data is",
      highlight: "secure and private",
      subtitle: "AsanHesab is designed with international security standards. Your business data is never shared without your permission.",
      card1Title: "AES-256 Encryption",
      card1Body: "All sensitive data is encrypted to military-grade standards.",
      card2Title: "Automatic Cloud Backup",
      card2Body: "Every night your data is encrypted and copied to our secure server.",
      card3Title: "Full Offline Operation",
      card3Body: "Your data stays on your computer. Internet is not required.",
      card4Title: "No Mandatory Subscription",
      card4Body: "You permanently own your data. We don't lock you in.",
    },
  },
  hero: {'''

# Find all "  hero: {" positions
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

premium_blocks = [fa_premium, ps_premium, en_premium]
for i in reversed(range(len(positions))):
    pos = positions[i]
    block = premium_blocks[i]
    content = content[:pos] + block + content[pos + len(hero_marker):]

# Verify
print("After replacement:")
print("  hero count:", len(re.findall(r"^  hero: \{", content, re.MULTILINE)))
print("  premium count:", len(re.findall(r"^  premium: \{", content, re.MULTILINE)))

with open('/home/z/my-project/src/components/asanhesab/i18n/dictionary.ts', 'w', encoding='utf-8') as f:
    f.write(content)
print("Saved")
