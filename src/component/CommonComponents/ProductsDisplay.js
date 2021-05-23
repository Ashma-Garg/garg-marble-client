import React, { Component } from 'react'
import { Card, CardBody, CardTitle, Col, Row } from 'reactstrap'

import { ImageLoader } from '../FunctionalComponent/ImageLoader'

import '../../css/ProductDisplay.css'
import axios from 'axios'
class ProductDisplay extends Component {
    constructor(props) {
        super(props)
        this.state={
            isOpen:false,
            color:"lightgrey",
            notRefreshed:null
        }
        this.AddToWishlist = this.AddToWishlist.bind(this)
    }
    componentDidMount(){

        if(this.props.product.Customers){
            this.props.product.Customers.map((customer)=>{
                if(customer==localStorage.getItem('Ctoken')){
                    this.setState({
                        color:"red"
                    })
                    return;
                }
                else{
                    this.setState({
                        color:"lightgrey"
                    })
                }
            })
        }
    }

    AddToWishlist(e) {
        let productId=e.target.id;
        productId=productId.substring(0,productId.length-6)
        let customerId=localStorage.getItem("Ctoken")
        let category=this.props.category
        if(customerId){        
            var color=window.getComputedStyle(document.getElementById(e.target.id), null).getPropertyValue('color')
            console.log(color)
            axios.post(`/customer/wishlist`,{customerId,productId,color,category})
            .then(res=>{
                    return;
            })
            axios.post(`/${this.props.category}/addCustomer`,{productId,customerId,color})
            .then(res=>{
                if (res.data.message) {
                    this.setState({
                        notRefreshed:"Please refresh the page. Some of the items has been Updated in Wishlist."
                    })
                }
                else if(color === 'rgb(211, 211, 211)'){
                    document.getElementById(e.target.id).style.color = "red";
                    let corr=document.getElementById(e.target.id).getBoundingClientRect ()
                    this.props.addanimation(true,corr.x,corr.y)
                    this.setState({
                        notRefreshed:null
                    })
                }
                else{
                    document.getElementById(e.target.id).style.color = "lightgrey";
                    this.props.addanimation(false,null,null)
                    this.setState({
                        notRefreshed:null
                    })
                }
                this.props.notRefreshed(this.state.notRefreshed)
            })
        }
        else{
            this.props.toggleModal();
        }
    }
    productDetail(id){
        window.open(`/${this.props.category}/detail/${id}`)
    }
    render() {
        return (
            <Col className="col-12 col-lg-6 col-xl-3 mt-5" key={this.props.key}>

                {/* Will only be visible if window size is xs, sm or md */}
                <Row onClick={()=>this.productDetail(this.props.product._id)} className="visibilityAccordance col-10 d-lg-none ">
                    <Col className="removePadding">
                        <ImageLoader category={this.props.category} image={this.props.product.Image[0]?this.props.product.Image[0]:null} length={1}/>
                    </Col>
                    <Col>
                        <div variant="subtitle1">
                            <div className="sub">
                                {this.props.product.Name} <span style={{fontWeight:"100",fontSize:"12px"}}> {this.props.product.Size.Width}x{this.props.product.Size.Height} {this.props.product.Colors}</span>
                            </div>
                        </div>
                        <div style={{fontWeight:"100",fontSize:"12px"}}>
                                {this.props.product.Colors}
                        </div>
                        <div variant="bod2">
                            <div className="body2">
                                {this.props.product.Brand}
                            </div>
                        </div>
                        </Col>
                </Row>

                {/* Will only be visible if window size is lg or xl */}
                <Card className="shadow-lg mb-2 bg-white rounded visibilityAccess d-none d-lg-block">
                    <CardTitle id={this.props.product._id} onClick={()=>this.productDetail(this.props.product._id)} style={{padding:"0px"}}>
                        <ImageLoader category={this.props.category} image={this.props.product.Image[0]?this.props.product.Image[0]:null} length={1} />
                    </CardTitle>
                    <CardBody id={this.props.product._id} style={{minHeight:"110px",maxHeight:"fit-content", paddingTop: "0" }}>
                        <Row>
                            <Col>
                                <div className="subCard">
                                    {this.props.product.Name}   <span style={{fontWeight:"100",fontFamily:"monospace"}}>{this.props.product.Size.Width}x{this.props.product.Size.Height}</span>
                                </div>
                                <div style={{fontWeight:"100",fontFamily:"monospace",textAlign:"left"}}>
                                    {this.props.product.Colors}
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <div className="body2Card">
                                    {this.props.product.Brand}
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col className="col-12">
                                <div className="col-2 ml-auto"><i id={this.props.product._id+"button"} onClick={this.AddToWishlist} class="fa fa-heart fa-2x" style={{color:this.state.color}} aria-hidden="true"></i></div>
                            </Col>
                        </Row>
                    </CardBody>
                </Card>
            </Col>

        );
    }
}

export default ProductDisplay;

