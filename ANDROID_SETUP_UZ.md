# CODEQUEST — Android sozlash

Bu loyiha dastlab React + Vite web ilova bo‘lgan. Capacitor qo‘shildi: mavjud React interfeysi va funksiyalarini Android ilova ichida ishga tushirish uchun.

## Kerakli dasturlar
- Node.js LTS
- Android Studio (Android SDK bilan)

## Windows PowerShell buyruqlari

1. ZIP arxivni oching va papkani VS Code’da oching.
2. Terminalda loyiha papkasida quyidagilarni bajaring:

```powershell
npm install
npx cap add android
npm run android:sync
npm run android:open
```

3. Android Studio ochilgach, telefonni USB orqali ulang (USB debugging yoqilgan bo‘lsin) yoki emulator tanlang.
4. Android Studio’dagi Run tugmasini bosing.

## APK olish
Android Studio: **Build → Build Bundle(s) / APK(s) → Build APK(s)**

## Google Play uchun AAB
Android Studio: **Build → Generate Signed Bundle / APK → Android App Bundle (AAB)**

## Muhim eslatmalar
- Ushbu ZIP — Android’ga o‘tkazish uchun tayyorlangan loyiha manbasi; APK/AAB hali kompilyatsiya qilinmagan.
- `android/` papkasi `npx cap add android` bajarilganda yaratiladi.
- Birinchi ishga tushirishda internet orqali npm paketlari va Android SDK komponentlari yuklanadi.
- Ma’lumotlar hozircha qurilmaning localStorage xotirasida saqlanadi; server/database qo‘shilmagan.
- Android’da kod playground, klaviatura va turli ekran o‘lchamlarini alohida sinab ko‘rish kerak.

## Android Studio'siz APK olish
`BUILD_APK_UZ.md` faylidagi GitHub Actions yo'riqnomasidan foydalaning. `.github/workflows/android-apk.yml` main branch'ga push qilinganda APK build'ni avtomatik boshlaydi.
