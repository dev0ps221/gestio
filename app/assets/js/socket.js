let sock = io.connect('/')
const post = (target,data,cb=()=>{})=>{
  sock.emit(
    target,data
  )
  get(
    `${target}Res`,cb
  )
}
const get = (target,cb)=>{
  sock.on(
    target,cb
  )
}
