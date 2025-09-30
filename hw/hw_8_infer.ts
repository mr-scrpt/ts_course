type MyParameters<T> = T extends (...args: infer P) => void ? [...P] : never
type GreetReturnType = MyParameters<(name: string, value: number) => void>; // [string, number]

type MyParameters2<T> = T extends (...args: [infer P, infer U]) => void ? [P, U] : never
type GreetReturnType2 = MyParameters2<(name: string, value: number) => void>; // [string, number]

type Shift<T> = T extends [any, ...infer K] ? K : never
type Result = Shift<[3, 2, 1]> // [2, 1]

type Pop<T> = T extends [...infer K, any] ? K : never
type Result2 = Pop<[3, 2, 1]> // [3, 2]




