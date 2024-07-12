import './App.css'
import { BrowserRouter, Switch, Route } from "react-router-dom";

function App() {

  return (
    <div>
      <BrowserRouter>
        <NavBar></NavBar>
        <Switch>
          <Route path="/" component={Home}></Route>
          <Route path="/users/:userId" component={User}></Route>
        </Switch>
      </BrowserRouter>
    </div>
  )
}

export default App
