
import './index.scss'
import React from 'react'
import { Swiper, Grid } from 'antd-mobile'
import Nav from '../../components/Nav'
import {getCurrentCity} from '../../utils'
import axios from 'axios'
import Nav1 from '../../assets/images/nav-1.png'
import Nav2 from '../../assets/images/nav-2.png'
import Nav3 from '../../assets/images/nav-3.png'
import Nav4 from '../../assets/images/nav-4.png'

// 导航菜单数据
const navs = [
  {
    id: 1,
    img: Nav1,
    title: '整租',
    path: '/home/list'
  },
  {
    id: 2,
    img: Nav2,
    title: '合租',
    path: '/home/list'
  },
  {
    id: 3,
    img: Nav3,
    title: '地图找房',
    path: '/map'
  },
  {
    id: 4,
    img: Nav4,
    title: '去出租',
    path: '/rent'
  }
]

export default class Index extends React.Component {
  state = {
    // 轮播图状态数据
    swipers: [],
    // 租房小区数据
    groups: [],
    // 最新资讯
    news: [],
    // 当前城市名称
    curCity: '上海'
  }
  // 获取轮播图数据的方法
  getSwipers = async () => {
    const res = await axios.get('http://localhost:3030/home/swiper')
    this.setState({
      swipers: res.data.body
    })
  }

  // 获取租房小组数据的方法
  getGroups = async () => {
    const res = await axios.get('http://localhost:3030/home/groups', {
      params: {
        area: 'AREA|88cff55c-aaa4-e2e0'
      }
    })
    this.setState({
      groups: res.data.body
    })
  }
  // 获取最新资讯
  getNews = async () => {
    const res = await axios.get('http://localhost:3030/home/news', {
      params: {
        area: 'AREA|88cff55c-aaa4-e2e0'
      }
    })
    this.setState({
      news: res.data.body
    })
  }
  // 通过IP获取城市定位
  getCurCity = async () => {
    const curCity = await getCurrentCity()
    this.setState({
      curCity: curCity.label
    })
  }
  componentDidMount() {
    this.getSwipers()
    this.getGroups()
    this.getNews()
    this.getCurCity()
  }

  // 渲染轮播图结构
  renderSwipers = () => {
    return this.state.swipers.map(item => 
      <Swiper.Item key={item.id}>
        <div className="swiper-content" style={{background: `url("http://localhost:3030${item.imgSrc}") center center / cover no-repeat`}}></div>
      </Swiper.Item>
    )
  }
  // 渲染导航菜单
  renderNavs = () => {
    return navs.map(item => {
      return (
        <Grid.Item key={item.id} >
          <div onClick={(e) => {this.props.history.push(item.path)}}>
            <img src={item.img} alt={item.title} />
            <h2>{item.title}</h2>
          </div>
        </Grid.Item>
      )
    })
  }
  // 渲染租房小区的数据
  renderGroups = () => {
    return this.state.groups.map(item => 
      <Grid.Item key={item.id} className="item">
        <div className="content">
          <h2 className="tit">{item.title}</h2>
          <div className="desc">{item.desc}</div>
        </div>
        <img className="img" src={'http://localhost:3030' + item.imgSrc} alt={item.title}></img>
      </Grid.Item>
    )
  }
  // 渲染最新资讯
  renderNews = () => {
    return this.state.news.map(item => 
      <div className="item" key={item.id}>
        <img className="img" src={'http://localhost:3030' + item.imgSrc} alt={item.title}></img>
        <div className="info">
          <div className="tit">{item.title}</div>
          <div className="bottom">
            <span className="website">{item.from}</span>
            <span className="time">{item.date}</span>
          </div>
        </div>
      </div>
    )
  }
  render() {
    return (
      <div className="index-page">
        {/* 轮播图 */}
        <div className="swiper">
          {/* {...this.props} */}
          <Nav history={this.props.history} curCity={this.state.curCity}></Nav>
          <Swiper>{this.renderSwipers()}</Swiper>
        </div>
        {/* 导航菜单 */}
        <Grid columns={4} gap={8} className="nav" >
          {this.renderNavs()}
        </Grid>
        {/* 租房小组 */}
        <div className="group">
          <h3 className="title">
            租房小组 <span className="more">更多</span>
          </h3>
          <Grid columns={2} gap={8} >
            {this.renderGroups()}
          </Grid>
        </div>
        {/* 最新资讯 */}
        <div className="news">
          <h3 className="group-title">最新资讯</h3>
          <div className="newsList">
            {this.renderNews()}
          </div>
        </div>
      </div>
    )
    
  }
}