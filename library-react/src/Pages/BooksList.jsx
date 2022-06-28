import { useEffect, useState } from "react"
import axios from "axios";
import Search from "../Components/Search";
import Styles from "../Components/Spinner.module.css";  
import { Link } from "react-router-dom";
import moment from 'moment';
import "./BooksList.css";

const BooksList = ({auth,setCurrent}) => {
    const [books, setBooks] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [err, setErr] = useState(false);
    const [searched, setSearched] = useState("fantasy");
    const [startDate, setStartDate] = useState(moment().format('MM/DD/YYYY, hh:mm a'));

    const userData = JSON.parse(localStorage.getItem(auth));
    
    useEffect(getData, [searched]);
    
    function getData() {
        setIsLoading(true)
        axios
        .get(`https://www.googleapis.com/books/v1/volumes?q=${searched}`)
        .then((response)=> {
              console.log(response.data.items);
              setBooks(response.data.items)
              setIsLoading(false)
            })
          .catch((error)=> {
              console.error(error.response);
              setErr(true)
              setIsLoading(false)
            });  
    }

    return (
        <div className="booksList">

            <Search setSearched={setSearched} getData={getData}/>
            
        <div className="allBooks">
            {isLoading ? <div style={{width:"100px", height:"100px", marginRight: "38vw", marginBottom: "2vh", marginTop: "5vh"}} className={Styles.spinner}></div> : ""} 

            {books ?
            books.map((book,i)=> {
                const title = book.volumeInfo.title;
                const description = book.volumeInfo.description;
                const shortDescription = description?.slice(0, 675);
                const image = book.volumeInfo.imageLinks;
                const author = book.volumeInfo.authors;
                const id = book.id;


                const images= [];
                for (const property in image) images.push(image[property])

               return ( 
                <div key={i} className="bookCard">

                <Link to="/Details" onClick={()=> { 
                    setCurrent(book);
                }}><img style={{height: "45vh", width: "15vw", left: "0", position:"absolute", bottom: "10px"}} title="click for details" src={images[1] === undefined ? 
                    "https://media3.giphy.com/media/3zhxq2ttgN6rEw8SDx/giphy.gif?cid=ecf05e47f8u2yjibc628qrn6gy6pufm8g9xktf1lyfv9ahwd&rid=giphy.gif&ct=g" 
                    : images[1]} alt="click for details"/></Link>
                    
                    <div className="bookCardDetails">
                <p style={{fontSize: "22px", fontWeight: "bold"}}>{title}</p>        
                <p><i>Wrriten by <b>{author}</b></i></p>

                <p className="description">description: {description?.length > 675 ? shortDescription + "..." : description}</p> 

                <button className="pushToReadings" onClick={()=> {
                    const temp = userData;
                    const readingIndex = temp[0].readingsList.findIndex((item) => item.id === book.id);
                    if(readingIndex === -1){
                        temp[0].readingsList.push(book);
                        temp[3].readingTime.push({id, startDate})
                    }

                    localStorage.setItem(auth, JSON.stringify(temp));
                }}><i class="fa fa-heart" title="Add to your reading list"></i></button>

                    </div>
                </div> 

            )}) : ""}
        </div>
    
            {err ? <p style={{color: "red"}}>error</p> : ""}
        </div>
    )
}

export default BooksList;