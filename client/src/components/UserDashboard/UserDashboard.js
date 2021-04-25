import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../App';
import CircularProgress from '@material-ui/core/CircularProgress';

const UserDashboard = () => {
      // Set state for loggedInUser:
  const [userOrders, setUserOrders] = useState([]);
  // Context from app.js
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);

  //Loader visibility
 // const [loaderVisibility, setLoaderVisibility] = useState('block');
  // Dynamically filter loggedInUser data from API:
  useEffect(() => {
    fetch(
      'https://strawberry-pie-24970.herokuapp.com/userOrders?email=' +
        loggedInUser.email,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        setUserOrders(data);
        //setLoaderVisibility('none');
      });
  }, [loggedInUser.email, userOrders]);
  let serialNo = 1;
    return (
    <div className='table-responsive'>
       <p style={{textAlign:'center'}}>{userOrders.length===0 && <CircularProgress/>} </p> 
     <p style={{textAlign:'center'}}>You've Ordered in {userOrders.length} Products</p>  
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
            Order Date
          </th>
        </tr>
      </thead>
      <tbody>
        {userOrders.map((item) => (
          <tr key={item._id}>
            <td>{serialNo++}</td>
            <td>{item.product}</td>
            <td>{item.productPrice}</td>
            <td>{item.productWight}</td>                 
            <td>{(new Date(item.orderDate)).toDateString('dd/MM/yyyy')}</td>  
          </tr>
        ))}
      </tbody>
    </table>
  </div>
    );
};

export default UserDashboard;