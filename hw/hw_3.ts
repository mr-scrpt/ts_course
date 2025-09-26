type GetIdType<T extends {
  id: unknown,
  [key: string]: unknown
}> = T['id']


type R1 = GetIdType<{ id: string, name: string }> // string
type R2 = GetIdType<{ id: number }> // number

// @ts-expect-error
type R3 = GetIdType<{}>


// type ExtractValueFromKey<T extends { key: unknown, [key: string]: unknown }, K = T[K & keyof T]> = T
// type ExtractValueFromKey<T extends { key: unknown, [key: string]: unknown }> = T[T['key']]
type ExtractValueFromKey<T extends { key: unknown, [key: string]: unknown }> = T[T['key'] & keyof T]

type R4 = ExtractValueFromKey<{ key: "value"; value: number }>; // number


type R5 = ExtractValueFromKey<{
  key: "value" | "name";
  value: number;
  name: string;
}>; // number | string

type R6 = ExtractValueFromKey<{ key: "value" }>; // never

// @ts-expect-error
type R7 = ExtractValueFromKey<{}>

