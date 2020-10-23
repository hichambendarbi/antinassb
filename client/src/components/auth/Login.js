import React, {useState} from 'react'
import FloatingLabelInput from '../commons/FloatingLabelInput'
import styled from 'styled-components'
import {Retour,AuthNavigation,Links,ContainerInputs,Button,FooterLogin,AuthContainer} from "../commons/Assets"
import Sendemail from '../forgotpassword/Sendemail'
import { login } from '../../controlers/auth'
import { Redirect } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

const Login = ({ login, isAuthenticated }) => {

    const [formData, setFormData] = useState ({ 
        email :'',
        password:''
    });
    const {
      email,
      password
      } = formData;
      const onChangeAdd = e => setFormData({...formData, [e.target.name]:e.target.value})

      const onSubmit = async e => {
          e.preventDefault();
          login(email, password)
      }

      
      if(isAuthenticated) {
          return <Redirect to='/'/>
      }

      
    return (
     <AuthContainer>
         <Retour to="/">
             <TitleAuth style={{fontSize:"20px"}}>
              {/* <Logo width='140px'/> */}
              تسجيل الدخول
             </TitleAuth>
         </Retour>
         <AuthNavigation>
             <Links className="test" to="/تسجيل-الدخول" style={{color: "#f5770b"}} >
                 <h2 style={{fontSize:"14px", margin: "0"}}>تسجيل الدخول</h2>
             </Links>
             <Links className="test" to="/حساب-جديد" >
                 <h2 style={{fontSize:"14px", margin: "0"}}>حساب جديد</h2>
             </Links>
         </AuthNavigation>
         <ContainerInputs>
               <FloatingLabelInput placeholder="البريد الإلكتروني" name="email" value={email}  onChange={e => onChangeAdd(e)} />
               <FloatingLabelInput placeholder="كلمة السر" name="password" value={password}  onChange={e => onChangeAdd(e)} />
             <Button onClick={e=> onSubmit(e)}>تسجيل الدخول</Button>
             <FooterLogin>
                 <Sendemail/>
             </FooterLogin>
         </ContainerInputs>
     </AuthContainer>
    )
}

Login.propTypes = {
    login: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps , {login})(Login)

const TitleAuth = styled.h1`
font-size: 25px;
font-weight: 600;
`

