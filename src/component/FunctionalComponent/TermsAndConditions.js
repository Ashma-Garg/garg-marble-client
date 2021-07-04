import React,{useEffect,useState} from 'react'
import { Col } from 'react-bootstrap'
import { Row } from 'reactstrap'
import {Link} from 'react-router-dom'
export function TermsAndConditions(){
    return(
        <Row className="col-11 ml-auto mr-auto shadow-lg bg-light" style={{marginTop:"7rem",marginBottom:'7rem'}}>
                <Col className="col-12 p-3">
                    <h1 className="termsHeading">Terms And Conditions</h1>
                    <p style={{fontSize:'0.8rem'}}>These are the terms and policies which you need to follow. 
                        Every order you make will be validated according to these terms and conditions. 
                        If any order doesn't fulfill all these requirements then that order will be cancelled by the server.
                    </p>
                    <ul style={{textAlign:'left',marginTop:'3rem'}} className="termsUL">
                        <li>This site is to expand business and for now only order in large quantity are acceptable for washbasin and toilet seats if delivery address is too far. 
                            The address user gave while signing up will be considered as the delivery address which user cannot edit. 
                            If address lies within 20KM for a small order then there are chances for that order will be accepted.</li>
                        <li>For washbasin and toilet seat, only bulk orders will be acceptable.</li>
                        <li>As this is our initial stage, we are accepting orders from particular states of India only.</li>
                        <li>If cost of order is less than Rs. 2000 then dilevery charges will be applicable as per the convenience.</li>
                        <li>Other than washbasin and toilet seats anything can be ordered in any quantity.</li>
                        <li>User can cancel his/her order within 2 days after placing the order. 
                            If he/she cancels the order after 2 days of placing order then extra charges will be applied which will be deducted from the reimbursement.</li>
                        <li>Once the order is dispatched user cannot cancel the product as well as there is no return policy for now.</li>
                        <li>Online and cash payments, both methods are acceptable.</li>
                        <li>After successfully placing the order, user will receive a notification if his/her order was accepted by server or not as "Order Accepted" or "Order Declined". 
                            If user order is declined then this implies that there was voilation of terms and conditions. 
                            So before placing the order again, read terms and conditions carefully.</li>
                        <li>Loan won't be entertained for any kind of purchase user make from this site.</li>
                    </ul>
                </Col>
            </Row>
    )
}