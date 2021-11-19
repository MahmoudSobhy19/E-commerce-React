import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Card from '../components/Card';

export default function Shop() {
  const [products, setProducts] = useState([]);
  const [data, setData] = useState([])

  useEffect(() => {
    document.title = "Arab Shop | Home";
    axios.get("http://localhost:5000/products").then((response) => {
      setProducts(response.data);
      setData(response.data)
    })
  }, []);

  const handleFilter = (e) => {
    if (e.target.value) {
      setData([]);
      setData(products.filter(el => el.category === e.target.value));
      products.map(el => console.log(el.category,e.target.value))
    } else {
      setData(products);
    }
  }

  return (
    <div className="shop">
      <div className="filter">
        <label className="flabel">Filter By Category </label>
        <select className="select" name="filter" onChange={handleFilter}>
          <option value="">All</option>
          <option value="Mobile">Mobile</option>
          <option value="Laptop">Laptop</option>
          <option value="Headphones">Headphones</option>
        </select>
      </div>
      <div className="content">
        {data.map(el => <Card key={el.id} {...el} />)}
      </div>
    </div>
  )
}
