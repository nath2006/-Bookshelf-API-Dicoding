const books = require('../model/books');

const deleteBookByIdHandler = (req, h) => {
	const {bookId} = req.params;
	const index = books.findIndex((b) => b.id === bookId);
	if(index !== -1) {
		books.splice(index, 1);
		const response = h.response({
			status: 'success',
			message: 'Buku berhasil dihapus',
		}).code(200);
		return response;
	}
	const response = h.response({
		status: 'fail',
		message: 'Buku gagal dihapus. Id tidak ditemukan',
	}).code(404);
	return response;
};

module.exports = deleteBookByIdHandler;