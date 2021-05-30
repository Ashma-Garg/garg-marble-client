import React, {Component} from 'react'
import axios from 'axios'
import {Row,Col,Button} from 'reactstrap'

import {url} from '../shared/constant'

import SideNavbar from './CommonComponents/SideNavbar'
import SideBar from './CommonComponents/SideBar'
import ProductDisplay from "./CommonComponents/ProductsDisplay"
import Login from './Login'
import SearchBar from './CommonComponents/SearchBar'

class Wishlist extends Component{
    constructor(props){
        super(props)
        this.state={
            data:[],
            isModalOpen:false,
            notrefresh: null,
            xCor:0,
            active:false,
            yCor:0
        }
    }
    notRefreshed(res) {
        this.setState({
            notrefresh: res
        })
    }
    toggleModal() {
        this.setState({
            isModalOpen:!this.state.isModalOpen
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
    componentDidMount(){
        let customerId=localStorage.getItem("Ctoken")
        //wishlist component will only be visible if customer is logged in
        if(customerId){
        //service to list all products in wishlist
        axios.get(`${url}/customer/wishlist/${customerId}`)
        .then(res=>{
            //this variable is so that we can use this wishlist array's value later in ProductDisplay category field 
            let wishlist=res.data
            //this service is to find data for every prouct listed in wishlist
            axios.all(res.data.map((wishlistData)=>axios.get(`${url}/${wishlistData.category}/cartInfo/${wishlistData.productId}`)))
            .then(axios.spread((...productsInfo)=>{
                this.setState({
                    //productsInfo is an array of all wishlist's product's items and that data is an array itself
                    data: productsInfo.map((productInfo,i)=>{
                        return (
                            productInfo.data.map(info=>{
                                console.log(info)
                            return (<ProductDisplay addanimation={(val,x,y)=>this.addanimation(val,x,y)} toggleModal={() => this.toggleModal()} notRefreshed={(res) => this.notRefreshed(res)} category={wishlist[i].category} product={info}/>)
                        })
                        )
                    })
                })
                
            }))
        })
        }
        else{
            setTimeout(()=>{
                this.setState({
                    isModalOpen:!this.state.isModalOpen
                })
            },5000)
        }
    }
    render(){
        if(localStorage.getItem("Ctoken")){
        return(
            <div style={{ overflowX: 'hidden'}}>
                <SideNavbar />
                <SearchBar className="col-12"/>
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
                        <i className="fa fa-heart fa-5x animateId" style={{marginLeft:this.state.xCor-300,marginTop:this.state.yCor-200,color:"red"}}></i>
                </Row>
                <Row className="col-11 col-xl-12 p-0" style={{marginLeft:"65px"}} >
                    {this.state.data}
                </Row>
                <SideBar category='wishlist' />
            </div>
            
        )
        }
        else{
            return(
                <div style={{ overflowX: 'hidden'}}>
                    <SideNavbar />
                    <Row className="col-10 offset-2">
                    <Col className="col-8 m-auto">
                        <div className="alert alert-danger alert-dismissible fade show" role="alert">
                            <p>Please Login to view your Wishlist</p>
                            
                        </div>
                    </Col>
                    </Row>
                    {this.state.isModalOpen && <Login isModalOpen={this.state.isModalOpen} toggleModal={() => this.toggleModal()} />}
                    <SideBar category='wishlist' />
                </div>
            );
        }
    }
}

export default Wishlist;