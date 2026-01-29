import { useState } from "react";
import api from "../api";

function AddBookForm() {
  const [title,setTitle] = useState("");
  const [author,setAuthor] = useState("");
  const [stock,setStock] = useState("");

  const addBook = async(e) => {
    e.preventDefault();
    await api.post("/books",{title,author,stock},{
      headers:{ "x-user-role":"admin" }
    });
    setTitle(""); setAuthor(""); setStock("");
    window.location.reload();
  };

  return (
    <div>
      <h3>Tambah Buku</h3>
      <form className="form" onSubmit={addBook}>
        <input placeholder="Title" value={title} onChange={e=>setTitle(e.target.value)} />
        <input placeholder="Author" value={author} onChange={e=>setAuthor(e.target.value)} />
        <input placeholder="Stock" type="number" value={stock} onChange={e=>setStock(e.target.value)} />
        <button>Add Book</button>
      </form>
    </div>
  );
}

export default AddBookForm;
