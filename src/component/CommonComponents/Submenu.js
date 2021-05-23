import React, {Component} from 'react';

class SubMenu extends Component{
    render(){
        return(
            <div style={{backgroundColor:"#647687"}}>
                <ul className="sideNavUL">
                    <li>{this.props.list}</li>
                </ul>
            </div>
        )
    }
}

export default SubMenu;