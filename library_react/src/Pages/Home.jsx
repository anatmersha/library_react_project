import Login from "../Components/Login";
import Register from "../Components/Register";
import "./Home.css";

const Home = ({setAuth}) => {

    return(
        <div className="homePage">

        <div className="loginForms">
        <Register setAuth={setAuth}/>
        <Login setAuth={setAuth}/>
        </div>
        
        <div className="frontLogo">
        <img className="bookLogo" src="https://media3.giphy.com/media/xT8qBt3pdiCZrk3erS/giphy.gif?cid=ecf05e47rcfo5mnynlzfz62rda6eh48bemn7hkkyi5u42p32&rid=giphy.gif&ct=g" alt=""/>
        <h1 className="mainHeader">BookTown</h1>
        </div>

        </div>
    )
}
export default Home;