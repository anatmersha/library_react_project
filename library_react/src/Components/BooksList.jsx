import { useEffect, useState } from "react"
import axios from "axios";
import Search from "./Search";
import Styles from "./Spinner.module.css";
import { Link } from "react-router-dom";
import moment from 'moment';
import "./BooksList.css";

const BooksList = ({auth,setBookID}) => {
    const [books, setBooks] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [err, setErr] = useState(false);
    const [searched, setSearched] = useState("fantasy");
    const [showFlag, setShowFlag] = useState(false);
    const [startDate, setStartDate] = useState(moment().format('MM/DD/YYYY, hh:mm a'));

    const userData = JSON.parse(localStorage.getItem(auth));
    
    useEffect(getData, []);
    
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
            {isLoading ? <div style={{width:"100px", height:"100px", marginLeft: "880px", marginBottom: "20px"}} className={Styles.spinner}></div> : ""} 

            <Search setSearched={setSearched} getData={getData}/>
            
        <div className="allBooks">

            {books ?
            books.map((book,i)=> {
                const title = book.volumeInfo.title;
                const description = book.volumeInfo.description;
                const image = book.volumeInfo.imageLinks;
                const author = book.volumeInfo.authors;
                const id = book.id;

                const images= [];
                for (const property in image) images.push(image[property])


               return ( 
                <div key={i} className="bookCard">

                <Link to="/Details" onClick={()=> { 
                    setBookID(id);
                }}><img style={{height: "400px", width: "300px"}} title="Image wasn't found" src={images[1] === undefined ? 
                    "https://media3.giphy.com/media/3zhxq2ttgN6rEw8SDx/giphy.gif?cid=ecf05e47f8u2yjibc628qrn6gy6pufm8g9xktf1lyfv9ahwd&rid=giphy.gif&ct=g" 
                    : images[1]} alt={`Sorry img wasn't found`}/></Link>
                    
                <p style={{fontSize: "22px", fontWeight: "bold"}}>{title}</p>        
                <p><i>Wrriten by <b>{author}</b></i></p>

                <p className="description" style={{WebkitLineClamp: showFlag ? "initial" : "4", fontSize: "20px"}}>{description}</p>                 
                <button className="seeMoreOrLess"
                    onClick={()=> {
                        {showFlag === false ? setShowFlag(true) : setShowFlag(false)}
                    }}> {showFlag === false ? <i title="see more" class="fa fa-plus"></i> 
                                            : <i title="see less" class="fa fa-minus"></i>}
                </button>     
                



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
            )}) : ""}
        </div>
    
            {err ? <p style={{color: "red"}}>error</p> : ""}
        </div>
    )
}

export default BooksList;