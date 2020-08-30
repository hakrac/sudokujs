

export function formatter(sudoku) {
    for(let row in sudoku) {
        if(row % 3 === 0) {
            console.log('+-------+-------+-------+')
        }
        console.log('| %s %s %s '.repeat(3) + '|', ...(sudoku[row].map(item => item > 0 ? item : ' ')))
    }
    console.log('+-------+-------+-------+')
}
