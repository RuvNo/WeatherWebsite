import React, { useEffect, useState } from 'react'
import SearchBar from './SearchBar/SearchBar'
import Displays from './Display/Display'
import OptionButton from './OptionButton/OptionButton'
import cityAndCountryNames from '../assets/CityNames'

// 5. Hübsch machen
// 7. Bei SearchBar sollte das Value nur gesplittet werden, wenn Koordinaten angegeben sind

const Website = () => {

    const [cityObj, setCityObj] = useState([]) // Das ist, um die Wetter-API auszuwerden
    const [searchValue, setSearchValue] = useState("") // Das hängt mit der SearchBar zusammen
    const [lat, setLat] = useState(0)
    const [long, setLong] = useState(0)
    const [latCheck, setLatCheck] = useState(0)
    const [longCheck, setLongCheck] = useState(0)  
     
    useEffect(() => {
        if((longCheck || latCheck) && document.getElementById("searchType").textContent === "Search Type: City") {
            fetch('http://api.openweathermap.org/geo/1.0/direct?q=' + searchValue + '&limit=5&appid=5576b5d04897ed986fb56430d37779ec')
                    .then(res=>res.json())
                    .then((cityJSON) =>    {        
                        const cityCoordinates = [cityJSON[0].lat, cityJSON[0].lon]
                        setLatCheck(cityCoordinates[0])
                        setLongCheck(cityCoordinates[1])
                        setLat(cityCoordinates[0])
                        setLong(cityCoordinates[1])
                    });
        }
        if(longCheck && latCheck) {
            fetch('https://api.openweathermap.org/data/2.5/weather?lat=' + latCheck + '&lon=' + longCheck + '&units=metric&appid=5576b5d04897ed986fb56430d37779ec')
            .then(res=>res.json())
            .then((cityJSON) => {
                console.log(cityJSON)
                const cityInformation = [cityJSON.name, cityJSON.main.temp, cityJSON.weather[0].description]
                if(document.getElementById("searchType").textContent === "Search Type: City") {
                    cityInformation[0] = searchValue
                }
                setCityObj(cityInformation)
            });    
        }           
    }, [longCheck])

    function searchCity() {
        setLatCheck(lat)
        setLongCheck(long)
    }
    
    let val = ""
    return (
        <div>
            <div id="searchType">Search Type: City</div>
            <div id="geoLocationWarning"></div>
            <SearchBar cityList={cityAndCountryNames} value={searchValue} setValue={setSearchValue} setLat={setLat} setLong={setLong}/>
            <button onClick={searchCity}>Get Weather!</button>
            <OptionButton name={"Coordinates"} />
            <OptionButton name={"City"} />
            <OptionButton name={"myLocation"} setSearchValue={setSearchValue} setLat={setLat} setLong={setLong}/>
            <Displays feature={cityObj[0]}/>
            <Displays feature={cityObj[1]}/>
            <Displays feature={cityObj[2]}/>
            <div id="Lat">Lat: {latCheck}</div>
            <div id="Long">Long: {longCheck}</div>
        </div>
        
    )
}

export default Website