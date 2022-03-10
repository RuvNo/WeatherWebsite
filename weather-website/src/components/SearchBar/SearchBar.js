import React, {useEffect, useState} from 'react';

const SearchBar = (props) => {

    const handleInputChange = (event) => {
        props.setValue(event.target.value)
    }

    let filteredCityList = props.cityList.filter((city) => city[0].includes(props.value))
    filteredCityList = filteredCityList.sort(() => Math.random() - 0.5).slice(0,10)

    const shouldDisplayButtonAndCities = props.value.length > 0

    const handleClearClick = () => {
        props.setValue("")
        
    }

    useEffect(() => {
        if(document.getElementById("searchType").textContent !== "Search Type: myLocation") {
            let arr = props.value.replace(" ","").split(",")
            props.setLat(arr[0])
            props.setLong(arr[1])
        }
        
    })

    return (
        <div>
            <input type="text" id="SearchValue" value={props.value} onChange={handleInputChange} />
            {shouldDisplayButtonAndCities && <button onClick={handleClearClick}>Clear</button>}
            {shouldDisplayButtonAndCities && filteredCityList.map((city) => {
                return <li key={city}>{city}</li>
            })}           
        </div>
    )
}

export default SearchBar