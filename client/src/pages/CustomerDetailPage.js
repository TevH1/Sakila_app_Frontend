import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function CustomerDetailPage() {
  const { customer_id } = useParams();  
  const navigate = useNavigate();
  const [customer, setCustomer] = useState(null);
  const [rentals, setRentals] = useState([]);
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    axios.get(`http://localhost:5002/api/customers/${customer_id}`)
      .then(res => {
        setCustomer(res.data.customer);
        setRentals(res.data.rentals);
      })
      .catch(err => console.error(err));
  }, [customer_id]);

  if (!customer) return <p>Loading...</p>;

  const handleUpdate = (e) => {
    e.preventDefault();
    axios.put(`http://localhost:5002/api/customers/${customer_id}`, {
      first_name: customer.first_name,
      last_name: customer.last_name,
      email: customer.email
    })
      .then(() => setEditing(false))
      .catch(err => console.error(err));
  };

  const handleDelete = () => {
    console.log("Deleting customer:", customer_id);
    if (!window.confirm("Are you sure you want to delete this customer?")) return;
    axios.delete(`http://localhost:5002/api/customers/${customer_id}`)
      .then(() => navigate("/customers"))
      .catch(err => console.error(err));
  };

  const handleReturn = (rental_id) => {
  axios.post(`http://localhost:5002/api/rentals/return/${rental_id}`)
    .then(() => {
      return axios.get(`http://localhost:5002/api/customers/${customer_id}`);
    })
    .then(res => {
      setCustomer(res.data.customer);
      setRentals(res.data.rentals);
    })
    .catch(err => console.error(err));
};



  return (
    <div>
      <h2>
        {customer.first_name} {customer.last_name} (ID: {customer.customer_id})
      </h2>
      <p>Email: {customer.email}</p>

      {!editing ? (
        <button onClick={() => setEditing(true)}>Edit</button>
      ) : (
        <form onSubmit={handleUpdate}>
          <input
            value={customer.first_name}
            onChange={e => setCustomer({ ...customer, first_name: e.target.value })}
          />
          <input
            value={customer.last_name}
            onChange={e => setCustomer({ ...customer, last_name: e.target.value })}
          />
          <input
            value={customer.email}
            onChange={e => setCustomer({ ...customer, email: e.target.value })}
          />
          <button type="submit">Save</button>
          <button type="button" onClick={() => setEditing(false)}>Cancel</button>
        </form>
      )}

      <button onClick={handleDelete} style={{ color: "red" }}>Delete Customer</button>

      <h3>Rental History</h3>
      <ul>
        {rentals.map(r => (
          <li key={r.rental_id}>
            {r.title} — rented {new Date(r.rental_date).toLocaleDateString()}
            {r.return_date ? (
              ` (Returned ${new Date(r.return_date).toLocaleDateString()})`
            ) : (
              <>
                {" — Still rented "}
                <button
                  onClick={() => handleReturn(r.rental_id)}
                  style={{ marginLeft: "10px" }}
                >
                  Mark Returned
                </button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CustomerDetailPage;
