import { React, Component } from 'react'
import { Control, LocalForm } from 'react-redux-form';
import { Button, Row, Col } from 'reactstrap'
import axios from 'axios'
import { Link } from 'react-router-dom';

import { url } from '../../shared/constant'
import '../../css/SearchBar.css'

class SearchBar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      typingTimer: 1,
      doneTypingInterval: 500,
      searchArray: [],
      active: false
    }
    this.searchProduct = this.searchProduct.bind(this)
    this.doneTyping = this.doneTyping.bind(this)
    this.handleClickOutside = this.handleClickOutside.bind(this);
    this.searchResults = this.searchResults.bind(this)
  }
  //if clicked anywhere then search menu should disappear
  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside);
  }
  //if clicked anywhere then search menu should disappear
  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
  }
  //if clicked anywhere then search menu should disappear after .5sec 
  handleClickOutside(event) {
    setTimeout(()=>{
      document.getElementById("searchArray").style.display = "none"
    },500) 
  }
  //triggers when user press any key
  searchProduct(e) {
    clearTimeout(this.state.typingTimer);
    this.setState({
      typingTimer: setTimeout(this.doneTyping, this.state.doneTypingInterval)
    })
  }
  //when user stops writing for 0.7 sec and matching results are fetched
  doneTyping() {
    let search = document.getElementById("globalsearch").value
    axios.post(`${url}/masterproducts/search`, { search })
      .then((res) => {
        if (res.data.length) {
          this.setState({
            searchArray: res.data.map((matchedProducts) => {
              return (matchedProducts)
            })
          })
        }
        else {
          this.setState({
            searchArray: []
          })
          document.getElementById("searchArray").style.display = "none";
        }
      })
    search ? document.getElementById("searchArray").style.display = "block" : document.getElementById("searchArray").style.display = "none";
  }
  //clicked on any search results menu and render to that item's details page
  renderto(category, id) {
    window.open(`/${category}/detail/${id}`)
  }
  //if clicked or submited search bar form then all matching results will be displayed
  searchResults() {
    document.getElementById("searchArray").style.display = "none";
    document.getElementById('openSearchResults').click()
  }

  render() {
    return (
      <div className="col-12 shadow-lg custom-color rounded styling">
        <LocalForm id="searchLocalForm" className="searchBar pt-4 pb-4 col-8 col-sm-10 m-auto" onSubmit={this.searchResults} onChange={this.searchProduct}>
          <Row className="form-group">
            <Col className="col-9 col-sm-10 col-md-11 p-0">
              <Control.text id="globalsearch" className="form-control" placeholder="Search" model=".search" />
              <Col className="p-0 m-0">
                <ul className="form-control" id="searchArray" style={{ position: 'absolute', display: "none", boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)", backgroundColor: "white", listStyleType: "none", height: "fit-content" }}>
                  {this.state.searchArray.slice(0,5).map((ele,i) => {
                    return (
                      <li key={i} style={{ marginLeft: "0", height: "fit-content", padding: "10px", cursor: 'pointer' }} onClick={() => { this.renderto(ele.category, ele._id) }}>{(ele.Brand + " " + ele.Name + " " + ele.Colors).toLowerCase()}</li>
                    )
                  })
                  }
                </ul>
              </Col>
            </Col>
            <Col className="p-0">
              <Button type="submit p-0">
                <Link id="openSearchResults"
                to={{
                  pathname: `/searchresults`,
                  state: {
                    sa: this.state.searchArray,
                  },
                }}>
                <i className="fa fa-search"/>
                </Link>
              </Button>
            </Col>
          </Row>
        </LocalForm>
      </div>
    )
  }
}
export default SearchBar