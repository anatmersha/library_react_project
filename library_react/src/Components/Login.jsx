import { useState } from "react";
import axios from "axios";
import Styles from "./Spinner.module.css";

const Login = ({setAuth}) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [err, setErr] = useState(false);
    const [errMsg, setErrMsg] = useState("");
    const [field, setField] = useState(false);

    function getUser() {
        const API_KEY = "AIzaSyD24t8rsYHvjCoJ9t4mI6IO4tcFzrWM7Vs";
        const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`;
    
        setIsLoading(true);

            axios
            .post(url, {
                email,
                password,
            })
            .then(function (response) {
                setAuth(response.data.email)
                setIsLoading(false)
            })
            .catch(function (error) {
                console.log(error);
                setIsLoading(false)
                setErr(true);
                setErrMsg(error.response.data.error.message)
            });
    }

    return(
        <div style={{marginTop: "8vh"}}>
            <h1>LOGIN</h1>
            {field ? <p className="fieldMissingMsg">Please fill all field !</p> : ""}

            <form onSubmit={(e)=> {
                e.preventDefault();
                if(email !== "" &&
                password !== "" && errMsg === ""){
                    getUser();
                }else{
                    setField(true);
                }

            }}>
                <input className="loginInput" placeholder="Insert email" autoComplete="off" type="email" onChange={(e)=> setEmail(e.target.value)}/><br/>
                <input className="loginInput" placeholder="Insert password" autoComplete="off" type="password" onChange={(e)=> setPassword(e.target.value)}/><br/>
                <button className="loginButton" type="submit">login</button>
            </form>
            
            {isLoading ? <div style={{width: "50px", height: "50px", marginLeft: "220px", marginTop: "15px"}} className={Styles.spinner}></div> : ""} 
            {err ? <p className="error">{errMsg}</p> : ""}

        </div>
    )
}

export default Login;