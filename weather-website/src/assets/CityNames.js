let cityAndCountryNames = []

function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
  }

for (let i = 0; i<cityArr.length; i++) {
    cityAndCountryNames.push([cityArr[i].name + ", " + cityArr[i].country])
}

cityAndCountryNames = cityAndCountryNames.filter(onlyUnique)

export default cityAndCountryNames