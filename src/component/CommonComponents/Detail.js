import React from 'react'
import { Component } from 'react';
import { Row, Col, Button } from 'reactstrap'
import axios from 'axios'

import {url} from '../../shared/constant'

import SideNavbar from './SideNavbar'
import SideBar from './SideBar'
import { ImageLoader } from '../FunctionalComponent/ImageLoader';
import { ColorLoader } from '../FunctionalComponent/ColorLoader';
import ViewModal from '../Modals/ViewModal'
import Login from '../Login';
import { Tab, Tabs } from 'react-bootstrap';
import SearchBar from './SearchBar';

import '../../css/Detail.css'
class Detail extends Component {
    constructor(props) {
        super(props)
        this.state = {
            productId: this.props.match.params.id,
            details: null,
            category: this.props.match.params.category,
            isModalOpen: false,
            product: null,
            cartClass: "col-8 btn btn-outline-warning btn-lg m-5",
            class: "col-8 btn btn-outline-secondary btn-lg",
            wishlist: "Add To Wishlist",
            notrefresh: null,
            isLoginModal: false,
            cart: "Add to Cart"
        }

        this.AddToWIshlist = this.AddToWIshlist.bind(this)
        this.toggleModal = this.toggleModal.bind(this)
        this.AddToCart = this.AddToCart.bind(this)
    }
    async componentWillMount() {
        await axios.get(`${url}/customer/info/${localStorage.getItem("Ctoken")}`)
            .then(CustomerCart => {
                if (CustomerCart.data.Bag && CustomerCart.data.Bag.length) {
                    for (let i = 0; i < CustomerCart.data.Bag.length; i++) {
                        if (CustomerCart.data.Bag[i].category === this.state.category && CustomerCart.data.Bag[i].productId === this.state.productId) {
                            this.setState({
                                cartClass: "col-8 btn btn-warning btn-lg m-5",
                                cart: "Remove from Cart"
                            })
                            break
                        }
                        else {
                            this.setState({
                                cartClass: "col-8 btn btn-outline-warning btn-lg m-5",
                                cart: "Add to Cart"
                            })
                        }
                    }
                }
                else {
                    this.setState({
                        cartClass: "col-8 btn btn-outline-warning btn-lg m-5",
                        cart: "Add to Cart"
                    })
                }
            })
        axios.get(`${url}/${this.state.category}/info/${this.state.productId}`)
            .then(res => {
                this.setState({
                    details: res.data[0].map((p, i) => {
                        return (
                            <Row key={i} className="shadow-lg bg-white rounded rowSize col-11 ml-auto mr-lg-4 marginTopDetail">
                                <Col className="col-12 col-xl-7 manageHeight" onClick={p.Image.length ? () => this.toggleViewModal(p) : null}>
                                    <ImageLoader className="col-12" image={p.Image} length={p.Image.length} category={this.state.category} />
                                </Col>
                                <Col className="mt-5 mb-5 col-12 col-xl-5">
                                    <h1 style={{ color: "darkkhaki", fontWeight: "bolder" }}>{p.Name}</h1>
                                    <h2>{p.Brand}</h2>
                                    <h1>Rs. {p.Price}</h1>
                                    <p>On order below than Rs. 1800 shipping Charges will be applied.</p>
                                    <Row className="col-12">
                                        <ColorLoader color={res.data[2]} currentProductId={this.state.productId} colorProductId={res.data[1]} category={this.state.category} />
                                    </Row>
                                    <h3>Size(Width * Height): {p.Size.Width}x{p.Size.Height}</h3>
                                    <div className="col-8 bg-warning m-auto"><p>Choose color to know your product price.</p></div>
                                    <Button onClick={this.AddToCart} id={p._id + "cart"} className={this.state.cartClass}><i className="fa fa-shopping-bag" aria-hidden="true"></i>{this.state.cart}</Button>
                                    {
                                        p.Customers.map((customer) => {
                                            if (customer === localStorage.getItem("Ctoken")) {
                                                this.setState({
                                                    class: "col-8 btn btn-secondary btn-lg",
                                                    wishlist: "Wishlisted"
                                                })
                                                return;
                                            }
                                            else {
                                                this.setState({
                                                    class: "col-8 btn btn-outline-secondary btn-lg",
                                                    wishlist: "Add To Wishlist"
                                                })
                                            }
                                        })
                                    }
                                    <Button onClick={this.AddToWIshlist} id={p._id + "button"} className={this.state.class}><i id={p._id + "button"} className="fa fa-heart custom-fa-heart" aria-hidden="true"></i>{this.state.wishlist}</Button>
                                    <Tabs className="mt-3 navLinkManageStyling" defaultActiveKey="description" id="uncontrolled-tab-example">
                                        <Tab eventKey="description" title="Description">
                                            {p.Description}
                                        </Tab>
                                        <Tab eventKey="features" title="Features">
                                            {p.Features}
                                        </Tab>
                                    </Tabs>
                                </Col>
                            </Row>
                        );
                    })
                })
            })
    }
    toggleViewModal(p) {
        this.setState({
            isModalOpen: !this.state.isModalOpen,
            product: p
        })
    }
    AddToWIshlist(e) {
        const customerId = localStorage.getItem('Ctoken')
        let productId = e.target.id
        productId = productId.substring(0, productId.length - 6)
        let color;
        let category = this.state.category
        if (this.state.wishlist == "Wishlisted") {
            color = "rgb(255, 0, 0)"
        }
        else {
            color = "rgb(211, 211, 211)"
        }
        if (customerId) {
            axios.post(`${url}/customer/wishlist`, { customerId, productId, color, category })
                .then(res => {
                    return;
                })
            axios.post(`${url}/${this.state.category}/addCustomer`, { productId, customerId, color })
                .then(res => {
                    if (res.data.message) {
                        this.setState({
                            notRefreshed: "Please refresh the page. Some of the items has been Updated in Wishlist.",
                            class: ["col-8", "btn", "btn-outline-secondary", "btn-lg"],
                            wishlist: this.state.wishlist
                        })
                    }
                    else{
                        window.location.reload()
                    }
                })

            setTimeout(() => {
                document.getElementById(e.target.id).innerHTML = `<i id=${productId + "button"} class="fa fa-heart custom-fa-heart" aria-hidden="true"></i>`
                const b = document.getElementById(e.target.id)
                b.classList = ""
                b.classList.add(this.state.class[0], this.state.class[1], this.state.class[2], this.state.class[3])
                var newElem = document.createTextNode(this.state.wishlist)
                b.appendChild(newElem)

            }, 100)
        }
        else {

            this.toggleModal()
        }
    }
    toggleModal() {
        this.setState({
            isLoginModal: !this.state.isLoginModal
        })
    }

