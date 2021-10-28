import React from 'react'
import {Route} from 'react-router-dom'
import News from '../News'
import Index from '../Index'
import HouseList from '../HouseList'
import Profile from '../Profile'
import {Footer} from '../../components/Footer'

export default class Home extends React.Component {
  getChildMsg = (data) => {
    this.props.history.push(`/home${data === 'index' ? '' : `/${data}`}`)
  }
  render() {
    return (
      <div>
        {/* 渲染子路由 */}
        <Route exact path="/home" component={Index}></Route>
        <Route path="/home/news" component={News}></Route>
        <Route path="/home/list" component={HouseList}></Route>
        <Route path="/home/profile" component={Profile}></Route>
        {/* Footer */}
        <Footer getMsg={this.getChildMsg} activeKey={this.props.location.pathname.split('/')[2] || 'index'}></Footer>
      </div>
    )
  }
}