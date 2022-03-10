import React, {useEffect, useState} from 'react';

const SearchBar = (props) => {

    const [searchValue, setSearchValue] = useState("")

    const handleInputChange = (event) => {
        setSearchValue(event.target.value)
    }

    let filteredCityList = props.cityList.filter((city) => city[0].includes(searchValue))
    filteredCityList = filteredCityList.sort(() => Math.random() - 0.5).slice(0,10)

    const shouldDisplayButton = searchValue.length > 0

    const handleClearClick = () => {
        setSearchValue("")
    }

    useEffect(() => {
        let arr = searchValue.replace(" ","").split(",")
        document.getElementById("Lat").textContent = arr[0]
        document.getElementById("Long").textContent = arr[1]
    })

    // Abgesehen davon muss ich dafür sorgen, dass er nur versucht zu splitten etc (mit dem ","), wenn Koordinaten ausgesucht ist


    return (
        <div>
            <input type="text" id="SearchValue" value={searchValue} onChange={handleInputChange} />
            <div id = "SearchValue2">{searchValue}</div>
            {shouldDisplayButton && <button onClick={handleClearClick}>Clear</button>}
            {shouldDisplayButton && filteredCityList.map((city) => {
                return <li key={city}>{city}</li>
            })}           
        </div>
    )
}

export default SearchBar