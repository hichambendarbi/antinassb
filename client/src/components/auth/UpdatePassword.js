import React, { Fragment } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import styled from 'styled-components'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import { updatePassword } from '../../controlers/auth';
import { setAlert } from  '../../controlers/alert'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  margin: {
    margin: theme.spacing(1),
  },
  withoutLabel: {
    marginTop: theme.spacing(3),
  },
  textField: {
    width: '25ch',
  },
}));



const UpdatePassword = ({updatePassword, setAlert}) => {
    const classes = useStyles();
    const [values, setValues] = React.useState({
      amount: '',
      password: '',
      weight: '',
      weightRange: '',
      showPassword: false
    });
  
    const handleChange = (prop) => (event) => {
      // setValues({ ...values, [prop]: event.target.value });
      setValues({ ...values, [prop]: event.target.value });
    };
  


  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClosee = () => {
      setOpen(false);
    
  };

  const handleClose = () => {

    if(values.password.length<=6) {
      setAlert('يجب أن يتعدى عدد أحرف كلمة المرور 6 .', 'danger')
    }

    if(values.password.length>6)
    {
      updatePassword({password: values.password})
      setOpen(false);
    }

  };


  return (
      <Fragment>
    {/* <form dir="rtl" onSubmit={e=> {

    }}> */}
      <BtnOpr variant="outlined" onClick={handleClickOpen} >
         تغيير كلمة المرور   
      </BtnOpr>
    

      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" dir="rtl">
          <DialogTitle id="form-dialog-title" >تغيير كلمة المرور</DialogTitle>  
          <DialogContent>
                  <ContainerPass>
                  <FormControl className={clsx(classes.margin, classes.textField)}>
                        <InputLabel htmlFor="standard-adornment-password">كلمة المرور</InputLabel>
                        <Input
                            id="standard-adornment-password"
                            type={values.showPassword ? 'text' : 'password'}
                            value={values.password}
                            onChange={handleChange('password')}
                        />
                     </FormControl>
                   
                     </ContainerPass>
          </DialogContent>
          <DialogActions dir="ltr" >
            <Button onClick={handleClosee} color="primary" > 
              إلغاء
            </Button>
            <Button color="primary" onClick={()=> {
            handleClose()
          }}> 
              تأكيد
            </Button>
          </DialogActions>
      </Dialog>  
    </Fragment>
  );
}

UpdatePassword.propTypes = {
  updatePassword: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired
}

export default connect(null, {updatePassword, setAlert}) (UpdatePassword)

const ContainerPass = styled.div`
display: flex;
align-items: center;
@media(max-width: 500px) {
    flex-direction: column;
    width: 100%;
}
`


const BtnOpr = styled.button`
background: none;
border: navajowhite;
margin: 0;
padding: 5px 0;
width: 100%;
display: flex;
justify-content: center;
cursor: pointer;
`