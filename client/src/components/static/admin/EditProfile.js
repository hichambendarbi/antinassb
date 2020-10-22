import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link, withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createProfile, getCurrentProfile } from '../../../controlers/profile';
import { ReactComponent as Return} from '../../imgs/left-arrow.svg'

const EditProfile = ({profile: {profile, loading}, createProfile, getCurrentProfile, history }) => {
    const hiddenFileInput = React.useRef(null);
    const [dis, setDisplay] = useState(false)
    const [formData, setFormData] = useState({
    email: '',
    phone: '',
    location: '',
    activity: '',
    age: '',
    bio: '',
    skills: '',
    image: '',
    youtube: '',
    twitter: '',
    facebook: '',
    instagram: '',
    linkdin: '',
    website: ''
    })

    const { 
        email,   
        phone,
        location,  
        activity,
        age,
        bio, 
        // image,
        skills,
        youtube,
        twitter,
        facebook,
        instagram,
        linkdin,
        website
    } = formData;
    // const toPost = (row) => {
    //     localStorage.setItem('post', JSON.stringify(row))
    //   }
    useEffect(() => {
      getCurrentProfile();
      if(profile && profile.social) {
        setFormData({
            email: loading || !profile.email ? '' : profile.email,
            phone: loading || !profile.phone ? '' : profile.phone,
            location: loading || !profile.location ? '' : profile.location,
            activity: loading || !profile.activity ? '' : profile.activity,
            age: loading || !profile.age ? '' : profile.age,
            bio: loading || !profile.bio ? '' : profile.bio,
            skills: loading || !profile.skills ? '' : profile.skills.join(','),
            youtube: loading || !profile.social.youtube ? '' : profile.social.youtube,
            twitter: loading || !profile.social.twitter ? '' : profile.social.twitter,
            facebook: loading || !profile.social.facebook ? '' : profile.social.facebook,
            instagram: loading || !profile.social.instagram? '' : profile.social.instagram,
            linkdin: loading || !profile.social.linkdin ? '' : profile.social.linkdin, 
            website: loading || !profile.social.website ? '' : profile.social.website,
            image: loading || !profile.image ? '' : profile.image
          })
      } else {
        setFormData({
            email: loading || !profile.email ? '' : profile.email,
            phone: loading || !profile.phone ? '' : profile.phone,
            location: loading || !profile.location ? '' : profile.location,
            activity: loading || !profile.activity ? '' : profile.activity,
            age: loading || !profile.age ? '' : profile.age,
            bio: loading || !profile.bio ? '' : profile.bio,
            skills: loading || !profile.skills ? '' : profile.skills.join(','),
            youtube: loading || !profile.social? '' : profile.social.youtube,
            twitter: loading || !profile.social ? '' : profile.social.twitter,
            facebook: loading || !profile.social ? '' : profile.social.facebook,
            instagram: loading || !profile.social? '' : profile.social.instagram,
            linkdin: loading || !profile.social ? '' : profile.social.linkdin, 
            website: loading || !profile.social ? '' : profile.social.website,
            image: loading || !profile.image ? '' : profile.image
          })
      }

    }, [loading, getCurrentProfile]);



    const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
   
    const onSubmit = e => {
        e.preventDefault()
        var data = new FormData();
    
        var name = document.getElementById('file'); 
        var selectedFile = name.files[0];
        data.append('image', selectedFile); 
        data.append('email', email);
        data.append('phone', phone);
        data.append('location', location);
        data.append('activity', activity);
        data.append('age', age);
        data.append('bio', bio);
        data.append('skills', skills);
        data.append('facebook', facebook);
        data.append('instagram', instagram);
        data.append('youtube', youtube);
        data.append('twitter', twitter);
        data.append('website', website);
        data.append('linkdin', linkdin);
        console.log(data)
        createProfile(data,history, true)
    }

        // for image upload
        const handleClick = event => {
            event.preventDefault();
            hiddenFileInput.current.click();
          };
   
    return (
        <ContainerNewProfile>
            <TitleCreateProfile>
               <Linkrot to="/dashboard"> <Return fill="#009688" width="30" height="20"/></Linkrot>
                تعديل الملف الشخصي
           </TitleCreateProfile>
            <SousTitle>التوفر على ملف شخصي قد يساعدك في الحصول على عملاء جدد</SousTitle>
           <form onSubmit={e=> onSubmit(e)}>
            <ContainerInputs>
                <ContSpanInp>
                    <SpanIp>البريد الإلكتروني</SpanIp>
                    <InputCP placeholder="البريد الإلكتروني" name="email" value={email} onChange={e=> onChange(e)}/>
                </ContSpanInp>
                <ContSpanInp>
                    <SpanIp>الهاتف</SpanIp>
                    <InputCP placeholder="الهاتف" name="phone" value={phone} onChange={e=> onChange(e)}/>
                </ContSpanInp>
            </ContainerInputs>

            <ContainerInputs>
                <ContSpanInp>
                    <SpanIp>السن</SpanIp>
                    <InputCP placeholder="السن" name="age" value={age} onChange={e=> onChange(e)}/>
                </ContSpanInp>
                <ContSpanInp> 
                    <SpanIp>المدينة</SpanIp>
                <ComSlect className="select">
                <SelectOpts name="location" value={location} id="format" dir="rtl" onChange={e=> onChange(e)} >
                <OptionSearch selected >جميع المدن</OptionSearch>
                <OptionSearch value="سطات" >
                        سطات   
                    </OptionSearch>
                    <OptionSearch value="أكادير">
                        أكادير
                    </OptionSearch>
                    <OptionSearch value="أصيلة">
                        أصيلة   
                    </OptionSearch>
                    <OptionSearch value="أزرو">
                         أزرو
                    </OptionSearch>       
                    <OptionSearch value="أزيلال">
                        أزيلال 
                    </OptionSearch>
                    <OptionSearch value="أزمور">
                        أزمور 
                    </OptionSearch>
                    <OptionSearch value="بني ملال">
                        ابني ملالت 
                    </OptionSearch>
                    <OptionSearch value="بركان">
                        بركان 
                    </OptionSearch>
                    <OptionSearch value="بن طيب"> 
                       بن طيب 
                    </OptionSearch>
                    <OptionSearch value="الدار البيضاء"> 
                    الدار البيضاء 
                    </OptionSearch>
                    <OptionSearch value="شفشاون"> 
                    شفشاون 
                    </OptionSearch>
                    <OptionSearch value="الجديدة"> 
                    الجديدة 
                    </OptionSearch>
                    <OptionSearch value="الرشيدية"> 
                    الرشيدية 
                    </OptionSearch>
                    <OptionSearch value="الصويرة"> 
                    الصويرة 
                    </OptionSearch>
                    <OptionSearch value="فكيك"> 
                    فكيك 
                    </OptionSearch>
                    <OptionSearch value="فاس"> 
                    فاس 
                    </OptionSearch>
                    <OptionSearch value="كلميم"> 
                    كلميم 
                    </OptionSearch>
                    <OptionSearch value="الحسيمة"> 
                    الحسيمة 
                    </OptionSearch>
                    <OptionSearch value="إفران"> 
                    إفران 
                    </OptionSearch>
                    <OptionSearch value="إمزور"> 
                    إمزور 
                    </OptionSearch>
                    <OptionSearch value="إنزكان"> 
                    إنزكان 
                    </OptionSearch>
                    <OptionSearch value="القنيطرة"> 
                    القنيطرة 
                    </OptionSearch>
                    <OptionSearch value="الخميسات"> 
                    الخميسات 
                    </OptionSearch>
                    <OptionSearch value="خنيفرة"> 
                    خنيفرة 
                    </OptionSearch>
                    <OptionSearch value="خريبكة"> 
                    خريبكة 
                    </OptionSearch>
                    <OptionSearch value="القصر الكبير"> 
                    القصر الكبير 
                    </OptionSearch>
                    <OptionSearch value="العرائش"> 
                    العرائش 
                    </OptionSearch>
                    <OptionSearch value="مراكش"> 
                    مراكش 
                    </OptionSearch>
                    <OptionSearch value="مكناس"> 
                    مكناس 
                    </OptionSearch>
                    <OptionSearch value="المحمدية"> 
                    المحمدية 
                    </OptionSearch>
                    <OptionSearch value="ناظور"> 
                    ناظور 
                    </OptionSearch>
                    <OptionSearch value="ورززات"> 
                    ورززات 
                    </OptionSearch>
                    <OptionSearch value="وجدة"> 
                    وجدة 
                    </OptionSearch>
                    <OptionSearch value="الرباط"> 
                    الرباط 
                    </OptionSearch>
                    <OptionSearch value="أسفي"> 
                    أسفي 
                    </OptionSearch>
                    <OptionSearch value="سلا"> 
                    سلا 
                    </OptionSearch>
                    <OptionSearch value="صفرو"> 
                    صفرو 
                    </OptionSearch>
                    <OptionSearch value="طنجة"> 
                    طنجة 
                    </OptionSearch>
                    <OptionSearch value="طانطان"> 
                    طانطان 
                    </OptionSearch>
                    <OptionSearch value="طرفايا"> 
                    طرفايا 
                    </OptionSearch>
                    <OptionSearch value="تارودانت"> 
                    تارودانت 
                    </OptionSearch>
                    <OptionSearch value="تازة"> 
                    تازة 
                    </OptionSearch>
                    <OptionSearch value="تطوان"> 
                    تطوان 
                    </OptionSearch>
                    <OptionSearch value="تنزيت"> 
                    تنزيت 
                    </OptionSearch>
                    <OptionSearch value="زاكورة"> 
                        زاكورة 
                    </OptionSearch>
                </SelectOpts>
               </ComSlect>
                </ContSpanInp>
            </ContainerInputs>

            <ContainerInputs>
                <ContSpanInp>
                    <Btnfile type="button" onClick={handleClick}>
                      تحميل صورة شخصية  
                    </Btnfile>
                    <InputCP type="file" ref={hiddenFileInput} style={{padding: "6px", display:"none"}}  placeholder="Lebele" id="file" name="image" onChange={e=> onChange(e)} multiple />
                    {/* <input placeholder="Lebele" id="file" type="file" name="image" onChange={e=> onChange(e)} multiple /> */}
                </ContSpanInp>
                <ContSpanInp>
                    <SpanIp>ما هو نشاطك الحالي ؟</SpanIp>
                    <InputCP placeholder="النشاط الحالي" name="activity" value={activity} onChange={e=> onChange(e)}/>
                </ContSpanInp>
            </ContainerInputs>

            <ContainerArea>
                <ContSpanInpp>
                    <SpanIp>الخدمات التي تقدمها</SpanIp>
                    <InputH placeholder="من فضلك قم بالفصل بين الخدمات ب فاصلة (التصميم٬ البرمجة، السيو، التعليق الصوتي)" name="skills" value={skills} onChange={e=> onChange(e)}/>
                </ContSpanInpp>
                <ContSpanInpp> 
                    <SpanIp>نبذة عنك و عن أنشطتك</SpanIp>
                    <AreaCP placeholder="نبذة عنك و عن أنشطتك" name="bio" value={bio} onChange={e=> onChange(e)}/>
                </ContSpanInpp>
            </ContainerArea>

            {/* Social network Links */}
            <ContainerInputs>
               <BtnDisplay onClick={()=> setDisplay(!dis)} type="button">أضف روابط للتواصل</BtnDisplay>
            </ContainerInputs>
            {dis ?
            <ContainerSocial>
                <ContainerInputs>
                    <ContSpanInp> 
                        <SpanIp>الموقع الشخصي</SpanIp> 
                        <InputCP placeholder="الموقع الشخصي" name="website" value={website} onChange={e=> onChange(e)}/>
                    </ContSpanInp>
                    <ContSpanInp>
                        <SpanIp>الفيس بوك</SpanIp>
                        <InputCP placeholder="الفيس بوك" name="facebook" value={facebook} onChange={e=> onChange(e)}/>
                    </ContSpanInp>
                </ContainerInputs>

                <ContainerInputs>
                    <ContSpanInp>
                        <SpanIp>أنستاغرام</SpanIp>
                        <InputCP placeholder="أنستاغرام" name="instagram" value={instagram} onChange={e=> onChange(e)}/>
                    </ContSpanInp>
                    <ContSpanInp>
                        <SpanIp>تويتر</SpanIp>
                        <InputCP placeholder="تويتر" name="twitter" value={twitter} onChange={e=> onChange(e)}/>
                    </ContSpanInp>
               </ContainerInputs>

               <ContainerInputs>
                <ContSpanInp>
                    <SpanIp>يوتيوب</SpanIp>
                    <InputCP placeholder="يوتيوب" name="youtube" value={youtube} onChange={e=> onChange(e)}/>
                </ContSpanInp>
                <ContSpanInp>
                    <SpanIp>لينكدينك</SpanIp>
                    <InputCP placeholder="لينكدينك" name="linkdin" value={linkdin} onChange={e=> onChange(e)}/>
                </ContSpanInp>
               </ContainerInputs>
            </ContainerSocial> : null}

             {/* Button Create */}
             <ContainerInputs>
              <BtnCreate type="submit">تعديل</BtnCreate>
             </ContainerInputs>
             </form>
        </ContainerNewProfile>
    )
}

