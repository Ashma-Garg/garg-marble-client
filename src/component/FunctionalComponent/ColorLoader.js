import React, { Component } from 'react'
import { Col } from 'reactstrap'


export function ColorLoader(props) {
    function addColorSelection(category,colorProductId) {
        // props.colorPrice(e.target.id)
        // let circle=document.getElementsByClassName("rounded-circle")
        // let i=0
        // while(circle[i]){
        //     if(circle[i].id===e.target.id){
        //         circle[i].innerHTML="<i className='fa fa-check' style={{color:'blue'}} aria-hidden='true'></i>"
        //     }
        //     else{
        //         circle[i].innerHTML=""
        //     }
        //     i++;
        // }
        window.location.href=`/${category}/detail/${colorProductId}`
    }
    var array = []
    var colors = props.color
    
    colors.map((c, i) => {
        array.push(<Col className="m-auto col-1 col-sm-2"><p>{c}</p><div id={i} onClick={()=>addColorSelection(props.category,props.colorProductId[i])} style={{ display: "inline", margin: "0px" }} className="rounded-circle custom-circle" style={{ backgroundColor: c }}>{props.currentProductId===props.colorProductId[i]?<i className='fa fa-check' aria-hidden='true'></i>:null}</div></Col>)
    })
    return array;

}