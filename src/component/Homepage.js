import React, { Component } from 'react'
import { Carousel, Row, Col } from 'react-bootstrap'
import axios from 'axios'
import { Control, LocalForm } from 'react-redux-form'
import { Link } from 'react-router-dom'
import { Button } from 'reactstrap'

import { url } from '../shared/constant'
import image from '../images/Main.jpg'
import image1 from '../images/Homepage1.jpg'
import image2 from '../images/Homepage2.jpg'
import image3 from '../images/Homepage3.jpg'
import image4 from '../images/Homepage4.jpg'
import image5 from '../images/Homepage5.jpg'
import image6 from '../images/Homepage6.jpg'
import image7 from '../images/Homepage7.jpg'
import image8 from '../images/Homepage8.jpg'
import image9 from '../images/Homepage9.jpg'
import image10 from '../images/Homepage10.png'
import image11 from '../images/Homepage11.jpg'
import image12 from '../images/Homepage12.jpg'
import image13 from '../images/Homepage13.jpg'

import Header from './CommonComponents/Header'
import { ContactUs } from './FunctionalComponent/ContactUs'
import {TermsAndConditions} from './FunctionalComponent/TermsAndConditions'
import '../css/homepage.css'

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
  function() {
    var elems;
    var windowHeight;
    var elems2;

    function init() {
      elems = document.querySelectorAll('.textSlide');
      elems2 = document.querySelectorAll('.textSlide2');
      windowHeight = window.innerHeight;
      addEventHandlers();
      checkPosition();
      checkPosition2();
    }

    function addEventHandlers() {
      window.addEventListener('scroll', checkPosition);
      window.addEventListener('scroll', checkPosition2);
      window.addEventListener('resize', init);
    }

    function checkPosition() {
      for (var i = 0; i < elems.length; i++) {
        var positionFromTop = elems[i].getBoundingClientRect().top;
        if (positionFromTop > -300 && positionFromTop - windowHeight <= 0) {
          elems[i].classList.add('annimate');
        }

        if ((positionFromTop - windowHeight > 1) || (positionFromTop < -300)) {
          elems[i].classList.remove('annimate');
        }
      }
    }
    function checkPosition2() {
      for (var i = 0; i < elems2.length; i++) {
        var positionFromTop2 = elems2[i].getBoundingClientRect().top;
        if (positionFromTop2 > -300 && positionFromTop2 - windowHeight <= 0) {
          elems2[i].classList.add('annimate2');
        }

        if ((positionFromTop2 - windowHeight > 1) || (positionFromTop2 < -300)) {
          elems2[i].classList.remove('annimate2');
        }
      }
    }
    init()
  };
  render() {
    return (
      <div onLoad={() => this.function()}>
        <Header />
        <Row className="col-12 p-0 ml-0 mr-0 mt-5">
          <Col className="col-12 p-0" style={{ minHeight: '77vh', maxHeight: 'fit-content' }}>
            <div className="p-0 col-12 overlay"></div>
            <div className="col-12 p-0" style={{ position: 'absolute' }}>
              <img src={image} alt="Main" style={{ width: "100%", height: "77vh" }} />
            </div>
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
                      <li style={{ marginLeft: "0", height: "fit-content", padding: "10px", cursor: 'pointer' }} onClick={() => { this.searchResultrenderto(ele.category, ele._id) }}>{(ele.Brand + " " + ele.Name + " " + ele.Colors).toLowerCase()}</li>
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
          </Col>
        </Row>

        <Row className="col-12 pl-0 pr-0 ml-0 mr-0" style={{ paddingTop: "100px" }}>
          <Col className="col-sm-12 p-0 m-0 col-md-6 col-lg-4 d-inline-block">
            <Carousel>
              <Carousel.Item interval="1000">
                <img
                  style={{ height: "50vh" }}
                  className="d-block w-100"
                  src={image11}
                  alt="First slide"
                />
                <Carousel.Caption style={{ zIndex: '1' }}>
                  <h3>Toilet Seats</h3>
                </Carousel.Caption>
              </Carousel.Item>
              
              <Carousel.Item interval="1000">
              <div className="p-0 col-12 overlay"></div>
                <img
                  style={{ height: "50vh" }}
                  className="d-block w-100"
                  src={image13}
                  alt="Third slide"
                />

                <Carousel.Caption style={{ zIndex: '1' }}>
                  <h3>Taps</h3>
                  
                </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item interval="1000">
                <img
                  style={{ height: "50vh" }}
                  className="d-block w-100"
                  src={image12}
                  alt="Third slide"
                />

                <Carousel.Caption style={{ zIndex: '1' }}>
                  <h3>Sanitary Ware</h3>
                  
                </Carousel.Caption>
              </Carousel.Item>
            </Carousel>
          </Col>
          <Col className="d-none d-md-inline-block col-md-6 col-lg-4">
            <Carousel>
              <Carousel.Item interval="1000">
                <img
                  style={{ height: "50vh" }}
                  className="d-block w-100"
                  src={image2}
                  alt="First slide"
                />
                <Carousel.Caption style={{ zIndex: '1' }}>
                  <h3>WashBasin</h3>
                  
                </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item interval="1000">
              <div className="p-0 col-12 overlay"></div>
                <img
                  style={{ height: "50vh" }}
                  className="d-block w-100"
                  src={image3}
                  alt="Third slide"
                />

                <Carousel.Caption style={{ zIndex: '1' }}>
                  <h3>Washbasin Cabinet</h3>
                  
                </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item interval="1000">
                <img
                  style={{ height: "50vh" }}
                  className="d-block w-100"
                  src={image4}
                  alt="Third slide"
                />

                <Carousel.Caption style={{ zIndex: '1' }}>
                  <h3>Mirror</h3>
                  
                </Carousel.Caption>
              </Carousel.Item>
            </Carousel>
          </Col>
          <Col className="d-none d-lg-inline-block col-lg-4">
            <Carousel>
              <Carousel.Item interval="1000">
                <img
                  style={{ height: "50vh" }}
                  className="d-block w-100"
                  src={image5}
                  alt="First slide"
                />
                <Carousel.Caption style={{ zIndex: '1' }}>
                  <h3>Bathroom Accessories</h3>
                  
                </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item interval="1000">
                <div className="p-0 col-12 overlay"></div>
                <img
                  style={{ height: "50vh" }}
                  className="d-block w-100"
                  src={image10}
                  alt="Third slide"
                />

                <Carousel.Caption style={{ zIndex: '1' }}>
                  <h3>Cistern Knobs</h3>
                  
                </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item interval="1000">
                <img
                  style={{ height: "50vh" }}
                  className="d-block w-100"
                  src={image9}
                  alt="Third slide"
                />

                <Carousel.Caption style={{ zIndex: '1' }}>
                  <h3>Shower</h3>
                  
                </Carousel.Caption>
              </Carousel.Item>
            </Carousel>
          </Col>
          </Row>
          <div className="col-8 offset-2 mt-5">
            <p>------------------------------------------------------------------------------------------------------------------------------------------------</p>
          </div>
          <Row className="col-12 mb-5 mt-5 ml-0 mr-0 p-0" style={{ letterSpacing: "2px" }}>
            <Col className="col-12 navbar-custom" style={{ color: "white", padding: "3rem" }}>
              <h3 className="mb-0">100% Satisfaction Guarantee!</h3>
              <h6 className="col-8 ml-auto mr-auto mt-0">We know you’ll love us, which is why we offer best products and brands!</h6>
              <h1>Get Started!</h1>
            </Col>
          </Row>

         <Row className="col-12 ml-0 mr-0" style={{marginTop:'7rem'}}>

            <Col className="col-12 col-md-6">
              <Link to="/washbasin"><img src={image1} alt="Washbasin" className="col-10" style={{ widht: "80%", height: "80%" }} /></Link>
            </Col>
            <Col className="col-12 col-md-6 textSlide">
              <p>
                Whether you are giving a makeover to your bathroom or adding a new washbasin, you will come across a huge variety of materials and designs to choose from.
                We have different brands because we take care of your choice. The advancement of technology has literally given us some artistic designer wash basin with high- functionality.
                We provide a huge number of washbasin options guarantying excellent quality.
                The washbasins come in so many shapes, size and colours that you cannot even imagine.
                They readily change the décor and aesthetics of your bathroom.
              </p>
            </Col>
          </Row>


           <Row className="col-12" style={{marginTop:'7rem'}}>
            <Col className="col-12 col-md-6 textSlide2">
              <p>Toilet seats are manufactured in a range of different styles and colors, and they may be furnished matching the style of the toilet itself.
                They are usually built to fit the shape of the toilet bowl: two examples of this being the elongated bowl and the regular bowl.
                Some toilet seats are fitted with slow-closing hinges to reduce noise by preventing them from slamming against the bowl.
                Some seats are made of various types of wooden materials, like oak or walnut, and others are made soft for added comfort.</p>
            </Col>
            <Col className="col-12 col-md-6">
              <Link to='/toilet'><img src={image7} alt="Toilet" className="col-10" style={{ widht: "80%", height: "80%" }} /></Link>
            </Col>

          </Row>


          <Row className="col-12" style={{marginTop:'7rem'}}>
            <Col className="col-12 col-md-6">
              <Link to='/taps'><img src={image8} alt="Taps" className="col-8" style={{ widht: "60%", height: "60%" }} /></Link>
            </Col>
            <Col className="col-12 col-md-6 textSlide">
              <p>The taps are much important for controlling the flow of water as well as saving the time too.
                Again, with the changes in technology, the designs of the taps have also changed to a great extent.
                The traditional screw taps are now replaced with advanced taps that work on infrared, electrical or even batteries.
                Not only the types but the materials they are made from have also changed to a great extent while looking for advance improvements in them.
                Taking about varieties, there is Stainless steel, both hot and cold water at a time, wall mounted kitchen taps, wall mounted basin taps, bathroom shower mixer tap designs and more.
              </p>
            </Col>
          </Row>


          {/* <Row className="col-12" style={{marginBottom:'5rem'}}>
            <Col className="col-12 col-md-6 textSlide2">
              <p> Hey there</p>
            </Col>
            <Col className="col-12 col-md-6">
              <img src={image6} alt="Showers" className="col-9" style={{ height: "70%" }} />
            </Col>
          </Row> */}
          <div className="col-12" style={{ fontFamily: 'Otomanopee One' }}>
            <h1>Just One Click Away From Your Order!!</h1>
          </div>
          <TermsAndConditions/>
          <ContactUs />
        
      </div>
    );
  }
}
export default Homepage;