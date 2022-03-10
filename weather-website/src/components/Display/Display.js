import React from "react";
import "./Display.css";


const Displays = (props) => {

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