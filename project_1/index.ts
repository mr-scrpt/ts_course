type TodoItem = {
  id: number;
  text: string;
  completed: boolean;
};
const fn = (a: string, b: string) => {
  const g = 1;
  return a + b;
};
type TodoList = [
  {
    id: 1;
    text: "Create something";
    completed: false;
  },
  {
    id: 2;
    text: "Other task";
    completed: true;
  },
  {
    id: 3;
    text: "Some other task";
    completed: false;
  },
];

// type AddItem<TodoList, Id, Text> = ""
// type RemoveItem<TodoList, Id> = ""
// type UpdateText<TodoList, Id, Text> = ""
// type ToggleCompleted<TodoLIst, Id> = ""
// type FindById<TodoList, Id> = ""
// type FilterBy<TodoList, Pattern> = ""
// Add =========================
type AddItem<
  TodoList extends ReadonlyArray<TodoItem>,
  Id extends number,
  Text extends string,
> = Id extends TodoList[number]["id"]
  ? { error: `ID '${Id}' already exists` }
  : [...TodoList, { id: Id; text: Text; completed: false }];
// Создай тестовый тип
type TestResult = AddItem<TodoList, 1, "New task">;

// Попробуй присвоить его к ожидаемому типу

type Test1 = AddItem<[], 1, "First task">;
type Test2 = AddItem<TodoList, 1, "First task">;
// @ts-expect-error
type Test3 = AddItem<TodoList, "string-id", "Task">;
// @ts-expect-error
type Test4 = AddItem<TodoList, 2, 123>; // number вместо строки?

// Remove =========================
type RemoveItem<
  TodoList extends ReadonlyArray<TodoItem>,
  Id extends number,
> = TodoList extends [
  infer Head extends TodoItem,
  ...infer Tail extends ReadonlyArray<TodoItem>,
]
  ? Id extends Head["id"]
    ? RemoveItem<Tail, Id>
    : [Head, ...RemoveItem<Tail, Id>]
  : [];

type TestRemove = RemoveItem<TodoList, 2>;
// Ожидаемый результат: [{id: 1, ...}, {id: 3, ...}]

// Этот вызов не должен изменить список, так как ID 99 не существует
type TestRemoveNonExistent = RemoveItem<TodoList, 99>;
// Ожидаемый результат: TodoList

// Updated =========================
type UpdateText<TodoList, Id, Text> = TodoList extends [
  infer Head extends TodoItem,
  ...infer Tail extends ReadonlyArray<TodoItem>,
]
  ? Id extends Head["id"]
    ? [
        { id: Head["id"]; completed: Head["completed"]; text: Text },
        ...UpdateText<Tail, Id, Text>,
      ]
    : [Head, ...UpdateText<Tail, Id, Text>]
  : [];

// Должен обновить текст у элемента с id: 2
type TestUpdate = UpdateText<TodoList, 2, "Updated task text">;
/* Ожидаемый результат:
[
  { id: 1, text: "Create something", completed: false },
  { id: 2, text: "Updated task text", completed: true }, // <-- Изменено
  { id: 3, text: "Some other task", completed: false }
]
*/

// Не должен ничего менять, так как id: 5 не существует
type TestUpdateNonExistent = UpdateText<TodoList, 5, "Some text">;
// Ожидаемый результат:  TodoList
// ================== Toggle
type ToggleCompleted<TodoList, Id> = TodoList extends [
  infer Head extends TodoItem,
  ...infer Tail extends ReadonlyArray<TodoItem>,
]
  ? Id extends Head["id"]
    ? [
        {
          id: Head["id"];
          text: Head["text"];
          completed: Head["completed"] extends true ? false : true;
        },
        ToggleCompleted<Tail, Id>,
      ]
    : [Head, ...ToggleCompleted<Tail, Id>]
  : [];

type TestToggle1 = ToggleCompleted<TodoList, 2>;

// Переключаем элемент с id: 1 (был false, станет true)
type TestToggle2 = ToggleCompleted<TodoList, 1>;

// =============== Find by Id
type FindById<TodoList, Id> = TodoList extends [
  infer Head extends TodoItem,
  ...infer Tail,
]
  ? Id extends Head["id"]
    ? Head
    : FindById<Tail, Id>
  : undefined;

type TestFind1 = FindById<TodoList, 2>;
// Ожидаемый результат: { id: 2; text: "Other task"; completed: true; }

// Должен вернуть undefined, так как id: 4 не существует
type TestFind2 = FindById<TodoList, 4>;
// Ожидаемый результат: undefined

// =========== FilterBy
type FilterBy<TodoList, Pattern extends string> = TodoList extends [
  infer Head extends TodoItem,
  ...infer Tail extends ReadonlyArray<TodoItem>,
]
  ? Head["text"] extends `${string}${Pattern}${string}`
    ? [Head, ...FilterBy<Tail, Pattern>]
    : FilterBy<Tail, Pattern>
  : [];

// Должен найти задачу со словом "Create"
type TestFilter2 = FilterBy<TodoList, "Create">;
// Ожидаемый результат: [{ id: 1, text: "Create something", completed: false }]

// Должен вернуть пустой массив
type TestFilter3 = FilterBy<TodoList, "non-existent">;
// Ожидаемый результат: []
