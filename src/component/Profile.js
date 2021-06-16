import axios from 'axios';
import React, { Component } from 'react'
import { Button, Col, Row, Table } from 'reactstrap';

import { url } from '../shared/constant'
import SearchBar from './CommonComponents/SearchBar';

import SideBar from './CommonComponents/SideBar';
import SideNavbar from './CommonComponents/SideNavbar';
import '../css/Profile.css'

class Profile extends Component {
    constructor(props) {
        super(props)
        this.state = {
            id: localStorage.getItem("Ctoken"),
            owner:localStorage.getItem("Otoken"),
            username: null,
            email: null,
            phone: Number,
            Address: null
        }
        this.editable = this.editable.bind(this)
        this.removeeEditable = this.removeeEditable.bind(this)
    }
    componentWillMount() {
        if(this.state.id){
        axios.get(`${url}/customer/info/${this.state.id}`)
            .then(res => {
                if (res.data && res.data.FirstName) {
                    this.setState({
                        userName: res.data.FirstName + " " + res.data.LastName,
                        email: res.data.EmailId,
                        phone: res.data.PhoneNo,
                        Address: res.data.Address + ", " + res.data.Pincode + ", " + res.data.City + ", " + res.data.State + ", " + res.data.Country
                    })
                }
                else {
                    console.log(res.err)
                }
            })
        }
    }
    editable() {
        let editelements = document.getElementsByClassName("editable");
        let i = 0;

        while (editelements[i]) {
            editelements[i].contentEditable = true;
            i++;
        }
        editelements[0].focus();
    }
    removeeEditable() {
        let editelements = document.getElementsByClassName("editable");
        let i = 0;
        let array = []
        while (editelements[i]) {
            array.push(editelements[i].innerHTML)
            editelements[i].contentEditable = false;
            i++;
        }
        axios.post(`${url}/customer/updateInfo/${this.state.id}`, { array })
            .then(res => {
                this.setState({
                    userName: res.data.FirstName + " " + res.data.LastName,
                    email: res.data.EmailId,
                    phone: res.data.PhoneNo
                })
            })
    }
    render() {
        return (
            <div>
                <SideNavbar category={"profile"} />
                <SearchBar/>
                {this.state.id ?
                    <Row className="col-11" style={{marginLeft:"65px"}}>
                        <Table className="col-9 ml-auto mr-auto shadow-light shadow-lg b-5 bg-white rounded" style={{marginTop:"7rem"}} bordered>
                            <tbody>
                                <tr className="col-12">
                                    <td style={{ fontWeight: "500" }}>Name: </td>
                                    <td className="editable">{this.state.userName}</td>
                                </tr>
                                <tr>
                                    <td style={{ fontWeight: "500" }}>Email: </td>
                                    <td className="editable">{this.state.email}</td>
                                </tr>
                                <tr>
                                    <td style={{ fontWeight: "500" }}>Phone Number</td>
                                    <td className="editable">{this.state.phone}</td>
                                </tr>
                                <tr>
                                    <td style={{ fontWeight: "500" }}>Address: </td>
                                    <td>{this.state.Address}</td>
                                </tr>
                            </tbody>
                        </Table>
                        <Row className="col-12">
                            <Col>
                                <Button className="btn-warning m-auto" onClick={this.editable}>Edit Your Details</Button>
                            </Col>
                            <Col>
                                <Button classame="btn-seccess m-auto" onClick={this.removeeEditable}>Save Chnages</Button>
                            </Col>
                        </Row>
                        <Row className="col-12"><p style={{ color: "wheat" }} className="m-auto">Warning: Address cannot be edited</p></Row>
                    </Row> : this.state.owner?<Row className="col-10" style={{ height: "90vh",marginLeft:"65px" }}><h2 style={{ color: "grey",marginTop:"7rem"}} className="m-auto">Owner signed in.</h2></Row> :
                    <Row className="col-10" style={{ height: "90vh",marginLeft:"65px" }}><h2 style={{ color: "grey",marginTop:"7rem"}} className="m-auto">You have logged out. To continue please sign in.</h2></Row>}
                <SideBar hideAddProduct="true" />
            </div>
        );
    }
}

export default Profile;