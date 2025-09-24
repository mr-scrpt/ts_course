//  index.ts
import { users, cars, books } from "./model/data";

type OnlyStringKey<T> = {
  [K in keyof T]: T[K] extends string ? K : never
}[keyof T]


function assertIsStringTuple(list: unknown[]): asserts list is [string, string] {
  if (
    list.length !== 2 ||
    typeof list[0] !== 'string' ||
    typeof list[1] !== 'string'
  ) {
    throw new Error("Asserts failed: value is not a tuple of two strings");
  }
}

const sortByStingObjectAssertsCheck = <T extends Record<string, unknown>>(array: T[], key: OnlyStringKey<T>) => {
  return [...array].sort((a, b) => {
    const values = [a[key], b[key]];
    assertIsStringTuple(values);

    return values[0].localeCompare(values[1]);
  })
}


const sortByStingObjectGuardCheck = <T extends Record<string, unknown>>(array: Array<T>, key: OnlyStringKey<T>) => {
  return [...array].sort((a, b) => {
    const vA = a[key]
    const vB = b[key]

    if (typeof vA !== "string" || typeof vB !== "string") return 0
    return vA.localeCompare(vB)

  })
}

const sortedUserA = sortByStingObjectAssertsCheck(users, "name")
const sortedCarA = sortByStingObjectAssertsCheck(cars, "model")
const sortedBookA = sortByStingObjectAssertsCheck(books, "author")

const sortedUserG = sortByStingObjectGuardCheck(users, "email")
const sortedCarG = sortByStingObjectGuardCheck(cars, "model")
const sortedBookG = sortByStingObjectGuardCheck(books, "title")


console.log('output_log:  =>>>', sortedBookA, sortedCarA, sortedUserA)
console.log('output_log:  =>>>', sortedBookG, sortedCarG, sortedUserG)
