// var cross2Darray = [
//     ['a', 'b', 'c'],
//     ['d', 'e', 'f'],
//     ['g', 'h', 'i'],
// ];

// [{isMarked: true, type: 1},{isMarked: true, type: 1},{isMarked: true, type: 1}]


// function getCollumns(array2D) {
//     let resultsArray = [[], [], []] //3 INDEX MAX!
//     let n = 0
//     let i = 0

//     for(let x = 0; x <= (array2D.length -1); x++) {
//         for(let y = 0; y <= (array2D[x].length - 1); y++) {
//             resultsArray[x].push(array2D[n][i])
//             n++
//         }
//         i++
//         n = 0
//     }
//     return resultsArray
// }


// function getQuadDiagonals (array2D) {
//     let qd1 = [], qd2 = [], counter = 0

//     for(let i = 0; i <= (array2D.length - 1); i++) {
//         qd1.push(array2D[i][i])
//     }
//     for(let i = (array2D.length - 1); i >= 0 ; i--) {
//         qd2.push(array2D[counter][i])
//         counter++
//     }
//     return { quadD_1: qd1, quadD_2: qd2 }
// }

// function areIdentical(array) {
//     let areIdentical

//     if(array.length !== 0) {
//         for(let i = (array.length - 1); i >= 1; i--) {

//             if(array[i] !== array[i - 1]) return areIdentical = false
//             else areIdentical = true
//             if(i == 1) return areIdentical
//         }
//     }
// }

// console.log(areIdentical(getQuadDiagonals(cross2Darray).quadD_1))
// console.log(getQuadDiagonals(cross2Darray))