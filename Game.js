class Game {
    constructor(gameBoardID, txtFieldID, winClass = 'win', winAnimationClass = 'win-animate') {
        this.currentPlayer = 1
        this.currentPlayerSymbol = 'x'
        this.stageArray = [[],[],[]]
        this.slotsArray = []
        this.board = document.getElementById(gameBoardID)
        this.txtField = document.getElementById(txtFieldID)
        this.winClass = winClass
        this.winAnimationClass = winAnimationClass
        this.init
        this.createStage
        this.getStageTotalLength
        this.createSlot
        this.togglePlayer
        this.togglePlayerSymbol
        this.findSlotArray
        this.findSlotObject
        this.madeMove
        this.checkCurrentGameState
        this.getColumns
        this.getQuadDiagonals
        this.areIdentical
        this.checkArray
        this.setWinner
        this.restartGame
    }

    init() {
        this.createStage()
        console.log('slots: ', this.slotsArray, 'matrix: ', this.stageArray)
    }

    createStage() {

        let slotIDNumber = 0
        for(let i = 0; i <= this.stageArray.length-1; i++) {
            for(let x = 0; x <= 2; x++) {

                if((x + 1) % 3 == 0) this.createSlot(slotIDNumber, true)
                else this.createSlot(slotIDNumber)

                this.stageArray[i].push({isSelected: false, type: 0, id: 'slot-'+slotIDNumber})
                slotIDNumber++
            } 
        }
    }

    createSlot(slotNumber, breakLine = false) {
        let slot = document.createElement('p'),
        slodId = `slot-${slotNumber}`
        slot.id = slodId
        slot.classList.add('game-slot')
        slot.innerText = '-'

        slot.addEventListener('click', e => {
            e.target.innerText = this.currentPlayerSymbol
            e.target.style.pointerEvents = 'none'
            this.madeMove(slotNumber, slodId)
            this.checkCurrentGameState()
            this.setWinner()
        })

        this.board.appendChild(slot)
        this.slotsArray.push(slot)

        if(breakLine) {
            this.board.appendChild(document.createElement('br'))
        }
    }

    getStageTotalLength() {
        let stageLength,
        stageArrayLength = this.stageArray.length
        for(let i = 0; i <= (stageArrayLength - 1); i++) {
            stageLength += this.stageArray[i][i]
        }
        return stageLength
    }

    togglePlayer() {
        if(this.currentPlayer === 1) this.currentPlayer = 2
        else this.currentPlayer = 1
    }

    togglePlayerSymbol() {
        if(this.currentPlayer === 1) this.currentPlayerSymbol = 'x'
        else this.currentPlayerSymbol = 'o'
    }
    
    //Hard coding here lol, don't do that :v
    findSlotArray(num) { 
        if( num <= 2) return 0
        else if ( num > 2 && num < 6) return 1
        else if ( num > 5 && num < 9) return 2
    }

    findSlotObject(num, idName) {
        const slotLocation = this.findSlotArray(num)
        this.stageArray[slotLocation].forEach(obj => {
            if(obj.id === idName) {
                obj.type = this.currentPlayer
                obj.isSelected = true
            }
        })
    }

    madeMove(num, idName) {
        this.findSlotObject(num, idName)
        this.togglePlayer()
        this.togglePlayerSymbol()
    }

    //LOGICAL PART -------------------------------------------------------------

    checkCurrentGameState() {

        const rows = this.stageArray
        const columns = this.getColumns(this.stageArray)
        const diagonals = this.getQuadDiagonals(this.stageArray)

        let currentGameState = {isGameEnded: false, winner: 'none'},
        lineArray = [
            {lineName: rows, lineBool: this.checkArray(rows)}, 
            {lineName: columns, lineBool: this.checkArray(columns)}, 
            {lineName: diagonals, lineBool: this.checkArray(diagonals)}
        ]

        lineArray.forEach(item => {
            if(item.lineBool == true) {
                return currentGameState = {isGameEnded: true, winner: item.lineName}
            }
        })
        return currentGameState 
        // Usar o resultado para verificar cada linha de 'winner', se for idêntica, pega o tipo e
        // diz que o ganhador é o tipo = symbol
    }

    checkArray(array) {
        const arr = array
        let result = false

        arr.forEach(item => {
            if(this.areIdentical(item) == true) {
                return result = true
            }
        })
        return result
    }


    getColumns(array2D) {

        let resultsArray = [[], [], []] //3 INDEX MAX!
        let n = 0
        let i = 0
    
        for(let x = 0; x <= (array2D.length -1); x++) {
            for(let y = 0; y <= (array2D[x].length - 1); y++) {
                resultsArray[x].push(array2D[n][i])
                n++
            }
            i++
            n = 0
        }
        return resultsArray
    }
    
    getQuadDiagonals(array2D) {
        let qd1 = [], qd2 = [], counter = 0
        
        for(let i = 0; i <= (array2D.length - 1); i++) {
            qd1.push(array2D[i][i])
        }
        for(let i = (array2D.length - 1); i >= 0 ; i--) {
            qd2.push(array2D[counter][i])
            counter++
        }
        return [qd1, qd2]
    }

    areIdentical(array) {
        let areIdentical
        
        if(array.length !== 0) {
            for(let i = (array.length - 1); i >= 1; i--) {
            
                if(array[i].type == 0) return areIdentical = false
                if(array[i].type !== array[i - 1].type) return areIdentical = false
                else areIdentical = true
                if(i == 1) return areIdentical
            }
        }
    }

    // Game End ==========================================================================
    
    setWinner() {
        let gameResults = this.checkCurrentGameState(),
        winner = null,
        winPhrase,
        winnerSymbol

        if(gameResults.isGameEnded) {

            gameResults.winner.forEach(arr => {
                if(this.areIdentical(arr)) return winner = arr
            })
        }

        if(winner !== null) {
            
            winner.forEach(slot => {
                let currSlot = document.getElementById(slot.id)
                currSlot.classList.add(this.winClass)
                currSlot.classList.add(this.winAnimationClass)

            })

            this.slotsArray.forEach(slot => {
                slot.style.pointerEvents = 'none'
            })

            if(this.txtField) {

                if(winner[0].type == 1) winnerSymbol = 'X'
                else winnerSymbol = 'O'

                winPhrase = 
                `Parabéns ${winnerSymbol}, você ganhou! :D`

                this.txtField.innerText = winPhrase
            }
        }

        return console.log('Winner: ', winnerSymbol, winner)
    }
}
