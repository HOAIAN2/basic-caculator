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
        if(Current.innerText.indexOf('.') == Current.innerText.length-1) return
        if(Current.innerText == '') return ;
        if(Operationcheck() == 'NoOperate')
        {
            console.log(Current.innerText.indexOf('.'))
            if(Current.innerText.indexOf('.') != -1) return
        }
        // find the first decimal, if click deciaml again ('..') block
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
function Negative() {
    negative_input.addEventListener('click', () => {
        if(Current.innerText == '') Current.innerText = Current.innerText + '-'
    })
}
function Getoperate() {
    oparate_input.forEach(button =>{
        button.addEventListener('click', () =>{
            let Check = document.querySelector('.Current').innerText;
            if(Check == '') return
            if(Check == '-') return
            if(Check.indexOf('+',1) != -1) Equal_button.click()
            if(Check.indexOf('-',1) != -1) Equal_button.click()
            if(Check.indexOf('x',1) != -1) Equal_button.click()
            if(Check.indexOf('/',1) != -1) Equal_button.click()
            else Current.innerText =  Current.innerText + button.innerText;
        })
    })
}
function Operationcheck() {
    let Check = Current.innerText
    let operate_index
    if(Check.indexOf('+',1) != -1) return '+'
    else
    {
        if(Check.indexOf('-',1) != -1) return '-'
        else
        {
            if(Check.indexOf('x',1) != -1) return 'x'
            else
            {
                if(Check.indexOf('/',1) != -1) return '/'
                else return 'NoOperate' // return when user no caculate anything
            }
        }
    }
}
function CreateHistory() {
    history_button.addEventListener('click', () => { // Lmao code only run at the second click
        console.log('click', ' ', Process_Div.style.display)
        if(Process_Div.style.display == 'flex')
        {
            setTimeout(() => {
                Process_Div.style.display = 'none'
                Result_Div.style.display = 'none'
                Full_History.style.height = '525px'
            },100)
            Process_Div.style.opacity = '0'
            Result_Div.style.opacity = '0'
        }
        else
        {
            Process_Div.style.display = 'flex'
            Result_Div.style.display = 'flex'
            Full_History.style.height = '30px'
            setTimeout(() => {
                Process_Div.style.opacity = '1'
                Result_Div.style.opacity = '1'
            },100)
        }
    })
}
function ClearHistory() {
    history_clear.addEventListener('click', () => {
        let x = document.querySelectorAll('p')
        for(let index = 0; index < x.length; index++)
        {
            x[index].remove()
        }
    })
}
function Result() {
    Equal_button.addEventListener('click', ()=>{
        Equal_button.style.backgroundColor = "#34eb4c"
        setTimeout(() =>{
            Equal_button.style.backgroundColor = "rgba(255, 255, 255, 1)"
        }, 300)
        let CurrentString = Current.innerText
        if(CurrentString == Previous.innerText) return
        let temp1, temp2 // create 2 temp and convert to string later
        let number1 = 0, number2 = 0
        // Check operation + - x / //
        let operate = Operationcheck()
        console.log(operate)
        if(operate == 'NoOperate')
        {
            temp1 = CurrentString ; number1 = parseFloat(temp1); console.log(number1)
        }
        else
        {
            let operate_index = CurrentString.indexOf(operate,1)
            console.log(operate_index)
            temp1 = CurrentString.slice(0, operate_index) ; console.log(temp1)
            temp2 = CurrentString.slice(operate_index + 1, CurrentString.length) ; console.log(temp2)
            number1 = parseFloat(temp1) ; console.log(number1)
            number2 = parseFloat(temp2) ; console.log(number2)
        }
        switch (operate) {
            case '+': if(isNaN(number2)) Current.innerText = number1
            else Current.innerText = number1 + number2
                break;
            case '-': if(isNaN(number2)) Current.innerText = number1
            else Current.innerText = number1 - number2
                break;
            case 'x': if(isNaN(number2)) Current.innerText = number1
            else Current.innerText = number1 * number2
                break;
            case '/': if(isNaN(number2)) Current.innerText = number1
            else Current.innerText = number1 / number2
                break;
            default:
                if(CurrentString.indexOf('.') == CurrentString.length-1) Current.innerText = Current.innerText.slice(0, Current.innerText.length-1)
                break;
        }
        console.log(Current.innerText)
        if(temp2 == undefined) Previous.innerText = temp1
        else Previous.innerText = temp1 + operate + temp2
        // Save result to History
        let history_temp = document.createElement("p");
        history_temp.innerText = Previous.innerText + ' = ' + Current.innerText ; console.log(history_temp)
        Main_History.appendChild(history_temp)
    })
}
function ClearAll() {
    clear_all_button.addEventListener('click', ()=>{
        clear_all_button.style.backgroundColor = "rgb(245, 17, 51)"
        setTimeout(() =>{
            clear_all_button.style.backgroundColor = "rgba(255, 255, 255, 1)"
        }, 300)
        document.querySelector('.Previous').innerText = ''
        document.querySelector('.Current').innerText = ''
    })
}
function Delete() {
    delete_button.addEventListener('click', ()=>{
        delete_button.style.backgroundColor = "rgb(240, 247, 42)"
        setTimeout(() =>{
            delete_button.style.backgroundColor = "rgba(255, 255, 255, 1)"
        }, 300)
        Current.innerText = Current.innerText.slice(0, Current.innerText.length-1)
    })
}
function Keyboard() {
    window.addEventListener('keydown', (e) =>{
        console.log(e.key)
        switch (e.key) {
            case '=': Equal_button.click() ; break;
            case 'Enter': Equal_button.click() ; break;
            case '1': number_input[0].click() ; break;
            case '2': number_input[1].click() ; break;
            case '3': number_input[2].click() ; break;
            case '4': number_input[3].click() ; break;
            case '5': number_input[4].click() ; break;
            case '6': number_input[5].click() ; break;
            case '7': number_input[6].click() ; break;
            case '8': number_input[7].click() ; break;
            case '9': number_input[8].click() ; break;
            case '0': number_input[9].click() ; break;
            case 'Delete':
                if(Process_Div.style.display == 'flex') delete_button.click()
                else history_clear.click()
            case '+': oparate_input[0].click() ; break;
            case '-': 
                if(Current.innerText == '') negative_input.click()
                else oparate_input[1].click() ; break;
            case '*': oparate_input[2].click() ; break;
            case '/': oparate_input[3].click() ; break;
            case '.': decimal.click() ; break;
            case 'h': history_button.click() ; break;
            default:
                break;
        }
    })
}
function main() {
    Process_Div.style.display = 'flex' // Fix first click on History
    Keyboard()
    CreateHistory()
    ClearHistory()
    Getnumbers()
    Decimal()
    Negative()
    Getoperate()
    ClearAll()
    Result()
    Delete()
}
main()