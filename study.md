笔记地址：https://blog.csdn.net/qq_42007217/article/details/120605032

`npm i react react-dom`

npx是 npm v5.2.0引入的一条命令， 目的是提升包内提供的命令行工具的使用体验

React.createElement()

ReactDom.render()

使用react脚手架初始化项目
原来：
npm i -g create-react-app
create-react-app my-app
或者
现在：`npx create-react-app my-app`

使用npx 无需安装脚手架包 就可以直接使用这个包提供的命令

vue create myapp (myapp为自定义项目名)

### 在脚手架中使用React
import React from 'react'
import ReactDOM from 'react-dom'

const title = React.createElement('h1', null, 'Hello')

ReactDom.render(title, doucment.getElementById('root'))

### JSX
const title = <h1>Hello</h1>
ReactDOM.render(title, doucment.getElementById('root'))

通过 @babel/preset-react 编译了JSX的语法包

#### 注意点
1. React 元素的属性名用驼峰命名法
2. 特殊属性名 class -> className, for -> htmlFor , tabindex -> tabIndex
3. 没有子节点的React元素可以用/>结束
4. 推荐使用() 包裹JSX语法，从而可以避免JS中的自动插入分号的陷阱

### JSX的条件渲染
```js
const isloading = true
const loadData = () => {
  if(isloading) {
    return <div>loading...</div>
  }
  return <div>数据加载完成</div>
}

// 三元运算符写法
const loadData2 = () => {
  return isloading ? (<div>loading...</div>) : (<div>数据加载完成</div>)
}

// 逻辑与运算符
const loadData2 = () => {
  return isloading && (<div>loading...</div>)
}

const dv = (
  <div> {loadData()}</div>
)

ReactDom.render(dv, doucment.getElementById('root'))
```
### JSX的列表渲染
```js
const songs = [
  {id: 1, name: '痴心绝对'},
  {id: 2, name: '像我这样的人'},
  {id: 3, name: '南山南'},
]
const list = (
  <ul>
    {songs.map(item => <li key={item.id}>{item.name}</li>)}
  </ul>
)
```
### JSX的样式处理
1. 行内样式 
```js
<h1 style={{color: 'red', backgroundColor: 'skyblue'}}> xxx
</h1>
```
2. 类名 className
```js
<h1 className="title" style={{color: 'red', backgroundColor: 'skyblue'}}> xxx
</h1>
```

总结：React完全利用JS语言自身的能力来编写UI，而不是造轮子增强HTML功能

### React组件介绍
组件是React的一等公民，使用react就是在使用组件
1. 使用函数创建组件
- 函数名称必须以答谢字母开头
- 函数组件必须有返回值 或者 return null
```js
function Hello() {
  return (
    <div>这是我的第一个函数</div>
  )
}

// 使用箭头函数
const Hello = () => <div>这是我的第一个函数</div>
```
ReactDom.render(<Hello />, doucment.getElementById('root'))

2. 使用类创建组件
- 类名称必须以大写字母开头
- 类组件应该继承React.Component父类，从而可以使用父类中提供的方法或属性
- 类组件必须提供render() 方法
- render方法必须有返回值
```js
class Hello extends React.Component {
  render() {
    return (
      <div>这是我的第一个类组件</div>
    )
  }
}
ReactDom.render(<Hello />, doucment.getElementById('root'))
```
### react 事件处理
- on + 事件名称 = {事件处理程序}
- React 事件采用驼峰命名法 onFocus, onMouseEnter
```js
class App extends React.Compnent {
  handleClick(e) {
    e.preventDefault() // 阻止浏览器的默认行为
    console.log('事件对象', e) // react中的事件对象被称为：合成事件
    console.log('单击事件触发了')
  }
  render() {
    return (
      <button onClick={this.handleClick}>+1</button>
    )
  }
}
```
### 有状态组件 无状态组件
- 状态即数据
- 函数组件没有自己的状态，只负责数据展示（静）
- 类组件有自己的状态 负责更新ui，让页面动起来

