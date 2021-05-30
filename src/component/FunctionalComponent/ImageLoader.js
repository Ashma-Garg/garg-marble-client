import React from 'react';

import {url} from '../../shared/constant'

import DynamicCarousel from '../CommonComponents/DynamicCarousel'

export function ImageLoader(props){

    let image=url + "/" + props.category + "/" + props.image

    return(
        <div style={{height:"100%"}} >
            {props.length==1?
            <img id={props.id} className="image col-md-12"
            src={props.image!==null?image:null}
            alt={props.image!==null?props.image:null}/>:
            <DynamicCarousel category={props.category} image={props.image}/>}
        </div>
    );
}
