import React, { useEffect } from 'react';

const OptionButton = (props) => {
    // useEffect(() => {
    //     document.getElementById("searchType").textContent = props.name
    // }, [])

    function updateName() {
        document.getElementById("searchType").textContent = "Search Type: " + props.name
    }
    
    return (
        <div>
            <button onClick={updateName}>{props.name}</button>
        </div>
    )
}

export default OptionButton