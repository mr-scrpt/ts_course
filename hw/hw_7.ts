type MyExclude<T, K> = T extends K ? never : T

type Result = MyExclude<'a' | 'b' | 'c', 'a'> // 'b' | 'c'

// задание

type Defined<T> = T extends number ? T : never

type Result2 = Defined<number | undefined | null> // number
