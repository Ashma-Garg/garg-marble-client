import React, { Component } from 'react';
import { Button, Row, Col} from 'reactstrap';
import axios from 'axios'
import { withRouter } from 'react-router-dom'

import SideNavbar from './CommonComponents/SideNavbar';
import SideBar from './CommonComponents/SideBar'
import ProductDisplay from './CommonComponents/ProductsDisplay';
import Login from './Login';
import '../css/Washbasin.css'

class Washbasin extends Component {
    constructor(props) {
        super(props)
        this.state = {
            washbasin: [],
            isModalOpen: false,
            id: null,
            notrefresh: null,
            xCor:0,
            yCor:0
        }

    }
     //to get all products of Washbasin
    componentDidMount() {
        axios.get(`/washbasin/all`)
            .then(res => {
                this.setState({
                    washbasin: res.data.map((wb, i) => {
                        return (
                            <ProductDisplay addanimation={(val,x,y)=>this.addanimation(val,x,y)} toggleModal={() => this.toggleModal()} notRefreshed={(res) => this.notRefreshed(res)} category={'washbasin'} product={wb} key={i} />
                        );
                    })
                })
            })
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
   
    render() {
        return (
            <div style={{ overflowX: 'hidden'}}>
                <SideNavbar />
                <Row className="col-10 offset-2">
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
                <Row className="col-9 col-xl-10 ml-auto">
                    {this.state.washbasin}
                </Row>
                
                {this.state.isModalOpen && <Login isModalOpen={this.state.isModalOpen} toggleModal={() => this.toggleModal()} />}
                <SideBar category='washbasin' />
            </div>
        );
    }
}
export default withRouter(Washbasin);

