import { arrange, bug, course, fill, lesson, mcq, tf, write } from "../helpers";

export const htmlCourse = course(
  "html",
  "#ff7849",
  "#ff3d77",
  ["HTML", "HTML", "HTML"],
  [
    "Build the skeleton of every web page with tags, links, lists, forms and semantic markup.",
    "Teglar, havolalar, ro'yxatlar, formalar va semantik belgilash yordamida har bir veb-sahifaning skeletini yarating.",
    "Создавайте каркас любой веб-страницы с помощью тегов, ссылок, списков, форм и семантической разметки.",
  ],
  [
    lesson(
      ["Introduction", "Kirish", "Введение"],
      [
        "HTML (HyperText Markup Language) describes the structure of a web page. Browsers read your tags and turn them into headings, text, images and more.",
        "HTML (HyperText Markup Language) veb-sahifa tuzilishini tasvirlaydi. Brauzer teglaringizni o'qib, ularni sarlavha, matn va rasmlarga aylantiradi.",
        "HTML (HyperText Markup Language) описывает структуру веб-страницы. Браузер читает теги и превращает их в заголовки, текст, изображения и многое другое.",
      ],
      `<!DOCTYPE html>
<html>
  <head>
    <title>My page</title>
  </head>
  <body>
    <h1>Hello, web!</h1>
  </body>
</html>`,
      [
        mcq(
          ["What does HTML stand for?", "HTML nimaning qisqartmasi?", "Что означает HTML?"],
          ["HyperText Markup Language", "High Tech Modern Language", "Hyper Transfer Markup Logic", "Home Tool Markup Language"],
          0,
          ["HTML is the HyperText Markup Language.", "HTML — HyperText Markup Language.", "HTML — это HyperText Markup Language."],
        ),
        tf(
          ["The <body> element contains the visible content of the page.", "<body> elementi sahifaning ko'rinadigan tarkibini o'z ichiga oladi.", "Элемент <body> содержит видимое содержимое страницы."],
          true,
          ["Everything you see in the browser window lives inside <body>.", "Brauzer oynasida ko'rgan hamma narsa <body> ichida bo'ladi.", "Всё, что вы видите в окне браузера, находится внутри <body>."],
        ),
        arrange(
          ["Arrange the tags to build a valid page skeleton.", "Yaroqli sahifa skeletini yig'ish uchun teglarni tartiblang.", "Расставьте теги, чтобы получить правильный каркас страницы."],
          ["<html>", "  <body>", "    <h1>Hi</h1>", "  </body>", "</html>"],
          ["Tags are nested: html wraps body, body wraps the heading.", "Teglar ichma-ich joylashadi: html body'ni, body esa sarlavhani o'rab turadi.", "Теги вложены: html содержит body, а body — заголовок."],
        ),
      ],
    ),
    lesson(
      ["HTML Elements", "HTML elementlari", "HTML-элементы"],
      [
        "An element is an opening tag, some content and a closing tag. A few elements, like <br> and <img>, are void: they have no content and no closing tag.",
        "Element — bu ochuvchi teg, tarkib va yopuvchi tegdan iborat. <br> va <img> kabi ba'zi elementlar bo'sh: ularda tarkib ham, yopuvchi teg ham yo'q.",
        "Элемент — это открывающий тег, содержимое и закрывающий тег. Некоторые элементы, например <br> и <img>, пустые: у них нет содержимого и закрывающего тега.",
      ],
      `<p>This is a paragraph.</p>
<br>
<img src="cat.png" alt="A cat">`,
      [
        mcq(
          ["Which is the closing tag for <p>?", "<p> uchun yopuvchi teg qaysi?", "Какой закрывающий тег у <p>?"],
          ["</p>", "<p/>", "/p", "<end>"],
          0,
          ["Closing tags start with a slash: </p>.", "Yopuvchi teglar slesh bilan boshlanadi: </p>.", "Закрывающие теги начинаются со слеша: </p>."],
        ),
        fill(
          ["Complete the closing tag.", "Yopuvchi tegni to'ldiring.", "Допишите закрывающий тег."],
          "<p>Hello</___",
          ["p>"],
          ["The closing tag repeats the name with a slash.", "Yopuvchi teg nomni slesh bilan takrorlaydi.", "Закрывающий тег повторяет имя со слешем."],
        ),
        bug(
          ["Tap the line with the error.", "Xatosi bor qatorni bosing.", "Нажмите на строку с ошибкой."],
          ["<div>", "  <p>Welcome", "</div>"],
          1,
          ["The paragraph is never closed with </p>.", "Paragraf </p> bilan yopilmagan.", "Абзац не закрыт тегом </p>."],
        ),
      ],
    ),
    lesson(
      ["Headings and Paragraphs", "Sarlavhalar va paragraflar", "Заголовки и абзацы"],
      [
        "Headings go from <h1> (most important) to <h6>. Use <p> for paragraphs of text. Choose headings for meaning, not for size — CSS handles the size.",
        "Sarlavhalar <h1> (eng muhim) dan <h6> gacha. Matn paragraflari uchun <p> ishlating. Sarlavhani o'lchami uchun emas, ma'nosi uchun tanlang — o'lchamni CSS boshqaradi.",
        "Заголовки идут от <h1> (самый важный) до <h6>. Для текста используйте <p>. Выбирайте заголовок по смыслу, а не по размеру — размером занимается CSS.",
      ],
      `<h1>My blog</h1>
<h2>Latest post</h2>
<p>Learning HTML is fun!</p>`,
      [
        mcq(
          ["Which heading is the most important?", "Qaysi sarlavha eng muhim?", "Какой заголовок самый важный?"],
          ["<h1>", "<h6>", "<head>", "<header>"],
          0,
          ["<h1> is the top-level heading.", "<h1> — eng yuqori darajali sarlavha.", "<h1> — заголовок верхнего уровня."],
        ),
        tf(
          ["Use <h1> whenever you want big text.", "Katta matn kerak bo'lganda <h1> ishlating.", "Используйте <h1>, когда нужен крупный текст."],
          false,
          ["Headings describe structure. Use CSS font-size for size.", "Sarlavhalar tuzilmani bildiradi. O'lcham uchun CSS font-size ishlating.", "Заголовки задают структуру. Для размера используйте CSS font-size."],
        ),
        write(
          ["Challenge: write an <h2> that says About, followed by a paragraph.", "Topshiriq: About degan <h2> va undan keyin paragraf yozing.", "Задание: напишите <h2> с текстом About, а затем абзац."],
          "<!-- your code here -->\n",
          ["<h2[^>]*>\\s*About\\s*</h2>", "<p[^>]*>[^<]+</p>"],
          "<h2>About</h2>\n<p>I love coding.</p>",
          ["An <h2> followed by a <p> with some text.", "<h2> va undan keyin matnli <p>.", "<h2>, а за ним <p> с текстом."],
          ["Use <h2>About</h2> then <p>…</p>.", "<h2>About</h2> keyin <p>…</p> ishlating.", "Используйте <h2>About</h2>, затем <p>…</p>."],
        ),
      ],
    ),
    lesson(
      ["Links and Images", "Havolalar va rasmlar", "Ссылки и изображения"],
      [
        "Links use the <a> element with an href attribute. Images use <img> with src (the file) and alt (a text description for accessibility).",
        "Havolalar href atributli <a> elementi bilan yaratiladi. Rasmlar src (fayl) va alt (qulaylik uchun matnli tavsif) atributli <img> bilan qo'shiladi.",
        "Ссылки создаются элементом <a> с атрибутом href. Изображения — элементом <img> с src (файл) и alt (текстовое описание для доступности).",
      ],
      `<a href="https://codequest.dev">Visit CodeQuest</a>
<img src="logo.png" alt="CodeQuest logo">`,
      [
        fill(
          ["Which attribute holds the link address?", "Havola manzili qaysi atributda saqlanadi?", "В каком атрибуте хранится адрес ссылки?"],
          '<a ___="https://codequest.dev">Visit</a>',
          ["href"],
          ["href stands for hypertext reference.", "href — gipermatn havolasi.", "href — гипертекстовая ссылка."],
        ),
        mcq(
          ["Which attribute gives an image its text alternative?", "Rasmning matnli muqobilini qaysi atribut beradi?", "Какой атрибут задаёт текстовую замену изображения?"],
          ["alt", "title", "src", "text"],
          0,
          ["alt helps screen readers and shows if the image fails to load.", "alt ekran o'qish dasturlariga yordam beradi va rasm yuklanmasa ko'rsatiladi.", "alt помогает скринридерам и показывается, если изображение не загрузилось."],
        ),
        arrange(
          ["Build the image tag.", "Rasm tegini yig'ing.", "Соберите тег изображения."],
          ["<img", '  src="logo.png"', '  alt="Logo"', ">"],
          ["Attributes go inside the opening tag, before the closing >.", "Atributlar ochuvchi teg ichida, yopuvchi > dan oldin yoziladi.", "Атрибуты пишутся внутри тега до закрывающей >."],
        ),
      ],
    ),
    lesson(
      ["Lists", "Ro'yxatlar", "Списки"],
      [
        "Use <ul> for bullet lists and <ol> for numbered lists. Every item inside is an <li>.",
        "Belgili ro'yxat uchun <ul>, raqamli ro'yxat uchun <ol> ishlating. Ichidagi har bir band <li> bo'ladi.",
        "Для маркированных списков используйте <ul>, для нумерованных — <ol>. Каждый пункт внутри — это <li>.",
      ],
      `<ul>
  <li>HTML</li>
  <li>CSS</li>
  <li>JavaScript</li>
</ul>`,
      [
        mcq(
          ["Which tag wraps each list item?", "Ro'yxatning har bir bandini qaysi teg o'raydi?", "Какой тег оборачивает каждый пункт списка?"],
          ["<li>", "<item>", "<ul>", "<list>"],
          0,
          ["<li> means list item.", "<li> — list item (ro'yxat bandi).", "<li> — list item (элемент списка)."],
        ),
        tf(
          ["<ol> creates a numbered list.", "<ol> raqamli ro'yxat yaratadi.", "<ol> создаёт нумерованный список."],
          true,
          ["ol = ordered list.", "ol — tartiblangan ro'yxat.", "ol — упорядоченный список."],
        ),
        bug(
          ["Tap the line that does not belong in the list.", "Ro'yxatga mos kelmaydigan qatorni bosing.", "Нажмите на строку, которая не подходит для списка."],
          ["<ul>", "  <li>Apple</li>", "  <p>Banana</p>", "</ul>"],
          2,
          ["Direct children of <ul> must be <li> elements.", "<ul> ning bevosita bolalari <li> bo'lishi kerak.", "Прямыми потомками <ul> должны быть элементы <li>."],
        ),
      ],
    ),
    lesson(
      ["Forms", "Formalar", "Формы"],
      [
        "Forms collect user input. Use <label> to describe a field, <input> for data and <button> to submit. The type attribute changes how an input behaves.",
        "Formalar foydalanuvchi ma'lumotlarini yig'adi. Maydonni tavsiflash uchun <label>, ma'lumot uchun <input>, yuborish uchun <button> ishlating. type atributi maydon xatti-harakatini o'zgartiradi.",
        "Формы собирают данные пользователя. <label> описывает поле, <input> принимает данные, <button> отправляет форму. Атрибут type меняет поведение поля.",
      ],
      `<form>
  <label for="email">Email</label>
  <input type="email" id="email">
  <button type="submit">Send</button>
</form>`,
      [
        mcq(
          ["Which input type hides the typed characters?", "Qaysi input turi yozilgan belgilarni yashiradi?", "Какой тип input скрывает вводимые символы?"],
          ["password", "hidden", "secret", "text"],
          0,
          ["type=\"password\" masks characters.", "type=\"password\" belgilarni yashiradi.", "type=\"password\" скрывает символы."],
        ),
        fill(
          ["Fill in the missing attribute and tag name.", "Yetishmayotgan atribut va teg nomini to'ldiring.", "Допишите пропущенный атрибут и имя тега."],
          '<input ___="text" id="name">\n<___ type="submit">Send</button>',
          ["type", "button"],
          ["type sets the input kind; <button> submits the form.", "type input turini belgilaydi; <button> formani yuboradi.", "type задаёт вид поля; <button> отправляет форму."],
        ),
        write(
          ["Challenge: write an email input and a submit button.", "Topshiriq: email input va yuborish tugmasini yozing.", "Задание: напишите поле email и кнопку отправки."],
          "<form>\n  \n</form>",
          ["<input[^>]*type=[\"']email[\"']", "<button[^>]*>"],
          '<form>\n  <input type="email">\n  <button type="submit">Send</button>\n</form>',
          ["You need <input type=\"email\"> and a <button>.", "Sizga <input type=\"email\"> va <button> kerak.", "Нужны <input type=\"email\"> и <button>."],
          ['Try <input type="email"> and <button>Send</button>.', '<input type="email"> va <button>Send</button> ni sinab ko\'ring.', 'Попробуйте <input type="email"> и <button>Send</button>.'],
        ),
      ],
    ),
    lesson(
      ["Semantic HTML", "Semantik HTML", "Семантический HTML"],
      [
        "Semantic elements such as <header>, <nav>, <main> and <footer> describe the meaning of content. They help search engines, screen readers and other developers.",
        "<header>, <nav>, <main> va <footer> kabi semantik elementlar tarkib ma'nosini bildiradi. Ular qidiruv tizimlari, ekran o'qish dasturlari va boshqa dasturchilarga yordam beradi.",
        "Семантические элементы — <header>, <nav>, <main>, <footer> — описывают смысл содержимого. Они помогают поисковикам, скринридерам и другим разработчикам.",
      ],
      `<body>
  <header>Logo</header>
  <nav>Links</nav>
  <main>Content</main>
  <footer>© 2025</footer>
</body>`,
      [
        mcq(
          ["Which element is meant for main navigation links?", "Asosiy navigatsiya havolalari uchun qaysi element mo'ljallangan?", "Какой элемент предназначен для основной навигации?"],
          ["<nav>", "<menu>", "<links>", "<div>"],
          0,
          ["<nav> marks a block of navigation links.", "<nav> navigatsiya havolalari blokini belgilaydi.", "<nav> обозначает блок навигационных ссылок."],
        ),
        tf(
          ["A <div> tells screen readers what its content means.", "<div> ekran o'qish dasturiga tarkib ma'nosini bildiradi.", "<div> сообщает скринридеру, что означает его содержимое."],
          false,
          ["<div> is generic and has no meaning.", "<div> umumiy element va ma'noga ega emas.", "<div> — универсальный элемент без смысла."],
        ),
        arrange(
          ["Arrange a semantic page layout.", "Semantik sahifa maketini tartiblang.", "Расставьте семантическую структуру страницы."],
          ["<body>", "  <header>Logo</header>", "  <main>Content</main>", "  <footer>© 2025</footer>", "</body>"],
          ["Header on top, main content in the middle, footer last.", "Yuqorida header, o'rtada asosiy tarkib, oxirida footer.", "Сверху header, в середине основное содержимое, внизу footer."],
        ),
      ],
    ),
  ],
);
