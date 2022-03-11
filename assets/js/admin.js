const currentpage = 'admin'
function iLI(){
    return Cman.cooks().hasOwnProperty('teeId')
}

const PageSocket = TeeSioCliSocket
const shop = new TeeShopCli(true)

ReactDOM.render(
    <Admin/>,document.querySelector('#admin')
)