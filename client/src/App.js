
import { createContext, useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import AdminDashboard from './components/Admin/AdminDashboard';
import AdminProduct from './components/Admin/AdminProduct';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import NoMatch from './components/NoMatch/NoMatch';
import Products from './components/Products/Products';
import PrivateRoute from './components/PrivateRoute/PrivateRoute'
import CheckOut from './components/CheckOut/CheckOut';
import UserDashboard from './components/UserDashboard/UserDashboard';
import SearchProduct from './components/SearchProduct/SearchProduct';

//Create context here
export const UserContext =createContext();

function App() {
//Hook for Logged in user
const [loggedInUser, SetLoggedInUser] = useState({});
  return (
    <UserContext.Provider value={[loggedInUser, SetLoggedInUser]}>
     <Router>
        {/* <Header /> */}
        <Switch>
          <Route exact path='/'>
           <Header/>
            <Home />
            <Products/>           
            <Footer />
          </Route>
          <Route exact path='/login'>
            <Login />
          </Route>
          <PrivateRoute path='/checkout/:_id'>
            <CheckOut/>
          </PrivateRoute>
          <PrivateRoute exact path='/userDashboard'>
            <Header />
            <UserDashboard />
          </PrivateRoute>
          <Route exact path='/admin/dashboard'>
            <AdminDashboard />
          </Route>
          <Route exact path='/admin/addProduct'>
            <AdminProduct />
          </Route>
          <Route path='/search=:searchQuery'>
            <Header />
            <Home />
            <SearchProduct />
            <Footer />
          </Route>

          <Route path='*'>
            <NoMatch />
          </Route>
        </Switch>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
