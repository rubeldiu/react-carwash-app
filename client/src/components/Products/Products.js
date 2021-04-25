import React, { useEffect, useState } from 'react';
import ProductItem from '../ProductItem/ProductItem';
import './Products.css';
import Loader from '../Loder/Loder';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Box, Grid } from '@material-ui/core';

const Products = () => {
      // Set data using hook:
  const [productData, setProductData] = useState([]);

   //PreLoader visibility
   const [loaderVisibility, setLoaderVisibility] = useState('block');
  // Get data from API and set the data:
  useEffect(() => {
    fetch('https://strawberry-pie-24970.herokuapp.com/products')
      .then((res) => res.json())
      .then((data) => {
          console.log(data);
        setProductData(data)        
        setLoaderVisibility('none');
      }
      
      );
      
  }, []);
    return (
        
        <Box>
           <Grid container spacing={6} >
           <Loader visibility={loaderVisibility} />
          
           {productData.map((product) => (
             <Grid
             item
             xs={12}
             sm={6}
             md={4}
             key={product._id}
             style={{
               textAlign: "center",
             }}
           >
             <ProductItem key={product._id} product={product}></ProductItem>
             </Grid>
          ))}

           </Grid>

        </Box>
        
        
         
      //   </div>
      // </div>
    );
};

export default Products;