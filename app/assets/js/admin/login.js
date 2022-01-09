let loginData = {}
const usernamebox = document.querySelector(
  '#username'
)
const passwordbox = document.querySelector(
  '#password'
)
const dologin = document.querySelector(
  '#dologin'
)
function updateLoginData(){
  loginData = {
    username : usernamebox.value,
    password : passwordbox.value
  }
}
function listenLoginDataChanges(){
  let fields = [usernamebox,passwordbox]
  fields.forEach(
    elem=>{
      elem.addEventListener(
        'keyup',updateLoginData
      )
    }
  )
}
function letsLogin(u,p){
  post(
    '/login',{username:u,password:p}
  )
}
dologin.addEventListener(
  'click',e=>{
    const {
      username,password
    } = loginData
    const proposable = ((username && username.trim()!="") && (password &&  password.trim()!=""))
    if(proposable){
      letsLogin(username,password)
    }else{
      alert('veuillez remplir tous les champs')
    }
    e.preventDefault()
  }
)
get(
  '/loginRes',(e,r)=>{
    if(e)alert(e)
    else{
      document.cookie = 'connected='+r[0].id
      document.location.pathname='/admin'
    }
  }
)
updateLoginData()
listenLoginDataChanges()
if(isConnected()){
  document.location.href='/admin'
}
