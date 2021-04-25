import React, { useState, useContext, useEffect } from 'react';
import { Link, useHistory, useLocation, useParams } from 'react-router-dom';
import logo from '../../assets/logos/logo.png';
import { UserContext } from '../../App';
import { useForm } from 'react-hook-form';

const CheckOut = () => {
    // Receive user clicked task _id using useParams hook:
  const { _id } = useParams();

   // Set state
   const [product, setProduct] = useState([]);

    // Get the single task user clicked from API:
  useEffect(() => {
    fetch(`https://strawberry-pie-24970.herokuapp.com/getProduct/${_id}`)
      .then((res) => res.json())
      .then((data) => setProduct(data));
  }, [_id]);

  // Context from app.js
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);

   // React hook form for extra form validation and error message
   const { register, handleSubmit, errors } = useForm();

   // handle redirected to user task
   let history = useHistory();
   function handleUserTask() {
     history.push('/userDashboard');
   }

   // When user registered send the data to server and redirect user to UserDashboard
  const onSubmit = (data) => {
    const newOrder = { ...data };
   

    fetch('https://strawberry-pie-24970.herokuapp.com/addOrder', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newOrder),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          handleUserTask();
        }
      });
  };

    return (
        <section className='container'>
        <div className='d-flex justify-content-center flex-column align-items-center my-5'>
          <div className='row mb-2'>
            <Link to='/'>
              <div className='col-md-12  text-center mb-3'>
                <img className='w-25' src={logo} alt='' />
              </div>
            </Link>
          </div>
          <div className='row'>
            <div className='col-md-12'>
              <form
                onSubmit={handleSubmit(onSubmit)}
                className='login-form shadow bg-white rounded text-left p-3'
              >
                <h4 className='font-weight-bold mb-3'>Product CheckOut</h4>
                <div className='form-group'>
                    <label htmlFor="name">Name </label>
                  <input
                    className='form-control'
                    defaultValue={loggedInUser.name}
                    readOnly
                    name='name'
                    type='text'
                    placeholder='Full Name'
                    ref={register({ required: true })}
                  />
                  {errors.name && <span className='error'>Name is required</span>}
                </div>
                <div className='form-group'>
                <label htmlFor="email">Email</label>
                  <input
                    className='form-control'
                    name='email'
                    type='email'
                    readOnly
                    value={loggedInUser.email}
                    placeholder='Email'
                    ref={register({ required: true })}
                  />
                  {errors.email && (
                    <span className='error'>Email is required</span>
                  )}
                </div>
                <div className='form-group'>
                <label htmlFor="name">Order date</label>
                  <input
                    className='form-control'
                    name='orderDate'
                    type='date'
                    ref={register({ required: true })}
                  />
                  {errors.orderDate && (
                    <span className='error'>Date is required</span>
                  )}
                </div>
                
                {/* Receive from Buy Now.. */}
                <div className='form-group'>
                <label htmlFor="name">Product Name</label>
                  <input
                    className='form-control'
                    value={product.name}
                    readOnly
                    name='product'
                    type='text'
                    placeholder='Product Title'
                    ref={register({ required: true })}
                  />
                  {errors.product && (
                    <span className='error'>Product title is required</span>
                  )}
                </div>
                <div className='form-group'>
                <label htmlFor="name">Product Price</label>
                  <input
                    className='form-control'
                    value={product.price}
                    readOnly
                    name='productPrice'
                    type='text'
                    placeholder='Product Price'
                    ref={register({ required: true })}
                  />
                  {errors.productPrice && (
                    <span className='error'>Product Price is required</span>
                  )}
                </div>
                <div className='form-group'>
                <label htmlFor="name">Product Wight</label>
                  <input
                    className='form-control'
                    value={product.wight}
                    readOnly
                    name='productWight'
                    type='text'
                    placeholder='Product Wight'
                    ref={register({ required: true })}
                  />
                  {errors.productWight && (
                    <span className='error'>Product Price is required</span>
                  )}
                </div>
  
                <div className='form-group'>
                  <button
                    style={{ width: '100%' }}
                    className='btn btn-primary'
                    type='submit'
                  >
                    CheckOut Your Order
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    );
};

export default CheckOut;