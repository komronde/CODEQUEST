import { arrange, bug, course, fill, lesson, mcq, tf, write } from "../helpers";

export const pythonCourse = course(
  "python",
  "#3dd6a0",
  "#2f8cff",
  ["Python", "Python", "Python"],
  [
    "Start with the friendliest language: variables, types, conditions, loops, functions, lists and dictionaries.",
    "Eng qulay til bilan boshlang: o'zgaruvchilar, turlar, shartlar, tsikllar, funksiyalar, ro'yxatlar va lug'atlar.",
    "Начните с самого дружелюбного языка: переменные, типы, условия, циклы, функции, списки и словари.",
  ],
  [
    lesson(
      ["Introduction", "Kirish", "Введение"],
      [
        "Python is a readable, beginner-friendly language used for web, data and AI. It uses indentation instead of braces to group code.",
        "Python — veb, ma'lumotlar va sun'iy intellektda ishlatiladigan o'qilishi oson, yangi boshlovchilar uchun qulay til. U kodni guruhlash uchun qavslar o'rniga bo'sh joy (indent) ishlatadi.",
        "Python — читаемый и дружелюбный к новичкам язык для веба, данных и ИИ. Для группировки кода он использует отступы вместо скобок.",
      ],
      `print("Hello, Python!")
print(2 + 3)`,
      [
        mcq(
          ["Which line prints text in Python?", "Qaysi qator Python'da matn chiqaradi?", "Какая строка выводит текст в Python?"],
          ['print("Hi")', 'echo "Hi"', 'console.log("Hi")', 'say("Hi")'],
          0,
          ["print() displays output.", "print() natijani ko'rsatadi.", "print() выводит результат."],
        ),
        tf(
          ["Python uses indentation to group code.", "Python kodni guruhlash uchun indentdan foydalanadi.", "Python использует отступы для группировки кода."],
          true,
          ["Indentation is part of the syntax.", "Indent sintaksisning bir qismi.", "Отступы — часть синтаксиса."],
        ),
        fill(
          ["Complete the function that prints.", "Chiqaruvchi funksiyani to'ldiring.", "Допишите функцию вывода."],
          '___("Hello")',
          ["print"],
          ["print is the output function.", "print — chiqarish funksiyasi.", "print — функция вывода."],
        ),
      ],
    ),
    lesson(
      ["Variables", "O'zgaruvchilar", "Переменные"],
      [
        "A variable is a name pointing to a value. You do not declare types in Python; just assign with =. Names use letters, digits and underscores and cannot start with a digit.",
        "O'zgaruvchi — qiymatga ishora qiluvchi nom. Python'da tur e'lon qilinmaydi; faqat = bilan tayinlang. Nomlar harf, raqam va pastki chiziqdan iborat bo'ladi va raqam bilan boshlanmaydi.",
        "Переменная — это имя, указывающее на значение. Типы в Python не объявляются, достаточно присвоить через =. Имя состоит из букв, цифр и подчёркиваний и не начинается с цифры.",
      ],
      `name = "Ada"
age = 36
print(name, age)`,
      [
        mcq(
          ["Which is a valid variable name?", "Qaysi biri yaroqli o'zgaruvchi nomi?", "Какое имя переменной допустимо?"],
          ["user_name", "2user", "user-name", "user name"],
          0,
          ["Underscores are allowed; digits first, hyphens and spaces are not.", "Pastki chiziq mumkin; raqam bilan boshlash, defis va bo'sh joy mumkin emas.", "Подчёркивания разрешены; цифра в начале, дефис и пробел — нет."],
        ),
        tf(
          ["You must declare a variable's type in Python.", "Python'da o'zgaruvchi turini e'lon qilish shart.", "В Python нужно объявлять тип переменной."],
          false,
          ["Python is dynamically typed.", "Python dinamik tipli til.", "Python — язык с динамической типизацией."],
        ),
        bug(
          ["Tap the line with the invalid name.", "Yaroqsiz nomli qatorni bosing.", "Нажмите на строку с недопустимым именем."],
          ['user-name = "Ann"', "print(user)"],
          0,
          ["Hyphens are not allowed; use user_name.", "Defis mumkin emas; user_name ishlating.", "Дефис недопустим; используйте user_name."],
        ),
      ],
    ),
    lesson(
      ["Data Types", "Ma'lumot turlari", "Типы данных"],
      [
        "Core types: int (whole numbers), float (decimals), str (text) and bool (True/False). Use type() to inspect a value.",
        "Asosiy turlar: int (butun sonlar), float (kasr sonlar), str (matn) va bool (True/False). Qiymatni tekshirish uchun type() ishlating.",
        "Основные типы: int (целые), float (дробные), str (текст) и bool (True/False). Для проверки используйте type().",
      ],
      `print(type(42))      # int
print(type(3.14))    # float
print(type("hi"))    # str
print(type(True))    # bool`,
      [
        mcq(
          ["What is the type of 3.14?", "3.14 qaysi turga tegishli?", "Какой тип у 3.14?"],
          ["float", "int", "str", "decimal"],
          0,
          ["Numbers with a decimal point are floats.", "O'nli kasrli sonlar float.", "Числа с десятичной точкой — float."],
        ),
        fill(
          ["Assign a boolean value (note the capital letter).", "Mantiqiy qiymat bering (bosh harfga e'tibor bering).", "Присвойте булево значение (обратите внимание на заглавную букву)."],
          "is_ready = ___",
          ["True|False"],
          ["Python booleans are True and False.", "Python mantiqiy qiymatlari True va False.", "Булевы значения Python — True и False."],
        ),
        tf(
          ['"5" + "5" equals "55".', '"5" + "5" "55" ga teng.', '"5" + "5" равно "55".'],
          true,
          ["+ joins strings together.", "+ satrlarni birlashtiradi.", "+ склеивает строки."],
        ),
      ],
    ),
    lesson(
      ["Conditions", "Shartlar", "Условия"],
      [
        "if, elif and else choose which block runs. End each condition line with a colon and indent the block below it.",
        "if, elif va else qaysi blok ishlashini tanlaydi. Har bir shart qatorini ikki nuqta bilan tugating va blokni indent bilan yozing.",
        "if, elif и else выбирают, какой блок выполнить. Заканчивайте строку условия двоеточием и делайте отступ у блока.",
      ],
      `age = 20
if age >= 18:
    print("Adult")
else:
    print("Minor")`,
      [
        arrange(
          ["Arrange the conditional.", "Shartli operatorni tartiblang.", "Расставьте условный оператор."],
          ["age = 20", "if age >= 18:", '    print("Adult")', "else:", '    print("Minor")'],
          ["The variable comes first, then if, then else.", "Avval o'zgaruvchi, keyin if, so'ng else.", "Сначала переменная, затем if, потом else."],
        ),
        mcq(
          ["What is Python's \"else if\" keyword?", "Python'da \"else if\" kalit so'zi qanday?", "Как в Python пишется \"else if\"?"],
          ["elif", "else if", "elseif", "elsif"],
          0,
          ["Python shortens it to elif.", "Python buni elif deb qisqartiradi.", "В Python это сокращено до elif."],
        ),
        bug(
          ["Tap the line with the syntax error.", "Sintaksis xatosi bor qatorni bosing.", "Нажмите на строку с синтаксической ошибкой."],
          ["x = 5", "if x > 3", '    print("big")'],
          1,
          ["The if line must end with a colon.", "if qatori ikki nuqta bilan tugashi kerak.", "Строка if должна заканчиваться двоеточием."],
        ),
      ],
    ),
    lesson(
      ["Loops", "Tsikllar", "Циклы"],
      [
        "for loops walk through a sequence; range(n) produces 0 … n-1. while loops repeat while a condition holds.",
        "for tsikllari ketma-ketlik bo'ylab yuradi; range(n) 0 … n-1 ni hosil qiladi. while tsikllari shart rost ekan takrorlaydi.",
        "Циклы for проходят по последовательности; range(n) создаёт 0 … n-1. Циклы while повторяются, пока условие истинно.",
      ],
      `for i in range(3):
    print(i)   # 0, 1, 2

count = 0
while count < 2:
    count += 1`,
      [
        mcq(
          ["What does range(3) produce?", "range(3) nimani hosil qiladi?", "Что создаёт range(3)?"],
          ["0, 1, 2", "1, 2, 3", "0, 1, 2, 3", "3"],
          0,
          ["range stops before the number you give.", "range berilgan sondan oldin to'xtaydi.", "range останавливается перед заданным числом."],
        ),
        fill(
          ["Loop five times.", "Besh marta takrorlang.", "Повторите пять раз."],
          "for i in ___(5):\n    print(i)",
          ["range"],
          ["range(5) gives 0 to 4.", "range(5) 0 dan 4 gacha beradi.", "range(5) даёт числа от 0 до 4."],
        ),
        write(
          ["Challenge: print every name in the list.", "Topshiriq: ro'yxatdagi har bir ismni chiqaring.", "Задание: выведите каждое имя из списка."],
          'names = ["Ann", "Bob"]\n',
          ["for\\s+\\w+\\s+in\\s+names\\s*:", "print\\s*\\("],
          "for name in names:\n    print(name)",
          ["Use for ... in names: and print inside.", "for ... in names: dan foydalanib, ichida print qiling.", "Используйте for ... in names: и print внутри."],
        ),
      ],
    ),
    lesson(
      ["Functions", "Funksiyalar", "Функции"],
      [
        "Functions are defined with def. They accept parameters and send results back with return. The body is indented.",
        "Funksiyalar def bilan e'lon qilinadi. Ular parametr qabul qiladi va natijani return bilan qaytaradi. Tana indent bilan yoziladi.",
        "Функции объявляются через def. Они принимают параметры и возвращают результат через return. Тело функции пишется с отступом.",
      ],
      `def greet(name):
    return "Hi, " + name

print(greet("Ann"))`,
      [
        arrange(
          ["Arrange the function and its call.", "Funksiya va uning chaqiruvini tartiblang.", "Расставьте функцию и её вызов."],
          ["def greet(name):", '    return "Hi, " + name', 'print(greet("Ann"))'],
          ["Define first, call afterwards.", "Avval e'lon qiling, keyin chaqiring.", "Сначала определите, затем вызывайте."],
        ),
        fill(
          ["Which keyword defines a function?", "Funksiyani qaysi kalit so'z e'lon qiladi?", "Какое слово объявляет функцию?"],
          "___ square(n):\n    return n * n",
          ["def"],
          ["def starts a function definition.", "def funksiya e'lonini boshlaydi.", "def начинает определение функции."],
        ),
        write(
          ["Challenge: define double(n) that returns n times 2.", "Topshiriq: n ni 2 ga ko'paytiradigan double(n) funksiyasini yozing.", "Задание: определите double(n), возвращающую n, умноженное на 2."],
          "# your code\n",
          ["def\\s+double\\s*\\(\\s*n\\s*\\)\\s*:", "return\\s+(n\\s*\\*\\s*2|2\\s*\\*\\s*n|n\\s*\\+\\s*n)"],
          "def double(n):\n    return n * 2",
          ["Use def double(n): and return n * 2.", "def double(n): va return n * 2 ishlating.", "Используйте def double(n): и return n * 2."],
        ),
      ],
    ),
    lesson(
      ["Lists and Dictionaries", "Ro'yxatlar va lug'atlar", "Списки и словари"],
      [
        "Lists hold ordered items: [1, 2, 3]. Dictionaries map keys to values: {\"name\": \"Ada\"}. Use append() to grow a list and square brackets to read values.",
        "Ro'yxatlar tartiblangan elementlarni saqlaydi: [1, 2, 3]. Lug'atlar kalitlarni qiymatlarga bog'laydi: {\"name\": \"Ada\"}. Ro'yxatni kengaytirish uchun append(), qiymatlarni o'qish uchun kvadrat qavslardan foydalaning.",
        "Списки хранят упорядоченные элементы: [1, 2, 3]. Словари сопоставляют ключи значениям: {\"name\": \"Ada\"}. Добавляйте в список через append(), а значения читайте через квадратные скобки.",
      ],
      `fruits = ["apple", "banana"]
fruits.append("kiwi")

user = {"name": "Ada", "age": 36}
print(user["name"])  # Ada`,
      [
        mcq(
          ["Which creates a dictionary?", "Qaysi biri lug'at yaratadi?", "Что создаёт словарь?"],
          ['{"a": 1}', '["a", 1]', '("a": 1)', "<a=1>"],
          0,
          ["Dictionaries use curly braces with key: value pairs.", "Lug'atlar figurali qavs va kalit: qiymat juftliklaridan foydalanadi.", "Словари используют фигурные скобки и пары ключ: значение."],
        ),
        fill(
          ["Add an item to the list.", "Ro'yxatga element qo'shing.", "Добавьте элемент в список."],
          'fruits = ["apple"]\nfruits.___("kiwi")',
          ["append"],
          ["append adds to the end of a list.", "append ro'yxat oxiriga qo'shadi.", "append добавляет в конец списка."],
        ),
        tf(
          ["List indexes start at 0.", "Ro'yxat indekslari 0 dan boshlanadi.", "Индексы списка начинаются с 0."],
          true,
          ["fruits[0] is the first item.", "fruits[0] — birinchi element.", "fruits[0] — первый элемент."],
        ),
        write(
          ["Challenge: print the name stored in the user dictionary.", "Topshiriq: user lug'atidagi ismni chiqaring.", "Задание: выведите имя из словаря user."],
          'user = {"name": "Ada"}\n',
          ["print\\(\\s*user\\[\\s*[\"']name[\"']\\s*\\]\\s*\\)|print\\(\\s*user\\.get\\(\\s*[\"']name[\"']"],
          'print(user["name"])',
          ["Read the key with user[\"name\"].", "Kalitni user[\"name\"] bilan o'qing.", "Прочитайте ключ через user[\"name\"]."],
        ),
      ],
    ),
  ],
);
