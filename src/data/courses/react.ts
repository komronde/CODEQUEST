import { arrange, bug, course, fill, lesson, mcq, tf, write } from "../helpers";

export const reactCourse = course(
  "react",
  "#43d9ff",
  "#5b6cff",
  ["React", "React", "React"],
  [
    "Build interactive interfaces with components, JSX, props, state and lists.",
    "Komponentlar, JSX, props, state va ro'yxatlar yordamida interaktiv interfeyslar yarating.",
    "Создавайте интерактивные интерфейсы с помощью компонентов, JSX, props, состояния и списков.",
  ],
  [
    lesson(
      ["Components and JSX", "Komponentlar va JSX", "Компоненты и JSX"],
      [
        "A React component is a function that returns JSX — HTML-like syntax inside JavaScript. Component names start with a capital letter. Because class is reserved in JS, JSX uses className.",
        "React komponenti — JSX qaytaradigan funksiya; JSX — JavaScript ichidagi HTML'ga o'xshash sintaksis. Komponent nomlari bosh harf bilan boshlanadi. JS'da class band bo'lgani uchun JSX className ishlatadi.",
        "Компонент React — это функция, возвращающая JSX, то есть HTML-подобный синтаксис внутри JavaScript. Имена компонентов начинаются с заглавной буквы. Так как class зарезервирован в JS, в JSX используется className.",
      ],
      `function Hello() {
  return <h1 className="title">Hello, React!</h1>;
}`,
      [
        mcq(
          ["What does a component return?", "Komponent nimani qaytaradi?", "Что возвращает компонент?"],
          ["JSX", "SQL", "A database row", "A CSS file"],
          0,
          ["Components return JSX describing the UI.", "Komponentlar UI'ni tasvirlovchi JSX qaytaradi.", "Компоненты возвращают JSX, описывающий интерфейс."],
        ),
        tf(
          ["Component names must start with a capital letter.", "Komponent nomlari bosh harf bilan boshlanishi shart.", "Имена компонентов должны начинаться с заглавной буквы."],
          true,
          ["Lowercase tags are treated as HTML elements.", "Kichik harfli teglar HTML elementi deb qabul qilinadi.", "Теги со строчной буквы воспринимаются как HTML-элементы."],
        ),
        bug(
          ["Tap the line that is not valid JSX.", "Yaroqli JSX bo'lmagan qatorni bosing.", "Нажмите на строку, неверную для JSX."],
          ["function App() {", '  return <div class="box">Hi</div>;', "}"],
          1,
          ["JSX uses className instead of class.", "JSX class o'rniga className ishlatadi.", "В JSX вместо class используется className."],
        ),
      ],
    ),
    lesson(
      ["Props", "Props", "Props"],
      [
        "Props pass data from a parent component to a child, like HTML attributes. Inside the child, read them from the props object or destructure them.",
        "Props ma'lumotni ota komponentdan bolaga HTML atributlari kabi uzatadi. Bola ichida ularni props obyektidan o'qing yoki destrukturalang.",
        "Props передают данные от родителя к дочернему компоненту, как атрибуты HTML. Внутри дочернего компонента их читают из объекта props или деструктурируют.",
      ],
      `function Greeting({ name }) {
  return <p>Hi, {name}!</p>;
}

<Greeting name="Ada" />`,
      [
        mcq(
          ["How does a parent send data to a child?", "Ota komponent bolaga ma'lumotni qanday yuboradi?", "Как родитель передаёт данные дочернему компоненту?"],
          ["Props", "Hooks", "Refs", "Return values"],
          0,
          ["Props are the inputs of a component.", "Props — komponentning kirishlari.", "Props — входные данные компонента."],
        ),
        fill(
          ["Pass the name prop.", "name propini uzating.", "Передайте проп name."],
          '<Greeting ___="Ada" />',
          ["name"],
          ["The prop name matches what the child destructures.", "Prop nomi bola destrukturalayotgan nomga mos.", "Имя пропа совпадает с тем, что деструктурирует дочерний компонент."],
        ),
        write(
          ["Challenge: return an <h2> that shows the text prop.", "Topshiriq: text propini ko'rsatuvchi <h2> qaytaring.", "Задание: верните <h2>, показывающий проп text."],
          "function Title({ text }) {\n  \n}",
          ["return\\s*\\(?\\s*<h2[^>]*>\\s*\\{\\s*text\\s*\\}\\s*</h2>"],
          "function Title({ text }) {\n  return <h2>{text}</h2>;\n}",
          ["Return <h2>{text}</h2>.", "<h2>{text}</h2> ni qaytaring.", "Верните <h2>{text}</h2>."],
        ),
      ],
    ),
    lesson(
      ["State with useState", "useState bilan state", "Состояние и useState"],
      [
        "State is data that changes over time. useState returns the current value and a setter. Never mutate state directly — call the setter so React re-renders.",
        "State — vaqt o'tishi bilan o'zgaradigan ma'lumot. useState joriy qiymat va setter qaytaradi. State'ni to'g'ridan-to'g'ri o'zgartirmang — React qayta chizishi uchun setter'ni chaqiring.",
        "Состояние — это данные, которые меняются со временем. useState возвращает текущее значение и функцию-сеттер. Не изменяйте состояние напрямую — вызывайте сеттер, чтобы React перерисовал компонент.",
      ],
      `const [count, setCount] = useState(0);

return (
  <button onClick={() => setCount(count + 1)}>
    Clicked {count} times
  </button>
);`,
      [
        mcq(
          ["Which hook adds state to a component?", "Qaysi hook komponentga state qo'shadi?", "Какой хук добавляет состояние компоненту?"],
          ["useState", "useData", "useVar", "setState"],
          0,
          ["useState is the basic state hook.", "useState — asosiy state hook'i.", "useState — базовый хук состояния."],
        ),
        arrange(
          ["Arrange the counter.", "Hisoblagichni tartiblang.", "Расставьте счётчик."],
          ["const [count, setCount] = useState(0);", "return (", "  <button onClick={() => setCount(count + 1)}>", "    {count}", "  </button>", ");"],
          ["Declare the state, then return JSX that uses it.", "State'ni e'lon qiling, so'ng uni ishlatuvchi JSX qaytaring.", "Объявите состояние, затем верните JSX, который его использует."],
        ),
        tf(
          ["It is fine to write count++ to update state.", "State'ni yangilash uchun count++ yozish mumkin.", "Для обновления состояния можно писать count++."],
          false,
          ["Always use setCount so React knows to re-render.", "Doim setCount ishlating, shunda React qayta chizishni biladi.", "Всегда используйте setCount, чтобы React знал о перерисовке."],
        ),
      ],
    ),
    lesson(
      ["Lists and Events", "Ro'yxatlar va hodisalar", "Списки и события"],
      [
        "Render lists with map() and give each item a unique key so React can track it. Handle user actions with props like onClick.",
        "Ro'yxatlarni map() bilan chizing va React kuzata olishi uchun har bir elementga noyob key bering. Foydalanuvchi harakatlarini onClick kabi proplar bilan boshqaring.",
        "Выводите списки через map() и задавайте каждому элементу уникальный key, чтобы React мог его отслеживать. Действия пользователя обрабатывайте пропами вроде onClick.",
      ],
      `<ul>
  {items.map((item) => (
    <li key={item.id}>{item.name}</li>
  ))}
</ul>`,
      [
        mcq(
          ["Which prop helps React identify list items?", "Qaysi prop React'ga ro'yxat elementlarini aniqlashda yordam beradi?", "Какой проп помогает React идентифицировать элементы списка?"],
          ["key", "id", "index", "ref"],
          0,
          ["key must be stable and unique among siblings.", "key barqaror va qo'shnilar orasida noyob bo'lishi kerak.", "key должен быть стабильным и уникальным среди соседей."],
        ),
        fill(
          ["Attach a click handler.", "Bosish ishlovchisini biriktiring.", "Подключите обработчик клика."],
          "<button ___={handleClick}>Save</button>",
          ["onClick"],
          ["React events use camelCase: onClick.", "React hodisalari camelCase: onClick.", "События React пишутся в camelCase: onClick."],
        ),
        bug(
          ["Tap the line that is missing something important.", "Muhim narsa yetishmayotgan qatorni bosing.", "Нажмите на строку, где не хватает важного."],
          ["{todos.map((t) => (", "  <li>{t.text}</li>", "))}"],
          1,
          ["Each <li> needs a unique key prop.", "Har bir <li> ga noyob key prop kerak.", "Каждому <li> нужен уникальный проп key."],
        ),
      ],
    ),
  ],
);
