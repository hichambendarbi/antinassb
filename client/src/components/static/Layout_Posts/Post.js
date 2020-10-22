import React, { useState} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import styled from 'styled-components';
import { addNewPost } from '../../../controlers/post';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { setAlert } from '../../../controlers/alert'
import Recaptcha from 'react-recaptcha'
 
const Post = ({auth, addNewPost, setAlert, history}) => {
  const [isVerify, setRecaptcha] = useState(false)
  const [isError, setError] = useState(false)
  const [isVisible, setLinks] = useState(false)
  const [formData, setFormData] = useState({
    nameSpam: '',
    category: '',
    country: '',
    text: '',
    image: '',
    facebook: '',
    instagram: '',
    website: '',
    telephone: ''
})

const {
  nameSpam,
  category,
  country,
  text,
  image,
  facebook,
  instagram,
  website,
  telephone
} = formData



const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });
const onFileChange = e => {
  setFormData({...formData, image: e.target.files });
  console.log(  
    nameSpam,
    category,
    country,
    text,
    image,
    facebook,
    instagram,
    website,
    telephone)
} 

const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };  
  
  const handleClose = () => { 
    setOpen(false);
  };

  const recaptchaLoaded = () => {
    console.log("recaptcha loaded"); 
    }

    function validURL(str) {
        var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
          '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
          '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
          '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
          '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
          '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
        // return !!pattern.test(str);
        return pattern.test(str)
      }

  const onSubmit = e => {
    e.preventDefault()
    // var name = document.getElementById('file'); 
    // var imgCollection = document.getElementById('file'); 
    // var selectedFile = name.files[0];
    // var selectedFile = [name.files[0]]
    var data = new FormData();
    for (const key of Object.keys(image)) {
      data.append('image', image[key])
    }
  
    // data.append('image', selectedFile);
    data.append('nameSpam', nameSpam);
    data.append('country', country);
    data.append('category', category);
    data.append('text', text);
    data.append('facebook', facebook);
    data.append('instagram', instagram);
    data.append('website', website);
    data.append('telephone', telephone);
    var ers = [
      'يجب أن يتراوح إسم النصاب بين 3 و 25 حرف',
      'يجب أن يتراوح مشكل وطريقة النصب بين 50 و 500 حرف',
      'المجال حقل ضروري',
      'المدينة حقل ضروري',
      'المرجو تحميل دليل واحد على الأقل',
      'عدد الدلائل يجب أن لا يتعدى 5',
      'يجب أن يتراوح إيمايل أو هاتف النصاب بين 10 و 25 أحرف .',
      'حقل فيس بوك عبارة عن رابط',
      'حقل أنستاغرام عبارة عن رابط',
      'حقل الموقع الشخصي عبارة عن رابط'
    ];
    var testMsg = false;
    
        if(nameSpam.length > 25  ||  nameSpam.length < 3) {
          setAlert(ers[0], 'danger')
          testMsg= true;
        }
        if(text.length > 500 || text.length < 50) {
          setAlert(ers[1], 'danger')
          testMsg= true;
        }
        if(category === 'مجال النصاب' || category.length < 1) {
          setAlert(ers[2], 'danger')
          testMsg= true;
        }
        if(country === 'مدينة النصاب' || country.length < 1) {
          setAlert(ers[3], 'danger')
          testMsg= true;
        }
        if(image.length===0) {
          setAlert(ers[4], 'danger')
          testMsg= true;
        }
        if(image.length>5) {
          setAlert(ers[5], 'danger')
          testMsg= true;
        }
        if(telephone.length > 25 || telephone.length < 10) {
          setAlert(ers[6], 'danger')
          testMsg= true;
        }

      if(facebook.length!==0) { 
        if(!validURL(facebook)) {
            setAlert(ers[7], 'danger')
            testMsg= true;
        }
      }

      if(instagram.length!==0) { 
        if(!validURL(instagram)) {
            setAlert(ers[8], 'danger')
            testMsg= true;
        }
      }

      if(website.length!==0) { 
        if(!validURL(website)) {
            setAlert(ers[9], 'danger')
            testMsg= true;
        }
      }

       if(!testMsg && isVerify) {
          addNewPost(data);
          setFormData({
            nameSpam: '',
            category: '',
            country: '',
            text: '',
            image: '',
            facebook: '',
            instagram: '',
            website: '',
            telephone: ''
          })
          handleClose();
        } else {
          setError(true)
        }  
} 
    const verifyCallback = (response) => {
        if(response) {
           setRecaptcha(true)
          //  setError(false)
        } 
       }

  return (
    <div dir="rtl">
      <Button variant="outlined" color="primary" onClick={e=> {
        if(!auth.isAuthenticated) {
          history.push('/تسجيل-الدخول')
        } else 
        handleClickOpen();
      }} id="btnpost">
      التبليغ عن نصاب 
      </Button>
      {/* <Button variant="outlined" color="primary" onClick={e=> {handleClickOpen()}} id="btnpost">
              التبليغ عن نصاب 
      </Button> */}
      <form>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" dir="rtl">
        <DialogTitle id="form-dialog-title">التبليغ عن نصاب</DialogTitle>
        <DialogContent>
          <TextField required margin="dense" id="name" label="إسم النصاب" type="text" fullWidthdir="rtl" name="nameSpam" value={nameSpam} onChange={e=> onChange(e)}/> 
          <TextField margin="dense" id="name" label="هاتف أو إيمايل النصاب" type="text" fullWidthdir="rtl" name="telephone" value={telephone} onChange={e=> onChange(e)}/> 
           <ComSlect className="select">
                <SelectOpts name="category" value={category} id="format" dir="rtl" onChange={e=> onChange(e)}>
                    <OptionSearch selected >مجال النصاب</OptionSearch>
                    <OptionSearch value="بايبال">
                      بايبال
                    </OptionSearch>
                    <OptionSearch value="مُشغل">
                     مُشغل
                    </OptionSearch>
                    <OptionSearch value="يوتيوب">
                      يوتيوب
                    </OptionSearch>
                    <OptionSearch value="إيباي">
                       إيباي
                    </OptionSearch>
                    <OptionSearch value="تجارة">
                      تجارة
                    </OptionSearch>
                    <OptionSearch value="موقع">
                      موقع
                    </OptionSearch>
                    <OptionSearch value="خدمات">
                    خدمات
                    </OptionSearch>
                </SelectOpts>
            </ComSlect>
               <ComSlect className="select">
                <SelectOpts name="country" value={country} id="format" dir="rtl" onChange={e=> onChange(e)} >
                <OptionSearch selected >مدينة النصاب</OptionSearch>
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
          <Areatext  placeholder="شرح مشكل و طريقة النصب" type="text" fullWidthdir="rtl" name="text" value={text} onChange={e=> onChange(e)} /> 
        
          {/* <InputImg placeholder="Lebele" id="file" type="file" name="image" onChange={e=> onFileChange(e)} multiple /> */}
          <InputImg placeholder="Lebele" type="file" name="image" onChange={e=> onFileChange(e)} multiple />
          <LabelImgChoice for="file">دلائل، صور، وثائق، دردشة...</LabelImgChoice>
          <Privacy> 
                <Recaptcha  
                    sitekey="6Lcb1scUAAAAANyHPiWdVgvmAjm3Ac7anEfOT1xz"
                    render="explicit"
                    onloadCallback={e=> recaptchaLoaded()}
                    verifyCallback={verifyCallback}
                    />
          </Privacy> 
          {isError && <ErrorRec> المرجو تفعيل CAPTCHA </ErrorRec>}
          <ShowLinks onClick={()=> setLinks(!isVisible)}>+ <Sptext>إضافة روابط النصاب</Sptext></ShowLinks> <br/> 
          {isVisible &&       
                    <ContLinks>
                    <TextField margin="dense" label="الفيس بوك" type="text" fullWidthdir="rtl" name="facebook" value={facebook} onChange={e=> onChange(e)}/> 
                    <TextField margin="dense" label="أنستاغرام" type="text" fullWidthdir="rtl" name="instagram" value={instagram} onChange={e=> onChange(e)}/> 
                    <TextField margin="dense" label="الموقع الشخصي" type="text" fullWidthdir="rtl" name="website" value={website} onChange={e=> onChange(e)}/> 
                    </ContLinks>
          }  
          <Privacy>
            <ParTerms>بعد التحقق من منشوري، أوافق على <Link to='/سياسة-الخصوصية'>
              سياسة الخصوصية</Link> لموقع antinassb، و أسمح بنشر منشوري.</ParTerms>
          </Privacy>
        </DialogContent>
        <DialogActions dir="ltr" > 
          <Button onClick={handleClose} color="primary">
            إلغاء
          </Button>
          <Button type="submit" color="primary" onClick={e=> onSubmit(e)}>
            نشر
          </Button>
        </DialogActions>
      </Dialog>
      </form>
    </div>
  );
}

