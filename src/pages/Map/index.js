import React from 'react'
import TopBar from '../../components/TopBar'
import axios from 'axios'
import './index.scss'
// 导入css module的样式文件
import styles from  './index.module.css'

export default class Map extends React.Component {
  componentDidMount() {
    // 注意在react脚手架中 全局对象要通过window来访问 否则会报eslint错误
    var map = new window.BMapGL.Map("container");
    var point = new window.BMapGL.Point(116.404, 39.915);
    map.centerAndZoom(point, 15);
    var myCity = new window.BMapGL.LocalCity();
    myCity.get((res) => {
      const cityName = res.name
      map.setCenter(cityName);
      console.log('当前定位城市' + cityName)
    }); 
  }
  // 获取房源信息
  getSwipers = async () => {
    const res = await axios.get('http://localhost:3030/home/swiper')
    this.setState({
      swipers: res.data.body
    })
  }
  render() {
    return (
      <div className="map">
      {/* <div className={styles.test}>测试样式覆盖问题</div> */}
        <TopBar onLeftClick={() => {
          console.log('点击了左侧按钮');
          this.props.history.go(-1)
        }}>地图找房</TopBar>
        <div id="container"></div>
      </div>
    )
  }
}