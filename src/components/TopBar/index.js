import React from 'react'
import { NavBar, Toast } from 'antd-mobile'
import './index.scss'
import {withRouter} from 'react-router-dom'
import PropTypes from 'prop-types'

// 方式一 需要在使用时候 传入history <TopBar history={this.props.history}>地图找房</TopBar>
// export default class TopBar extends React.Component {
//   back = () => {
//     Toast.show({
//       content: '点击了返回区域',
//       duration: 1000,
//     })
//     this.props.history.go(-1)
//   }
    
//   render() {
//     return <NavBar onBack={this.back}>{this.props.children}</NavBar>
      
//   }
// }

// 方式二使用 withRouter
function TopBar({children, history, onLeftClick}) {
  // 默认点击行为
  const defaultHandler = () => history.go(-1)

  return <NavBar className="navBar" onBack={onLeftClick || defaultHandler} >{children}</NavBar>
}

// 添加PropTypes校验
TopBar.propTypes = {
  children: PropTypes.string.isRequired,
  onLeftClick: PropTypes.func
}

export default withRouter(TopBar)