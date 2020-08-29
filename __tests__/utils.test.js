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
    cols,
    is_incol,
    is_inrow,
    group_index_of,
    group_possible_numbers,
    rm_possibility_from_row,
    rm_possibility_from_col
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
            [2, 1, 8,  4, 5, 0,  0, 0, 0],
            [0, 3, 0,  0, 1, 7,  0, 0, 0],
            [7, 0, 0,  0, 0, 0,  0, 0, 0],

            [0, 0, 0,  0, 0, 0,  0, 0, 0],
            [0, 0, 0,  0, 0, 0,  0, 0, 0],
            [0, 0, 0,  0, 0, 0,  0, 0, 0],

            [0, 0, 0,  0, 0, 0,  0, 0, 0],
            [0, 0, 0,  0, 0, 0,  0, 0, 0],
            [0, 0, 0,  0, 0, 0,  0, 0, 0]
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
            [2, 1, 9,  7, 8, 6,  3, 5, 4],
            [5, 8, 6,  1, 3, 4,  2, 9, 7],
            [3, 7, 4,  2, 5, 9,  1, 6, 8],

            [4, 6, 8,  9, 2, 1,  7, 3, 5],
            [1, 5, 2,  8, 7, 3,  9, 4, 6],
            [7, 9, 3,  4, 6, 5,  8, 1, 2],
            
            [9, 2, 5,  3, 4, 8,  6, 7, 1],
            [8, 4, 1,  6, 9, 7,  5, 2, 3],
            [6, 3, 6,  5, 1, 2,  4, 8, 0]
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

    test('should get next best cell in sudoku', () => {
        let sudoku = [
            [2, 1, 9,  7, 8, 6,  3, 5, 4],
            [5, 8, 6,  1, 3, 4,  2, 9, 7],
            [3, 7, 4,  2, 5, 9,  1, 6, 0], // this blank cell is the best place to start

            [4, 6, 8,  9, 2, 1,  7, 3, 5],
            [1, 5, 2,  8, 7, 3,  9, 4, 6],
            [7, 9, 3,  4, 6, 5,  8, 1, 2],

            [9, 2, 5,  3, 4, 8,  6, 7, 1],
            [8, 4, 1,  6, 9, 7,  5, 2, 0],
            [6, 3, 7,  5, 1, 2,  4, 0, 0]
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
            [0, 0, 5,  0, 9, 0,  2, 0, 0],
            [8, 0, 0,  0, 3, 0,  0, 0, 5],
            [0, 0, 3,  5, 0, 6,  1, 0, 0],

            [0, 2, 9,  0, 1, 0,  6, 4, 0],
            [0, 0, 0,  7, 0, 3,  0, 0, 0],
            [0, 5, 6,  0, 4, 0,  8, 3, 0],

            [0, 0, 7,  4, 0, 8,  9, 0, 0],
            [9, 0, 0,  0, 5, 0,  0, 0, 4],
            [0, 0, 2,  0, 7, 0,  3, 0, 0],
        ]
    })

    test('should say if indecies of a group are in a row', () => {
        let indecies = [0, 1]
        let inrow = is_inrow(...indecies)
        expect(inrow).toBe(0)

        indecies = [3, 5]
        inrow = is_inrow(...indecies)
        expect(inrow).toBe(1)

        indecies = [4, 5]
        inrow = is_inrow(...indecies)
        expect(inrow).toBe(1)
    })

    test('should say if indecies of a group are in a column', () => {
        let indecies = [0, 6]
        let inrow = is_incol(...indecies)
        expect(inrow).toBe(0)

        indecies = [1, 7]
        inrow = is_incol(...indecies)
        expect(inrow).toBe(1)
    })

    test('should get all possible numbers for group', () => {
        let sudoku = compute_possible_numbers([
            [2, 1, 9,  7, 8, 6,  3, 5, 4],
            [5, 8, 6,  1, 3, 4,  2, 9, 7],
            [3, 7, 4,  2, 5, 9,  1, 6, 0],

            [4, 6, 8,  9, 2, 1,  7, 3, 5],
            [1, 5, 2,  8, 7, 3,  9, 4, 6],
            [7, 9, 3,  4, 6, 5,  8, 1, 2],

            [9, 2, 5,  3, 4, 8,  6, 7, 1],
            [8, 4, 1,  6, 9, 7,  5, 2, 0],
            [6, 3, 7,  5, 1, 2,  4, 0, 0]
        ])
        sudoku = groups(sudoku)
        let possible = group_possible_numbers(sudoku[8])
        expect(possible).toEqual(new Set([
            8, 3, 9
        ]))
    })

    test('should get indecies of possiblity in group', () => {
        let g = [
            1, 3, 4,
            6, 8, 7,
            0, 0, 0
        ]

        g[6] = new Set([2, 9])
        g[7] = new Set([2, 5])
        g[8] = new Set([5, 9])

        let possible = group_possible_numbers(g)
        expect(possible).toEqual(new Set([
            2, 9, 5
        ]))
    })

    test('should remove one possibility in row', () => {
        let sudoku = [
            [2, 1, 9,  7, 8, 6,  3, 5, 4],
            [5, 8, 6,  1, 3, 4,  2, 9, 7],
            [3, 7, 4,  2, 5, 9,  1, 6, 8],

            [4, 6, 8,  9, 2, 1,  7, 3, 5],
            [0, 0, 0,  0, 0, 0,  0, 0, 0],
            [7, 9, 3,  4, 6, 5,  8, 1, 2],

            [9, 2, 5,  3, 4, 8,  6, 7, 1],
            [8, 4, 1,  6, 9, 7,  5, 2, 3],
            [6, 3, 6,  5, 1, 2,  4, 8, 0]
        ]

        sudoku[4][0] = new Set([1, 2, 3])
        sudoku[4][1] = new Set([1, 2, 3])
        sudoku[4][2] = new Set([1, 7, 8])
        sudoku[4][3] = new Set([1, 7, 8, 9])
        sudoku[4][4] = new Set([1, 7, 8])
        sudoku[4][5] = new Set([1, 7, 8])

        sudoku = rm_possibility_from_row(sudoku, 4, 1)
        expect(sudoku[4][0]).toEqual(new Set([2, 3]))
        expect(sudoku[4][1]).toEqual(new Set([2, 3]))
        expect(sudoku[4][2]).toEqual(new Set([7, 8]))
        expect(sudoku[4][3]).toEqual(new Set([7, 8, 9]))
        expect(sudoku[4][4]).toEqual(new Set([7, 8]))
        expect(sudoku[4][5]).toEqual(new Set([7, 8]))
    })

    test('should remove one possibility in column', () => {
        let sudoku = [
            [0, 1, 9,  7, 8, 6,  3, 5, 4],
            [0, 8, 6,  1, 3, 4,  2, 9, 7],
            [0, 7, 4,  2, 5, 9,  1, 6, 0],

            [0, 6, 8,  9, 2, 1,  7, 3, 5],
            [0, 5, 2,  8, 7, 3,  9, 4, 6],
            [0, 9, 3,  4, 6, 5,  8, 1, 2],
            
            [0, 2, 5,  3, 4, 8,  6, 7, 1],
            [0, 4, 1,  6, 9, 7,  5, 2, 0],
            [0, 3, 7,  5, 1, 2,  4, 0, 0]
        ]

        sudoku[0][0] = new Set([1, 2, 3])
        sudoku[1][0] = new Set([1, 2, 3])
        sudoku[2][0] = new Set([1, 7, 8])
        sudoku[3][0] = new Set([1, 7, 8, 9])
        sudoku[4][0] = new Set([1, 7, 8])
        sudoku[5][0] = new Set([1, 7, 8])

        sudoku = rm_possibility_from_col(sudoku, 0, 1)
        expect(sudoku[0][0]).toEqual(new Set([2, 3]))
        expect(sudoku[1][0]).toEqual(new Set([2, 3]))
        expect(sudoku[2][0]).toEqual(new Set([7, 8]))
        expect(sudoku[3][0]).toEqual(new Set([7, 8, 9]))
        expect(sudoku[4][0]).toEqual(new Set([7, 8]))
        expect(sudoku[5][0]).toEqual(new Set([7, 8]))
    })

    test('should compute all possible numbers in a sudoku', () => {
        let sudoku = [
            [2, 1, 9,  7, 8, 6,  3, 5, 4],
            [5, 8, 6,  1, 3, 4,  2, 9, 7],
            [3, 7, 4,  2, 5, 9,  1, 6, 8],

            [4, 6, 8,  9, 2, 1,  7, 3, 5],
            [1, 5, 2,  8, 7, 3,  9, 4, 6],
            [7, 9, 3,  4, 6, 5,  8, 1, 2],

            [9, 2, 5,  3, 4, 8,  6, 7, 1],
            [8, 4, 1,  6, 9, 7,  5, 2, 3],
            [6, 3, 6,  5, 1, 2,  4, 8, 0]
        ]

        let sudoku_map = compute_possible_numbers(sudoku)
        expect(sudoku_map[8][8]).toEqual(new Set([9]))

    })

    test('should infer possiblity by superposition of possibilities', () => {

        let sudoku = [
            [2, 0, 9,  7, 8, 6,  3, 5, 4],
            [5, 8, 6,  1, 3, 4,  2, 9, 7],
            [3, 7, 4,  2, 5, 9,  1, 6, 8],

            [4, 6, 8,  9, 2, 1,  7, 3, 5],
            [1, 5, 2,  8, 7, 3,  9, 4, 6],
            [7, 9, 3,  4, 6, 5,  8, 1, 2],

            [9, 2, 0,  3, 4, 8,  6, 7, 1], // because the 1 cannot be a second time in this row
            [8, 0, 0,  6, 0, 0,  5, 2, 3], // it has to be in the first group in this row
            [6, 3, 7,  5, 0, 2,  4, 8, 9]  // from there we can conclude that the last 1 has to in the second group
        ]

        sudoku = compute_possible_numbers(sudoku)
        expect(sudoku[6][2]).toEqual(new Set([5]))
        expect(sudoku[7][5]).toEqual(new Set([7]))
        expect(sudoku[7][4]).toEqual(new Set([9]))
        expect(sudoku[8][4]).toEqual(new Set([1]))
    })

})