import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './components/Home/Home';
import User from './components/User/User';
import Navbar from './components/Navbar/Navbar';

function App() {

  return (
    <div>
      <BrowserRouter>
        <Navbar></Navbar>
        <Routes>
          <Route path="/" component={Home}></Route>
          <Route path="/users/:userId" component={User}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
