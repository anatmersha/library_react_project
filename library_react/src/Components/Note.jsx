import { useState } from "react";
import moment from 'moment';

const Note = ({auth,bookID}) => {
const [note, setNote] = useState();
const [readOnly, setReadOnly] = useState(false);

const [date, setDate] = useState(moment().format('MM/DD/YYYY, hh:mm a'));

const userData = JSON.parse(localStorage.getItem(auth));

return(
    <>
        <textarea style={{height: "14vh", marginBottom: "-16px"}} readOnly={readOnly} placeholder="Leave a note.." rows="5" cols="100" 
            onChange={(e)=> setNote(e.target.value)}></textarea><br/>

            <button style={{width: "25vw", fontSize: "17px", backgroundColor: "antiquewhite", padding: "10px", margin: "15px", marginLeft: "0"}} onClick={()=> {
            const temp = userData;
            const currentNote = temp[2].notesList;    
            const noteIndex = currentNote.findIndex((book) => book.bookID === bookID);
            
            if(noteIndex === -1) {
                temp[2].notesList.push({bookID,date,note});
            }else{
                currentNote.splice(noteIndex, 1);
                temp[2].notesList.push({bookID,date,note});
            }
            localStorage.setItem(auth, JSON.stringify(temp));
            setNote("");
            setReadOnly(true);
            }}>Save</button>

            <button style={{width: "25vw", fontSize: "17px", backgroundColor: "antiquewhite", padding: "10px", margin: "15px"}} onClick={()=> {
                setReadOnly(false);
            }}>Edit</button>
        </>
    )
}

export default Note;