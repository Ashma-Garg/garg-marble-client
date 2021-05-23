import React,{Component} from 'react';
import {Modal, ModalBody, } from 'reactstrap';
import FullPreview from '../CommonComponents/FullPreview'

class ViewComponent extends Component{
    constructor(props){
        super(props)
        this.state={
            isModal:this.props.isModelOpen,
            product:""
        }
        this.toggleViewModal=this.toggleViewModal.bind(this)
    }
    componentDidMount(){
            this.setState({
                product:<FullPreview product={this.props.product} category={this.props.category}/>
                })
    }
    async toggleViewModal(){
        await this.setState({
            isModal:!this.state.isModal
        })
        this.props.toggleViewModal()
    }
    render(){
        return(
            <div>
                <Modal style={{minWidth:"90%"}} isOpen={this.state.isModal} toggle={this.toggleViewModal}>
                    <ModalBody>
                        {this.state.product}
                    </ModalBody>
                </Modal>
            </div>
        )
    }
}

export default ViewComponent;