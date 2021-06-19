import React,{Component} from 'react';
import {Button, Row, Col} from 'reactstrap';
import axios from 'axios'

import {url} from '../shared/constant'

import SideBar from './CommonComponents/SideBar'
import ProductDisplay from './CommonComponents/ProductsDisplay';
import SideNavbar from './CommonComponents/SideNavbar';
import Login from './Login';
import '../css/Washbasin.css'
import SearchBar from './CommonComponents/SearchBar';
import DeleteModal from './Modals/DeleteModal';

class Toilet extends Component{
    constructor(props){
        super(props)
        this.state={
            toilet: [],
            isModalOpen: false,
            isDeleteModalOpen: false,
            notrefresh: null,
            xCor: 0,
            yCor: 0,
            DeleteProduct:null
        }
        
    }
    //to get all products of Toilets
    componentDidMount(){
        axios.get(`${url}/toilet/all`)
        .then(res => {
            this.setState({
                toilet: res.data.map((wb, i) => {
                    return (
                        // <ProductDisplay ViewtoggleModal={(view,id)=>this.ViewtoggleModal(view,id)} category={'toilet'} product={wb} key={i}/>
                        <ProductDisplay toggleDeleteProductModal={()=>this.toggleDeleteProductModal(wb)} addanimation={(val,x,y)=>this.addanimation(val,x,y)} toggleModal={()=>this.toggleModal()} notRefreshed={(res)=>this.notRefreshed(res)} category={'toilet'} product={wb} key={i}/>
                    );
                })
            })
        })
    }
    notRefreshed(res){
        this.setState({
            notrefresh:res
        })
    }
    toggleModal(){
        this.setState({
            isModalOpen:!this.state.isModalOpen
        })
    }
    toggleDeleteProductModal(val){
        if (val === true) {
            document.getElementById(this.state.DeleteProduct._id+this.state.DeleteProduct.Name).style.display="none"
        }
        this.setState({
            isDeleteModalOpen: !this.state.isDeleteModalOpen,
            DeleteProduct:val
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
                <Row className="col-11 col-xl-12 p-0" style={{ marginLeft: "65px" }} >
                    {this.state.toilet}
                </Row>
                {this.state.isModalOpen && <Login isModalOpen={this.state.isModalOpen} toggleModal={()=>this.toggleModal()}/>}
                {/* {this.state.isEditModalOpen && <AddModal  category={'toilet'} EditProduct={this.state.EditProduct} isModalOpen={this.state.isEditModalOpen} toggleAddModal={() => this.toggleEditProductModal()} />} */}
                {this.state.isDeleteModalOpen && <DeleteModal category={'toilet'} DeleteProduct={this.state.DeleteProduct} isModalOpen={this.state.isDeleteModalOpen} toggleDeleteModal={(val) => this.toggleDeleteProductModal(val)}/>}
                <SideBar category='toilet'/>
            </div>
        );
    }
}
export default Toilet;