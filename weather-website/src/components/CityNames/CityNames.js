let cityAndCountryNames = []

for (let i = 0; i<cityArr.length; i++) {
    cityAndCountryNames.push([cityArr[i].name + ", " + cityArr[i].country])
}

export default cityAndCountryNames