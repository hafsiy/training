import React from 'react';
import{ BrowserRouter as Router , Route} from 'react-router-dom';
import Home from '../src/Component/frontoffice/home/home';
import SignIn from './Component/frontoffice/log/SignIn';
import AddUser from './Component/frontoffice/log/singUp';
import Product from './Component/frontoffice/home/Q_product';
import DetailsProduct from './Component/frontoffice/home/productDetail';
import Cart from './Component/frontoffice/cart/cart';



function Routers(){
  return (
      <Router>
        <div>
          <Route exact path ="/" component ={Home}/>
          <Route path ="/SignIn" component = {SignIn}/>
          <Route path ="/SignUp" component = {AddUser}/>
          <Route path ="/Product" component = {Product}/>
          {/* <Route  path="/Product/:id" render={({match})=><DetailsProduct match={match}/>}/> */}
          <Route path="/product/:id" component={DetailsProduct} />
          <Route path="/Cart" component = {Cart}/>
         
         
          
          {/* <Route  path="/detail/:id" render={({match})=><Detail match={match}/>}/> */}
       
        </div>
      </Router>
  );
}

export default Routers;