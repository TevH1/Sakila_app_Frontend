import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function CustomersPage() {
  const [customers, setCustomers] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const perPage = 10;

  useEffect(() => {
    axios.get(`http://localhost:5002/api/customers?page=${page}&search=${search}`)
      .then(res => {
        setCustomers(res.data.customers);
        setTotal(res.data.total);
      })
      .catch(err => console.error(err));
  }, [page, search]);

  const totalPages = Math.ceil(total / perPage);

  return (
    <div>
      <h1>Customers</h1>
      <input
        type="text"
        placeholder="Search customers..."
        value={search}
        onChange={e => setSearch(e.target.value)}
      />

      <ul>
        {customers.map(customer => (
          <li key={customer.customer_id}>
           <Link to={`/customers/${customer.customer_id}`}>
             {customer.first_name} {customer.last_name}
           </Link> (ID: {customer.customer_id}) — {customer.email}
          </li>
        ))}
      </ul>

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

