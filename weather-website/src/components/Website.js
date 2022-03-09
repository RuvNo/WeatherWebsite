import React, { useEffect, useState } from 'react'
import SearchBar from './SearchBar/SearchBar'
import Displays from './Displays/Displays'


const Website = () => {
  
    const [cityObj, setCityObj] = useState([])
    // api.openweathermap.org/data/2.5/weather?lat=35&lon=139&appid=5576b5d04897ed986fb56430d37779ec

    useEffect(() => {
        console.log("DOING")
        fetch('https://api.openweathermap.org/data/2.5/weather?lat=39&lon=117&appid=5576b5d04897ed986fb56430d37779ec')
            .then(res=>res.json())
            .then((cityJSON) => {
                const cityInformation = [cityJSON.name, cityJSON.main.temp]
                setCityObj(cityInformation)
            })
            
    }, [])

    return (
        <div>
            <SearchBar />
            <Displays feature={cityObj[0]}/>
            <Displays feature={cityObj[1]}/>
        </div>
        
    )
}

export default Website