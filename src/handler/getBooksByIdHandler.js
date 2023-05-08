const books = require('../model/books');

const getBookByIdHandler = (req, h) => {
	const {bookId} = req.params;
	const book = books.filter((b) => b.id === bookId)[0];
	if (book !== undefined) {
		return {
			status : 'success',
			data : {
				book,
			},
		};
	}
	const response = h.response({
		status: 'fail',
		message: 'Buku tidak ditemukan',
	}).code(404);
	return response;
};

module.exports = getBookByIdHandler;