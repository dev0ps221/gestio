class AdminFeed extends React.Component{


    constructor(props){
        super(props)
        this.state = {...props}
        window.Feed = this
    }

    renderFeedBox(box,key){
        let props = {key,id:box.props.id,className:'feed-box'}        
        
        return React.createElement(
           'li',props,box 
        )
    }


    render(){
        const children = this.props.children ? this.props.children : ["RIEN À AFFICHER"]
        return <ul id='adminfeed' className="feed">
            {(typeof children.map) == 'function' ? children.map((b,k)=>{return this.renderFeedBox(b,k)}) : this.renderFeedBox(children,0)}
        </ul>
    }


}