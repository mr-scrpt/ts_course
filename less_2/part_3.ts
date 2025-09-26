// Получение типа поля объекта по ключу

type Obj = {
  id: number;
  title: string;
  name: {
    value: string;
  };
};

type Obj2 = {
  id: string
} | Obj

type NameObject = Obj["name"];
type Value = Obj["name"]["value"];
type TitleOrId = Obj["title" | "id"];
type UnionId = Obj2['id']

type KeysUnion = "title" | "id";
type TitleOrId2 = Obj[KeysUnion];

// Получение юниона всех значений объекта

type Values = Obj[keyof Obj];

const Role = {
  ADMIN: 'ADMIN',
  USER: 'USER'
} as const
type Role = typeof Role[keyof typeof Role]


// Получения типа значения дикта

type Dict = {
  [value: string]: number;
};

type DictValue = Dict[string];

// Получения типа значения тапла

type Tuple = [number, string, { value: string }];

type First = Tuple[0];
type TupleValue = Tuple[2]["value"];
type FirstOrSecond = Tuple[0 | 1];

// Получение юниона всех значений тапла
type TypleValues = Tuple[number];

// ===== !!!ВАЖНО!!! =====
// Получение длинны тапла

type TypleLenght = Tuple['length'] // 3

// Самый простой способ сделать математику &#x1f92f;
// ===== !!!ВАЖНО!!! =====


// Получения типа значения массива

type Arr = Array<number | string>;

type ArrayValue = Arr[number]; // или Arr[0]


// ===== !!!ВАЖНО!!! =====
// Typescript производит проверку на assignable 
// Мы не можем получить несуществующий ключ

// @ts-expect-error
type E = Obj['hey']

// Но есть исключение)

type Neverr = Obj[never]


// Часто вы будете всречаться с этим ограничением при работе с обобщёнными типами

// @ts-expect-error
type GetObjectValue<T, K> = T[K]

// Решения

// Ограничить тип K ключами T
type GetObjectValue2<T, K extends keyof T> = T[K]

type Res2 = GetObjectValue2<Obj, 'name'>

// Пересечь тип K с ключами T

type GetObjectValue3<T, K> = T[K & keyof T]

type Res3 = GetObjectValue3<Obj, 'name'>;

// В таком случае несуществующий ключ просто вернёт never
type Res4 = GetObjectValue3<Obj, 'ass'>;

