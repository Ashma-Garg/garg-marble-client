import Axios from 'axios';
import React from 'react'
import { Component } from 'react';
import {Row, Col, Button} from 'reactstrap'

import {url} from '../../shared/constant'

import ProductDisplay from './ProductsDisplay'
import SideNavbar from './SideNavbar'
import SideBar from './SideBar'
import Login from '../Login'
import '../../css/Washbasin.css'
import SearchBar from './SearchBar';

class WashbasinBrand extends Component{
    constructor(props){
        super(props);
        this.state={
            brandProduct:null,
            isModalOpen: false,
            notrefresh: null,
            xCor:0,
            yCor:0,
            active:false
        }
    }
    componentDidMount(){
        var array=this.props.match.params.brand.split(',')
        Axios.get(`${url}/${this.props.match.params.category}/${array}`)
        .then(res=>{
            this.setState({
                brandProduct: res.data.map((p, i) => {
                    return (
                        <ProductDisplay addanimation={(val,x,y)=>this.addanimation(val,x,y)} toggleModal={() => this.toggleModal()} notRefreshed={(res) => this.notRefreshed(res)} category={this.props.match.params.category} product={p} key={i}/>
                    );
                })
            })
        })
    }
    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        })
    }
    notRefreshed(res) {
        this.setState({
            notrefresh: res
        })
    }
    addanimation(val,x,y){
        this.setState({
            xCor:x,
            yCor:y
        })
        if(val){
            let animateRow=document.getElementsByClassName("animateRow")
            animateRow[0].classList.add("animateRowZIndex")
            let animation=document.getElementsByClassName("animateId")
            animation[0].classList.add("animateWishlistButton");
            setTimeout(()=>{
                animateRow[0].classList.remove("animateRowZIndex")
            animation[0].classList.remove("animateWishlistButton");
            },1000)
            
        }
    }
    render(){
        return(
            <div style={{ overflowX: 'hidden' }}>
               
               <SideNavbar/>
                <SearchBar/>
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
                <Row style={{position:"fixed"}} className="col-10 offset-2 animateRow">
                        <i className="fa fa-heart fa-5x animateId" style={{marginLeft:this.state.xCor-300,marginTop:this.state.yCor-100,color:"red"}}></i>
                </Row>
                <Row className="col-11 col-xl-12 p-0" style={{marginLeft:"65px"}} >{this.state.brandProduct}</Row>
                {this.state.isModalOpen && <Login isModalOpen={this.state.isModalOpen} toggleModal={() => this.toggleModal()} />}
                <SideBar category={this.props.match.params.category}/>
            </div>
        )
    }
}

export default WashbasinBrand;