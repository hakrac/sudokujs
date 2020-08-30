const clone = arr => arr.map(item => Array.isArray(item) ? clone(item) : item)


function possible(sudoku, c, r, n) {
    for(let c of sudoku[r]) {
        if (c === n) {
            return false
        }
    }

    for(let r of sudoku) {
        if(r[c] === n) {
            return false
        }
    }

    let y0 = Math.floor(r / 3) * 3
    let x0 = Math.floor(c / 3) * 3

    for(let i = 0; i < 3; i++) {
        for(let j = 0; j < 3; j++) {
            if(sudoku[y0 + i][x0 + j] === n) {
                return false
            }
        }
    }
    return true
}

export function Solver(sudoku) {
    let results = []

    function solve(sudoku) {
        for(let i in sudoku) {
            for(let j in sudoku[i]) {
                if(sudoku[i][j] === 0) {
                    for(let n = 1; n <= 9; n++) {
                        if(possible(sudoku, j, i, n)) {
                            sudoku[i][j] = n
                            // go to the next gap
                            solve(sudoku)
                            // failed
                            // so reset
                            sudoku[i][j] = 0
                        }
                    }
                    // no number did fit
                    // this is the wrong path
                    return
                }
            }
        }
        let result = clone(sudoku)
        results.push(result)
    }

    solve(sudoku)
    return results
}



