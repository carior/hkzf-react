import React from 'react'
import TopBar from '../../components/TopBar'
import axios from 'axios'
import './index.scss'
// 导入css module的样式文件
import styles from  './index.module.css'
import {getCurrentCity} from '../../utils'
import {List, AutoSizer} from 'react-virtualized';
// 虚拟列表无法和IndexBar 组件 一起使用，因为虚拟列表渲染后是一个整体的列表，而IndexBar中的List是一块相同字母开头的列表
import { Toast } from 'antd-mobile'

// 有房源的城市
const HOUSE_CITY = ['北京', '上海', '广州', '深圳']
// 数据格式化的方法
const formatCityData = (list) => {
  const cityList = {}
  let cityIndex = []
  list.forEach(item => {
    const first = item.short.substr(0, 1)
    if(!cityIndex.includes(first)) cityIndex.push(first)
    if(cityList[first]) {
      cityList[first].push(item)
    } else {
      cityList[first] = [item]
    }
  })
  cityIndex = cityIndex.sort()
  return {
    cityList,
    cityIndex
  }
}

// 封装处理字母索引的方法
const formatCityIndex = (letter) => {
  switch (letter) {
    case '#':
      return '当前定位'
    case 'hot':
      return '热门城市'
    default:
      return letter.toUpperCase()
  }
}

const getRandomList = (min: number, max: number): string[] => {
  return new Array(Math.floor(Math.random() * (max - min) + min)).fill('')
}

const charCodeOfA = 'A'.charCodeAt(0)
const groups = Array(26)
  .fill('')
  .map((_, i) => ({
    title: String.fromCharCode(charCodeOfA + i),
    items: getRandomList(3, 10).map(() => '111'), // lorem.generateWords(2)
  }))

export default class CityList extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      title: '城市选择',
      cityList: {},
      cityIndex: [],
      activeIndex: 0, // 指定右侧高亮的索引号
    }

    // 创建ref对象
    this.cityListComponent = React.createRef()
  }
  // 获取城市数据
  getCityList = async () => {
    const res = await axios.get('http://localhost:3030/area/city?level=1')
    const hotRes = await axios.get('http://localhost:3030/area/hot')
    const {cityList, cityIndex} = formatCityData(res.data.body)
    cityList['hot'] = hotRes.data.body
    cityList['#'] = [await getCurrentCity()]
    cityIndex.unshift('#','hot')
    this.setState({
      cityList,
      cityIndex
    })
  }
  
  rowRenderer = ({
    key, // Unique key within array of rows
    index, // 索引号
    isScrolling, // 当前项是否在滚动中
    isVisible, // 当前项在list中是可见的
    style, // Style object to be applied to row (to position it)
  }) => {
    // 获取每一行的字母索引
    const { cityIndex, cityList } = this.state
    const letter = cityIndex[index]
    const itemCity = cityList[letter]
    return (
      <div key={key} style={style} className="city">
        <div className="title">{formatCityIndex(letter)}</div>
        {itemCity.map(item => <div className="name" key={item.value} onClick={() => this.changeCity(item)}>{item.label}</div>)}
      </div>
    );
  }
  // 用户获取List组件中渲染行的信息
  onRowsRendered = ({startIndex}) => {
    const {activeIndex} = this.state
    if(activeIndex !== startIndex) {
      this.setState({
        activeIndex: startIndex
      })
    }
  }

  getRowHeight = ({index}) => {
    const { cityIndex, cityList } = this.state
    const letter = cityIndex[index]
    return (cityList[letter].length) * 50 + 36
  }

  changeCity = ({label, value}) => {
    if(HOUSE_CITY.includes(label)) {
      localStorage.setItem('hkzf_city', JSON.stringify({label, value}))
      this.props.history.go(-1)
    } else {
      Toast.show({
        content: '暂无房源信息'
      })
    }
    
  }

  renderCityList() {
    return (
      <AutoSizer>
        {({width, height}) => 
          (
            <List
              ref={this.cityListComponent}
              width={width}
              height={height}
              rowCount={this.state.cityIndex.length}
              rowHeight={this.getRowHeight}
              rowRenderer={this.rowRenderer}
              onRowsRendered={this.onRowsRendered}
              scrollToAlignment="start"
            />
          )
        }
      </AutoSizer>
    )
  }

  async componentDidMount() {
    await this.getCityList()
    // 调用 measureAllRows 提前计算List中每一行的高度，实现 scrollToRow 的精确跳转
    this.cityListComponent.current.measureAllRows()
  }

  // renderZimu = () => {
  //   return (
  //     <IndexBar>
  //       {this.state.cityIndex.map((item, index) => {
  //         const { cityIndex, cityList } = this.state
  //         const letter = cityIndex[index]
  //         const itemCity = cityList[letter]
  //         return (
  //           <IndexBar.Panel
  //             index={letter}
  //             title={`标题${letter}`}
  //             key={`标题${letter}`}
  //           >
  //             <div className="newsList">
  //               {itemCity.map(item => <div className="name" key={item.value}>{item.label}</div>)}
  //             </div>
  //           </IndexBar.Panel>
  //         )
  //       })}
  //     </IndexBar>
  //   )
  // }

  // 渲染右侧索引
  renderCityIndex = () => {
    const {cityIndex, activeIndex} = this.state
    return cityIndex.map((item, index) => <li className="city-index-item" key={item} onClick={() => {
      this.cityListComponent.current.scrollToRow(index)
    }}>
    <span className={activeIndex === index ? "index-active" : ''}>{item === 'hot' ? '热' : item.toUpperCase()}</span>
  </li>)
  }

  render() {
    return (
      <div className="cityList">
        {/* <div className={styles.test}>测试样式覆盖问题</div> */}
        <TopBar>城市选择</TopBar>
        {/* 城市列表数据 */}
        <div className="newsList">
         {this.state.cityIndex.length ?  (this.renderCityList()) : '数据加载中'}
        </div>
        {/* 右侧索引列表 */}
        <ul className="city-index">
          {this.renderCityIndex()}
        </ul>
      </div>
    )
  }
}