1.state的基本使用
```js
class App extends React.Compnent {
  // constructor() {
  //   super()

  //   this.state = {
  //     count: 0
  //   }
  // }
  // 简化语法
  state = {
    count: 0
  }
  render() {
    return (
      <h1>计数器：{ this.state.count }</h1>
    )
  }
}
// 渲染组件
ReactDom.render(<App />, doucment.getElementById('root'))
```
2.setState
- 注意不要直接修改state中的值 `this.state.count+=1`
- 而要使用
- setState()作用： 1.修改state 2.更新UI
- 思想：数据驱动视图
```js
<button onClick={() => {
  this.setState({
    count: this.state.count + 1
  })
}}>+1</button>

```
### 从JSX中抽离事件处理程序
```js
class App extends React.Compnent {
  state = {
    count: 0
  }
  onIncrement() {
    // 事件处理程序中的this为undefined
    this.setState({
      count: this.state.count + 1
    })
  }
  render() {
    return (
      <h1>计数器：{ this.state.count }</h1>
      <button onClick={this.onIncrement}>+1</button>
    )
  }
}
// 渲染组件
ReactDom.render(<App />, doucment.getElementById('root'))
```
1. 解决事件绑定的this指向问题
- 箭头函数，箭头函数不绑定this的特点
```js
<button onClick={() => this.onIncrement()}>+1</button>
```
2. Function.prototype.bind()
利用ES5中的bind方法，将事件处理程序中的this与组件实例绑定到一起
```js
class App extends React.Compnent {
  constructor() {
    super()
    this.onIncrement = this.onIncrement.bind(this)
    this.state = {
      count: 0
    }
  }
  render() {
    return (
      <h1>计数器：{ this.state.count }</h1>
    )
  }
}
```
3.class 实例方法
```js
class App extends React.Compnent {
  state = {
    count: 0
  }
  onIncrement = () => {
    this.setState({
      count: this.state.count + 1
    })
  }
  render() {
    return (
      <h1>计数器：{ this.state.count }</h1>
      <button onClick={this.onIncrement}>+1</button>
    )
  }
}
```
总结：推荐使用 class实例方法

### 表单处理
1.受控组件:其值受到了React控制的表单元素
- 在state中添加一个状态，控制表单元素值的来源
- 给表单元素绑定change事件，将表单元素的值设置为state的值（控制表单元素值的变化）
```js
class App extends React.Compnent {
  state = {
    txt: '',
    content: '',
    city: 'bj',
    isChecked: false
  }
  handleChange = (e) => {
    this.setState({
      txt: e.target.value
    })
  }
  handleContent = (e) => {
    this.setState({
      content: e.target.value
    })
  }
  handleCity = (e) => {
    this.setState({
      city: e.target.value
    })
  }
  handleChecked = (e) => {
    this.setState({
      isChecked: e.target.checked
    })
  }
  render() {
    return (
      <div>
        {/* 文本框 */}
        <input type="text" name="txt" value={this.state.txt} onChange = { this.handleChange } />
        {/* 富文本框 */}
        <testarea type="text" value={this.state.content} onChange={ this.handleContent } name="content"></testarea>
        {/* 下拉框 */}
        <select value={this.state.city} onChange={ this.handleCity } name="city" >
          <option value="sh">上海</option>
          <option value="bj">北京</option>
          <option value="gz">广州</option>
        </select>
        {/* 复选框 */}
        <input type="checkbox" name="isChecked" checked={this.state.isChecked} onChange={ this.handleChecked } />
      </div>
    )
  }
}

```
总结：复选框操作checked的值，文本框，下拉框都是操作value的值

优化 使用一个事件处理程序同时处理多个表单元素
- 1.给表单添加name属性，名称与state相同
- 2.根据表单元素类型获取对应值
```js
handleForm = (e) => {
  const target = e.target
  const value = target.type === 'checkbox'
    ? target.checked
    : target.value
  const name = target.name
  this.setState({
    [name]: value
  })
}

```
2.非受控组件
> 了解即可，借助于ref，使用原生DOM方式来获取表单元素的值

