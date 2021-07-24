import axios from 'axios'
import { DropdownItem, Col} from 'reactstrap';

import {url} from '../../shared/constant'

//To Switch to brandName location and get products sorted according to Washbasin brandName
function relocate(category,BrandName){
    var array=[];
    array.push(BrandName)
    window.location.href=`/${category}/${array}`
}

//to get dropdown of every washbasin brandname
export function Brands(category){
    var setWash=[];
    var array=[];

    axios.get(`${url}/${category}/`)
    .then(res=>{
        setWash=res.data.map((r)=>{
            return(
                //could alos write it as
                //<DropdownItem 
                    //style={{color:"white"}} 
                    //onClick={()=>{window.location.href=`/washbasin/${r}`}}
                //>
                    //{r}
                //</DropdownItem>
                <Col className="col-6">
                    <DropdownItem
                    style={{color:"white",fontSize:"0.8rem"}} 
                    onClick={()=>relocate(category,r)}>
                        {r}
                </DropdownItem>
                </Col>
                
            );
        })
        Array.prototype.push.apply(array,setWash)
    })
    return array;
}