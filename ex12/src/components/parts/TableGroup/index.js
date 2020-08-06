import React, { Component } from 'react'
import CDropdown from '../../pieces/Dropdown'
import CTable from '../../pieces/Table'
import SearchForm from './SearchForm'
import TableControls from './TableControls'
import axios from 'axios'

class TableGroup extends Component {
  constructor(props) {
    super(props)

    this.state = {
      requesting: false,
      listInQueue: false,

      TableHeader: ['Title', 'Description', 'Categories'],
      list: [],
      count: 0, // Table Controls
      pageIndex: 1,
      pageSize: 5,
      search: '',
      filter: {
        categoryId: '' //dropdown
      },
      optionCategories: [
        { value: '', text: "Select category" }
      ]
    }
    //bind this for handlers
    this.callApiCount = this.callApiCount.bind(this)
    this.callApiList = this.callApiList.bind(this)
    this.setPageConfig = this.setPageConfig.bind(this)
  }
  componentDidMount() {
    let state = this.state
    this.callApiCount(state)
    this.callApiList(state)
    this.callOptionCategories()
  }
  componentWillUpdate(newProps, newState) {
    // console.log('will update', newState, this.state)
    let oldState = this.state
    let mustCallList = false
    let mustCallCount = false
    if (newState.pageIndex != oldState.pageIndex) {
      mustCallList = true
    }
    if (newState.pageSize != oldState.pageSize) {
      mustCallList = true
    }
    if (newState.search != oldState.search) {
      mustCallList = true
      mustCallCount = true
    }
    if (newState.filter.categoryId != oldState.filter.categoryId) {
      mustCallList = true
      mustCallCount = true
    }

    if (mustCallCount) {
      this.callApiCount(newState)
    }
    if (mustCallList) {
      this.callApiList(newState)
    }
  }
  setPageConfig(config = { pageIndex, pageSize, search, filter }) {
    // console.log('set new state')
    this.setState(config)
  }

  callApiCount(state) {
    this.setState({ requesting: true })
    let { search, filter } = this.state
    let queryParams = {
      count: true,
      search,
      categoryId: filter.categoryId || ''
    }

    axios.request({
      url: 'http://localhost:9000/api/productasc',
      method: 'GET',
      params: queryParams
    }).then(
      res => {
        let count = res.data.count || 0
        this.setState({ count })
      })
      .finally(() => {
        this.setState({ requesting: false })
      })
  }

  callApiList(state) {
    if (this.state.requesting) {
      this.setState({ listInQueue: true })
      return
    }
    let { pageIndex, pageSize, search, filter } = state

    let queryParams = {
      pageIndex,
      pageSize,
      search,
      categoryId: filter.categoryId || ''
    }

    axios.request({
      url: 'http://localhost:9000/api/productasc',
      method: 'GET',
      params: queryParams
    }).then(res => {
      // console.log('response', res)
      let list = res.data
      this.setState({ list })
    })
  }

  callOptionCategories() {
    axios.request({
      url: 'http://localhost:9000/api/category',
      method: 'GET',
    }).then(res => {
      // console.log('response', res)
      let categories = res.data
      // console.log(categories)
      let optionCategories = [
        { value: '', text: 'Select category' }, ...categories.map(category => {
          return { value: category._id, text: category.title }
        })
      ]
      console.log(optionCategories);
      this.setState({ optionCategories })
    })
  }
  render() {
    console.log('render')
    let { list, TableHeader, count, pageIndex, pageSize, filter, optionCategories, search } = this.state
    return (
      <div className="c-table-group">
        {/* {this.state.count}
        {JSON.stringify(this.state.list)} */}
        <div>
          <SearchForm
            value={search}
            onChange={(value) => {
              this.setPageConfig({ search: value })
            }}
            placeholder="Enter search keywords..." />
          <CDropdown
            value={filter.categoryId}
            options={optionCategories}
            onChange={(value) => {
              this.setPageConfig({ filter: { categoryId: value } })
            }}
          />
        </div>
        <div>
          <CTable list={list}
            header={TableHeader} />
        </div>
        <div>
          <TableControls
            count={count}
            pageIndex={pageIndex}
            pageSize={pageSize}
            setPageConfig={this.setPageConfig}
          // callApiList={this.callApiList}
          />
        </div>
      </div>
    )
  }
}

export default TableGroup
