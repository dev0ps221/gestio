var currentpage = 'admin'
function iLI(){
    return Cman.cooks().hasOwnProperty('teeId')
}
const shop = new TeeShopCli(true)
ReactDOM.render(
    <Admin/>,document.querySelector('#admin')
)