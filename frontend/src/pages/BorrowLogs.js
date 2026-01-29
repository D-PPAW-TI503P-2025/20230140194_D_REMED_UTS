import { useEffect, useState } from "react";
import api from "../api";

function BorrowLogs() {
  const [logs,setLogs] = useState([]);

  useEffect(()=>{
    api.get("/borrow/logs",{ headers:{ "x-user-role":"admin" }})
      .then(res=>setLogs(res.data));
  },[]);

  return (
    <table>
      <thead>
        <tr>
          <th>User ID</th>
          <th>Book ID</th>
          <th>Date</th>
          <th>Latitude</th>
          <th>Longitude</th>
        </tr>
      </thead>
      <tbody>
        {logs.map(l=>(
          <tr key={l.id}>
            <td>{l.userId}</td>
            <td>{l.bookId}</td>
            <td>{new Date(l.borrowDate).toLocaleString()}</td>
            <td>{l.latitude}</td>
            <td>{l.longitude}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default BorrowLogs;
