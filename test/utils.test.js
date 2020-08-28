import {
    get_next,
    get_unique,
    union,
    difference,
    validate,
    row,
    group,
    col,
    compute_possible_numbers,
    groups,
    cols
} from '../lib/utils'



describe('utilities', () => {


    test('should invalidate nonsquare sudoku', () => {
        let sudoku = [
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
        ]

        expect(validate(sudoku)).toBeFalsy()
    })

    test('should get row from sudoku', () => {
        let sudoku = [
            [2, 1, 8, 4, 5, 0, 0, 0, 0],
            [0, 3, 0, 0, 1, 7, 0, 0, 0],
            [7, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0]
        ]

        let first_row = row(0, 1, sudoku, false)
        expect(first_row).toEqual([
            2, 8, 4, 5, 0, 0, 0, 0
        ])


        sudoku = [
            [2, 1, 8, 4, 5, 0, 0, 0, 0],
            [0, 3, 0, 0, 1, 7, 0, 0, 0],
            [7, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0]
        ]

        first_row = row(0, 1, sudoku, true)
        expect(first_row).toEqual([
            2, 1, 8, 4, 5, 0, 0, 0, 0
        ])
        
    })

    test('should get column from sudoku', () => {
        let sudoku = [
            [2, 1, 8, 4, 5, 0, 0, 0, 0],
            [0, 3, 0, 0, 1, 7, 0, 0, 0],
            [7, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0]
        ]

        let first_col = col(0, 0, sudoku)
        expect(first_col).toEqual([
            2, 0, 7, 0, 0, 0, 0, 0, 0
        ])
        
    })

    test('should get group from sudoku', () => {
        let sudoku = [
            [2, 1, 8, 4, 5, 0, 0, 0, 0],
            [0, 3, 0, 0, 1, 7, 0, 0, 0],
            [7, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0]
        ]

        let first_group = group(0, 0, sudoku)
        expect(first_group).toEqual([
            2, 1, 8, 0, 3, 0, 7, 0, 0
        ])

        let last_group = group(8, 8, sudoku)
        expect(last_group).toEqual([
            0, 0, 0, 0, 0, 0, 0, 0, 0
        ])

        sudoku = [
            [2, 1, 9, 7, 8, 6, 3, 5, 4],
            [5, 8, 6, 1, 3, 4, 2, 9, 7],
            [3, 7, 4, 2, 5, 9, 1, 6, 8],
            [4, 6, 8, 9, 2, 1, 7, 3, 5],
            [1, 5, 2, 8, 7, 3, 9, 4, 6],
            [7, 9, 3, 4, 6, 5, 8, 1, 2],
            [9, 2, 5, 3, 4, 8, 6, 7, 1],
            [8, 4, 1, 6, 9, 7, 5, 2, 3],
            [6, 3, 6, 5, 1, 2, 4, 8, 0]
        ]

        first_group = group(0, 0, sudoku)
        expect(first_group).toEqual([
            2, 1, 9, 5, 8, 6, 3, 7, 4
        ])

        last_group = group(8, 8, sudoku)
        expect(last_group).toEqual([
            6, 7, 1, 5, 2, 3, 4, 8, 0
        ])

        sudoku = [
            [2, 1, 9, 7, 8, 6, 3, 5, 4],
            [5, 8, 6, 1, 3, 4, 2, 9, 7],
            [3, 7, 4, 2, 5, 9, 1, 6, 8],
            [4, 6, 8, 9, 2, 1, 7, 3, 5],
            [1, 5, 2, 8, 7, 3, 9, 4, 6],
            [7, 9, 3, 4, 6, 5, 8, 1, 2],
            [9, 2, 5, 3, 4, 8, 6, 7, 1],
            [8, 4, 1, 6, 9, 7, 5, 2, 3],
            [6, 3, 6, 5, 1, 2, 4, 8, 0]
        ]

        first_group = group(0, 0, sudoku, false)
        expect(first_group).toEqual([
            1, 9, 5, 8, 6, 3, 7, 4
        ])
    })

    test('should get groups from sudoku', () => { 
        let sudoku = [
            [2, 1, 9, 7, 8, 6, 3, 5, 4],
            [5, 8, 6, 1, 3, 4, 2, 9, 7],
            [3, 7, 4, 2, 5, 9, 1, 6, 8],
            [4, 6, 8, 9, 2, 1, 7, 3, 5],
            [1, 5, 2, 8, 7, 3, 9, 4, 6],
            [7, 9, 3, 4, 6, 5, 8, 1, 2],
            [9, 2, 5, 3, 4, 8, 6, 7, 1],
            [8, 4, 1, 6, 9, 7, 5, 2, 3],
            [6, 3, 6, 5, 1, 2, 4, 8, 0]
        ]

        let g = groups(sudoku)
        
        expect(g).toEqual([
            [
                2, 1, 9,
                5, 8, 6,
                3, 7, 4,
            ],
            [
                7, 8, 6,
                1, 3, 4,
                2, 5, 9,
            ],
            [
                3, 5, 4,
                2, 9, 7,
                1, 6, 8,
            ],
            [
                4, 6, 8,
                1, 5, 2,
                7, 9, 3,
            ],
            [
                9, 2, 1,
                8, 7, 3,
                4, 6, 5,
            ],
            [
                7, 3, 5,
                9, 4, 6,
                8, 1, 2,
            ],
            [
                9, 2, 5,
                8, 4, 1,
                6, 3, 6,
            ],
            [
                3, 4, 8,
                6, 9, 7,
                5, 1, 2,
            ],
            [
                6, 7, 1,
                5, 2, 3,
                4, 8, 0
            ],
        ])
        
    })

    test('should compute union of 2 or more sets', () => {
        let setA = new Set([1, 2, 3])
        let setB = new Set([3, 4, 5])
        expect(union(setA, setB)).toEqual(new Set([1, 2, 3, 4, 5]))
        let setC = new Set([5, 6, 7])
        expect(union(setA, setB, setC)).toEqual(new Set([1, 2, 3, 4, 5, 6, 7]))
    })

    test('should take difference of 2 sets', () => {
        let setA = new Set([1, 2, 3])
        let setB = new Set([2, 3, 4])
        expect(difference(setA, setB)).toEqual(new Set([1]))
    })

    test('should compute all possible numbers in a sudoku', () => {
        let sudoku = [
            [2, 1, 9, 7, 8, 6, 3, 5, 4],
            [5, 8, 6, 1, 3, 4, 2, 9, 7],
            [3, 7, 4, 2, 5, 9, 1, 6, 8],
            [4, 6, 8, 9, 2, 1, 7, 3, 5],
            [1, 5, 2, 8, 7, 3, 9, 4, 6],
            [7, 9, 3, 4, 6, 5, 8, 1, 2],
            [9, 2, 5, 3, 4, 8, 6, 7, 1],
            [8, 4, 1, 6, 9, 7, 5, 2, 3],
            [6, 3, 6, 5, 1, 2, 4, 8, 0]
        ]

        let sudoku_map = compute_possible_numbers(sudoku)
        expect(sudoku_map[8][8]).toEqual(new Set([9]))

        sudoku = [
            [2, 1, 9, 7, 8, 6, 3, 5, 4],
            [5, 8, 6, 1, 3, 4, 2, 9, 7],
            [3, 7, 4, 2, 5, 9, 1, 6, 0],
            [4, 6, 8, 9, 2, 1, 7, 3, 5],
            [1, 5, 2, 8, 7, 3, 9, 4, 6],
            [7, 9, 3, 4, 6, 5, 8, 1, 2],
            [9, 2, 5, 3, 4, 8, 6, 7, 1],
            [8, 4, 1, 6, 9, 7, 5, 2, 0],
            [6, 3, 7, 5, 1, 2, 4, 0, 0]
        ]

        sudoku_map = compute_possible_numbers(sudoku)
        expect(sudoku_map[8][8]).toEqual(new Set([8, 9]))
    })

    test('should get next best cell in sudoku', () => {
        let sudoku = [
            [2, 1, 9, 7, 8, 6, 3, 5, 4],
            [5, 8, 6, 1, 3, 4, 2, 9, 7],
            [3, 7, 4, 2, 5, 9, 1, 6, 0], // this blank cell is the best place to start
            [4, 6, 8, 9, 2, 1, 7, 3, 5],
            [1, 5, 2, 8, 7, 3, 9, 4, 6],
            [7, 9, 3, 4, 6, 5, 8, 1, 2],
            [9, 2, 5, 3, 4, 8, 6, 7, 1],
            [8, 4, 1, 6, 9, 7, 5, 2, 0],
            [6, 3, 7, 5, 1, 2, 4, 0, 0]
        ]

        sudoku = compute_possible_numbers(sudoku)
        let pos = get_next(sudoku)
        expect(pos).toEqual([2, 8])
    })

    test('should povide the number that is unique in a group / col / row', () => {
        let sudoku = [
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
        ]

        sudoku[0][0] = [4, 2, 3, 1]
        sudoku[1][0] = [4, 2, 3]

        let [pos, value] = get_unique(sudoku)
        expect(pos).toEqual([0, 0])
        expect(value).toEqual(1)

        sudoku = [
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
    })

})