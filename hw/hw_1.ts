

// ==================
// ЗАДАНИЕ! Напишите тип которому assignable ЛЮБОЙ массив (не забудьте про as const)
// Без использования any
// Тест кейсы придумайте, сами)
const readonlyArray = [1, 2, 3] as const;
type AllArrayType = ReadonlyArray<unknown>
function getAnyArray(param: AllArrayType) { }

getAnyArray([1, 2, 3])
getAnyArray(["ddd", 2, 3])
getAnyArray([null, 2, 3])
getAnyArray([1, 2, 3] as const)
getAnyArray(["1", "2", "3"] as const)
getAnyArray(readonlyArray)
// ==================
// ЗАДАНИЕ! Напишите тип которому assignable любой массив длинной больше 1
// Без использования any


type ArrayLenMoreOne = [unknown, unknown, ...ReadonlyArray<unknown>]
function getNotEmptyArray(param: ArrayLenMoreOne) { }

// @ts-expect-error
getNotEmptyArray([]);
// @ts-expect-error
getNotEmptyArray([1]);
getNotEmptyArray([1, 2]);


// ==================
// ЗАДАНИЕ! Типизируйте функцию так, что бы она могла принять как можно больше безопасных значений
// Без использования any
// Нужны ли тут дженерики?

type StructureTypeSimple = {
  // arr: readonly [unknown, { obj: { name: string, value: string } }, ...unknown[]]
  arr: readonly [unknown, { obj: { name: string, value: string, [key: string]: unknown } }, ...unknown[]]
  [key: string]: unknown
}

type StructureTypeGenericConstrain = { obj: { name: string }, [key: string]: unknown }

type StructureTypeAlt<T extends StructureTypeGenericConstrain> = {
  arr: readonly [unknown, T, ...unknown[]],
  [key: string]: unknown
}

function structureType(value: StructureTypeSimple): string {
  return value.arr[1].obj.name;
}

// Использование с дженериком:
function structureTypeAlt<T extends StructureTypeGenericConstrain>(
  value: StructureTypeAlt<T>
): string {
  return value.arr[1].obj.name;
}

const structureType1 = {
  arr: [
    1,
    {
      obj: {
        name: "asd",
        value: "",
        t: ""
      },
    },
    {
      hello: 1,
    },
  ],
  value: 1,
} as const;

structureType(structureType1);
structureType({
  arr: [
    1,
    {
      obj: {
        name: "asd",
        value: "",
        t: ""
      },
    },
    {
      hello: 1,
    },
  ],
  value: 1,
});
structureTypeAlt(structureType1)

// ==================
// ЗАДАНИЕ! Обновите тип прошлой функции, так что бы можно было добавить несуществующие параметры
// при создании объекта в момент вызова
// см index signature

function structureType2(value: StructureTypeSimple): string {
  return value.arr[1].obj.name;
}

structureType2({
  arr: [
    1,
    {
      obj: {
        name: "asd",
        value: "",
        t: ""
      },
    },
    {
      hello: 1,
    },
  ],
  value: 1,
  olol: "ididid"
});

// ==================
// ЗАДАНИЕ! Напишите такой тип при пересечении с которым всегда будет получаться изначальный тип?
type TestIntersection_condition<T> = T & "write-type-heare"

type TestIntersection<T> = T & T;
type TestIntersection1<T> = T & T extends T ? T : never;
type TestIntersection1_1<T> = T & unknown
type TestIntersection1_2<T> = T & T

type ResTestIntersection = TestIntersection<string>; // res should be string
type ResTestIntersection1 = TestIntersection1<string>; // res should be string
type ResTestIntersection1_1 = TestIntersection1_1<number>; // res should be string
type ResTestIntersection1_2 = TestIntersection1_2<number>; // res should be string

type ResTestIntersection1_11 = TestIntersection1<any>; // res should be string
type ResTestIntersection1_12 = TestIntersection1_1<any>; // res should be string
type ResTestIntersection1_23 = TestIntersection1_2<any>; // res should be string

// ==================
// ЗАДАНИЕ! При пересечении с каким типом будет всегда never?

type TestIntersection2_condition<T> = T & "write-type-heare";
type TestIntersection2<T> = T & T extends T ? never : T;
type TestIntersection2_1<T> = T & never
type ResTestIntersection2 = TestIntersection2<string>; // res should be never
type ResTestIntersection2_1 = TestIntersection2<string>; // res should be never
type ResTestIntersection2_2 = TestIntersection2_1<string>; // res should be never
type ResTestIntersection2_3 = TestIntersection2<any>; // res should be never
type ResTestIntersection2_4 = TestIntersection2_1<any>; // res should be never

// ==================
// ЗАДАНИЕ! При объединении с каким типом всегда будет получаться тот же самый тип?

