import React, {useEffect} from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { getPost } from '../../../controlers/post' 
import CommentForm from './CommentForm'
import CommentItem from './CommentItem'
import { ReactComponent as Return} from '../../imgs/left-arrow.svg'
import moment from 'moment'
import OptionPost from '../../commons/OptionPost' 
import OptionDiplayPost from '../../commons/OptionDiplayPost'


const PostDisplay = ({getPost, post: { post, loading }, match}) => {
   
   useEffect(()=> {
          getPost(match.params.id)
   }, [getPost, match.params.id]);

    var str = /[\u0600-\u06FF]/
    
    return loading || post === null ? (  
        <ContSpinner> <ImgSp alt="دلائل" src={require('../../imgs/spinner.gif')} /></ContSpinner> 
    ) : (
        <Container> 
            <TitlePost>{post.nameSpam} <br/> نصاب محترف في مجال {post.category} <Linkrot to="/"> <Return fill="#009688" width="30" height="20"/></Linkrot></TitlePost>
            {/* <LineTest></LineTest> */}
            <InfoS>
                {str.test(post.nameUser) ? (<SpanLinkToUser>تم التبليغ من طرف : {post.nameUser}</SpanLinkToUser>) : 
                (<SpanLinkToUser> {post.nameUser} : تم التبليغ من طرف</SpanLinkToUser>)
                }
                
                <SpanIns >نشر بتاريخ : { moment(post.date).format('HH:MM YYYY-MM-DD') }</SpanIns>
            </InfoS>
            <Section>
            <ContainerAds href="https://wa.me/+212657962008"> 
                  <BannerAds alt="ads" src={require('../../imgs/ads2.jpg')} />
            </ContainerAds>
            <ContainerPost>
              <Subb>مشكل و طريقة النصب : <SpanD> {post.text}</SpanD></Subb> 
              <Sub>مدينة النصاب : <SpanD>{post.country}</SpanD></Sub> 
              {!post.facebook && !post.instagram && !post.website ? null : 
                <Sub>روابط التواصل : 
                {' '} {post.facebook && <a href={post.facebook}>فيس بوك</a>} 
                {' '} {post.instagram && <a href={post.instagram}>أنستاغرام</a>} 
                {' '} {post.website && <a href={post.website}>الموقع</a>} 
                </Sub>
              }
              <Sub>رقم هاتف النصاب : <SpanD>{post.telephone}</SpanD></Sub>
              <CommentForm postId={post._id}/>
              <SectionComments>
                  {post.comments.map(comment => (
                      <CommentItem key={comment._id} comment={comment} postId={post._id}/>
                  ))}
              </SectionComments>
            </ContainerPost> 
          </Section>
          {/* <img src={post.image} alt="Spammer preuve"/> */}
          <ContainerOptions>
              <OptionDiplayPost id_user={post.user} nm={post.nameUser}/>
              <OptionPost preuves={post.image}/>
          </ContainerOptions>
        </Container>
    )
}

PostDisplay.propTypes = {
    getPost: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    post: state.post,
    profile: state.profile
})

export default connect(mapStateToProps, {getPost}) (PostDisplay)


const Section = styled.div`
width: auto;
display: flex;
justify-content: space-between;

@media(max-width: 820px) {
    flex-direction: column-reverse; 
}`

const BannerAds = styled.img`
width: 100%;
cursor: pointer;
`

const ImgSp  = styled.img`
width: 100px;
margin-top: 150px;
`

const ContSpinner = styled.div`
width: 100%;
min-height: 50vh;
text-align: center;
`

// const BannerAds = styled.img`
// @media(max-width: 500px){
//     width: 100%;
// }
// `

const SpanLinkToUser = styled(Link)`
color: black;
font-size: 14px;
font-weight: 600;
text-decoration: none;
cursor: auto;
@media(max-width: 520px) {
    font-size: 10px;
}
`

const SpanIns = styled.span`
color: #343a40;
font-size: 14px;
font-weight: 600;
@media(max-width: 520px) {
    font-size: 10px;
}
`

const InfoS = styled.div`
display: flex;
width: 100%;
height: 30px; 
padding: 10px;
border: 1px solid gray;
margin: 5px 0 20px 0;
justify-content: space-between;
align-items: center;
@media(max-width: 520px) {
    font-size: 12px;
}
`

const Linkrot = styled(Link)`
text-decoration: none;
color: #076cb0;
display: flex;
align-items: center;
justify-content: space-between;
`

const SpanD = styled.span`
color: gray; 
font-weight: 500;
`

// const SpanDD = styled(Link)`
// color: gray;
// font-weight: 500;
// text-decoration: none;
// `

const Container = styled.div` 
width: auto;
margin: 10px 150px;
display: flex;
justify-content: space-between;
margin-top: 25px;
flex-direction: column; 
border: 0.1px solid;
padding: 0 5px 5px;
box-shadow: 0 3px 4px 1px #343a4078;
border-radius: 5px;
@media(max-width: 1200px) {
    margin: 10px 50px;
}
@media(max-width: 900px) {
    margin: 10px 10px;
}

@media(max-width: 620px) {
    margin-top: 70px;
   }
`

const TitlePost = styled.h1`
direction: rtl;
display: flex;
justify-content: space-between;
font-size: 25px;
font-weight: 600;
color: #009688;
@media(max-width: 750px) {
    margin-bottom: 10px;
    padding-right: 6px;
}
@media(max-width: 560px) {
   font-size: 16px;
}
`
  
const ContainerPost = styled.div`
width: 68%;
display: flex;
justify-content: flex-end;
flex-direction: column;
PADDING: 15px 10px;
border: 3px solid #009688;
background: #FFF;
@media(max-width: 820px) {
    width: 100%;
    margin-bottom: 20px;
}
`

const ContainerAds = styled.a`
width: 30%;
display: flex;
justify-content: center;
height: 220px;
text-decoration: none;
cursor: pointer;
@media(max-width: 820px) {
    display: none;
    width: 100%;
}
@media(max-width: 500px) {
    display: flex;
}
`

const Subb = styled.h2`  
font-size: 20px;
direction: rtl;
margin-top: 0px;
margin-bottom: 30px;
font-weight: 600;
color: #343a40;
@media(max-width: 520px) {
    font-size: 16px;
}
`

const Sub = styled.h2`  
font-size: 20px;
direction: rtl;
margin-top: 0px;
margin-bottom: 5px;
font-weight: 600;
color: #343a40;
@media(max-width: 520px) {
    font-size: 16px;
}
`

const ContainerOptions = styled.div`
background: #c1bbbb;
direction: rtl;
margin-top: 10px;
padding: 10px;
width: 68%;
margin-left: 32%;
@media(max-width: 820px) {
    width: 100%;
    margin-left: 0%;
}
`

const SectionComments = styled.div`
margin-top: 20px;
`
