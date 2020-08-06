import React, { Component } from 'react'
import Cbutton from '../../pieces/button'

class TableControls extends Component {
  constructor(props = { count, pageIndex, pageSize, setPageConfig}) {
    super(props)
  }
  genpageIndexNumbers(pageIndex, maxPage) {
    let result = [pageIndex]
    for (let i = 1; i < 3; i++) {
      let pageIndexNumber = pageIndex + i
      if (pageIndexNumber > maxPage) {
        break
      } else {
        result.push(pageIndexNumber)
      }
    }
    return result
  }

  toPage(newPageIndex, maxPage) {
    console.log(newPageIndex)
    let currentPageIndex = this.props.pageIndex
    if (newPageIndex != currentPageIndex
      && newPageIndex > 0
      && newPageIndex <= maxPage) {
      this.props.setPageConfig({ pageIndex: newPageIndex })
      // this.props.callApiList()
      // setTimeout(this.props.callApiList(),1)
    }
  }
  render() {
    let { count, pageIndex, pageSize } = this.props
    let maxPage = Math.ceil(count / pageSize)
    let pageIndexNumbers = this.genpageIndexNumbers(pageIndex, maxPage)
    return (
      <div className="table-controls">
        <Cbutton onClick={() => this.toPage(pageIndex - 1, maxPage)}>&lt;&lt;</Cbutton>
        {pageIndexNumbers.map(number => {
          let isCurrentPageIndex = number == pageIndex
          let clickHandler = () => this.toPage(number, maxPage)
          return isCurrentPageIndex
            ? (
              <Cbutton key={number}
                style={{ textDecoration: 'underline' }}
                onClick={clickHandler}>{number}</Cbutton>
            )
            : (
              <Cbutton key={number}
                onClick={clickHandler}>{number}</Cbutton>
            )


        })}
        <Cbutton onClick={() => this.toPage(pageIndex + 1, maxPage)}>&gt;&gt;</Cbutton>

      </div>
    )
  }
}

export default TableControls