使用步骤：
- 1.调用React.createRef() 方法创建一个ref对象
```js
constructor(props) {
  super(props)
  this.state = {
    title: '城市选择',
    cityList: {},
    cityIndex: [],
    activeIndex: 0, // 指定右侧高亮的索引号
  }
  this.txtRef = React.createRef()
}
```
- 2.将创建好的 ref对象添加到文本框中
`<input type="text" ref={this.txtRef} />`

- 3.通过ref对象获取到文本框的值
`console.log(this.txtRef.current.value)`

### react 组件案例
### 组件通讯
- props 接收传递给组件内的数组
- 传递数据：给组件标签添加属性
- 接收数据： 函数组件通过参数props接收数据，类组件通过this.props接收数据

```js
// 函数组件
const Hello = (props) => {
  props.fn()
  return (
    <div>
      <h1>props:{props.name}</h1>
    </div>
  )
}
// 传递数据name
ReactDom.render(<Hello name="jack" />, doucment.getElementById('root'))
```

```js
// 类组件
class Hello extends React.Compnent {
  constructor(props) {
    // 如果写了构造函数，推荐将props传递给父类构造函数
    super(props)
  }
  render() {
    return (
      <div>
        <h1>props：{ this.props.name }</h1>
      </div>
    )
  }
}
// 传递数据name
ReactDom.render(<Hello name="rose" age={19} fn={() => {}} color={['red']} tag={<p>这是一个p标签</p>} />, doucment.getElementById('root'))
```
props特点
- 1.可以给组件传递任意类型的数据
- 2.props是**只读**的对象，只能读取属性的值，无法修改对象
- 3.注意：使用类组件时，如果写了构造函数，**应该将props传递给super()**,否则，无法在构造函数中获取到props

### 通讯的三种方式
#### 父组件传递给子组件
1. 父组件提供要传递的state数据
2. 给子组件标签添加属性，值为state中的数据
3. 子组件中通过props接收父组件中传递的数据
```js
// 父组件
class Parent extends React.Component {
  state = {
    lastName: '汪'
  }

  render() {
    return (
      <div className="parent">
        父组件
        <Child name={this.state.lastName} />
      </div>
    )
  }
}

// 子组件
const Child = props => {
  return (
    <div className="child">
      <p>子组件，接收到父组件的数据{props.name}</p>
    </div>
  )
}
```
#### 子组件传递数据给父组件
利用回调函数，父组件提供回调，子组件调用，将要传递的数据作为回调函数的参数
1. 父组件提供一个回调函数（用于接收数据）
2. 将该函数作为属性值，传递给子组件
3. 子组件通过props调用回调函数
4. 将子组件中的数据 作为参数传递给回调函数
```js
// 父组件
class Parent extends React.Component {
 
 getChildMsg = (data) => {
   console.log('接收到子组件中传递过来的数据：', data)
 }

  render() {
    return (
      <div className="parent">
        父组件
        <Child getMsg={this.getChildMsg} />
      </div>
    )
  }
}

// 子组件
class Child extends React.Component {
  state = {childMsg: 'React'}
  handleClick = () => {
    this.props.getMsg(this.state.childMsg)
  }
  render() {
    return (
      <div className="child">
        子组件：<button onClick={this.handleClick}>点我 给父组件传递数据</button>
      </div>
    )
  }
  
}
```
#### 兄弟组件
1. 将共享状态提升到最近的公共父组件中，由**公共父组件**管理这个状态（状态提升思想）
2. 公共父组件职责： 1.提供共享状态 2.提供操作共享状态的方法
3. 要通讯的子组件只需要通过props接收状态或操作状态的方法

### context 实现跨组件传递
使用步骤：
1. 调用React.createContext()创建Provider（提供数据）和consumer（消费数据）两个组件
`const {Provider, Consumer} = React.createContext()`
2. 使用Provider组件作为父节点
```js
<Provider>
    <div className="App">
        <Child1 />
    </div>
</Provider>
```
3. 设置value属性，表示要传递的数据
`<Provider value="pink">`
4. 使用Consumer组件接收数据
```js
<Consumer>
    { data => <span>data参数表示接收到的数据 -- {data} </span> }
</Consumer>
```

