import { useState } from "react";
import moment from 'moment';
import "./ReadingList.css";

    const ReadingList = ({auth}) => {
        const [finishedDate, setFinishedDate] = useState("");
        const userData = JSON.parse(localStorage.getItem(auth));
        const [readingBooks, setReadingBooks] = useState(userData[0].readingsList)
        
        return(
            <div className="readinglist">

        <div className="readingBooks">
        {readingBooks?.length !== 0 ? readingBooks.map(item=> {
            setFinishedDate(moment().format('MM/DD/YYYY, hh:mm a'))
            const image = item.volumeInfo.imageLinks;
            const images= [];
            for (const property in image) images.push(image[property])

            return (
                <div className="readBookCard" key={item.id}>
                <img style={{height: "45vh", width: "15vw", left: "0", position:"absolute", bottom: "10px"}} title="Image wasn't found" src={images[1] === undefined ? "https://media3.giphy.com/media/3zhxq2ttgN6rEw8SDx/giphy.gif?cid=ecf05e47f8u2yjibc628qrn6gy6pufm8g9xktf1lyfv9ahwd&rid=giphy.gif&ct=g" : images[1]} alt={`Sorry img wasn't found`}/>  
                <div className="bookCardDetails">

                    <p style={{fontSize: "22px", fontWeight: "bold"}}>{item.volumeInfo.title}</p>
                    <p><i>Wrriten by <b>{item.volumeInfo.authors}</b></i></p>
                    <p className="description">{item.volumeInfo.description}</p>
                    
                    <button className="pushToCompleted" onClick={()=> {
                        const temp = userData;
                        const currentBook = temp[0].readingsList;

                        const BookIndex = currentBook.findIndex((book) => book.id === item.id);
                        const readIndex = temp[3].readingTime.findIndex((book) => book.id === item.id);
                        const completedIndex = temp[1].completedList.findIndex((book) => book.id === item.id);
                        
                        currentBook.splice(BookIndex, 1);
                        const updated = currentBook.filter((book)=> book.id !== item.id)
                        setReadingBooks(updated);
                        
                        if(completedIndex === -1){
                            temp[1].completedList.push(item);
                            temp[3].readingTime[readIndex].finishedDate = finishedDate;
                        }
                        
                        localStorage.setItem(auth, JSON.stringify(temp));    
                    }}><i title="Done reading" class="fa fa-check-square-o"></i></button>


                    <button className="deleteReading" onClick={()=> {
                        const temp = userData;

                        const currentBook = temp[0].readingsList;
                        const currentTime = temp[3].readingTime;

                        const BookIndex = currentBook.findIndex((book) => book.id === item.id);
                        const TimeIndex = currentTime.findIndex((book) => book.id === item.id);

                        
                        currentBook.splice(BookIndex, 1);
                        currentTime.splice(TimeIndex, 1);
                        
                        const updated = currentBook.filter((book)=> book.id !== item.id)
                        setReadingBooks(updated);

                        localStorage.setItem(auth, JSON.stringify(temp));                    
                    }}><i title="Remove this book" class="fa fa-trash"></i></button>

                </div>                          
                </div>                          
        )}): <h1 style={{marginRight: "38vw", marginTop: "-50vh"}}>Sorry no books chosen...</h1>} 
            </div>
        </div>
    )
}

export default ReadingList;