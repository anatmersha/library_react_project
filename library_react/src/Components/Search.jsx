import "./Search.css";
// zIndex: "-9999",marginTop: "-62px", 
const Search = ({setSearched,getData}) => {
    return(
            <div className="searchBar" style={{backgroundColor: "#d0d8c5", height: "60vh", marginTop: "-10px"}}>
                <form onSubmit={(e)=> {
                    e.preventDefault();
                    getData()
                    }}>
                    <input style={{height: "4vh", width: "40vw", fontSize: "16px", marginTop: "4vh", fontFamily: "Gayathri"}} type="text" placeholder="Search..." onChange={(e)=>{  
                        setSearched(e.target.value)
                    }}/>
                    <button type="submit" className="serchBtn"><i title="Search for a book" class="fa fa-search"></i></button>
                </form>
            </div>
    )
}

export default Search;