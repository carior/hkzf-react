import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import routers from "./router/index";

function App() {
  return (
    <Router>
      <div className="App">
        {/* 配置路由 */}
        <Switch>
          {
            routers.map((router, index)=>{
              return (
                  <Route
                      path={router.path}
                      component = { router.component }
                      key={index}
                  ></Route>
              )
            })
          }
          <Redirect from="/*" to="/home" />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
