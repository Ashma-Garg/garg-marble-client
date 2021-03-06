import React, { Component } from 'react'
import axios from 'axios'
import { Row, Col, Button } from 'reactstrap'
import { store } from 'react-notifications-component';

import { url } from '../shared/constant'

import SideBar from './CommonComponents/SideBar'
import SideNavbar from './CommonComponents/SideNavbar';
import Login from './Login'
import CartDisplay from './CommonComponents/CartDisplay'
import SearchBar from './CommonComponents/SearchBar';
// import socket from 'socket.io-client'

// const io=socket('/')
let notification = {
    insert: "top",
    container: "top-right",
    animationIn: ["animate__animated", "animate__fadeIn"],
    animationOut: ["animate__animated", "animate__fadeOut"],
    dismiss: {
        duration: 2000
    }
}
class Cart extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: [],
            isModalOpen: false,
            notrefresh: null,
            total: 0,
            cartLength: Number,
            isConfirmDisable: Boolean,
            disable_array: []
        }
        this.autoBagUpdate = this.autoBagUpdate.bind(this)
        this.confirmorder = this.confirmorder.bind(this)
    }

    componentDidMount() {
        let customerId = localStorage.getItem("Ctoken")
        //Cart component will only be visible if customer is logged in
        if (customerId) {
            //service to list all products in Cart
            axios.get(`${url}/customer/cart/${customerId}`)
                .then(res => {
                    //this variable is so that we can use this cart array's value later in ProductDisplay category field 
                    let cart = res.data
                    this.setState({
                        cartLength: cart.length
                    })
                    if (this.state.cartLength <= 0) {
                        this.setState({
                            isConfirmDisable: true
                        })
                    }
                    else {
                        this.setState({
                            isConfirmDisable: false
                        })
                    }
                    //this service is to find data for every prouct listed in cart
                    axios.all(res.data.map((cartData) => axios.get(`${url}/${cartData.category}/cartInfo/${cartData.productId}`)))
                        .then(axios.spread((...productsInfo) => {
                            this.setState({
                                //productsInfo is an array of all cart's product's items and that data is an array itself
                                data: productsInfo.map((productInfo, i) => {
                                    //initialize value of disable_array as false which says thart initially confirm button will not be disabled
                                    this.state.disable_array.push(false)
                                    return (
                                        productInfo.data.map((info, index) => {
                                            //to get Total amount of products added in bag
                                            if (info.Quantity > 0) {
                                                this.setState({
                                                    total: this.state.total + (cart[i].Quantity * info.Price)
                                                })
                                            }
                                            if (info._id) {
                                                return (<CartDisplay
                                                    totalPrice={(price, price1) => this.totalPrice(price, price1)}
                                                    toggleModal={() => this.toggleModal()}
                                                    notRefreshed={(res) => this.notRefreshed(res)}
                                                    quantity={cart[i].Quantity}
                                                    category={cart[i].category} product={info}
                                                    disableConfirmButton={(isConfirmDisable) => this.disableConfirmButton(isConfirmDisable, i)} />)
                                            }
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
    async autoBagUpdate() {
        if (!this.state.isConfirmDisable) {
            let l = document.querySelectorAll("input[name=quantity]")
            let i = 0
            let customerId = localStorage.getItem("Ctoken")
            var price = document.getElementsByClassName("cartPrice")
            let total = 0
            while (l[i]) {
                let quantity = l[i].value
                let productId = l[i].id
                total = total + (parseInt(price[i].innerHTML))
                await axios.post(`${url}/customer/cart/updateQuantity`, { customerId, productId, quantity })
                    .then(res => {

                    })
                i++;
            }
            this.setState({
                total: total
            })
        }

    }

    //function to update the price as soon as quantity is changed by user
    totalPrice(price, price1) {
        this.setState({
            total: this.state.total - price + price1
        })
    }

    //array to check even if a single condition for a single cart item fails
    disableConfirmButton(isConfirmDisable, index) {
        this.state.disable_array.splice(index, 1, isConfirmDisable)
        let i = 0, flag = 0;
        while (i < this.state.disable_array.length) {
            if (this.state.disable_array[i] === true) {
                flag = 1
                break
            }
            else {
                flag = 0
            }
            i++;
        }
        if (flag == 0) {
            this.setState({
                isConfirmDisable: false
            })
        }
        else {
            this.setState({
                isConfirmDisable: true
            })
        }
    }
    callSocketService() {
        // io.emit("raise","Socket Raised")
    }
    async confirmorder() {
        await this.autoBagUpdate()
        let customerId = localStorage.getItem("Ctoken")
        let total = this.state.total
        await axios.check
        axios.post(`${url}/masterproducts/confirmorder`, { customerId, total })
            .then(res => {
                if (res.data.msg) {
                    store.addNotification({
                        ...notification,
                        title: res.data.msg,
                        message: "You can check your orders in MyOrders on Right hand side Navbar.",
                        type: "success"

                    });
                    document.getElementById('cart').style.display = "none"
                    this.setState({
                        total: 0
                    })
                }
                else if (res.data.error) {
                    store.addNotification({
                        ...notification,
                        title: "Order Not Confirmed!",
                        message: res.data.error,
                        type: "danger"
                    });
                }
            })
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
                    <SearchBar className="col-12" />
                    <Row className="col-10" style={{ marginTop: "5rem" }}>
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
                    <Row style={{ marginTop: "5rem" }}>
                        <Col className="offset-3 col-5 ml-auto">
                            <p className="ml-auto" style={{ color: "darkkhaki", fontWeight: "700" }}>Total: {this.state.total}</p>
                        </Col>
                    </Row>
                    <div id="cart">
                        {this.state.data}
                    </div>
                    {/* This button navigates to other location which will trigger autoUpdatebag automatically. */}
                    {/* <a href="/toilet">*/}
                    {/* <Button className="mt-3" onClick={()=>this.callSocketService()}>Confirm Order</Button> */}
                    <Button disabled={this.state.isConfirmDisable} className="mt-3" onClick={this.confirmorder}>Confirm Order</Button>
                    {/*</a> */}

                    <SideBar hideAddProduct="true" />
                </div>

            )
        }
        else {
            return (
                <div style={{ overflowX: 'hidden' }}>
                    <SideNavbar />
                    <SearchBar className="col-12" />
                    <Row className="col-10" style={{ marginTop: "10rem", marginLeft: "65px" }}>
                        <Col className="col-12">
                            <div className="alert alert-danger alert-dismissible fade show" role="alert">
                                <p>Please Login to view your Cart List</p>
                            </div>
                        </Col>
                    </Row>
                    {this.state.isModalOpen && <Login isModalOpen={this.state.isModalOpen} toggleModal={() => this.toggleModal()} />}
                    <SideBar hideAddProduct="true" />
                </div>
            );
        }
    }
}

export default Cart;