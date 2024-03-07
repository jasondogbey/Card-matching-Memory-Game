const tilesContainer = document.querySelector(".tiles")
const colors = ["red", "green", "blue", "yellow", "pink", "white", "purple", "gold"]
const colorsPickList = [...colors, ...colors]
const tileCount = colorsPickList.length

let revealedCount = 0
let activeTile = null
let awaitingEndOfMove = false

const buildTile = (color) => {
    const element = document.createElement("div")
    element.classList.add("tile")
    element.setAttribute("data-color", color)
    element.setAttribute("data-revealed", "false")

    element.addEventListener("click", () => {
        const revealed = element.getAttribute("data-revealed")
        if (awaitingEndOfMove 
            || revealed === "true" 
            || element === activeTile) {
            return
        }

        element.style.backgroundColor = color

        if (!activeTile) {
            activeTile = element
            return
        }

        const colorToMatch = activeTile.getAttribute("data-color")
        if (color === colorToMatch) {
            activeTile.setAttribute("data-revealed", "true")
            element.setAttribute("data-revealed", "true")

            console.log("match")
            activeTile = null
            revealedCount += 2

            if (revealedCount === tileCount) {
                setTimeout(() => {alert("You won! Refresh to play again.")}, 1000)
            }

            return
        }
        awaitingEndOfMove = true

        setTimeout(() => {
            element.style.backgroundColor = null
            activeTile.style.backgroundColor = null

            activeTile = null
            awaitingEndOfMove = false
        }, 1000)
    })

    return element
}

for (let i = 0; i < tileCount; i++) {
    const randomIndex = Math.floor(Math.random() * colorsPickList.length)
    const color = colorsPickList[randomIndex]
    const tile = buildTile(color)

    colorsPickList.splice(randomIndex, 1)
    tilesContainer.appendChild(tile)
}
