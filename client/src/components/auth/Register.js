import React, {useState} from 'react'
import FloatingLabelInput from '../commons/FloatingLabelInput'
import {Retour,AuthNavigation,Links,ContainerInputs,Button,FooterLogin,AuthContainer} from "../commons/Assets"
import Sendemail from '../forgotpassword/Sendemail'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { setAlert } from '../../controlers/alert'
import { register } from '../../controlers/auth'
import PropTypes from 'prop-types'

const Register = ({ setAlert, register, isAuthenticated }) => {
  
    const [formData, setFormData] = useState ({ 
        email :'',
        password:'',
        password2:'',
        name: ''
    });

    const {
      email,
      password,
      password2,
      name
      } = formData;

      const onChangeAdd = e => setFormData({...formData, [e.target.name]:e.target.value})

      const onSubmit = async e => {
          e.preventDefault();
          if(password!== password2) {
              setAlert('كلمة المرور غير مطابقة', 'danger')
          } else {
            register({name, email, password})
          }
      }

        // Redirect if logged in 
        if(isAuthenticated) {
        return <Redirect to='/'/>
    }

      
    return (
     <AuthContainer style={{minHeight: "700px"}}>
         <Retour to="/">
        <h1 style={{fontSize:"20px"}}>
             حساب جديد
        </h1>
        </Retour>
         <AuthNavigation>
             <Links className="test" to="/تسجيل-الدخول">
                 <h2 style={{fontSize:"14px", margin: "0"}}>تسجيل الدخول</h2>
             </Links>
             <Links className="test" to="/حساب-جديد" style={{color: "#f5770b"}}>
                 <h2 style={{fontSize:"14px", margin: "0"}}>حساب جديد</h2>
             </Links>
         </AuthNavigation>
         <ContainerInputs>
             <form>
               <FloatingLabelInput placeholder="الإسم الكامل" name="name" value={name}  onChange={e => onChangeAdd(e)}/>
               <FloatingLabelInput placeholder="البريد الإلكتروني" name="email" value={email}  onChange={e => onChangeAdd(e)}/>
               <FloatingLabelInput placeholder="كلمة السر" name="password" value={password}  onChange={e => onChangeAdd(e)}/>
               <FloatingLabelInput placeholder="كلمة السر" name="password2" value={password2}  onChange={e => onChangeAdd(e)}/>
               <Button onClick={e=> onSubmit(e)}>حساب جديد</Button>
             </form>
             <FooterLogin>
                 <Sendemail/>
             </FooterLogin>
         </ContainerInputs>
     </AuthContainer>
    )
}

Register.propTypes = {
    setAlert: PropTypes.func.isRequired,
    register: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
})

export default connect(
    mapStateToProps
    ,{ setAlert, register })(Register)

