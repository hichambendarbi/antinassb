import React, { Component, Fragment } from "react"
import axios from "axios"
import {Link, Redirect } from "react-router-dom"
import PropTypes from "prop-types"
import FloatingLabelInput from '../commons/FloatingLabelInput'
import {Retour,ContainerInputs,Button,FooterLogin,AuthContainer} from "../commons/Assets"
import { setAlert } from '../../controlers/alert'
import {connect} from 'react-redux'

class UpdatePasswordRec extends Component {
state = {
password: "",
confirmPassword: "",
submitted: false,
}
handleChange = key => e => {
this.setState({ [key]: e.target.value })
}
updatePassword = e => {
e.preventDefault()
const { userId, token } = this.props
const { password, confirmPassword } = this.state
if(password!==confirmPassword) {
setAlert('Les mot de passe doivent etre identiques', 'danger')
} else {
axios
.post(
`/api/passwordRecover/${userId}/${token}`,
{ password }
)
.then(res => console.log("RESPONSE FROM SERVER TO CLIENT:", res))
.catch(err => console.log("SERVER ERROR TO CLIENT:", err))
this.setState({ submitted: !this.state.submitted })
}

}
componentDidMount(){
var ball = document.getElementById('ball')
if(ball!==null){
ball.style.marginLeft = "20%";
}
}
render() {
const { submitted } = this.state

return (
// <RecoverPasswordStyles>

<div className="global_login" id="loginboxx">
<div className="loginBox">


<form onSubmit={this.updatePassword}>
<AuthContainer style={{paddingTop:"20px"}}>
<Retour to="/">تغيير كلمة المرور</Retour>
<ContainerInputs>
{submitted ? <Redirect to='/login'/>
: <Fragment>
<FloatingLabelInput type="password" placeholder="كلمة السر الجديدة" name="password" value={this.state.password} onChange={this.handleChange("password")}/>
<FloatingLabelInput type="password" placeholder="تأكيد كلمة السر" name="confirmPassword" value={this.state.confirmPassword} onChange={this.handleChange("confirmPassword")}/>
</Fragment>}
<Button type="submit">إرسال</Button>
<FooterLogin>
<span>تصبح هذه الصفحة غير صالحة بعد ساعة</span>
<Link to="/login" style={{color: "#FFF", textDecoration: "none"}}>تسجيل الدخول</Link>
</FooterLogin>
</ContainerInputs>
</AuthContainer>
</form>

</div>
</div>


)
}
}
UpdatePasswordRec.propTypes = {
token: PropTypes.string.isRequired,
userId: PropTypes.string.isRequired,
setAlert: PropTypes.func.isRequired

}
export default connect(null,{setAlert}) (UpdatePasswordRec)