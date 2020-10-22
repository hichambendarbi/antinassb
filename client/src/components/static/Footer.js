import React, { Fragment } from 'react'
import styled from 'styled-components'
import { ReactComponent as Linkedin} from '../imgs/linkedin.svg'
import { ReactComponent as Facebook} from '../imgs/facebook.svg'
import { ReactComponent as Instagram} from '../imgs/instagram.svg'
import { ReactComponent as Twiter} from '../imgs/twitter.svg'
import { ReactComponent as Youtube} from '../imgs/youtube.svg'
import {Link, useLocation } from 'react-router-dom'

const Footer = () => {
    let location = useLocation();
    return (
        <Fragment>
        {location.pathname==="/administration" || location.pathname===`/administration/verifyNewPoste` ||
        location.pathname===`/administration/msg` ? 
        <Fragment></Fragment> : 
        <Fragment> 
        <FooterContainer>
        <ContSocialNet>
            <DisplaySoc>
                <SocialIcon href="https://www.facebook.com/Antinassb-100325728526768"><Facebook fill="#e66e07c2" width="26px" height="26px"/></SocialIcon>
                <SocialIcon href="https://www.instagram.com/antinassb/?hl=fr"><Instagram fill="#e66e07c2" width="26px" height="26px"/></SocialIcon>
                <SocialIcon href="https://twitter.com/antinassb"><Twiter fill="#e66e07c2" width="26px" height="26px"/></SocialIcon>
                <SocialIcon><Linkedin fill="#e66e07c2" width="26px" height="26px"/></SocialIcon>
                <SocialIcon><Youtube fill="#e66e07c2" width="26px" height="26px"/></SocialIcon>
            </DisplaySoc>
            <TitleSoc>تابعونا على</TitleSoc>
        </ContSocialNet> 
        <ContLinks>
            
            <LinksFooter>
                <Links testColor test to="/من-نحن">
                    من نحن ؟</Links>
                <Links testColor test to="/تواصل-معنا">
                    تواصل معنا</Links>
                <Links testColor test to="/طلب-إعلان">
                    للإعلاناتكم 
                </Links>
                <Links testColor test to="/">لائحة النصابين</Links>
            </LinksFooter>

            <LinksFoo>
                <Links to="/سياسة-الخصوصية">
                    سياسة الخصوصية</Links>
                <SpanBar>|</SpanBar>
                <Links to="شروط-الإستخدام">
                    شروط الإستخدام</Links>
            </LinksFoo>
        </ContLinks>
        <LinkCopy>
                <Links to="/Privacy-policy">2020 © antinassb جميع الحقوق محفوظة لموقع</Links>
        </LinkCopy> 
</FooterContainer>
                
                       
                  
</Fragment>
    }
        </Fragment>
    )
}
  
export default Footer
const SpanBar = styled.span`
margin: auto 5px auto 5px;
font-weight: 100;
color: orange;
@media(max-width: 500px) {
    margin: auto 25px auto 25px;
}
`

const FooterContainer = styled.div`
width: 100%;
bottom: 0;
background: rgba(0, 0, 0, 0.87);
margin-top: 200px;
position: relative;
padding: 10px 150px;
@media(max-width: 820px) {
    padding: 10px 10px;
}
`

const ContSocialNet = styled.div`
width: 100%;
display: flex;
justify-content: center;
align-items: center;
padding-bottom: 10px;
align-items: center;
border-bottom: 1px solid gray;
`

const ContLinks = styled.div`
margin-top: 50px;
width: 100%;
display: flex;
justify-content: space-between;
align-items: center;
padding-bottom: 10px;
@media(max-width: 500px) {
    flex-direction: column;
    margin-top: 25px;
}
`

const LinksFooter = styled.div`
display: flex;
justify-content: space-between;
align-items: center;
width: 50%;
@media(max-width: 500px) {
    width: 100%;
}
`

const LinksFoo = styled.div`
display: flex;
justify-content: center;
align-items: center;
@media(max-width: 500px) {
    margin-top: 35px;
}
`

const LinkCopy = styled.div`
display: flex;
justify-content: center;
align-items: center;
margin-top: 45px;
`

const Links = styled(Link)`
text-decoration: none;
font-size: ${props => props.test ? "14px" : "12px"};
color: ${props => props.testColor ? "#e0e0e0" : "#e0e0e085"}
`

const TitleSoc = styled.h4`
font-size: 18px;
color: #e6e4e4;
margin: 0 0px 0 10PX;
font-weight: 500;
width: fit-content;
background: #b75b0d;
padding: 5px 15px;
border-radius: 5px;
@media(max-width: 820px) {
    font-size: 15px;
}
`

const DisplaySoc = styled.div`
display: flex;
height: 30px;
align-items: center;
`

const SocialIcon = styled.a`
border-radius: 50%;
cursor: pointer;
margin: 0 15px 0 0PX;
`

