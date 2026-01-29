const { Book, BorrowLog } = require("../models");

exports.borrowBook = async (req, res) => {
  const { bookId, latitude, longitude } = req.body;
  const userId = req.headers["x-user-id"];

  const book = await Book.findByPk(bookId);
  if (!book) return res.status(404).json({ message: "Book not found" });

  if (book.stock <= 0) {
    return res.status(400).json({ message: "Stock empty" });
  }

  await book.update({ stock: book.stock - 1 });

  const borrow = await BorrowLog.create({
    userId,
    bookId,
    latitude,
    longitude
  });

  res.json({ message: "Book borrowed", data: borrow });
};

exports.getAllLogs = async (req, res) => {
  const logs = await BorrowLog.findAll({
    include: [Book]
  });
  res.json(logs);
};
