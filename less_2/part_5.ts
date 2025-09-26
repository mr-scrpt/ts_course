// Мы можем создавать не только конкретные литералы строк,
// Но ещё и строковые шаблоны
type Greeting = `Hello, ${string}`;

const greeting: Greeting = "Hello, World!"; // Valid
const greeting2: Greeting = "Hello, World!!!!"; // Valid

// Удобно использовать, что бы ограничивать строки определёнными паттернами

function absoluteUrl(str: `${`http` | 'https'}://${string}`) { }

absoluteUrl('https://hello-world')
absoluteUrl('http://hello-world')
// @ts-expect-error
absoluteUrl('wss://hello-world')

// В шаблон мы можем передавать не только `string` но и union литералов
type EventType = "click" | "hover" | "scroll";
type EventHandlerName = `on-${EventType}`;

// В результате получим union литералов
const onClick: EventHandlerName = "on-click"; // Valid
const onHover: EventHandlerName = "on-hover"; // Valid

// Если union будет несколько, то в результате будет union из всех вариантов
type Action = "create" | "update" | "delete";
type Resource = "user" | "post" | "comment";
type ApiEndpoint = `/api/${Action}/${Resource}`;

const createUserEndpoint: ApiEndpoint = "/api/create/user"; // Valid
const updatePostEndpoint: ApiEndpoint = "/api/update/post"; // Valid

// Так же typescript предоставляет несколько встроеных хелперов

type U = Uppercase<`Hello world`>
type C = Capitalize<`hello world`>
type L = Lowercase<`Hello World`>
type UC = Uncapitalize<`Hello World`>


// В сочетании с ними можено делать удобные преобразования
type EventType2 = "click" | "hover" | "scroll";
type EventHandlerName2 = `on${Capitalize<EventType2>}`;

// В результате получим union литералов
const onClick2: EventHandlerName2 = "onClick"; // Valid
const onHover2: EventHandlerName2 = "onHover"; // Valid


// Ограничение типа!
type G<T extends string> = `on${T}`
type G2<T> = `on${T & string}`
