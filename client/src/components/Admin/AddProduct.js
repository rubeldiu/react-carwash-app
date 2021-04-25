import React, { useState } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import './AddProduct.css';
import { useHistory } from 'react-router-dom';


const AddProduct = () => {
    const { register, handleSubmit, errors } = useForm();

    const [imageUrl,setImageUrl]=useState("");
  const onSubmit = data => {
      const eventData={
          name:data.name,
          price:data.price,
          wight:data.wight,
          imageUrl:imageUrl
      };
      console.log(eventData);
      const url=`https://strawberry-pie-24970.herokuapp.com/addProduct`;
      fetch(url,{
          method:'POST',
          headers:{'content-type':'application/json'},
          body:JSON.stringify(eventData)
      })
      //.then(res => console.log('product added'))
      .then(res => res.json())
      .then((data)=>{
        if(data){
          handleEventUpdate();
        }
      })

  };

  const handleImageUpload=event =>{
    console.log(event.target.files[0]);
    const imageData = new FormData();
    imageData.set('key','a7509ed84ee84e68b5f7fe8357c1e092');
    imageData.append('image',event.target.files[0]);

    axios.post('https://api.imgbb.com/1/upload', imageData)
    .then(function (response) {
      setImageUrl(response.data.data.display_url);
    })
    .catch(function (error) {
      console.log(error);
    });
}

     // handle redirected to home
  let history = useHistory();
  function handleEventUpdate() {
    history.push('/');
  }

   
   
    return (
        <div className='bg-white rounded my-4 p-4'>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='row'>
            <div className='col-md-6'>
              <div className='form-group'>
                <label htmlFor='name'>Product Name</label>
                <input
                  className='form-control'
                  name='name'
                  type='text'
                  placeholder=' Name'
                  ref={register({ required: true })}
                />
                {errors.task && (
                  <span className='error'>Product name is required</span>
                )}
              </div>
              <div className='form-group'>
              <label htmlFor='price'>Product Price</label>
                <input
                  className='form-control'
                  name='price'
                  type='text'
                  placeholder='Price'
                  ref={register({ required: true })}
                />
                {errors.task && (
                  <span className='error'>Product price is required</span>
                )}
              </div>
            </div>
  
            <div className='col-md-6'>
              <div className='form-group'>
              <label htmlFor='wight'>Product Wight</label>
                <input
                  className='form-control'
                  name='wight'
                  type='text'
                  placeholder=' Wight'
                  ref={register({ required: true })}
                />
                {errors.task && (
                  <span className='error'>Product Wight is required</span>
                )}
              </div>
              
              <div className='form-group'>
              
                  <input name="exampleRequired" type="file" onChange={handleImageUpload} />
               
              </div>
            </div>
          </div>
          <div className='row'>
            <div className='col-md-12'>
              <div className='text-right'>
                <button type='submit' className='btn btn-primary'>
                  Submit
                </button>
              </div>
            </div>
          </div>
        </form>
  
       
      </div>
    );
};

export default AddProduct;