### props 深入
1. children属性
- children属性： 表示组件标签的子节点，当组件标签有子节点时，props就会有该属性
- children属性与普通的props一样，值可以是任意值（文本，React元素，组件，甚至是函数）
```js
function Hello(props) {
    return (
        <div>
            组件的子节点: {props.children}
        </div>
    )
}
<Hello>我是子节点</Hello> // children为文本节点
```

2. props 深入
对于组件来说，props是外来的，无法保证组件使用者传入什么格式的数据,如果传入的格式有误，可能会导致组件内部报错

- props校验：允许在创建组件的时候，就指定props的类型，格式等
- 作用：捕获使用组件时因为props导致的错误，给出明确的错误提示，增加组件的健壮性
```js
App.propTypes = {
  colors: PropTypes.array,
  fn: PropTypes.func.isRequired,
  tag: PropTypes.element,
  filter: PropTypes.shape({
    area: PropTypes.string,
    price: PropTypes.number
  })
}
```
使用步骤：
1. 安装包 `npm i prop-types -S`
2. 导入包 `import PropTypes from 'prop-types'`
3. 使用`组件名.propTypes = {}`来给组件的props添加校验规则

约束规则
1. 常见类型：array bool func number object string
2. React元素: element
3. 必填项: isRequired
4. 特定结构的对象: shape({})

props默认值, 即使在没有传入props的时候也会生效
```js
App.defaultProps = {
  size: 10
}
```

### 组件的生命周期
- 组件的声明周期有助于理解组件的运行方式 完成更复杂的组件功能 分析组件错误原因等
- 只有类组件才有生命周期

1. 创建时（挂载阶段）
- 创建时机：组件创建时（页面加载时）
- 执行顺序： constructor() -> render() -> componentDidMount()
  constructor : 创建组件时，最先执行
    1. 初始化state
    2. 为事件处理程序绑定this
  render：每次渲染组件都会触发
    1. 渲染ui（注意**不能调用setState**）
  componentDidMount: 组件挂载（完成DOM渲染）后
    1. 发送网络请求
    2. DOM操作
2. 更新时
会导致组件更新的三种方式：
- setState() 
- `this.forceUpdate()` 会导致组件强制更新
- 组件接收到新的props，父组件先执行render 子组件再执行render

执行顺序： render() -> componentDidUpdate()
  componentDidUpdate: 组件更新（完成DOM渲染）后
    1. 发送网络请求
    2. DOM操作
    注意：如果要setState() 必须放在 一个if条件中
  ```js
    // 因为如果直接调用setState更新状态，也会导致递归更新
    componentDidUpdate(prevProps) {
      // 正确做法，比较更新前后的props是否相同，，来决定是否重新渲染组件
      if(prevProps.count !== this.props.count) {
        this.setState({})
        // 发送ajax请求
      }
    }
  ```
3. 卸载时
组件从页面中消失
componentWillUnmount(), 执行清理工作（比如：清理定时器等）

### render-props和高阶组件
React组件复用：
两种方式： 1. render props模式 2.高阶组件（HOC）

1. render props模式
思路：将要复用的state和操作state的方法封装到一个组件中

如何拿到该组件中复用的state
- 在使用组件时，添加一个值为函数的prop，通过 函数参数来获取（需要组件内部实现）

如何渲染任意的UI
- 使用该函数的**返回值**作为要渲染的UI内容（需要组件内部实现）
```js
<Mouse render={(mouse) => {}} />

<Mouse render={(mouse) => 
  <p>鼠标当前的位置{mouse.x}{mouse.y}</p>
}>
```
```js
// render props 模式
// 创建Mouse组件
class Mouse extends React.Component {
  state = {
    x: 0,
    y: 0
  }

  // 鼠标移动事件的事件处理程序
  handleMouseMove = e => {
    this.setState({
      x: e.clientX,
      y: e.clientY
    })
  }

  // 监听鼠标移动事件
  componentDidMount() {
    window.addEventListener('mousemove', this.handleMouseMove)
  }

  componentWillUnmount() {
    window.removeEventListener('mousemove', this.handleMouseMove)
  }

  render() {
    return this.props.render(this.state)
  }
}

Mouse.propTypes = {
  children: propTypes.func.isRequired
}

class App extends React.Component {
  render() {
    return (
      <div>
        <h1>render props模式</h1>
        <Mouse render={(mouse) => {
          return (
            <p>鼠标当前的位置{mouse.x}{mouse.y}</p>
          )
        }}></Mouse>
      </div>
    )
  }
}
ReactDOM.render(<App />, document.getElementById('root'))
```

