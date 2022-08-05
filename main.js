const Numbers_Input = document.querySelectorAll('.Number')
const Decimal_Input = document.querySelector('.Decimal')
const Operate_Input = document.querySelectorAll('.Operate')
const Negative_Input = document.querySelector('.Negative')
const Clear_All_Button = document.querySelector('.Clear-All')
const History_Button = document.querySelector('#History-Button')
const History__Clear_Button = document.querySelector('#Clear-History')
const Full_History = document.querySelector('#History')
const Main_History = document.querySelector('#History-Bar')
const Result_Div = document.querySelector('.Result')
const Process_Div = document.querySelector('#Main-Process')
const Delete_Button = document.querySelector('.Delete')
const Equal_button = document.querySelector('.Equal')
const Previous = document.querySelector('.Previous')
const Current = document.querySelector('.Current')
const All_buttons = document.querySelectorAll('button')
const Switch_Mode = document.querySelector('#Title')
const Currency = document.querySelectorAll('select')
const Input_Box = document.querySelectorAll('input')
const Top = document.querySelector('.Top')
const Bottom = document.querySelector('.Bottom')
const Full_Navigation = document.querySelector('.Nav')
const Navigation_icon = document.querySelector('#Nav-icon')
const Navigation_Node = document.querySelector('.Note')
function Getnumbers() {
    Numbers_Input.forEach(button => {
        button.addEventListener('click', () => {
            if (Switch_Mode.innerText == 'CACULATOR') {
                let block_index
                if (OperationCheck() != 'NoOperate') block_index = Current.innerText.indexOf(OperationCheck())
                if (Current.innerText.indexOf('0', block_index) == block_index + 1) {
                    block_index++
                    if (Current.innerText.indexOf('.', block_index) != block_index + 1) return
                }
                if (Current.innerText == '0') return
                if (Current.innerText == '-0') return
                Current.innerText = Current.innerText + button.innerText
            }
            else Input_Box[0].value += button.innerText
        })
    })
}
function Decimal() {
    Decimal_Input.addEventListener('click', () => {
        if (Switch_Mode.innerText == 'CACULATOR') {
            let firstDec = -1, secondDec = -1
            if (Current.innerText.indexOf('.') == Current.innerText.length - 1) return
            if (Current.innerText == '') return
            if (Current.innerText == '-') return
            if (OperationCheck() == 'NoOperate') {
                if (Current.innerText.indexOf('.') != -1) return
            }
            // find the first decimal, if click deciaml again ('..') block
            // find the first decimal, then find another then block clicking
            if (Current.innerText.indexOf('.') != -1) firstDec = Current.innerText.indexOf('.')
            if (firstDec != -1) {
                if (Current.innerText.indexOf('.', firstDec + 1) != -1) secondDec = Current.innerText.indexOf('.', firstDec + 1)
            }
            if (firstDec != -1 && secondDec != -1) return
            else Current.innerText = Current.innerText + Decimal_Input.innerText
        }
        else {
            if (Input_Box[0].value.indexOf('.') == -1) Input_Box[0].value += Decimal_Input.innerText
            else return
        }
    })
}
function Negative() {
    Negative_Input.addEventListener('click', () => {
        if (Switch_Mode.innerText == 'CACULATOR') {
            let block_index
            if (Current.innerText == '') Current.innerText = Current.innerText + '-'
            if (OperationCheck() != 'NoOperate') {
                block_index = Current.innerText.indexOf(OperationCheck(), 1)
                if (Current.innerText[block_index + 1] == undefined) Current.innerText += '-'
                else return
            }
        }
    })
}
function GetOperate() {
    Operate_Input.forEach(button => {
        if (Switch_Mode.innerText == 'CACULATOR') {
            button.addEventListener('click', () => {
                let Check = document.querySelector('.Current').innerText;
                if (OperationCheck() != 'NoOperate') return
                if (Check == '') return
                if (Check == '-') return
                if (Check.indexOf('+', 1) != -1) Equal_button.click()
                if (Check.indexOf('-', 1) != -1) Equal_button.click()
                if (Check.indexOf('x', 1) != -1) Equal_button.click()
                if (Check.indexOf('/', 1) != -1) Equal_button.click()
                else Current.innerText = Current.innerText + button.innerText
            })
        }
    })
}
function OperationCheck() {
    let Check = Current.innerText
    if (Check.indexOf('+', 1) != -1) return '+'
    if (Check.indexOf('x', 1) != -1) return 'x'
    if (Check.indexOf('/', 1) != -1) return '/'
    if (Check.indexOf('-', 1) != -1) return '-'
    else return 'NoOperate' // return when user no caculate anything
}
function HistoryPage() {
    History_Button.addEventListener('click', () => { // Lmao code only run at the second click
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
    History__Clear_Button.addEventListener('click', () => {
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
            let operate = OperationCheck()
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
            let a = 1, b = 1, biggerfloat = 1, Fixed
            // Fix Floating Point number
            // if you typing "number1+" number2 will be NaN but if you typing "number1" number 2 will be 0
            if (!isNaN(number2) && number2 != 0) {
                if (isFloat(number1)) {
                    a = 1
                    while (isFloat(number1)) {
                        number1 = number1 * 10
                        a = a * 10
                    }
                    biggerfloat = a
                }
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
                else Fixed = (number1 + number2) / biggerfloat; break
                case '-': if (isNaN(number2)) Fixed = number1 / biggerfloat
                else Fixed = (number1 - number2) / biggerfloat; break
                case 'x': if (isNaN(number2)) Fixed = number1 / biggerfloat
                else Fixed = (number1 * number2) / (biggerfloat * biggerfloat); break
                case '/': if (isNaN(number2)) Fixed = number1 / biggerfloat
                else Fixed = (number1 / number2); break
                default: Fixed = number1 / biggerfloat; break
            }
            Current.innerText = Fixed
            if (isNaN(number2) || operate == 'NoOperate') Previous.innerText = Current.innerText
            else Previous.innerText = parseFloat(temp1) + operate + parseFloat(temp2)
            // Save result to History
            let history_temp = document.createElement("p");
            history_temp.innerText = Previous.innerText + ' = ' + Current.innerText
            Main_History.appendChild(history_temp)
        }
    })
}
function ClearAll() {
    Clear_All_Button.addEventListener('click', () => {
        document.querySelector('.Previous').innerText = ''
        document.querySelector('.Current').innerText = ''
    })
}
function Delete() {
    Delete_Button.addEventListener('click', () => {
        if (Switch_Mode.innerText == 'CACULATOR') Current.innerText = Current.innerText.slice(0, Current.innerText.length - 1)
        else Input_Box[0].value = Input_Box[0].value.slice(0, Input_Box[0].value.length - 1)
    })
}
function Keyboard() {
    window.addEventListener('keydown', (e) => {
        if (e.key == 'Delete' && e.repeat == true) Clear_All_Button.click()
        else {
            switch (e.key) {
                case 'Tab': Navigation_icon.click(); break
                case 'S': Switch_Mode.click(); break
                case '=': Equal_button.click(); break
                case 'Enter': Equal_button.click(); break
                case '1': Numbers_Input[0].click(); break
                case '2': Numbers_Input[1].click(); break
                case '3': Numbers_Input[2].click(); break
                case '4': Numbers_Input[3].click(); break
                case '5': Numbers_Input[4].click(); break
                case '6': Numbers_Input[5].click(); break
                case '7': Numbers_Input[6].click(); break
                case '8': Numbers_Input[7].click(); break
                case '9': Numbers_Input[8].click(); break
                case '0': Numbers_Input[9].click(); break
                case 'Delete':
                case 'Backspace':
                    if (Process_Div.style.display == 'flex') Delete_Button.click()
                    else History__Clear_Button.click(); break
                case '+': Operate_Input[0].click(); break
                case '-':
                    if (Current.innerText == '') Negative_Input.click()
                    else {
                        if (OperationCheck() != 'NoOperate') Negative_Input.click()
                        else Operate_Input[1].click()
                    }
                    break
                case '*': Operate_Input[2].click(); break
                case '/': Operate_Input[3].click(); break
                case '.': Decimal_Input.click(); break
                case 'H': History_Button.click(); break
                default: break
            }
        }
    })
}
function SwitchMode() { // Some Stupid code Bro
    Switch_Mode.addEventListener('click', () => {
        if (Switch_Mode.innerText == 'CACULATOR') {
            Input_Box.forEach(box => {
                box.style.display = 'block'
            })
            Switch_Mode.innerText = 'CURRENCY EXCHANGE'
            Currency.forEach(button => {
                button.style.display = 'block'
            })
            Numbers_Input[0].style.order = '1'
            Numbers_Input[1].style.order = '2'
            Numbers_Input[2].style.order = '3'
            Numbers_Input[3].style.order = '5'
            Numbers_Input[4].style.order = '6'
            Numbers_Input[5].style.order = '7'
            Numbers_Input[6].style.order = '9'
            Numbers_Input[7].style.order = '10'
            Numbers_Input[8].style.order = '11'
            Numbers_Input[9].style.order = '13'
            Clear_All_Button.style.order = '4'
            Delete_Button.style.order = '8'
            Decimal_Input.style.order = '12'
            Equal_button.style.order = '14'
            Equal_button.style.width = '225px'
            Negative_Input.style.display = 'none'
            Process_Div.style.height = '235px'
            Result_Div.style.height = '235px'
            Operate_Input.forEach(button => {
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
            Negative_Input.style.display = 'block'
            Operate_Input.forEach(button => {
                button.style.display = 'block'
            })
            Negative_Input.style.order = '1'
            Clear_All_Button.style.order = '2'
            Delete_Button.style.order = '3'
            Operate_Input[0].style.order = '4'
            Operate_Input[1].style.order = '8'
            Operate_Input[2].style.order = '12'
            Operate_Input[3].style.order = '16'
            Decimal_Input.style.order = '17'
            Numbers_Input[0].style.order = '5'
            Numbers_Input[1].style.order = '6'
            Numbers_Input[2].style.order = '7'
            Numbers_Input[3].style.order = '9'
            Numbers_Input[4].style.order = '10'
            Numbers_Input[5].style.order = '11'
            Numbers_Input[6].style.order = '13'
            Numbers_Input[7].style.order = '14'
            Numbers_Input[8].style.order = '15'
            Numbers_Input[9].style.order = '19'
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
    Navigation_Node.style.transform = 'translateX(-100%)'
    Navigation_icon.addEventListener('click', () => {
        if (Navigation_Node.style.transform == 'translateX(-100%)') {
            Full_Navigation.style.width = '300px'
            Full_Navigation.style.height = '100%'
            Navigation_Node.style.display = 'block'
            setTimeout(() => {
                Navigation_Node.style.transform = 'translateX(0%)'
            }, 0)
        }
        else {
            Navigation_Node.style.transform = 'translateX(-100%)'
            setTimeout(() => {
                Full_Navigation.style.width = '50px'
                Full_Navigation.style.height = '50px'
                Navigation_Node.style.display = 'none'
            }, 500)
        }
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
            switch (button.innerText) {
                case '1': case '2': case '3': case '4': case '5': case '6': case '7': case '8': case '9': case '0': button.style.backgroundColor = ColorGray; break
                default: button.style.backgroundColor = ColorWhite; break
            }
        })
        button.addEventListener('click', () => {
            switch (button.innerText) {
                case '=':
                    button.style.backgroundColor = ColorGreen
                    setTimeout(() => {
                        button.style.backgroundColor = ColorWhite
                    }, animationtime)
                    break
                case 'Delete':
                    button.style.backgroundColor = ColorYellow
                    setTimeout(() => {
                        button.style.backgroundColor = ColorWhite
                    }, animationtime)
                    break
                case 'AC':
                    button.style.backgroundColor = ColorRed
                    setTimeout(() => {
                        button.style.backgroundColor = ColorWhite
                    }, animationtime)
                    break
                case '+/-':
                    button.style.backgroundColor = ColorBlue
                    setTimeout(() => {
                        button.style.backgroundColor = ColorWhite
                    }, animationtime)
                    break
                case '1': case '2': case '3': case '4': case '5': case '6': case '7': case '8': case '9': case '0':
                    button.style.backgroundColor = ColorBlue
                    setTimeout(() => {
                        button.style.backgroundColor = ColorGray
                    }, animationtime)
                    break
                case '+': case '-': case 'x': case '/':
                    button.style.backgroundColor = ColorBlue
                    setTimeout(() => {
                        button.style.backgroundColor = ColorWhite
                    }, animationtime)
                    break
                default: break
            }
        })
    })
}
function main() {
    Process_Div.style.display = 'flex'
    Currency.forEach(button => {
        button.style.display = 'none'
    })
    Keyboard()
    HistoryPage()
    ClearHistory()
    Getnumbers()
    Decimal()
    Negative()
    GetOperate()
    ClearAll()
    Result()
    Delete()
    SwitchMode()
    AnimationButtons()
    AnimationNav()
}
main()