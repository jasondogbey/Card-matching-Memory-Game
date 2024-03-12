let errors = 0
let cardList = ["darkness.jpg", "double.jpg", "fairy.jpg", "fighting.jpg", "fire.jpg", "grass.jpg", "lightning.jpg", "metal.jpg", "psychic.jpg", "water.jpg"]
console.log(cardList.length)

let cardSet
let board = []
const rows = 4
const columns = 5
let card1Selected
let card2Selected

window.onload = function() {
    shuffleCards()
    startGame()
}

function shuffleCards() {
    cardSet = cardList.concat(cardList)
    console.log(cardSet)

    for (let i = 0; i < cardSet.length; i++){
        let randomIndex = Math.floor(Math.random() * cardSet.length)
        let temp = cardSet[i]
        cardSet[i] = cardSet[randomIndex]
        cardSet[randomIndex] = temp
    }
    console.log(cardSet)
}

function startGame() {
    for (let r = 0; r < rows; r++) {
        let row = []
        for (let c = 0; c < columns; c++) {
            let cardImg = cardSet.pop()
            row.push(cardImg)

            let card = document.createElement("img")
            card.id = r.toString() + "-" + c.toString()
            card.src = "images/" + cardImg
            card.classList.add("card")
            card.addEventListener('click', selectCard)
            document.getElementById("board").append(card)
        }
        board.push(row)
    }
    console.log(board)
    setTimeout(() => {
        hideCards()
    }, 1000);
}

function hideCards() {
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            let card = document.getElementById(r.toString() + "-" + c.toString())
            card.src = "images/back.jpg"
        }
    }
}

function selectCard() {
    if (this.src.includes("back")) {
        if (!card1Selected) {
            card1Selected = this
            let coord = card1Selected.id.split("-")
            let r = parseInt(coord[0])
            let c = parseInt(coord[1])
            card1Selected.src = "images/" + board[r][c]
        }
        else if (!card2Selected && this !== card1Selected) {
            card2Selected = this
            let coord = card2Selected.id.split("-")
            let r = parseInt(coord[0])
            let c = parseInt(coord[1])
            card2Selected.src = "images/" + board[r][c]
            setTimeout(() => {
                update()
            }, 1000);
        }
        
    }
}

function update() {
    if (card1Selected.src !== card2Selected.src) {
        card1Selected.src = "images/back.jpg"
        card2Selected.src = "images/back.jpg"
        errors++
        document.getElementById("errors").innerText = errors
    }
    card1Selected = null
    card2Selected = null
}