
const constObject = {
  RED: "red",
  BLUE: "blue",
  GREEN: "green"
} as const

type ConstObject = typeof constObject[keyof typeof constObject]

const getKeyObject = <T extends Record<string, unknown>, V extends T[keyof T]>(obj: T, value: V): string => {
  return Object.keys(obj).find(key => obj[key] === value) || ""
}

console.log(getKeyObject(constObject, "red"))


type PaletteColor = {
  /** Уникальный идентификатор */
  id: number;
  /** Имя цвета, например, 'Primary Blue' */
  name: string;
  /** HEX-код цвета */
  hex: string;
  /** Значение в формате RGB */
  rgb: string;
  /** * Яркость цвета (от 0 до 1), где 0 - черный, 1 - белый.
   * Идеально подходит для сортировки!
   */
  luminance: number;
  /** Цвет текста, который будет контрастно смотреться на этом фоне */
  contrastText: string;
};

// Готовый массив объектов для тренировки
const colorPalette: PaletteColor[] = [
  {
    id: 1,
    name: 'Danger Red',
    hex: '#dc3545',
    rgb: 'rgb(220, 53, 69)',
    luminance: 0.33,
    contrastText: '#FFFFFF',
  },
  {
    id: 2,
    name: 'Success Green',
    hex: '#28a745',
    rgb: 'rgb(40, 167, 69)',
    luminance: 0.46,
    contrastText: '#FFFFFF',
  },
  {
    id: 3,
    name: 'Primary Blue',
    hex: '#007bff',
    rgb: 'rgb(0, 123, 255)',
    luminance: 0.40,
    contrastText: '#FFFFFF',
  },
  {
    id: 4,
    name: 'Warning Yellow',
    hex: '#ffc107',
    rgb: 'rgb(255, 193, 7)',
    luminance: 0.74,
    contrastText: '#212529',
  },
  {
    id: 5,
    name: 'Secondary Gray',
    hex: '#6c757d',
    rgb: 'rgb(108, 117, 125)',
    luminance: 0.45,
    contrastText: '#FFFFFF',
  },
  {
    id: 6,
    name: 'Info Light',
    hex: '#e3f2fd',
    rgb: 'rgb(227, 242, 253)',
    luminance: 0.94,
    contrastText: '#212529',
  },
];


const sortArrayObject = <T extends Record<string, unknown>, K extends keyof T>(array: Array<T>, field: K): Array<T> => [...array].sort((a, b) => (a[field] > b[field]) ? 1 : (a[field] < b[field] ? -1 : 0))


console.log(sortArrayObject(colorPalette, "rgb"))

type ArrayKeyNumberTyped<T> = {
  [K in number]: T
}

type ObjKeyStringTyped<T> = {
  [K in string]: T
}

const testArr: ArrayKeyNumberTyped<string> = ['ooo', 'bbb']
const testArr2: ObjKeyStringTyped<string> = ['ooo', 'bbb']

const testObj: ObjKeyStringTyped<string> = { "idid": "iii" }

type UnionType = "name" | "age" | "address"

type ObjKeyUnionTyped<T> = {
  [K in UnionType]: T
}

const testUnion: ObjKeyUnionTyped<string> = {
  name: "",
  age: "",
  address: ""
}

// const isDefined: <T>(value: T) => asserts value is NonNullable<T> = (value) => {
//     if(value === null || value === undefined) throw new Error("is not defined")
// }

// Утверждает что тип это T из которого убраны null и undefined
function isDefined<T,>(value: T): asserts value is NonNullable<T> {
  if (value === null || value === undefined) throw new Error("is not defined")
}

// Утверждает что в union больше нет ложных типов undefined, null, "", 0 
function isDefined2(value: unknown): asserts value {
  if (value === null || value === undefined) throw new Error("is not defined")
}

function isDefined3(value: User | undefined): value is User {
  if (value === null || value === undefined) return false
  else return true

}


type User = {
  name: string
}

function getUserName(user: User | undefined) {

  if (isDefined3(user)) {
    user.name
  }

  isDefined2(user);

  return user.name;
}

type TestUnknow<T extends unknown> = T

type D = TestUnknow<string>


type TestNever<T extends never> = T

type N = TestNever<any>
type N1 = TestNever<never>

type TestAnyNever<T extends any> = T
type NA = TestAnyNever<unknown>


function fn2(value: Record<string, unknown>) { }

function fn3(value: { [key: string]: unknown }) { }



const fn4 = () => { }
fn4['apply']

const obj: Record<string, unknown> = {}
const obj2 = {}
const obj3: object = obj
const obj35: object = {}
const obj4: Record<string, unknown> = obj35

const obj5: object = () => { }


obj['not_exist_key']
// @ts-expect-error
obj2['not_exist_key']
// @ts-expect-error
fn4['not_exist_key']
// @ts-expect-error
fn2(fn4)
fn3({})


const voidT: void = undefined
const undT: undefined = void "what_ever"



type Obj = {
  name: string
}

const value: "value" = "value"

const obj22 = {
  name: value,
  someAnotherField: "kdkdkd"
}

const obj222: Obj = obj22


const obj333: Obj = {

  name: value,
  // @ts-expect-error
  someAnotherField: "ididi"
}

const user = {
  name: "Борис",
  friends: ["Анна", "Виктор"],

  printFriends: function () {
    // 'this' здесь - это 'user'
    this.friends.forEach(friend => {
      // Стрелочная функция "заимствует" 'this' у родительской
      // функции printFriends, поэтому this.name - это "Борис"
      console.log(`${this.name} дружит с ${friend}`);
    });
  }
};

user.printFriends();

const user2 = {
  name: "Борис",
  friends: ["Анна", "Виктор"],

  printFriends: function () {

    this.friends.forEach(function (friend: string) {

      console.log(`${this.name} дружит с ${friend}`);
    });
  }
};

user2.printFriends()


type T1 = { name: string }
type T2 = { value: number }

type Itersect = T1 & T2

const intersect: Itersect = { name: "olo", value: 5 }

type Obj5 = { value: number } & { value: string }

const obj555: Obj5 = { value: 1 as never }
//@ts-expect-error 
const obj5555: Obj5 = { value: 1 as any }

type Obj56 = { value: string }
const obj55555: Obj56 = { value: 1 as any }



// Контрвариантность
const cb5 = (arg: number) => { }

function fn5(cb: (arg: 1) => void) {
  cb(1)
}

fn5(cb5)

const num: number = 1
// @ts-expect-error
const one: 1 = num
const oneLiteral: 1 = 1

const num2: number = oneLiteral



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

