import React, { Component } from 'react';
import { Button, Col, Label, Modal, ModalBody, ModalHeader, Row } from 'reactstrap';
import { LocalForm, Control, Errors } from 'react-redux-form'
import Axios from 'axios';

import {url} from '../../shared/constant'

var required = (val) => val && val.length;
var dataType = (val) => !(val) || /\d+$/i.test(val);
class AddModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isModal: this.props.isModalOpen
        }
        this.handleSubmit = this.handleSubmit.bind(this)
        this.toggleAddModal = this.toggleAddModal.bind(this)
        this.addCost = this.addCost.bind(this)
    }
    handleSubmit(values) {
        const formData= new FormData();
        formData.append('name',values.name)
        formData.append("catalogue",values.catalogue)
        formData.append('width',values.width)
        formData.append('Height',values.Height)
        formData.append('material',values.material)
        formData.append('warranty',values.warranty)
        formData.append('brand',values.brand)
        formData.append('desc',values.desc)
        formData.append('features',values.features)
        
        formData.append('colors',values.colors)
        let array=[]
        let quantityArray=[]
        let imageLength=[]
        for(let i=0;i<values.colors.length;i++){
            let price="price"+values.colors[i]
            let quantity="quantity"+values.colors[i]
            let im="image"+values.colors[i]
            if(values[im]){
            for(var j=0;j<values[im].length;j++){
                formData.append('file',values[im][j])
            }
            }
            imageLength[i]=values[im] ? values[im].length : 0
            array[i]=values[price]
            quantityArray[i]=values[quantity]
            
        }
        formData.append('price',array)
        formData.append('quantity',quantityArray)
        formData.append("imageLength",[imageLength])
        Axios.post(`${url}/${this.props.category}/add`,formData)
        .then(res=>{
            // window.location.href=`${url}/${this.props.category}`
            console.log(res.data)
        })
    }
    async toggleAddModal() {
        await this.setState({
            isModal: !this.state.isModal
        });

        this.props.toggleAddModal(this.state.isModal)
    }
    async addCost(e) {
        let option = document.getElementsByTagName("option")
        let i = 0
        while (option[i]) {
            if (option[i].selected) {
                document.getElementById("price" + option[i].value).classList.remove("d-none")
                document.getElementById("quantity" + option[i].value).classList.remove("d-none")
                document.getElementById("image" + option[i].value).classList.remove("d-none")
            }
            else {
                document.getElementById("price" + option[i].value).classList.add("d-none")
                document.getElementById("quantity" + option[i].value).classList.add("d-none")
                document.getElementById("image" + option[i].value).classList.add("d-none")
            }
            i = i + 1;
        }

    }
    render() {
        return (
            <Modal style={{ minWidth: "60%" }} isOpen={this.state.isModal} toggle={this.toggleAddModal}>
                <ModalHeader
                    style={{ backgroundColor: "#3464eb", color: "white" }}
                    toggle={this.toggleAddModal}
                >
                    <h3>Add New {this.props.category.toUpperCase()}</h3>
                </ModalHeader>
                <ModalBody>
                    <div className="container">
                        <LocalForm encType="multipart/form-data" onSubmit={this.handleSubmit} className="col-md-10" validateOn="submit">
                            <Row className="form-group" md={12}>
                                <Label htmlFor="name" md={3}><span style={{ color: "red" }}>* </span> Name: </Label>
                                <Col>
                                    <Control.text className="form-control" model=".name" id="name" name="name" validators={{ required }}></Control.text>
                                    <Errors className="text-danger" show="touched" model=".name"
                                        messages={{ required: "This feild is required" }}>
                                    </Errors>
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="catalogue" md={3}><span style={{ color: "red" }}>* </span> Catalogue No: </Label>
                                <Col>
                                    <Control.text className="form-control" model=".catalogue" id="catalogue" name="catalogue" validators={{ required }}></Control.text>
                                    <Errors className="text-danger" show="touched" model=".catalogue"
                                        messages={{ required: "This feild is required" }}>
                                    </Errors>
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label md={3} htmlFor="size"><span style={{ color: "red" }}>* </span> Size: </Label>
                                <Col>
                                    <Label htmlFor="width"><span style={{ color: "red" }}>* </span> Width: </Label>
                                    <Control.text className="form-control" model=".width" id="width" name="width" validators={{ required, dataType }}></Control.text>
                                    <Errors className="text-danger" show="touched" model=".width"
                                        messages={{
                                            required: "This feild is required",
                                            dataType: "Should be a Number"
                                        }}>
                                    </Errors>
                                </Col>
                                <Col>
                                    <Label htmlFor="Height"><span style={{ color: "red" }}>* </span> Height: </Label>
                                    <Control.text className="form-control" model=".Height" id="Height" name="Height" validators={{ required, dataType }}></Control.text>
                                    <Errors className="text-danger" show="touched" model=".Height"
                                        messages={{
                                            required: "This feild is required",
                                            dataType: "Should be a Number"
                                        }}>
                                    </Errors>
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label md={3} htmlFor="colors"><span style={{ color: "red" }}>* </span> Colors: </Label>
                                <Col>
                                    <Control.select onBlur={this.addCost} multiple className="form-control" id="colors" model=".colors" name="colors" validators={{ required }}>
                                        <option>White</option>
                                        <option>Black</option>
                                        <option>Grey</option>
                                        <option>Ivory</option>
                                        <option>Blue</option>
                                    </Control.select>
                                    <Errors className="text-danger" show="touched" model=".colors"
                                        messages={{ required: "This feild is required" }}>
                                    </Errors>
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label md={3} htmlFor="price[]"><span style={{ color: "red" }}>* </span> Price: </Label>
                                <Col className="col-12 col-lg-9">
                                    <Row className="col-12">
                                        <Col id="priceBlack" className="d-none col-6 col-lg-3">
                                            <Label htmlFor="priceBlack"><span style={{ color: "red" }}>* </span> Black: </Label>
                                            <Control.text type="number" className="form-control" model=".priceBlack" name="price[]" />
                                        </Col>
                                        <Col id="priceWhite" className="d-none col-6 col-lg-3">
                                            <Label htmlFor="priceWhite"><span style={{ color: "red" }}>* </span> White: </Label>
                                            <Control.text type="number" className="form-control" model=".priceWhite" name="priceWhite" />
                                        </Col>
                                        <Col id="priceGrey" className="d-none col-6 col-lg-3">
                                            <Label htmlFor="priceGrey"><span style={{ color: "red" }}>* </span> Grey: </Label>
                                            <Control.text type="number" className="form-control" model=".priceGrey" name="priceGrey" />
                                        </Col>
                                        <Col id="priceBlue" className="d-none col-6 col-lg-3">
                                            <Label htmlFor="priceBlue"><span style={{ color: "red" }}>* </span> Blue: </Label>
                                            <Control.text type="number" className="form-control" model=".priceBlue" name="priceBlue" />
                                        </Col>
                                        <Col id="priceIvory" className="d-none col-6 col-lg-3">
                                            <Label htmlFor="priceIvory"><span style={{ color: "red" }}>* </span> Ivory: </Label>
                                            <Control.text type="number" className="form-control" model=".priceIvory" name="priceIvory" />
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label md={3} htmlFor="brand"><span style={{ color: "red" }}>* </span> Brand: </Label>
                                <Col>
                                    <Control.text className="form-control" model=".brand" id="brand" name="brand" validators={{ required }}></Control.text>
                                    <Errors className="text-danger" show="touched" model=".brand"
                                        messages={{ required: "This feild is required" }}>
                                    </Errors>
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label md={3} htmlFor="image">Image: </Label>
                                <Col className="col-12 col-lg-9">                                
                                        <Col id="imageBlack" className="d-none col-12">
                                            <Label htmlFor="imageBlack">Black: </Label>
                                            <Control.file multiple className="form-control" model=".imageBlack" name="imageBlack" />
                                        </Col>
                                        <Col id="imageWhite" className="d-none col-12">
                                            <Label htmlFor="imageWhite">White: </Label>
                                            <Control.file multiple className="form-control" model=".imageWhite" name="imageWhite" />
                                        </Col>
                                        <Col id="imageGrey" className="d-none col-12">
                                            <Label htmlFor="imageGrey">Grey: </Label>
                                            <Control.file multiple className="form-control" model=".imageGrey" name="imageGrey" />
                                        </Col>
                                        <Col id="imageBlue" className="d-none col-12">
                                            <Label htmlFor="imageBlue">Blue: </Label>
                                            <Control.file multiple className="form-control" model=".imageBlue" name="imageBlue" />
                                        </Col>
                                        <Col id="imageIvory" className="d-none col-12">
                                            <Label htmlFor="imageIvory">Ivory: </Label>
                                            <Control.file multiple className="form-control" model=".imageIvory" name="imageIvory" />
                                        </Col>     
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label md={3} htmlFor="quantity"><span style={{ color: "red" }}>* </span> Quantity: </Label>
                                <Col className="col-12 col-lg-9">                                
                                        <Col id="quantityBlack" className="d-none col-12">
                                            <Label htmlFor="quantityBlack">Black: </Label>
                                            <Control.text type="number" className="form-control" model=".quantityBlack" name="quantityBlack" />
                                        </Col>
                                        <Col id="quantityWhite" className="d-none col-12">
                                            <Label htmlFor="quantityWhite">White: </Label>
                                            <Control.text type="number" className="form-control" model=".quantityWhite" name="quantityWhite" />
                                        </Col>
                                        <Col id="quantityGrey" className="d-none col-12">
                                            <Label htmlFor="quantityGrey">Grey: </Label>
                                            <Control.text type="number" className="form-control" model=".quantityGrey" name="quantityGrey" />
                                        </Col>
                                        <Col id="quantityBlue" className="d-none col-12">
                                            <Label htmlFor="quantityBlue">Blue: </Label>
                                            <Control.text type="number" className="form-control" model=".quantityBlue" name="quantityBlue" />
                                        </Col>
                                        <Col id="quantityIvory" className="d-none col-12">
                                            <Label htmlFor="quantityIvory">Ivory: </Label>
                                            <Control.text type="number" className="form-control" model=".quantityIvory" name="quantityIvory" />
                                        </Col>     
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label md={3} htmlFor="warranty"><span style={{ color: "red" }}>* </span> Warranty:</Label>
                                <Col>
                                    <Control.text className="form-control" model=".warranty" id="warranty" name="warranty" validators={{ required }}></Control.text>
                                    <Errors className="text-danger" show="touched" model=".warranty"
                                        messages={{ required: "This feild is required" }}>
                                    </Errors>
                                </Col>
                            </Row>
                            <Row>
                                <Label md={3} htmlFor="material">Material: </Label>
                                <Col>
                                    <Control.text name="material" className="form-control" model=".material" />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label md={3} htmlFor="desc">Description: </Label>
                                <Col>
                                    <Control.textarea rows="5" className="form-control" model=".desc" id="desc" name="desc"></Control.textarea>
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label md={3} htmlFor="features">Features: </Label>
                                <Col>
                                    <Control.textarea rows="5" className="form-control" model=".features" id="features" name="features"></Control.textarea>
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Col md={{ offset: 4 }}>
                                    <Button type="submit" color="primary">Submit</Button>
                                </Col>
                            </Row>
                        </LocalForm>
                    </div>
                </ModalBody>
            </Modal>
        )
    }
}

export default AddModal;