EditProfile.propTypes = {     
 createProfile: PropTypes.func.isRequired,
 getCurrentProfile: PropTypes.func.isRequired,
 profile: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
 profile: state.profile
})

export default connect(mapStateToProps, { createProfile, getCurrentProfile }) (withRouter(EditProfile))

const ContainerNewProfile = styled.div`
margin: 20px 150px;
min-height: 500px;
@media(max-width: 620px) {
    padding-top: 70px;
   }
@media(max-width: 500px) {
    margin: 15px 10px;
}
`

const Linkrot = styled(Link)`
text-decoration: none;
color: #076cb0;
display: flex;
align-items: center;
justify-content: space-between;
`

const Btnfile = styled.button`
border: 2px solid #009688;
border-radius: 3px;
margin-top: auto;
margin-bottom: 1px;
height: 50%;
@media(max-width: 500px) {
    margin-bottom: 0px;
    border: 1px solid #009688;
    height: 48%;
}
`

const TitleCreateProfile = styled.h1`
font-size: 30px;
display: flex;
justify-content: flex-end;
color: #e66e07;
font-weight: 600;
justify-content: space-between;
@media(max-width: 500px) {
    margin-bottom: 0;
    font-size: 25px;
}
`

const SousTitle = styled.h2`
font-size: 20px;
display: flex;
justify-content: flex-end;
font-weight: 500;
@media(max-width: 500px) {
    margin-top: 0;
    font-size: 14px;
}
`

