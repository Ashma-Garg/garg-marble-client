import axios from 'axios'
import React, { Component } from 'react'
import { Row, Col } from 'reactstrap'
import {Link} from 'react-router-dom'

import { url } from '../../shared/constant'

import { ImageLoader } from '../FunctionalComponent/ImageLoader'

class OrderShortDisplay extends Component {
    constructor(props) {
        super(props)
        this.state = {
            Bag: this.props.Bag,
            displayProduct: null,
            productList: null,
            Status:this.props.status,
            CustomerId:this.props.Bag.CustomerId?this.props.Bag.CustomerId:null
        }
        this.orderDetails = this.orderDetails.bind(this)
    }
    async componentDidMount() {
        //this.state.bag was index of Bag- Bag contains list of products ordered within one porder
        //this is  to get info of products
        console.log(this.state.Status)
        await axios.all(this.state.Bag.Bag.map((bagItems) => axios.get(`${url}/${bagItems.category}/product/${bagItems.productId}`)))
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
            displayProduct: this.state.productList.map((product) => {
                return <Col className="col-5 col-sm-3 col-md-3 p-1 controlHeight"><ImageLoader category={product.category} image={product.Image[0] ? product.Image[0] : null} length={1} /></Col>
            })
        })
    }
    orderDetails() {
        // document.getElementById("openOrderDetails").click()
        window.location.href=`/order/detail/${this.state.Bag._id}?status=${this.state.Status}&customer=${this.state.CustomerId}`
    }
    render() {
        return (
            <Row className="col-9 col-sm-10 col-md-11 p-1 mt-5" id="order" onClick={this.orderDetails} style={{ borderBottom: "2px lightgrey solid", marginLeft: "80px" }}>
                <Col className="col-7">
                <p style={{textAlign:"left"}}>Date: <span style={{fontWeight:"100",fontSize:"0.8rem"}}>{new Date(this.state.Bag.OrderDate).toLocaleDateString()}</span></p>
                    <Row>
                        {this.state.displayProduct}
                    </Row>
                </Col>
                <Col className="col-5 pr-2 pr-md-5 mt-auto" style={{ textAlign: 'right', fontWeight: "700" ,height:"fit-content"}}>
                    <p className="p-0 m-0">Rs. {this.state.Bag.Total}</p>
                    <p className="p-0 m-0">Order Id: <span style={{fontWeight:"100",fontSize:"0.8rem",overflowWrap:'break-word'}}>{this.state.Bag._id}</span></p>
                    {this.state.Bag.Status?<p>Status: <span style={{fontWeight:"100",fontSize:"0.8rem",overflowWrap:'break-word'}}>{this.state.Bag.Status}</span></p>:null}
                </Col>
                {/* <Col>
                <Link id="openOrderDetails"
                to={{
                  pathname: `/order/detail/${this.state.Bag._id}`,
                  state: {
                    status: "Cancelled",
                  },
                }}>{this.state.Status}
                </Link>
                </Col> */}
            </Row>
        )
    }
}

export default OrderShortDisplay;