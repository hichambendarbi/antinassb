import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { ReactComponent as Linkedin} from '../../imgs/linkedin.svg'
import { ReactComponent as Facebook} from '../../imgs/facebook.svg'
import { ReactComponent as Instagram} from '../../imgs/instagram.svg'
import { ReactComponent as Twiter} from '../../imgs/twitter.svg'
import { ReactComponent as Youtube} from '../../imgs/youtube.svg'
import { deleteAccount } from '../../../controlers/profile'
import UpdatePassword from '../../auth/UpdatePassword'

const InfosPerso = ({profile: {profile}, deleteAccount}) => {
    
    return (
        <DivAll>
        <ContainerInfo>
            <SectionInf> 
                <TitleSection>المعلومات الشخصية</TitleSection> 
                <FieldInf>
                    <DivName>
                        <SpanI>الإسم الكامل : </SpanI> 
                        <SpanIn>{profile.user.name}</SpanIn>
                    </DivName>
                    <DivName>
                        <SpanI>السن : </SpanI>
                        <SpanIn>{profile.age}</SpanIn>
                    </DivName>
                    <DivName>
                        <SpanI>بلد الإقامة : </SpanI>
                        <SpanIn>{profile.location}</SpanIn>
                    </DivName>
                </FieldInf>
                <BtnsContainer>
                    <BtnChange>
                        <UpdatePassword/>
                    </BtnChange>
                    <BtnChange onClick={()=> deleteAccount()}>حذف الحساب</BtnChange>
                </BtnsContainer>
            </SectionInf>
            <SectionInf>
               <TitleSection>معلومات التواصل</TitleSection>
               <FieldInf>
                    <DivName>
                        <SpanI> رقم الواتساب : </SpanI>
                        <SpanIn>{profile.phone}</SpanIn>
                    </DivName>
                    <DivName>
                        <SpanI>البريد الإلكتروني : </SpanI>
                        <SpanIn>{profile.email}</SpanIn>
                    </DivName> 
                    <DivName>
                        <SpanI> الموقع الشخصي : </SpanI>
                        <SpanIn>{profile.social && profile.social.website ? profile.social.website  :  'لا تتوفر على موقع شخصي'}</SpanIn> 
                    </DivName>
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
               </FieldInf>
            </SectionInf>
        </ContainerInfo>
        </DivAll>
    )
}

InfosPerso.propTypes = {
    profile: PropTypes.object.isRequired,
    deleteAccount: PropTypes.func.isRequired
   }
   
   const mapStateToProps = state => ({
       profile: state.profile
   })
   
export default  connect(mapStateToProps, { deleteAccount }) (InfosPerso) 

const ContainerInfo = styled.div`
width: 100%;
min-height: 250px;
display: flex;
justify-content: space-between;
background: #e6e4e4;
padding: 6px;
box-shadow: 0 3px 4px 1px #343a4078;
@media(max-width: 700px) {
    flex-direction: column; 
    height: inherit;
}
`

const SectionInf = styled.div`
width: 48%;
height: 100%;
background: #f4f4f4;
justify-content: center;
display: flex;
flex-direction: column;
justify-content: flex-start;
align-items: center;
border: 3px solid #343a40;
border-radius: 3px;
@media(max-width: 700px) {
    width: 100%;
    margin-bottom: 20px;
}
`

const TitleSection = styled.div`
border-bottom: 1px solid #090a0b;
font-size: 20px;
color: #161819;
height: fit-content;
width: 100%;
padding-bottom: 8px;
padding-top: 8px;
text-align: center;
@media(max-width: 700px) {
    padding-bottom: 5px;
    padding-top: 5px;
}
`

const FieldInf = styled.div`
width: 100%;
display: flex;
margin-top: 15px;
justify-content: flex-end;
padding: 0 65px;
flex-direction: column;
justify-content: center;
align-items: initial;
@media(max-width: 1300px) {
    padding: 0 45px;
}

@media(max-width: 700px) {
    padding: 0 25px;
}

`

const DivName = styled.div`
padding: 10px 0;
display: flex;
align-items: center;
flex-direction: row-reverse;
@media(max-width: 700px) {
    padding: 0 0 15px 0;
}
`


const DivSocial = styled.div`
padding: 10px 0;
display: flex;
align-items: center;
flex-direction: row-reverse;
justify-content: space-between;
@media(max-width: 700px) {
    padding: 0 0 15px 0;
}
`

const SpanI = styled.span`
font-size: 20px;
color: #2b2e2e;
font-weight: 400;
margin-left: 20px;
display: list-item;
direction: rtl;
@media(max-width: 1300px) {
    font-size: 12px;
}
`
const SpanIn = styled.span`
font-size: 18px;
color: #2b2e2e;
font-weight: 300;
@media(max-width: 1300px) {
    font-size: 12px;
}
`

const BtnsContainer = styled.div`
width: 100%;
heigth: 40px;
margin-top: auto;
border-bottom-left-radius: 3px;
border-bottom-right-radius: 3px;
display: flex;
justify-content: space-evenly;
`

const BtnChange = styled.button`
width: 45%;
padding: 10px;
font-zise: 16px;
margin: 5px;
cursor: pointer;
transaction: 0.3s;
:hover {
    background: #343a402e;
}
@media(max-width: 700px) {
    padding: 5px;
}
`

const DivAll = styled.div`
width: inherit;
DISPLAY: flex;
FLEX-DIRECTION: column;
`



const IconsSocial = styled.a`
border-radius: 50%;
display: flex;
align-items: center;
justify-content: center;
transition: .3s;
`