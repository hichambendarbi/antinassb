import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import axios from 'axios'
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function Sendemail() {
  const [open, setOpen] = React.useState(false);
  const [emailForm, setEmailData] = useState({
    email: '',
    submited: false
    })
    
    const {email, submited} = emailForm
    
    // Affect value to input email
    const onChange = e => setEmailData({
    email: e.target.value
    })
    
    // Send email with axios
    const sendEmailToGmail = e => {
    e.preventDefault();
    axios.post(`/api/passwordRecover/${email}`)
    console.log(email)
    setEmailData({
    email: '',
    submited: true
    })
    }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div dir="rtl">
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
      هل نسيت كلمة السر ؟  
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" dir="rtl">
        <DialogTitle id="form-dialog-title">استرجاع كلمة المرور</DialogTitle>
        <form onSubmit={e=> sendEmailToGmail(e)}>
        <DialogContent>
          <DialogContentText>
          قم بإدخال بريدك الإلكتروني
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="البريد الإلكتروني"
            type="email" 
            fullWidth
            dir="rtl"
            name="email" value={email} onChange={e=> onChange(e)}
          />
        </DialogContent>
        <DialogActions dir="ltr" >
          <Button onClick={handleClose} color="primary">
          إلغاء
          </Button>
          <Button type="submit" onClick={handleClose} color="primary">
          إرسال
          </Button>
        </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}

