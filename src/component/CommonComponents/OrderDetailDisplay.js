import React, { Component } from 'react'
import { Row, Col, Button } from 'reactstrap'
import axios from 'axios';
import { store } from 'react-notifications-component';

import { url } from '../../shared/constant';

import SideNavbar from './SideNavbar';
import SearchBar from './SearchBar';
import SideBar from './SideBar';
import { ImageLoader } from '../FunctionalComponent/ImageLoader'

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
            Date: null,
            OrderCustomerId: null,
            OrderCustomerDetails: null
        }
        this.cancelOrder = this.cancelOrder.bind(this)
    }
    
    async componentDidMount() {
        const queryParams = new URLSearchParams(window.location.search)
        const s=queryParams.get('status')
        this.setState({
            Status: queryParams.get("status"),
            OrderCustomerId: queryParams.get("customer")
        })
        if (localStorage.getItem("Ctoken")) {
            await this.orderOfCustomer(s)
        }
        else if (localStorage.getItem("Otoken")) {
           await this.orderOfSeller(queryParams)
        }
        
       await this.getAllOrderItems()
       await this.setDisplayOfOrderItems()
        
    }
    async orderOfCustomer(s){
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
            let status = "Cancelled"
            await axios.post(`${url}/customer/order/${this.state.customerId}/${this.state.orderId}`, { status })
                .then(res => {
                    this.setState({
                        BagItems: res.data.Bag,
                        Date: res.data.OrderDate,
                        total: res.data.Total
                    })
                })
        }
    }
    async orderOfSeller(status){
        let s=status.get("status")
        axios.get(`${url}/customer/info/${status.get("customer")}`)
        .then(res => {
            this.setState({
                OrderCustomerDetails:
                    <div style={{ textAlign: "left", overflowWrap: 'break-word' }}>
                        <p className="p-0 m-0"><b>Email ID:</b> {res.data.EmailId}</p>
                        <p className="p-0 m-0"><b>Name:</b> {res.data.FirstName} {res.data.LastName}</p>
                        <p className="p-0 m-0"><b>Address:</b> {res.data.Address}, {res.data.City}, {res.data.State}, {res.data.Country}</p>
                        <p className="p-0 m-0"><b>Pincode:</b> {res.data.Pincode}</p>
                        <p className="p-0 m-0"><b>Phone No.</b> {res.data.PhoneNo}</p>
                    </div>
            })
        })
    if (s === "cancelled") {
        let status = "Cancelled"
        await axios.post(`${url}/owner/order/${this.state.orderId}`, { status })
            .then(res => {
                this.setState({
                    BagItems: res.data.Bag,
                    Date: res.data.OrderDate,
                    total: res.data.Total
                })
            })
    }
    else if (s === 'pending') {
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
    async getAllOrderItems(){
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
    }
    setDisplayOfOrderItems(){
        this.setState({
            orderExpandedDetails: this.state.productList.map((product, i) => {
                return (
                    <Col key={i + "key"} className="shadow-lg bg-dark col-12 col-md-6 mt-3" onClick={() => this.productDetail(product.category, product._id)} style={{ border: "3px solid grey", borderRadius: "1rem", height: "fit-content" }}>
                        <Row>
                            <Col className="imageBorder p-0">
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
                    <Row className="col-9 col-sm-10 p-0 ml-md-auto mr-md-auto" id="detailedOrder" style={{ marginLeft: "70px", marginTop: "7rem" }} >
                        <Col className="col-6 text-wrap" style={{ textAlign: "left" }}>
                            <span style={{ color: "red", fontWeight: "600" }}>Order Number: </span><span style={{ fontWeight: "300", color: "navy", overflowWrap: 'break-word' }}>{this.state.orderId}</span>
                        </Col>
                        <Col className="col-6" style={{ textAlign: "right" }}>
                            <span style={{ color: "red", fontWeight: "600" }}>Date: </span><span style={{ fontWeight: "300", color: "navy" }}>{this.state.Date}</span>
                        </Col>
                        {this.state.OrderCustomerId ?
                            <Col className="col-6">
                                {this.state.OrderCustomerDetails}
                            </Col> : <Col className="col-6"></Col>}
                        {this.state.Status === 'pending' ? <Col className="col-6 mt-3" style={{ textAlign: "right" }}>
                            <Button onClick={this.cancelOrder} disabled={Math.round((new Date()-new Date(this.state.Date))/(1000*60*60*24))<3?false:true} className="btn btn-danger btn-md">Cancel Order</Button>
                        </Col> : <Col className="col-6"></Col>}
                        {this.state.orderExpandedDetails ? this.state.orderExpandedDetails : "No details"}
                    </Row>
                    <SideBar hideAddProduct={true}/>
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