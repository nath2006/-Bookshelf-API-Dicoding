const books = require('../model/books');

const editBookByIdHandler = (req,h) => {
	const {bookId} = req.params;
	const {
		name,
		year,
		author,
		summary,
		publisher,
		pageCount,
		readPage,
		reading,
	} = req.payload;
	if(name === undefined) {
		const response = h.response({
			status: 'fail',
			message: 'Gagal memperbarui buku. Mohon isi nama buku',
		}).code(400);
		return response;
	}
	if(readPage > pageCount) {
		const response = h.response({
			status: 'fail',
			message: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount',
		}).code(400);
		return response;
	}
	const updatedAt = new Date().toISOString();
	const index = books.findIndex((b) => b.id === bookId);
	if(index !== -1) {
		books[index] = {
			...books[index],
			name,
			year,
			author,
			summary,
			publisher,
			pageCount,
			readPage,
			reading,
			updatedAt,
		};
		const response = h.response({
			status: 'success',
			message: 'Buku berhasil diperbarui',
		}).code(200);
		return response;
	}
	const response = h.response({
		status: 'fail',
		message: 'Gagal memperbarui buku. Id tidak ditemukan',
	}).code(404);
	return response;
};

module.exports = editBookByIdHandler;