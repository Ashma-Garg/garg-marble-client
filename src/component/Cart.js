import React, { Component } from 'react'
import axios from 'axios'
import { Row, Col, Button } from 'reactstrap'

import SideBar from './CommonComponents/SideBar'
import SideNavbar from './CommonComponents/SideNavbar';
import Login from './Login'
import CartDisplay from './CommonComponents/CartDisplay'
// import socket from 'socket.io-client'

// const io=socket('/')

class Cart extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: [],
            isModalOpen: false,
            notrefresh: null,
            total: 0
        }
        this.autoBagUpdate = this.autoBagUpdate.bind(this)
    }

    componentDidMount() {
        let customerId = localStorage.getItem("Ctoken")
        //Cart component will only be visible if customer is logged in
        if (customerId) {
            //service to list all products in Cart
            axios.get(`https://garg-marble-server.herokuapp.com/customer/cart/${customerId}`)
                .then(res => {
                    //this variable is so that we can use this cart array's value later in ProductDisplay category field 
                    let cart = res.data
                    //this service is to find data for every prouct listed in cart
                    axios.all(res.data.map((cartData) => axios.get(`https://garg-marble-server.herokuapp.com/${cartData.category}/cartInfo/${cartData.productId}`)))
                        .then(axios.spread((...productsInfo) => {
                            this.setState({
                                //productsInfo is an array of all cart's product's items and that data is an array itself
                                data: productsInfo.map((productInfo, i) => {
                                    return (
                                        productInfo.data.map(info => {
                                            //to get Total amount of products added in bag
                                            this.setState({
                                                total: this.state.total + (cart[i].Quantity * info.Price)
                                            })
                                            return (<CartDisplay
                                                totalPrice={(price, price1) => this.totalPrice(price, price1)}
                                                toggleModal={() => this.toggleModal()}
                                                notRefreshed={(res) => this.notRefreshed(res)}
                                                quantity={cart[i].Quantity}
                                                category={cart[i].category} product={info} />)
                                        }))
                                })
                            })

                        }))
                })

            //to trigger autoUpdateBag when user is navigated away from /cart component
            window.addEventListener("beforeunload", this.autoBagUpdate)
        }
        //when no customer is signed in
        else {
            setTimeout(() => {
                this.setState({
                    isModalOpen: !this.state.isModalOpen
                })
            }, 5000)
        }

    }

    //to trigger autoUpdateBag when user is navigated away from /cart component
    componentWillUnmount() {
        window.removeEventListener("beforeunload", this.autoBagUpdate);
    }

    //handles- when changes are made but not saved, it will save the changes automatically
    autoBagUpdate() {
        let l = document.querySelectorAll("input[name=quantity]")
        let i = 0
        let customerId = localStorage.getItem("Ctoken")
        var price = document.getElementsByClassName("cartPrice")
        let total = 0
        while (l[i]) {
            let quantity = l[i].value
            let productId = l[i].id
            total = total + (parseInt(price[i].innerHTML))
            axios.post(`https://garg-marble-server.herokuapp.com/customer/cart/updateQuantity`, { customerId, productId, quantity })
                .then(res => {

                })
            i++;
        }
        this.setState({
            total: total
        })
    }

    //function to update the price as soon as quantity is changed by user
    totalPrice(price, price1) {
        this.setState({
            total: this.state.total - price + price1
        })
    }
    callSocketService(){
        // io.emit("raise","Socket Raised")
    }
    notRefreshed(res) {
        this.setState({
            notrefresh: res
        })
    }
    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        })
    }
    render() {
        if (localStorage.getItem("Ctoken")) {
            return (
                <div style={{ overflowX: 'hidden' }}>
                    <SideNavbar />
                    <Row className="col-10 offset-2">
                        <Col className="col-8 m-auto">
                            {this.state.notrefresh ?
                                <div className="alert alert-danger alert-dismissible fade show" role="alert">
                                    <p>{this.state.notrefresh}</p>
                                    <Button className="close" data-dismiss="alert" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </Button>
                                </div> : null
                            }
                        </Col>
                    </Row>
                    <Row>
                        <Col className="offset-3 col-5 ml-auto">
                            <p className="ml-auto" style={{ color: "darkkhaki", fontWeight: "700" }}>Total: {this.state.total}</p>
                        </Col>
                    </Row>
                    {this.state.data}

                    {/* This button navigates to other location which will trigger autoUpdatebag automatically. */}
                    {/* <a href="/toilet">*/}
                    <Button onClick={()=>this.callSocketService()}>Confirm Order</Button>
                    {/*</a> */}
                    
                    <SideBar category='cart' />
                </div>

            )
        }
        else {
            return (
                <div style={{ overflowX: 'hidden' }}>
                    <SideNavbar />
                    <Row className="col-10 offset-2">
                        <Col className="col-8 m-auto">
                            <div className="alert alert-danger alert-dismissible fade show" role="alert">
                                <p>Please Login to view your Cart List</p>
                            </div>
                        </Col>
                    </Row>
                    {this.state.isModalOpen && <Login isModalOpen={this.state.isModalOpen} toggleModal={() => this.toggleModal()} />}
                    <SideBar category='cart' />
                </div>
            );
        }
    }
}

export default Cart;