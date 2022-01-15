



class User{


  constructor(db,id){
    this.db = db
    this.id = id
  }

}


class Users{


  getUser(id,username=null){
    this.db.getUser(username,(err,res)=>{
      console.log('errors on get user',err)
      console.log('responses on get user',res)
    },id)
  }

  logUser(username,password,cb){
    this.db.___login(username,password,cb)
  }

  initDeeBee(){
    console.log('initializing deebee')
    this.db._setUsersTable('users')
    this.db._setUsersLogField('username')
    this.db._setUsersPasswField('password')
    this.setDeeBeeActions()
  }

  setDeeBeeActions(){
    this.db._____registerAction(
      'getUsers',(cb=null)=>{
        let req = this.db.__selectFrom(this.db._getUsersTable(),['*'])
        console.log(req)
        this.db.query(
          this.req,cb
        )
      }
    )
    this.db._____registerAction(
      'getUser',(username,cb=null,id=null)=>{
        let req = this.db.__selectFrom(this.db._getUsersTable(),['*'],[],!id ? [[this.db._getUsersLogField()],[`'${username}'`]] : [['id'],[id]])
        console.log(req)
        this.db.query(
          this.req,cb
        )
      }
    )
  }



  constructor(db){
    this.db = db
    this.initDeeBee()
  }

}

module.exports = {
  User,Users
}
