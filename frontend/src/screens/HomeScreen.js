import React, { useState, useEffect } from "react";
// load static data from frontend
// import data from "../data";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { listProducts } from "../actions/productActions";
import Rating from '../components/Rating';
function HomeScreen(props) {
  // Define Hook to access data from server instead of using data.js
  // const [products, setProduct] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [sortOrder, setSortOrder] = useState('');
  const category = props.match.params.id ? props.match.params.id : '';
  
  const productList = useSelector((state) => state.productList);
  const { products, loading, error } = productList;
  const dispatch = useDispatch();
  // to fetch data from server we use useEffect()
  // product list without categ
  /*useEffect(() => {
    dispatch(listProducts()); 
    return () => {
      // 
    };
  }, []); */

  // product list with categ
  useEffect(() => {
    dispatch(listProducts(category)); 
    return () => {
      // 
    };
  }, [category]);
  // product searching
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(listProducts(category, searchKeyword, sortOrder));
  };
  // sort by lowest / highest
  const sortHandler = (e) => {
    setSortOrder(e.target.value);
    dispatch(listProducts(category, searchKeyword, sortOrder));
  };
  return (
    <>
      {category && <h2>{category}</h2>}

      <ul className="filter">
        <li>
          <form onSubmit={submitHandler}>
            <input
              name="searchKeyword"
              onChange={(e) => setSearchKeyword(e.target.value)}
            />
            <button type="submit">Search</button>
          </form>
        </li>
        <li>
          Sort By{' '}
          <select name="sortOrder" onChange={sortHandler}>
            <option value="">Newest</option>
            <option value="lowest">Lowest</option>
            <option value="highest">Highest</option>
          </select>
        </li>
      </ul>
  
  {loading ? (
    <div>Loading...</div>
  ) : error ? (
    <div>{error}</div>
  ) : (
    <ul className="products">
      {products.map((product) => (
        <li key={product._id}>
          <div className="card">
            <Link to={"/product/" + product._id}>
              <img
                className="product-image"
                src={"../uploads/"+product.image}
                alt="product"
              />
            </Link>
            <div className="card-body">
              <Link to={"/product/" + product._id}>{product.name}</Link>
              <div className="rating">
              {/* {product.rating} Stars ({product.numReviews} Reviews) */}
              {/* <Rating
                    value={product.rating}
                    text={product.numReviews + ' reviews'}
                  /> */}
                  <Rating
                    rating={product.rating}
                    numReviews={product.numReviews}
                  ></Rating>
            </div>
            <div className="product-brand">{product.brand}</div>
            <div className="product-price">${product.price}</div>
            </div>
          </div>
        </li>
      ))}
    </ul>
  )};
  </>
  );
}
export default HomeScreen;
