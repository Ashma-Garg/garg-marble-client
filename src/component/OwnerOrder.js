import React,{Component} from 'react'
import {Row,Col} from 'reactstrap'

import {url} from '../shared/constant'

import SideNavbar from './CommonComponents/SideNavbar';
import SearchBar from './CommonComponents/SearchBar';
import SideBar from './CommonComponents/SideBar';
import { Tab, Tabs } from 'react-bootstrap';
import '../css/Washbasin.css'
import axios from 'axios';
import OrderShortDisplay from './CommonComponents/OrderShortDisplay';
class OwnerOrder extends Component{
    constructor(props){
        super(props)
        this.state={
            orders:null,
            Cancelled:null,
            ownerId:localStorage.getItem("Otoken")
        }
    }
    componentDidMount(){
        axios.get(`${url}/owner/orders`)
        .then((res)=>{
            this.setState({
                //get orders which needs to be placed(pending orders)
                orders:res.data.toBePlaced.map((pendingOrder,i) => {
                    //these pendingOrders are Bag which containes list of products ordered within one order(eg. 3 products at a time)
                            return(<OrderShortDisplay key={i+"pending"} Bag={pendingOrder} status="pending"/>)
                    }),
                Cancelled:res.data.Cancelled.map((cancelOrder,i)=>{
                    return(<OrderShortDisplay key={i+"cancel"} Bag={cancelOrder} status="cancelled"/>)
                })
                
            })
        })
    }
    render(){
        if(localStorage.getItem("Otoken")){
        return(
            <div>
                <SideNavbar />
                <SearchBar className="col-12" />
                {/* <Row className="col-11 col-xl-12 p-0 marginTop" style={{ marginLeft: "65px" }} > */}
                        <Tabs className="col-10 col-sm-11 p-0 navLinkManageStyling" style={{ marginLeft: "70px", marginTop: "7rem" }} defaultActiveKey="pending" id="uncontrolled-tab-example">
                            <Tab eventKey="pending" title="Pending Orders">
                                {this.state.orders}
                            </Tab>
                            <Tab eventKey="success" title="Order Placed Successfully">
                                
                            </Tab>
                            <Tab eventKey="cancel" title="Cancelled Orders">
                                {this.state.Cancelled}
                            </Tab>
                            <Tab eventKey="return" title="Returned Orders">
                                
                            </Tab>
                        </Tabs>
                    {/* </Row> */}
                <SideBar  hideAddProduct="true" />
            </div>
        )
        }
        else{
            return(
                <div style={{ overflowX: 'hidden'}}>
                    <SideNavbar />
                    <SearchBar className="col-12"/>
                    <Row className="col-10" style={{marginTop:"10rem",marginLeft:"65px"}}>
                    <Col className="col-12">
                        <div className="alert alert-danger alert-dismissible fade show" role="alert">
                            <p>Please Login to view your Order Details.</p>
                        </div>
                    </Col>
                    </Row>
                    {/* {this.state.isModalOpen && <Login isModalOpen={this.state.isModalOpen} toggleModal={() => this.toggleModal()} />} */}
                    <SideBar  hideAddProduct="true" />
                </div>
            );
        }
    }
}

export default OwnerOrder;