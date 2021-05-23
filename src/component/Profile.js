import axios from 'axios';
import React, {Component} from 'react'
import { Button, Col, Row, Table } from 'reactstrap';
import SideBar from './CommonComponents/SideBar';
import SideNavbar from './CommonComponents/SideNavbar';

class Profile extends Component{
    constructor(props){
        super(props)
        this.state={
            id:localStorage.getItem("Ctoken"),
            username:null,
            email:null,
            phone:Number,
            Address:null
        }
        this.editable=this.editable.bind(this)
        this.removeeEditable=this.removeeEditable.bind(this)
    }
    componentWillMount(){
        axios.get(`https://garg-marble-server.herokuapp.com/customer/info/${this.state.id}`)
                .then(res => {
                    if (res.data && res.data.FirstName) {
                        this.setState({
                            userName:res.data.FirstName+ " " + res.data.LastName,
                            email:res.data.EmailId,
                            phone:res.data.PhoneNo,
                            Address:res.data.Address+", "+res.data.Pincode+", "+res.data.City+", "+res.data.State+", "+res.data.Country
                        })
                    }
                    else {
                        console.log(res.err)
                    }
                })
        console.log(this.state.username)
    }
    editable(){
        let editelements=document.getElementsByClassName("editable");
        let i=0;
        
        while(editelements[i]){
            editelements[i].contentEditable=true;
            i++;
        }
        editelements[0].focus();
    }
    removeeEditable(){
        let editelements=document.getElementsByClassName("editable");
        let i=0;
        let array=[]
        while(editelements[i]){
            array.push(editelements[i].innerHTML)
            editelements[i].contentEditable=false;
            i++;
        }
        axios.post(`https://garg-marble-server.herokuapp.com/customer/updateInfo/${this.state.id}`,{array})
        .then(res=>{
            this.setState({
                userName:res.data.FirstName + " " + res.data.LastName,
                email:res.data.EmailId,
                phone:res.data.PhoneNo
            })
        })
    }
    render(){
        return(
            <div>
                <SideNavbar category={"profile"}/>
                {this.state.id?<div><Table className="col-8 offset-3 shadow-light shadow-lg b-5 mt-5 bg-white rounded" bordered>
                    <tbody>
                        <tr className="col-12">
                            <td style={{fontWeight:"500"}}>Name: </td>
                            <td className="editable">{this.state.userName}</td>
                        </tr>
                        <tr>
                            <td style={{fontWeight:"500"}}>Email: </td>
                            <td className="editable">{this.state.email}</td>
                        </tr>
                        <tr>
                            <td style={{fontWeight:"500"}}>Phone Number</td>
                            <td className="editable">{this.state.phone}</td>
                        </tr>
                        <tr>
                            <td style={{fontWeight:"500"}}>Address: </td>
                            <td>{this.state.Address}</td>
                        </tr>
                    </tbody>
                </Table>
                <Row className="offset-2">
                    <Col>
                    <Button className="btn-warning" onClick={this.editable}>Edit Your Details</Button>
                    </Col>
                    <Col>
                    <Button classame="btn-seccess" onClick={this.removeeEditable}>Save Chnages</Button>
                    </Col>
                </Row>
                <p className="offset-2" style={{color:"wheat"}}>Warning: Address cannot be edited</p>
                </div>:<div style={{height:"90vh"}}><h2 className="offset-2" style={{color:"grey",marginTop:"10%"}}>You have logged out. To continue please sign in.</h2></div>}
                <SideBar/>
            </div>
        );
    }
}

export default Profile;