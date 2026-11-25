import { arrange, bug, course, fill, lesson, mcq, tf, write } from "../helpers";

export const tsCourse = course(
  "typescript",
  "#4f9dff",
  "#2563eb",
  ["TypeScript", "TypeScript", "TypeScript"],
  [
    "Catch bugs before they run: type annotations, interfaces, unions and generics.",
    "Xatolarni ishga tushishidan oldin toping: tur annotatsiyalari, interfeyslar, birlashmalar va generiklar.",
    "Ловите ошибки до запуска: аннотации типов, интерфейсы, объединения и обобщения.",
  ],
  [
    lesson(
      ["Basic Types", "Asosiy turlar", "Базовые типы"],
      [
        "TypeScript adds static types to JavaScript. Annotate a variable with a colon and a type: number, string, boolean. The compiler warns you when you misuse a value.",
        "TypeScript JavaScript'ga statik turlarni qo'shadi. O'zgaruvchini ikki nuqta va tur bilan belgilang: number, string, boolean. Qiymatni noto'g'ri ishlatsangiz, kompilyator ogohlantiradi.",
        "TypeScript добавляет в JavaScript статические типы. Аннотируйте переменную двоеточием и типом: number, string, boolean. Компилятор предупредит, если значение используется неправильно.",
      ],
      `let age: number = 30;
let name: string = "Ada";
let done: boolean = false;`,
      [
        mcq(
          ["Which is the correct type annotation?", "Qaysi biri to'g'ri tur annotatsiyasi?", "Какая аннотация типа правильная?"],
          ["let x: number", "let number x", "let x<number>", "let x as number"],
          0,
          ["The type comes after a colon.", "Tur ikki nuqtadan keyin yoziladi.", "Тип пишется после двоеточия."],
        ),
        fill(
          ["Annotate the variable as text.", "O'zgaruvchini matn sifatida belgilang.", "Аннотируйте переменную как текст."],
          'let title: ___ = "Hi";',
          ["string"],
          ["Text values use the string type.", "Matn qiymatlari string turidan foydalanadi.", "Текстовые значения имеют тип string."],
        ),
        bug(
          ["Tap the line TypeScript will reject.", "TypeScript rad etadigan qatorni bosing.", "Нажмите на строку, которую отклонит TypeScript."],
          ["let count: number = 5;", 'count = "five";'],
          1,
          ["A string cannot be assigned to a number variable.", "Satrni number o'zgaruvchisiga berib bo'lmaydi.", "Строку нельзя присвоить переменной типа number."],
        ),
      ],
    ),
    lesson(
      ["Interfaces", "Interfeyslar", "Интерфейсы"],
      [
        "An interface describes the shape of an object. Mark a property optional with ?. Interfaces exist only at compile time and cost nothing at runtime.",
        "Interfeys obyektning shaklini tasvirlaydi. Xususiyatni ixtiyoriy qilish uchun ? qo'ying. Interfeyslar faqat kompilyatsiya vaqtida mavjud va ish vaqtida hech narsaga tushmaydi.",
        "Интерфейс описывает форму объекта. Свойство делается необязательным через ?. Интерфейсы существуют только при компиляции и ничего не стоят во время выполнения.",
      ],
      `interface User {
  name: string;
  age: number;
  email?: string;
}`,
      [
        mcq(
          ["What does an interface describe?", "Interfeys nimani tasvirlaydi?", "Что описывает интерфейс?"],
          ["The shape of an object", "A CSS layout", "A database table", "A function body"],
          0,
          ["Interfaces define required properties and their types.", "Interfeyslar majburiy xususiyatlar va ularning turlarini belgilaydi.", "Интерфейсы определяют обязательные свойства и их типы."],
        ),
        tf(
          ["A property marked with ? is optional.", "? bilan belgilangan xususiyat ixtiyoriy.", "Свойство с ? необязательное."],
          true,
          ["email?: string means email may be missing.", "email?: string email bo'lmasligi mumkinligini bildiradi.", "email?: string означает, что email может отсутствовать."],
        ),
        write(
          ["Challenge: declare an interface Point with numeric x and y.", "Topshiriq: son turidagi x va y li Point interfeysini e'lon qiling.", "Задание: объявите интерфейс Point с числовыми x и y."],
          "// your code\n",
          ["interface\\s+Point\\s*\\{", "x\\s*:\\s*number", "y\\s*:\\s*number"],
          "interface Point {\n  x: number;\n  y: number;\n}",
          ["Declare interface Point { x: number; y: number }.", "interface Point { x: number; y: number } ni e'lon qiling.", "Объявите interface Point { x: number; y: number }."],
        ),
      ],
    ),
    lesson(
      ["Union Types", "Birlashma turlar", "Union-типы"],
      [
        "A union type allows several types: string | number. Narrow a union with typeof checks before using type-specific methods.",
        "Birlashma tur bir nechta turga ruxsat beradi: string | number. Tur-ga xos metodlardan oldin typeof tekshiruvi bilan birlashmani toraytiring.",
        "Union-тип допускает несколько типов: string | number. Перед использованием методов конкретного типа сузьте union проверкой typeof.",
      ],
      `type Status = "idle" | "loading" | "done";

function print(v: string | number) {
  if (typeof v === "string") return v.toUpperCase();
  return v.toFixed(2);
}`,
      [
        mcq(
          ["What does | mean in a type?", "Turda | nimani anglatadi?", "Что означает | в типе?"],
          ["Or", "And", "Not", "In"],
          0,
          ["A | B means the value is A or B.", "A | B qiymat A yoki B ekanini bildiradi.", "A | B значит, что значение A или B."],
        ),
        fill(
          ["Create a union of two string literals.", "Ikki satr literalining birlashmasini yarating.", "Создайте union из двух строковых литералов."],
          'type Status = "idle" ___ "loading";',
          ["|"],
          ["The pipe separates union members.", "Vertikal chiziq birlashma a'zolarini ajratadi.", "Вертикальная черта разделяет члены union."],
        ),
        arrange(
          ["Arrange the narrowing function.", "Toraytiruvchi funksiyani tartiblang.", "Расставьте функцию с сужением типа."],
          ["function print(v: string | number) {", '  if (typeof v === "string") {', "    return v.toUpperCase();", "  }", "  return v.toFixed(2);", "}"],
          ["Check the type first; the rest of the function handles number.", "Avval turni tekshiring; funksiyaning qolgan qismi number bilan ishlaydi.", "Сначала проверяем тип; остальная часть функции работает с number."],
        ),
      ],
    ),
    lesson(
      ["Generics", "Generiklar", "Обобщения (Generics)"],
      [
        "Generics let you write reusable code that works with many types. A type parameter, usually T, is a placeholder filled in when the function is called.",
        "Generiklar ko'p turlar bilan ishlaydigan qayta ishlatiladigan kod yozishga imkon beradi. Tur parametri (odatda T) funksiya chaqirilganda to'ldiriladigan o'rin egasi.",
        "Generics позволяют писать повторно используемый код для разных типов. Параметр типа, обычно T, — это заполнитель, подставляемый при вызове функции.",
      ],
      `function first<T>(items: T[]): T {
  return items[0];
}

first([1, 2, 3]);      // number
first(["a", "b"]);     // string`,
      [
        mcq(
          ["Which letter is conventionally used for a type parameter?", "Tur parametri uchun odatda qaysi harf ishlatiladi?", "Какая буква обычно используется для параметра типа?"],
          ["T", "X", "Q", "Z"],
          0,
          ["T stands for Type.", "T — Type degani.", "T — от слова Type."],
        ),
        tf(
          ["Generics help reuse code across different types.", "Generiklar turli turlar bo'yicha kodni qayta ishlatishga yordam beradi.", "Generics помогают переиспользовать код для разных типов."],
          true,
          ["One generic function can serve many types safely.", "Bitta generik funksiya ko'p turlarga xavfsiz xizmat qiladi.", "Одна обобщённая функция безопасно работает с разными типами."],
        ),
        fill(
          ["Declare the type parameter.", "Tur parametrini e'lon qiling.", "Объявите параметр типа."],
          "function identity<___>(x: T): T {\n  return x;\n}",
          ["T"],
          ["<T> introduces the type parameter used in the signature.", "<T> imzoda ishlatiladigan tur parametrini kiritadi.", "<T> вводит параметр типа, используемый в сигнатуре."],
        ),
      ],
    ),
  ],
);
