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
          <Route exact path="/" element={<Home />}></Route>
          <Route exact path="/users/:userId" element={<User />}></Route>
          <Route exact path="/auth" element={<Auth />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
