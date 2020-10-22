import React, { useState } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { addNewADV } from '../../controlers/advertising' 
import Recaptcha from 'react-recaptcha'

const Advertising = ({addNewADV}) => {
    const [isVerify, setRecaptcha] = useState(false)
    const [isError, setError] = useState(false)
    const [formData, setFormData] = useState({
        nameComp: '',
        emailComp: '',
        textAdver: '',
        phoneComp: '',
        cityComp: ''
    });

    const {  nameComp, emailComp, textAdver, phoneComp, cityComp} = formData;
    const onChange = e => setFormData({...formData, [e.target.name]:e.target.value});
  const recaptchaLoaded = () => {
  console.log("recaptcha loaded");
  }
    const onSubmit = async e => {
        e.preventDefault();
        if(isVerify) {
            addNewADV(formData);
            setFormData({
                nameComp: '',
                emailComp: '',
                textAdver: '',
                phoneComp: '',
                cityComp: ''
              })
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
        <ContainerGlob>
        {/* Ads and pub */} 
        <ContainerAds>
            <Newpost to='/'>التبليغ عن نصاب</Newpost>
           <ImgCorona alt="دلائل" src={require('../imgs/corona.PNG')}/>
        </ContainerAds>

        <ContainerPrivacy> 
            <TitleAbout>
                  للإعلان على موقع  <LinkSite  href='antinassb.com'>antinassb.com</LinkSite>
            </TitleAbout>
            <Para> 
            الإعلان على موقع أونتي نصب يخدع لقواعد و شروط صارمة ، أرسلوا طلبكم و سيتم التواصل معكم من طرف مسؤولي التسويق و الإشهار.
            </Para>
            <TitAbout>مرحبا بطلبكم</TitAbout>
            <SectInput>
                <ContainerInputs>
                    <InputField type="email" placeholder="البريد الإلكتروني" name="emailComp" value={emailComp} onChange={e=> onChange(e)}/>
                    <InputField type="text" placeholder="الإسم الكامل" name="nameComp" value={nameComp} onChange={e=> onChange(e)}/>
                </ContainerInputs>
                <ContainerInputs>
                    <InputField type="phone" placeholder="رقم الهاتف" name="phoneComp" value={phoneComp} onChange={e=> onChange(e)}/>
                    <InputField type="city" placeholder="المدينة" name="cityComp" value={cityComp} onChange={e=> onChange(e)}/>
                </ContainerInputs>
                <ContainerInputs>
                    <InputMsg type="text" placeholder="رسالتكم..." name="textAdver" value={textAdver} onChange={e=> onChange(e)}/>
                </ContainerInputs>
                <Privacy > 
                <Recaptcha
                    sitekey="6Lcb1scUAAAAANyHPiWdVgvmAjm3Ac7anEfOT1xz"
                    render="explicit"
                    onloadCallback={e=> recaptchaLoaded()}
                    verifyCallback={verifyCallback}
                    />
                 </Privacy>
                 {isError && <ErrorRec> المرجو تفعيل CAPTCHA </ErrorRec>}
            <ButtonContai> 
                <ButtonSend onClick={e=> onSubmit(e)}>إرسال</ButtonSend>
            </ButtonContai>
            </SectInput>
        </ContainerPrivacy>
        {/* Privacy verify from user */}
    </ContainerGlob>
    )
}

Advertising.propTypes = {  
    addNewADV: PropTypes.func.isRequired
}

export default connect(null, {addNewADV})(Advertising)

const ImgCorona = styled.img`

@media(max-width: 500px) {
    display: none;
}
`
const Newpost = styled(Link)`
text-decoration: none; 
height: 40px;
margin-bottom: 5px;
text-align: center;
background: none;
border: 1px solid gray;
color: #343a40;
display: flex;
align-items: center;
justify-content: center;
font-size: 20px;
font-weight: bold;
cursor: pointer;
:hover {
    background: #e66e07;
}
`

const ContainerGlob = styled.div`
display: flex;
margin: 30px 150px;
justify-content: space-between;
@media(max-width: 1300px) {
    margin: 30px 10px;
}

@media(max-width: 1000px) {
    flex-direction: column-reverse;
}

@media(max-width: 620px) {
    margin-top: 70px;
   }
`

const TitAbout = styled.h2`
font-zise: 22px;
padding: 0 10px;
font-weight: 600;
margin: 10px 0;
color: #414141;
margin-bottom: 0;
@media(max-width: 500px) {
    margin: 5px 0;
}
`

const ContainerPrivacy = styled.div`
direction: rtl;
width: 70%;
border: 1px solid gray;
background: #FFF;
@media(max-width: 1000px) {
    width: 100%;
}
`

const ContainerAds = styled.div`
width: 25%;
display: flex;
flex-direction: column;
@media(max-width: 1000px) {
    width: 100%;
    display: flex;
    justify-content: center;
    margin-top: 10px;
}
`

const LinkSite = styled.a`
font-size: 22px;
text-decoration: none;
color: #343a40;
font-weight: 500;
@media(max-width: 650px) {
    font-size: 18px;
}
`

const TitleAbout = styled.h1`
    background: #d0b49d;
    margin-top: 0;
    margin-bottom: 0;
    padding: 5px 10px;
    padding-bottom: 8px;
    font-size: 22px;
    border-bottom: 1px solid gray;
    font-weight: 500;
    @media(max-width: 500px) {
        font-size: 16px;
        height: 44px;
    }

    @media(max-width: 370px) {
        font-size: 14px;
    }
    @media(max-width: 360px) {
        font-size: 16px;
    }
    @media(max-width: 359px) {
        font-size: 13px;
    }
`



const Para = styled.p`
padding: 1px 10px 0 10px;
margin-top: 5px;
color: #414141;
FONT-WEIGHT: 300;
line-height: 22px;
@media(max-width: 500px) {
    line-height: 20px;
}
`

const SectInput = styled.form`
width: 100%;
margin-top: 30px;
`

const ContainerInputs = styled.div`
margin-top: 10px;
display: flex;
flex-direction: row;
justify-content: space-between;
padding: 0 10px;
`

const InputField = styled.input`
width: 48%;
height: 40px;
border-radius: 2px;
border: 1px solid #e66e07;
padding: 5px;
`


const InputMsg = styled.textarea`
width: 100%;
height: 120px;
border-radius: 2px;
border: 1px solid;
padding: 5px;
`

const Privacy = styled.div`
padding: 0 10px;
margin: 10px 0px;
`

const ErrorRec = styled.div`
padding: 0 10px;
margin: 10px 0px;
color: red;
`

const ButtonContai = styled.div`
margin: 10px;
height: 60px;
`

const ButtonSend = styled.button`
border: 1px solid gray;
background: none;
border-radius: 3px;
padding: 10px 30px;
transition: 0.3s;
cursor: pointer;
:hover {
    background: #e66e07;
}
`

