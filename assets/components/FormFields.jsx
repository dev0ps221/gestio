function fieldBox(elem){
    return <div className="champs">
        {elem}
    </div>
}
class InputField extends React.Component{
    constructor(props){
        super(props)
        this.state = {...props}
    }
    render(){
        const props = {...this.state,...this.props.onChange?{onChange:(e)=>{
            this.props.onChange(e)
            this.state.value = e.target.value
            this.setState(this.state)
        }}:{}}
        return fieldBox(React.createElement('input',props)) 
    }
}
class ButtonField extends React.Component{
    constructor(props){
        super(props)
        this.state = {...props}
    }
    render(){
        return fieldBox(React.createElement('button',this.state,this.state.txt))
    }
}