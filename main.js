const number_input = document.querySelectorAll('.Number')
const decimal = document.querySelector('.Decimal')
const oparate_input = document.querySelectorAll('.Operate')
const negative_input = document.querySelector('.Negative')
const clear_all_button = document.querySelector('.Clear-All')
const history_button = document.querySelector('#History-Button')
const history_clear = document.querySelector('#Clear-History')
const Full_History = document.querySelector('#History')
const Main_History = document.querySelector('#History-Bar')
const Result_Div = document.querySelector('.Result')
const Process_Div = document.querySelector('#Main-Process')
const delete_button = document.querySelector('.Delete')
const Equal_button = document.querySelector('.Equal')
const Previous = document.querySelector('.Previous')
const Current = document.querySelector('.Current')
const All_buttons = document.querySelectorAll('button')
const Switch_Mode = document.querySelector('#Title')
const Currency = document.querySelectorAll('select')
const Input_Box = document.querySelectorAll('input')
const Top = document.querySelector('.Top')
const Bottom = document.querySelector('.Bottom')
const Navigation_icon = document.querySelector('#Nav-icon')
const Navigation_note = document.querySelector('.Note')
function Getnumbers() {
    number_input.forEach(button => {
        button.addEventListener('click', () => {
            if (Switch_Mode.innerText == 'CACULATOR') {
                let block_index
                if (Operationcheck() != 'NoOperate') block_index = Current.innerText.indexOf(Operationcheck());
                if (Current.innerText.indexOf('0', block_index) == block_index + 1) {
                    block_index++
                    if (Current.innerText.indexOf('.', block_index) != block_index + 1) return
                }
                if (Current.innerText == '0') return
                Current.innerText = Current.innerText + button.innerText;
            }
            else Input_Box[0].value += button.innerText
        })
    })
}
function Decimal() {
    decimal.addEventListener('click', () => {
        if (Switch_Mode.innerText == 'CACULATOR') {
            let firstDec = -1, secondDec = -1
            if (Current.innerText.indexOf('.') == Current.innerText.length - 1) return
            if (Current.innerText == '') return;
            if (Operationcheck() == 'NoOperate') {
                if (Current.innerText.indexOf('.') != -1) return
            }
            // find the first decimal, if click deciaml again ('..') block
            // find the first decimal, then find another then block clicking
            if (Current.innerText.indexOf('.') != -1) firstDec = Current.innerText.indexOf('.')
            if (firstDec != -1) {
                if (Current.innerText.indexOf('.', firstDec + 1) != -1) secondDec = Current.innerText.indexOf('.', firstDec + 1)
            }
            if (firstDec != -1 && secondDec != -1) return
            else Current.innerText = Current.innerText + decimal.innerText;
        }
        else {
            if (Input_Box[0].value.indexOf('.') == -1) Input_Box[0].value += decimal.innerText
            else return
        }
    })
}
function Negative() {
    negative_input.addEventListener('click', () => {
        if (Switch_Mode.innerText == 'CACULATOR') {
            if (Current.innerText == '') Current.innerText = Current.innerText + '-'
        }
    })
}
function Getoperate() {
    oparate_input.forEach(button => {
        if (Switch_Mode.innerText == 'CACULATOR') {
            button.addEventListener('click', () => {
                let Check = document.querySelector('.Current').innerText;
                if (Check == '') return
                if (Check == '-') return
                if (Check.indexOf('+', 1) != -1) Equal_button.click()
                if (Check.indexOf('-', 1) != -1) Equal_button.click()
                if (Check.indexOf('x', 1) != -1) Equal_button.click()
                if (Check.indexOf('/', 1) != -1) Equal_button.click()
                else Current.innerText = Current.innerText + button.innerText;
            })
        }
    })
}
function Operationcheck() {
    let Check = Current.innerText
    if (Check.indexOf('+', 1) != -1) return '+'
    else {
        if (Check.indexOf('-', 1) != -1) return '-'
        else {
            if (Check.indexOf('x', 1) != -1) return 'x'
            else {
                if (Check.indexOf('/', 1) != -1) return '/'
                else return 'NoOperate' // return when user no caculate anything
            }
        }
    }
}
function HistoryPage() {
    history_button.addEventListener('click', () => { // Lmao code only run at the second click
        if (Process_Div.style.display == 'flex') {
            setTimeout(() => {
                Process_Div.style.display = 'none'
                Result_Div.style.display = 'none'
                Full_History.style.height = '525px'
            }, 150)
            Process_Div.style.opacity = '0'
            Result_Div.style.opacity = '0'
        }
        else {
            Process_Div.style.display = 'flex'
            Result_Div.style.display = 'flex'
            Full_History.style.height = '30px'
            setTimeout(() => {
                Process_Div.style.opacity = '1'
                Result_Div.style.opacity = '1'
            }, 150)
        }
    })
}
function ClearHistory() {
    history_clear.addEventListener('click', () => {
        let x = document.querySelectorAll('p')
        for (let index = 0; index < x.length; index++) {
            x[index].remove()
        }
    })
}
function isFloat(number) {
    if (number % 1 != 0) return true
    else return false
}
function Result() {
    Equal_button.addEventListener('click', () => {
        if (Switch_Mode.innerText == 'CACULATOR') {
            let CurrentString = Current.innerText
            if (CurrentString == Previous.innerText) return
            if (CurrentString == '-') return
            let temp1, temp2 // create 2 temp and convert to string later
            let number1 = 0, number2 = 0
            // Check operation + - x / //
            let operate = Operationcheck()
            if (operate == 'NoOperate') {
                temp1 = CurrentString; number1 = parseFloat(temp1)
            }
            else {
                let operate_index = CurrentString.indexOf(operate, 1)
                temp1 = CurrentString.slice(0, operate_index)
                temp2 = CurrentString.slice(operate_index + 1, CurrentString.length)
                number1 = parseFloat(temp1)
                number2 = parseFloat(temp2)
            }
            // Fix Floating Point number
            let a = 1, b = 1, biggerfloat=1, Fixed
            if (isFloat(number1)) {
                a = 1
                while (isFloat(number1)) {
                    number1 = number1 * 10
                    a = a * 10
                }
                biggerfloat = a
            }
            if (!isNaN(number2)) {
                if (isFloat(number2)) {
                    b = 1
                    while (isFloat(number2)) {
                        number2 = number2 * 10
                        b = b * 10
                    }
                }
                if (a > b) {
                    biggerfloat = a
                    number2 = number2 * (a / b)
                }
                if (b > a) {
                    biggerfloat = b
                    number1 = number1 * (b / a)
                }
            }
            switch (operate) {
                case '+': if (isNaN(number2)) Fixed = number1 / biggerfloat
                else Fixed = (number1 + number2) / biggerfloat
                    break;
                case '-': if (isNaN(number2)) Fixed = number1 / biggerfloat
                else Fixed = (number1 - number2) / biggerfloat
                    break;
                case 'x': if (isNaN(number2)) Fixed = number1 / biggerfloat
                else Fixed = (number1 * number2) / biggerfloat
                    break;
                case '/': if (isNaN(number2)) Fixed = number1 / biggerfloat
                else Fixed = (number1 / number2) / biggerfloat
                    break;
                default: Fixed = number1 / biggerfloat
                    break;
            }
            Current.innerText = Fixed
            if (isNaN(number2) || operate == 'NoOperate') Previous.innerText = Current.innerText
            else Previous.innerText = temp1 + operate + temp2
            // Save result to History
            let history_temp = document.createElement("p");
            history_temp.innerText = Previous.innerText + ' = ' + Current.innerText
            Main_History.appendChild(history_temp)
        }
    })
}
function ClearAll() {
    clear_all_button.addEventListener('click', () => {
        document.querySelector('.Previous').innerText = ''
        document.querySelector('.Current').innerText = ''
    })
}
function Delete() {
    delete_button.addEventListener('click', () => {
        if (Switch_Mode.innerText == 'CACULATOR') Current.innerText = Current.innerText.slice(0, Current.innerText.length - 1)
        else Input_Box[0].value = Input_Box[0].value.slice(0, Input_Box[0].value.length - 1)
    })
}
function Keyboard() {
    window.addEventListener('keydown', (e) => {
        if (e.key == 'Delete' && e.repeat == true) clear_all_button.click()
        else {
            switch (e.key) {
                case 's': Switch_Mode.click(); break;
                case '=': Equal_button.click(); break;
                case 'Enter': Equal_button.click(); break;
                case '1': number_input[0].click(); break;
                case '2': number_input[1].click(); break;
                case '3': number_input[2].click(); break;
                case '4': number_input[3].click(); break;
                case '5': number_input[4].click(); break;
                case '6': number_input[5].click(); break;
                case '7': number_input[6].click(); break;
                case '8': number_input[7].click(); break;
                case '9': number_input[8].click(); break;
                case '0': number_input[9].click(); break;
                case 'Delete':
                case 'Backspace':
                    if (Process_Div.style.display == 'flex') delete_button.click()
                    else history_clear.click(); break;
                case '+': oparate_input[0].click(); break;
                case '-':
                    if (Current.innerText == '') negative_input.click()
                    else oparate_input[1].click(); break;
                case '*': oparate_input[2].click(); break;
                case '/': oparate_input[3].click(); break;
                case '.': decimal.click(); break;
                case 'h': history_button.click(); break;
                default: break;
            }
        }
    })
}
function switchmode() { // Some Stupid code Bro
    Switch_Mode.addEventListener('click', () => {
        if (Switch_Mode.innerText == 'CACULATOR') {
            Input_Box.forEach(box => {
                box.style.display = 'block'
            })
            Switch_Mode.innerText = 'CURRENCY EXCHANGE'
            Currency.forEach(button => {
                button.style.display = 'block'
            })
            number_input[0].style.order = '1'
            number_input[1].style.order = '2'
            number_input[2].style.order = '3'
            number_input[3].style.order = '5'
            number_input[4].style.order = '6'
            number_input[5].style.order = '7'
            number_input[6].style.order = '9'
            number_input[7].style.order = '10'
            number_input[8].style.order = '11'
            number_input[9].style.order = '13'
            clear_all_button.style.order = '4'
            delete_button.style.order = '8'
            decimal.style.order = '12'
            Equal_button.style.order = '14'
            Equal_button.style.width = '225px'
            negative_input.style.display = 'none'
            Process_Div.style.height = '235px'
            Result_Div.style.height = '235px'
            oparate_input.forEach(button => {
                button.style.display = 'none'
            })
            Result_Div.style.display = 'space-around'
            Previous.style.display = 'none'
            Current.style.display = 'none'
            Top.style.display = 'flex'
            Bottom.style.display = 'flex'
            Top.style.marginBottom = '50px'
            Bottom.style.marginBottom = '50px'
        }
        else {
            Switch_Mode.innerText = 'CACULATOR'
            Input_Box.forEach(box => {
                box.style.display = 'none'
            })
            Currency.forEach(button => {
                button.style.display = 'none'
            })
            negative_input.style.display = 'block'
            oparate_input.forEach(button => {
                button.style.display = 'block'
            })
            negative_input.style.order = '1'
            clear_all_button.style.order = '2'
            delete_button.style.order = '3'
            oparate_input[0].style.order = '4'
            oparate_input[1].style.order = '8'
            oparate_input[2].style.order = '12'
            oparate_input[3].style.order = '16'
            decimal.style.order = '17'
            number_input[0].style.order = '5'
            number_input[1].style.order = '6'
            number_input[2].style.order = '7'
            number_input[3].style.order = '9'
            number_input[4].style.order = '10'
            number_input[5].style.order = '11'
            number_input[6].style.order = '13'
            number_input[7].style.order = '14'
            number_input[8].style.order = '15'
            number_input[9].style.order = '19'
            Equal_button.style.order = '20'
            Equal_button.style.width = '150px'
            Process_Div.style.height = '300px'
            Result_Div.style.height = '170px'
            Result_Div.style.justifyContent = 'space-between'
            Previous.style.display = 'block'
            Current.style.display = 'block'
            Top.style.display = 'block'
            Bottom.style.display = 'block'
            Top.style.marginBottom = '0px'
            Bottom.style.marginBottom = '0px'
        }
    })
}
function AnimationNav() {
    Navigation_note.style.transform = 'translateX(-100%)'
    Navigation_icon.addEventListener('click',()=>{
        if(Navigation_note.style.transform == 'translateX(-100%)') Navigation_note.style.transform = 'translateX(0%)'
        else Navigation_note.style.transform = 'translateX(-100%)'
    })
}
function AnimationButtons() {
    const animationtime = 250
    const ColorBlue = 'rgb(13, 235, 235)'
    const ColorWhite = 'rgb(255, 255, 255)'
    const ColorGreen = 'rgb(122, 235, 8)'
    const ColorYellow = 'rgb(255, 215, 0)'
    const ColorGray = 'rgb(250, 250, 250)'
    const ColorRed = 'rgb(219, 7, 7)'
    All_buttons.forEach(button => {
        button.addEventListener('mouseenter', () => {
            button.style.backgroundColor = ColorBlue
        })
        button.addEventListener('mouseleave', () => {
            if (button.innerText == '1' || button.innerText == '2' || button.innerText == '3' || button.innerText == '4' || button.innerText == '5' || button.innerText == '6' || button.innerText == '7' || button.innerText == '8' || button.innerText == '9' || button.innerText == '0') button.style.backgroundColor = ColorGray
            else button.style.backgroundColor = ColorWhite
        })
        button.addEventListener('click', () => {
            if (button.innerText == '=') {
                button.style.backgroundColor = ColorGreen
                setTimeout(() => {
                    button.style.backgroundColor = ColorWhite
                }, animationtime)
            }
            if (button.innerText == 'Delete') {
                button.style.backgroundColor = ColorYellow
                setTimeout(() => {
                    button.style.backgroundColor = ColorWhite
                }, animationtime)
            }
            if (button.innerText == 'AC') {
                button.style.backgroundColor = ColorRed
                setTimeout(() => {
                    button.style.backgroundColor = ColorWhite
                }, animationtime)
            }
            if (button.innerText == '1' || button.innerText == '2' || button.innerText == '3' || button.innerText == '4' || button.innerText == '5' || button.innerText == '6' || button.innerText == '7' || button.innerText == '8' || button.innerText == '9' || button.innerText == '0') {
                button.style.backgroundColor = ColorBlue
                setTimeout(() => {
                    button.style.backgroundColor = ColorGray
                }, animationtime)
            }
            if (button.innerText == '+' || button.innerText == '-' || button.innerText == 'x' || button.innerText == '/' || button.innerText == '.' || button.innerText == '+/-') {
                button.style.backgroundColor = ColorBlue
                setTimeout(() => {
                    button.style.backgroundColor = ColorWhite
                }, animationtime)
            }
        })
    })
}
function main() {
    Process_Div.style.display = 'flex' // Fix first click on History
    Currency.forEach(button => {
        button.style.display = 'none'
    })
    Keyboard()
    HistoryPage()
    ClearHistory()
    Getnumbers()
    Decimal()
    Negative()
    Getoperate()
    ClearAll()
    Result()
    Delete()
    switchmode()
    AnimationButtons()
    AnimationNav()
}
main()