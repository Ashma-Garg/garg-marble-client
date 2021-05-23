import React from 'react';
import DynamicCarousel from '../CommonComponents/DynamicCarousel'
export function ImageLoader(props){

    let image="https://garg-marble-server.herokuapp.com/" + props.category + "/" + props.image

    return(
        <div>
            {props.length==1?
            <img id={props.id} className="image col-md-12"
            src={props.image!==null?image:null}
            alt={props.image!==null?props.image:null}/>:
            <DynamicCarousel category={props.category} image={props.image}/>}
        </div>
    );
}
