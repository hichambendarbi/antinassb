import React, { useState} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import styled from 'styled-components';
import { addNewConflict } from '../../../controlers/conflict';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { setAlert } from '../../../controlers/alert'
import Recaptcha from 'react-recaptcha'
 
const NewConflict = ({auth, addNewConflict, setAlert, history, props, text}) => {
  const [isVerify, setRecaptcha] = useState(false)
  const [isError, setError] = useState(false)
  const [formData, setFormData] = useState({
    textConflict: "", 
    linkPost: "",
    phone: "",
    status: "ليس بعد"
})

const {
    textConflict, 
    linkPost,
    phone
} = formData

const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };  
  
  const handleClose = () => { 
    setOpen(false);
  };

  const recaptchaLoaded = () => {
    console.log("recaptcha loaded"); 
    }

  const onSubmit = e => {
    e.preventDefault()
    
       if(isVerify) {
          addNewConflict(formData);
          setFormData({
            textConflict: "", 
            linkPost: "",
            phone: ""
          })
          handleClose();
        } else {
          setError(true)
        }  
} 
    const verifyCallback = (response) => {
        if(response) {
           setRecaptcha(true)
           setError(false)
        }
       }

  return (
    <div dir="rtl">
      {/* <Button variant="outlined" color="primary" onClick={e=> {
        if(!auth.isAuthenticated) {
          history.push('/login')
        } else 
        handleClickOpen();
      }} id="btnpost">
      التبليغ عن نصاب 
      </Button> */}
      <Button variant="outlined" color="primary" onClick={e=> {handleClickOpen()}} id="btn_conflict">
         {text}
      </Button>
      <form>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" dir="rtl">
        <DialogTitle id="form-dialog-title">طلب مسح بلاغ كاذب أو خاطئ</DialogTitle>
        <DialogContent>
          <TextField required margin="dense" id="name" label="رابط البلاغ" type="text" fullWidthdir="rtl" name="linkPost" value={linkPost} onChange={e=> onChange(e)}/>  
          <TextField required margin="dense" id="name" label="هاتفك" type="text" fullWidthdir="rtl" name="phone" value={phone} onChange={e=> onChange(e)}/> 
          <Areatext  required  placeholder="نص الطلب" type="text" fullWidthdir="rtl" name="textConflict" value={textConflict} onChange={e=> onChange(e)} />    
              
          <Privacy > 
                <Recaptcha  
                    sitekey="6Lcb1scUAAAAANyHPiWdVgvmAjm3Ac7anEfOT1xz"
                    render="explicit"
                    onloadCallback={e=> recaptchaLoaded()}
                    verifyCallback={verifyCallback}
                    />
          </Privacy> 
          {isError && <ErrorRec> المرجو تفعيل CAPTCHA </ErrorRec>}
          <Privacy>
    <ParTerms>سيتم التواصل معكم من طرف فريق الدعم من أجل التأكد من دلائلكم <Link to='/سياسة-الخصوصية'>
      سياسة الخصوصية</Link></ParTerms>
          </Privacy>
        </DialogContent>
        <DialogActions dir="ltr" > 
          <Button onClick={handleClose} color="primary">
            إلغاء
          </Button>
          <Button type="submit" color="primary" onClick={e=> onSubmit(e)}>
           إرسال الطلب 
          </Button>
        </DialogActions>
      </Dialog>
      </form>
    </div>
  );
}

NewConflict.propTypes = {
  setAlert: PropTypes.func.isRequired,
  addNewConflict: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired 
}

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(mapStateToProps, {addNewConflict, setAlert}) (withRouter(NewConflict)) 



const ParTerms = styled.p`
font-size: 13px;
font-weight: 700;
`

const Areatext = styled.textarea`
width: 100%;
margin-top: 30px;
padding: 10px;
border-radius: 0;
`


const Privacy = styled.div`
padding: 0 0px;
margin: 10px 0px;
`

const ErrorRec = styled.div`
padding: 0 10px;
margin: 10px 0px;
color: red;
`

