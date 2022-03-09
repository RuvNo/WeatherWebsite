import React, {useState} from 'react';

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
        console.log(event.target.value)
        setSearchValue(event.target.value)
    }

    const filteredCityList = cityList.filter((city) => city.includes(searchValue))

    const shouldDisplayButton = searchValue.length > 0

    const handleClearClick = () => {
        setSearchValue("")
    }

    return (
        <div>
            <input type="text" value={searchValue} onChange={handleInputChange} />
            {shouldDisplayButton && <button onClick={handleClearClick}>Clear</button>}
            {filteredCityList.map((city) => {
                return <li key={city}>{city}</li>
            })}
        </div>
    )
}

export default SearchBar