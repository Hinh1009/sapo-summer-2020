import React, { Component } from 'react'
import CTitle from '../components/pieces/Title'
import CSpacer from '../components/pieces/Spacer'
import CTableGroup from '../components/parts/TableGroup'

import {Link} from 'react-router-dom'
import Button from '../components/pieces/button'
class Home extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
        <h1>Demo products page</h1>
        <Link to="/login">
          <Button>
            Log in
          </Button>
        </Link>
        <CTitle>Products</CTitle>
        <CSpacer></CSpacer>
        <CTableGroup></CTableGroup>
      </div>
    )
  }
}

export default Home
