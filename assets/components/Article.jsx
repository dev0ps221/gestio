class Article extends React.Component{
    constructor (props){
        super(props)
        this.state = props.article
    }

    render(){
        return <li className="article-menu">
            article
            <ul className='infos-article-menu'>
                <li>
                    {this.state.content}                    
                </li>
            </ul>
        </li>
    }
    
}
