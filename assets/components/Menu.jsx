class Menu extends React.Component{
    constructor (props){
        super(props)
        this.state = props.menu
    }

    renderArticle(article,key){
        return <Article article={article} key={key}/>
    }

    render(){
        return <li className="menu">
            MENU
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
