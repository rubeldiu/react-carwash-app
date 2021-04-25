import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import ProductItem from '../ProductItem/ProductItem';

const SearchProduct = () => {
    // Set data for search and filter:
  const [productSearch, setProductSearch] = useState([]);

    // Get all tasks events from API
    useEffect(() => {
        fetch('https://strawberry-pie-24970.herokuapp.com/products')
          .then((res) => res.json())
          .then((data) => setProductSearch(data));
      }, []);
    
  
   const { searchQuery } = useParams();
   
   const searchResult = productSearch.filter((event) =>
     event.name.includes(searchQuery)
   );
    return (
        <div className='container tasks-area'>
      <div className='row my-3'>
        {(searchResult.length === 0 ) && (
          <div>
          <h1 className='col-12 display-5 text-center'>No product found!</h1>
         </div>
        )}
        
        {searchResult.map((product) => (
          <ProductItem key={product._id} product={product}></ProductItem>
        ))}
      </div>
      
    </div>
    );
};

export default SearchProduct;