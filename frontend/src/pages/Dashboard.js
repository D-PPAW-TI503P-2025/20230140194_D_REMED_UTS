import { useEffect, useState } from "react";
import api from "../api";

function Dashboard({ searchTerm }) {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    api.get("/books").then(res => setBooks(res.data));
  }, []);

  const filteredBooks = books.filter(b =>
    b.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    b.author.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="grid">
      {filteredBooks.map(b => (
        <div className="card" key={b.id}>
          <h3>{b.title}</h3>
          <p>{b.author}</p>
          <p>Stock: {b.stock}</p>
        </div>
      ))}
    </div>
  );
}

export default Dashboard;
