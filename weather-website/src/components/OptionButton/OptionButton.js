import React, { useEffect, useState } from 'react';
import './OptionButton.css'

const OptionButton = (props) => {
    // Function if the user clicks "myLocation" to get his geolocation
    function geoLocation() {
        function getLocation() {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(showPosition);
            } else {
                document.getElementById("geoLocationWarning").innerHTML = "Geolocation is not supported by this browser.";
            }
        }

        function showPosition(position) {
            props.setLat(position.coords.latitude);
            props.setLong(position.coords.longitude);
            props.setSearchValue(position.coords.latitude + ", " + position.coords.longitude)
        }
        // Calling the function
        getLocation()
    }

    // Change the states of the Buttons, depending on which one is clicked
    function updateName() {
        document.getElementById("Coordinates").classList.remove("clicked")
        document.getElementById("City").classList.remove("clicked")
        document.getElementById("myLocation").classList.remove("clicked")
        document.getElementById("searchType").textContent = "Search Type: " + props.name
        if(props.name==="myLocation") {
            geoLocation()
        }
        document.getElementById(props.name).classList.add("clicked")
        props.setSearchValue("")
    }
    
    return (
        <div>
            <button id={props.name} className={props.className} onClick={updateName}>{props.name}</button>
        </div>
    )
}


export default OptionButton