#### children 代替 render 属性
- 注意：并不是该模式叫做 render props就必须使用render的prop，实际上可以使用任意名称的prop
- 推荐使用children代替render属性
```js
<Mouse>
  {(mouse) => {
    return (
      <p>鼠标当前的位置{mouse.x}{mouse.y}</p>
    )
  }}
</Mouse>
// Mouse 组件内部
render() {
  return this.props.children(this.state)
}
```
#### 高阶组件
目的：实现状态逻辑复用
解释：高阶组件（HOC，Higher-Order Component）是一个函数，接收要包装的组件，返回增强后的组件
思路：高阶组件内部创建一个类组件，在这个类组件中提供复用的状态逻辑代码，通过prop将复用的状态传递给被包装组件 WrapperdComponent
`const EnhancedComponent = withHOC(WrapperdComponent)`
```js
// 高阶组件内部创建的类组件
class Mouse extends React.Component {
  render() {
    return <WrappedComponent {...this.state} />
  }
}
```
使用步骤：
1.创建一个函数，名称约定以**with开头**
2.指定函数参数，参数应该以**大写字母开头**（作为要渲染的组件）
3.在函数内部创建一个类组件，**提供复用的状态逻辑代码**，并返回
4.在该组件中，渲染参数组件，同时将状态通过prop传递给参数组件
5.调用该高阶组件，传入要增强的组件，通过返回值拿到增强后的组件，并将其渲染到页面中
```js
function withMouse(WrappedComponent) {
  class Mouse extends React.Component {
    render() {
      return <WrappedComponent {...this.state} />
    }
  }
  return Mouse
}
```
例子：
```js
// 高阶组件
// 创建高阶组件
 function withMouse(WrappedComponent) {
  //  该组件提供复用的住
  class Mouse extends React.Component {
    state = {
      x: 0,
      y: 0
    }
    // 鼠标移动事件的事件处理程序
    handleMouseMove = e => {
      this.setState({
        x: e.clientX,
        y: e.clientY
      })
    }

    // 监听鼠标移动事件
    componentDidMount() {
      window.addEventListener('mousemove', this.handleMouseMove)
    }

    componentWillUnmount() {
      window.removeEventListener('mousemove', this.handleMouseMove)
    }
    render() {
      return <WrappedComponent {...this.state} {...this.props} />
    }
  }

  // 设置displayName
  Mouse.displayName = `WithMouse${getDisplayName(WrappedComponent)}`

  return Mouse
} 

function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component'
}

// 用来测试高阶组件
const Position = props => (
  <p>
    鼠标当前位置: (x: {props.x}, y: {props.y})
  </p>
)

// 猫捉老鼠组件
const Cat = props => (
  <img src={img} alt="" style={{
    position: "absolute",
    top: props.y - 64,
    left: props.x - 64
  }} />
)

// 获取增强后的组件
const MousePosition = withMouse(Position)
const MouseCat = withMouse(Cat)

class App extends React.Component {
  render() {
    return (
      <div>
        <h1>高阶组件</h1>
        {/*渲染增强后的组件*/}
        <MousePosition a="1" />
        <MouseCat />
        {
          this.state.cityIndex.map(item => 
            <div className="item" key={item.id}>
              
              <div className="info">{item}
              </div>
            </div>
          )
        }
      </div>
    )
  }
}
ReactDOM.render(<App />, document.getElementById('root'))
```

#### 设置displayName
```js
Mouse.displayName = `WithMouse${getDisplayName(WrappedComponent)}`

function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component'
}
```

