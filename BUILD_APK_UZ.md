# CODEQUEST — APK'ni avtomatik yaratish

Bu papkada GitHub Actions sozlamasi bor. U GitHub serverida Android SDK va Java'ni tayyorlaydi, CODEQUEST'ni build qiladi va `app-debug.apk` faylini yuklab olish uchun artifact sifatida beradi. Buning uchun o'zingizning kompyuteringizda Android Studio oynalarini boshqarish shart emas.

## Bir martalik sozlash

1. GitHub.com saytida yangi repository yarating. Masalan: `CODEQUEST-Android`.
2. ZIP ichidagi HAMMA fayl va papkalarni (shu jumladan yashirin `.github` papkasini) loyiha papkasidan GitHub repository'ga yuboring.
3. Windows PowerShell'da, loyiha papkasida quyidagi buyruqlarni bajaring. `GITHUB_USERNAME` o'rniga GitHub username'ingizni yozing:

```powershell
git init
git add .
git commit -m "Prepare CODEQUEST Android build"
git branch -M main
git remote add origin https://github.com/GITHUB_USERNAME/CODEQUEST-Android.git
git push -u origin main
```

Agar `git remote add origin` remote allaqachon mavjud degan xabar chiqarsa, bu qatorni o'tkazib yuboring va `git remote -v` bilan manzilni tekshiring.

## APK'ni olish

1. GitHub repository sahifasini oching.
2. `Actions` bo'limiga o'ting.
3. `Build CODEQUEST Android APK` workflow'ini tanlang.
4. Oxirgi run muvaffaqiyatli tugashini kuting (`Success` / yashil belgi).
5. Run sahifasining pastidagi `Artifacts` bo'limidan `CODEQUEST-debug-apk` ni yuklab oling.
6. Yuklangan ZIP ichida `app-debug.apk` bo'ladi. Uni Android telefoningizga o'tkazib o'rnatishingiz mumkin.

## Muhim

- Workflow debug APK yaratadi; bu hozircha Google Play uchun imzolangan release AAB emas.
- GitHub'ga yuklashdan oldin `.env`, parollar, tokenlar yoki `google-services.json` kabi maxfiy Firebase fayllarini qo'shmang.
- Ushbu workflow Android Studio'dagi mahalliy qurish bosqichini chetlab o'tadi. GitHub repository'ga bir marta kodni yuborish va Actions'dan APK artifact'ni yuklab olish kerak bo'ladi.
- Firebase Authentication hali alohida sozlanishi kerak. Bu workflow hozirgi mavjud loyihani APK qilib yig'adi; Firebase login integratsiyasi allaqachon qo'shilgan deb hisoblamang.
