// ************************* задание 1
// Отдельный alias type
// == v1
type FilterNull<T> = T extends null | undefined ? never : T;

type NotNull<T> = {
  [K in keyof T]: FilterNull<T[K]>
}

type Res = NotNull<{ value: string | null, arg: string }> // { value: string, arg: string }

// == v2 неправильно
type NotNull1<T> = {
  [K in keyof T]: T[K] extends null ? never : T[K]
}

// Так фильтрация будет происходить неправильно
type Res1 = NotNull1<{ value: string | null, arg: string }> // { value: string | null, arg: string }

// == v3 правильно инлайново
type NotNull2<T> = {
  [K in keyof T]: T[K] extends infer U ? U extends null | undefined ? never : U : never
}

type Res2 = NotNull2<{ value: string | null, arg: string }> // { value: string | null, arg: string }



// ************************* задание 2

type RemoveByValue<T, R> = {
  [K in keyof T as T[K] extends R ? never : K]: T[K]
}

type Res4 = RemoveByValue<{ value: string | null, arg: number }, number> // { value: string | null }

// задание 3

// type SafeMerge<T, S> = {
//   [K in keyof T]: T[K] & keyof S
// }
type SafeMerge<T, S> = S & Omit<T, keyof S>

// Если есть общие поля берётся последний
type Res5 = SafeMerge<{ value: string, common: string }, { value2: number, common: number }> // { value: string, value:2 number, common: number }

const t = {} as Res5
t.common

type SafeMerge2<T, V> = {
  [K in keyof (T & V)]: K extends keyof V ? V[K] : T[K & keyof T]
}