## React 原理揭秘
### setState()的说明
- setState更新数据是异步的
- 可以多次调用setState，但只会触发一次重新渲染
```js
state = {
  count: 1
}
handleClick = () => {
  // 注意：setState异步更新数据，后面的setState不要依赖前面的setState，第二次不是基于第一次的值
  this.setState({
    count: this.state.count + 1
  })
  console.log('count', this.state.count) // 打印出来还是 1，实际上页面展示的是2
}
```
- 推荐语法
```js
handleClick = () => {
  // 注意：这种语法也是异步更新state，和上面的区别在与两次调用，第二次是基于第一次的值
  this.setState((state, props) => {
    return {
      count: state.count + 1
    }
  })
  console.log('count', this.state.count) // // 打印出来还是 1，实际上页面展示的是2
}

```
- 第二个参数
状态更新后 并且重新渲染后，立即执行，与componentDidUpdate类似
```js
this.setState(
  (state, props) => {},
  () => {
    console.log('这个回调函数会在状态更新后立即执行', this.state.count)
  }
)
```

### JSX语法的转化过程
- jsx仅仅是createElement()方法的语法糖
- jsx语法被 @babel/preset-react插件编译为createElement()方法
- react元素：是一个对象，用来描述你希望在屏幕上看到的内容
```js
// jsx语法
const element = {
  <h1 className="greeting">
    Hello JSX!
  </h1>
}
```
```js
// createElement()
const element = React.createElement(
  'h1',
  {className: 'greeting'},
  'Hello JSX'
)
```
```js
// React元素
// 注意这个是简化过的结构
const element = {
  type: 'h1',
  props: {
    className: 'greeting',
    children: 'Hello JSX!'
  }
}
```
### 组件更新机制
- setState()作用： 1.修改state 2.更新UI
- 过程：父组件重新渲染时，也会重新渲染子组件。但只会渲染当前组件子树（当前组件及其所有子组件）
- 问题：子组件没有任何变化时 也会重新渲染
- 解决方式：使用钩子函数 shouldComponentUpdate(nextProps, nextState)
- 作用：通过返回值决定该组件是否重新渲染，返回true表示重新渲染，false表示不重新渲染

### 组件性能优化
1. 减轻state：只存储跟组件渲染相关的数据(比如：count/列表数据/loaidng等)
- 注意：不用做渲染的数据不要放在state中，比如定时器id等
- 对于这种需要在多个方法中用到的数据，应该放在this中
```js
class Hello extends Component {
  componentDidMount() {
    // timerId存储到this中，而不是state中
    this.timerId = setInterval(() => {}, 2000)
  }
  componentWillUnmount() {
    clearInterval(this.timerId)
  }
}
```
2. 避免不必要的重新渲染
- 触发时机：更新阶段的钩子函数，组件重新渲染前执行（shouldComponentUpdate -> render）
```js
class Hello extends Component {
  // 钩子函数
  shouldComponentUpdate(nextProps, nextState) {
    // 根据条件，决定是否重新渲染组件
    console.log('最新的状态',nextState)
    console.log('更新前的状态', this.state)
    return false
  }
}
```
```js
// 生成随机数
class App extends React.Component {
  state = {
    number: 0
  }
  handleClick = () => {
    this.setState(state => {
      return {
        number: Math.floor(Math.random * 3)
      }
    })
  }
  // 因为两次生成的随机数可能相同 此时不需要重新渲染
  shouldComponentUpdate(nextProps, nextState) {
    // if(this.state.number === nextState.number) return false
    // return true
    return this.state.number !== nextState.number
  }
  render() {
    console.log('render')
    return (
      <div>
        <h1>随机数:{this.state.number}</h1>
        <button onClick={this.handleClick}>重新生成</button>
      </div>
    )
  }
}
ReactDOM.render(<App />, document.getElementById('root'))
```

