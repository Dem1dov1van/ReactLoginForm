import React from 'react'
import '../logIn/style.css';

export default function Login() {

    const [succsessLogin, setSuccsessLogin] = React.useState(false)
    const [loading, setLoading] = React.useState(false)

    const [isAuth, setIsAuth] = React.useState(false)
    const [isName, setIsName] = React.useState({})

    const [name, setName] = React.useState('')
    const [pass, setPass] = React.useState('')

    const [isSubmit, setIsSubmit] = React.useState(false)
    
    const [isValidName, setValidName] = React.useState(false)
    const [isValidPass, setValidPass] = React.useState(false)

    const passLenght = 5

    React.useEffect(()=>{
        // localStorage.clear()
        const isLogin = JSON.parse(localStorage.getItem('login'))
        if(isLogin){
            setIsAuth(true)
            setIsName(isLogin["name"])
        }
    }, [])
    
    const createObj = () => {
            const userObj = {
                name,
                pass,
            }
            setLoading(false)
            setSuccsessLogin(true)
            localStorage.setItem('login', JSON.stringify(userObj))
        }

    const validationName = (value) => {
        if(/^[a-zA-Z]+$/.test(value) === true){
            setValidName(true)
        }else{
            setValidName(false)
        }
    }

    const validationPass = (value) => {
        if(value && value.length > passLenght){
            setValidPass(true)
        }else{
            setValidPass(false)
        }
    }

    const onClickSubmit = (event) =>{
        event.preventDefault()
        setIsSubmit(true)
        if((isValidPass) && (isValidName) && (name) && (pass)){
            setLoading(true)
            setTimeout(createObj, 5000)
        }
     }

    const onChangeLogin = (e) =>{
        setName(e.target.value)
        setIsSubmit(false)
        validationName(e.target.value)
    }

    const onChangePass = (e) =>{
        setPass(e.target.value)
        setIsSubmit(false)
        validationPass(e.target.value)
    }

    return (<>
        { succsessLogin || isAuth
            ? 
            <div className="auth auth_success">
                <h2>?????????? ????????????????????!</h2>
                <div className="form__card">
                    <p>???? ?????????????? ?????????? ?? ??????????????, { name || isName }</p>
                </div>
            </div> 
            :
            <div className="auth">
            <h2>???????? ?? ??????????????</h2>
            <form className="auth__form">
                <div className="form__card">
                    <div className="form__group">
                        <input 
                            id="login" 
                            type="text"
                            className={`form__control ${loading ? 'loading' : ''} 
                                ${ isSubmit && !isValidName ? 'error' : ''} 
                                ${ isSubmit && isValidName ? 'success' : ''}`
                            } 
                            placeholder="??????????"
                            value={name}
                            onChange={onChangeLogin} 
                        />
                        { isSubmit && !isValidName && name
                            ? <label htmlFor="login" className="form__label">?????????????????????? ???????????? ????????????????</label>
                            : ''
                        }
                        { isSubmit && isValidName
                            ? <label htmlFor="login" className="form__label">??????????!</label>
                            : ''
                        }
                        { isSubmit && !isValidName && !name
                            ? <label htmlFor="login" className="form__label">???????? ???? ?????????? ???????? ????????????</label>
                            : ''
                        }
                        
                    </div>
                    <div className="form__group">
                        <input 
                        id="password" 
                        type="password"
                        className={`form__control ${loading ? 'loading' : ''} 
                                ${ isSubmit && !isValidPass ? 'error' : ''} 
                                ${ isSubmit && isValidPass ? 'success' : ''}`
                            }  
                        placeholder="????????????"
                        value={pass}
                        onChange={onChangePass}
                        />
                        { isSubmit && !isValidPass && pass
                            ? <label htmlFor="login" className="form__label">{`???????????? ???????????? ???????? ???? ?????????? ${passLenght + 1} ????????????`}</label>
                            : ''
                        }
                        { isSubmit && isValidPass
                            ? <label htmlFor="login" className="form__label">??????????!</label>
                            : ''
                        }
                        { isSubmit && !isValidPass && !pass
                            ? <label htmlFor="login" className="form__label">???????? ???? ?????????? ???????? ????????????</label>
                            : ''
                        }
                    </div>
                </div>
                { !loading 
                    ? <input onClick={onClickSubmit}  className="btn" type="submit" value='??????????'/> 
                    : <button className="btn" type="button" >
                        <div className="lds-ring"><div></div><div></div><div></div><div></div></div>
                      </button>
                }
                
            </form>
        </div>
        }
        
        </>
    )
}



