import { useEffect, useState } from "react";
import api from "../api";

function AdminBooks() {
  const [books, setBooks] = useState([]);
  const [editId, setEditId] = useState(null);
  const [form, setForm] = useState({ title: "", author: "", stock: "" });

  const headers = { "x-user-role": "admin" };

  const loadBooks = async () => {
    const res = await api.get("/books");
    setBooks(res.data);
  };

  useEffect(() => {
    loadBooks();
  }, []);

  const deleteBook = async (id) => {
    if (!window.confirm("Hapus buku ini?")) return;
    await api.delete(`/books/${id}`, { headers });
    loadBooks();
  };

  const startEdit = (book) => {
    setEditId(book.id);
    setForm({
      title: book.title,
      author: book.author,
      stock: book.stock
    });
  };

  const updateBook = async (id) => {
    await api.put(`/books/${id}`, form, { headers });
    setEditId(null);
    loadBooks();
  };

  return (
    <div>
      <h3>Kelola Buku</h3>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Judul</th>
            <th>Author</th>
            <th>Stock</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {books.map(b => (
            <tr key={b.id}>
              <td>{b.id}</td>

              <td>
                {editId === b.id ? (
                  <input
                    value={form.title}
                    onChange={e => setForm({ ...form, title: e.target.value })}
                  />
                ) : (
                  b.title
                )}
              </td>

              <td>
                {editId === b.id ? (
                  <input
                    value={form.author}
                    onChange={e => setForm({ ...form, author: e.target.value })}
                  />
                ) : (
                  b.author
                )}
              </td>

              <td>
                {editId === b.id ? (
                  <input
                    type="number"
                    value={form.stock}
                    onChange={e => setForm({ ...form, stock: e.target.value })}
                  />
                ) : (
                  b.stock
                )}
              </td>

              <td>
                {editId === b.id ? (
                  <>
                    <button onClick={() => updateBook(b.id)}>Save</button>
                    <button className="danger" onClick={() => setEditId(null)}>Cancel</button>
                  </>
                ) : (
                  <>
                    <button onClick={() => startEdit(b)}>Edit</button>
                    <button className="danger" onClick={() => deleteBook(b.id)}>Delete</button>
                  </>
                )}
              </td>

            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminBooks;
