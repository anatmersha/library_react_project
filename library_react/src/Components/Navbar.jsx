import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import AvatarMaker from "../AvatarMaker.png";

const Navbar = ({auth,setAuth,setPopUp,popUp}) => {
const [logOut, setLogOut] = useState(false);
const userData = JSON.parse(localStorage.getItem(auth));
// const userName = userData[5];

    return(
        <header style={{width: "100vw", zIndex: "9999"}}>

            <div className="popUP" style={{display: logOut ? "inline-block" : "none"}}>
            <img style={{width: "115px", marginLeft: "-9px", marginTop: "60px"}} src="https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fcdn.onlinewebfonts.com%2Fsvg%2Fimg_554891.png&f=1&nofb=1" alt=""/><br/> 
            <h3 style={{fontSize: "40px"}}>Are you sure</h3>
            <button className="yesBtn" onClick={()=> {
                setAuth(null);
                setLogOut(false);
                }}>Yes</button>
            <button className="noBtn" onClick={()=> {
                setLogOut(false);
                }}>No</button>
            </div>

            <div className="popUP" style={{display: popUp ? "inline-block" : "none"}}>
                <img width="200px" src="https://media4.giphy.com/media/EIbNk3GZnHYOa9Zfz5/200w.webp?cid=ecf05e47n31lh0tvqx22hm0v2emxihh13f08gwztxoxg06po&rid=200w.webp&ct=g" alt=""/>
                <h1>sorry</h1>
                <h2>It seems you are not active</h2>
                <h2>Would you like to stay?</h2>

                <button className="yesBtn" onClick={()=> {
                    setPopUp(false);
                }}>Yes</button>

                <button className="noBtn" onClick={()=> {
                    setAuth(null);
                    setPopUp(false);
                }}>No</button>
            </div>

        <div style={{textAlign: "center"}}>
        <h1 className="logoHeader">BookTown</h1>
        <p className="logoSubHeader"><i>“So many books, so little time.”</i></p>

        </div>

        <hr></hr>     

        <div className="mainNavbar">
        <li>
            <Link to="/">Books List</Link>
        </li>
        <li>
            <Link to="/ReadingList">Reading List</Link>
        </li>
        <li>
            <Link to="/CompletedList">Completed List</Link>
        </li>
        <li>
        <i class="fa fa-user-circle"></i>

        <button className="logoutBtn" onClick={()=>{
            setPopUp(true)
        }}>Log Out</button>
        </li>
        {/* <li>
        <span className="userChip" style={{float:"right", backgroundColor: "#f1f1f1", borderRadius: "25px", height: "50px", lineHeight: "50px", marginTop: "-10px"}}>
        <img style={{float: "left", width: "50px", height: "50px", borderRadius: "50%"}} src={AvatarMaker} alt="Person" width="96" height="96"/>{userName}</span>
        </li> */}
        </div>
        <hr></hr>     
        </header>
    )
}

export default  Navbar;