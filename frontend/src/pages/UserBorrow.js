import { useEffect, useState } from "react";
import api from "../api";
import MapView from "./MapView";

function UserBorrow() {
  const [books,setBooks] = useState([]);
  const [userId,setUserId] = useState("");
  const [coords,setCoords] = useState(null);

  const loadBooks = async()=>{
    const res = await api.get("/books");
    setBooks(res.data);
  };

  useEffect(()=>{
    loadBooks();
    navigator.geolocation.getCurrentPosition(pos=>{
      setCoords({
        latitude: pos.coords.latitude,
        longitude: pos.coords.longitude
      });
    });
  },[]);

  const borrowBook = async(id)=>{
    if(!userId) return alert("Isi User ID dulu");

    await api.post("/borrow",
      { bookId:id, latitude:coords.latitude, longitude:coords.longitude },
      { headers:{ "x-user-role":"user","x-user-id":userId }}
    );

    alert("Buku dipinjam");
    loadBooks();
  };

  return (
    <>
      <input
        placeholder="Masukkan User ID"
        value={userId}
        onChange={e=>setUserId(e.target.value)}
      />

      {coords && <MapView latitude={coords.latitude} longitude={coords.longitude} />}

      <div className="grid">
        {books.map(b=>(
          <div className="card" key={b.id}>
            <h3>{b.title}</h3>
            <p>{b.author}</p>
            <p>Stock: {b.stock}</p>
            <button disabled={b.stock===0} onClick={()=>borrowBook(b.id)}>
              {b.stock===0 ? "Habis" : "Pinjam"}
            </button>
          </div>
        ))}
      </div>
    </>
  );
}

export default UserBorrow;
