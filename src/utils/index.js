
import axios from 'axios'
// 辅助性的工具函数
export const getCurrentCity = () => {
  const localcity = JSON.parse(localStorage.getItem('hkzf_city'))
  if(!localcity) {
    return new Promise((resolve, reject) => {
      const curCity = new window.BMapGL.LocalCity();
      curCity.get(async (res) => {
        try {
          const result = await axios.get(`http://localhost:3030/area/info?name=${res.name}`)
          localStorage.setItem('hkzf_city', JSON.stringify(result.data.body))
          resolve(result.data.body)
        } catch(e) {
          reject(e)
        }
      }); 
    })
  }
  // 因为上面使用了promise 因此为了该函数返回值的统一 此处 也应该使用promise
  return Promise.resolve(localcity)
}