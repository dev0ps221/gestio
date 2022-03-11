function fieldBox(elem){
    return <div className="champs">
        {elem}
    </div>
}
class InputField extends React.Component{
    constructor(props){
        super(props)
        this.state = {...props}
      }
    render(){
        return fieldBox(React.createElement('input',this.state)) 
    }
}
class ButtonField extends React.Component{
    constructor(props){
        super(props)
        this.state = {...props}
    }
    render(){
        return fieldBox(React.createElement('button',this.state,this.state.txt))
    }
}
class Login extends React.Component{
    constructor(props){
        super(props)
        this.state = {...props}
        if(iLI())document.location.href='/admin'
    }
    doLogin(e){
        const username = document.querySelector('#username').value
        const password = document.querySelector('#password').value
        e.preventDefault()
        PageSocket.post('logad',{username,password},teeId=>{
            if(teeId){
                Cman.setCookie('teeId',teeId)
                if(history.length) history.back()
                else{
                    document.location.reload()
                }
            }
        })
    }
    render(){
        return <form onSubmit={this.doLogin}>
            <InputField type="text" id="username" key="username" placeholder="username"/>
            <InputField type="password" id="password" key="password" placeholder="password"/>
            <ButtonField txt={"Se Connecter"} key='dologin' id='dologin'/>
        </form>
    }
}