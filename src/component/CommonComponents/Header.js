import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import {
    UncontrolledDropdown, DropdownMenu, DropdownToggle, Navbar, NavItem, Collapse, NavLink, NavbarBrand, NavbarToggler, Nav
    // ,Button,Row,Col
} from 'reactstrap'
import '../../css/header.css'
import { Brands } from '../FunctionalComponent/functionHelper'
import Login from '../Login'
import axios from 'axios'
class Header extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isNavbarOpen: false,
            dropdown1: false,
            dropdownmenu: Brands("washbasin"),
            dropdownmenu1: Brands("toilet"),
            dropdownmenu2: Brands("taps"),
            username: null,
            isModalOpen: false
        }
        this.toggleNavbar = this.toggleNavbar.bind(this)
        this.toggle = this.toggle.bind(this)
        this.onMouseEnter = this.onMouseEnter.bind(this)
        this.onMouseLeave = this.onMouseLeave.bind(this)
        this.redirect = this.redirect.bind(this)
        this.logout = this.logout.bind(this)
        this.toggleModal = this.toggleModal.bind(this)
        this.openProfile = this.openProfile.bind(this)

    }
    componentDidMount() {
        var elem = document.getElementsByClassName('dropdown-toggle')
        var i = elem.length - 1;
        while (i >= 0) {
            elem[i].classList.remove('btn')
            elem[i].classList.remove('btn-secondary')
            elem[i].classList.remove('dropdown-toggle')
            i--;
        }
        const customerId = localStorage.getItem("Ctoken") ? localStorage.getItem("Ctoken") : null
        const ownerId = localStorage.getItem("Otoken") ? localStorage.getItem("Otoken") : null
        if (customerId) {
            axios.get(`/customer/info/${customerId}`)
                .then(res => {
                    if (res.data && res.data.FirstName) {
                        this.setState({
                            userName: res.data.FirstName + " " + res.data.LastName
                        })
                    }
                    else {
                        console.log(res.err)
                    }
                })
        }
        else if (ownerId) {
            this.setState({
                userName:"Owner"
            })
            // axios.get(`/owner/`)
            //     .then(res => {
            //         if (res.data && res.data.FirstName) {
            //             this.setState({
            //                 userName: res.data.FirstName + " " + res.data.LastName
            //             })
            //         }
            //     })
        }
    }
    toggleNavbar() {
        this.setState({
            isNavbarOpen: !this.state.isNavbarOpen
        })
    }
    toggle(id) {
        this.setState({
            [id]: !this.state[`${id}`]
        })
    }
    onMouseEnter(id) {
        this.setState({
            [id]: !this.state[`${id}`]
        })
    }
    onMouseLeave(id) {
        this.setState({
            [id]: !this.state[`${id}`]
        })
    }

    redirect(value) {
        window.location.href = `/${value}`
    }
    logout() {
        localStorage.removeItem("Ctoken")
        localStorage.removeItem("Otoken")
        this.setState({
            userName: null
        })
    }
    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        })
    }
    openProfile() {
        window.location.href = `/profile`
    }
    render() {
        return (
            <div className="setPosition">

                <Navbar className="navbar-dark fixed-top navbar-custom col-12" expand="xl">
                    <NavbarToggler onClick={this.toggleNavbar} />
                    <NavbarBrand className="mr-auto shopName">Garg Marble & Sanitary House</NavbarBrand>
                    <Collapse isOpen={this.state.isNavbarOpen} navbar>
                        <Nav navbar>
                            <NavItem>
                                <NavLink className="nav-link" href="/">Home</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink className="nav-link">
                                    <UncontrolledDropdown nav inNavbar
                                        direction="down"
                                        onMouseEnter={() => this.onMouseEnter('dropdown1')}
                                        onMouseLeave={() => this.onMouseLeave('dropdown1')}
                                        toggle={() => this.toggle('dropdown1')}
                                        isOpen={this.state.dropdown1}
                                    >
                                        <DropdownToggle onClick={() => this.redirect("washbasin")} className="drop1" style={{ backgroundColor: "#1c1b1b", color: "grey", borderStyle: "none" }} caret>Washbasin</DropdownToggle>
                                        <DropdownMenu style={{ backgroundColor: "#414347" }}>
                                            {this.state.dropdownmenu}
                                        </DropdownMenu>
                                    </UncontrolledDropdown>
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink className="nav-link">
                                    <UncontrolledDropdown nav inNavbar
                                        direction="down"
                                        onMouseEnter={() => this.onMouseEnter('dropdown2')}
                                        onMouseLeave={() => this.onMouseLeave('dropdown2')}
                                        toggle={() => this.toggle('dropdown2')}
                                        isOpen={this.state.dropdown2}
                                    >
                                        <DropdownToggle onClick={() => this.redirect("toilet")} className="drop2" style={{ backgroundColor: "#1c1b1b", color: "grey", borderStyle: "none" }} caret>Toilet</DropdownToggle>
                                        <DropdownMenu style={{ backgroundColor: "#414347" }}>
                                            {this.state.dropdownmenu1}
                                        </DropdownMenu>
                                    </UncontrolledDropdown>
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink className="nav-link">
                                    <UncontrolledDropdown nav inNavbar
                                        direction="down"
                                        onMouseEnter={() => this.onMouseEnter('dropdown3')}
                                        onMouseLeave={() => this.onMouseLeave('dropdown3')}
                                        toggle={() => this.toggle('dropdown3')}
                                        isOpen={this.state.dropdown3}
                                    >
                                        <DropdownToggle onClick={() => this.redirect("taps")} className="drop3" style={{ backgroundColor: "#1c1b1b", color: "grey", borderStyle: "none" }} caret>Taps</DropdownToggle>
                                        <DropdownMenu style={{ backgroundColor: "#414347" }}>
                                            {this.state.dropdownmenu2}
                                        </DropdownMenu>
                                    </UncontrolledDropdown>
                                </NavLink>
                            </NavItem>
                        </Nav>
                        <Nav style={{ width: "40%", margin: "auto" }} navbar>
                            <NavItem style={{ width: "100%", margin: "10px 5% 0 10%" }}>
                            </NavItem>
                        </Nav>
                        <Nav className="ml-auto" navbar>
                            <NavItem>
                                {this.state.userName == null ? null : <i className="fa fa-sign-out fa-2x pt-2 setStyling" title="Sign Out" onClick={this.logout}></i>}
                            </NavItem>
                            <NavItem>
                                {this.state.userName == null ? null : <i className="fa fa-user fa-2x pt-2 setStyling" onClick={this.openProfile} title={this.state.userName}></i>}
                            </NavItem>
                            <NavItem>
                                {this.state.userName != null ? null : <i className="fa fa-sign-in fa-2x pt-2 setStyling" title="SignIn" onClick={this.toggleModal}></i>}
                            </NavItem>
                        </Nav>
                    </Collapse>
                </Navbar>
                {this.state.isModalOpen && <Login isModalOpen={this.state.isModalOpen} toggleModal={() => this.toggleModal()} />}
            </div>
        );
    }
}

export default withRouter(Header);