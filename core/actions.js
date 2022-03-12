const homedir = process.cwd()
const { writeFileSync } = require('fs')
const path = require('path')
const illuspath = path.join(homedir,'assets','illus')
function uploadIllu(illu,cb){
    const illuname = 'illu'.concat(new Date().getTime())
    const illusrc = path.join(illuspath,illuname)   
    const illupath = path.join('/illus/',illuname)
    writeFileSync(illusrc,Buffer.from(illu,'base64'))
    if(cb)cb(illupath)
}
module.exports = {
    uploadIlluArticle
}