```js
// 生成随机数
class App extends React.Component {
  state = {
    number: 0
  }
  handleClick = () => {
    this.setState(state => {
      return {
        number: Math.floor(Math.random * 3)
      }
    })
  }
  
  render() {
    return (
      <div>
        <NumberBox number={this.state.number}></NumberBox>
        <button onClick={this.handleClick}>重新生成</button>
      </div>
    )
  }
}

class NumberBox extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return this.props.number !== nextProps.number
  }
  render() {
    console.log('子组件render')
    return <h1>随机数:{this.props.number}</h1>
  }
}
ReactDOM.render(<App />, document.getElementById('root'))
```
3. 纯组件 PureComponent 提升性能
- 说明: 纯组件内部的对比是 shallow compare(浅层对比)
- 对于值类型来说：比较两个值是否相同（直接赋值即可）
- 对于引用类型来说：只比较对象的引用（地址）是否相同
- 注意：state或props中属性值为引用类型时，应该创建新的数据，不要直接修改原数据
- 如果是数组类型的话，不要用push、unshift等直接修改当前数组的方法，而应该用concat 或 slice，...,等这些返回新数组的方法
```js
// 生成随机数
class App extends React.PureComponent {
  state = {
    obj: {
      number: 0
    }
  }
  handleClick = () => {
    // 错误演示：直接修改原始对象中的属性值
    // 结果：并不会重新渲染组件
    // 原因：PureComponent内部比较  最新的state.obj 与 上一次的 state.obj 相同，所以不会重新渲染
    const newObj = this.state.obj
    newObj.number = Math.floor(Math.random * 3)
    this.setState(state => {
      return {
        obj: newObj
      }
    })
    // 正确做法
    const newObj = {...this.state.obj, number: Math.floor(Math.random * 3)}
  }
  render() {
    return (
      <div>
        <h1>随机数:{this.state.obj.number}</h1>
        <button onClick={this.handleClick}>重新生成</button>
      </div>
    )
  }
}
ReactDOM.render(<App />, document.getElementById('root'))
```
### 虚拟DOM和Diff算法
- reatc更新视图的思想：只要state变化就重新渲染视图
- 部分更新，只更新变化的地方

执行过程：
1. 初次渲染时，React会根据出事state（Model），创建一个虚拟DOM对象（树）
2. 根据虚拟DOM生成真正的DOM，渲染到页面中。
3. 当数据变化后（setState()），重新根据新的数据，创建新的虚拟DOM对象（树）
4. 与上一次得到的虚拟DOM对象，使用Diff算法对比(找不同)，得到需要更新的内容
5. 最终，React只将变化的内容更新(patch)到DOM中，重新渲染到页面

注意：render方法的调用并不意味着浏览器中的重新渲染，render方法调用仅仅说明要进行diff

虚拟DOM的真正价值从来都不是性能，虚拟DOM让react脱离了浏览器环境的束缚，虚拟DOM仅仅是js对象，为react跨平台应用提供了保障

