export function validate(sudoku) {
    for (let row of sudoku) {
        if (row.length !== sudoku.length) {
            return false
        }
    }
    return true
    // if non 0 item is twice in group / row / col
}

export function group(row, col, sudoku, include=true) {
    let group_row = Math.floor(row / 3)
    let group_col = Math.floor(col / 3)
    let group = []
    for(let i = 0; i < 3; i++) {
        for(let j = 0; j < 3; j++) {
            if (include || (3 * group_row + i) !== row || (3 * group_col + j) !== col) {
                group.push(sudoku[3 * group_row + i][3 * group_col + j])
            }
        }
    }
    return group
}

export function row(row, col, sudoku, include=true) {
    return sudoku[row].filter((n, i) => include || i !== col)
}

export function col(row, col, sudoku, include=true) {
    return sudoku.map(r => r[col]).filter((n, i) => include || i !== row)
}

export function groups(sudoku) {
    let g = []
    for(let r = 0; r < 3; r++) {
        for(let c = 0; c < 3; c++) {
            g.push(group(3 * r, 3 * c, sudoku))
        }
    }
    return g
}

export function cols(sudoku) {
    let cols = []
    for(let c of sudoku[0]) {
        cols.push(col(0, c))
    }
    return cols
}

export function numbers(list) {
    return new Set(list.filter(n => n !== 0))
}

export function union(...sets) {
    if (sets.length > 1) {
        let [setA, setB, ...s] = sets
        let u = new Set(setA)
        for(let elem of setB) {
            u.add(elem)
        }
        return union(u, ...s)
    } else if(sets.length === 1) {
        return new Set(sets[0]) 
    }
    return new Set([])
}

export function difference(setA, setB) {
    let diff = new Set(setA)
    for(let elem of diff) {
        if(setB.has(elem)) {
            diff.delete(elem)
        }
    }
    return diff
}

const POSSIBLE_NUMBERS = [1, 2, 3, 4, 5, 6, 7, 8, 9]

export function compute_possible_numbers(sudoku) {
    return sudoku.map((r, i) => {
        return r.map((n, j) => {
            if( 
                n === 0 || 
                typeof n === 'undefined' || 
                typeof n[Symbol.iterator] === 'function'
            ) {
                return difference(
                    POSSIBLE_NUMBERS,
                    union(
                        numbers(group(i, j, sudoku)),
                        numbers(row(i, j, sudoku)),
                        numbers(col(i, j, sudoku))
                    )
                )
            }
            return n
        })
    })
}

export function get_next(sudoku) {
    let min = 9
    let pos = [0, 0]
    for(let r = 0; r < sudoku.length; r++) {
        for(let c = 0; c < sudoku[r].length; c++) {
            let set = sudoku[r][c]
            if(typeof set[Symbol.iterator] === 'function') {
                if(set.size < min) {
                    min = set.size
                    pos = [r, c]
                }
            }
        }
    }
    return pos
}

export function get_unique(sudoku) {
    for(let r = 0; r < sudoku.length; r++) {
        for(let c = 0; c < sudoku[r].length; c++) {
            if (typeof sudoku[r][c][Symbol.iterator] === 'function') {

                let set = new Set(sudoku[r][c])
                let g_set = union(...group(r, c, sudoku, false).filter(n => typeof n[Symbol.iterator] === 'function'))
                let r_set = union(...row(r, c, sudoku, false).filter(n => typeof n[Symbol.iterator] === 'function'))
                let c_set = union(...col(r, c, sudoku, false).filter(n => typeof n[Symbol.iterator] === 'function'))

                let unique = difference(set, g_set)
                if(unique.size === 1) {
                    let value = unique.values().next().value
                    return [[r, c], value]
                }
                unique = difference(set, r_set)
                if(unique.size === 1) {
                    let value = unique.values().next().value
                    return [[r, c], value]
                }
                unique = difference(set, c_set)
                if(unique.size === 1) {
                    let value = unique.values().next().value
                    return [[r, c], value]
                }
            }
        }
    }

    return [[0, 0], 0]
}

export function is_solved(sudoku) {
    for(let row of sudoku) {
        for(let n of row) {
            if (n === 0 || typeof n[Symbol.iterator] === 'function') {
                return false
            }
        }
    }
    return true
}

export function unsolved(sudoku) {
    let counter = 0;
    for(let r of sudoku) {
        for(let n of r) {
            if (n === 0 || typeof n[Symbol.iterator] === 'function') {
                counter++;
            }
        }
    }
    return counter;
}