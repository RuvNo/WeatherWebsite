import React, {useEffect, useState} from 'react';

const SearchBar = () => {

    const [searchValue, setSearchValue] = useState("")

    const cityList = [
        'Wuppertal',
        'Berlin',
        'Münster',
        'Hamburg',
        'Worms',
        'Hannover'
    ]

    const handleInputChange = (event) => {
        setSearchValue(event.target.value)
    }

    const filteredCityList = cityList.filter((city) => city.includes(searchValue))

    const shouldDisplayButton = searchValue.length > 0

    const handleClearClick = () => {
        setSearchValue("")
    }

    useEffect(() => {
        let arr = searchValue.replace(" ","").split(",")
        document.getElementById("Lat").textContent = arr[0]
        document.getElementById("Long").textContent = arr[1]
    })

    // ATM Muss ich 2x Klicken, damit es funktioniert -> Also "City" klicken, dann irgendwas eingeben (z.B. Koordinaten)
    // Dann "Search", dann kommt nichts, weil newLat und newLon noch keine Daten haben und dann muss ich nochmal "Search" 
    // drücken, damit es funktioniert.
    // --> D.h. irgendwo muss ich meine Informationen früher weitergeben/aktualisieren! Mal sehen, wie und wo

    // Abgesehen davon muss ich dafür sorgen, dass er nur versucht zu splitten etc (mit dem ","), wenn Koordinaten ausgesucht ist


    return (
        <div>
            <input type="text" id="SearchValue" value={searchValue} onChange={handleInputChange} />
            {shouldDisplayButton && <button onClick={handleClearClick}>Clear</button>}
            {filteredCityList.map((city) => {
                return <li key={city}>{city}</li>
            })}           
        </div>
    )
}

export default SearchBar