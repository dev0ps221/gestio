const dologin = document.querySelector('#dologin')
const password= document.querySelector("#password")

let loginData={
  username:'fashi0n'
  ,password:password.value
}

function updateLoginData(){

  loginData={
   username:'fashi0n',
   password:password.value
  }

}
password.addEventListener(
  'keyup',e=>{
    updateLoginData()
    if(e.shiftKey && e.key=='Enter'){
      dologin.click()
    }
  }
)
dologin.addEventListener(
  'click',e=>{
    e.preventDefault()
    if(loginData.username && loginData.password){
      post(
        '/login',loginData
      )
    }else{
      alert('Veuillez remplir tous les champs')
    }
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
