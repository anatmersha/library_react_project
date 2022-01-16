import { useState } from "react";
import "./StarRating.css";

const StarRating = ({auth,bookID}) => {
    const [rating, setRating] = useState(0);
    const userData = JSON.parse(localStorage.getItem(auth));
console.log(`rating: ${rating}`);
    return(
        <>
        <h2>StarRating</h2>
        <div className="star-rating">
        {[...Array(5)].map((star, i) => {
            i += 1;
            return (
                <button key={i}
                style={{color: i <= rating ? "red" : "black"}}
                onClick={() => {
                    setRating(i);
                    console.log(`i= ${i}`);

                    const temp = userData;
                    const currentRate = temp[4].ratingList;    
                    const rateIndex = currentRate.findIndex((book) => book.bookID === bookID);
                    if(rateIndex === -1) {
                        currentRate.push({bookID,i});
                    }else{
                        currentRate.splice(rateIndex, 1);
                        currentRate.push({bookID,i});
                    }
                    localStorage.setItem(auth, JSON.stringify(temp));
                }}>

                <span title="Star raiting" class="fa fa-star"></span>
                </button>
            )})}
        </div>
        </>
    )
}

// export default StarRating;








