const express = require('express')
const router = express.Router();
const {SearchByAuthor,  SearchByTitle, GetBooksBySubject, GetDetails} = require('../controllers/BookController')
router.get('/books/:name',GetBooksBySubject)
router.get('/books/detail/:key',GetDetails)
router.get('/books',SearchByAuthor)
router.get('/book',SearchByTitle)
module.exports = router;