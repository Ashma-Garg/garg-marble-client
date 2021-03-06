import React, { Component } from 'react'
import { Row, Col } from 'reactstrap'

import { url } from '../../shared/constant'
import { ImageLoader } from '../FunctionalComponent/ImageLoader'
import "../../css/Cart.css"
import axios from 'axios'
import { withRouter } from 'react-router'

class CartDisplay extends Component {
    constructor(props) {
        super(props)
        this.state = {
        }
        this.onchange = this.onchange.bind(this)
    }
    //to provide the inputs with quatities that were saved in db when user last visited the cart page
    componentDidMount() {
        if (this.props.product.Quantity) {
            document.getElementById(this.props.product._id).value = this.props.quantity
        }
        else {
            this.props.disableConfirmButton(true)
        }
    }

    //to open Detail component
    productDetail(id) {
        window.open(`/${this.props.category}/detail/${id}`)
    }

    //add or subtract 1 from quantity when the plus or minus button clicked
    alterQuantity(val) {
        if (parseInt(document.getElementById(this.props.product._id).value) + parseInt(val) >= 1) {
            document.getElementById(this.props.product._id).value = parseInt(document.getElementById(this.props.product._id).value) + parseInt(val)
            document.getElementById(this.props.product._id).addEventListener('change', this.onchange(document.getElementById(this.props.product._id).value))
        }
    }

    //update the price of product depending upon quantity and send it to Cart.js to update totalPrice
    onchange(e) {
        let price = parseInt(document.getElementById(this.props.product._id + "disPrice").innerHTML)
        if (e.target) {
            if (e.target.value.match(/^[0-9]/) && parseInt(e.target.value) <= this.props.product.Quantity) {
                this.props.disableConfirmButton(false)
                document.getElementById(this.props.product._id + "disPrice").innerHTML = (this.props.product.Price * (e.target.value ? e.target.value : 0))
                document.getElementById(this.props.product._id + "errorMessage").classList.add("d-none")
                document.getElementById(this.props.product._id + "outOfStockError").classList.add("d-none")
            }
            else {
                this.props.disableConfirmButton(true)
                document.getElementById(this.props.product._id + "disPrice").innerHTML = 0

                if (parseInt(e.target.value) > this.props.product.Quantity) {
                    document.getElementById(this.props.product._id + "outOfStockError").classList.remove("d-none")
                }
                else {
                    document.getElementById(this.props.product._id + "errorMessage").classList.remove("d-none")
                }
            }

        }
        else {
            if (e <= this.props.product.Quantity) {
                this.props.disableConfirmButton(false)
                document.getElementById(this.props.product._id + "disPrice").innerHTML = (this.props.product.Price * (e ? e : 0))
                document.getElementById(this.props.product._id + "outOfStockError").classList.add("d-none")
            }
            else {
                this.props.disableConfirmButton(true)
                document.getElementById(this.props.product._id + "disPrice").innerHTML = 0
                document.getElementById(this.props.product._id + "outOfStockError").classList.remove("d-none")
            }

        }
        let price1 = parseInt(document.getElementById(this.props.product._id + "disPrice").innerHTML)
        this.props.totalPrice(price, price1)
    }

    //delete product from cart
    deleteFromCart() {
        let customerId = localStorage.getItem("Ctoken")
        let productId = this.props.product._id
        let category = this.props.category
        let cart = "Remove from Cart"
        axios.post(`${url}/customer/add/cart`, { customerId, productId, category, cart })
            .then(res => {
                if (!(res.data.error || res.err)) {
                    window.location.reload()
                }
                else {
                    this.props.notRefreshed(res.data.error)
                }
            })
    }
    render() {
        return (
            <Row className="col-7 col-sm-9 setMargin m-auto" key={this.props.key}>
                <Col className="removePadding" onClick={() => this.productDetail(this.props.product._id)}>
                    <ImageLoader category={this.props.category} image={this.props.product.Image[0] ? this.props.product.Image[0] : null} length={1} />
                </Col>
                <Col onClick={() => this.productDetail(this.props.product._id)}>
                    <div>
                        <div className="sub">
                            <span style={{ color: "#2f736c", fontWeight: "700" }}>{this.props.product.Name}</span> <span style={{ fontWeight: "400", fontSize: "12px", color: "#47918a" }}> ({this.props.product.Size.Width}x{this.props.product.Size.Height})</span>
                        </div>
                    </div>
                    <div>
                        <div className="body2">
                            {this.props.product.Brand}
                        </div>
                    </div>
                    <div>
                        <div style={{ textAlign: 'left' }}><span style={{ paddingRight: "20px" }}>Colour: </span><div style={{ backgroundColor: this.props.product.Colors, width: "20px", height: "20px", borderRadius: "10px", border: "3px solid #1f92b8", display: "inline-block" }}></div></div>
                    </div>
                </Col>
                <Col>
                    <div style={{ position: "absolute", right: "30px" }}>
                        <i onClick={() => this.deleteFromCart()} className="fa fa-trash" style={{ cursor: 'pointer', color: "red", right: 0 }}></i>
                    </div>
                    {this.props.product.Quantity <= 0 ? <div className="w-100 outOfStockOverlay text-light">Out of Stock!</div> :
                        <div style={{ position: "absolute", bottom: "20px" }}>
                            <div style={{ color: "#b8184e", fontWeight: "700" }}>
                                Price: <span id={this.props.product._id + "disPrice"} className={"cartPrice"}>{this.props.product.Price * this.props.quantity}</span>
                            </div>
                            Quantity:

                            <div style={{ display: "inline-block" }}>
                                <div className="p-1 bg-light rounded rounded-pill shadow-sm mb-4">
                                    <div className="input-group" style={{ width: '80px' }}>
                                        <div className="input-group-append">
                                            <i onClick={() => this.alterQuantity(1)} className="fa fa-plus" style={{ paddingRight: "3px", borderRight: "1px solid black" }}></i>
                                        </div>
                                        <input style={{ height: "22px" }} onChange={this.onchange} name="quantity" id={this.props.product._id} type="text" aria-describedby="button-addon1" className="form-control border-0 bg-light" />
                                        <div>
                                            <i onClick={() => this.alterQuantity(-1)} className="fa fa-minus" style={{ paddingLeft: "3px", borderLeft: "1px solid black" }}></i>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="text-danger d-none" style={{ fontSize: '0.8rem' }} id={this.props.product._id + "errorMessage"}>
                                Please enter positive value!
                            </div>
                            <div className="text-danger d-none" style={{ fontSize: '0.8rem' }} id={this.props.product._id + "outOfStockError"}>
                                Out of stock. Try small quantitty.
                            </div>
                        </div>}

                </Col>
            </Row>
        )
    }
}
export default withRouter(CartDisplay);