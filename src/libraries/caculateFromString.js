function caculate(inputString = '') {
    const finalArray = parseArray(inputString)
    return handleCalc(finalArray)
}
function handleCalc(finalArray = []) {
    if (typeof finalArray[0] === 'number' && finalArray.length === 1) return finalArray[0]
    let isFail = false
    finalArray.forEach(element => {
        if (typeof element === 'number') {
            if (isNaN(element)) isFail = true
        }
    })
    if (isFail) return NaN
    let result = 0
    const operates = ['+', '-', 'x', '/']
    const priorityOperates = ['x', '/']
    const priorityIndexs = []
    const operatesIndex = []
    finalArray.forEach((element, index) => {
        if (priorityOperates.includes(element)) priorityIndexs.push(index)
    })
    finalArray.forEach((element, index) => {
        if (operates.includes(element)) operatesIndex.push(index)
    })
    if (priorityIndexs.length === operatesIndex.length) {
        let isFirstCalc = true
        while (finalArray.length !== 0) {
            if (isFirstCalc) {
                if (finalArray[1] === 'x') {
                    const tempCalc = handleFloat([finalArray[0], finalArray[2]])
                    result = (tempCalc[0] * tempCalc[1]) / (tempCalc[2] * tempCalc[2])
                }
                else {
                    const tempCalc = handleFloat([finalArray[0], finalArray[2]])
                    result = (tempCalc[0] / tempCalc[1])
                }
                finalArray.shift()
                finalArray.shift()
                finalArray.shift()
                isFirstCalc = false
            }
            else {
                if (finalArray[0] === 'x') {
                    const tempCalc = handleFloat([result, finalArray[1]])
                    result = (tempCalc[0] * tempCalc[1]) / (tempCalc[2] * tempCalc[2])
                }
                else {
                    const tempCalc = handleFloat([result, finalArray[1]])
                    result = (tempCalc[0] / tempCalc[1])
                }
                finalArray.shift()
                finalArray.shift()
            }
        }
    }
    if (priorityIndexs.length !== 0 && priorityIndexs.length !== operatesIndex.length) {
        const lowPriority = ['+', '-']
        const lowPriorityIndexs = []
        const temp = []
        const newArray = []
        let count = 0
        finalArray.forEach((element, index) => {
            if (lowPriority.includes(element)) lowPriorityIndexs.push(index)
        })
        for (let i = 0; i < lowPriorityIndexs.length; i++) {
            if (i === 0) {
                temp.push(handleCalc(finalArray.slice(0, lowPriorityIndexs[0])))
            }
            const markIndes = [lowPriorityIndexs[i], lowPriorityIndexs[i + 1]]
            temp.push(handleCalc(finalArray.slice(markIndes[0] + 1, markIndes[1])))
        }
        while (newArray.length < (temp.length + lowPriorityIndexs.length)) {
            newArray.push(temp[count])
            if (finalArray[lowPriorityIndexs[count]]) newArray.push(finalArray[lowPriorityIndexs[count]])
            count++
        }
        return handleCalc(newArray)
    }
    if (priorityIndexs.length === 0) {
        let isFirstCalc = true
        while (finalArray.length !== 0) {
            if (isFirstCalc) {
                if (finalArray[1] === '+') {
                    const tempCalc = handleFloat([finalArray[0], finalArray[2]])
                    result = (tempCalc[0] + tempCalc[1]) / tempCalc[2]
                }
                else {
                    const tempCalc = handleFloat([finalArray[0], finalArray[2]])
                    result = (tempCalc[0] - tempCalc[1]) / tempCalc[2]
                    result = finalArray[0] - finalArray[2]
                }
                finalArray.shift()
                finalArray.shift()
                finalArray.shift()
                isFirstCalc = false
            }
            else {
                if (finalArray[0] === '+') result = result + finalArray[1]
                else result = result = result - finalArray[1]
                finalArray.shift()
                finalArray.shift()
            }
        }
    }
    return result
}
function parseArray(inputString = '') {
    const allOperates = getAllOperates(inputString)
    const allOperatesAsIndexs = getAllOperateIndexs(allOperates)
    if (allOperatesAsIndexs.length === 0) return [parseFloat(inputString)]
    const floatNumbers = getNumbers(inputString, allOperatesAsIndexs)
    const allOperatesAsArray = getAllOperatesAsArray(inputString, allOperatesAsIndexs)
    const finalArray = getFinalArray(floatNumbers, allOperatesAsArray)
    return finalArray
}
function getFinalArray(floatNumbers = [], allOperatesAsArray = []) {
    const finalArray = []
    floatNumbers.forEach((number, index) => {
        finalArray.push(number)
        if (allOperatesAsArray[index]) finalArray.push(allOperatesAsArray[index])
    })
    return finalArray
}
function getAllOperatesAsArray(inputString = '', allOperatesAsIndexs = []) {
    const allOperatesAsArray = []
    allOperatesAsIndexs.forEach(index => {
        allOperatesAsArray.push(inputString[index])
    })
    return allOperatesAsArray
}
function getAllOperates(inputString = '') {
    const inputStringArr = inputString.split('')
    const operates = {
        '+': [],
        '-': [],
        'x': [],
        '/': []
    }
    inputStringArr.forEach((char, index) => {
        if (index === 0) return
        if (operates.hasOwnProperty(char)) {
            if (!operates[char].includes(index - 1)) operates[char].push(index)
        }
    })
    return operates
}
function getAllOperateIndexs(allOperates = { '+': [], '-': [], 'x': [], '/': [] }) {
    const arr = [...allOperates['+'], ...allOperates['-'], ...allOperates['x'], ...allOperates['/']]
    arr.sort((x, y) => x - y)
    return arr.filter((operate, index) => {
        return (operate !== arr[index - 1] + 1)
    })
}
function getNumbers(inputString = '', allOperatesAsArray = []) {
    const numberAsString = []
    const floatNumbers = []
    for (let i = 0; i < allOperatesAsArray.length; i++) {
        if (i === 0) {
            const number = inputString.slice(0, allOperatesAsArray[0])
            numberAsString.push(number)
        }
        const markIndes = [allOperatesAsArray[i], allOperatesAsArray[i + 1]]
        const number = inputString.slice(markIndes[0] + 1, markIndes[1])
        numberAsString.push(number)
    }
    numberAsString.forEach(number => {
        const floatNumber = parseFloat(number)
        floatNumbers.push(floatNumber)
    })
    return floatNumbers
}
function handleFloat(floatNumbers = [1.0, 1.0]) {
    const multiplies = [1, 1]
    let finalMultiplite = 1
    if (isNaN(floatNumbers[1])) {
        return [floatNumbers[0], floatNumbers[1], finalMultiplite]
    }
    while (isFloat(floatNumbers[0])) {
        multiplies[0] *= 10
        floatNumbers[0] *= 10
    }
    while (isFloat(floatNumbers[1])) {
        multiplies[1] *= 10
        floatNumbers[1] *= 10
    }
    if (multiplies[0] === multiplies[1]) finalMultiplite = multiplies[0]
    if (multiplies[0] > multiplies[1]) {
        finalMultiplite = multiplies[0]
        floatNumbers[1] = floatNumbers[1] * (multiplies[0] / multiplies[1])
    }
    if (multiplies[1] > multiplies[0]) {
        finalMultiplite = multiplies[1]
        floatNumbers[0] = floatNumbers[0] * (multiplies[1] / multiplies[0])
    }
    return [floatNumbers[0], floatNumbers[1], finalMultiplite]
}
function isFloat(number = 1) {
    if (number % 1 !== 0) return true
    else return false
}
export default caculate