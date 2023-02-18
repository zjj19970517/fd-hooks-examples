import React, { Component } from "react"
import loadable from "react-loadable"
import NProgress from "nprogress"

import "nprogress/nprogress.css"

class loadingComponent extends Component {
  constructor(props) {
    super(props)
    NProgress.start()
  }
  componentDidMount() {
    NProgress.done()
  }
  render() {
    return <div />
  }
}

const Loadable = (loader, loading = loadingComponent) => {
  return loadable({
    loader,
    loading
  })
}

export default Loadable