### react 路由
路由是一套映射规则，是**URL路径**与**组件**的对应关系
1. 安装 `npm i react-router-dom`
2. 导入路由的三个核心组件： Router/Route/Link
`import {BrowerRouter as Router, Route, Link} from 'react-router-dom'`
3. 使用 Router 组件包裹整个应用, 一个React应用只需要使用一次
```js
const App = () => {
  <Router>
    <div>
      <h1>React路由基础</h1>
    </div>
  </Router>
}
ReactDOM.render(<App />, document.getElementById('root'))
```
4. 使用Link组件作为导航菜单(路由入口)，a标签
`<Link to="/first">页面1</Link>`
5. 使用**Route组件**配置路由规则和要展示的组件(路由出口)
```js
const First = () => <p>页面一的页面内容</p>
const App = () => {
  <Router>
    <div>
      <h1>React路由基础</h1>000..
      2122 46 5
      {/* to属性：浏览器地址栏中的pathname */}
      <Link to="/first">页面1</Link>
      {/* path属性：路由规则 */}
      <Route path="/first" component={First}>页面1</Route>
    </div>
  </Router>
}
ReactDOM.render(<App />, document.getElementById('root'))
```
#### 两种常用Router
- HashRouter ：使用URL的哈希值实现(localhost:3000/#/first), `import {HashRouter as Router, Route, Link} from 'react-router-dom'`
- BrowserRouter: 使用H5的history API实现(localhost:3000/first)，推荐使用BrowserRouter

#### 路由执行的过程
1. 点击Link组件（a标签），修改了浏览器地址栏中的url
2. React 路由监听到了地址栏的url变化
3. React 路由内部遍历所有的Route组件，使用路由规则（path）与pathname进行匹配
4. 当路由规则(path) 能够匹配地址栏中的pathname时，就展示该Route组件的内容

#### 编程式导航
通过JS代码来实现页面跳转
- history 是React路由提供的，用于获取浏览器历史记录的相关信息
- 默认情况下 只有路由 Route 直接渲染的组件才能够获取到路由信息(比如.history.go(-1)等)，如果需要在其他组件中获取到路由信息需要传入history或者使用高阶组件（widthRouter）
```js
class Login extends Component {
  handleLogin = () => {
    this.props.history.push('/home')
    // go(-1) 返回到上一页
    this.props.history.go(-1)
  }
  render(){...}
}
```
#### 默认路由
表示进入页面时就会匹配的路由,默认路由path为:/
```js
<Route path="/" component={Home} >
```

#### 匹配模式
- React路由是模糊匹配模式，只要pathname以path开头就都会匹配成功
- path代表Route的path属性
- pathname代表Link组件的to属性(也就是location.pathname)

问题：希望点了登录页面之后，默认路由不展示，怎么实现
- 给Route组件添加exact属性，让其变为精确匹配路由
- 精确匹配：只有当path和pathname完全匹配时，才会展示
```js
<Route exact path="/" component=''></Route>
```

### 好客租房项目
技术栈：
1. React核心库：react react-dom react-router-dom
2. create-react-app
3. axios
4. antd-mobile
5. react-virtualized formik+yup react-spring
6. 百度地图API


问题：
1.嵌套路由

### 问题
- 长列表性能优化
城市列表 通讯录 微博等
会导致页面卡顿 滚动不流畅 等性能问题
大量DOM节点的重绘重排
老旧设备
移动端设备耗电加快 影响移动设备电池寿命

-方案：1.懒渲染 2.可视区域渲染

懒渲染：
原理：每次只渲染一部分数据（比如10条），等渲染的数据即将渲染完成时，在渲染下面的部分
优点：渲染速度快
缺点：数据量还是大，DOM节点依然很多，占用内存过多，降低浏览器渲染性能，导致页面卡顿
使用场景：分页加载，数据量不大的情况下

可视区域渲染（react-virtualized）：
原理：只渲染页面可视区域的列表项，非可视区域的数据“完全不渲染”，在滚动列表时动态更新列表项目
使用场景：一次性展示大量数据,渲染大型列表或者表格数据

- 组件间样式覆盖问题
原因： 在配置路由时，CityList组件和Map组件都被导入到项目中，那么组件的样式也就被导入到项目中了，如果组件之间的样式名称相同，那么一个组件中的样式就会在另一个组件中也生效，
从而造成组件之间样式互相覆盖的问题。
如何解决：
 - 1. 起不同的类名
 - 2. CSS in JS：使用javascript来编写css的统称，用来解决css样式冲突 覆盖等问题，css modules , styled component ,两种方式用的比较多
 - 推荐使用 CSS Moudles（react脚手架已经集成，可直接使用） 
 - CSS Moudles 是通过对CSS类名重命名。保证每个类名的唯一性，从而避免样式冲突的问题
 - 借助于 webpack 的 css-loader 插件来实现的
 - 命名是采用的BEM规范（B:block E:element, M:modifier）例如 .list_item_active
 - 在react脚手架中演化成: 文件名 类名 hash（随机）三部分组成，只需要指定类名即可 `[filename]_[className]_[hash]`

CSS Moudles使用方式：
1. 创建 [name].module.css
2. `import styles from './index.module.css`
3. 通过styles对象访问对象中的样式名来设置样式
`<div className={style.test}></div>`
4. 对于组件库已经有的全局样式,需要使用:global()来指定
`:global(.adm-nav-bar-title){color:'#333'}`
或者
`.root :global(.adm-nav-bar-title){color:'#333'}`