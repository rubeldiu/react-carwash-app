import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
     //Set State for Search:
  const [searchQuery, setSearchQuery] = useState(null);
const getQuery = (e) => setSearchQuery(e.target.value);
    return (
       <section className='banner d-flex align-items-center text-center'>      
      <div className='container container-search'>
         <h1>Search Your Product Here..</h1>
        <div className='input-group col-md-6 my-5 mx-auto search-btn d-flex justify-content-center'>
           <input
            id='query'
             onChange={getQuery}
            type='text'
            className='form-control'
           placeholder='Search...'
         />
           <div className='input-group-append'>
           
           <Link to={'/search=' + searchQuery}>
              <button
                onClick={() => window.scrollBy(0, 500)}
               className='search-btn btn btn-primary'
              >
               Search
              </button>
             </Link>
          </div>
        </div>
      </div>
    </section>
    
    );
};

export default Home;