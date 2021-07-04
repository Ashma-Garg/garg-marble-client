import React,{useEffect,useState} from 'react'
import { Col } from 'react-bootstrap'
import { Row } from 'reactstrap'
import {Link} from 'react-router-dom'
import image from "../../images/Contact.jpg"
export function ContactUs(){
    return(
        <Row className="col-12 p-0 mr-0 ml-0" style={{minHeight:"40vh",maxHeight:'fit-content',backgroundColor:"#1b1a6b",marginTop:"5rem",color:"white"}}>
            <Col className="col-12 p-0" style={{height:"100%",position:"absolute",backgroundColor:"rgba(0,0,0,0.5)"}}></Col>
                <Col className="d-none d-sm-block col-sm-6 col-md-3 p-0">
                    <img src={image} alt="Contact Us" style={{height:'41vh',left:'-20px',transform:'rotate(5deg)'}} className="col-12"/>
                </Col>
                <Col className='p-3'>
                <Col className="col-12 mt-4">
                    <h2>Garg Marble & Sanitary House</h2>
                    <p className="col-12 col-md-8 offset-md-2">We sale every product which can be used for house construction like washbasins, toilet seats, taps, bath tubs, showers, tiles, mirrors, cistens, pipes etc.</p>
                </Col>
                <Col style={{textAlign:'left'}}>
                <div className="m-2">
                <i className="fa fa-envelope fa-2x" style={{color:"white"}}></i><span className="p-2">gargmarble2011@gmail.com</span>
                </div>
                <div className="m-2">
                <i className="fa fa-home fa-2x" style={{color:"white"}}></i><span className="p-2">Garg Marble and Sanitary House, Barwala, Haryana</span>
                </div>
                <div className="m-2">
                <i className="fa fa-phone fa-2x" style={{color:"white"}}></i><span className="p-2">+91 9416673484</span><p style={{paddingLeft:"32px"}}>+91 9416178806</p>
                </div>
                </Col>
                </Col>
            </Row>
    )
}