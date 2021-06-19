import React, { Component } from 'react'
import { Carousel, Row, Col } from 'react-bootstrap'
import axios from 'axios'
import { Control, LocalForm } from 'react-redux-form'

import { url } from '../shared/constant'

import Header from './CommonComponents/Header'
import image from '../images/Main.jpg'
import '../css/homepage.css'
import { Link } from 'react-router-dom'
import { Button } from 'reactstrap'

class Homepage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      typingTimer: 1,
      doneTypingInterval: 1000,
      searchArray: []
    }
    this.searchProduct = this.searchProduct.bind(this)
    this.doneTyping = this.doneTyping.bind(this)
    this.searchResults = this.searchResults.bind(this)
  }
  //triggers when user press any key
  searchProduct(e) {
    clearTimeout(this.state.typingTimer);
    if (e.search) {
      this.setState({
        typingTimer: setTimeout(this.doneTyping, this.state.doneTypingInterval)
      })
    }
  }
  //when user stops writing for 0.7 sec and matching results are fetched
  doneTyping() {
    let search = document.getElementById("globalsearch").value
    axios.post(`${url}/masterproducts/search`, { search })
      .then((res) => {
        this.setState({
          searchArray: res.data.map((matchedProducts) => {
            return (matchedProducts)
          })
        })
      })
    search ? document.getElementById("searchArray").style.display = "block" : document.getElementById("searchArray").style.display = "none";
  }
  //clicked on any search results menu and render to that item's details page
  searchResultrenderto(category, id) {
    window.location.href = `/${category}/detail/${id}`
  }
  //if clicked or submited search bar form then all matching results will be displayed
  searchResults() {
    document.getElementById("searchArray").style.display = "none";
    document.getElementById('openSearchResults').click()
  }
  render() {
    return (
      <div>
        <Header />
        <Row>
          <Col className="col-12 p-0">
            <div className="col-12" style={{ position: 'absolute' }}>
              <div className="overlay"></div>
              <div className="mdbcolsd col-12">
                <LocalForm onChange={this.searchProduct} onSubmit={this.searchResults}>
                  <Row>
                    <Control.text id="globalsearch" className="form-control col-8 offset-2" placeholder="Search" model=".search" style={{ background: "rgba(0, 0, 0, 0.4)", color: "white" }} ></Control.text>
                    <Button><Link id="openSearchResults"
                      to={{
                        pathname: `/searchresults`,
                        state: {
                          sa: this.state.searchArray,
                        },
                      }}><i className="fa fa-search" /></Link></Button>
                  </Row>
                  <ul className="form-control col-8 offset-2" id="searchArray" style={{ display: "none", boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)", backgroundColor: "white", listStyleType: "none", height: "fit-content" }}>
                    {this.state.searchArray.slice(0, 5).map((ele) => {
                      return (
                        <li style={{ marginLeft: "0", height:"fit-content", padding: "10px", cursor: 'pointer' }} onClick={() => { this.searchResultrenderto(ele.category, ele._id) }}>{(ele.Brand + " " + ele.Name + " " + ele.Colors).toLowerCase()}</li>
                      )
                    })
                    }
                  </ul>
                  <div className="sliderr mt-3 mb-3">
                    <p className="col-6 m-auto">We provide you the best</p>
                    <p className="col-8 m-auto">EXPERIENCE</p>
                  </div>
                </LocalForm>
              </div>
            </div>
            <img src={image} alt="Main" style={{ width: "100%", height: "77vh" }} />
          </Col>
        </Row>

        <Row style={{ paddingTop: "100px" }}>
          <div className="col-sm-12 col-md-6 col-lg-4 d-inline-block">
            <Carousel>
              <Carousel.Item interval="1000">
                <img
                  style={{ height: "50vh" }}
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
                  style={{ height: "50vh" }}
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
                  style={{ height: "50vh" }}
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
          <div className="d-none d-sm-inline-block col-sm-6 col-lg-4">
            <Carousel>
              <Carousel.Item interval="1000">
                <img
                  style={{ height: "50vh" }}
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
                  style={{ height: "50vh" }}
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
                  style={{ height: "50vh" }}
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
          <div className="d-none d-lg-inline-block col-lg-4">
            <Carousel>
              <Carousel.Item interval="1000">
                <img
                  style={{ height: "50vh" }}
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
                  style={{ height: "50vh" }}
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
                  style={{ height: "50vh" }}
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