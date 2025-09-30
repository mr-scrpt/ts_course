

// Для получения информации о функциях
type MyReturnType<T> = T extends (...args: any[]) => infer R ? R : never;
type RT = MyReturnType<() => string>; // string

// Для доставания значений из сложных типов
type UnwrapPromise<T> = T extends Promise<infer U> ? U : never;
type PromisedString = Promise<string>;
type Unwrapped = UnwrapPromise<PromisedString>; // string

// Для работы с таплами 
type FirstElement<T extends any[]> = T extends [infer U, ...any[]] ? U : never;
type MyTuple = [string, number, boolean];
type First = FirstElement<MyTuple>; // string

// Для работы со строковыми литералами (подробнее об этом будет в отдельном уроке)
type FirstLetter<T extends string> = T extends `${infer L}${string}` ? L : never;

type FirstLetterRes = FirstLetter<`assa`>; // 'a'
