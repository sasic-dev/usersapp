import { Request, Response, NextFunction } from "express";
import Joi from "joi";
import { ServiceBook } from "../services/books.js";
const serviceBook = new ServiceBook();

export const getBooks = async (req: Request, res: Response) => {
    const books = await serviceBook.list();
    if(books.length == 0) {
        return res.status(200).json({ "message": "No books available!" });
    }

    return res.status(200).json({
        "message": "Books available",
        "books": books
    });
}

export const getBook = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const bookId = await Joi.number().required().messages({
            'number.base': 'id must be a number',
            'any.required': 'id is required'
        }).validateAsync(req.params.id);

        const book = await serviceBook.get(bookId);
        if(!book) {
            return res.status(203).json({ "message": "Book not available!" });
        }

        return res.status(200).json({
            "message": "Book available",
            "book": book
        });
    } catch(err) {
        next(err)
    }
}

export const addBook = async (req: Request, res: Response, next: NextFunction) => {
    try {
        await Joi.object({
            'name': Joi.string().required(),
            'author': Joi.string().required(),
            'publishedYear': Joi.number().required(),
        }).validateAsync(req.body);

        const add = serviceBook.add(req.body);
        if(!add) {
            return res.status(200).json({ "message": "Book detail not added!" });
        }

        return res.status(200).json({ "message": "Book detail added successfully" });
    } catch(err) {
        next(err)
    }
}

export const updateBook = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const bookId = await Joi.number().required().messages({
            'number.base': 'id must be a number',
            'any.required': 'id is required'
        }).validateAsync(req.params.id);

        const result = await serviceBook.update(bookId, req.body);
        if(!result) {
            return res.status(203).json({ "message": "Book not updated!" });
        }
        return res.status(200).json({ "message": "Book detail updated successfully" });
    } catch(err) {
        next(err)
    }
}

export const deleteBook = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const bookId = await Joi.number().required().messages({
            'number.base': 'id must be a number',
            'any.required': 'id is required'
        }).validateAsync(req.params.id);

        await serviceBook.delete(bookId);
        
        return res.status(200).json({ "message": "Book deleted successfully" });
    } catch(err) {
        next(err)
    }
}