Post.propTypes = {
  setAlert: PropTypes.func.isRequired,
  addNewPost: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(mapStateToProps, {addNewPost, setAlert}) (withRouter(Post)) 

const ContLinks = styled.div`
width: 100%;
`

const Sptext = styled.span` 
font-size: 16px;
color: gray;
`
const ShowLinks = styled.label`
width: 30px;
height: 30px;
font-size: 20px;
font-weight: lighter;
cursor: pointer;
transition: 0.3s;
:hover {
  color: orange;
}
`

const ParTerms = styled.p`
font-size: 13px;
font-weight: 700;
`

const Areatext = styled.textarea`
width: 100%;
margin-top: 30px;
padding: 10px;
border-radius: 0;
`

const OptionSearch = styled.option`
background-color: #2b2e2e;
color: #FFF;
font-size: 18px;
`

const SelectOpts = styled.select`
appearance:none;
outline:0;
box-shadow:none;
border:0!important;
background: transparent;
background-image: none;
flex: 1;
padding: 0;
color: #2b2e2ea8;
cursor: pointer;
font-family: 'Open Sans', sans-serif;
margin-top: 10px;
@media(max-width: 700px) {
    padding: 0;
    font-size: .9em;
}
@media(max-width: 360px) {
    padding: 0;
    font-size: .8em;
}
`

const ComSlect = styled.div`
margin-top: 5px;
position: relative;
display: flex;
height: 3em;
line-height: 3;
background: transparent;
overflow: hidden;
border-bottom: 1px solid gray;
`

const Privacy = styled.div`
padding: 0 0px;
margin: 10px 0px;
`

const ErrorRec = styled.div`
padding: 0 10px;
margin: 10px 0px;
color: red;
`

const InputImg= styled.input` 
margin-top: 20px;
width: 190px;
`

const LabelImgChoice = styled.label`
font-size: 12px;
font-weight: 500;
`
