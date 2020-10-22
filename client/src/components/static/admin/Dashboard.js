import React, { useEffect, useState, Fragment } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { getCurrentProfile } from '../../../controlers/profile'
import { getUserPosts } from '../../../controlers/post'
import { Link } from 'react-router-dom'
import { ReactComponent as User} from '../../imgs/user.svg'
import Posts from './Posts'
import InfosPerso from './InfosPerso'
import Services from './Services'

const Dashboard = ({getCurrentProfile, getUserPosts, post: {userposts}, auth:{user}, profile: {loading, profile}}) => {
    // Navigation State
    const [post, displayPost] = useState(false)
    const [info, displayInfo] = useState(true)
    const [service, displayService] = useState(false)
    const onNavigation = (x) => {
        if(x==="post") {
            displayPost(!post)
            displayInfo(false)
            displayService(false)
        }
        if(x==="info") {
            displayPost(false)
            displayInfo(!info)
            displayService(false)
        }
        if(x==="service") {
            displayPost(false)
            displayInfo(false)
            displayService(!service)
        }
    }


    useEffect(()=> {
        getCurrentProfile()
        getUserPosts()
    }, [getCurrentProfile, getUserPosts])


    return<div style={{minHeight: "100vh"}}> { loading &&  profile === null ? <ContSpinner><ImgLoading src={require('../../imgs/cardgif.gif')} /></ContSpinner> :
     <Fragment>
        <ContainerDash>
          {/* Header Profile Account */}
          <HeaderDash>
              <Hprofile>
                  {profile!==null ? <EditBtn to='/edit-profile'> تعديل معلوماتي</EditBtn> : <EditBtn to="create-profile">إنشاء ملف شخصي</EditBtn>}
                  <BoxImgName> 
                     <NameBox> 
                         <NameH>{user && user.name}</NameH>
                         {profile!==null ? <Job>{profile.activity}</Job> : null}
                     </NameBox>
                     <ImageProfile> 
                         {/* {profile==null ? <User fill="#2b2e2e" style={{borderRadius: "50%", width: "fit-content"}}/> : 
                          <ImgUser src={profile.image} alt="image profile user"/>
                         } */}
                         {!profile || !profile.image ? <User fill="#2b2e2e" style={{borderRadius: "50%", width: "fit-content"}}/> :
                           <ImgUser src={profile.image} alt="image profile user"/>
                         }
                     </ImageProfile>
                  </BoxImgName>
              </Hprofile>
          </HeaderDash>
          <ContainerCards>
                  {post ? <LinksSetting style={{background: "none"}}>التبليغات</LinksSetting> : <LinksSetting onClick={()=> onNavigation("post")}>التبليغات</LinksSetting>}
                  {service ? <LinksSetting style={{background: "none"}}>الخدمات</LinksSetting> : <LinksSetting onClick={()=> onNavigation("service")}>الخدمات</LinksSetting>}
                  {info ? <LinksSetting style={{background: "none"}}>المعلومات الشخصية</LinksSetting> : <LinksSetting onClick={()=> onNavigation("info")}>المعلومات الشخصية</LinksSetting>}
                  {/* <LinksSetting >تغيير كلمة السر</LinksSetting> */}
          </ContainerCards>
          {profile!==null ? <SectionProfile>
            {info && <InfosPerso/>} 
            {post && <Posts myPosts={userposts}/>}
            {service && <Services activity={profile.activitys} />}
          </SectionProfile> : <SectionProfile>يمكنك الآن إنشاء ملفك الشخصي</SectionProfile>}
        </ContainerDash>
    </Fragment>
}
    </div>
}

Dashboard.propTypes = {
 getCurrentProfile: PropTypes.func.isRequired,
 auth: PropTypes.object.isRequired,
 profile: PropTypes.object.isRequired,
 getUserPosts: PropTypes.func.isRequired,
 post: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth,
    profile: state.profile,
    post: state.post
})

export default connect(mapStateToProps, { getCurrentProfile, getUserPosts }) (Dashboard)


const ContainerDash = styled.div`
width: auto;
margin: 10px 150px;
@media(max-width: 900px) {
    margin: 10px 10px;
}
@media(max-width: 620px) {
    padding-top: 70px;
   }
`

const ContSpinner = styled.div`
display: flex;
justify-content: center;
`

const ImgLoading = styled.img`
width: 80%;
`

const ImgUser = styled.img`
width: 100%;
height: 100%;
border-radius: 50%;
`

const HeaderDash = styled.div`
width: 100%;
margin: 0;
DISPLAY: flex;
align-items: center;
border-top: 2px solid #e0e0e0;
border-bottom: 2px solid #e0e0e0;
border-right: 5px solid #161819;
border-top-right-radius: 25px;
@media(max-width: 500px) {
    border-top: 2px solid #e0e0e0;
    border-bottom: 2px solid #e0e0e0;
}
`

const Hprofile = styled.div`
background: black:
width: 100px;
height: 90%;
display: flex;
align-items: center;
justify-content: space-between;
width: 100%;
padding: 10px 10px 10px;
` 

const ImageProfile = styled.div`
height: 140px;
border: 2px solid #2b2e2e;
width: 140px;
border-radius: 50%;
align-items: center;
display: flex;
justify-content: center;
padding: 5px;
@media(max-width: 500px) {
    height: 90px;
    width: 90px;
}
`

const EditBtn = styled(Link)`
border: 1px solid black;
padding: 5px 30px;
color: black;
background: none;
font-size: 14px;
border-radius: 2px;
cursor: pointer;
text-decoration: none;
@media(max-width: 500px) {
    padding: 3px 10px;
    font-size: 10px;
}
`

const BoxImgName = styled.div`
display: flex;
height: 100%;
align-items: center;
`

const NameBox = styled.div`
margin-right: 20px;
display: flex;
flex-direction: column;
align-items: flex-end;
@media(max-width: 500px) {
    margin-right: 5px;
}
`

const NameH = styled.h1`
color: #6b6a6a;
font-size: 20px;
@media(max-width: 500px) {
    font-size: 12px;
}
@media(max-width: 330px) {
    font-size: 10px;
}
`

const Job = styled.h2`
color: #6b6a6a;
font-size: 16px;
margin: 0;
@media(max-width: 500px) {
    font-size: 10px;
}

@media(max-width: 330px) {
    font-size: 8px;
}

`

const ContainerCards = styled.div`
width: 100%;
display: flex;
justify-content: space-between;
margin-top: 20px;
`

const LinksSetting = styled(Link)`
border: 2px solid black;
width: 30%;
padding: 10px 30px;
display: flex;
align-items: center;
justify-content: center;
border-radius: 3px;
color: #e66e07;
text-decoration: none;
font-size: 20px;
transition: .3s;
background: #2b2e2e;

:hover{
    color: orange;
    border: 2px solid orange;
}
@media(max-width: 600px) {
    width: 32%;
    padding: 5px 5px;
    font-size: 13px;
}
`

const SectionProfile = styled.div`
display: flex;
width: 100%;
justify-content: center;
margin-top: 20px;
`