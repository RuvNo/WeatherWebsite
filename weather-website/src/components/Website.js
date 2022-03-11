import React, { useEffect, useState } from 'react'
import SearchBar from './SearchBar/SearchBar'
import Displays from './Display/Display'
import OptionButton from './OptionButton/OptionButton'
import cityAndCountryNames from '../assets/CityNames'
import '../styles/global.css'

const Website = () => {
    // Initializes Hooks
    const [cityObj, setCityObj] = useState([])
    const [searchValue, setSearchValue] = useState("")
    const [lat, setLat] = useState(0)
    const [long, setLong] = useState(0)
    const [latCheck, setLatCheck] = useState(0)
    const [longCheck, setLongCheck] = useState(0)
    const [lastSuggestion, setLastSuggestion] = useState("")
    const [showComponents, setShowComponents] = useState(0)
    
    // Relevant for Background-Color changes depending on the weather
    let weatherList = ["sun", "cloud", "rain", "thunder", "clear", "few", "scattered", "overcast"]

    // So that only a small number of cities get actually shown
    let filteredCityList = cityAndCountryNames.filter((city) => city.includes(searchValue))
    if (filteredCityList.length > 5) {
        filteredCityList = filteredCityList.sort(() => Math.random() - 0.5).slice(0,5)
    }

    // Using the openweathermap-API's to retrieve the weather
    useEffect(() => {
        if((longCheck || latCheck) && document.getElementById("searchType").textContent === "Search Type: City") {
            // If there is a city name entered, first retrieve the coordinates
            fetch('http://api.openweathermap.org/geo/1.0/direct?q=' + searchValue + '&limit=5&appid=5576b5d04897ed986fb56430d37779ec')
                    .then(res=>res.json())
                    .then((cityJSON) =>    {        
                        const cityCoordinates = [cityJSON[0].lat, cityJSON[0].lon]
                        console.log(cityCoordinates)
                        setLatCheck(cityCoordinates[0])
                        setLongCheck(cityCoordinates[1])
                        setLat(cityCoordinates[0])
                        setLong(cityCoordinates[1])
                    });
        }
        // Using the coordinates to get the actual weather information
        if(longCheck && latCheck) {
            fetch('https://api.openweathermap.org/data/2.5/weather?lat=' + latCheck + '&lon=' + longCheck + '&units=metric&appid=5576b5d04897ed986fb56430d37779ec')
            .then(res=>res.json())
            .then((cityJSON) => {
                console.log(cityJSON)
                const cityInformation = [cityJSON.name, cityJSON.main.temp, cityJSON.weather[0].description, cityJSON.wind.speed, cityJSON.main.feels_like, cityJSON.main.humidity, cityJSON.sys.country]
                if(document.getElementById("searchType").textContent === "Search Type: City" && filteredCityList.length === 1) {
                    cityInformation[0] = lastSuggestion
                } else if (!searchValue.includes(",")) {
                    cityInformation[0] = cityInformation[0] + " " + "(" + cityInformation[6] + ")"
                } else if (document.getElementById("searchType").textContent === "Search Type: Coordinates") {
                    cityInformation[0] = cityInformation[0] + " " + "(" + cityInformation[6] + ")"
                }
                cityInformation[1] = cityInformation[1] + " °C"
                setCityObj(cityInformation)
                for(let i = 0; i < weatherList.length; i++) {
                    
                    if (cityInformation[2].includes(weatherList[i])) {
                        for(let j = 0; j < weatherList.length; j++) {
                            document.getElementById("root").classList.remove(weatherList[j])
                        }
                        document.getElementById("root").classList.add(weatherList[i])
                    }
                }
                document.getElementById("lat").textContent = "Lat: " + latCheck + "    Lon: " + longCheck
            });
            setShowComponents(1)    
        }           
    }, [longCheck])

    // SearchButton
    function searchButton() {
        if(filteredCityList.length === 1) {
            setLastSuggestion(filteredCityList)
        } else if (searchValue.includes(",")) {
            setLastSuggestion(searchValue)
        }
        setLatCheck(lat)
        setLongCheck(long)        
    }
    
    // JSX-Return
    return (
        <div>
            <div id="searchType">Search Type: City</div>
            <div id="geoLocationWarning"></div>
            <div className="buttonsGroup">
                <div className="optionButtonsGroup">
                    <OptionButton className={"button clicked"} name={"City"} setSearchValue={setSearchValue} />
                    <OptionButton className={"button"} name={"Coordinates"} setSearchValue={setSearchValue} />
                    <OptionButton className={"button"} name={"myLocation"} setSearchValue={setSearchValue} setLat={setLat} setLong={setLong} />
                </div>
                <div className="searchButtonGroup">
                    <button className="searchButton" onClick={searchButton}>Get Weather!</button>
                </div>
            </div>
            
            <SearchBar cityList={filteredCityList} value={searchValue} setValue={setSearchValue} setLat={setLat} setLong={setLong} setLastSuggestion={setLastSuggestion}/>
            {showComponents &&
            <div className="middle">
                <Displays feature={cityObj[0]} />
                <Displays feature={cityObj[1]} />
                <Displays feature={cityObj[2]} />
                <div className="latClass" id="lat"></div>
            </div>
            }
            
            {showComponents &&
            <div className="bottom">
                <div className="wind speed">
                    <Displays className="bold" feature={cityObj[3]} />
                    <Displays feature={"wind speed"} />
                </div>
                <div className="feels like">
                    <Displays className="bold" feature={cityObj[4]} />
                    <Displays feature={"feels like"} />
                </div>
                <div className="humidity">
                    <Displays className="bold" feature={cityObj[5]} />
                    <Displays feature={"humidity"} />
                </div>
            </div>
            }
            
        </div>
        
    )
}

export default Website