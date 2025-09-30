// задание 1
// type DeepRequired<T> = T
// type DeepRequired<T, O = {}> = {
//   [K in keyof T | keyof O]:  T[K & keyof T]
// }
// type DeepRequired<T, O = {}> = {
//     [K in keyof T | keyof O]: infer I extends keyof T ? DeepRequired<I> : T
// }
// type DeepRequired<T, O = {}> = {
//   [K in keyof T | keyof O]: T[K & keyof T] extends infer U ? DeepRequired<U> : T[K & keyof T]
// }
// type DeepRequired<T, O = {}> = {
//   [K in keyof T | keyof O]: T[K & keyof T] extends object ? DeepRequired<T[K & keyof T], {}> : T[K & keyof T]
// }
// type DeepRequired<T, O = {}> = {
//   [K in keyof T | keyof O]: T[K & keyof T] extends object
//   ? DeepRequired<T[K & keyof T], {}> // ← передаём новый пустой объект
//   : T[K & keyof T]
// }
// type DeepRequired<T, O = {}> = {
//   [K in keyof T | keyof O]: Exclude<T[K & keyof T], undefined> extends object
//   ? DeepRequired<Exclude<T[K & keyof T], undefined>, {}>
//   : T[K & keyof T]
// }
// type DeepRequired<T, O = {}> = {
//   [K in keyof T | keyof O]: DeepRequired<Exclude<T[K & keyof T], undefined>, {}>
// }
// type DeepRequired<T, O = {}> = {
//   [K in keyof T | keyof O]: DeepRequired<T[K & keyof T], {}>
// }
// type DeepRequired<T, O = {}> = {
//   [K in keyof T | keyof O]: T[K & keyof T] extends undefined ? T[K & keyof T] : DeepRequired<T[K & keyof T]>
// }
//

type DeepRequired<T, O = {}> = {
  [K in keyof T | keyof O]: T[K & keyof T] extends infer U ? U extends undefined ? never : DeepRequired<T[K & keyof T]> : never
}

// Не работает, потому что T[K & keyof T]  не undefined а "undefined | ....",
// по этому работает только с infer так как он останавливает дистрибуцию на 
// своем уровне
type DeepRequired1<T, O = {}> = {
  [K in keyof T | keyof O]: T[K & keyof T] extends undefined
  ? never
  : DeepRequired<T[K & keyof T], {}>
}

type DeepRequired2<T, O = {}> = {
  [K in keyof T | keyof O]: T[K & keyof T] extends infer U
  ? U extends undefined
  ? never
  : DeepRequired<U, {}>
  : never
}

type DeepRequired3<T, O = {}> = {
  [K in keyof T | keyof O]: DeepRequired<Exclude<T[K & keyof T], undefined>>
}

type DeepRequired4<T, O = {}> = {
  [K in keyof T | keyof O]: DeepRequired<NonNullable<T[K & keyof T]>>
}



type Res1 = DeepRequired1<{
  value?: {
    title: "",
    obj?: {
      name: string
    }
  }
}>

const obj: Res1 = {
  value: {
    // title: "",
    obj: {
      name: ""

    }
  }
}

// задание 2

// type Flatten<T> = {
//   [K in keyof T]: T[K] extends Array<unknown> ? Flatten<T[K]> : T[K]
// }

// type Flatten<T> = {
//   [K in keyof T]: T[K] extends Array<unknown> ? Flatten<T[K]> : T[K]
// }
// type Flatten<T> = {
//   [K in keyof T]: T[K] extends infer U
//   ? U extends Array<unknown>
//   ? Flatten<[T[K], ...U]>
//   : T[K]
//   : T[K]
// }
// type Flatten<T, Tuple extends unknown[] = []> = {
//   [K in keyof T]: T[K] extends Array<unknown>
//   ? Flatten<Tuple, [...Tuple, T[K]]>
//   : Flatten<T[K]>
// }

type Flatten<Tuple extends unknown[] = []> = Tuple extends [infer First, ...infer Tail]
  ? First extends Array<unknown>
  ? Flatten<[...First, ...Tail]>
  : [First, ...Flatten<Tail>]
  : Tuple



type Res3 = Flatten<[1, 2, [1, 2, [3]]]>// [1,2,1,2,3]

// задание 3

// перепешите Reverse на хвостовую рекурсию
type Reverse<Tuple extends unknown[], Acc extends unknown[] = []> = Tuple extends [infer First, ...infer Tail]
  ? Reverse<Tail, [First, ...Acc]>
  : Acc

type Ten = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
// глубина рекурсии больше 50
type Res2 = Reverse<[...Ten, ...Ten, ...Ten, ...Ten, ...Ten, 1]>
//
// задание 4

// type SafeMergeTuple<T, O = {}> = T & O
// type SafeMergeTuple<Tuple extends ReadonlyArray<Record<string, unknown>>, Acc = {}> = Tuple extends [infer First, ...infer Tail]
//   ? SafeMergeTuple<Tail, Omit<Acc, keyof First> & First>
//   : Acc
type SafeMergeTuple<
  Tuple extends ReadonlyArray<Record<string, unknown>>, // Гарантируем, что в кортеже только объекты
  Acc = {}
> = Tuple extends readonly [infer First, ...infer Tail extends ReadonlyArray<Record<string, unknown>>]
  ? SafeMergeTuple<Tail, Omit<Acc, keyof First> & First>
  : Acc;




type Res4 = SafeMergeTuple<
  [{ value: string }, { name: string }, { age: number; name: number }]
>; // { value: string, name: number , age: number}

const res4: Res4 = {
  value: "ololo",
  name: 5,
  age: 7
} 
