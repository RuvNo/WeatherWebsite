import React from "react";
import "./Display.css";


const Displays = (props) => {

    // Making the numbers in the bottom-part larger than their descriptions
    let style = {}
    if(props.className) {
        style = {
            fontWeight: 700
        }
    }
    return (
        <div className="display" style={style}>
            {props.feature}
        </div>
    )
}

export default Displays