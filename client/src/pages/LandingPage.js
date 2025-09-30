import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function LandingPage() {
  const [data, setData] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:5002/api/landing")
      .then(res => setData(res.data))
      .catch(err => console.error(err));
  }, []);

  if (!data) return <p>Loading...</p>;

  return (
    <div>
      <h1>Top 5 Rented Films</h1>
      <ul>
        {data.films.map(film => (
          <li key={film.film_id}>
            <Link to={`/films/${film.film_id}`}>
              {film.title}
            </Link> ({film.rental_count} rentals)
          </li>
        ))}
      </ul>

      <h1>Top 5 Actors</h1>
      <ul>
        {data.actors.map(actor => (
          <li key={actor.actor_id}>
            <Link to={`/actors/${actor.actor_id}`}>
              {actor.first_name} {actor.last_name}
            </Link> ({actor.film_count} films)
          </li>
        ))}
      </ul>
    </div>
  );
}

export default LandingPage;

