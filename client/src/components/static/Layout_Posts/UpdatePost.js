import React, { Fragment, useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import styled from 'styled-components'
import moment from 'moment'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { visibility } from '../../../controlers/post'


const UpdatePost = ({visibility, post}) => {
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const deletePost = () => {
    visibility(post._id, {statusUser: "notVisible"})
  }

  return (
      <Fragment>
    {/* <form dir="rtl" onSubmit={e=> {

    }}> */}
      <BtnOpr variant="outlined" onClick={handleClickOpen} >
         مشاهدة التفاصيل   
      </BtnOpr>
      {post.status==="OFFLINE" ? 
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" dir="rtl">
                <DialogTitle id="form-dialog-title">هذا التبليغ غير متاح !</DialogTitle>
                <DialogContent>
                        <TitleDele>هناك ثلات احتمالات</TitleDele>
                        <ParaText>1- لم يتم الموافقة عليه بعد.</ParaText>
                        <ParaText>2- تم التوصل بشكاية من الطرف الآخر و تم الاستجابة إلى طلبه.</ParaText>
                        <ParaText>3- تم حذفه لعدم توافقه مع سياسة و خصوصية الموقع.</ParaText>
                </DialogContent>
                <DialogActions dir="ltr" >
                  <Button onClick={handleClose} color="primary" > 
                    عودة
                  </Button>
                </DialogActions>
           </Dialog>
    :
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" dir="rtl">
          <DialogTitle id="form-dialog-title" > {post.nameSpam} نصب عليك في مجال <span style={{color: "#e66e07"}}>{post.category}</span></DialogTitle>  
          <DialogContent>
                  <TitleDele>هل توصلت لاتفاق مع الطرف الآخر ؟</TitleDele>
                  <ParaText>{post.text}</ParaText>
                  <ParaText>للتواصل مع النصاب {post.telephone} </ParaText>
                  <ParaText>تم التبليغ بتاريخ { moment(post.date).format('YYYY-MM-DD HH:MM') } </ParaText>
                  <ParaText style={{color: "red"}}>سيتم مسح هذا المنشور نهائيا !</ParaText>
          </DialogContent>
          <DialogActions dir="ltr" >
            <Button onClick={handleClose} color="primary" > 
              إلغاء
            </Button>
            <Button color="primary" onClick={()=> {
            deletePost()
            handleClose()
          }}> 
              مسح نهائيا
            </Button>
          </DialogActions>
      </Dialog>  
    }
    {/* </form> */}
    </Fragment>
  );
}

UpdatePost.propTypes = {
  visibility: PropTypes.func.isRequired
}

export default connect(null, { visibility }) (UpdatePost)


const TitleDele = styled.h1`
font-size: 18px;
font-weight: 600;
@media(max-width: 400px) {
  font-size: 15px;
}
@media(max-width: 359px) {
  font-size: 13px;
}
`

const ParaText = styled.p`
font-size: 14px;
margin-top: 0;
`

const BtnOpr = styled.button`
background: none;
border: navajowhite;
margin: 0;
padding: 5px 0;
width: 100%;
display: flex;
cursor: pointer;
`