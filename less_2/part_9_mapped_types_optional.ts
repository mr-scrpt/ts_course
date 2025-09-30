// mapped types and опциональность

type Obj = {
  a: number;
  b?: number;
};

type JustMap<T> = {
  [K in keyof T]: T[K];
};

// 1. mapped types сохраняет опциональность
type R1 = JustMap<Obj>;
//   ^?

// 2. Опциональность определяется на основании keyof T

type Mp<T, V> = {
  [K in keyof T]: V[K & keyof V];
};

type R2 = Mp<{ name?: string }, { name: number }>;
//   ^?

// 3. опциональность и union с undefined
// пришпендюривается всерху после обработки значения

type Mp2<T> = {
  [K in keyof T]: Exclude<T[K], undefined>;
};

type R3 = Mp2<{ name?: string }>;
//   ^?

// 4. Мерджинг объектов с сохранением опциональности

type R41 = Simplify<{ name: string } & { name?: string }>;
//   ^?
type R42 = Simplify<{ name?: string } & { name?: string }>;
//   ^?
type R43 = Simplify<{ name: string } & { name: number }>;
//   ^?

type Mp3<T, V> = {
  [K in keyof (T & V)]: K extends keyof V ? V[K] : T[K & keyof T];
};

type R44 = Mp3<{ name?: string }, { name?: number }>;
//   ^?
type R45 = Mp3<{ name?: string }, { name: number }>;
//   ^?

// 5. Сохранение опциональности не работает, если мы берём union ключей
// union с undefined получается из-за обращение к опциональному полю

type Mp4<T, V> = {
  [K in keyof T | keyof V]: K extends keyof V ? V[K] : T[K & keyof T];
};

type R51 = Mp4<{ name?: string }, { value?: number }>;
//   ^?

// 6. Мы можем этим воспользоваться,
// что бы убрать опциональность без -?. В редких кейсах это нужно

// В чём проблема -?. Оно удаляет | undefined даже если этого не нужно
type Mp51<T> = {
  [K in keyof T]-?: T[K] | undefined;
};

type R61 = Mp51<{ name?: string | undefined; value: string | undefined }>;
//   ^?

// Попробуем воспользоваться хаком из прошлого
// не работает так как ts схлопывает union
type Mp52<T> = {
  [K in keyof T | keyof {}]: T[K & keyof T];
};

type R62 = Mp52<{ name?: string }>;
//   ^?

// Вот так работает
type Mp53<T, O = {}> = {
  [K in keyof T | keyof O]: T[K & keyof T];
};

type R63 = Mp53<{ name?: string, value: string | undefined }>;
//   ^?

type Simplify<T> = { [K in keyof T]: T[K] } & {};



