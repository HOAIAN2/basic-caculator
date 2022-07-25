const number_input = document.querySelectorAll('.Number')
const decimal = document.querySelector('.Decimal')
const oparate_input = document.querySelectorAll('.Operate')
const clear_all_button = document.querySelector('.Clear-All')
const delete_button = document.querySelector('.Delete')
const Equal_button = document.querySelector('.Equal')
const Previous = document.querySelector('.Previous')
const Current = document.querySelector('.Current')
const Run =  document.querySelectorAll('button')
function Getnumbers() {
    number_input.forEach(button =>{
        button.addEventListener('click', () => {
            let Check = document.querySelectorAll('.Number')
            let NoClick = Check[9] ;
            if(Current.innerText == '0') return
            Current.innerText = Current.innerText + button.innerText;
        })
    })
}
function Decimal() {
    decimal.addEventListener('click', () => {
        let firstDec = -1, secondDec = -1
        if(Current.innerText == '') return
        // find the first decimal, then find another then block clicking
        if(Current.innerText.indexOf('.') != -1) firstDec = Current.innerText.indexOf('.')
        if(firstDec != -1)
        {
            if(Current.innerText.indexOf('.', firstDec+1) != -1) secondDec = Current.innerText.indexOf('.', firstDec+1)
        }
        if(firstDec != -1 && secondDec != -1) return
        else Current.innerText = Current.innerText + decimal.innerText;
    })
}
function Getoperate() {
    oparate_input.forEach(button =>{
        button.addEventListener('click', () =>{
            let Check = document.querySelector('.Current').innerText;
            if(Check == '') return
            if(Check.indexOf('+') != -1) return
            if(Check.indexOf('-') != -1) return
            if(Check.indexOf('x') != -1) return
            if(Check.indexOf('/') != -1) return
            else Current.innerText =  Current.innerText + button.innerText;
        })
    })
}
function Operationcheck() {
    let Check = Current.innerText
    let operate_index
    if(Check.indexOf('+') != -1) return '+'
    else
    {
        if(Check.indexOf('-') != -1) return '-'
        else
        {
            if(Check.indexOf('x') != -1) return 'x'
            else
            {
                if(Check.indexOf('/') != -1) return '/'
                else return 'NoOperate' // return when user no caculate anything
            }
        }
    }
}
function Result() {
    Equal_button.addEventListener('click', ()=>{
        let CurrentString = Current.innerText
        if(CurrentString == Previous.innerText) return
        let temp1, temp2 // create 2 temp and convert to string later
        let number1 = 0, number2 = 0
        // Check operation + - x / //
        let operate = Operationcheck()
        console.log(operate)
        if(operate == 'NoOperate')
        {
            temp1 = CurrentString ; number1 = parseFloat(temp1) ; console.log(number1)
        }
        else
        {
            let operate_index = CurrentString.indexOf(operate)
            console.log(operate_index)
            temp1 = CurrentString.slice(0, operate_index) ; console.log(temp1)
            temp2 = CurrentString.slice(operate_index + 1, CurrentString.length) ; console.log(temp2)
            number1 = parseFloat(temp1) ; console.log(number1)
            number2 = parseFloat(temp2) ; console.log(number2)
        }
        switch (operate) {
            case '+': Current.innerText = number1 + number2
                break;
            case '-': Current.innerText = number1 - number2
                break;
            case 'x': Current.innerText = number1 * number2
                break;
            case '/': Current.innerText = number1 / number2
                break;
            default:
                break;
        }
        Previous.innerText = Current.innerText
    })
}
function ClearAll() {
    clear_all_button.addEventListener('click', ()=>{
        document.querySelector('.Previous').innerText = ''
        document.querySelector('.Current').innerText = ''
    })
}
function Delete() {
    delete_button.addEventListener('click', ()=>{
        Current.innerText = Current.innerText.slice(0, Current.innerText.length-1)
    })
}
function main() {
    Getnumbers()
    Decimal()
    Getoperate()
    ClearAll()
    Result()
    Delete()
}
main()