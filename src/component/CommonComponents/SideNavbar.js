import React from 'react'
import { Button, Row, Table } from 'reactstrap'

import { Brands } from '../FunctionalComponent/functionHelper'
import Login from '../Login'
import '../../css/SideNavbar.css'
import SubMenu from './Submenu'


class SideNavbar extends React.Component {
    constructor() {
        super();
        this.state = {
            dropmenu1: Brands('washbasin'),
            dropmenu2: Brands('toilet'),
            dropmenu3: Brands('taps'),
            dropdown1: false,
            dropdown2: false,
            dropdown3: false,
            showsearch: null,
            isModalOpen: false

        }
        this.logoutCustomer = this.logoutCustomer.bind(this)
        this.toggleModal = this.toggleModal.bind(this)
        this.toggleSideNav = this.toggleSideNav.bind(this)
    }
    componentDidMount() {
        let customerId = localStorage.getItem("Ctoken") ? localStorage.getItem("Ctoken") : null;
        let ownerId = localStorage.getItem("Otoken") ? localStorage.getItem("Otoken") : null;
        if (customerId||ownerId) {
            document.getElementById("customerLogOut").style.display = "block"
            document.getElementById("customerLogIn").style.display = "none"
        }
        else if(!(customerId&&ownerId)) {
            document.getElementById("customerLogOut").style.display = "none"
            document.getElementById("customerLogIn").style.display = "block"
        }
    }
    async toggleSubMenu(id) {
        await this.setState({
            [id]: !this.state[`${id}`]
        })
        if (id === "dropdown1") {
            this.setState({
                dropdown2: false,
                dropdown3: false
            })
        }
        else if (id === "dropdown2") {
            this.setState({
                dropdown1: false,
                dropdown3: false
            })
        }
        else if (id === "dropdown3") {
            this.setState({
                dropdown2: false,
                dropdown1: false
            })
        }
    }
    logoutCustomer() {
        localStorage.removeItem("Ctoken")
        localStorage.removeItem("Otoken")
        window.location.reload(true)
    }
    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        })
    }
    toggleSideNav() {
        if (this.state.active) {
            let elem = document.getElementsByClassName("menu")
            elem[0].classList.remove("active");
            this.setState({
                dropdown1: false,
                dropdown2: false,
                dropdown3: false
            })
            let e = document.getElementsByClassName("searchBar")
            e[0].classList.remove("col-9", "col-xl-8", "offset-3", "offset-xl-3")
            e[0].classList.add("col-10", "m-auto")
        }
        else {
            let elem = document.getElementsByClassName("menu")
            elem[0].classList.add("active");

            let e = document.getElementsByClassName("searchBar")
            e[0].classList.remove("col-10", "m-auto")
            e[0].classList.add("col-9", "col-xl-8", "offset-3", "offset-xl-3")
        }
        this.setState({
            active: !this.state.active
        })
    }
    render() {
        return (
            <Row>
                <nav className="menu" style={{width:"245px"}}>
                    <ul className="nav flex-column overflow-scroll flex-nowrap sideNavUL">
                        <Table>
                            <tr>
                                <td>
                                    <li id="business">
                                        <a href="/">Garg Marble & Sanitary House</a>
                                    </li>
                                </td>
                                <td><Button onClick={this.toggleSideNav} className="toggle-button ml-2 mt-1" title="Toggle Side Navbar"><i className="fa fa-bars p-0" aria-hidden="true"></i></Button></td>
                            </tr>
                            <tr>
                                <td>
                                    <li className="nav-item">
                                        <a className="nav-link" href='/'>Home</a>
                                    </li>
                                </td>
                                <td>
                                    <li className="nav-item"><a href="/"><i className="fa fa-home fa-3x"></i></a></li>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <li className="nav-item">
                                        <a className="nav-link d-inline-block" href="/washbasin">Washbasin</a><span className="dropdown-toggle" style={{ color: "white" }} onClick={() => this.toggleSubMenu("dropdown1")}></span>
                                    </li>
                                </td>
                                <td>
                                    <li className="nav-item"><a href="/washbasin"><img src="https://img.icons8.com/color/48/000000/sink.png" /></a></li>
                                </td>
                            </tr>
                            <tr>
                                <td style={{border:0}} colSpan="2">{this.state.dropdown1 && <SubMenu category="washbasin" list={this.state.dropmenu1} />}</td>
                            </tr>
                            <tr>
                                <td>
                                    <li className="nav-item">
                                        <a className="nav-link d-inline-block" href="/toilet">Toilet </a> <span className="dropdown-toggle" style={{ color: "white" }} onClick={() => this.toggleSubMenu("dropdown2")}></span>
                                    </li>
                                </td>
                                <td>
                                    <li className="nav-item"><a href="/toilet"><img src="https://img.icons8.com/fluent/48/000000/toilet-bowl.png" /></a></li>
                                </td>
                            </tr>
                            <tr>
                                <td style={{border:0}} colSpan="2">{this.state.dropdown2 && <SubMenu category="toilet" list={this.state.dropmenu2} />}</td>
                            </tr>
                            <tr>
                                <td>
                                    <li className="nav-item">
                                        <a className="nav-link d-inline-block" href="/taps">Taps </a> <span className="dropdown-toggle" style={{ color: "white" }} onClick={() => this.toggleSubMenu("dropdown3")}></span>
                                    </li>
                                </td>
                                <td>
                                    <li className="nav-item"><a href="/taps"><img src="https://img.icons8.com/fluent/48/000000/piping.png" /></a></li>
                                </td>
                            </tr>
                            <tr>
                                <td style={{border:0}} colSpan="2">{this.state.dropdown3 && <SubMenu category="taps" list={this.state.dropmenu3} />}</td>
                            </tr>
                            </Table>
                            <Table className="mt-auto">
                            <tr id="customerLogOut">
                                <td>
                                    <li className="nav-item">
                                        <a className="nav-link d-inline-block" onClick={this.logoutCustomer} style={{ cursor: "pointer" }}>LogOut Account</a>
                                    </li>
                                </td>
                                <td>
                                    <li className="nav-item"><a onClick={this.logoutCustomer}><i title="LogOut" style={{color:"white"}} className="fa fa-sign-out fa-3x ml-auto"></i></a></li>
                                </td>
                            </tr>
                            <tr id="customerLogIn">
                                <td>
                                    <li className="nav-item">
                                        <a className="nav-link d-inline-block" onClick={this.toggleModal} style={{ cursor: "pointer" }}>LogIn Account</a>
                                    </li>
                                </td>
                                <td>
                                    <li className="nav-item">
                                        <a onClick={this.toggleModal}><i title="LogIn" style={{color:"white"}} className="fa ml-auto fa-sign-in fa-3x"></i></a>
                                    </li>
                                </td>
                            </tr>
                        </Table>
                    </ul>
                </nav>
                {this.state.isModalOpen && <Login isModalOpen={this.state.isModalOpen} toggleModal={() => this.toggleModal()} />}
            </Row>
        );
    }
}

export default SideNavbar;