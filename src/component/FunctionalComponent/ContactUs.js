import React from 'react'
import { Row, Label, Col, Button } from 'reactstrap'
import imageCropped from "../../images/gargmarbleCropped.png"
import image from "../../images/gargmarble.png"
import { LocalForm, Control } from 'react-redux-form';
import axios from 'axios'
import '../../css/Contact.css'
import { url } from '../../shared/constant'
import ReactCardFlip from "react-card-flip";
export function ContactUs() {
    const [isFlipped, setIsFlipped] = React.useState(false);
    let submit = (e) => {
        axios.post(`${url}/customer/contactus`, [e.name, e.email, e.message])
            .then(res => {
            })
        document.getElementById("contact").reset()
    }
    return (
        <div>
            <Row className="col-12 col-sm-9 col-md-8 col-lg-6 col-xl-5 m-auto cardHeight">
                <Col className="col-12">
                    <p className="fontStyle">Bring your mouse over the card or click on it to view details.</p>
                </Col>
                <ReactCardFlip className="contentFitHeight" isFlipped={isFlipped} flipDirection="horizontal">
                    <div onMouseEnter={() => setIsFlipped(prev => !prev)} onClick={() => setIsFlipped(prev => !prev)} className="CardFront">
                        <div className="col-12 p-0">
                            <img src={image} alt="Contact Us" className="frontImage"/>
                        </div>
                    </div>
                    <div
                        onMouseLeave={() => setIsFlipped(prev => !prev)}
                        onClick={() => setIsFlipped(prev => !prev)}
                        className="CardBack textAlign"
                    >
                        <Row className="backContentPadding contentFitHeight">
                        <Col className="d-none d-md-inline-block col-md-3 p-0 borderRight">
                            <img src={imageCropped} alt="Contact Us" className="col-8 p-0 backImage" />
                            <div className="col-12 mt-2 textAlign contentFitHeight fontStyle">
                                <p >Brands Available:</p>
                            
                                <p className="Pmargin">Hindware</p>
                                <p className="Pmargin">Cera</p>
                                <p className="Pmargin">Somany</p>
                                </div>
                        </Col>
                        <Col className="d-inline-block col-12 col-md-8 pl-3 m-auto">
                            <div>
                                <p className="fontWeight">Sanjay Kumar</p>
                            </div>
                            <div className="m-2">
                                <i className="fa fa-home fa-x"></i><span className="p-2">Opposite to cloth market, Barwala, Hisar, Haryana</span>
                            </div>
                            <div className="m-2">
                                <i className="fa fa-user fa-x"></i><span className="p-2">Sanjay Kumar</span><br/>
                                <i className="fa fa-phone fa-x"></i><span className="p-2">+91 9416673484</span><br/>
                                <i className="fa fa-user fa-x"></i><span className="p-2">LR Garg</span><br/>
                                <i className="fa fa-phone fa-x"></i><span className="p-2">+91 9416178806</span><br/>
                            </div>
                            <div className="m-2">
                                <i className="fa fa-envelope fa-x"></i><span className="p-2 fontStyle">gargmarble2011@gmail.com</span>
                            </div>
                        </Col>
                        </Row>
                    </div>
                </ReactCardFlip>

            </Row>
            <LocalForm id="contact" name="form" onSubmit={submit} className="col-9 ml-auto mr-auto bg-dark mt-5 mb-5 pb-5 pt-5 rounded" style={{ color: 'white' }}>
                <Row className="col-12 form-group p-0 m-auto">
                    <Col className="col-12 col-sm-6 p-2">
                        <Label htmlFor='name' className="col-12 textAlign">Name: </Label>
                        <Control.text className="form-control" name='name' model='.name' placeholder="Full Name"></Control.text>
                        <Label htmlFor='email' className="col-12 textAlign">Email: </Label>
                        <Control.text className="form-control" name='email' model='.email' placeholder="Email Id"></Control.text>
                        <Button type="submit" className="d-none d-sm-inline-block btn-success btn-lg m-5">
                            Submit
                        </Button>
                    </Col>
                    <Col className="col-12 col-sm-6 p-2">
                        <Label htmlFor='message'>Message</Label>
                        <Control.textarea className="form-control" model='.message' name='message' placeholder="Enter your message" rows='10' cols='20' />
                    </Col>
                    <Col className="col-12">
                        <Button type="submit" className="d-sm-none btn-success btn-lg mt-5">
                            Submit
                        </Button>
                    </Col>
                </Row>
            </LocalForm>
        </div>
    )
}