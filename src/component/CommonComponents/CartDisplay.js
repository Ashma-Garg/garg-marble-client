import React, { Component } from 'react'
import { Row, Col} from 'reactstrap'

import { ImageLoader } from '../FunctionalComponent/ImageLoader'
import "../../css/ProductDisplay.css"
import axios from 'axios'
import { Control, LocalForm } from 'react-redux-form'
import { withRouter } from 'react-router'

class CartDisplay extends Component {
    constructor(props) {
        super(props)
        this.state = {
        }
        this.onchange=this.onchange.bind(this)
    }
    //to provide the inputs with quatities that were saved in db when user last visited the cart page
    componentDidMount(){
        document.getElementById(this.props.product._id).value=this.props.quantity
    }

    //to open Detail component
    productDetail(id){
        window.open(`https://garg-marble-server.herokuapp.com/${this.props.category}/detail/${id}`)
    }

    //add or subtract 1 from quantity when the plus or minus button clicked
    alterQuantity(val){
        if(parseInt(document.getElementById(this.props.product._id).value) + parseInt(val)>=1){
            document.getElementById(this.props.product._id).value=parseInt(document.getElementById(this.props.product._id).value) + parseInt(val)
            document.getElementById(this.props.product._id).addEventListener('change',this.onchange(document.getElementById(this.props.product._id).value))
        }
    }

    //update the price of product depending upon quantity and send it to Cart.js to update totalPrice
    onchange(e){
        let price=parseInt(document.getElementById(this.props.product._id+"disPrice").innerHTML)
        if(e.target){
        document.getElementById(this.props.product._id+"disPrice").innerHTML=(this.props.product.Price*(e.target.value?e.target.value:0))
        }
        else{
            document.getElementById(this.props.product._id+"disPrice").innerHTML=(this.props.product.Price*(e?e:0))
        }
        let price1=parseInt(document.getElementById(this.props.product._id+"disPrice").innerHTML)
        this.props.totalPrice(price,price1)
    }

    //delete product from cart
    deleteFromCart(){
        let customerId=localStorage.getItem("Ctoken")
        let productId=this.props.product._id
        let category=this.props.category
        let cart="Remove from Cart"
        axios.post(`https://garg-marble-server.herokuapp.com/customer/add/cart`,{customerId,productId,category,cart})
        .then(res=>{
            if(!(res.data.error || res.err)){
                window.location.reload()
            }
            else{
                this.props.notRefreshed(res.data.error)
            }
        }) 
    }
    render() {
        return (
            <Row style={{marginBottom:"7px"}} className="col-7 offset-3 visibilityAccordance" key={this.props.key}>
                        <Col className="removePadding" onClick={() => this.productDetail(this.props.product._id)}>
                            <ImageLoader category={this.props.category} image={this.props.product.Image[0] ? this.props.product.Image[0] : null} length={1} />
                        </Col>
                        <Col onClick={() => this.productDetail(this.props.product._id)}>
                            <div>
                                <div className="sub">
                                    <span style={{color:"#2f736c",fontWeight:"700"}}>{this.props.product.Name}</span> <span style={{ fontWeight: "400", fontSize: "12px", color:"#47918a" }}> ({this.props.product.Size.Width}x{this.props.product.Size.Height})</span>
                                </div>
                            </div>
                            <div>
                                <div className="body2">
                                    {this.props.product.Brand}
                                </div>
                            </div>
                        </Col>
                        <Col onClick={() => this.productDetail(this.props.product._id)}>
                            <div style={{paddingTop:"30px"}}><span style={{paddingRight:"20px"}}>Colour: </span><div style={{backgroundColor:this.props.product.Colors,width:"20px",height:"20px",borderRadius:"10px",border:"3px solid #1f92b8",display:"inline-block"}}></div></div>
                        </Col>
                        <Col>
                        <div style={{position:"absolute",right:"30px"}}>
                            <i onClick={()=>this.deleteFromCart()} className="fa fa-trash" style={{color:"red",right:0}}></i>
                        </div>
                        <div style={{position:"absolute",bottom:"20px"}}>
                            <div style={{color:"#b8184e",fontWeight:"700"}}>
                                Price: <span id={this.props.product._id+"disPrice"} className={"cartPrice"}>{this.props.product.Price*this.props.quantity}</span>
                            </div>
                            Quantity:
                            
                            <div style={{display:"inline-block",border:"3px solid black",height:"35px",marginLeft:"5px"}}>
                                <span>
                                    <i onClick={()=>this.alterQuantity(1)} className="fa fa-plus" style={{padding: "2px 6px",borderRight:"1px solid black"}}></i>
                                </span>
                                
                                <input  style={{width:"40px",border:0,height:"25px"}}  onChange={this.onchange} name="quantity" id={this.props.product._id} type="number"/>
                                
                                <span >
                                    <i onClick={()=>this.alterQuantity(-1)} className="fa fa-minus" style={{padding: "2px 6px",borderLeft:"1px solid black"}}></i>
                                </span>
                            </div>
                        </div>
                        
                        </Col>
            </Row>
        )
    }
}
export default withRouter(CartDisplay);