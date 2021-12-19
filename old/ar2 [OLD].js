//Types
// 0 = empty
// 1 = X
// 2 = O

var cross2Darray = [
    [{isMarked: false, type: 1},{isMarked: false, type: 0},{isMarked: false, type: 0},],
    [{isMarked: false, type: 0},{isMarked: false, type: 1},{isMarked: false, type: 0},],
    [{isMarked: false, type: 0},{isMarked: false, type: 0},{isMarked: false, type: 1},],
];

//Mesma coisa que
let tabuleiro2D = [
    ['x', 'empty', 'empty'],
    ['empty', 'x', 'empty'],
    ['empty', 'empty', 'x']
]

//Retorna as colunas do jogo
function getCollumns(array2D) {
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

//Retorna as diagonais "de ponta a ponta", 
// basicamente se o mapa for quadrado (^2) ele sempre retorna
//da maior extremidade da esquerda para direita e vice versa
//(quadD1[esquerda] e quadD2[direita])
function getQuadDiagonals (array2D) {
    let qd1 = [], qd2 = [], counter = 0

    for(let i = 0; i <= (array2D.length - 1); i++) {
        qd1.push(array2D[i][i])
    }
    for(let i = (array2D.length - 1); i >= 0 ; i--) {
        qd2.push(array2D[counter][i])
        counter++
    }
    return { quadD_1: qd1, quadD_2: qd2 }
}

//Verifica se uma array uni-dimensional tem todos seus itens compatíveis
//nesse caso, eu editei pra pegar só o TYPE de cada tile do jogo.
//Recomendo editar e condicionar a seleção apenas para itens que não
//sejam 0, ou seja, espaços vazios.
function areIdentical(array) {
    let areIdentical

    if(array.length !== 0) {
        for(let i = (array.length - 1); i >= 1; i--) {

            if(array[i].type !== array[i - 1].type) return areIdentical = false
            else areIdentical = true
            if(i == 1) return areIdentical
        }
    }
}

// Perguntando se a diagonal esquerda está populada
// com elementos do mesmo tipo (vulgo se o player ganhou)
// `X 0 0
//  0 X 0
//  0 0 X`
console.log(areIdentical(getQuadDiagonals(cross2Darray).quadD_1))

// Retornando as duas diagonais
console.log(getQuadDiagonals(cross2Darray))

// Retornando as colunas
console.log(getCollumns(tabuleiro2D)) // Melhor de ver do que o debaixo
// console.log(getCollumns(cross2Darray))