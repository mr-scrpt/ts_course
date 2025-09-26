// type GetStringKeys<T> = {T: unknown}
// type GetStringKeys<T extends object> = keyof T extends string ? T : never
type GetStringKeys<T extends object> = keyof T & string

type R1 = GetStringKeys<{ 0: number, name: string, value: number }> // "name" | "value"
