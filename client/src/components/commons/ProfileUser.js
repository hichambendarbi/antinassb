import React, { Fragment } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import styled from 'styled-components';
import { ReactComponent as User} from '../imgs/user.svg';
import {getProfileById} from '../../controlers/profile';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import moment from 'moment';
import { ReactComponent as Linkedin} from '../imgs/linkedin.svg';
import { ReactComponent as Facebook} from '../imgs/facebook.svg';
import { ReactComponent as Instagram} from '../imgs/instagram.svg';
import { ReactComponent as Twiter} from '../imgs/twitter.svg';
import { ReactComponent as Youtube} from '../imgs/youtube.svg';

const ProfileUser = ({id_user, getProfileById, nm, profile: {loading, profile}}) => {

    const [open, setOpen] = React.useState(false); 
    const handleClickOpen = () => {
        setOpen(true);
        getProfileById(id_user)
        console.log(id_user)
      };  
      
      const handleClose = () => { 
        setOpen(false);
      };
  return (
    <div dir="rtl">
      <Button variant="outlined" color="primary" onClick={()=> {handleClickOpen()}} id="btn_conflict">
          صاحب التبليغ  
      </Button>
      <form>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" dir="rtl">
          {profile!==null ? <Fragment>
                <HeaderProfile>
                   {profile.image ? <ImgUser src={profile.image} alt="imgage user"/> : 
                    <User width="50" height="50"/>
                   }
                   <DivHee>
                    <DivHe>
                    <SpanProName><span>{nm}</span></SpanProName> 
                    <SpanAct>{ profile.activity}</SpanAct>
                    </DivHe>
                    <SpanAct>{ profile.location} <span>{profile.age} سنة</span></SpanAct>
                  </DivHee>
                </HeaderProfile> 
                <DialogContent>
                    <ContainerContact>
                      <InfosContact> <span>الإيميل  </span><span style={{color: "gray"}}>{profile.email}</span></InfosContact>
                      <InfosContact> <span>الهاتف  </span><span style={{color: "gray"}}>{profile.phone}</span></InfosContact>
                    </ContainerContact>
                  
                    <ContainerContact>
                      <InfosBio> <span>السيرة الذاتية : </span><span style={{color: "gray",  fontWeight: "100"}}>{profile.bio}</span> </InfosBio>
                    </ContainerContact>
                    {profile && profile.social ? 
                                            <DivSocial>
                                            { profile.social.twitter && <IconsSocial href={profile.social.twitter} ><Twiter fill="#e66e07c2"  width="30px" height="30px" /></IconsSocial>}
                                            { profile.social.instagram && <IconsSocial href={profile.social.instagram}><Instagram fill="#e66e07c2" width="30px" height="30px" /></IconsSocial>}
                                            { profile.social.youtube && <IconsSocial href={profile.social.youtube}><Youtube fill="#e66e07c2" width="30px" height="30px" /></IconsSocial>}
                                            { profile.social.linkdin && <IconsSocial href={profile.social.linkdin}><Linkedin fill="#e66e07c2" width="30px" height="30px" /></IconsSocial>}
                                            { profile.social.facebook &&<IconsSocial href={profile.social.facebook}><Facebook  fill="#e66e07c2"  width="30px" height="30px"/></IconsSocial>}
                                           </DivSocial> :
                          <DivSocial style={{color: "red", fontWeight: "700"}}> ! مواقع التواصل الإجتماعي غير مدرجة </DivSocial>
                         }
                   {profile.activitys.length===0 ? null : <label style={{marginTop: "10px"}}>الخدمات :</label>}
                    {profile.activitys!==0 && 
                    profile.activitys.map(act=> (
                        <Fragment>
                        <ContainerAct>
                          <DivT>
                            <TitleAct style={{color: "black", marginLeft: "5px"}}>{act.title}</TitleAct>
                           {act.current && <TitleAct2> يزاوله من { moment(act.from).format('YYYY-MM-DD') } إلى يومنا هذا </TitleAct2>}
                           {act.to && <TitleAct2> يزاوله من { moment(act.from).format('YYYY-MM-DD') }  إلى  { moment(act.to).format('YYYY-MM-DD') } </TitleAct2>}
                          </DivT>
                          <div>
                                <div class="n-ppost">+</div>
                                <div class="n-ppost-name">{act.description}</div>
                          </div>

                        </ContainerAct>
                        </Fragment>
                    ))
                    }

                </DialogContent>
             </Fragment> :
        <DialogContent>صاحب التبليغ لم ينشأ ملفه الشخصي.</DialogContent>
        }

        <DialogActions dir="ltr" > 
          <Button onClick={handleClose} color="primary">
             عودة 
          </Button>
        </DialogActions>
      </Dialog>
      </form>
    </div>
  );
}

ProfileUser.propTypes = {
    getProfileById: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    profile: state.profile
})

export default connect(mapStateToProps, {getProfileById}) (ProfileUser)

const HeaderProfile = styled.div`
width: 100%;
background: #00afaa;
border-bottom: 2px solid #b1aca8;
padding: 8px 24px;
display: flex;
`

const ImgUser = styled.img`
width: 90px;
height: 90px;
border-radius: 50%;
border: 3px solid #FFF;
`

const SpanProName = styled.span`
margin-right: 10px;
margin-top: 5px;
font-size: 22px;
font-weight: 700;
color: #FFF;
@media(max-width: 500px) {
  font-size: 12px;
}
`

const SpanAct = styled.span`
margin-right: 10px;
margin-top: 5px;
font-size: 16px;
font-weight: 100;
color: #FFF;
`

const DivHe = styled.div`
flex-direction: column;
display: flex;
`

const DivHee = styled.div`
width: 100%;
display: flex;
justify-content: space-between;
align-items: center;
`

const ContainerContact = styled.div`
width: 100%;
display: flex;
@media(max-width: 500px) {
  font-size: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
}
`

const InfosContact = styled.div`
width: 45%;
@media(max-width: 500px) {
  width: 50%;
  display: contents;
}
`

const InfosBio = styled.label`
width: 100%;
margin-top: 10px;
`

const ContainerAct = styled.div`
width: 100%;
display: flex;
background: gray;
border: 1px solid;
background: gray;
border: 1px solid #d0b49d;
padding: 1px 5px;
background: #8080801f;
margin-top: 5px;
padding: 2px 5px;
justify-content: space-between;
align-items: center;
`

const TitleAct = styled.label`
color: black;
margin-left: 5px;
font-size: 14px;
@media(max-width: 500px) {
font-size: 14px;
}
`

const TitleAct2 = styled.label`
color: gray;
margin-left: 5px;
font-size: 14px;
@media(max-width: 500px) {
font-size: 10px;
}
`

const DivT = styled.div`
display: flex;
flex-direction: column;
`
const DivSocial = styled.div`
padding: 10px 0;
display: flex;
align-items: center;
justify-content: flex-start;
@media(max-width: 700px) {
    padding: 0 0 15px 0;
}
`

const IconsSocial = styled.a`

// border-radius: 50%;
// cursor: pointer;
margin: 0 0px 0 10PX;
border-radius: 50%;
display: flex;
align-items: center;
justify-content: center;
transition: .3s;
`


