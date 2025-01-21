import { Router } from "express";
import { getBooks, getBook, addBook, updateBook, deleteBook } from "../controllers/books.js";

const router = Router();

router.get('/', getBooks);
router.get('/:id', getBook);
router.post('/', addBook);
router.put('/:id', updateBook);
router.delete('/:id', deleteBook);  

export default router;