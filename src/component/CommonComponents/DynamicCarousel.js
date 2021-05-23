import React, { Component } from 'react'
import { Carousel} from 'react-bootstrap'
import { ImageLoader } from '../FunctionalComponent/ImageLoader'
import '../../css/DynamicCarousel.css'
class DynamicCarousel extends Component {
    constructor(props) {
        super(props)
        this.state = {
            image: this.props.image,
            carouselItem:[]
        }
    }
    componentDidMount() {
        var array=[]
        for(var i=0;i<this.state.image.length;i++){
            array.push(<Carousel.Item> <ImageLoader image={this.state.image[i]} category={this.props.category} length="1"/></Carousel.Item>)
            
        }
        this.setState({
            carouselItem:array
        })
    }
    render() {
        return (
            <div>
                {this.state.image.length?
                <Carousel>
                    {this.state.carouselItem}
                </Carousel>
                :null}
            </div>

        )
    }
}

export default DynamicCarousel;