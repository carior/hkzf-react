import React from 'react'
import './index.scss'

// 获取地理位置信息 TODO 谷歌浏览器 始终走的是fail
// if("geolocation" in navigator) {
// 	navigator.geolocation.getCurrentPosition(function(position) {
// 		console.log(position);
// 	},function(err) {
// 		console.log(err);
// 	});
// }


export default class Nav extends React.Component {
  handleClick = () => {
    this.props.history.push('/citylist')
  }

  render() {
    return (
      // 搜索框
      <div className="seatch-box">
        {/* 左侧白色区域 */}
        <div className="search">
          {/* 位置 */}
          <div className="location" onClick={() => {this.handleClick()}}>
            <span className="name">{this.props.curCity}</span>
            <i className="iconfont icon-arrow"></i>
          </div>
          {/* 搜索表单 */}
          <div className="form" onClick={() => {this.props.history.push('/search')}}>
            <i className="iconfont icon-search"></i>
            <span className="text">请输入小区或地址</span>
          </div>
        </div>
        {/* 右侧地图图标 */}
        <i className="iconfont icon-map" onClick={() => {this.props.history.push('/map')}}></i>
      </div>
    )
  }
}