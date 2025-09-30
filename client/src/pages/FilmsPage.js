import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function FilmsPage() {
  const [films, setFilms] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [search, setSearch] = useState("");
  const [customerId, setCustomerId] = useState("");   
  const [message, setMessage] = useState("");
  const perPage = 10;

  useEffect(() => {
    axios.get(`http://localhost:5002/api/films?page=${page}&per_page=${perPage}&search=${search}`)
      .then(res => {
        setFilms(res.data.films);
        setTotal(res.data.total);
      })
      .catch(err => console.error(err));
  }, [page, search]);

  const totalPages = Math.ceil(total / perPage);

  const rentFilm = (filmId) => {
    if (!customerId) {
      setMessage("Please enter a customer ID before renting.");
      return;
    }
    axios.post(`http://localhost:5002/api/rent/${filmId}`, { customer_id: customerId })
      .then(res => {
        setMessage(`Film ${filmId} rented to customer ${customerId}`);
        return axios.get(`http://localhost:5002/api/films?page=${page}&per_page=${perPage}&search=${search}`);
      })
      .then(res => setFilms(res.data.films))
      .catch(err => {
        console.error(err);
        setMessage("Error renting film.");
      });
  };

  return (
    <div>
      <h1>Films</h1>

      <input
        type="text"
        placeholder="Search by title, actor, or genre"
        value={search}
        onChange={e => { setSearch(e.target.value); setPage(1); }}
      />

      <div style={{ margin: "10px 0" }}>
        <input
          type="number"
          placeholder="Enter Customer ID"
          value={customerId}
          onChange={e => setCustomerId(e.target.value)}
        />
      </div>

      {message && <p>{message}</p>}

      <ul>
        {films.map(film => (
          <li key={film.film_id}>
            <Link to={`/films/${film.film_id}`}>
              {film.title}
            </Link> (ID: {film.film_id}) — {film.category} — {film.available_copies} copies
            {" "}
            <button onClick={() => rentFilm(film.film_id)}>Rent</button>
          </li>
        ))}
      </ul>

      <div>
        <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}>
          Prev
        </button>
        <span> Page {page} of {totalPages} </span>
        <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page >= totalPages}>
          Next
        </button>
      </div>
    </div>
  );
}

export default FilmsPage;

