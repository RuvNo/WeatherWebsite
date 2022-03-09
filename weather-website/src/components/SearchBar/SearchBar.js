import React, {useState} from 'react';

const SearchBar = () => {

    const [searchValue, setSearchValue] = useState("")

    const cityList = [
        'Wuppertal',
        'Berlin',
        'Münster',
        'Hamburg',
    ]

    const handleInputChange = (event) => {
        console.log(event.target.value)
        setSearchValue(event.target.value)
    }

    return (
        <div>
            <input type="text" value={searchValue} onChange={handleInputChange} />
            {cityList.map((city) => {
                return <li key={city}>{city}</li>
            })}
        </div>
    )
}

export default SearchBar