import React, { Fragment, useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import styled from 'styled-components'
import { connect } from 'react-redux'
import moment from 'moment'
import PropTypes from 'prop-types'
import { updateActivity } from '../../../controlers/profile'


const UpdateService = ({activity, updateActivity}) => {

    const [formData, setFormData] = useState({
        title: activity && activity.title ? activity.title : '',
        from: activity && activity.from ? activity.from : '',
        to: activity && activity.to ? activity.to : '',
        current: activity && activity.current,
        description: activity && activity.description ? activity.description : ''
    })

    const [toDateDisabled, toggleDisabled] = useState(false);

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value})

    const {
        title,
        from,
        to,
        current,
        description
    } = formData

  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
      <Fragment>
    {/* <form dir="rtl" onSubmit={e=> {

    }}> */}
      <BtnOpr variant="outlined" onClick={handleClickOpen} >
          المزيد   
      </BtnOpr>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" dir="rtl">
        <DialogTitle id="form-dialog-title">يمكنك التعديل على النشاط</DialogTitle>
        <DialogContent>
            <TextField autoFocus margin="dense" id="name" label="النشاط" type="text" fullWidthdir="rtl" name="title" value={title} onChange={e=> onChange(e)} /> 
            <ContainerPick>
            <Now>من :</Now>
               <TextField autoFocus margin="dense" id="name" dateFormat="yyyy/MM/dd" type="date" fullWidthdir="rtl" name="from" value={moment(from).format('YYYY-MM-DD')} onChange={e=> onChange(e)}/> 
            </ContainerPick>
            <ContainerPick>
               <Now>إلى :</Now>
               <TextField autoFocus margin="dense" id="name" type="date" disabled={toDateDisabled ? 'disabled' : ''} fullWidthdir="rtl" name="to" value={moment(to).format('YYYY-MM-DD')} onChange={e=> onChange(e)}/> 
            </ContainerPick>
            <Areatext  placeholder="تكلم عن نشاطك" type="text" fullWidthdir="rtl" name="description" value={description} onChange={e=> onChange(e)} /> 
          <DivCurrent>
          <Pcurrent><InputImage type="checkbox" name="current" checked={current} value={current} onChange={e=> {
              setFormData({...formData, current: !current});
              toggleDisabled(!toDateDisabled);
          }}/>{' '}</Pcurrent> 
          <p>تحديد كنشاط حالي</p>
          </DivCurrent>
        </DialogContent>
        <DialogActions dir="ltr" >
          <Button onClick={handleClose} color="primary">
          إلغاء
          </Button>
          <Button type="submit" color="primary" onClick={e=> {
                    e.preventDefault()
                    updateActivity(formData, activity._id)
                    handleClose()
          }
          }>
          تعديل
          </Button>
        </DialogActions>
      </Dialog>
    {/* </form> */}
    </Fragment>
  );
}

UpdateService.propTypes = {
    updateActivity: PropTypes.func.isRequired
}

export default connect(null, {updateActivity}) (UpdateService)

const InputImage = styled.input`
margin-top: 2px;
`

const Areatext = styled.textarea`
width: 100%;
margin-top: 30px;
padding: 10px;
border-radius: 0;
`


const Pcurrent = styled.p`
width: 10%;
margin: 0;
padding-top: 5px;
`

const DivCurrent = styled.div`
width: 100%;
display: flex;
align-items: center;
`

const ContainerPick = styled.div`
width: 100%;
display: flex;
display: flex;
align-items: center;
`

const Now = styled.span`
color: #000;
width: 50px;
`

const BtnOpr = styled.button`
background: none;
border: navajowhite;
margin: 0;
width: 100%;
display: flex;
padding: 5px 0;
`