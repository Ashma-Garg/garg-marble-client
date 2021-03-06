import React, { Component } from 'react'
import { Card, CardBody, CardTitle, Col, Row } from 'reactstrap'
import axios from 'axios'

import { url } from '../../shared/constant'

import { ImageLoader } from '../FunctionalComponent/ImageLoader'
import '../../css/ProductDisplay.css'

class ProductDisplay extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isOpen: false,
            color: "lightgrey",
            notRefreshed: null
        }
        this.AddToWishlist = this.AddToWishlist.bind(this)
        this.deleteProduct = this.deleteProduct.bind(this)
    }
    componentDidMount() {

        if (this.props.product.Customers) {
            this.props.product.Customers.every((customer) => {
                if (customer == localStorage.getItem('Ctoken')) {
                    this.setState({
                        color: "red"
                    })
                    return false
                }
                else {
                    this.setState({
                        color: "lightgrey"
                    })
                    return true;
                }
            })
        }
    }
    deleteProduct(e) {
        this.props.toggleDeleteProductModal()
        //start from toggleModal of AddModal(take reference from sidebar)
    }
    AddToWishlist(e) {
        let productId = this.props.product._id
        let customerId = localStorage.getItem("Ctoken")
        let category = this.props.category
        if (customerId) {
            var color = window.getComputedStyle(document.getElementById(e.target.id), null).getPropertyValue('color')
            axios.post(`${url}/customer/wishlist`, { customerId, productId, color, category })
                .then(res => {
                    return;
                })
            axios.post(`${url}/${this.props.category}/addCustomer`, { productId, customerId, color })
                .then(res => {
                    if (res.data.message) {
                        this.setState({
                            notRefreshed: "Please refresh the page. Some of the items has been Updated in Wishlist."
                        })
                    }
                    else if (color === 'rgb(211, 211, 211)') {
                        document.getElementById(e.target.id).style.color = "red";
                        let corr = document.getElementById(e.target.id).getBoundingClientRect()
                        this.props.addanimation(true, corr.x, corr.y)
                        this.setState({
                            notRefreshed: null
                        })
                    }
                    else {
                        document.getElementById(e.target.id).style.color = "lightgrey";
                        this.props.addanimation(false, null, null)
                        this.setState({
                            notRefreshed: null
                        })
                    }
                    this.props.notRefreshed(this.state.notRefreshed)
                })
        }
        else {
            this.props.toggleModal();
        }
    }
    productDetail(id) {
        window.open(`/${this.props.category}/detail/${id}`)
    }
    render() {
        return (
            <Col className="col-10 col-sm-5 col-lg-4 col-xl-2 m-1 m-auto m-sm-0 m-lg-auto m-xl-2" id={this.props.product._id + this.props.product.Name}>

                {/* Will only be visible if window size is xs, sm */}
                <Row onClick={() => this.productDetail(this.props.product._id)} className="visibilityAccordance col-10 d-sm-none mt-5">
                    <Row className="col-12 p-0 m-auto flex-nowrap">
                        <Col className="removePadding">
                            <ImageLoader category={this.props.category} image={this.props.product.Image[0] ? this.props.product.Image[0] : null} length={1} />
                        </Col>
                    </Row>
                    <Row className="col-12 p-0 m-auto">
                        {this.props.product.Quantity <= 0 ?
                            <Col className="col-12 outOfStockOverlay text-light" style={{ textAlign: "right", borderBottomLeftRadius: '8px', borderBottomRightRadius: '8px' }}>
                                Out of Stock
                            </Col>
                            : null
                        }
                        <Col className="pb-3">
                            <div variant="subtitle1">
                                <div className="sub">
                                    {this.props.product.Name} <span style={{ fontWeight: "100", fontSize: "12px" }}> {this.props.product.Size.Width}x{this.props.product.Size.Height}</span>
                                </div>
                            </div>
                            <div variant="bod2">
                                <div className="body2">
                                    {this.props.product.Brand}
                                </div>
                            </div>
                            <div style={{ fontWeight: "100", fontSize: "12px" }}>
                                {this.props.product.Colors}
                            </div>
                        </Col>
                    </Row>
                </Row>

                {/* Will only be visible if window size is md or lg or xl */}
                <Card className="shadow-lg mb-2 bg-white rounded visibilityAccess d-none d-sm-block">
                    <CardTitle id={this.props.product._id} onClick={() => this.productDetail(this.props.product._id)} style={{ padding: "0px" }}>
                        <ImageLoader category={this.props.category} image={this.props.product.Image[0] ? this.props.product.Image[0] : null} length={1} />
                    </CardTitle>
                    <CardBody id={this.props.product._id} style={{ maxHeight: "fit-content", paddingTop: "0" }}>
                        <Row>
                            <Col>
                                <div className="subCard">
                                    {this.props.product.Name.substring(0,16)}{this.props.product.Name.length>16?"...":null}
                                </div>
                                <div style={{ fontWeight: "100", fontSize: '0.7rem', fontFamily: "monospace", textAlign: "left" }}>
                                    {this.props.product.Colors}   <span style={{ fontFamily: "monospace" }}>{this.props.product.Size.Width}x{this.props.product.Size.Height}</span>
                                </div>

                            </Col>
                        </Row>
                        <Row>
                            {this.props.product.Quantity <= 0 ?
                                <Col className="col-12 outOfStockOverlay text-light">
                                    Out of Stock
                                </Col>
                                : null
                            }
                            <Col className="col-8">
                                <div className="body2Card">
                                    <p style={{ margin: "0" }}>{this.props.product.Brand.substring(0,10)}{this.props.product.Brand.length>10?"...":null}</p>
                                    <p style={{ margin: "0" }}>Rs. {this.props.product.Price}</p>
                                </div>
                            </Col>
                            <Col className="col-4">
                                {localStorage.getItem("Otoken") ?
                                    <div className="col-2 ml-auto"><i id={this.props.product._id + "edit"} onClick={this.deleteProduct} className="fa fa-trash fa-2x" style={{ color: 'red' }}></i></div>
                                    :
                                    <div className="col-2 ml-auto"><i id={this.props.product._id + "button"} onClick={this.AddToWishlist} className="fa fa-heart fa-2x" style={{ color: this.state.color }} aria-hidden="true"></i></div>
                                }

                            </Col>
                        </Row>
                    </CardBody>
                </Card>
            </Col>

        );
    }
}

export default ProductDisplay;

