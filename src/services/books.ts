import { BookType, AddBookType, UpdateBookType } from "../interfaces/books.js";
import { generateRandomNumber } from "../utils/crypto.js";


export class ServiceBook {
    private books: BookType[] = [];

    async list(): Promise<BookType[]> {
        return this.books;
    }

    async get(id: number): Promise<BookType | undefined> {
        return this.books.find(book => book.id == id)
    }

    async add(book: AddBookType): Promise<boolean> {
        const newBook: BookType = {
            id: generateRandomNumber(1, 100),
            ...book
        }
        this.books.push(newBook);
        return true;
    }

    async update(id: number, data: any): Promise<boolean> {
        const index = this.books.findIndex(book => book.id == id);
        if(index == -1) {
            return false;
        }

        this.books[index] = {
            ...this.books[index],
            ...data
        }
        return true;
    }

    async delete(id: number): Promise<boolean> {
        const index = this.books.findIndex(book => book.id == id);
        this.books.splice(index, 1);
        return true;
    }
}