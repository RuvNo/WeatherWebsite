import React, { useEffect, useState } from 'react'
import SearchBar from './SearchBar/SearchBar'
import Displays from './Display/Display'
import OptionButton from './OptionButton/OptionButton'


const Website = () => {
  
    const [cityObj, setCityObj] = useState([])
    const [cityObj2, setCityObj2] = useState([])
    const [searchValue, setSearchValue] = useState("empty")
    const [lat, setLat] = useState(0)
    const [long, setLong] = useState(0)
    const [newLat, setNewLat] = useState(0)
    const [newLong, setNewLong] = useState(0)
       
    useEffect(() => {
        if(long !== 0 || lat !== 0) {
            fetch('https://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + long + '&appid=5576b5d04897ed986fb56430d37779ec')
                .then(res=>res.json())
                .then((cityJSON) => {
                    const cityInformation = [cityJSON.name, cityJSON.main.temp]
                    setCityObj(cityInformation)
                });
            // fetch('https://api.openweathermap.org/img/w/10d.png')
            //     .then(res=>res.json())
            //     .then((test) => setSearchValue(test))
            //     console.log(searchValue)
        }
            
    }, [long])

    useEffect(() => {
        // Hier sollte man nochmal schauen, das mit dem newLat und newLon ist alles super doppelt gemoppelt
        // Also hier gibt es einen effizienteren Weg, das ganze darzustellen
        if(newLong !== 0 || newLat !== 0) {
            fetch('http://api.openweathermap.org/geo/1.0/direct?q=London&limit=5&appid=5576b5d04897ed986fb56430d37779ec')
                .then(res=>res.json())
                .then((cityJSON) =>    {        
                    const cityInformation2 = [cityJSON[0].lat, cityJSON[0].lon]
                    document.getElementById("newLat").innerHTML = cityInformation2[0]
                    document.getElementById("newLon").innerHTML = cityInformation2[1]
                    setNewLat(document.getElementById("newLat").innerHTML)
                    setNewLong(document.getElementById("newLon").innerHTML)
                    setCityObj2(cityInformation2)
                });
            if(newLong !== "" && newLat !=="") {
            fetch('https://api.openweathermap.org/data/2.5/weather?lat=' + newLat + '&lon=' + newLong + '&appid=5576b5d04897ed986fb56430d37779ec')
                .then(res=>res.json())
                .then((cityJSON) => {
                    const cityInformation = [cityJSON.name, cityJSON.main.temp]
                    setCityObj(cityInformation)
                });
            }
        }
            
    }, [newLong])

    function searchCity() {
        if (document.getElementById("searchType").textContent === "Search Type: Coordinates") {
            setLat(document.getElementById("Lat").innerHTML)
            setLong(document.getElementById("Long").innerHTML)
        } else if (document.getElementById("searchType").textContent === "Search Type: City") {
            setNewLat(document.getElementById("newLat").innerHTML)
            setNewLong(document.getElementById("newLon").innerHTML)
        } else {
            console.log("WHY")
        }
        
    }
    
    let val = ""
    return (
        <div>
            <div id="Lat"></div>
            <div id="Long"></div>
            <div id="newLat"></div>
            <div id="newLon"></div>
            <div id="searchType">Search Type: </div>
            <SearchBar />
            <OptionButton name={"Coordinates"}/>
            <OptionButton name={"City"}/>
            <OptionButton name={"myLocation"}/>
            <Displays feature={cityObj[0]}/>
            <Displays feature={cityObj[1]}/>
            <Displays feature={cityObj2[0]}/>
            <Displays feature={cityObj2[1]}/>
            {/* <Displays feature={cityObj[2]}/> */}
            <button onClick={searchCity}>Search</button>
            <div>{searchValue}</div>
        </div>
        
    )
}

export default Website