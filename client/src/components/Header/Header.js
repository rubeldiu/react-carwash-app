import React, { useContext } from 'react';
import { UserContext } from '../../App';
import { handleSignOut } from '../Login/loginManager';
import { Link } from 'react-router-dom';
import logo from '../../assets/logos/logo.png';
import './Header.css';
import { Container, Nav, Navbar } from 'react-bootstrap';

const Header = () => {
     // Context from app.js
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);

  //Signout Method
  const signOut = () =>{
      handleSignOut().then(()=>setLoggedInUser(''));
  }
    return (
      <Navbar
      collapseOnSelect
      expand='lg'
      bg='light'
      variant='light'
      sticky='top'
    >
      <Container>
        <Navbar.Brand>
          {/* Home Button handle */}
          <img  src={logo} alt='logo' /> {' '} {' '}
          {/* <Navbar.Brand to="/">DeshiFood</Navbar.Brand> */}
        </Navbar.Brand>
        <Navbar.Toggle aria-controls='responsive-navbar-nav' />

        <Navbar.Collapse id='responsive-navbar-nav'>
         
          <Nav className='d-flex justify-content-between nav-link ml-auto align-items-md-center '>
           
            <Nav.Link> <Link style={{color: '#333'}} to='/'>Home</Link></Nav.Link>
            <Nav.Link href='#'>Blog</Nav.Link>
            <Nav.Link href='#'>Contact</Nav.Link>  
            {loggedInUser.email && (
              <Link to='/userDashboard' className='nav-link'>
                <button type='button' className='btn btn-info w-100'>
                 Orders
                </button>
              </Link>
            )}

            {/* If user is not logged in show show Register else Signout  */}
            {!loggedInUser.email ? (
              <Link to='/login' className='nav-link'>
                <button type='button' className='btn btn-primary w-100'>
                  Register
                </button>
              </Link>
            ) : (
              <Link to='/' className='nav-link'>
                <button
                  onClick={signOut}
                  type='button'
                  className='btn btn-danger w-100'
                >
                  Sign Out
                </button>
              </Link>
            )}          
            <Nav.Link>
            <Link to='/admin/dashboard' className='nav-link'>
              <button type='button' className='btn btn-dark w-100'>
                Admin
              </button>
            </Link>
            </Nav.Link>
           
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
        
       
    );
};

export default Header;