/* 
* Solves sudoku grid 9 x 9
* [[0, 0, 0, 0, 0, 0, 0, 0, 0],
* [0, 0, 0, 0, 0, 0, 0, 0, 0],
* [0, 0, 0, 0, 0, 0, 0, 0, 0],
* [0, 0, 0, 0, 0, 0, 0, 0, 0],
* [0, 0, 0, 0, 0, 0, 0, 0, 0],
* [0, 0, 0, 0, 0, 0, 0, 0, 0],
* [0, 0, 0, 0, 0, 0, 0, 0, 0],
* [0, 0, 0, 0, 0, 0, 0, 0, 0],
* [0, 0, 0, 0, 0, 0, 0, 0, 0]]
*/


import {
    validate,
    is_solved,
    get_unique,
    get_next,
    compute_possible_numbers
} from './utils'


export function Solver(sudoku) {

    if(validate(sudoku)) {
        while(!is_solved(sudoku)) {
            sudoku = compute_possible_numbers(sudoku)

            while(true) {
                let changed = false
                let [[r, c], value] = get_unique(sudoku)
                if (value !== 0) {
                    sudoku[r][c] = value
                    changed = true
                }

                [r, c] = get_next(sudoku)
                if (sudoku[r][c].length === 1) {
                    sudoku[r][c] = Array.from(sudoku[r][c])[0]
                    changed = true
                }

                break
            }

        }
        return sudoku
    }
}


export function possible(sudoku, x, y, n) {
    for(let c of sudoku[y]) {
        if (c === n) {
            return false
        }
    }

    for(let r of sudoku) {
        if(r[x] === n) {
            return false
        }
    }

    let y0 = Math.floor(y / 3) * 3
    let x0 = Math.floor(x / 3) * 3

    for(let i = 0; i < 3; i++) {
        for(let j = 0; j < 3; j++) {
            if(sudoku[y0 + i][x0 + j] === n) {
                return false
            }
        }
    }
    return true
}

export function solve(sudoku) {
    for(let r = 0; r < sudoku.length; r++) {
        for(let c = 0; c < sudoku[r].length; c++) {
            if(sudoku[r][c] === 0) {
                for(let n = 1; n <= 9; n++) {
                    if(possible(sudoku, r, c, n)) {
                        sudoku[r][c] = n
                        solve(sudoku)
                        sudoku[r][c] = 0
                    }
                }
                return
            }
        }
    }
    console.log(sudoku)
}