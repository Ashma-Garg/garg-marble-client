import React,{Component} from 'react'
import AddModal from '../Modals/AddModal'
import { Row, Col } from 'reactstrap';

import '../../css/SideBar.css'
class SideBar extends Component{
    constructor(props){
        super(props)
        this.state={
            isModalOpen: false
        }
        this.toggleModal = this.toggleModal.bind(this)
    }
    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        })
    }
    toggleAddModal(res) {
        this.setState({
            isModalOpen: res
        })
    }
    jumpTo(value){
        window.location.href=value
    }
    render(){
        return(
            <div>
                <Row>
                    <Col className="col-12">
                        {this.state.isModalOpen && <AddModal toggleAddModal={(res) => this.toggleAddModal(res)} isModalOpen={this.state.isModalOpen} category={this.props.category} />}
                    </Col>
                    <Col className="col-1">
                        <div className="sideBar">
                            <i className="fa fa-angle-double-left fa-2x custom-icon" aria-hidden="true"></i>
                            <div className="backofarrow"></div>
                            <i className="fa fa-plus-circle fa-5x sidebarIcon" onClick={this.toggleModal} aria-hidden="true"></i><br/>
                            <i className="fa fa-home fa-5x sidebarIcon" onClick={()=>this.jumpTo("/")}aria-hidden="true"></i><br/>
                            <i className="fa fa-heart fa-5x sidebarIcon" onClick={()=>this.jumpTo("/wishlist")}aria-hidden="true"></i><br/>
                            <i className="fa fa-user fa-5x sidebarIcon" onClick={()=>this.jumpTo("/profile")}aria-hidden="true"></i><br/>
                            <i className="fa fa-shopping-cart fa-5x sidebarIcon" onClick={()=>this.jumpTo("/cart")}aria-hidden="true"></i><br/>
                        </div>
                    </Col>
                </Row>
            </div>
        )
    }
}

export default SideBar;