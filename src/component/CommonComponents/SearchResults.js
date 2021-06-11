import React, { Component } from 'react';
import { Button, Row, Col } from 'reactstrap';

import SideNavbar from './SideNavbar';
import SideBar from './SideBar'
import ProductDisplay from './ProductsDisplay';
import Login from '../Login';
import SearchBar from './SearchBar';
import '../../css/Washbasin.css'
class SearchResults extends Component {
    constructor(props) {
        super(props)
        this.state = {
            search_Results: null,
            isModalOpen: false,
            notrefresh: null,
            xCor: 0,
            yCor: 0
        }
    }
    componentDidMount(){
        if(this.props.history.location.state.sa.length){
            this.setState({
                search_Results: this.props.history.location.state.sa.map((wb, i) => {
                    return (
                        <ProductDisplay addanimation={(val, x, y) => this.addanimation(val, x, y)} toggleModal={() => this.toggleModal()} notRefreshed={(res) => this.notRefreshed(res)} category={'washbasin'} product={wb} key={i} />
                    );
                })
            })
        }

    }
    notRefreshed(res) {
        this.setState({
            notrefresh: res
        })
    }
    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        })
    }
    addanimation(val, x, y) {
        this.setState({
            xCor: x,
            yCor: y
        })
        if (val) {
            let animateRow = document.getElementsByClassName("animateRow")
            animateRow[0].classList.add("animateRowZIndex")
            let animation = document.getElementsByClassName("animateId")
            animation[0].classList.add("animateWishlistButton");
            setTimeout(() => {
                animateRow[0].classList.remove("animateRowZIndex")
                animation[0].classList.remove("animateWishlistButton");
            }, 1000)

        }
    }
    render() {
        return (
            <div style={{ overflowX: 'hidden' }}>
                <SideNavbar />
                <SearchBar className="col-12" />
                <Row className="col-12 marginTop">
                    <Col className="col-8 m-auto">
                        {this.state.notrefresh ?
                            <div className="alert alert-danger alert-dismissible fade show" role="alert">
                                <p>{this.state.notrefresh}</p>
                                <Button className="close" data-dismiss="alert" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </Button>
                            </div> : null
                        }
                    </Col>
                </Row>
                <Row style={{ position: "fixed" }} className="col-10 offset-2 animateRow">
                    <i className="fa fa-heart fa-5x animateId" style={{ marginLeft: this.state.xCor - 300, marginTop: this.state.yCor - 200, color: "red" }}></i>
                </Row>
                <p id="searchArray"></p>
                <Row className="col-11 col-xl-12 p-0" style={{ marginLeft: "65px" }} >
                {this.state.search_Results!==null?this.state.search_Results:<div className="m-auto pl-2 pr-5"><p className="m-auto" style={{fontWeight:"700",fontSize:"2rem",color:'grey'}}>No Records found</p><div><p style={{color:'grey'}}>Either you didn't type anything or there are no matching results to your search.</p></div></div>}
                </Row>

                {this.state.isModalOpen && <Login isModalOpen={this.state.isModalOpen} toggleModal={() => this.toggleModal()} />}
                <SideBar category='washbasin' />
            </div>
        );
    }
}
export default SearchResults;


            