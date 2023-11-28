import { FaAngleDown } from "react-icons/fa6";
import { FaAngleRight } from "react-icons/fa6";
import { useState } from "react";

function SearchFilters() {
    const [showForm, setShowForm] = useState(false);
    const handleButtonClick = () => {
        setShowForm(!showForm); // Toggle the value of showForm
      };
    return (
        <div>
        <button onClick={handleButtonClick} className="btn">{showForm ? <FaAngleDown/> : <FaAngleRight/>}</button>
                    {showForm && (
                        <div className="ps-3">
                        <h4>Filter </h4>
                        <form>
                        <label className="pb-2">
                            <input className="form-check-input me-2" type="checkbox" name="name" />
                            Name <br/>
                            <input className="form-control" placeholder="type a name here"/>
                        </label> <br/>
                        <label className="pb-2">
                            <input className="form-check-input me-2" type="checkbox" name="capital" />
                            Capital <br/>
                            <input className="form-control" placeholder="type a capital here"/>
                        </label> <br/>
                        <label className="pb-2">
                            <input className="form-check-input me-2" type="checkbox" name="region" />
                            Region <br/>
                            <input className="form-control" placeholder="type a region here"/>
                        </label> <br/>
                        <label className="pb-2">
                            <input className="form-check-input me-2" type="checkbox" name="language" />
                            Language <br/>
                            <input className="form-control" placeholder="type a subregion here"/>
                        </label> <br/>
                        </form> </div>
                    )}
                    </div>
    )
} export default SearchFilters;