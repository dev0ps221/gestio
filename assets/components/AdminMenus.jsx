class AdminMenus extends React.Component{

    constructor(props){
        super(props)
        this.state = {...props}
        this.newMenuData = {
            nom:null,
            illu:null
        }
        window.adminMenus = this
    }

    renderMenus(){
        this.state.menus = adminPage.state.menus
        return <ul className="admin-menulist">
            {(()=>{return (this.state.menus ? this.state.menus : []).map(
                (m,k)=>{return this.renderMenu(m,k)}
            )})()}
        </ul>
    }

    onNewMenu(e){
        const {nom,illu} = this.newMenuData
        if(nom,illu){
            shop.sio.post(
                'add_categorie',{nom,illu}
            )

        }
    }

    onNewMenuDataChange(e){
        console.log('new menu data change')
        if(e.target.type=='file'){
            if(e.target.files.length){
                const illu = e.target.files[0]
                const reader = new FileReader()
                reader.addEventListener(
                    'load',()=>{
                        this.newMenuData.illu = reader.result.split(',')[1]
                    }
                )
                reader.readAsDataURL(illu)
            }
        }
        if(e.target.id && e.target.id == 'nom'){
            this.newMenuData.nom = e.target.value
        }
    }

    renderNewMenu(){
        return <NewMenu onNewMenu={(e)=>this.onNewMenu(e)} onChange={e=>this.onNewMenuDataChange(e)}>
            <h1>
                Ajouter Un Menu
            </h1>
        </NewMenu>
    }
    
    renderMenuArticle(article,key){
        const {nom,id,prix,illu,categorieid} = article
        return <Article key={key} prix={prix} illu={illu} catid={categorieid} nom={nom} id={id}/>
    }

    renderMenuArticles(menu){
        return (menu.articles&&menu.articles.length?menu.articles:[]).map(
            (a,k)=>this.renderMenuArticle(a,k)
        )
    }

    renderMenu(menu,key){
        return <li key={key} className="menu">
            {menu.nom ? menu.nom.toString() : Object.keys(menu)[0]}
            <ul>
                <li>
                    <NewArticleMenu id={menu.id} key={menu.id} catid={menu.id}>
                        <em>
                            nouveau 
                        </em>
                    </NewArticleMenu>
                </li>
                {this.renderMenuArticles(menu)}
            </ul>
        </li>
    }

    render(){

        return <React.Fragment>
            <h1>
                Menus
            </h1>
            {this.renderNewMenu()}
            {this.renderMenus()}
        </React.Fragment>

        
    }

}