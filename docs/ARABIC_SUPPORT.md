# دعم اللغة العربية - Arabic Language Support

## نظرة عامة
تم تطوير نظام دعم شامل للغة العربية في هذا المشروع مع دعم كامل للـ RTL (Right-to-Left) والتحسينات المخصصة للنصوص العربية.

## المميزات

### 1. دعم RTL كامل
- تحويل تلقائي لاتجاه النص عند اختيار اللغة العربية
- دعم كامل للـ CSS مع Tailwind
- تحسين تخطيط العناصر للغة العربية

### 2. تحسينات النصوص العربية
- خطوط محسنة للعربية (Inter, Tahoma, Arial)
- تباعد محسن بين الكلمات والحروف
- تحسين عرض النصوص العربية

### 3. مكونات مخصصة
- `RTLProvider`: مكون رئيسي لإدارة اتجاه النص
- `ArabicText`: مكون لتحسين عرض النصوص العربية
- `ArabicButton`: أزرار محسنة للغة العربية
- `LanguageSwitcher`: مبدل اللغة مع دعم RTL

## الاستخدام

### تبديل اللغة
```tsx
import { useTranslation } from 'react-i18next';

const { t, i18n } = useTranslation();
const isRTL = i18n.dir() === 'rtl';

// تغيير اللغة
i18n.changeLanguage('ar'); // للعربية
i18n.changeLanguage('en'); // للإنجليزية
```

### استخدام مكونات العربية
```tsx
import ArabicText from '@/components/ArabicText';
import ArabicButton from '@/components/ArabicButton';

// نص عربي محسن
<ArabicText as="h1" className="text-2xl font-bold">
  مرحباً بكم في موقعنا
</ArabicText>

// زر عربي محسن
<ArabicButton variant="primary" size="lg">
  ابدأ الآن
</ArabicButton>
```

## ملفات الترجمة

### الإنجليزية (`locales/en/translation.json`)
```json
{
  "navigation": {
    "home": "Home",
    "about": "About",
    "features": "Features"
  }
}
```

### العربية (`locales/ar/translation.json`)
```json
{
  "navigation": {
    "home": "الرئيسية",
    "about": "من نحن",
    "features": "المميزات"
  }
}
```

## تحسينات CSS

### دعم RTL
```css
[dir="rtl"] {
  font-family: 'Inter', 'Tahoma', 'Arial', sans-serif;
  text-align: right;
  line-height: 1.6;
  word-spacing: 0.1em;
}
```

### تحسينات النصوص العربية
```css
[dir="rtl"] * {
  text-rendering: optimizeLegibility;
  -webkit-font-feature-settings: "liga" 1, "kern" 1;
  font-feature-settings: "liga" 1, "kern" 1;
}
```

## أفضل الممارسات

### 1. استخدام مكونات العربية
- استخدم `ArabicText` للنصوص العربية
- استخدم `ArabicButton` للأزرار
- استخدم `RTLProvider` في المستوى الأعلى

### 2. التخطيط
- استخدم `space-x-reverse` للعناصر في RTL
- استخدم `gap-reverse` للمسافات في RTL
- تأكد من محاذاة النصوص بشكل صحيح

### 3. الترجمة
- استخدم مفاتيح منطقية للترجمة
- نظم الترجمات في مجموعات
- تأكد من صحة النصوص العربية

## استكشاف الأخطاء

### مشاكل شائعة
1. **النصوص لا تظهر بشكل صحيح**: تأكد من استخدام UTF-8
2. **التخطيط غير صحيح**: تحقق من استخدام classes الـ RTL
3. **الأزرار لا تعمل**: تأكد من استخدام `ArabicButton`

### حلول
- تحقق من إعدادات الخطوط
- تأكد من تحميل ملفات الترجمة
- اختبر في متصفحات مختلفة

## الدعم التقني

للمساعدة التقنية أو الإبلاغ عن مشاكل، يرجى التواصل مع فريق التطوير. 