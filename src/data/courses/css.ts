import { arrange, bug, course, fill, lesson, mcq, tf, write } from "../helpers";

export const cssCourse = course(
  "css",
  "#3d8bff",
  "#7c5cff",
  ["CSS", "CSS", "CSS"],
  [
    "Make pages beautiful: selectors, colors, the box model, Flexbox, Grid and responsive layouts.",
    "Sahifalarni chiroyli qiling: selektorlar, ranglar, quti modeli, Flexbox, Grid va moslashuvchan maketlar.",
    "Делайте страницы красивыми: селекторы, цвета, блочная модель, Flexbox, Grid и адаптивная вёрстка.",
  ],
  [
    lesson(
      ["Introduction", "Kirish", "Введение"],
      [
        "CSS (Cascading Style Sheets) controls how HTML looks. A rule has a selector and declarations written as property: value; pairs.",
        "CSS (Cascading Style Sheets) HTML qanday ko'rinishini boshqaradi. Qoida selektor va property: value; ko'rinishidagi e'lonlardan iborat.",
        "CSS (Cascading Style Sheets) управляет внешним видом HTML. Правило состоит из селектора и объявлений вида свойство: значение;.",
      ],
      `h1 {
  color: rebeccapurple;
  font-size: 32px;
}`,
      [
        mcq(
          ["What does CSS stand for?", "CSS nimaning qisqartmasi?", "Что означает CSS?"],
          ["Cascading Style Sheets", "Creative Style System", "Computer Style Syntax", "Colorful Style Sheets"],
          0,
          ["CSS is Cascading Style Sheets.", "CSS — Cascading Style Sheets.", "CSS — Cascading Style Sheets (каскадные таблицы стилей)."],
        ),
        fill(
          ["Which property changes text color?", "Matn rangini qaysi xususiyat o'zgartiradi?", "Какое свойство меняет цвет текста?"],
          "p {\n  ___: blue;\n}",
          ["color"],
          ["color sets the text color.", "color matn rangini belgilaydi.", "color задаёт цвет текста."],
        ),
        tf(
          ["CSS can live in a separate .css file.", "CSS alohida .css faylda bo'lishi mumkin.", "CSS можно хранить в отдельном .css файле."],
          true,
          ["Link it with <link rel=\"stylesheet\" href=\"style.css\">.", "Uni <link rel=\"stylesheet\" href=\"style.css\"> bilan ulang.", "Подключите его через <link rel=\"stylesheet\" href=\"style.css\">."],
        ),
      ],
    ),
    lesson(
      ["Selectors", "Selektorlar", "Селекторы"],
      [
        "Selectors choose which elements to style: p targets tags, .card targets a class, #hero targets an id. Classes can be reused, ids should be unique.",
        "Selektorlar qaysi elementlarga uslub berishni tanlaydi: p teglarni, .card klassni, #hero id'ni tanlaydi. Klasslarni qayta ishlatish mumkin, id esa noyob bo'lishi kerak.",
        "Селекторы выбирают, к каким элементам применить стили: p — теги, .card — класс, #hero — id. Классы можно повторять, id должен быть уникальным.",
      ],
      `p { color: gray; }
.card { padding: 16px; }
#hero { font-size: 48px; }`,
      [
        mcq(
          ["Which selector targets the class btn?", "btn klassini qaysi selektor tanlaydi?", "Какой селектор выбирает класс btn?"],
          [".btn", "#btn", "btn", "*btn"],
          0,
          ["Classes start with a dot.", "Klasslar nuqta bilan boshlanadi.", "Классы начинаются с точки."],
        ),
        bug(
          ["Tap the line with the syntax error.", "Sintaksis xatosi bor qatorni bosing.", "Нажмите на строку с синтаксической ошибкой."],
          [".box {", "  color red;", "}"],
          1,
          ["A colon is missing between property and value.", "Xususiyat va qiymat orasida ikki nuqta yo'q.", "Между свойством и значением пропущено двоеточие."],
        ),
        write(
          ["Challenge: style the class card with a navy background.", "Topshiriq: card klassiga to'q ko'k fon bering.", "Задание: задайте классу card тёмно-синий фон."],
          "/* your CSS */\n",
          ["\\.card\\s*\\{[^}]*background(-color)?\\s*:\\s*navy"],
          ".card {\n  background: navy;\n}",
          ["Select .card and set background to navy.", ".card ni tanlab, background ni navy qiling.", "Выберите .card и задайте background: navy."],
        ),
      ],
    ),
    lesson(
      ["Colors and Typography", "Ranglar va tipografiya", "Цвета и типографика"],
      [
        "Colors can be names (red), hex codes (#ff0000), rgb() or hsl(). Typography properties include font-family, font-size, font-weight and line-height.",
        "Ranglar nom (red), hex kod (#ff0000), rgb() yoki hsl() bilan beriladi. Tipografiya xususiyatlari: font-family, font-size, font-weight va line-height.",
        "Цвета задаются именем (red), hex-кодом (#ff0000), rgb() или hsl(). К типографике относятся font-family, font-size, font-weight и line-height.",
      ],
      `body {
  font-family: Arial, sans-serif;
  color: #1f2937;
  line-height: 1.6;
}`,
      [
        mcq(
          ["Which property changes the font size?", "Shrift o'lchamini qaysi xususiyat o'zgartiradi?", "Какое свойство меняет размер шрифта?"],
          ["font-size", "text-size", "font-style", "size"],
          0,
          ["font-size controls text size.", "font-size matn o'lchamini boshqaradi.", "font-size управляет размером текста."],
        ),
        fill(
          ["Add a generic fallback font.", "Zaxira umumiy shriftni qo'shing.", "Добавьте универсальный запасной шрифт."],
          "body {\n  font-family: Arial, ___;\n}",
          ["sans-serif"],
          ["sans-serif is the generic fallback family.", "sans-serif — umumiy zaxira oila.", "sans-serif — универсальное семейство-запасной вариант."],
        ),
        tf(
          ["#ff0000 is the color red.", "#ff0000 — qizil rang.", "#ff0000 — это красный цвет."],
          true,
          ["ff = full red, 00 green, 00 blue.", "ff = to'liq qizil, 00 yashil, 00 ko'k.", "ff = полный красный, 00 зелёный, 00 синий."],
        ),
      ],
    ),
    lesson(
      ["Box Model", "Quti modeli", "Блочная модель"],
      [
        "Every element is a box: content, then padding, then border, then margin. Padding is space inside the border, margin is space outside.",
        "Har bir element quti: tarkib, so'ng padding, border va margin. Padding — chegara ichidagi, margin — tashqaridagi bo'sh joy.",
        "Каждый элемент — это коробка: содержимое, затем padding, border и margin. Padding — отступ внутри рамки, margin — снаружи.",
      ],
      `.box {
  padding: 16px;
  border: 2px solid #7c5cff;
  margin: 24px;
}`,
      [
        mcq(
          ["Order of the box model from inside to outside?", "Quti modeli ichkaridan tashqariga qanday tartibda?", "Порядок блочной модели изнутри наружу?"],
          ["content, padding, border, margin", "content, margin, border, padding", "padding, content, margin, border", "border, content, padding, margin"],
          0,
          ["Content → padding → border → margin.", "Tarkib → padding → border → margin.", "Содержимое → padding → border → margin."],
        ),
        tf(
          ["Margin is the space inside the border.", "Margin — chegara ichidagi bo'sh joy.", "Margin — это пространство внутри рамки."],
          false,
          ["That is padding. Margin is outside the border.", "Bu padding. Margin chegaradan tashqarida.", "Это padding. Margin — снаружи рамки."],
        ),
        write(
          ["Challenge: give .box a padding of 20px.", "Topshiriq: .box ga 20px padding bering.", "Задание: задайте .box padding 20px."],
          ".box {\n  \n}",
          ["\\.box\\s*\\{[^}]*padding\\s*:\\s*20px"],
          ".box {\n  padding: 20px;\n}",
          ["Use padding: 20px; inside the .box rule.", ".box qoidasi ichida padding: 20px; ishlating.", "Используйте padding: 20px; внутри правила .box."],
        ),
      ],
    ),
    lesson(
      ["Flexbox", "Flexbox", "Flexbox"],
      [
        "Flexbox lays out items in a row or column. Set display: flex on the container, then use justify-content (main axis) and align-items (cross axis).",
        "Flexbox elementlarni qator yoki ustunda joylashtiradi. Konteynerga display: flex bering, so'ng justify-content (asosiy o'q) va align-items (ko'ndalang o'q) ishlating.",
        "Flexbox раскладывает элементы в строку или столбец. Задайте контейнеру display: flex, затем используйте justify-content (главная ось) и align-items (поперечная ось).",
      ],
      `.row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
}`,
      [
        mcq(
          ["Which declaration turns on Flexbox?", "Qaysi e'lon Flexbox'ni yoqadi?", "Какое объявление включает Flexbox?"],
          ["display: flex;", "flex: on;", "position: flex;", "layout: flex;"],
          0,
          ["display: flex makes the element a flex container.", "display: flex elementni flex konteynerga aylantiradi.", "display: flex делает элемент flex-контейнером."],
        ),
        fill(
          ["Center the items along the main axis.", "Elementlarni asosiy o'q bo'ylab markazlang.", "Выровняйте элементы по центру главной оси."],
          ".row {\n  display: flex;\n  ___: center;\n}",
          ["justify-content"],
          ["justify-content aligns items on the main axis.", "justify-content elementlarni asosiy o'qda tekislaydi.", "justify-content выравнивает элементы по главной оси."],
        ),
        bug(
          ["Tap the line with the wrong value.", "Noto'g'ri qiymatli qatorni bosing.", "Нажмите на строку с неверным значением."],
          [".row {", "  display: flexbox;", "}"],
          1,
          ["The correct value is flex, not flexbox.", "To'g'ri qiymat flex, flexbox emas.", "Правильное значение — flex, а не flexbox."],
        ),
      ],
    ),
    lesson(
      ["Grid", "Grid", "Grid"],
      [
        "CSS Grid is a two-dimensional layout system. Define columns with grid-template-columns and use fr units to share the free space.",
        "CSS Grid — ikki o'lchamli maket tizimi. Ustunlarni grid-template-columns bilan belgilang va bo'sh joyni bo'lish uchun fr birligidan foydalaning.",
        "CSS Grid — двумерная система раскладки. Колонки задаются через grid-template-columns, а свободное место делится единицами fr.",
      ],
      `.gallery {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
}`,
      [
        mcq(
          ["Which property defines grid columns?", "Qaysi xususiyat grid ustunlarini belgilaydi?", "Какое свойство задаёт колонки сетки?"],
          ["grid-template-columns", "grid-columns", "columns-grid", "grid-cols"],
          0,
          ["grid-template-columns defines the column tracks.", "grid-template-columns ustunlar treklarini belgilaydi.", "grid-template-columns задаёт колонки."],
        ),
        fill(
          ["Turn the container into a grid.", "Konteynerni gridga aylantiring.", "Превратите контейнер в сетку."],
          ".gallery {\n  display: ___;\n  gap: 16px;\n}",
          ["grid"],
          ["display: grid enables Grid layout.", "display: grid Grid maketini yoqadi.", "display: grid включает Grid-раскладку."],
        ),
        write(
          ["Challenge: create a grid with two equal columns.", "Topshiriq: ikkita teng ustunli grid yarating.", "Задание: создайте сетку из двух равных колонок."],
          ".grid {\n  \n}",
          ["display\\s*:\\s*grid", "grid-template-columns\\s*:\\s*(repeat\\(\\s*2\\s*,\\s*1fr\\s*\\)|1fr\\s+1fr)"],
          ".grid {\n  display: grid;\n  grid-template-columns: repeat(2, 1fr);\n}",
          ["Use display: grid and two 1fr columns.", "display: grid va ikkita 1fr ustun ishlating.", "Используйте display: grid и две колонки 1fr."],
        ),
      ],
    ),
    lesson(
      ["Responsive Design", "Moslashuvchan dizayn", "Адаптивный дизайн"],
      [
        "Responsive design adapts the layout to any screen. Media queries apply styles only when a condition, like a maximum width, is true. Mobile-first designs start small and use min-width.",
        "Moslashuvchan dizayn maketni har qanday ekranga moslaydi. Media so'rovlar uslublarni faqat shart (masalan, maksimal kenglik) bajarilganda qo'llaydi. Mobile-first dizayn kichikdan boshlanadi va min-width ishlatadi.",
        "Адаптивный дизайн подстраивает макет под любой экран. Медиазапросы применяют стили только при выполнении условия, например максимальной ширины. Mobile-first начинают с маленьких экранов и используют min-width.",
      ],
      `.menu { display: flex; }

@media (max-width: 600px) {
  .menu { display: none; }
}`,
      [
        arrange(
          ["Arrange the media query.", "Media so'rovni tartiblang.", "Расставьте медиазапрос."],
          ["@media (max-width: 600px) {", "  .menu {", "    display: none;", "  }", "}"],
          ["The media query wraps the rule, which wraps the declaration.", "Media so'rov qoidani, qoida e'lonni o'rab turadi.", "Медиазапрос содержит правило, а правило — объявление."],
        ),
        tf(
          ["The viewport meta tag helps pages look right on phones.", "Viewport meta tegi sahifalarni telefonda to'g'ri ko'rsatishga yordam beradi.", "Мета-тег viewport помогает странице корректно выглядеть на телефонах."],
          true,
          ["Without it, phones render the page as a zoomed-out desktop site.", "Usiz telefonlar sahifani kichraytirilgan desktop sayt kabi ko'rsatadi.", "Без него телефон покажет уменьшенную десктопную версию."],
        ),
        mcq(
          ["Mobile-first CSS usually relies on…", "Mobile-first CSS odatda nimaga tayanadi…", "Mobile-first CSS обычно опирается на…"],
          ["min-width", "max-height", "orientation", "print"],
          0,
          ["Start with small screens, then add min-width queries.", "Kichik ekrandan boshlab, min-width so'rovlarini qo'shing.", "Начинают с малых экранов, затем добавляют запросы min-width."],
        ),
      ],
    ),
  ],
);
