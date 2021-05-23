import axios from 'axios'
import React, { Component } from 'react'
import { Tabs, Tab } from 'react-bootstrap'
import { Control, LocalForm, Errors } from 'react-redux-form'
// import { Redirect } from 'react-router'
import { Button, Label, Col, Row, ModalBody, Modal} from 'reactstrap'
// import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';

const required = (val) => val && val.length
// const maxlength = (len) => (val) => !val || val.length <= len
// const minlength = (len)=>(val) => val ? val.length >= len : 1;
const validEmail = (val) => !(val)||/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(val);
const pass=(val) => !(val)||/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/i.test(val);

class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isModal:this.props.isModalOpen,
            err: null,
            error: null
        }
        this.toggleModal=this.toggleModal.bind(this)
        this.submit = this.submit.bind(this)
    }
    componentDidMount() {
        // if ("geolocation" in navigator) {
        //     console.log("Available");
        //     navigator.geolocation.getCurrentPosition(function(position) {
        //         console.log("Latitude is :", position.coords.latitude);
        //         console.log("Longitude is :", position.coords.longitude);
        //       });
        //   } else {
        //     console.log("Not Available");
        //   }
    }
    async toggleModal(){
        await this.setState({
            isModal:!this.state.isModal
        })
        this.props.toggleModal()
    }
    submit(values) {
        if (values.repassword) {
            var custmer = {
                first: values.first,
                last: values.last,
                email: values.Upemail,
                password: values.Uppassword,
                repassword: values.repassword,
                number: values.number,
                address: values.address,
                pincode: values.pincode,
                state: values.state,
                city: values.city,
                country: values.country
            }
            axios.post('https://garg-marble-server.herokuapp.com/customer/add', custmer)
                .then(res => {
                    if (res.data.err) {
                        this.setState({
                            err: res.data.err
                        })
                    }
                    else if (res.data.data) {
                        localStorage.setItem("Ctoken",res.data.data._id)
                        this.toggleModal()
                        window.location.reload(true)
                    }
                })
        }
        else {
            axios.post('https://garg-marble-server.herokuapp.com/customer/login', values)
                .then(res => {
                    if (res.data.data) {
                        localStorage.setItem("Ctoken",res.data.data._id)
                        this.toggleModal()
                        window.location.reload(true)
                    }
                    else {
                        this.setState({
                            error: res.data.err
                        })
                    }
                })
        }
    }
    render() {
        return (
            <Modal style={{minWidth:"80%"}} isOpen={this.state.isModal} toggle={this.toggleModal}>
                <ModalBody>
                <Row className="col-12">
                    <Col className="col-12">
                        <Tabs defaultActiveKey="profile" id="uncontrolled-tab-example">
                            <Tab eventKey="home" title="SignIn">
                                {this.state.error ?
                                    <div className="alert alert-danger alert-dismissible fade show" role="alert">
                                        <p>{this.state.error}</p>
                                        <Button className="close" data-dismiss="alert" aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                        </Button>
                                    </div> : null}
                                <LocalForm className="m-5" onSubmit={this.submit}>
                                    <Row className="form-group">
                                        <Col className="col-3">
                                            <Label htmlFor="email"><span style={{color:"red"}}>*</span>Email Id: </Label>
                                        </Col>
                                        <Col className="col-6">
                                            <Control.text className="form-control" model=".email" id="email" name="email" validators={{ required, validEmail}}></Control.text>
                                            <Errors className="text-danger" show="touched" model=".email"
                                                messages={{
                                                    required: "This Field is mandatory",
                                                    validEmail:"Invalid Email"
                                                }}
                                            />
                                        </Col>
                                    </Row>
                                        <Row class="form-group">
                                            <Col className="col-3">
                                                <Label htmlFor="password"><span style={{color:"red"}}>*</span>Password: </Label>
                                            </Col>
                                            <Col className="col-6">
                                                <Control.password className="form-control" model=".password" id="password" name="password" validators={{ required,pass}} ></Control.password>
                                                <Errors className="text-danger" show="touched" model=".password"
                                                messages={{
                                                    required: "This Field is mandatory",
                                                    pass:"Should contain uppercase, lowercase, number and special character and 8<=length<=15"
                                                }}
                                            />
                                            </Col>
                                        </Row>
                                        <Col>
                                            <Button className="btn btn-lg btn-primary mt-5 mb-3" type="submit">Submit</Button>
                                        </Col>
                            </LocalForm>
                        </Tab>
                                <Tab eventKey="profile" title="SignUp">
                                    {this.state.err ?
                                        <div className="alert alert-danger alert-dismissible fade show" role="alert">
                                            <p>{this.state.err}</p>
                                            <button className="close" data-dismiss="alert" aria-label="Close">
                                                <span aria-hidden="true">&times;</span>
                                            </button>
                                        </div> : null}
                                    <LocalForm className="m-5" onSubmit={this.submit}>
                                        <Row className="form-group">
                                            <Col className="col-3 col-lg-3 m-2 m-lg-0">
                                                <Label htmlFor="first"><span style={{color:"red"}}>*</span>First Name: </Label>
                                            </Col>
                                            <Col className="col-8 col-lg-3 m-2 m-lg-0">
                                                <Control.text className="form-control" model=".first" id="first" name="first" required></Control.text>
                                            </Col>
                                            <Col className="col-3 col-lg-2 m-2 m-lg-0">
                                                <Label htmlFor="last"><span style={{color:"red"}}>*</span>Last Name: </Label>
                                            </Col>
                                            <Col className="col-8 col-lg-3 m-2 m-lg-0">
                                                <Control.text className="form-control" model=".last" id="last" name="last" required></Control.text>
                                            </Col>
                                        </Row>
                                        <Row className="form-group">
                                            <Col className="col-3 col-lg-3 m-2 m-lg-0">
                                                <Label htmlFor="Upemail"><span style={{color:"red"}}>*</span>Email Id: </Label>
                                            </Col>
                                            <Col className="col-8 col-lg-8 m-2 m-lg-0">
                                                <Control.text className="form-control" model=".Upemail" id="Upemail" name="Upemail" validators={{required,validEmail}}></Control.text>
                                                <Errors className="text-danger" show="touched" model=".Upemail"
                                                messages={{
                                                    required: "This Field is mandatory",
                                                    validEmail:"Invalid Email"
                                                }}
                                            />
                                            </Col>
                                        </Row>
                                        <Row class="form-group">
                                            <Col className="col-3 col-lg-3 m-2 m-lg-0">
                                                <Label htmlFor="Uppassword"><span style={{color:"red"}}>*</span>Password: </Label>
                                            </Col>
                                            <Col className="col-8 col-lg-3 m-2 m-lg-0">
                                                <Control.password className="form-control" model=".Uppassword" id="Uppassword" name="Uppassword" validators={{required,pass}}></Control.password>
                                                <Errors className="text-danger" show="touched" model=".Uppassword"
                                                messages={{
                                                    required: "This Field is mandatory",
                                                    pass:"Should contain uppercase, lowercase, number and special character and 8<=length<=15"
                                                }}
                                            />
                                            </Col>
                                            <Col className="col-3 col-lg-2 m-2 m-lg-0">
                                                <Label htmlFor="repassword"><span style={{color:"red"}}>*</span>Re-Enter Password: </Label>
                                            </Col>
                                            <Col className="col-8 col-lg-3 m-2 m-lg-0">
                                                <Control.password className="form-control" model=".repassword" id="repassword" name="repassword" validators={{required,pass}}></Control.password>
                                                <Errors className="text-danger" show="touched" model=".repassword"
                                                messages={{
                                                    required: "This Field is mandatory",
                                                    pass:"Should contain uppercase, lowercase, number and special character and 8<=length<=15"
                                                }}
                                            />
                                            </Col>
                                        </Row>
                                        <Row className="form-group mt-lg-3">
                                            <Col className="col-3 col-lg-3 m-2 m-lg-0">
                                                <Label htmlFor="number"><span style={{color:"red"}}>*</span>Phone No: </Label>
                                            </Col>
                                            <Col className="col-8 col-lg-8 m-2 m-lg-0">
                                                <Control.text type="number" className="form-control" model=".number" id="number" name="number" required></Control.text>
                                            </Col>
                                        </Row>
                                        <p style={{ color: "orange" }}>Remember you can not change your address later and this address will be considered as your shipping address.</p>
                                        <Row className="form-group">
                                            <Col className="col-3 col-lg-3 m-2 m-lg-0">
                                                <Label htmlFor="address"><span style={{color:"red"}}>*</span>Street Address: </Label>
                                            </Col>
                                            <Col className="col-8 col-lg-8 m-2 m-lg-0">
                                                <Control.text className="form-control" model=".address" id="address" name="address" required></Control.text>
                                            </Col>
                                        </Row>
                                        <Row className="form-group">
                                            <Col className="col-3 col-lg-3 m-2 m-lg-0">
                                                <Label htmlFor="city"><span style={{color:"red"}}>*</span>City/Town: </Label>
                                            </Col>
                                            <Col className="col-8 col-lg-3 m-2 m-lg-0">
                                                <Control.text className="form-control" model=".city" id="city" name="city" required></Control.text>
                                            </Col>
                                            <Col className="col-3 col-lg-2 m-2 m-lg-0">
                                                <Label htmlFor="pincode"><span style={{color:"red"}}>*</span>Pincode: </Label>
                                            </Col>
                                            <Col className="col-8 col-lg-3 m-2 m-lg-0">
                                                <Control.text type="number" className="form-control" model=".pincode" id="pincode" name="pincode" required></Control.text>
                                            </Col>
                                        </Row>
                                        <Row class="form-group">
                                            <Col className="col-3 col-lg-3 m-2 m-lg-0">
                                                <Label htmlFor="state"><span style={{color:"red"}}>*</span>State: </Label>
                                            </Col>
                                            <Col className="col-8 col-lg-3 m-2 m-lg-0">
                                                <Control.text className="form-control" model=".state" id="state" name="state" required></Control.text>
                                            </Col>
                                            <Col className="col-3 col-lg-2 m-2 m-lg-0">
                                                <Label htmlFor="country"><span style={{color:"red"}}>*</span>Country: </Label>
                                            </Col>
                                            <Col className="col-8 col-lg-3 m-2 m-lg-0">
                                                <Control.text className="form-control" model=".country" id="country" name="country" required></Control.text>
                                            </Col>
                                        </Row>
                                        <Row>
                                        <Col className="col-11">
                                            <Button className="offset-md-5 offset-3 col-6 col-md-3 btn btn-lg btn-dark mt-5 mb-3" type="submit">Submit</Button>
                                        </Col>
                                        </Row>
                                        {/* <Row>
                                    <Map google={this.props.google} zoom={14}>

                                        <Marker onClick={this.onMarkerClick}
                                            name={'Current location'} /> */}

                                        {/* <InfoWindow onClose={this.onInfoWindowClose}>
                                            <div>
                                                <h1>{this.state.selectedPlace.name}</h1>
                                            </div>
                                        </InfoWindow> */}
                                        {/* </Map>
                                </Row> */}

                                    </LocalForm>

                                </Tab>
                    </Tabs>
                </Col>
            </Row>
            </ModalBody>
            </Modal>
        )
    }
}
export default Login;
// export default GoogleApiWrapper({
//     apiKey: ("AIzaSyDPgfGuxoRXhQHaC9gJCk2SCt8SiZNJRMo")
//   })(Login)