class Menu extends React.Component{
    constructor (props){
        super(props)
        this.state = props.menu
    }

    renderArticle(article,key){
        const {nom,id,prix,illu,categorieid} = article
        return <Article key={key} prix={prix} illu={illu} catid={categorieid} nom={nom} id={id}/>
    }

    render(){
        return <li className="menu">
            <h1>
                {this.state.nom?this.state.nom.toUpperCase():''}
            </h1>
            <ul className='articles-menu'>
                {
                    (this.state.articles.length) ? this.state.articles.map(
                        this.renderArticle
                    ) : ""
                }
            </ul>
        </li>
    }
}
