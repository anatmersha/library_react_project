import { useState } from "react";
import StarRating from "./StarRating";
import "./CompletedList.css";

    const CompletedList = ({auth}) => {
        const userData = JSON.parse(localStorage.getItem(auth));
        const [completedBooks, setCompletedBooks] = useState(userData[1].completedList)
        // const completedBooks = userData[1].completedList;
        const readingCount = userData[3].readingTime;
        const noteList = userData[2].notesList;
        // const rate = userData[4].ratingList;

        return (
            <div className="completedList">
        <h1>CompletedList</h1>
            <div className="completedBooks">
        {completedBooks.map(item=> {
        // const readIndex = userData[3].readingTime.findIndex((book) => book.id === item.id);
        const noteIndex = userData[2].notesList.findIndex((book) => book.bookID === item.id);
        // const rateIndex = userData[4].ratingList.findIndex((book) => book.bookID === item.id);   
        console.log(userData[3].readingTime);
        const image = item.volumeInfo.imageLinks; 
        const images= [];
        for (const property in image) images.push(image[property])
                return (
                    
                <div key={item.id} className="completedBookCard">
                <img style={{height: "400px", width: "300px"}} title="Image wasn't found" src={images[1] === undefined ? "https://media3.giphy.com/media/3zhxq2ttgN6rEw8SDx/giphy.gif?cid=ecf05e47f8u2yjibc628qrn6gy6pufm8g9xktf1lyfv9ahwd&rid=giphy.gif&ct=g" : images[1]} alt={`Sorry img wasn't found`}/>  
                    <p style={{fontSize: "22px", fontWeight: "bold"}}>{item.volumeInfo.title}</p>
                    <p><i>Wrriten by <b>{item.volumeInfo.authors}</b></i></p>
                    <p style={{fontSize: "20px"}}>{item.volumeInfo.description}</p>     
                    
                    {/* <p style={{fontSize: "12px"}}><i>Start: {readingCount[readIndex].startDate}, Finish: {readingCount[readIndex].finishedDate}</i></p> */}

                    {noteList[noteIndex] ?
                    <div style={{backgroundColor: "beige", width: "55vw", marginLeft: "278px", marginBottom: "10px"}}>
                    <p>{noteList[noteIndex].note}</p>
                    <p style={{fontSize: "8px", textAlign: "left"}}><br/><i>BookTown</i><br/></p>
                    <p style={{fontSize: "8px", textAlign: "left"}}><br/><i>Last update: {noteList[noteIndex].date}</i><br/></p>
                </div> : ""}

                    <button className="deleteCompleted" onClick={()=> {
                        const temp = userData;

                        const currentBook = temp[1].completedList;
                        const currentTime = temp[3].readingTime;

                        const bookIndex = currentBook.findIndex((book) => book.id === item.id);
                        const timeIndex = currentTime.findIndex((book) => book.id === item.id);
                        
                        currentBook.splice(bookIndex, 1);
                        currentTime.splice(timeIndex, 1);

                        const updated = currentBook.filter((book)=> book.id !== item.id)
                        setCompletedBooks(updated);

                        localStorage.setItem(auth, JSON.stringify(temp));                         
                    }}><i title="Remove this book" class="fa fa-trash"></i></button>

                    {/* <StarRating bookID={item.id} auth={auth}/> */}
                </div>                          
        )})}  
            </div>
        </div>
    )
}

export default CompletedList;