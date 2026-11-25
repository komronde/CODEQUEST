import { arrange, bug, course, fill, lesson, mcq, tf, write } from "../helpers";

export const jsCourse = course(
  "javascript",
  "#ffd23d",
  "#ff9a3d",
  ["JavaScript", "JavaScript", "JavaScript"],
  [
    "Bring pages to life with variables, logic, loops, functions, arrays, objects and the DOM.",
    "O'zgaruvchilar, mantiq, tsikllar, funksiyalar, massivlar, obyektlar va DOM yordamida sahifalarni jonlantiring.",
    "Оживляйте страницы с помощью переменных, логики, циклов, функций, массивов, объектов и DOM.",
  ],
  [
    lesson(
      ["Variables", "O'zgaruvchilar", "Переменные"],
      [
        "Variables store values. Use let for values that change and const for values that never get reassigned. Avoid var in modern code.",
        "O'zgaruvchilar qiymatlarni saqlaydi. O'zgaradigan qiymatlar uchun let, qayta tayinlanmaydiganlar uchun const ishlating. Zamonaviy kodda var'dan qoching.",
        "Переменные хранят значения. Используйте let для изменяемых значений и const для тех, что не переназначаются. В современном коде избегайте var.",
      ],
      `let score = 10;
const name = "Ada";
score = score + 5;
console.log(name, score); // Ada 15`,
      [
        mcq(
          ["Which keyword declares a constant?", "Qaysi kalit so'z konstantani e'lon qiladi?", "Какое ключевое слово объявляет константу?"],
          ["const", "let", "fixed", "static"],
          0,
          ["const cannot be reassigned.", "const qayta tayinlanmaydi.", "const нельзя переназначить."],
        ),
        fill(
          ["Declare a variable that can change.", "O'zgarishi mumkin bo'lgan o'zgaruvchini e'lon qiling.", "Объявите изменяемую переменную."],
          "___ age = 20;\nage = 21;",
          ["let|var"],
          ["let allows reassignment.", "let qayta tayinlashga ruxsat beradi.", "let разрешает переназначение."],
        ),
        bug(
          ["Tap the line that throws an error.", "Xato beradigan qatorni bosing.", "Нажмите на строку, вызывающую ошибку."],
          ["const pi = 3.14;", "pi = 3.1416;", "console.log(pi);"],
          1,
          ["A const variable cannot be reassigned.", "const o'zgaruvchisini qayta tayinlab bo'lmaydi.", "Переменную const нельзя переназначить."],
        ),
      ],
    ),
    lesson(
      ["Data Types", "Ma'lumot turlari", "Типы данных"],
      [
        "JavaScript has strings, numbers, booleans, null, undefined, objects and more. The typeof operator tells you which type a value has.",
        "JavaScript'da satrlar, sonlar, mantiqiy qiymatlar, null, undefined, obyektlar va boshqalar bor. typeof operatori qiymat turini ko'rsatadi.",
        "В JavaScript есть строки, числа, булевы значения, null, undefined, объекты и другие типы. Оператор typeof показывает тип значения.",
      ],
      `typeof "hello"; // "string"
typeof 42;      // "number"
typeof true;    // "boolean"
typeof [];      // "object"`,
      [
        mcq(
          ["What does typeof \"hello\" return?", "typeof \"hello\" nimani qaytaradi?", "Что вернёт typeof \"hello\"?"],
          ["string", "text", "char", "String"],
          0,
          ["Text values are of type \"string\".", "Matn qiymatlari \"string\" turida.", "Текстовые значения имеют тип \"string\"."],
        ),
        tf(
          ["typeof [] returns \"array\".", "typeof [] \"array\" qaytaradi.", "typeof [] возвращает \"array\"."],
          false,
          ["Arrays are objects, so it returns \"object\". Use Array.isArray().", "Massivlar obyekt, shuning uchun \"object\". Array.isArray() ishlating.", "Массивы — объекты, поэтому \"object\". Используйте Array.isArray()."],
        ),
        fill(
          ["Assign a boolean value.", "Mantiqiy qiymat bering.", "Присвойте булево значение."],
          "let isOnline = ___;",
          ["true|false"],
          ["Booleans are true or false.", "Mantiqiy qiymatlar true yoki false.", "Булевы значения — true или false."],
        ),
      ],
    ),
    lesson(
      ["Operators", "Operatorlar", "Операторы"],
      [
        "Arithmetic operators (+ - * / %) do math. Comparison operators (=== !== < >) return booleans. Prefer === because it compares both value and type.",
        "Arifmetik operatorlar (+ - * / %) hisoblaydi. Taqqoslash operatorlari (=== !== < >) mantiqiy qiymat qaytaradi. === afzal, chunki u qiymat va turni solishtiradi.",
        "Арифметические операторы (+ - * / %) считают. Операторы сравнения (=== !== < >) возвращают булево значение. Предпочитайте ===, он сравнивает значение и тип.",
      ],
      `10 % 3;      // 1 (remainder)
5 === "5";   // false
5 == "5";    // true (avoid!)
3 > 2 && 2 > 1; // true`,
      [
        mcq(
          ["What is 10 % 3?", "10 % 3 nimaga teng?", "Чему равно 10 % 3?"],
          ["1", "3", "0", "3.33"],
          0,
          ["% returns the remainder of a division.", "% bo'lish qoldig'ini qaytaradi.", "% возвращает остаток от деления."],
        ),
        tf(
          ["=== compares both value and type.", "=== qiymat va turni solishtiradi.", "=== сравнивает и значение, и тип."],
          true,
          ["That is why 5 === \"5\" is false.", "Shuning uchun 5 === \"5\" false.", "Поэтому 5 === \"5\" — false."],
        ),
        fill(
          ["Multiply 5 by 3.", "5 ni 3 ga ko'paytiring.", "Умножьте 5 на 3."],
          "let total = 5 ___ 3; // 15",
          ["*"],
          ["* is the multiplication operator.", "* ko'paytirish operatori.", "* — оператор умножения."],
        ),
      ],
    ),
    lesson(
      ["Conditions", "Shartlar", "Условия"],
      [
        "if / else if / else run different code depending on a condition. Remember: one equals sign assigns a value, three compare values.",
        "if / else if / else shartga qarab turli kodni bajaradi. Esda tuting: bitta tenglik belgisi qiymat beradi, uchta esa solishtiradi.",
        "if / else if / else выполняют разный код в зависимости от условия. Помните: один знак равенства присваивает, три — сравнивают.",
      ],
      `const age = 20;
if (age >= 18) {
  console.log("Adult");
} else {
  console.log("Minor");
}`,
      [
        arrange(
          ["Arrange the if / else block.", "if / else blokini tartiblang.", "Расставьте блок if / else."],
          ["if (age >= 18) {", '  console.log("Adult");', "} else {", '  console.log("Minor");', "}"],
          ["The else branch follows the closing brace of the if branch.", "else shoxi if shoxining yopuvchi qavsidan keyin keladi.", "Ветка else идёт после закрывающей скобки ветки if."],
        ),
        mcq(
          ["Which keyword runs when the condition is false?", "Shart noto'g'ri bo'lsa qaysi kalit so'z ishlaydi?", "Какое слово выполняется, когда условие ложно?"],
          ["else", "then", "otherwise", "elif"],
          0,
          ["else is the fallback branch.", "else — zaxira shoxi.", "else — запасная ветка."],
        ),
        bug(
          ["Tap the line with the bug.", "Xatosi bor qatorni bosing.", "Нажмите на строку с ошибкой."],
          ["let score = 10;", "if (score = 10) {", '  console.log("Ten!");', "}"],
          1,
          ["= assigns. Use === to compare.", "= qiymat beradi. Solishtirish uchun === ishlating.", "= присваивает. Для сравнения используйте ===."],
        ),
      ],
    ),
    lesson(
      ["Loops", "Tsikllar", "Циклы"],
      [
        "Loops repeat code. A for loop has three parts: start, condition and step. while repeats as long as a condition stays true.",
        "Tsikllar kodni takrorlaydi. for tsikli uch qismdan iborat: boshlanish, shart va qadam. while shart rost bo'lguncha takrorlaydi.",
        "Циклы повторяют код. У цикла for три части: начало, условие и шаг. while повторяется, пока условие истинно.",
      ],
      `for (let i = 1; i <= 3; i++) {
  console.log(i);
}
// 1, 2, 3`,
      [
        mcq(
          ["How many times does for (let i = 0; i < 3; i++) run?", "for (let i = 0; i < 3; i++) necha marta ishlaydi?", "Сколько раз выполнится for (let i = 0; i < 3; i++)?"],
          ["3", "2", "4", "Forever"],
          0,
          ["i takes 0, 1 and 2.", "i 0, 1 va 2 qiymat oladi.", "i принимает значения 0, 1 и 2."],
        ),
        fill(
          ["Loop while i is less than 5.", "i 5 dan kichik bo'lguncha takrorlang.", "Повторяйте, пока i меньше 5."],
          "for (let i = 0; i ___ 5; i++) {\n  console.log(i);\n}",
          ["<"],
          ["i < 5 keeps looping until i reaches 5.", "i < 5 i 5 ga yetguncha davom ettiradi.", "i < 5 продолжает цикл, пока i не достигнет 5."],
        ),
        write(
          ["Challenge: print the numbers 1 to 5 with a loop.", "Topshiriq: tsikl yordamida 1 dan 5 gacha sonlarni chiqaring.", "Задание: выведите числа от 1 до 5 с помощью цикла."],
          "// your code\n",
          ["for\\s*\\(|while\\s*\\(", "console\\.log\\s*\\("],
          "for (let i = 1; i <= 5; i++) {\n  console.log(i);\n}",
          ["Use a for loop and console.log(i).", "for tsikli va console.log(i) dan foydalaning.", "Используйте цикл for и console.log(i)."],
        ),
      ],
    ),
    lesson(
      ["Functions", "Funksiyalar", "Функции"],
      [
        "Functions are reusable blocks of code. They take parameters and can return a value. Call a function by writing its name with parentheses.",
        "Funksiyalar — qayta ishlatiladigan kod bloklari. Ular parametrlar qabul qiladi va qiymat qaytarishi mumkin. Funksiyani nomi va qavslar bilan chaqiring.",
        "Функции — повторно используемые блоки кода. Они принимают параметры и могут возвращать значение. Вызов — имя функции со скобками.",
      ],
      `function add(a, b) {
  return a + b;
}
console.log(add(2, 3)); // 5`,
      [
        arrange(
          ["Arrange the function.", "Funksiyani tartiblang.", "Расставьте функцию."],
          ["function add(a, b) {", "  return a + b;", "}", "console.log(add(2, 3));"],
          ["Define the function first, then call it.", "Avval funksiyani e'lon qiling, keyin chaqiring.", "Сначала объявите функцию, затем вызовите её."],
        ),
        fill(
          ["Return the sum.", "Yig'indini qaytaring.", "Верните сумму."],
          "function add(a, b) {\n  ___ a + b;\n}",
          ["return"],
          ["return sends a value back to the caller.", "return qiymatni chaqiruvchiga qaytaradi.", "return возвращает значение вызывающему коду."],
        ),
        write(
          ["Challenge: write a function double(n) that returns n times 2.", "Topshiriq: n ni 2 ga ko'paytirib qaytaradigan double(n) funksiyasini yozing.", "Задание: напишите функцию double(n), возвращающую n, умноженное на 2."],
          "// your code\n",
          ["function\\s+double\\s*\\(\\s*n\\s*\\)|(const|let)\\s+double\\s*=", "return\\s+(n\\s*\\*\\s*2|2\\s*\\*\\s*n|n\\s*\\+\\s*n)|=>\\s*(n\\s*\\*\\s*2|2\\s*\\*\\s*n)"],
          "function double(n) {\n  return n * 2;\n}",
          ["Define double(n) and return n * 2.", "double(n) ni e'lon qilib, n * 2 ni qaytaring.", "Объявите double(n) и верните n * 2."],
        ),
      ],
    ),
    lesson(
      ["Arrays", "Massivlar", "Массивы"],
      [
        "Arrays hold ordered lists of values. Indexes start at 0. Handy methods: push adds to the end, pop removes the last item, map transforms every item.",
        "Massivlar qiymatlarning tartiblangan ro'yxatini saqlaydi. Indekslar 0 dan boshlanadi. Foydali metodlar: push oxiriga qo'shadi, pop oxirgisini olib tashlaydi, map har bir elementni o'zgartiradi.",
        "Массивы хранят упорядоченные списки значений. Индексы начинаются с 0. Полезные методы: push добавляет в конец, pop удаляет последний, map преобразует каждый элемент.",
      ],
      `const fruits = ["apple", "banana"];
fruits.push("kiwi");
console.log(fruits[0]);   // apple
console.log(fruits.length); // 3`,
      [
        mcq(
          ["What is the index of the first element?", "Birinchi elementning indeksi nechta?", "Какой индекс у первого элемента?"],
          ["0", "1", "-1", "first"],
          0,
          ["Arrays are zero-indexed.", "Massivlar nol-indeksli.", "Индексация массивов начинается с нуля."],
        ),
        tf(
          ["push() adds an item to the end of an array.", "push() massiv oxiriga element qo'shadi.", "push() добавляет элемент в конец массива."],
          true,
          ["Use unshift() to add to the start.", "Boshiga qo'shish uchun unshift() ishlating.", "Для добавления в начало используйте unshift()."],
        ),
        write(
          ["Challenge: add \"kiwi\" to the end of fruits.", "Topshiriq: fruits oxiriga \"kiwi\" qo'shing.", "Задание: добавьте \"kiwi\" в конец fruits."],
          'const fruits = ["apple", "banana"];\n',
          ["fruits\\.push\\(\\s*[\"']kiwi[\"']\\s*\\)"],
          'fruits.push("kiwi");',
          ["Call fruits.push(\"kiwi\").", "fruits.push(\"kiwi\") ni chaqiring.", "Вызовите fruits.push(\"kiwi\")."],
        ),
      ],
    ),
    lesson(
      ["Objects", "Obyektlar", "Объекты"],
      [
        "Objects group related data as key: value pairs. Read values with dot notation (user.name) or bracket notation (user[\"name\"]).",
        "Obyektlar bog'liq ma'lumotlarni kalit: qiymat juftliklari sifatida guruhlaydi. Qiymatlarni nuqta (user.name) yoki qavs (user[\"name\"]) orqali o'qing.",
        "Объекты группируют связанные данные в парах ключ: значение. Читайте значения через точку (user.name) или скобки (user[\"name\"]).",
      ],
      `const user = {
  name: "Ada",
  age: 36,
};
console.log(user.name); // Ada`,
      [
        mcq(
          ["How do you read the name property of user?", "user ning name xususiyatini qanday o'qiysiz?", "Как прочитать свойство name у user?"],
          ["user.name", "user->name", "user[name]", "name.user"],
          0,
          ["Dot notation reads a property.", "Nuqta yozuvi xususiyatni o'qiydi.", "Точечная запись читает свойство."],
        ),
        fill(
          ["Read the age property.", "age xususiyatini o'qing.", "Прочитайте свойство age."],
          'const user = { name: "Ada", age: 36 };\nconsole.log(user.___); // 36',
          ["age"],
          ["The property key is age.", "Xususiyat kaliti — age.", "Ключ свойства — age."],
        ),
        bug(
          ["Tap the line with the missing comma.", "Vergul yetishmayotgan qatorni bosing.", "Нажмите на строку, где пропущена запятая."],
          ["const car = {", '  brand: "Tesla"', "  year: 2024", "};"],
          1,
          ["Properties are separated by commas.", "Xususiyatlar vergul bilan ajratiladi.", "Свойства разделяются запятыми."],
        ),
      ],
    ),
    lesson(
      ["DOM", "DOM", "DOM"],
      [
        "The DOM is the browser's live model of your page. Select elements with document.querySelector, change them with textContent, and react to users with addEventListener.",
        "DOM — brauzerning sahifangiz haqidagi jonli modeli. Elementlarni document.querySelector bilan tanlang, textContent bilan o'zgartiring va addEventListener bilan foydalanuvchiga javob bering.",
        "DOM — живая модель вашей страницы в браузере. Выбирайте элементы через document.querySelector, меняйте через textContent и реагируйте на действия через addEventListener.",
      ],
      `const btn = document.querySelector("#btn");
btn.addEventListener("click", () => {
  btn.textContent = "Clicked!";
});`,
      [
        mcq(
          ["Which method selects an element by CSS selector?", "Qaysi metod elementni CSS selektori bilan tanlaydi?", "Какой метод выбирает элемент по CSS-селектору?"],
          ["document.querySelector()", "document.findElement()", "document.select()", "document.getCSS()"],
          0,
          ["querySelector accepts any CSS selector.", "querySelector istalgan CSS selektorni qabul qiladi.", "querySelector принимает любой CSS-селектор."],
        ),
        arrange(
          ["Arrange the click handler.", "Bosish ishlovchisini tartiblang.", "Расставьте обработчик клика."],
          ['const btn = document.querySelector("#btn");', 'btn.addEventListener("click", () => {', '  alert("Hi!");', "});"],
          ["Select the element first, then attach the listener.", "Avval elementni tanlang, keyin tinglovchini biriktiring.", "Сначала выберите элемент, затем добавьте слушатель."],
        ),
        write(
          ["Challenge: set the title's text to \"Done\".", "Topshiriq: title matnini \"Done\" ga o'zgartiring.", "Задание: установите текст title равным \"Done\"."],
          'const title = document.querySelector("h1");\n',
          ["title\\.(textContent|innerText)\\s*=\\s*[\"']Done[\"']"],
          'title.textContent = "Done";',
          ["Assign to title.textContent.", "title.textContent ga qiymat bering.", "Присвойте значение title.textContent."],
        ),
      ],
    ),
  ],
);
