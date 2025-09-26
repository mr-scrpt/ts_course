//  domain/type.ts

export type User = {
  id: number;
  name: string;
  email: string;
  isActive: boolean;
};

export type Book = {
  id: number;
  title: string;
  author: string;
  pages: number;
};

export type Car = {
  id: number;
  make: string;
  model: string;
  year: number;
};