type TestUnion_conditon<T> = T | "write-type-heare";
type TestUnion<T> = T | never;
type ResTestUnion = TestUnion<number>; // res should be number
type ResTestUnion1_1 = TestUnion<unknown>; // res should be number
type ResTestUnion1_2 = TestUnion<"listeral">; // res should be number

// ==================
// ЗАДАНИЕ! При объединении с каким типом всегда будет получаться unknown
type TestUnion2_conditon<T> = T | "write-type-heare";

type TestUnion2<T> = T | unknown
type ResTestUnion2 = TestUnion2<string>; // res should be unknown
type ResTestUnion2_1 = TestUnion2<any>; // res should be unknown
type ResTestUnion2_2 = TestUnion2<"listeral">; // res should be unknown

// ==================
// ЗАДАНИЕ! Как с помощью пересечения можно отфильтровать все числа

type FilterIntersection_condition<T> = T & "write-type-heare";
type FilterIntersection<T> = T & T extends string ? T : never;
type ResFilterIntersection = FilterIntersection<1 | 2 | "value" | "b">; // res should be 'value' | 'b'

// ==================
// ЗАДАНИЕ! Как с помощью пересечения можно достать событие по типу из юниона

type FindEventByIntersection_condition<T, K> = T & "write-type-heare";
type FindEventByIntersection<T, K> = T & T extends T & Event2 ? T : never
type FindEventByIntersection_2<T, K> = T & { type: K }

type Event1 = { type: "user-created"; data: { name: string } };
type Event2 = { type: "user-deleted"; data: { id: number } };

type ResFindEventByIntersection = FindEventByIntersection_2<
  Event1 | Event2,
  "user-deleted"
>;

const ev1: Event1 = { type: "user-created", data: { name: "John" } }
const ev2: Event2 = { type: "user-deleted", data: { id: 5 } }
const ev3: ResFindEventByIntersection = ev2
// ==================
// type paramsCountType = [{ isOne: boolean }, ...Array<unknown>]
// type paramsCountType = [arg[0] extends "isOne" ? {isOne: boolean}, ...Array<unknown> : never]
// ЗАДАНИЕ! Напишите такой тип что бы функцию можно было вызвать 3 разными способами
type paramsCountType = [{ isOne: boolean }, unknown] | [{ isTwo: boolean }, unknown, unknown] | [{ isThree: boolean }, unknown, unknown, unknown]
function structureUnion(...params: paramsCountType) { }

structureUnion({ isOne: true }, 1);
// @ts-expect-error Здесь ошибка, так как при isOne только один дополнительный аргумент
structureUnion({ isOne: true }, 1, 2);
structureUnion({ isTwo: true }, 1, 2);
structureUnion({ isThree: true }, 1, 2, 3);

// ==================
// ЗАДАНИЕ! Без использования any напишите тип функции, к которому можно присвоить любой callback

// function anyCallback(cb: "write-type-heare") { }
function functionAnyCallback(cb: Function) {
  cb(1, 2, 3, 4)
}


const anyCallback = (a: number) => 1
const anyCallback2 = (a: string, b: string) => "str"


function functionAnyCallback2(cb: (...args: Array<any>) => unknown) {
  cb(1, 2, 3)
}

functionAnyCallback(anyCallback);
functionAnyCallback(anyCallback2);

// Контрвариантность
functionAnyCallback2(anyCallback);
functionAnyCallback2(anyCallback2);

const testUnknowStr: string = 1 as unknown
const testUnknowNum: number = 1 as unknown
const testUnknow2: string = 1 as any
const listeralAss: 1 = 1 as number
const testString: unknown = 1 as number

type Cb1 = (value: number) => 1;
type Cb2 = (value: 1, bbb: number) => number;

type Type<T extends Cb2> = T;

type Res = Type<Cb1>;
// ==================
// ЗАДАНИЕ: Какой тип нужно передать в параметр типа Ref чтобы в этот тип был assignable любой другой реф?

type Ref<T> = { current: T } | ((value: T) => void);

// ==================
// РЕШЕНИЕ

type SuperRef = Ref<unknown> | Ref<never>

function storeRef(anyRef: SuperRef) { }

const numberRef = {} as Ref<number>;
const stringRef = {} as Ref<string>;
const booleanRef = {} as Ref<boolean>;
const objectRef = {} as Ref<{ name: string }>;

// ✅ Все работает!
storeRef(numberRef);
storeRef(stringRef);
storeRef(booleanRef);
storeRef(objectRef);


interface testI {
  name: string
}

type testT = testI & {}


const real: testI = {
  name: ""
}

real.name



interface User {
  id: number;
  name: string;
  email: string;
  isAdmin: boolean;
}

// Убираем приватные поля
type PublicUser = Omit<User, 'email' | 'isAdmin'>;

// Добавляем новое поле
type UserWithStatus = PublicUser & { status: 'online' | 'offline' };


type UserWithStatus = {
  name: string;
  id: number;
} & {
  status: "online" | "offline";
}

