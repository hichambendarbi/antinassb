import React, { useState, Fragment } from 'react'
import styled from 'styled-components';
import { Link, withRouter } from 'react-router-dom';
import { updatePost } from '../../../controlers/post';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Alert from '../Layout_Alert/Alert';
import moment from 'moment';
import { ReactComponent as Hide} from '../../imgs/hide.svg';
import { ReactComponent as Eye} from '../../imgs/eye.svg';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import OptionPost from '../../commons/OptionPost';

const PosteVerifi = ({updatePost, history}) => {
    const [ProductFromStorage, setPost] = useState(JSON.parse(localStorage.getItem('post')))
    const [newStatus, setStatus] = useState('');
    const [newColorA, setColorA] = useState('none');
    const [newColorR, setColorR] = useState('none');
    var str = /[\u0600-\u06FF]/

    const choiseStatus = (e,init) => {
        e.preventDefault();
        if(init==="ONLINE") {
            setStatus("ONLINE")
            setColorA("#1da27c")
            setColorR("none")
        }  
        if(init==="OFFLINE") {
            setStatus("OFFLINE")
            setColorA("none")
            setColorR("#f61e32")
        }
    }    

    const onSubmit = (e) => {
          e.preventDefault();
          if(newStatus!=='') {
            updatePost(ProductFromStorage._id, {status:newStatus});
            setTimeout(()=>   history.push('/administration'), 3000);
          }
    }

    return ( 
               <ContainerPoste> 
                   <HeadPage> 
                       <LinkReturn to='/administration'> 
                           <ArrowBackIosIcon />
                           {`رجوع`}
                        </LinkReturn>
                       <SpanV>! التحقق من مدى احترام المحتوى لسياسة و محتوى الموقع</SpanV>
                   </HeadPage>
                   <Alert/>
                   <HeadPoste>
                   <LabelFiel>التاريخ : { moment(ProductFromStorage.date).format('HH:MM YYYY-MM-DD') }
                   </LabelFiel>
                   {str.test(ProductFromStorage.nameSpam) ? (<LabelFiel> اسم النصاب : {ProductFromStorage.nameSpam}</LabelFiel>) : 
                   (<LabelFiel>{ProductFromStorage.nameSpam} : اسم النصاب</LabelFiel> )
                    }

                    {str.test(ProductFromStorage.nameUser) ? (<LabelFiel>إسم المستخدم : {ProductFromStorage.nameUser}</LabelFiel>) : 
                   (<LabelFiel>{ProductFromStorage.nameUser} : إسم المستخدم</LabelFiel>)
                    }
                   
                   <LabelFiel> المجال : <span>{ProductFromStorage.category}</span></LabelFiel> 
                   </HeadPoste>
                   <HeadText>
                   <LabelText> موضوع النصب : {ProductFromStorage.text}</LabelText>
                    {/* {str.test(ProductFromStorage.text) ? (<LabelText>{ProductFromStorage.text} : موضوع النصب</LabelText>) : 
                       (<LabelText> موضوع النصب : {ProductFromStorage.text}</LabelText>)  
                       } */}
                   </HeadText>
                   {ProductFromStorage.statusUser==="notVisible" &&
                       <Fragment>
                        <label style={{marginTop: "35px"}}>: ملاحظة</label>
                        <label style={{color: "red"}}>تم الحذف من طرف صاحب التبليغ</label>
                        </Fragment>
                   } 
                   <OptionPost preuves={ProductFromStorage.image} />
                   {/* <Preuve>Preuve</Preuve> */}
                   <ConrainrStatus>
                       <ContainerRad>
                           <RadioAccept onClick={(e)=> choiseStatus(e,"ONLINE")} style={{background: newColorA}}>
                            <ConEy>
                            <Eye width="30"/>
                            {/* {newTextA} */}
                            </ConEy>
                           </RadioAccept>
                           <RadioRef  onClick={(e)=> choiseStatus(e,"OFFLINE")} style={{background: newColorR}}>
                            <ConEy>
                            <Hide width="30"/>
                            {/* {newTextR} */}
                            </ConEy>
                           </RadioRef>
                       </ContainerRad>
                       <ButtonConfirm onClick={(e)=> onSubmit(e)}>تم التحقق</ButtonConfirm>
                   </ConrainrStatus>
               </ContainerPoste>           
    )
}

PosteVerifi.propTypes = {
    updatePost: PropTypes.func.isRequired
}

export default connect(null, {updatePost}) (withRouter(PosteVerifi)) 

const ContainerPoste = styled.div`
width: 100%;
padding: 16px;
display: flex;
align-items: center;
flex-direction: column;
min-height: 60vh;
border: 4px solid #607D8B;
margin-top: 20px;
@media(max-width: 950px) {
    padding: 16px 0;
}
`

const SpanV = styled.span`
font-weight: 600;
`

const ConEy = styled.div`
display: flex;
align-items: center;
justify-content: center;
`

const HeadPage = styled.div`
display: flex;
width: 90%;
justify-content: space-between;
background: #fff;
height: 90px;
align-items: center;
color: #343a40;
font-size: 27px;
font-weight: 500;
border: 1px solid #e6e4e4;
padding: 10px;
box-shadow: 0 3px 4px 1px #343a4078;
@media(max-width: 950px) {
    font-size: 18px;
    font-size: 12px;
    height: 50px;
    font-weight: 600;
}

@media(max-width: 750px) {
    font-size: 12px;
    height: 50px;
    font-weight: 600;
}
`

const HeadPoste = styled.div`
display: flex;
width: 90%;
justify-content: space-between;
align-items: center;
color: #343a40;
padding: 3px;
margin-top: 55px;
@media(max-width: 750px) {
    flex-direction: column;
    justify-content: end;
    display: flex;
    align-items: flex-end;
    margin-top: 10px;
}
`

const LabelFiel = styled.span`
font-size: 18px;
@media(max-width: 950px) {
    font-size: 15px;
}
`

const HeadText = styled.div`
display: flex;
width: 90%;
color: #343a40;
padding: 3px;
margin-top: 18px;
justify-content: flex-end;
padding: 10px 15px;
border: 1px solid #343a40;
border-radius: 5px;
background: #882c2508;
`

const LabelText = styled.span`
font-size: 18px;
direction: rtl;
@media(max-width: 950px) {
    font-size: 15px;
}
`


const ConrainrStatus = styled.form`
width: 50%;
margin-top: 100px;
justify-content: center;
display: flex;
flex-direction: column;
align-items: center;
`

const RadioRef = styled.label`
border: 2px solid #f61e32;
width: 95px;
height: 40px;
cursor: pointer;
text-align: center;
padding: 4px;
border-radius: 50px;
`

const RadioAccept = styled.label`
border: 2px solid #1da27c;
width: 95px;
height: 40px;
cursor: pointer;
text-align: center;
padding: 4px;
border-radius: 50px;
`

const ButtonConfirm = styled.button`
border: 1px solid #3f51b5;
background: none;
border-radius: 3px;
width: 100%;
margin-top: 10px;
padding: 14px;
font-size: 15px;
letter-spacing: 1px;
font-weight: 700;
color: #3f51b5;
cursor: pointer;
:hover{
    background: #e6e4e4;
}
`

const LinkReturn = styled(Link)`
color: #3f51b5;
text-decoration: none;
display: flex;
align-items: center;
font-weight: 600;
`

const ContainerRad = styled.div`
width: inherit;
display: flex;
justify-content: space-between;
margin-bottom: 30px;
@media(max-width: 750px) {
    width: inherit;
}
`