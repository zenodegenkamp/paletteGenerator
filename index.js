let colorsObjectArray = []
let randomColor = ''
document.getElementById('inputColor').addEventListener('change', generateColorScheme)
document.getElementById('color-scheme').addEventListener('change', generateColorScheme)

// Generates a random color when random btn is clicked
document.getElementById('random-btn').addEventListener('click', function () {
    randomColor = Math.floor(Math.random() * 16777215).toString(16)

    generateColorScheme()

})

// Generates a object with all the colors using Color API
function generateColorScheme() {

    let inputColor = ''

    // Checks if random btn is used or not
    if (randomColor) {
        inputColor = randomColor
    }
    else {
        inputColor = document.getElementById('inputColor').value.slice(1)
    }

    const inputScheme = document.getElementById('color-scheme').value

    // Uses the color API to retreive the specific data 
    fetch(`https://www.thecolorapi.com/scheme?hex=${inputColor}&mode=${inputScheme}`)
        .then(res => res.json())
        .then(data => {

            colorConverter(data.colors)
        })

    randomColor = ''
}

// Converts the given data to a string with the hex codes
function colorConverter(colorArray) {

    let colorsHexArray = []

    colorArray.map(function (color) {
        return colorsHexArray.push(`${color.hex.value}`)
    })


    renderColors(colorsHexArray)

}

// Renders the colors onto the page 
function renderColors(colors) {

    const colorsHtml = colors.map(function (color) {
        return `
        <div class='color-container' style='background:${color};'>
            <p class='color-section-p' id='${color}'>${color}</p>
        </div>
        `
    }).join('')

    document.getElementById('color-section').innerHTML = colorsHtml
}

