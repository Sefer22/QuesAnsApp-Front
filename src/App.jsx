import './App.css'
import { BrowserRouter, Switch, Route } from "react-router-dom";

function App() {

  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route path="/" ></Route>
        </Switch>
      </BrowserRouter>
    </div>
  )
}

export default App
