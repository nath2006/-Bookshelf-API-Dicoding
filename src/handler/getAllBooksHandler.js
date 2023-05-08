/* eslint-disable no-unused-vars */
const books = require('../model/books');

const getAllBooksHandler = (req, h) => {
	const {name, reading, finished} = req.query;
	if(name) {
		let book = books.filter((b) => b.name.toLowerCase() === name.toLowerCase());
		return h.response({
			status: 'success',
			data: {
				books: book.map((books) => ({
					id: books.id,
					name: books.name,
					publisher: books.publisher,
				})),
			},
		}).code(200);
	}
	if(reading) {
		let book = books.filter((b) => Number(b.reading) === reading);
		return h.response({
			status: 'success',
			data: {
				books: book.map((books) => ({
					id: books.id,
					name: books.name,
					publisher: book.publisher,
				})),
			},
		}).code(200);
	}
	if(finished) {
		let book = books.filter((b) => Number(b.finished) === finished);
		return h.response({
			status: 'success',
			data: {
				books: book.map((books) => ({
					id: books.id,
					name: books.name,
					publisher: books.publisher,
				})),
			},
		}).code(200);
	}
	if(!name && !reading && !finished) {
		return h.response({
			status: 'success',
			data : {
				books: books.map((books) => ({
					id: books.id,
					name: books.name,
					publisher: books.publisher,
				})),
			},
		}).code(200);
	}
	// status: 'succes',
	// data: {
	// 	books,
	// },
}; 

module.exports = getAllBooksHandler;