class TeeSplash{


    splashStyle = null
    splash = null
    styles = [
        ['position','absolute'],
        ['top','0'],
        ['z-index','1000'],
        ['left','0'],
        ['background','white'],
        ['width','100vw'],
        ['height','100vh'],
        ['display','flex'],
        ['flex-direction','column'],
        ['justify-content','center'],
        ['text-align','center']
    ]
    mStyles = [
    ]
    mlogoStyles = [
        ['width','30%'],
        ['height','15%'],
        ['margin-left','35%']
    ]
    logoStyles = [
        ['display','flex'],
        ['width','10%'],
        ['height','20%'],
        ['background','yellow'],
        ['border-radius','10em'],
        ['margin-left','45%']
    ]
    _wait_style  = "dots"
    _wait_interval = null
    _waiting_dots = 1
    _splash_type = 'logo' 


    configure(){
        if(this._splash_type === 'logo'){
            this.splashLogo = this.splashLogo && (typeof this.splashLogo != 'undefined') ? this.splashLogo : this.createSplashLogo()
            this.splashLogoStyle = this.splashLogoStyle ? this.splashLogoStyle : this.createSplashLogoStyle() 
        }
    }
    Splash(){
        this.assignSplashElemStyles()
        if(this._splash_type=='logo'){
            this.splash.appendChild(this.splashLogo)
            this.splash.appendChild(this.waitBox)
            document.body.appendChild(this.splash)
        }
        this.waiting()
    }
    
    UnSplash(){
        this.stop_waiting()
        document.body.removeChild(this.splash)

    }
    
    setStyleAttr(attr,val){
        this.styles.push(
            [attr,val]
        )
        this.assignSplashElemStyles()
    }

    setLogoStyleAttr(attr,val){
        this.styles.push(
            [attr,val]
        )
        this.assignSplashElemStyles()
    }

    assignSplashElemStyles(){
        this.configure()
        this.splashStyle.innerText = `.TeeSplash{`
        this.styles.forEach(
            style=>{
                this.splashStyle.innerText =`${this.splashStyle.innerText}${style[0]}:${style[1]};\n\t`
            }
        )
        this.splashStyle.innerText += `}`
        if(this._splash_type=='logo'){
            this.assignSplashLogoStyles()
        }
        this.assignSplashElemMStyles()
        this.splash.insertBefore(this.splashStyle,this.splash.firstChild)
    }

    assignSplashElemMStyles(){
        this.configure()
        this.splashStyle.innerText += `@media screen and (max-width:997px){\n`
        this.splashStyle.innerText += `\n\t.TeeSplash{\n`
        this.mStyles.forEach(
            style=>{
                this.splashStyle.innerText +=`${style[0]}:${style[1]};\n\t\t`
            }
        )
        this.splashStyle.innerText += `\n\t}`
        if(this._splash_type=='logo'){
            this.assignSplashLogoMStyles()
        }
        this.splashStyle.innerText += `\n}`
        this.splash.insertBefore(this.splashStyle,this.splash.firstChild)
    }

    assignSplashLogoStyles(){
        this.configure()
        this.splashLogoStyle.innerText += `.TeeSplashLogo{`
        this.logoStyles.forEach(
            style=>{
                this.splashLogoStyle.innerText =`${this.splashLogoStyle.innerText}${style[0]}:${style[1]};\n\t`
            }
        )
        this.splashLogoStyle.innerText += `}`
        this.splashLogo.src = this.splashLogoSrc
        this.splash.insertBefore(this.splashLogoStyle,this.splash.firstChild)
    }

    assignSplashLogoMStyles(){
        this.configure()

        this.splashLogoStyle.innerText += `@media screen and (max-width:997px){\n`
        this.splashLogoStyle.innerText += `\n\t.TeeSplashLogo{`
        this.mlogoStyles.forEach(
            style=>{
                this.splashLogoStyle.innerText +=`${style[0]}:${style[1]};\n\t`
            }
        )
        this.splashLogoStyle.innerText += `\n\t}`
        this.splashLogo.src = this.splashLogoSrc
        this.splash.insertBefore(this.splashLogoStyle,this.splash.firstChild)
    }

    createSplashElemStyle(){
        this.splashStyle = document.createElement('style')
        this.assignSplashElemStyles()
        return this.splashStyle
    }

    createWaitBox(){
        this.waitBox = document.createElement('span')
        this.waitBox.classList.add('TeeSplashWaiter')
        this.waitBox.style.display='flex'
        this.waitBox.style.justifyContent='center'
        this.waitBox.style.flexDirection='row'
        this.waitBox.style.height='5vh'
        this.waitBox.style.fontSize='10em'
        this.waitBox.style.margin='0'  
        this.waitBox.style.padding='0'    
        this.waitBox.style.color='gray'
    }

    createSplashLogoStyle(){
        this.splashLogoStyle = document.createElement('style')
        this.assignSplashLogoStyles()
        return this.splashLogoStyle
    }

    createSplashElem(){
        this.splash = document.createElement('section')
        this.splash.classList.add('TeeSplash')
        this.createSplashElemStyle()
        this.createWaitBox()
        return this.splash
    }

    createSplashLogo(){
        this.splashLogoSrc = ''
        this.splashLogo = document.createElement('img')
        this.splashLogo.classList.add('TeeSplashLogo')
        this.createSplashLogoStyle()
        return this.splashLogo
    }

    addSplashLogo(src){
        this.splashLogoSrc = src
    }

    waitingDots(){
        this.waitBox.innerText = ''
        if(this._waiting_dots > 3) this._waiting_dots = 0
        for(let i=0;i<this._waiting_dots;i++){
            this.waitBox.innerText+= `.`
        }
        this._waiting_dots++
    }

    waiting(){
        if(this._wait_style == 'dots'){
            this._wait_interval = setInterval(
                ()=>{
                    this.waitingDots()
                },500
            )
        }
    }
    stop_waiting(){
        clearInterval(
            this._wait_interval
        )
    }


    constructor(){
        this.createSplashElem()
    }



}