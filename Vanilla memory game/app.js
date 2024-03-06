const section = document.querySelector("section")
const playerLivesCount = document.querySelector("span")
let playerLives = 6

playerLivesCount.textContent = playerLives

const getData = () => [
    {imgSrc: "./photos/brian.jpg", name: "brian"},
    {imgSrc: "./photos/garin-chadwick.jpg", name: "garin-chadwick"},
    {imgSrc: "./photos/garin.jpg", name: "garin"},
    {imgSrc: "./photos/jernej.jpg", name: "jernej"},
    {imgSrc: "./photos/matheus.jpg", name: "matheus"},
    {imgSrc: "./photos/michael.jpg", name: "michael"},
    {imgSrc: "./photos/quan.jpg", name: "quan"},
    {imgSrc: "./photos/stefan.jpg", name: "stefan"},
    {imgSrc: "./photos/brian.jpg", name: "brian"},
    {imgSrc: "./photos/garin-chadwick.jpg", name: "garin-chadwick"},
    {imgSrc: "./photos/garin.jpg", name: "garin"},
    {imgSrc: "./photos/jernej.jpg", name: "jernej"},
    {imgSrc: "./photos/matheus.jpg", name: "matheus"},
    {imgSrc: "./photos/michael.jpg", name: "michael"},
    {imgSrc: "./photos/quan.jpg", name: "quan"},
    {imgSrc: "./photos/stefan.jpg", name: "stefan"}
]

const randomize = () => {
    const cardData = getData()
    cardData.sort(() => Math.random() - 0.5)
    return cardData
}

const cardGenerator = () => {
    const cardData = randomize()

    cardData.forEach((item) => {
        const card = document.createElement("div")
        const face = document.createElement("img")
        const back = document.createElement("div")
        card.classList = "card"
        face.classList = "face"
        back.classList = "back"

        face.src = item.imgSrc
        card.setAttribute("name", item.name)

        section.appendChild(card)
        card.appendChild(face)
        card.appendChild(back)

        card.addEventListener("click", (e) => {
            card.classList.toggle("toggleCard")
            checkCards(e)
        })
    }) 
}

const checkCards = (e) => {
    const clickedCard = e.target
    clickedCard.classList.add("flipped")
    const flippedCards = document.querySelectorAll(".flipped")
    const toggleCard = document.querySelectorAll(".toggleCard")
    console.log(clickedCard)

    if (flippedCards.length === 2) {
        if (flippedCards[0].getAttribute("name") === flippedCards[1].getAttribute("name")) {
            console.log("Match!")
            flippedCards.forEach((card) => {
                card.classList.remove("flipped")
                card.style.pointerEvents = "none"
            })
            if (toggleCard.length === 16) {
                setTimeout(() => {alert("You won!")}, 1000);
                setTimeout(() => {restart()}, 1000);
            }
        } else {
            console.log("Wrong")
            flippedCards.forEach((card) => {
                card.classList.remove("flipped")
                setTimeout(() => {card.classList.remove("toggleCard")}, 1000);
            })
            playerLives--
            playerLivesCount.textContent = playerLives

            if (playerLives <= 0) {
                console.log("You lost!")
                
                setTimeout(() => {alert("You lost!")}, 1000);
                setTimeout(() => {restart()}, 1000);
            }
        }
    }
}

const restart = () => {
    let cardData = randomize()
    let faces = document.querySelectorAll(".face")
    let cards = document.querySelectorAll(".card")
    cardData.forEach((item, index) => {
        cards[index].classList.remove("toggleCard")

        cards[index].style.pointerEvents = "all"
        faces[index].src = item.imgSrc
        cards[index].setAttribute("name", item.name)
    })
    playerLives = 6
    playerLivesCount.textContent = playerLives
}

cardGenerator()