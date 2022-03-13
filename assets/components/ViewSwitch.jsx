class ViewSwitch extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            view:props.view
        }
    }
 
    renderView(view,key){
        if(view.key==this.state.view) return view
        else return ""
    }

    render(){
        console.log(this.props.children)
        return <React.Fragment>
            <ul id={this.props.children.key}>
                {this.props.children}
            </ul>
        </React.Fragment>
    }
}