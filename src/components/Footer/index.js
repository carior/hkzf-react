import { TabBar } from 'antd-mobile'
import React from 'react'
import './index.css'
export const Footer = (props) => {
  const tabs = [
    {
      key: 'index',
      title: '首页',
      icon: <i className="iconfont icon-ind"></i>,
    },
    {
      key: 'list',
      title: '找房',
      icon: <i className="iconfont icon-findHouse"></i>,
    },
    {
      key: 'news',
      title: '资讯',
      // icon: (active: boolean) =>
      //   active ? <MessageFill /> : <MessageOutline />,
      icon: <i className="iconfont icon-infom"></i>,
    },
    {
      key: 'profile',
      title: '个人中心',
      icon: <i className="iconfont icon-my"></i>,
    },
  ]

  const changeActiveKey = (currentKey) => {
    props.getMsg(currentKey)
  }

  return (
    <div className="hkzf-footer"> 
      <TabBar activeKey={props.activeKey} onChange={changeActiveKey}>
        {tabs.map(item => (
          <TabBar.Item key={item.key} icon={item.icon} title={item.title}></TabBar.Item>
        ))}
      </TabBar>
    </div>
  )
}