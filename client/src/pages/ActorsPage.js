import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function ActorsPage() {
  const [actors, setActors] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const perPage = 10;

  useEffect(() => {
    axios.get(`http://localhost:5002/api/actors?page=${page}&per_page=${perPage}`)
      .then(res => {
        setActors(res.data.actors);
        setTotal(res.data.total);
      })
      .catch(err => console.error(err));
  }, [page]);

  const totalPages = Math.ceil(total / perPage);

  return (
    <div>
      <h1>Actors (page {page})</h1>
      <ul>
        {actors.map(actor => (
          <li key={actor.actor_id}>
            <Link to={`/actors/${actor.actor_id}`}>
              {actor.first_name} {actor.last_name}
            </Link> (ID: {actor.actor_id}) — {actor.film_count} films
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

export default ActorsPage;

