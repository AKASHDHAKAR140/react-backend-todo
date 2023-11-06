import React from "react"
import './App.css';
//import From from "./Component/From";
//import Display from "./Component/Display";
//import { BrowserRouter, Routes, Route } from "react-router-dom"
import Todo from "./Todo.js"
import Demo from "./Demo";
import Parent from "./Parent";
//import Demo from "./Demo";
//import Nav from "./Component/Nav";
function App() {
  return (
    <div className="App">
    { /* <BrowserRouter>
        <Nav/>
        <Routes>
          <Route path="/" element={<From />} />
          <Route path="/display" element={<Display/>} />
           </Routes>
           <Demo />
  </BrowserRouter>*/}
<Parent/>
    </div>
  );
}

export default App;
