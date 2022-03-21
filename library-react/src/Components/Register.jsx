import { useState } from "react";
import axios from "axios";
import Styles from "./Spinner.module.css";
import "./Register.css";

    const Register = () => {

    const [userName, setUserName] = useState(null);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmedPass, setConfirmedPass] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [err, setErr] = useState(false);
    const [errMsg, setErrMsg] = useState("");
    const [field, setField] = useState(false);
    const [completed, setCompleted] = useState(false);

    function setUser() {
        const API_KEY = "AIzaSyD24t8rsYHvjCoJ9t4mI6IO4tcFzrWM7Vs";
        const url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`;

        setIsLoading(true);

        axios
        .post(url, {
            email,
            password,
            confirmedPass,
        })
        .then((response)=> {
            const userID = response.data.email;
            localStorage.setItem(userID, JSON.stringify([{readingsList: []}, {completedList: []}, {notesList: []}, {readingTime: []}, {ratingList: []}, userName]))
            console.log(userName);
            setIsLoading(false);
            setCompleted(true);        
        })
        .catch((error)=> {
            console.log(error.response.data.error?.message);
            setIsLoading(false)
            setErr(true);
            setErrMsg(error.response.data.error.message)
        });
    }
    
    return (
        <div className="registerPage">
        <h1>REGISTER</h1>
            {completed ? <p className="registerMsg">Great! Now please log in</p> : ""}
            {field ? <p className="fieldMissingMsg">Please fill all field !</p> : ""}
            <form onSubmit={(e)=> {
                e.preventDefault();
                if(userName !== "" &&
                email !== "" &&
                password !== "" &&
                confirmedPass !== "" && 
                password === confirmedPass 
                && errMsg === "") {
                        setUser();    
                }else{
                    setField(true);
                }
                setUserName("");
                setEmail("");
                setPassword("");
                setConfirmedPass("");

            }}>
                <input className="loginInput" value={userName} required placeholder="Insert user name" type="text" onChange={(e)=> setUserName(e.target.value)}/><br/>
                <input className="loginInput" value={email} required placeholder="Insert email" type="email" onChange={(e)=> setEmail(e.target.value)}/><br/>
                <input className="loginInput" value={password} required placeholder="Insert password" type="password" onChange={(e)=> setPassword(e.target.value)}/><br/>
                <input className="loginInput" value={confirmedPass} required placeholder="Insert password again" type="password" onChange={(e)=> setConfirmedPass(e.target.value)}/><br/>
                <button className="loginButton" type="submit">register</button>
            </form>  

            {isLoading ? <div style={{width: "50px", height: "50px", marginLeft: "220px", marginTop: "15px"}} className={Styles.spinner}></div> : ""} 
            
            {err ? <p className="error">{errMsg}. Please try again!</p> : ""}
        </div>
    )
}

export default Register;