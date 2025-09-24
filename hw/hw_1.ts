

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


type ArrayLenMoreOne = [unknown, unknown, ...Array<unknown>]
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

function structureType(value: { arr: "write-type-heare" }): string {
  return value.arr[1].obj.name;
}

const structureType1 = {
  arr: [
    1,
    {
      obj: {
        name: "asd",
        value: "",
      },
    },
    {
      hello: 1,
    },
  ],
  value: 1,
} as const;

structureType(structureType1);

// ==================
// ЗАДАНИЕ! Обновите тип прошлой функции, так что бы можно было добавить несуществующие параметры
// при создании объекта в момент вызова
// см index signature

function structureType2(value: "write-type-heare"): string {
  return value.arr[1].obj.name;
}

structureType2({
  arr: [
    1,
    {
      obj: {
        name: "asd",
        value: "",
      },
    },
    {
      hello: 1,
    },
  ],
  value: 1,
});

// ==================
// ЗАДАНИЕ! При пересечении с каким типом всегда будет получаться изначальный тип?

type TestIntersection<T> = T & "write-type-heare";
type ResTestIntersection = TestIntersection<string>; // res should be string

// ==================
// ЗАДАНИЕ! При пересечении с каким типом будет всегда never?

type TestIntersection2<T> = T & "write-type-heare";
type ResTestIntersection2 = TestIntersection2<string>; // res should be never

// ==================
// ЗАДАНИЕ! При объединении с каким типом всегда будет получаться тот же самый тип?

type TestUnion<T> = T | "write-type-heare";
type ResTestUnion = TestUnion<number>; // res should be number

// ==================
// ЗАДАНИЕ! При объединении с каким типом всегда будет получаться unknown
type TestUnion2<T> = T | "write-type-heare";
type ResTestUnion2 = TestUnion2<string>; // res should be unknown

// ==================
// ЗАДАНИЕ! Как с помощью пересечения можно отфильтровать все числа

type FilterIntersection<T> = T & "write-type-heare";
type ResFilterIntersection = FilterIntersection<1 | 2 | "value" | "b">; // res should be 'value' | 'b'

// ==================
// ЗАДАНИЕ! Как с помощью пересечения можно достать событие по типу из юниона

type FindEventByIntersection<T, K> = T & "write-type-heare";

type Event1 = { type: "user-created"; data: { name: string } };
type Event2 = { type: "user-deleted"; data: { id: number } };

type ResFindEventByIntersection = FindEventByIntersection<
  Event1 | Event2,
  "user-deleted"
>; // Res should assignable Event2

// ==================
// ЗАДАНИЕ! Напишите такой тип что бы функцию можно было вызвать 3 разными способами

function structureUnion(...params: "write-type-heare"[]) { }

structureUnion({ isOne: true }, 1);
// @ts-expect-error Здесь ошибка, так как при isOne только один дополнительный аргумент
structureUnion({ isOne: true }, 1, 2);
structureUnion({ isTwo: true }, 1, 2);
structureUnion({ isThree: true }, 1, 2, 3);

// ==================
// ЗАДАНИЕ! Без использования any напишите тип функции, к которому можно присвоить любой callback

function anyCallback(cb: "write-type-heare") { }

anyCallback((a: number) => 1);
anyCallback((a: string, b: number) => "str");

// ==================
// ЗАДАНИЕ! Какой тип нужно передать в параметр типа Ref что бы в этот тип был asssignable любой другой реф?

type Ref<T> = { current: T } | ((value: T) => void);

type SuperRef = Ref<"write-type-heare">;

function storeRef(anyRef: SuperRef) { }

const numberRef = {} as Ref<number>;
const stringRef = {} as Ref<string>;

storeRef(numberRef);
storeRef(stringRef);

