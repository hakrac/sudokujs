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