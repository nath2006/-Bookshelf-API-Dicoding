const { nanoid } = require('nanoid');
const books = require('../model/books');

const addBookHandler = (req, h) => {
	const 
		{ 
			name, 
			year,
			author, 
			summary, 
			publisher, 
			pageCount, 
			readPage,
			reading
		} = req.payload;

	if(name === undefined) {
		const response = h.response({
			status: 'fail',
			message: 'Gagal menambahkan buku. Mohon isi nama buku'
		}).code(400);
		return response;
	}
	if(readPage > pageCount) {
		const response = h.response({
			status: 'fail',
			message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount'
		}).code(400);
		return response;
	}

	const id = nanoid(16);
	const insertedAt = new Date().toISOString();
	const updatedAt = insertedAt;
	const finished = pageCount === readPage ? true : false;

	books.push({
		id,
		name,
		year,
		author,
		summary,
		publisher,
		pageCount,
		readPage,
		finished,
		reading,
		insertedAt,
		updatedAt
	});
	// books.push(newBook);

	const isSuccess = books.filter((book) => book.id === id).length > 0;
	if (isSuccess) {
		const response = h.response({
			status: 'success',
			message: 'Buku berhasil ditambahkan',
			data: {
				bookId: id,
			},
		});
		response.code(201);
		return response;
	}
	const response = h.response({
		status: 'fail',
		message: 'Catatan gagal ditambahkan',
	});
	response.code(500);
	return response;
};

module.exports = addBookHandler;