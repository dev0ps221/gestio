class NewArticleMenu extends React.Component{

    constructor(props){
        super(props)
        this.newArticleMenuData = {
            catid:props.catid
            ,nom:null
            ,prix:null
            ,illu:null
        }

    }



    onNewArticleMenu(e){
        const {catid,nom,prix,illu} = this.newArticleMenuData
        if(nom,illu,prix,catid){
            shop.sio.post(
                'add_article',{nom,illu,catid,prix}
            )
        }else{
            alert('champs manquants')
            console.log(this.newArticleMenuData)
        }
    }

    onChange(e){
        console.log('new article menu data change')
        if(e.target.type=='file'){
            if(e.target.files.length){
                const illu = e.target.files[0]
                const reader = new FileReader()
                reader.addEventListener(
                    'load',()=>{
                        this.newArticleMenuData.illu = reader.result.split(',')[1]
                    }
                )
                reader.readAsDataURL(illu)
            }
        }
        if(e.target.id && e.target.id == 'nom'){
            this.newArticleMenuData.nom = e.target.value
        }
        if(e.target.id && e.target.id == 'prix'){
            this.newArticleMenuData.prix = e.target.value
        }
        this.newArticleMenuData.catid = this.props.catid
    }

    render(){

        return <React.Fragment>
            {this.props.children}
            <InputField type='text' placeholder='nom' id='nom' onChange={e=>this.onChange(e)} key='nom'/>
            <InputField type='number' placeholder='prix' id='prix' onChange={e=>this.onChange(e)} key='prix'/>
            <InputField type='file' placeholder='illu' id='illu' onChange={e=>this.onChange(e)} key='illu'/>
            <ButtonField txt='+' onClick={e=>this.onNewArticleMenu(e)}/>
        </React.Fragment>

    }

}