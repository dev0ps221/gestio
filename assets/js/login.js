
var currentpage = 'login'
const shop = new TeeShopCli()
function iLI(){
    return Cman.cooks().hasOwnProperty('teeId')
}
ReactDOM.render(
    <Login/>,document.querySelector('#login')
)