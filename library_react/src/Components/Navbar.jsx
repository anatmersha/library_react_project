import { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import AvatarMaker from "../AvatarMaker.png";

const Navbar = ({auth,setAuth,setPopUp,popUp}) => {
const [logOut, setLogOut] = useState(false);
const userData = JSON.parse(localStorage.getItem(auth));
const userName = userData[5];

    return(
        <div style={{width: "15%", position: "fixed"}}>


        <div className="mainNavbar">
            <h3 className="logoHeader">BookTown</h3>
        <li>
        <span className="userChip" style={{float:"right", backgroundColor: "#f1f1f1", borderRadius: "25px", height: "50px", lineHeight: "59px", marginTop: "-10px", paddingRight: "1vw"}}>
        <img style={{float: "left", width: "50px", height: "50px", borderRadius: "50%"}} src={AvatarMaker} alt="Person" width="96" height="96"/>Hello {userName}</span>
        </li>
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
            setLogOut(true)
        }}>Log Out</button>
        </li>
        </div>

            <div className="popUP" style={{display: logOut ? "inline-block" : "none"}}>
            <h3 style={{fontSize: "30px"}}>Are you sure</h3>
            <img style={{width: "3vw", height: "5vh", marginTop: "-2vh"}} src="https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fcdn.onlinewebfonts.com%2Fsvg%2Fimg_554891.png&f=1&nofb=1" alt=""/><br/> 

            <button className="yesBtn" onClick={()=> {
                setLogOut(false);
                setAuth(null);
                }}>Yes</button>

            <button className="noBtn" onClick={()=> {
                setLogOut(false);
                }}>No</button>
            </div>

            <div className="popUP" style={{display: popUp ? "inline-block" : "none"}}>
                <img style={{width:"15vw", marginTop: "5vh"}} src="https://media4.giphy.com/media/EIbNk3GZnHYOa9Zfz5/200w.webp?cid=ecf05e47n31lh0tvqx22hm0v2emxihh13f08gwztxoxg06po&rid=200w.webp&ct=g" alt=""/>
                <h1>sorry</h1>
                <h2>It seems you are not active</h2>
                <h2>Would you like to stay?</h2>

                <button className="yesBtn" onClick={()=> {
                    setPopUp(false);
                }}>Yes</button>

                <button className="noBtn" onClick={()=> {
                    setPopUp(false);
                    setAuth(null);
                }}>No</button>
            </div>

        </div>
    )
}

export default  Navbar;