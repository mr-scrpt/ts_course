//  model/data.ts
import type { User, Book, Car } from "../domain/type"

export const users: User[] = [
  { id: 101, name: 'Анна', email: 'anna@example.com', isActive: true },
  { id: 102, name: 'Борис', email: 'boris@example.com', isActive: false },
  { id: 103, name: 'Виктор', email: 'victor@example.com', isActive: true },
];

export const books: Book[] = [
  { id: 201, title: '1984', author: 'Джордж Оруэлл', pages: 328 },
  { id: 202, title: 'Мастер и Маргарита', author: 'Михаил Булгаков', pages: 480 },
  { id: 203, title: 'Дюна', author: 'Фрэнк Герберт', pages: 688 },
];

export const cars: Car[] = [
  { id: 301, make: 'Toyota', model: 'Camry', year: 2021 },
  { id: 302, make: 'Ford', model: 'Mustang', year: 2022 },
  { id: 303, make: 'Tesla', model: 'Model 3', year: 2023 },
  { id: 304, make: 'BMW', model: 'X5', year: 2020 },
];

