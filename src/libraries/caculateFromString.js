function caculate(inputString = '') {
    const operate = getOperate(inputString)
    let result = 1
    const floatNumbers = getNumbers(inputString, operate)
    if (inputString.indexOf(operate) === -1) return parseFloat(inputString)
    if (isNaN(floatNumbers[0]) || isNaN(floatNumbers[1])) return floatNumbers[0]
    const numbers = handleFloat(floatNumbers)
    if (numbers[2] === 1) {
        switch (operate) {
            case '+': result = numbers[0] + numbers[1]
                break;
            case '-': result = numbers[0] - numbers[1]
                break;
            case 'x': result = numbers[0] * numbers[1]
                break;
            case '/': result = numbers[0] / numbers[1]
                break;
            default: break
        }
    }
    else {
        switch (operate) {
            case '+': result = (numbers[0] + numbers[1]) / numbers[2]
                break;
            case '-': result = (numbers[0] - numbers[1]) / numbers[2]
                break;
            case 'x': result = (numbers[0] * numbers[1]) / (numbers[2] * numbers[2])
                break;
            case '/': result = (numbers[0] / numbers[1])
                break;
            default: break
        }
    }
    return result
}
function getOperate(inputString = '') {
    const operate = ['+', 'x', '/', '-']
    for (let i = 0; i < operate.length; i++) {
        let key = inputString.indexOf(operate[i], 1)
        if (key !== -1) return operate[i]
    }
}
function getNumbers(inputString = '', operate = '') {
    const operate_index = inputString.indexOf(operate, 1)
    const numberAsString = []
    const floatNumbers = []
    // Cannot use split because '-' will broke, ex: '-125--5'
    numberAsString[0] = inputString.slice(0, operate_index)
    numberAsString[1] = inputString.substring(operate_index + 1, inputString.length)
    floatNumbers[0] = parseFloat(numberAsString[0])
    floatNumbers[1] = parseFloat(numberAsString[1])
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