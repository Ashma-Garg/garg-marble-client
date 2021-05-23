import React from 'react'
import { Row, Col } from 'reactstrap'
import { Control, LocalForm } from 'react-redux-form';

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
            isModalOpen:false

        }
        this.logoutCustomer = this.logoutCustomer.bind(this)
        this.toggleModal= this.toggleModal.bind(this)

    };
    componentDidMount() {
        //this if else condition is for sidenavbar display
        if (this.props.showsearch) {
            this.setState({
                showSearch: "none"
            })

        }
        else {
            this.setState({
                showSearch: "block"
            })
            var ele = document.getElementsByClassName("menu")
            ele[0].classList.add("active")
        }
    }
    componentDidUpdate(){
        let customerId=localStorage.getItem("Ctoken")?localStorage.getItem("Ctoken"):null;
        if(customerId){
            document.getElementById("customerLogOut").style.display="block"
            document.getElementById("customerLogIn").style.display="none"
        }
        else{
            document.getElementById("customerLogOut").style.display="none"   
            document.getElementById("customerLogIn").style.display="block"
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
        this.setState({
            userName:null
        })
        window.location.reload(true)
    }
    toggleModal(){
        this.setState({
            isModalOpen:!this.state.isModalOpen
        })
    }
    render() {
        return (
            <div>
                <nav className="menu col-3 col-xl-2">
                    <ul class="nav flex-column overflow-scroll flex-nowrap sideNavUL">
                        <li id="business">
                            <a href="/">Garg Marble & Sanitary House</a>
                        </li>
                        <li>
                            <a className="nav-link" href='/'>Home</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link d-inline-block" href="/washbasin">Washbasin </a> <span class="dropdown-toggle" style={{ color: "white" }} onClick={() => this.toggleSubMenu("dropdown1")}></span>
                        </li>
                        {this.state.dropdown1 && <SubMenu category="washbasin" list={this.state.dropmenu1} />}
                        <li className="nav-item">
                            <a className="nav-link d-inline-block" href="/toilet">Toilet </a> <span class="dropdown-toggle" style={{ color: "white" }} onClick={() => this.toggleSubMenu("dropdown2")}></span>
                        </li>
                        {this.state.dropdown2 && <SubMenu category="toilet" list={this.state.dropmenu2} />}
                        <li className="nav-item">
                            <a className="nav-link d-inline-block" href="/taps">Taps </a> <span class="dropdown-toggle" style={{ color: "white" }} onClick={() => this.toggleSubMenu("dropdown3")}></span>
                        </li>
                        {this.state.dropdown3 && <SubMenu category="taps" list={this.state.dropmenu3} />}
                        <div id="customerLogOut" className=" mt-auto">
                            {/* <li className="nav-item">
                                <a className="d-inline-block" style={{ cursor: "pointer" }}>{this.state.userName}</a>
                            </li> */}
                            <li className="nav-item">
                                <a className="d-inline-block" onClick={this.logoutCustomer} style={{ cursor: "pointer" }}>LogOut</a>
                            </li>
                        </div>
                        <div id="customerLogIn" className=" mt-auto">
                            <li className="nav-item">
                                <a className="d-inline-block" onClick={this.toggleModal} style={{ cursor: "pointer" }}>LogIn</a>
                            </li>
                        </div>
                    </ul>
                </nav>
                <div className="shadow-lg custom-color rounded" style={{ marginBottom: "20px", display: this.state.showSearch }}>

                    <LocalForm className="col-8 col-xl-9 offset-3 offset-xl-2 mr-5 pt-4 pb-4">
                        <Row className="form-group">
                            <Col>
                                <Control.text model=".search" className="form-control" placeholder="Search" />
                            </Col>
                        </Row>
                    </LocalForm>
                </div>
                {this.state.isModalOpen && <Login isModalOpen={this.state.isModalOpen} toggleModal={() => this.toggleModal()} />}
            </div>
        );
    }
}

export default SideNavbar;