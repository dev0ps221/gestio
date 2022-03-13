class NewMenu extends React.Component{


    render(){
        return <section>
            <div>
                {this.props.children}
                <section>
                    <InputField type='text' id='nom' key='change' onChange={e=>this.props.onChange(e)}/>
                    <InputField type='file' id='illu' key='illu' onChange={e=>this.props.onChange(e)}/>
                    <ButtonField txt='AJOUTER' onClick={e=>this.props.onNewMenu(e)}/>
                </section>
            </div>
        </section>
    }
}