import { useEffect, useState } from "react";
import "./StarRating.css";

const StarRating = ({auth,bookID}) => {
    const [rating, setRating] = useState(0);
    const userData = JSON.parse(localStorage.getItem(auth));
    const rates = userData[4].ratingList;    
    const rateIndex = rates.findIndex((book) => book.bookID === bookID);
    const currentRate = userData[4].ratingList[rateIndex];
    
    useEffect(()=> {
     if(rateIndex !== -1){
         setRating(currentRate.index)
         localStorage.setItem(auth, JSON.stringify(userData));            
    }
    }, [rateIndex])

    const handleClick = (value) => {
        if(rateIndex === -1) {
            setRating(value + 1);
            let index = value+1;
            userData[4].ratingList.push({bookID,index})
        }
        localStorage.setItem(auth, JSON.stringify(userData));
    }

    return(
        <div className="star-rating">
        {[...Array(5)].map((star, i) => {
            return (
                <button key={i}
                style={{color: rating > i ? "red" : "black", fontSize: "22px"}}
                onClick={()=> handleClick(i)}>

                <span title="Star raiting" class="fa fa-star"></span>
                </button>
            )})}
        </div>
    )
}

export default StarRating;