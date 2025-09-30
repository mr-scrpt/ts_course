// mapped types для создания объекта

type KeysUnion = 'id' | 'name' | 'value'

// Создаётся объект со всеми ключами которые есть в union
type Obj = {
  [K in KeysUnion]: number
}

type ObjGeneric<K extends PropertyKey, V> = {
  [Key in K]: V
}

type ObjGeneric2<K, V> = {
  [Key in K & PropertyKey]: V
}

type ObjGeneric3<K, V> = {
  [Key in K extends PropertyKey ? K : never]: V
}



// Во время создания объекта, значение K после : будет равно значению ключа 
type ObjKeys = {
  [K in KeysUnion]: K
}

// Таким образом мы можем динамически создавать объекты
type Obj2 = {
  [K in KeysUnion]: K extends 'id' ? string : number
}

// Хотя объект можно создать на основе любого юниона строк, 
// Чаще всего этот механизм используют с keyof другого объекта

type User = {
  id: number,
  name: string,
  value: string,
}

type UserMethods = {
  [K in keyof User]: () => User[K]
}

// Иногда нужно переименовать ключи 
// Тогда можно использовать оператор as
type Getter<T extends string> = `get${Capitalize<T>}`
type UserMethods2 = {
  // as не влияет на K после : чаще всего это удобное поведение
  [K in keyof User as Getter<K>]: () => User[K]
}

// Если нужно сделать переименование и до и после : то делаем переименование до in


type UserMethods3 = {
  [K in Getter<keyof User>]: K
}


// В место конкретного объекта может быть любой дженерик

type ObjectGetters<T> = {
  // Так как T это любой тип, то K это string | number | symbol
  // Мы можем профильтровать union с поммощью intersection
  [K in keyof T as Getter<K & string>]: () => T[K]
}
type UserMethods4 = ObjectGetters<User>


// С помощью оператора as можно отфильтровывать некоторые ключи.
// Для этого нужно вернуть never для этого ключа

type RemoveKey<T, R> = {
  // Так как T это любой тип, то K это string | number | symbol
  // Мы можем профильтровать union с поммощью intersection
  [K in keyof T as K extends R ? never : K]: T[K]
}

type UserWishoutId = RemoveKey<User, 'id'>

// Важное исключение. 
// Если mapped types вызывается с массивами и tuple, получается не объект а tuple

type ParseStringTuple<T extends unknown[]> = {
  [K in keyof T]: T[K] extends `${infer V extends number}` ? V : never
}

type Tuple = ParseStringTuple<['1', '2', '3']>

// Так же с помощью mapped types можно добавлять и убирать readonly и опциональность
type ReadonlyUser = {
  readonly [K in keyof User]: User[K];
};

type NotReadonlyUser = {
  -readonly [K in keyof ReadonlyUser]: ReadonlyUser[K]
}

type OptionalUser = {
  [K in keyof User]?: User[K]
}

type RequiredUser = {
  [K in keyof OptionalUser]-?: OptionalUser[K]
}

