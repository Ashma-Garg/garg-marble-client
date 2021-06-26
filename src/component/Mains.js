import React,{Component} from 'react';
import {Switch, Route, Redirect} from 'react-router-dom'

import Homepage from './Homepage'
import Washbasin from './Washbasin'
import WashbasinBrand from './CommonComponents/BrandProducts'
import Taps from './Taps'
import Toilet from './Toilet'
import Detail from './CommonComponents/Detail'
import Wishlist from './Wishlist'
import Profile from './Profile'
import Cart from './Cart'
import LoginOwner from './LoginOwner'
import Confirm from './CommonComponents/Confirm'
import '../css/main.css'
import SearchResults from './CommonComponents/SearchResults';
import Order from './Order'
import OrderDetailDisplay from './CommonComponents/OrderDetailDisplay';
import OwnerOrder from './OwnerOrder'
class MainComp extends Component{
    render(){
        return(
          <Switch>
            <Route exact path='/' component={Homepage}></Route>
            <Route exact path="/profile" component={Profile}></Route>
            <Route exact path='/washbasin' component={Washbasin}></Route>
            <Route exact path='/taps' component={Taps}></Route>
            <Route exact path='/toilet' component={Toilet}></Route>
            <Route exact path='/wishlist' component={Wishlist}></Route>
            <Route exact path="/cart" component={Cart}></Route>
            <Route exact path="/orders" component={Order}></Route>
            <Route exact path='/searchresults' component={SearchResults}></Route>
            <Route exact path="/owner/orders" component={OwnerOrder}></Route>
            <Route exact path="/login/owner" component={LoginOwner}></Route>
            <Route exact path='/order/detail/:orderid' component={OrderDetailDisplay}></Route>
            <Route exact path='/:category/detail/:id' component={Detail}></Route>
            <Route exact path='/confirm/:email/:id' component={Confirm}></Route>
            <Route exact path='/:category/:brand' component={WashbasinBrand}></Route>

            <Redirect to='/'></Redirect>
          </Switch>
        );
    }
}

export default MainComp;