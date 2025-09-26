//  hw/hw_5.ts
type Getter<T extends string> = `on${Capitalize<Lowercase<T>>}`
type Getter2<T> = `on${Capitalize<Lowercase<T & string>>}`

type R = Getter<'create'> // 'onCreate'
type B = Getter<'CREATE'> // 'onCreate'
