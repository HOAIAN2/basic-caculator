const APIURL = 'https://api.exchangerate.host/latest'
const Currency1 = document.querySelector('#CRC1')
const Currency2 = document.querySelector('#CRC2')
const Input_Top = document.querySelector('#Exchange1')
const Input_Bottom = document.querySelector('#Exchange2')
const Main_History_2 = document.querySelector('#History-Bar')
const Clear_Button = document.querySelector('.Clear-All')
const Title = document.querySelector('#Title')
let CheckLoop
async function GetAPIData(url) {
    try {
        const response = await fetch(url);
        var data = await response.json()
        Title.setAttribute('title', `Tỉ giá được cập nhật bởi https://exchangerate.host vào lúc ${data.date}`)
    } catch (error) {
        alert('Tính năng chuyển đổi tiền hệ hiện không hoạt động do lỗi kết nối với hệ thống')
    }
    let RateData = data.rates
    /*
    Example : Base Currency is EUR
    VND/JPY = JPY rate(EUR) / VND rate(EUR)
    Serious Series - Serious Coding
    */
    function CreateElement() {
        for (const key in RateData) {
            if (key != 'USD' || key != 'EUR' || key != 'VND' || key != 'JPY' || key != 'KRW' || key != 'GBP') {
                let Temp = document.createElement('option')
                Temp.value = key; Temp.innerText = key
                Currency1.appendChild(Temp)
            }
            if (key != 'USD' || key != 'EUR' || key != 'VND' || key != 'JPY' || key != 'KRW' || key != 'GBP') {
                let Temp = document.createElement('option')
                Temp.value = key; Temp.innerText = key
                Currency2.appendChild(Temp)
            }
        }
    }
    CreateElement()
    function ComfirmExchange() {
        const Comfirm = document.querySelector('.Equal')
        Comfirm.addEventListener('click', () => {
            if(Input_Top.value == '') return
            if (Switch_Mode.innerText == 'CURRENCY EXCHANGE') {
                let Rate1, Rate2
                let RealRate
                let Check
                for (const key in RateData) {
                    if (Currency1.value == key) Rate1 = RateData[key]
                    if (Currency2.value == key) Rate2 = RateData[key]
                }
                RealRate = Rate2 / Rate1
                Check = RealRate * Input_Top.value
                if (isNaN(Check)) Input_Bottom.value = 'Vui lòng nhập số hợp lệ'
                else {
                    Input_Bottom.value = Check
                    let history_temp = document.createElement("p");
                    history_temp.innerText = Input_Top.value + ' ' + Currency1.value + ' = ' + Input_Bottom.value + ' ' + Currency2.value;
                    if (CheckLoop == history_temp.innerText) return
                    CheckLoop = history_temp.innerText
                    Main_History_2.appendChild(history_temp)
                }
            }
        })
    }
    function ClearMoney() {
        Clear_Button.addEventListener('click', () => {
            Input_Top.value = ''
            Input_Bottom.value = ''
        })
    }
    ComfirmExchange()
    ClearMoney()
}
GetAPIData(APIURL)