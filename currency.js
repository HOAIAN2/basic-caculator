const APIURL = 'https://api.exchangerate.host/latest'
let EUR, USD, VND, JPY, WON
const Currency1 = document.querySelector('#CRC1')
const Currency2 = document.querySelector('#CRC2')
const Input_Top = document.querySelector('#Exchange1')
const Input_Bottom = document.querySelector('#Exchange2')
const Main_History_2 = document.querySelector('#History-Bar')
const Clear_Button = document.querySelector('.Clear-All')
async function GetAPIData(url){
    const response = await fetch(url);
    var data = await response.json(); console.log(data);
    EUR = 1 ;
    USD = data.rates.USD ; console.log(USD)
    VND = data.rates.VND ; console.log(VND)
    JPY = data.rates.JPY ; console.log(JPY)
    WON = data.rates.KRW ; console.log(WON)
    /*
    Example : Base Currency is EUR
    VND/JPY = JPY rate(EUR) / VND rate(EUR)
    Serious Series - Serious Coding
    */
   function ComfirmExchange() {
    let Comfirm = document.querySelector('.Equal')
    Comfirm.addEventListener('click', ()=>{
    if(Switch_Mode.innerText == 'CURRENCY EXCHANGE')
       {
        let Rate1, Rate2
        let RealRate
        let Check
        switch (Currency1.value) {
            case 'USD': Rate1 = USD; break;
            case 'EUR': Rate1 = EUR; break;
            case 'VND': Rate1 = VND; break;
            case 'JPY': Rate1 = JPY; break;
            case 'WON': Rate1 = WON ; break;
            default: break;
        }
        switch (Currency2.value) {
            case 'USD': Rate2 = USD; break;
            case 'EUR': Rate2 = EUR; break;
            case 'VND': Rate2 = VND; break;
            case 'JPY': Rate2 = JPY; break;
            case 'WON': Rate2 = WON ; break;
            default: break;
        }
        RealRate = Rate2/Rate1
        console.log(Input_Top.value)
        Check = RealRate * Input_Top.value
        if(isNaN(Check)) Input_Bottom.value = 'Vui lòng nhập số hợp lệ'
        else
        {
            Input_Bottom.value = Check
            let history_temp = document.createElement("p");
            history_temp.innerText = Input_Top.value + ' ' + Currency1.value + ' = ' + Input_Bottom.value + ' ' + Currency2.value;
            Main_History_2.appendChild(history_temp) 
        }
    }
    })
   }
   function ClearMoney(){
    Clear_Button.addEventListener('click', ()=>{
        Input_Top.value = ''
        Input_Bottom.value = ''
    })
   }
   ComfirmExchange()
   ClearMoney()
}
GetAPIData(APIURL)