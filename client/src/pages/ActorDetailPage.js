import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function ActorDetailPage() {
  const { actor_id } = useParams();
  const [actor, setActor] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:5002/api/actors/${actor_id}`)
      .then(res => setActor(res.data))
      .catch(err => console.error(err));
  }, [actor_id]);

  if (!actor) return <p>Loading...</p>;
  if (actor.error) return <p>{actor.error}</p>;

  return (
    <div>
      <h1>{actor.actor.first_name} {actor.actor.last_name}</h1>
      <p>Total Films: {actor.actor.film_count}</p>

      <h3>Top 5 Films</h3>
      <ul>
        {actor.films.map(film => (
          <li key={film.film_id}>
            {film.title} ({film.rental_count} rentals)
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ActorDetailPage;

