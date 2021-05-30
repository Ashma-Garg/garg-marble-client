import {React,Component} from 'react'
import { Control, LocalForm } from 'react-redux-form';
import {Button,Row,Col} from 'reactstrap'

import '../../css/SearchBar.css'

class SearchBar extends Component{
    constructor(props){
        super(props)
        this.state={
            active: false
        }
    }
    
    render(){
        return(
        <div className="col-12 shadow-lg custom-color rounded styling">
            <LocalForm className="searchBar pt-4 pb-4 col-10 m-auto">
                <Row className="form-group">
                {/* <Button onClick={this.toggleSideNav} className="toggle-button ml-2" title="Toggle Side Navbar"><i class="fa fa-bars p-0" aria-hidden="true"></i></Button> */}
                    <Col>
                        <Control.text model=".search" className="form-control" placeholder="Search" />
                    </Col>
                </Row>
            </LocalForm>
        </div>
        )
    }
}
export default SearchBar