const ContainerInputs = styled.div`
width: 100%;
display: flex;
justify-content: space-between;
margin-bottom: 10px;
`

const ContainerArea = styled.div`
width: 100%;
display: flex;
justify-content: space-between;
margin-bottom: 10px;
@media(max-width: 500px) {
    flex-direction: column;
}
`

const InputCP = styled.input`
padding: 10px 10px;
width: 100%;
direction: rtl;
border-radius: 3px;
border: 1px solid #e66e07;
@media(max-width: 500px){
    border-radius: 2px;
    padding: 8px 10px;
}
`

const AreaCP = styled.textarea`
padding: 10px 10px;
width: 100%;
direction: rtl;
border-radius: 3px;
border: 2px solid #333;
@media(max-width: 500px){
    border-radius: 2px;
}
`

const ContSpanInp = styled.div`
display: flex;
width: 45%;
flex-direction: column;
@media(max-width: 500px) {
    width: 48%;
}
`

const ContSpanInpp = styled.div`
display: flex;
width: 45%;
flex-direction: column;
@media(max-width: 500px) {
    width: 100%;
}
`

const SpanIp = styled.span`
margin: 10px 0;
direction: rtl;
@media(max-width: 500px) {
    font-size: 13px;
}
`

const InputH = styled.input`
padding: 10px 10px;
width: 100%;
direction: rtl;
border-radius: 3px;
border: 2px solid #333;
height: 54px;
@media(max-width: 500px){
    border-radius: 2px;
    padding: 8px 10px;
}
`

