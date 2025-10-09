import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function CustomersPage() {
  const [customers, setCustomers] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const perPage = 10;


  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");

  const fetchCustomers = () => {
    axios
      .get(`http://localhost:5002/api/customers?page=${page}&search=${search}`)
      .then(res => {
        setCustomers(res.data.customers);
        setTotal(res.data.total);
      })
      .catch(err => console.error(err));
  };

  useEffect(() => {
    fetchCustomers();
  }, [page, search]);

  const totalPages = Math.ceil(total / perPage);

  const handleAddCustomer = (e) => {
    e.preventDefault();
    axios.post("http://localhost:5002/api/customers", {
      first_name: firstName,
      last_name: lastName,
      email
    })
      .then(() => {
        setFirstName("");
        setLastName("");
        setEmail("");
        fetchCustomers();
      })
      .catch(err => console.error(err));
  };

  return (
    <div>
      <h1>Customers</h1>

      {/* Add Customer Form */}
      <form onSubmit={handleAddCustomer}>
        <input
          placeholder="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <input
          placeholder="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button type="submit">Add Customer</button>
      </form>

      {/* Search */}
      <input
        type="text"
        placeholder="Search customers..."
        value={search}
        onChange={e => {
          setPage(1); 
          setSearch(e.target.value);
        }}
      />

      {/* Customer List */}
      <ul>
        {customers.map(customer => (
          <li key={customer.customer_id}>
            <Link to={`/customers/${customer.customer_id}`}>
              {customer.first_name} {customer.last_name}
            </Link>{" "}
            (ID: {customer.customer_id}) — {customer.email}
          </li>
        ))}
      </ul>

      {/* Pagination */}
      <div>
        <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}>
          Prev
        </button>
        <span> Page {page} of {totalPages} </span>
        <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages}>
          Next
        </button>
      </div>
    </div>
  );
}

export default CustomersPage;
