
type Unshift<T extends readonly unknown[], K> = [K, ...T]

type R = Unshift<[number, string], boolean> // [boolean, number, string]
