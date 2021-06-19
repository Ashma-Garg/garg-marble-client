import React, { Component } from 'react';
import { Button, Col, Modal, ModalBody, ModalHeader, Row } from 'reactstrap';

import {url} from '../../shared/constant'
import axios from 'axios';

class DeleteModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isModal: this.props.isModalOpen,
            DeleteProduct:this.props.DeleteProduct,
            category:this.props.category
        }
        this.toggleDeleteModal = this.toggleDeleteModal.bind(this)
        this.deleteProduct=this.deleteProduct.bind(this)
    }

    async toggleDeleteModal() {
        await this.setState({
            isModal: !this.state.isModal
        });
        this.props.toggleDeleteModal(false)
    }

    async deleteProduct(){
        await axios.delete(`${url}/masterproducts/${this.state.category}/delete/${this.state.DeleteProduct._id}`)
        .then(res=>{
            if(res.data.err){
                console.log(res.data.err)
            }
            else if(res.data.msg){
                alert(res.data.msg)
            }
        })
        
        this.props.toggleDeleteModal(true)
    }

    render() {
        return (
            <Modal style={{top:"20vh", minWidth: "60%" }} isOpen={this.state.isModal} toggle={this.toggleDeleteModal}>
                <ModalHeader
                    style={{ backgroundColor: "#ab231a", color: "white" }}
                    toggle={this.toggleDeleteModal}
                >
                    Delete Template
                </ModalHeader>
                <ModalBody>
                    <h4>Are you sure you want to delete this product?</h4>
                    <Row className="col-12 col-sm-7 col-lg-6 col-xl-5 ml-auto">
                        <Col>
                        <Button onClick={this.deleteProduct} style={{backgroundColor:"#ab231a"}}>Delete</Button></Col>
                        <Col>
                        <Button onClick={this.toggleDeleteModal} style={{backgroundColor:"black"}}>Cancel</Button></Col>
                    </Row>
                </ModalBody>
            </Modal>
        )
    }
}

export default DeleteModal;