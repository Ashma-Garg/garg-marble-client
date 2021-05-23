import React, {Component} from 'react'
import { ImageLoader } from '../FunctionalComponent/ImageLoader'

class FullPreview extends Component{
    render(){
        return(
            <div>
                <ImageLoader length={this.props.product.Image.length} image={this.props.product.Image} category={this.props.category} />
            </div>
        )
    }
}

export default FullPreview;