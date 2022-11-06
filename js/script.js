const eleSelectLevel = document.querySelector('#select-level');
const eleBtnPlay = document.querySelector('#btn-play');
const eleBtnHelp = document.querySelector('#btn-help');
const eleStartScreen = document.querySelector('.start-screen');
const eleGrid = document.querySelector('.grid');
const eleResult = document.querySelector('.result')
let arrMines;
let score;
let maxScore;

function generateMines(nMines, min, max) {
	const arrRandoms = [];
	for (let i = 0; i < nMines; i++) {
		do {
			randomNumber = getRandomInteger(min, max);
		} while (arrRandoms.includes(randomNumber))
		arrRandoms.push(randomNumber);
	}
	return arrRandoms;
}

function getRandomInteger(min, max) {
	return Math.floor(Math.random() * (max - min + 1) ) + min;
}

function disableAllCells(showMines) {
	const listCells = eleGrid.querySelectorAll('.cell');
	// console.log(listCells);
	for (let i = 0; i < listCells.length; i++) {
		// se e' una bomba la illumina
		const cellNumber = parseInt(listCells[i].innerHTML);
		// console.log(cellNumber);
		if (showMines && arrMines.includes(cellNumber)) {
			listCells[i].classList.add('mine');
		}
		// toglie l'event listener dalla cella per disattivarla
		listCells[i].removeEventListener('click', toggleCell);
		// console.log('listener rimosso');
	}
}

eleBtnPlay.addEventListener('click', function () {
	score = 0;
	const nCells = parseInt(eleSelectLevel.value);
	const nMines = 16;
	maxScore = nCells - nMines;
	arrMines = generateMines(nMines, 1, nCells);


	eleGrid.innerHTML = '';
    eleResult.classList.add('hidden')

	eleGrid.classList.remove('hidden');
	eleStartScreen.classList.add('hidden');

	

	for (let i = 1; i <= nCells; i++) {
        const eleSqrt = Math.sqrt(eleSelectLevel.value)
		const eleCell = document.createElement('div');
		eleCell.classList.add('cell');
		eleCell.innerHTML = i;
        eleCell.style.width = `calc(100% / ${eleSqrt}`
        eleCell.style.height = `calc(100% / ${eleSqrt}`
		eleGrid.append(eleCell);
		eleCell.addEventListener('click', toggleCell);
	}
});


eleBtnHelp.addEventListener('click', function () {
	if (eleBtnHelp.dataset.function == 'show-help') {
        eleResult.classList.add('hidden')
		eleBtnHelp.innerHTML = 'Back to game';
		eleBtnHelp.dataset.function = 'show-game';
		eleGrid.classList.add('hidden');
		eleStartScreen.classList.remove('hidden');
	} else if (eleBtnHelp.dataset.function == 'show-game') {
		eleBtnHelp.innerHTML = 'Help';
		eleBtnHelp.dataset.function = 'show-help';
		eleGrid.classList.remove('hidden');
		eleStartScreen.classList.add('hidden');
	}
});

function toggleCell() {
	// this dentro a questa funzione corrisponde all'elemento a cui
	// determinare il tipo di cella
	const cellNumber = parseInt(this.innerHTML);
    

	if (arrMines.includes(cellNumber)) { // arrMines.includes(i) // questo funzione grazie al concetto di "clojure" ma se la funzione e' stata definita in uno scope che include la i
		this.classList.add('mine');
		disableAllCells(true);
		// alert('Il tuo punteggio e: ' + score);
        eleResult.classList.remove('hidden')
        eleResult.innerHTML = `Il tuo punteggio è: ${+score}`

	} else {
		this.removeEventListener('click', toggleCell); // evitiamo di accumulare punteggio cliccando su celle gia' aperte
		score++; // incremento score al ogni click di cella senza bomba
		this.classList.add('no-mine');
		if (score == maxScore) {
			disableAllCells(false);
            eleResult.classList.remove('hidden')
			alert('Complimenti hai vinto! Il tuo punteggio e: ' + score);
            eleResult.innerHTML = `Complimenti hai vinto! Il tuo punteggio e: ${+score}`
		}
	}
}