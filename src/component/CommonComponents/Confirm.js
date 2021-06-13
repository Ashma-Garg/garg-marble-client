import axios from 'axios'
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Button } from 'reactstrap'
import {url} from '../../shared/constant'
class Confirm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            id: this.props.match.params.id,
            email:this.props.match.params.email,
            err:null,
            msg:null
        }
    }
    componentDidMount() {
        let id=this.state.id
        let email=this.state.email
        axios.post(`${url}/customer/confirm/email`,{id,email})
        .then(res=>{
            if(res.data.err){
                this.setState({
                    err:res.data.err
                })
                localStorage.removeItem("Ctoken")
            }
            else if(res.data.msg){
                this.setState({
                    msg:res.data.msg
                })
                localStorage.setItem("Ctoken", res.data.data._id)
            }
            else{
                localStorage.setItem("Ctoken", res.data._id)
            } 
        })
    }
    render() {
        return (
            <div>
                <div style={{border:"3px solid grey",borderRadius:"2rem",marginTop:'200px',padding:"30px"}} className="col-8 ml-auto mr-auto">
                    <p>{this.state.err?this.state.err:this.state.msg?this.state.msg:"Email verified Successfully"}</p>
                    <Link to='/'><Button>Go Back to Website's Homepage</Button></Link>
                </div>
            </div>

        )
    }
}

export default Confirm;