import React from 'react';
import { Link } from 'react-router-dom';
import './AdminSidebar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHome,
  faPlus,
  faSignOutAlt,
  faBox,
} from '@fortawesome/free-solid-svg-icons';

const AdminSidebar = () => {
    return (
        <div className='sidebar d-flex flex-column justify-content-between py-5 px-4'>
      <ul className='list-unstyled'>
        <li>
          <Link to='/' className='text-dark'>
            <FontAwesomeIcon icon={faHome} /> <span>Home</span>
          </Link>
        </li>
        <li>
          <Link to='/admin/dashboard' className='text-dark'>
            <FontAwesomeIcon icon={faBox} /> <span>Product List</span>
          </Link>
        </li>
        <li>
          <Link to='/admin/addProduct' className='text-dark'>
            <FontAwesomeIcon icon={faPlus} /> <span>Add Product</span>
          </Link>
        </li>
        <li>
          <Link to='/' className='text-dark'>
            <FontAwesomeIcon icon={faSignOutAlt} /> <span>Logout</span>
          </Link>
        </li>
      </ul>
    </div>
    );
};

export default AdminSidebar;