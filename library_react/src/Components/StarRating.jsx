import { useState } from "react";
import "./StarRating.css";

const StarRating = ({auth,bookID}) => {
    const [rating, setRating] = useState(0);
    // const [hover, setHover] = useState(0);
    // const handleHover = (value) => setHover(value)
    const userData = JSON.parse(localStorage.getItem(auth));
    const temp = userData;
    const rates = temp[4].ratingList;    
    const rateIndex = rates.findIndex((book) => book.bookID === bookID);
    
    const handleClick = (value) => {
        if(rateIndex === -1) {
            setRating(value + 1);
            temp[4].ratingList.push({bookID,value})
        }else{
        const currentRate = temp[4].ratingList[rateIndex];
        setRating(currentRate.value)
        console.log(`curr: ${currentRate.value}`);
        localStorage.setItem(auth, JSON.stringify(temp));            
        }
        localStorage.setItem(auth, JSON.stringify(temp));
    }

    return(
        <>
        <h2>StarRating</h2>
        <div className="star-rating">
        {[...Array(5)].map((star, i) => {
            return (
                <button key={i}
                style={{color: rating > i ? "red" : "black"}}
                onClick={()=> handleClick(i)}>

                <span title="Star raiting" class="fa fa-star"></span>
                </button>
            )})}
        </div>
        </>
    )
}

export default StarRating;