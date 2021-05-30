import axios from 'axios'
import React, { Component } from 'react'
import { Tabs, Tab } from 'react-bootstrap'
import { Control, LocalForm, Errors } from 'react-redux-form'
import { Button, Label, Col, Row} from 'reactstrap'

import {url} from '../shared/constant'

const required = (val) => val && val.length

class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            error: null
        }
        this.submit = this.submit.bind(this)
    }
    submit(values) {
            axios.post(`${url}/owner/login`, values)
                .then(res => {
                    if (res.data.data) {
                        localStorage.setItem("Otoken",res.data.data._id)
                        window.location.href="/"
                    }
                    else {
                        this.setState({
                            error: res.data.err
                        })
                    }
                })
    }
    render() {
        return (
                <Row className="col-12">
                    <Col className="col-12">
                        <Tabs defaultActiveKey="home" id="uncontrolled-tab-example">
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
                                            <Label htmlFor="username"><span style={{color:"red"}}>*</span>Username: </Label>
                                        </Col>
                                        <Col className="col-6">
                                            <Control.text className="form-control" model=".username" id="email" name="username" validators={{ required}}></Control.text>
                                            <Errors className="text-danger" show="touched" model=".username"
                                                messages={{
                                                    required: "This Field is mandatory"
                                                }}
                                            />
                                        </Col>
                                    </Row>
                                        <Row class="form-group">
                                            <Col className="col-3">
                                                <Label htmlFor="password"><span style={{color:"red"}}>*</span>Password: </Label>
                                            </Col>
                                            <Col className="col-6">
                                                <Control.password className="form-control" model=".password" id="password" name="password" validators={{ required}} ></Control.password>
                                                <Errors className="text-danger" show="touched" model=".password"
                                                messages={{
                                                    required: "This Field is mandatory"
                                                }}
                                            />
                                            </Col>
                                        </Row>
                                        <Col>
                                            <Button className="btn btn-lg btn-primary mt-5 mb-3" type="submit">Submit</Button>
                                        </Col>
                            </LocalForm>
                        </Tab>
                    </Tabs>
                </Col>
            </Row>
        )
    }
}
export default Login;