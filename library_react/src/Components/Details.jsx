import Note from "./Note";
import StarRating from "./StarRating";

const Details = ({auth,current}) => {
console.log(current);
const image = current.volumeInfo.imageLinks;
const images= [];
for (const property in image) images.push(image[property])
    return(
        <>
        <h1>Details</h1>
        <div>
        <img style={{height: "400px", width: "300px"}} title="Image wasn't found" src={images[1] === undefined ? "https://media3.giphy.com/media/3zhxq2ttgN6rEw8SDx/giphy.gif?cid=ecf05e47f8u2yjibc628qrn6gy6pufm8g9xktf1lyfv9ahwd&rid=giphy.gif&ct=g" : images[1]} alt={`Sorry img wasn't found`}/>  
            <p>{current.volumeInfo.title}</p>
            <p><i>Wrriten by <b>{current.volumeInfo.authors}</b></i></p>
            <p>{current.volumeInfo.description}</p>             
        </div>
        <StarRating bookID={current.id} auth={auth}/>
        <Note bookID={current.id} auth={auth}/>
        </>
    )
}

export default Details;