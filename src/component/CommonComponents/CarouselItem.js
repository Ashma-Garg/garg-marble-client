import React, {Component} from 'react'
import { Carousel, Row, Col } from 'react-bootstrap'

class CarouselItem extends Component{
    constructor(props){
        super(props)
        this.state={
            image2:this.props.image[0],
            image3:this.props.image[1],
            image4:this.props.image[2],
            desp2:this.props.description[0],
            desp3:this.props.description[1],
            desp4:this.props.description[2],
        }
    }
    render(){
        return(
            <Carousel>
            <Carousel.Item interval="1000">
              <img
                style={{ height: "50vh" }}
                className="d-block w-100"
                src={require(`../../${this.state.image2}`).default}
                alt="First slide"
              />
              <Carousel.Caption style={{ zIndex: '1' }}>
                <h3>{this.state.desp2}</h3>
                
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item interval="1000">
            <div className="p-0 col-12 overlay"></div>
              <img
                style={{ height: "50vh" }}
                className="d-block w-100"
                src={require(`../../${this.state.image3}`).default}
                alt="Third slide"
              />

              <Carousel.Caption style={{ zIndex: '1' }}>
                <h3>{this.state.desp3}</h3>
                
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item interval="1000">
              <img
                style={{ height: "50vh" }}
                className="d-block w-100"
                src={require(`../../${this.state.image4}`).default}
                alt="Third slide"
              />

              <Carousel.Caption style={{ zIndex: '1' }}>
                <h3>{this.state.desp4}</h3>
                
              </Carousel.Caption>
            </Carousel.Item>
          </Carousel>
        )
    }
}

export default CarouselItem;