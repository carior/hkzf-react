import Home from '../pages/Home'
import CityList from '../pages/CityList'
import Index from '../pages/Index'
import Map from '../pages/Map'

const routers = [
  {
    path:'/home',
    component:Home,
    children:[
      {
          path:'/index',
          component:Index
      },
    ]
  },
  {
    path:'/citylist',
    component:CityList
  },
  {
    path:'/map',
    component:Map
  },
  {
    path:'/search',
    component:CityList
  }
]
export default routers

