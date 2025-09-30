import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function FilmDetailPage() {
  const { film_id } = useParams();
  const [film, setFilm] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:5002/api/film/${film_id}`)
      .then(res => setFilm(res.data))
      .catch(err => console.error(err));
  }, [film_id]);

  if (!film) return <p>Loading...</p>;

  return (
    <div>
      <h1>{film.film.title}</h1>
      <p>{film.film.description}</p>
      <p>Year: {film.film.release_year}</p>
      <p>Category: {film.film.category}</p>
      <p>Total Rentals: {film.film.rental_count}</p>

      <h3>Actors</h3>
      <ul>
        {film.actors.map(actor => (
          <li key={actor.actor_id}>
            {actor.first_name} {actor.last_name}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default FilmDetailPage;

