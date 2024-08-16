import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
function SmallSearchBar() {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState("");
    const handleInputChange = (e) => {
        setSearchTerm(e.target.value);
    };
    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            navigate(`/Search/${searchTerm}`);
        }
    };
    return (
        <input
            type="text"
            placeholder="🔍 Search for countries and country data"
            className="form-control"
            value={searchTerm}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
            default={searchTerm}/>
    )
}
export default SmallSearchBar;