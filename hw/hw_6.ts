// Используйте условный оператор для преодоления ограничений на index accesss
type ExtractValueFromKey2<T extends { key: unknown, [key: string]: unknown }> = T[T['key'] extends keyof T ? T['key'] : never] extends never ? unknown : T['key'] extends keyof T ? T[T['key']] : unknown
type ExtractValueFromKey3<T> = T extends { key: keyof T } ? T[T["key"]] : unknown


type R1 = ExtractValueFromKey2<{ key: "value"; value: number }>; // number
type E1 = ExtractValueFromKey3<{ key: "value"; value: number }>; // number

type R2 = ExtractValueFromKey2<{
  key: "value" | "name";
  value: number;
  name: string;
}>; // number | string
type E2 = ExtractValueFromKey3<{
  key: "value" | "name";
  value: number;
  name: string;
}>; // number | string


type R3 = ExtractValueFromKey2<{ key: "value" }>; // unknown
type E3 = ExtractValueFromKey3<{ key: "value" }>; // unknown
type R4 = ExtractValueFromKey2<{}> // unknown

type R5 = ExtractValueFromKey3<{}> // unknown
