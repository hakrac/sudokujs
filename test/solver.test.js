import { 
    Solver
} from '../lib/solver'


describe('solver', () => {

    test('should solve sudoku', () => {

        let sudoku = [
            [0, 0, 5, 0, 9, 0, 2, 0, 0],
            [8, 0, 0, 0, 3, 0, 0, 0, 5],
            [0, 0, 3, 5, 0, 6, 1, 0, 0],
            [0, 2, 9, 0, 1, 0, 6, 4, 0],
            [0, 0, 0, 7, 0, 3, 0, 0, 0],
            [0, 5, 6, 0, 4, 0, 8, 3, 0],
            [0, 0, 7, 4, 0, 8, 9, 0, 0],
            [9, 0, 0, 0, 5, 0, 0, 0, 4],
            [0, 0, 2, 0, 7, 0, 3, 0, 0],
        ]

        sudoku = Solver(sudoku)
        
        expect(sudoku).toEqual([
            [6, 7, 5, 1, 9, 4, 2, 8, 3],
            [8, 9, 1, 2, 3, 7, 4, 6, 5],
            [2, 4, 3, 5, 8, 6, 1, 7, 9],
            [3, 2, 9, 8, 1, 5, 6, 4, 7],
            [1, 8, 4, 7, 6, 3, 5, 9, 2],
            [7, 5, 6, 9, 4, 2, 8, 3, 1],
            [5, 3, 7, 4, 2, 8, 9, 1, 6],
            [9, 6, 8, 3, 5, 1, 7, 2, 4],
            [4, 1, 2, 6, 7, 9, 3, 5, 8],
        ])

        // sudoku = [
        //     [0, 0, 2, 0, 0, 0, 1, 0, 0],
        //     [7, 0, 0, 4, 0, 3, 0, 0, 6],
        //     [0, 0, 8, 2, 0, 9, 7, 0, 0],
        //     [5, 0, 0, 0, 9, 0, 0, 0, 4],
        //     [0, 0, 3, 0, 0, 0, 6, 0, 0],
        //     [1, 0, 0, 0, 3, 0, 0, 0, 2],
        //     [0, 0, 1, 3, 0, 6, 9, 0, 0],
        //     [8, 0, 0, 5, 0, 7, 0, 0, 3],
        //     [0, 0, 7, 0, 0, 0, 5, 0, 0]
        // ]

        // sudoku = Solver(sudoku)

        // console.log(sudoku)

    })
})
