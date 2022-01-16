import { useEffect, useState } from "react"
import axios from "axios";
import Styles from "./Spinner.module.css";
import Note from "./Note";

const Details = ({auth,bookID}) => {
    const [book, setBook] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [err, setErr] = useState(false);

    useEffect(getData, [bookID]);
    
    function getData() {
        setIsLoading(true)
          axios
          .get(`https://www.googleapis.com/books/v1/volumes?q=${bookID}`)
          .then((response)=> {
            //   console.log(response.data.items);
              setBook(response.data.items)
              setIsLoading(false)
          })
          .catch((error)=> {
              console.error(error.response);
              setErr(true)
              setIsLoading(false)
          });  
    }


    return(
        <>
        <h1>Details</h1>
        {isLoading ? <div style={{width:"100px", height:"100px", marginLeft: "880px", marginBottom: "20px"}} className={Styles.spinner}></div> : ""} 

            {book.map(item=> {
                return (
                <div key={item.id}>
                    <img src={item.volumeInfo.imageLinks} alt={item.volumeInfo.title}/><br/> 
                    <p>{item.volumeInfo.title}</p>
                    <p><i>Wrriten by {item.volumeInfo.authors} published by {item.volumeInfo.publisher}</i></p>
                    <p>description: {item.volumeInfo.description}</p>     
                </div>                          
            )})}   
            <Note bookID={bookID} auth={auth}/>

        {err ? <p style={{color: "red"}}>error</p> : ""}
        </>
    )
}

export default Details;