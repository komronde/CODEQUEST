import type { L } from "@/types";

export interface PlaygroundTask {
  id: string;
  title: L;
  desc: L;
  html: string;
  css: string;
  js: string;
  /** Body of a function that runs INSIDE the sandboxed iframe and returns true when the task is solved. */
  test: string;
  level: 1 | 2 | 3;
}

export const PLAYGROUND_TASKS: PlaygroundTask[] = [
  {
    id: "hello-html",
    level: 1,
    title: ["Hello, CodeQuest", "Salom, CodeQuest", "Привет, CodeQuest"],
    desc: [
      "Add an <h1> heading and a <button> to the page.",
      "Sahifaga <h1> sarlavha va <button> tugmasini qo'shing.",
      "Добавьте на страницу заголовок <h1> и кнопку <button>.",
    ],
    html: "<!-- Add an h1 and a button below -->\n",
    css: "",
    js: "",
    test: "return !!document.querySelector('h1') && !!document.querySelector('button');",
  },
  {
    id: "style-card",
    level: 1,
    title: ["Style the card", "Kartani bezang", "Оформите карточку"],
    desc: [
      "Give .card a background color and rounded corners (at least 8px).",
      ".card ga fon rangi va yumaloq burchaklar (kamida 8px) bering.",
      "Задайте .card цвет фона и скруглённые углы (не менее 8px).",
    ],
    html: '<div class="card">I am a card</div>',
    css: "/* style .card here */\n",
    js: "",
    test: "var s = getComputedStyle(document.querySelector('.card')); return parseFloat(s.borderTopLeftRadius) >= 8 && s.backgroundColor !== 'rgba(0, 0, 0, 0)' && s.backgroundColor !== 'transparent';",
  },
  {
    id: "flex-center",
    level: 2,
    title: ["Center with Flexbox", "Flexbox bilan markazlash", "Центрирование с Flexbox"],
    desc: [
      "Make .row a flex container and center its children horizontally.",
      ".row ni flex konteyner qiling va bolalarini gorizontal markazlang.",
      "Сделайте .row flex-контейнером и выровняйте детей по центру по горизонтали.",
    ],
    html: '<div class="row">\n  <span>A</span>\n  <span>B</span>\n  <span>C</span>\n</div>',
    css: ".row {\n  /* your code */\n}\n\nspan {\n  padding: 12px 18px;\n  background: #7c5cff;\n  color: white;\n  margin: 4px;\n  border-radius: 8px;\n}",
    js: "",
    test: "var s = getComputedStyle(document.querySelector('.row')); return s.display === 'flex' && s.justifyContent === 'center';",
  },
  {
    id: "click-counter",
    level: 2,
    title: ["Click counter", "Bosish hisoblagichi", "Счётчик кликов"],
    desc: [
      "Make the button increase the number in #count each time it is clicked.",
      "Tugma bosilganda #count dagi son har safar oshsin.",
      "Сделайте так, чтобы кнопка увеличивала число в #count при каждом клике.",
    ],
    html: '<button id="btn">Click me</button>\n<p>Clicks: <span id="count">0</span></p>',
    css: "button { padding: 8px 16px; }",
    js: "// select #btn and #count, then add a click listener\n",
    test: "var b = document.getElementById('btn'), c = document.getElementById('count'); b.click(); b.click(); return c.textContent.trim() === '2';",
  },
  {
    id: "fizzbuzz",
    level: 3,
    title: ["FizzBuzz", "FizzBuzz", "FizzBuzz"],
    desc: [
      "Write fizzbuzz(n): return \"Fizz\" for multiples of 3, \"Buzz\" for 5, \"FizzBuzz\" for both, otherwise the number as a string.",
      "fizzbuzz(n) yozing: 3 ga karralilar uchun \"Fizz\", 5 uchun \"Buzz\", ikkalasi uchun \"FizzBuzz\", aks holda sonni satr sifatida qaytaring.",
      "Напишите fizzbuzz(n): \"Fizz\" для кратных 3, \"Buzz\" для кратных 5, \"FizzBuzz\" для обоих, иначе число в виде строки.",
    ],
    html: '<p>Open the console panel to see your output.</p>',
    css: "",
    js: "function fizzbuzz(n) {\n  // your code\n}\n\nconsole.log(fizzbuzz(15));\n",
    test: "return typeof fizzbuzz === 'function' && fizzbuzz(3) === 'Fizz' && fizzbuzz(5) === 'Buzz' && fizzbuzz(15) === 'FizzBuzz' && String(fizzbuzz(7)) === '7';",
  },
  {
    id: "todo-list",
    level: 3,
    title: ["Mini to-do list", "Mini vazifalar ro'yxati", "Мини-список дел"],
    desc: [
      "When #add is clicked, append the text from #task as a new <li> inside #list.",
      "#add bosilganda #task dagi matnni #list ichiga yangi <li> sifatida qo'shing.",
      "При клике на #add добавляйте текст из #task как новый <li> в #list.",
    ],
    html: '<input id="task" placeholder="New task">\n<button id="add">Add</button>\n<ul id="list"></ul>',
    css: "input, button { padding: 6px 10px; }",
    js: "// build the to-do logic here\n",
    test: "var i = document.getElementById('task'), a = document.getElementById('add'), l = document.getElementById('list'); i.value = 'Learn'; a.click(); i.value = 'Code'; a.click(); return l.querySelectorAll('li').length === 2 && l.textContent.indexOf('Learn') > -1;",
  },
];

export const getTask = (id: string) => PLAYGROUND_TASKS.find((t) => t.id === id);
