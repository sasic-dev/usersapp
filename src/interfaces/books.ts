export interface BookType {
    "id": number;
    "name": string;
    "author": string;
    "publishedYear": number;
}

// Example book object to check for valid keys
const DefaultBookData: BookType = {
    id: 0,
    name: '',
    author: '',
    publishedYear: 0
};
export type AddBookType = Omit<BookType, "id">

export type UpdateBookType = Partial<BookType>

export type PickedBookType = Pick<BookType, "name" | "author">

export const getBookType = <K extends keyof BookType>(key: K):  Pick<BookType, K> => {
    if(!(key in DefaultBookData)) {
        return { } as Pick<BookType, K>
    }
    return { [key]: DefaultBookData[key]  } as Pick<BookType, K>
}
