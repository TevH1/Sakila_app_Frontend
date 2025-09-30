import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function CustomerDetailPage() {
  const { customer_id } = useParams();
  const [customer, setCustomer] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:5002/api/customers/${customer_id}`)
      .then(res => setCustomer(res.data))
      .catch(err => console.error(err));
  }, [customer_id]);

  if (!customer) return <p>Loading...</p>;
  if (customer.error) return <p>{customer.error}</p>;

  return (
    <div>
      <h1>{customer.customer.first_name} {customer.customer.last_name}</h1>
      <p>Email: {customer.customer.email}</p>

      <h3>Rental History</h3>
      <ul>
        {customer.rentals.map(r => (
          <li key={r.rental_id}>
            {r.title} — rented {new Date(r.rental_date).toLocaleDateString()}
            {r.return_date
              ? `, returned ${new Date(r.return_date).toLocaleDateString()}`
              : " (Not returned)"}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CustomerDetailPage;