const BtnDisplay = styled.button`
width: max-content;;
padding: 10px 10px;
border: 2px solid #333;
background: #f4f4f4;
margin-left: auto;
border-radius: 3px;
@media(max-width: 500px){
    border-radius: 2px;
    border: 1px solid #333;
}
`

const ContainerSocial = styled.div`
width: 100%;
margin-top: 15px;
`

const BtnCreate = styled.button`
width: 45%;
border: 2px solid #e66e07;
background: none;
transition: .3s;
padding: 6px;
margin-left: auto;
color: #e66e07;
font-size: 20px;
cursor: pointer;
border-radius: 3px;
margin-top: 20px;
:hover{
    background: #e66e07;
    color: #FFF;
}

@media(max-width: 500px) {
    width: 100%:
}
`

const OptionSearch = styled.option`
background-color: #2b2e2e;
color: #FFF;
`

const SelectOpts = styled.select`
appearance: none;
outline: 0;
box-shadow: none;
border: 0!important;
background: transparent;
background-image: none;
flex: 1;
padding: 10px 10px;
color: #2b2e2ea8;
cursor: pointer;
font-family: 'Open Sans',sans-serif;
@media(max-width: 500px) {
    font-size: .9em;
    padding: 8px 10px;
}
@media(max-width: 360px) {
    font-size: .8em;
}
`

const ComSlect = styled.div`
border-radius: 3px;
position: relative;
display: flex;
background: transparent;
overflow: hidden;
border: 1px solid #e66e07;

`