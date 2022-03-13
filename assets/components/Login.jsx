class Login extends React.Component{
    constructor(props){
        super(props)
        this.state = {...props}
        if(iLI())document.location.href='/admin'
        this.listenShop()
    }
    doLogin(e){
        const username = document.querySelector('#username').value
        const password = document.querySelector('#password').value
        e.preventDefault()
        shop.sio.post('logad',{username,password},teeId=>{
            if(teeId){
                Cman.setCookie('teeId',teeId)
                if(history.length) history.back()
                else{
                    document.location.reload()
                }
            }
        })
    }
    listenShop(){
        shop.whenReady(
            ()=>{
                Splash.UnSplash()
            }
        )
    }
    render(){
        return <form onSubmit={this.doLogin}>
            <InputField type="text" id="username" key="username" placeholder="username"/>
            <InputField type="password" id="password" key="password" placeholder="password"/>
            <ButtonField txt={"SE CONNECTER"} key='dologin' id='dologin'/>
        </form>
    }
}