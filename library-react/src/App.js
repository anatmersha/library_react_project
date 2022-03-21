import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import BooksList from "./Pages/BooksList";
import Search from "./Components/Search";
import Details from "./Components/Details";
import StarRating from "./Components/StarRating";
import Note from "./Components/Note";
import PageNotFound from "./Pages/PageNotFound";
import Register from "./Components/Register";
import Login from "./Components/Login";
import Navbar from "./Components/Navbar";
import Home from "./Pages/Home";
import ReadingList from "./Pages/ReadingList";
import CompletedList from "./Pages/CompletedList";
import { useEffect, useState } from 'react';

function App() {
    const [auth, setAuth] = useState(null);
    const [current, setCurrent] = useState("");
    const [popUp, setPopUp] = useState(false);

  if(popUp===true){
      setTimeout(function logOutUser(){
          setAuth(null);
  }, 20000);
  }

useEffect(()=> {
  if(auth) isActive();
}, [auth])

function isActive() {
  let secondsLastActive = 0;
  const secondsMaxUnActive = 20 * 60;
  const activityEvents = ['mousedown', 'mouseup', 'mousemove', 
                          'keydown', 'keyup','scroll',]

// !Count how long he hasn't been active (events)!
// !If it's been 20min since actice -logout!
  const active = setInterval(()=> {
    secondsLastActive++;

    if(secondsLastActive >= secondsMaxUnActive){
      secondsLastActive = 0;
      setPopUp(true);
      clearInterval(active)
    }
  }, 1000)

  // !On every event start count (set back to 0) again!
  activityEvents.forEach((eventName)=> {
    window.addEventListener(eventName, ()=> {
      secondsLastActive = 0;
    })
  })
}

    return (
      <Router>
    <div className="App">    
      {auth ? 
          <Navbar setAuth={setAuth} auth={auth} setPopUp={setPopUp} popUp={popUp}/>
      : ""} 
    <Routes>
        {!auth ? <Route path="/" element={<Home setAuth={setAuth}/>}/> : ""}
        
        {auth ? <Route path="/" element={<BooksList auth={auth} setCurrent={setCurrent}/>}/> : ""} 
        
        {auth ? <Route path="/ReadingList" element={<ReadingList auth={auth}/>}/> : ""} 
        {auth ? <Route path="/CompletedList" element={<CompletedList auth={auth}/>}/> : ""} 
                
        <Route path="/Search" element={<Search/>}/>
        <Route path="/Details" element={<Details current={current} auth={auth}/>}/>
        <Route path="/StarRating" element={<StarRating/>}/>
        <Route path="/Note" element={<Note auth={auth}/>}/>
        <Route path="/Register" element={<Register setAuth={setAuth}/>}/>
        <Route path="/Login" element={<Login setAuth={setAuth}/>}/>
        <Route path="*" element={<PageNotFound/>}/>
    </Routes>
    </div>
    </Router>
  );
}

export default App;
