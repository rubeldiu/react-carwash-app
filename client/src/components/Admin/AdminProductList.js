import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../App';
import CircularProgress from '@material-ui/core/CircularProgress';

const AdminProductList = () => {
    const [productList, setProductList] = useState([]);
     // Context from app.js
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  

  // Get all Product List
  useEffect(() => {
    fetch('https://strawberry-pie-24970.herokuapp.com/products')
      .then((res) => res.json())
      .then((data) => {
        setProductList(data);
        
      });
  }, [productList]);

   // Delete task when user click on delete button and update the dashboard
   const deleteTaskAdmin = (_id) => {
    fetch(`https://strawberry-pie-24970.herokuapp.com/deleteProduct/${_id}`, {
      method: 'DELETE',
    })
      .then((res) => res.json())
      .then((result) => {
        if (result) {
          console.log(result);
        }
      });
  };

  let serialNo = 1;
    return (
        <>
        
        <div className='table-responsive'>
        <p style={{textAlign:'center'}}>{productList.length===0 && <CircularProgress/>} </p> 
          <table className='table table-borderless table-hover bg-white rounded my-4'>
            <thead className='thead-light'>
              <tr>
                <th className='text-secondary text-left' scope='col'>
                  #
                </th>
                <th className='text-secondary' scope='col'>
                 Product Name
                </th>
                <th className='text-secondary' scope='col'>
                  Price
                </th>
                <th className='text-secondary' scope='col'>
                  Wight
                </th>
                <th className='text-secondary' scope='col'>
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {productList.map((product) => (
                <tr key={product._id}>
                  <td>{serialNo++}</td>
                  <td>{product.name}</td>
                  <td>{product.price}</td>
                  <td>{product.wight}</td>                 
                  <td>
                    <button
                      onClick={() => deleteTaskAdmin(product._id)}
                      className='btn btn-danger'
                    >
                      <FontAwesomeIcon icon={faTrash} size='xs' />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </>
    );
};

export default AdminProductList;