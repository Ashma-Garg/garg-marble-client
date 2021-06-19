import React, { Component } from 'react';
import { Button, Row, Col } from 'reactstrap';

import SideNavbar from './SideNavbar';
import SideBar from './SideBar'
import ProductDisplay from './ProductsDisplay';
import Login from '../Login';
import SearchBar from './SearchBar';
import '../../css/Washbasin.css'
import DeleteModal from '../Modals/DeleteModal';

class SearchResults extends Component {
    constructor(props) {
        super(props)
        this.state = {
            search_Results_list: this.props.history.location.state?this.props.history.location.state.sa:null,
            search_reasult: null,
            isModalOpen: false,
            isDeleteModalOpen: false,
            notrefresh: null,
            xCor: 0,
            yCor: 0,
            DeleteProduct: null,
            key: Number
        }
    }
    //products got from link props
    componentDidMount() {
        if (this.props.history.location.state && this.props.history.location.state.sa.length) {
            this.setState({
                search_Results: this.state.search_Results_list.map((wb, i) => {
                    return (
                        <ProductDisplay toggleDeleteProductModal={() => this.toggleDeleteProductModal(wb)} key={i} addanimation={(val, x, y) => this.addanimation(val, x, y)} toggleModal={() => this.toggleModal()} notRefreshed={(res) => this.notRefreshed(res)} category={'washbasin'} product={wb} key={i} />
                    );
                })
            })
        }
        else{
            this.setState({
                search_Results:null
            })
        }
        //so that when user refresh the page then there is no search string
        window.history.replaceState(window.location.pathname,null)
    }
    //if search string is updated then update the product display
    componentDidUpdate() {
        if (this.props.history.location.state && (this.props.history.location.state.sa != this.state.search_Results_list)){
            this.setState({
                search_Results_list: this.props.history.location.state.sa
            })
            this.setState({
                search_Results: this.props.history.location.state.sa.map((wb, i) => {
                    return (
                        <ProductDisplay toggleDeleteProductModal={() => this.toggleDeleteProductModal(wb)} addanimation={(val, x, y) => this.addanimation(val, x, y)} toggleModal={() => this.toggleModal()} notRefreshed={(res) => this.notRefreshed(res)} category={wb.category} product={wb} key={i} />
                    );
                })
            })
        }
        window.history.replaceState(window.location.pathname,null)
    }
    //if product details are not refreshed
    notRefreshed(res) {
        this.setState({
            notrefresh: res
        })
    }
    //toggle login modal
    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        })
    }
    //toggle delete momdal
    toggleDeleteProductModal(val) {
        if (val === true) {
            document.getElementById(this.state.DeleteProduct._id+this.state.DeleteProduct.Name).style.display="none"
        }
        this.setState({
            isDeleteModalOpen: !this.state.isDeleteModalOpen,
            DeleteProduct: val
        })
    }
    //add animation when product is added to wishlist
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
                    {this.state.search_Results !== null ? this.state.search_Results : <div className="m-auto pl-2 pr-5"><p className="m-auto" style={{ fontWeight: "700", fontSize: "2rem", color: 'grey' }}>No Records found</p><div><p style={{ color: 'grey' }}>Either you didn't type anything or there are no matching results to your search.</p><p style={{ color: 'grey' }}>If you have refreshed the page then search again because all the progress has been lost.</p></div></div>}
                </Row>
             
                {this.state.isModalOpen && <Login isModalOpen={this.state.isModalOpen} toggleModal={() => this.toggleModal()} />}
                {this.state.isDeleteModalOpen && <DeleteModal category={this.state.DeleteProduct.category} key={this.state.key} DeleteProduct={this.state.DeleteProduct} isModalOpen={this.state.isDeleteModalOpen} toggleDeleteModal={(val) => this.toggleDeleteProductModal(val)} />}
                <SideBar hideAddProduct="true" />
            </div>
        );
    }
}
export default SearchResults;


