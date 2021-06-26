import React, { Component } from 'react'
import { Row, Col } from 'reactstrap'

import { url } from '../shared/constant'

import SideNavbar from './CommonComponents/SideNavbar';
import SearchBar from './CommonComponents/SearchBar';
import SideBar from './CommonComponents/SideBar';
import { Tab, Tabs } from 'react-bootstrap';
import '../css/Order.css'
import axios from 'axios';
import OrderShortDisplay from './CommonComponents/OrderShortDisplay';

class Order extends Component {
    constructor(props) {
        super(props)
        this.state = {
            customerId: localStorage.getItem("Ctoken"),
            ordertobeplaced:null,
            HavePlaced:null
        }
    }
    async componentDidMount() {
        let customerId = this.state.customerId
        //get customer info to look into customer's order status
        await axios.get(`${url}/customer/info/${customerId}`)
            .then((res) => {
                this.setState({
                    //get orders which needs to be placed(pending orders)
                    ordertobeplaced:res.data.Orders.toBePlaced.map((pendingOrder,i) => {
                        //these pendingOrders are Bag which containes list of products ordered within one order(eg. 3 products at a time)
                                return(<OrderShortDisplay key={i} Bag={pendingOrder} status="pending"/>)
                        }),
                    HavePlaced:res.data.Orders.HavePlaced.map((havePlaced,i) => {
                        //these pendingOrders are Bag which containes list of products ordered within one order(eg. 3 products at a time)
                                return(<OrderShortDisplay key={i} Bag={havePlaced} status="placed"/>)
                        })
                })        
            })
    }

    render() {
        if (localStorage.getItem("Ctoken")) {
            return (
                <div>
                    <SideNavbar />
                    <SearchBar className="col-12" />
                    <Tabs className="col-10 col-sm-11 p-0 navLinkManageStyling" style={{ marginLeft: "70px", marginTop: "7rem" }} defaultActiveKey="description" id="uncontrolled-tab-example">
                        <Tab eventKey="description" title="On the way Orders">
                            {/* <Row id="order" style={{ marginLeft: "70px"}}>
                                <Col className="col-8">
                                    <Row> */}
                                {this.state.ordertobeplaced}
                                {/* </Row>
                                </Col>
                                <Col className="col-4">
                                </Col>
                            </Row> */}
                        </Tab>
                        <Tab eventKey="features" title="Order History">
                            {this.state.HavePlaced}
                        </Tab>
                    </Tabs>
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
                    {/* {this.state.isModalOpen && <Login isModalOpen={this.state.isModalOpen} toggleModal={() => this.toggleModal()} />} */}
                    <SideBar />
                </div>
            );
        }
    }

}

export default Order;