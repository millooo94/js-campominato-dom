const eleGrid = document.querySelector('.grid')
const eleButton = document.querySelector('button')
const eleLevel = document.getElementById ('level')
const arrRandoms = []


let randomNumber


for (i = 0; i < 16; i++) {

    do {randomNumber = getRandomInteger(1, 100)
    } while (arrRandoms.includes(randomNumber))

    arrRandoms.push(randomNumber)
}

console.log(arrRandoms)



function levelSelector(levelIndex) {

    for (let i = 1; i <= levelIndex; i++) {
        let eleCell = document.createElement('div')
        eleCell.innerHTML = i
        eleCell.classList.add('cell')
        eleGrid.append(eleCell);

        if (levelIndex == 100) {
            eleCell.style.width = "calc(100% / 10)"
            eleCell.style.height = "calc(100% / 10)"
        } else if (levelIndex == 81) {
            eleCell.style.width = "calc(100% / 9)"
            eleCell.style.height = "calc(100% / 9)"
        } else {
            eleCell.style.width = "calc(100% / 7)"
            eleCell.style.height = "calc(100% / 7)"
        }
        
        eleCell.addEventListener('click', function(){

            if (arrRandoms.includes(i) == true) {
                
                const eleAll = document.querySelectorAll('.cell')

                for (let i = 0; i > eleAll.length; i++) {
                    
                    eleAll[i].classList.add('active2')
                }

            } else {
                this.classList.toggle('active1')
            }
        })
    }
}

levelSelector (100);
eleButton.addEventListener('click', function() {
    eleGrid.replaceChildren()
    let levelIndex
    if (eleLevel.value == 1) {
        levelIndex = 100
    } else if (eleLevel.value == 2) {
        levelIndex = 81
    } else {
        levelIndex = 49
    }
levelSelector(levelIndex);
})

function getRandomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
};