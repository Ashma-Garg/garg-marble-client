import React, { Component } from 'react'
import { Carousel, Row, Col } from 'react-bootstrap'
import Header from './CommonComponents/Header'
import image from '../images/Main.jpg'
import '../css/homepage.css'
import { Control, LocalForm } from 'react-redux-form'

class Homepage extends Component {
  render() {
    return (
      <div>
        <Header />
        <Row>
          <Col className="col-12">
            <div className="mdbcolsd col-12">
              <LocalForm>
                <Control.text className="form-control col-8 offset-2" placeholder="Search" model=".search" style={{ background: "rgba(0, 0, 0, 0.4)", color: "white" }} />
              </LocalForm>
            </div>

            <div className="sliderr col-6 offset-3">
              <p>We provide you the best</p>
              <p>EXPERIENCE</p>
            </div>
            <div className="overlay"></div>
            <img src={image} alt="Main" style={{ width: "100%", height: "100vh" }} />
          </Col>
        </Row>

        <Row style={{ paddingTop: "100px" }}>
          <div id="first" className="col-sm-12 col-md-6 col-lg-4 d-inline-block">
            <Carousel>
              <Carousel.Item interval="1000">
                <img
                  style={{ height: "70vh" }}
                  className="d-block w-100"
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQDkwsEzbofdPAhLy8aWJCzpm1os0MBgB1Xlg&usqp=CAU"
                  alt="First slide"
                />
                <Carousel.Caption>
                  <h3>ToiLet Seats</h3>
                  <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item interval="1000">
                <img
                  style={{ height: "70vh" }}
                  className="d-block w-100"
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQy6GtX0HM-a5DyUCYQtawHXj-Tf41aD-EF1w&usqp=CAU"
                  alt="Third slide"
                />

                <Carousel.Caption>
                  <h3>WashBasin</h3>
                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item interval="1000">
                <img
                  style={{ height: "70vh" }}
                  className="d-block w-100"
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSXxZDYcRbZMiPTZQ05Z3URKfnzyhZZO4XVYw&usqp=CAU"
                  alt="Third slide"
                />

                <Carousel.Caption>
                  <h3>Taps</h3>
                  <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
                </Carousel.Caption>
              </Carousel.Item>
            </Carousel>
          </div>
          <div id="second" className="col-sm-12 col-md-6 col-lg-4">
            <Carousel>
              <Carousel.Item interval="1000">
                <img
                  style={{ height: "70vh" }}
                  className="d-block w-100"
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQDkwsEzbofdPAhLy8aWJCzpm1os0MBgB1Xlg&usqp=CAU"
                  alt="First slide"
                />
                <Carousel.Caption>
                  <h3>ToiLet Seats</h3>
                  <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item interval="1000">
                <img
                  style={{ height: "70vh" }}
                  className="d-block w-100"
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQy6GtX0HM-a5DyUCYQtawHXj-Tf41aD-EF1w&usqp=CAU"
                  alt="Third slide"
                />

                <Carousel.Caption>
                  <h3>WashBasin</h3>
                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item interval="1000">
                <img
                  style={{ height: "70vh" }}
                  className="d-block w-100"
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSXxZDYcRbZMiPTZQ05Z3URKfnzyhZZO4XVYw&usqp=CAU"
                  alt="Third slide"
                />

                <Carousel.Caption>
                  <h3>Taps</h3>
                  <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
                </Carousel.Caption>
              </Carousel.Item>
            </Carousel>
          </div>
          <div id="third" className="col-sm-12 col-md-12 col-lg-4">
            <Carousel>
              <Carousel.Item interval="1000">
                <img
                  style={{ height: "70vh" }}
                  className="d-block w-100"
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQDkwsEzbofdPAhLy8aWJCzpm1os0MBgB1Xlg&usqp=CAU"
                  alt="First slide"
                />
                <Carousel.Caption>
                  <h3>ToiLet Seats</h3>
                  <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item interval="1000">
                <img
                  style={{ height: "70vh" }}
                  className="d-block w-100"
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQy6GtX0HM-a5DyUCYQtawHXj-Tf41aD-EF1w&usqp=CAU"
                  alt="Third slide"
                />

                <Carousel.Caption>
                  <h3>WashBasin</h3>
                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item interval="1000">
                <img
                  style={{ height: "70vh" }}
                  className="d-block w-100"
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSXxZDYcRbZMiPTZQ05Z3URKfnzyhZZO4XVYw&usqp=CAU"
                  alt="Third slide"
                />

                <Carousel.Caption>
                  <h3>Taps</h3>
                  <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
                </Carousel.Caption>
              </Carousel.Item>
            </Carousel>
          </div>
        </Row>
      </div>
    );
  }
}
export default Homepage;