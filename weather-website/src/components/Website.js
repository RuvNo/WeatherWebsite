import React, { useEffect, useState } from 'react'
import SearchBar from './SearchBar/SearchBar'
import Displays from './Display/Display'
import OptionButton from './OptionButton/OptionButton'
import cityAndCountryNames from './CityNames/CityNames'

// 1. Aktuell funktioniert es nicht, erst eine Sache zu suchen und dann eine andere (also erst Wuppertal und dann Köln z.B.)
// 2. Es muss noch eingestellt werden, dass man auch seine Location nutzen kann
// 3. Das Interface muss aufgeräumt werden
// 4. Import von Icons
// 5. Hübsch machen
// 6. zusätzliche Feature?! 

const Website = () => {

    function geoLocation() {
        var x = document.getElementById("demo");
        var y = document.getElementById("demo2");
    
        function getLocation() {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(showPosition);
            } else {
                x.innerHTML = "Geolocation is not supported by this browser.";
            }
        }

        function showPosition(position) {
            x.innerHTML = position.coords.latitude;
            y.innerHTML = position.coords.longitude;
        }
        getLocation()
    }
      
    const [cityObj, setCityObj] = useState([])
    const [cityObj2, setCityObj2] = useState([])
    const [searchValue, setSearchValue] = useState("empty")
    const [lat, setLat] = useState(0)
    const [long, setLong] = useState(0)
    const [newLat, setNewLat] = useState(0)
    const [newLong, setNewLong] = useState(0)
       
    useEffect(() => {
        if(long !== 0 || lat !== 0) {
            fetch('https://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + long + '&units=metric&appid=5576b5d04897ed986fb56430d37779ec')
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
            fetch('http://api.openweathermap.org/geo/1.0/direct?q=' + document.getElementById("SearchValue2").textContent + '&limit=5&appid=5576b5d04897ed986fb56430d37779ec')
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
            fetch('https://api.openweathermap.org/data/2.5/weather?lat=' + newLat + '&lon=' + newLong + '&units=metric&appid=5576b5d04897ed986fb56430d37779ec')
                .then(res=>res.json())
                .then((cityJSON) => {
                    const cityInformation = [cityJSON.name, cityJSON.main.temp]
                    setCityObj(cityInformation)
                });
            }
        }
            
    }, [newLong])

    function searchCity() {
        console.log(document.getElementById("SearchValue2").textContent)
        if (document.getElementById("searchType").textContent === "Search Type: Coordinates") {
            setLat(document.getElementById("Lat").innerHTML)
            setLong(document.getElementById("Long").innerHTML)
        } else if (document.getElementById("searchType").textContent === "Search Type: City") {
            setNewLat(document.getElementById("newLat").innerHTML)
            setNewLong(document.getElementById("newLon").innerHTML)
        } else {
            setLat(document.getElementById("demo").innerHTML)
            setLong(document.getElementById("demo2").innerHTML)
        }
        
    }
    
    let val = ""
    return (
        <div>
            <div id="demo">Test</div>
            <div id="demo2">Test</div>
            <div id="Lat"></div>
            <div id="Long"></div>
            <div id="newLat"></div>
            <div id="newLon"></div>
            <div id="searchType">Search Type: </div>
            <SearchBar cityList={cityAndCountryNames}/>
            <OptionButton name={"Coordinates"}/>
            <OptionButton name={"City"}/>
            <OptionButton name={"myLocation"}/>
            <Displays feature={cityObj[0]}/>
            <Displays feature={cityObj[1]}/>
            {/* <Displays feature={cityObj2[0]}/>
            <Displays feature={cityObj2[1]}/> */}
            {/* <Displays feature={cityObj[2]}/> */}
            <button onClick={searchCity}>Search</button>
            <button onClick={geoLocation}>GetLocation</button>
            <div>{searchValue}</div>
        </div>
        
    )
}

export default Website