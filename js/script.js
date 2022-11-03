const eleGrid = document.querySelector('.grid')
const eleButton = document.querySelector('button')
const eleLevel = document.getElementById ('level')
const arrRandoms = []






function levelSelector(levelIndex) {

    

    for (let i = 1; i <= levelIndex; i++) {

        const eleCell = document.createElement('div')
        eleCell.innerHTML = i
        eleCell.classList.add('cell')
        eleGrid.append(eleCell);

        
        

        if (levelIndex == 100) {

            let n

            do {
                randomNumber = getRandomInteger(1, 100)

                n++


            } while (n <= 16)

            arrRandoms.push(randomNumber)

            

           
            



            eleCell.style.width = "calc(100% / 10)"
            eleCell.style.height = "calc(100% / 10)"

        } else if (levelIndex == 81) {

            

            arrRandoms.push(i)


            eleCell.style.width = "calc(100% / 9)"
            eleCell.style.height = "calc(100% / 9)"

        } else {

            arrRandoms.push(i)


            eleCell.style.width = "calc(100% / 7)"
            eleCell.style.height = "calc(100% / 7)"
        }

        eleCell.addEventListener('click', function(){
            this.classList.toggle('active')
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



