import React, { Component } from 'react'
import { Row, Col, Button } from 'reactstrap'
import axios from 'axios';
import { store } from 'react-notifications-component';

import { url } from '../../shared/constant';

import SideNavbar from './SideNavbar';
import SearchBar from './SearchBar';
import SideBar from './SideBar';
import {ImageLoader} from '../FunctionalComponent/ImageLoader'

let notification = {
    insert: "top",
    container: "top-right",
    animationIn: ["animate__animated", "animate__fadeIn"],
    animationOut: ["animate__animated", "animate__fadeOut"],
    dismiss: {
        duration: 2000
    }
}
class OrderDetailDisplay extends Component {
    constructor(props) {
        super(props)
        this.state = {
            orderId: this.props.match.params.orderid,
            customerId: localStorage.getItem("Ctoken"),
            orderExpandedDetails: null,
            productList: null,
            BagItems: null,
            total: null,
            Date: null
        }
        this.cancelOrder = this.cancelOrder.bind(this)
    }
    async componentDidMount() {
        const status=new URLSearchParams(window.location.search)
        const s=status.get("status")
        this.setState({
            Status:s
        })
        if (localStorage.getItem("Ctoken")) {
            if (s === 'pending') {
                await axios.get(`${url}/customer/order/${this.state.customerId}/${this.state.orderId}`)
                    .then(res => {
                        this.setState({
                            BagItems: res.data.Bag,
                            Date: res.data.OrderDate,
                            total: res.data.Total
                        })
                    })
            }
            else if (s === "placed") {
                let status="Cancelled"
                await axios.post(`${url}/customer/order/${this.state.customerId}/${this.state.orderId}`, {status})
                    .then(res => {
                        this.setState({
                            BagItems: res.data.Bag,
                            Date: res.data.OrderDate,
                            total: res.data.Total
                        })
                    })
            }
        }
        else if (localStorage.getItem("Otoken")) {
            if (s === "cancelled") {
                let status="Cancelled"
                await axios.post(`${url}/owner/order/${this.state.orderId}`, { status })
                    .then(res => {
                        this.setState({
                            BagItems: res.data.Bag,
                            Date: res.data.OrderDate,
                            total: res.data.Total
                        })
                    })
            }
            else if(s==='pending'){
                await axios.get(`${url}/owner/order/${this.state.orderId}`)
                    .then(res => {
                        this.setState({
                            BagItems: res.data.Bag,
                            Date: res.data.OrderDate,
                            total: res.data.Total
                        })
                    })
            }

        }
        await axios.all(this.state.BagItems.map((bagItems) => axios.get(`${url}/${bagItems.category}/product/${bagItems.productId}`)))
            .then(axios.spread((...productsInfo) => {
                this.setState({
                    //productsInfo is an array of all bag's product's items and that data is an array itself
                    productList: productsInfo.map((productInfo, i) => {
                        return (
                            productInfo.data
                        )
                    })
                })

            }))
        this.setState({
            orderExpandedDetails: this.state.productList.map((product, i) => {
                return (
                    <Col key={i + "key"} className="shadow-lg bg-dark col-12 m-3 p-1" onClick={() => this.productDetail(product.category, product._id)} style={{ border: "3px solid grey", borderRadius: "1rem", height: "fit-content" }}>
                        <Row>
                            <Col className="imageBorder">
                                <ImageLoader category={product.category} image={product.Image[0] ? product.Image[0] : null} length={1} />
                            </Col>
                            <Col style={{ color: "white", fontWeight: "500" }}>
                                <p>{product.Name}-{product.Colors}</p>
                                <p>{product.Brand}</p>
                                <p>Rs. {product.Price * this.state.BagItems[i].Quantity}</p>
                                <p>Quantity: {this.state.BagItems[i].Quantity}</p>
                            </Col>
                        </Row>
                    </Col>
                )
            })
        })
    }
    productDetail(category, id) {
        window.location.href = `/${category}/detail/${id}`
    }
    async cancelOrder() {
        let customerId = this.state.customerId
        await axios.post(`${url}/customer/order/${this.state.orderId}/cancel`, { customerId })
            .then(res => {
                if (res.data.msg) {
                    document.getElementById("detailedOrder").style.display = "none";
                    store.addNotification({
                        ...notification,
                        title: res.data.msg,
                        message: "The order has been cancelled.",
                        type: "danger"
                    });
                }
            })
        window.location.href = "/orders"
    }
    render() {
        if (localStorage.getItem("Ctoken") || localStorage.getItem("Otoken")) {
            return (
                <div>
                    <SideNavbar />
                    <SearchBar className="col-12" />
                    <Row className="col-9 col-sm-10 p-0 ml-auto mr-auto" id="detailedOrder" style={{ marginLeft: "65px", marginTop: "7rem" }} >
                        <Col className="col-6 text-wrap" style={{ textAlign: "left" }}>
                            <span style={{ color: "red", fontWeight: "600" }}>Order Number: </span><span style={{ fontWeight: "300", color: "navy", overflowWrap: 'break-word' }}>{this.state.orderId}</span>
                        </Col>
                        <Col className="col-6" style={{ textAlign: "right" }}>
                            <span style={{ color: "red", fontWeight: "600" }}>Date: </span><span style={{ fontWeight: "300", color: "navy" }}>{this.state.Date}</span>
                        </Col>
                        {this.state.Status==='pending'?<Col className="col-12 mt-3" style={{ textAlign: "right" }}>
                            <Button onClick={this.cancelOrder} className="btn btn-danger btn-md">Cancel Order</Button>
                        </Col>:null}
                        {this.state.orderExpandedDetails ? this.state.orderExpandedDetails : "No details"}
                    </Row>
                    <SideBar />
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
                                <p>Please Login to view your Order Details.</p>
                            </div>
                        </Col>
                    </Row>
                    <SideBar />
                </div>
            );
        }
    }
}

export default OrderDetailDisplay;