    AddToCart(e) {

        const customerId = localStorage.getItem('Ctoken')
        let productId = this.state.productId
        let category = this.state.category
        let cart = this.state.cart
        if (customerId) {
            axios.post(`${url}/customer/add/cart`, { customerId, productId, category, cart })
                .then(res => {
                    if (!(res.data.error || res.err)) {
                        window.location.reload()
                    }
                    else {
                        this.setState({
                            notRefreshed: res.data.error
                        })
                    }
                })
        }
        else {
            this.toggleModal()
        }
    }
    render() {
        return (
            <div style={{ overflowX: 'hidden' }}>

                <SideNavbar/>
                <SearchBar/>
                {this.state.notRefreshed ?
                    <div className="alert alert-danger alert-dismissible fade show" role="alert">
                        <p>{this.state.notRefreshed}</p>
                        <Button className="close" data-dismiss="alert" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </Button>
                    </div> : null}
                {this.state.details}
                <SideBar category={this.props.match.params.category} />
                {this.state.isModalOpen && <ViewModal category={this.state.category} toggleViewModal={() => this.toggleViewModal()} product={this.state.product} isModelOpen={this.state.isModalOpen} />}
                {this.state.isLoginModal && <Login isModalOpen={this.state.isLoginModal} toggleModal={() => this.toggleModal()} />}
            </div>
        )
    }
}

export default Detail;