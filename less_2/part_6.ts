type IsString<T> = T extends string ? true : false;

type True = IsString<string>;
type False = IsString<number>;
// с never отказывается работать!!
type Neverrr = IsString<never>;
// c any получается странное
type Boll = IsString<any>;

type IsNumber<T> = T extends number ? true : false;
type IsAssignable<T, V> = T extends V ? true : false;

type False2 = IsAssignable<string, "literal">;

// С помощью условных типов мы можем тварить настоящую грязь)

function value<T>(arg: T): T extends string ? number : string {
  return {} as any;
}

const r1 = value("str");
const r2 = value(1);

// А ещё условия мы можем использовать для ограничения типа!

// Обход ограничения index type
type GetValue<T, K> = K extends keyof T
  ? T[K]
  : `Error: ${K extends string ? K : "key"} is not in object`;
type R1 = GetValue<{ name: string }, "asdfasd">;

// Обход ограничения ...
type Push<T, K> = T extends readonly unknown[] ? [...T, K] : T;


// Обход extends других generic типов
type MyParams<T> = T extends (...args: never[]) => unknown
  ? Parameters<T>
  : never;

// С помощью условных выражений мы можем создать булевую алгебру в типах &#x1f609;

type Or<T1, T2> = T1 extends true ? true : T2 extends true ? true : false;
type And<T1, T2> = T1 extends true ? (T2 extends true ? true : false) : false;

type Or3<T1, T2, T3> = Or<T1, Or<T2, T3>>;
type And3<T1, T2, T3> = And<T1, And<T2, T3>>;

type Not<T1> = T1 extends true ? false : true;

type CheckKeyStringNotId<T> = And<
  IsString<T>,
  Not<
    Or3<IsAssignable<T, "id">, IsAssignable<T, "slug">, IsAssignable<T, "uuid">>
  >
>;

type R = CheckKeyStringNotId<number>;
type R2 = CheckKeyStringNotId<"some-string">;
type R3 = CheckKeyStringNotId<"id">;
type R4 = CheckKeyStringNotId<"slug">;
type R5 = CheckKeyStringNotId<"uuid">;

// Это бывает полезно что бы не делать тернарники вложенные на бесконечность
type WrapNotIdString<T> =
  And<
    IsString<T>,
    Not<
      Or3<
        IsAssignable<T, "id">,
        IsAssignable<T, "slug">,
        IsAssignable<T, "uuid">
      >
    >
  > extends true
  ? `{${T & string}}`
  : T;

type R6 = WrapNotIdString<"p">;

