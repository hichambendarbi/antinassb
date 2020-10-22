import React, { Fragment } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { Link, withRouter } from 'react-router-dom'
import Moment from 'react-moment'
import { connect } from 'react-redux'
import { addLike, removeLike } from '../../../controlers/post' 
import { ReactComponent as Comment} from '../../imgs/comment.svg'
import { ReactComponent as Like} from '../../imgs/like-button.svg'

const PostItem = ({ auth,
post: { _id, statusUser, nameSpam, country, category, likes, comments, date, user, status },
addLike, removeLike, history
}) => {


    const LikeColor = e => {
        e.preventDefault()
                              
        if(!auth.isAuthenticated) {
            history.push('/تسجيل-الدخول');
        } else {
            addLike(_id)
            removeLike(_id)
        }
    }

    return (
        <Fragment>
        {status==="ONLINE" && statusUser==="visible" &&
        <CardsPost>
        <PostCat><CardTit>{category}</CardTit></PostCat>
        <ContainerCard>
            <HeaderCard>
                <NameSpam>{nameSpam}</NameSpam>
                <ContrySpam>{country}</ContrySpam> 
            </HeaderCard> 
            <FooterCard>
                <FooterReac>
                {/* نشر بتاريخ  */}  
                    <DatePost><Moment format='YYYY/MM/DD'>{date}</Moment></DatePost>
                                
                                   {auth.user && auth.user._id ?
                                   <ContLik>
                                    <LikePost onClick={ e => {
                                    LikeColor(e)
                                    }}>
                                        {!auth.loading && auth.isAuthenticated && likes.find(element => element.user ===  auth.user._id ) ? <Like id="ok" fill='#0cc38e' width='20' height='20'/> : 
                                        <Like id="test"  fill='black' width='20' height='20'/>
                                        } 
                                         </LikePost>{' '}  {likes.length > 0 && (<SpanCount>{likes.length}</SpanCount>)}</ContLik>
                                         :<ContLik><LikePost onClick={e=> history.push('/تسجيل-الدخول')}><Like id="test"  fill='black' width='20' height='20'/></LikePost>{' '}  {likes.length > 0 && (<SpanCount>{likes.length}</SpanCount>)}</ContLik> } 
                  <ContLik>
                        <CommentPost to={`/post/${_id}/نصاب-${category.split(' ').join('-')}-${nameSpam.split(' ').join('-')}`}> 
                        <Comment width='15' height='15'/></CommentPost> 
                        {' '}{comments.length > 0 && (<SpanCount>{comments.length}</SpanCount>)}
                    </ContLik>  
                </FooterReac>
                <BtnDetais to={`/post/${_id}/نصاب-${category.split(' ').join('-')}-${nameSpam.split(' ').join('-')}`}>التفاصيل</BtnDetais>
            </FooterCard> 
        </ContainerCard>
    </CardsPost>
    }
</Fragment>
    )
}

PostItem.propTypes = {
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  addLike: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect( mapStateToProps, {addLike, removeLike}) (withRouter(PostItem))

const FooterReac = styled.div`
height: 100%;
width: 70%;
display: flex;
justify-content: space-between;
align-items: center;
`
const ContLik = styled.div`
display: flex;
flex-direction: row-reverse;
height: 26px;
align-items: center;
`

const SpanCount = styled.span`
margin-left: 26px;
margin-bottom: 20px;
POSITION: absolute;
`

const FooterCard = styled.div`
width: 100%;
height: 40%;
display: flex;
justify-content: space-between;
`

const ContrySpam = styled.h3`
font-size: 18px;
color: #2b2e2e;
display: flex;
@media(max-width: 500px) {
    font-size: 14px;
}`

const NameSpam = styled.h2`
font-size: 18px;
color: #2b2e2e;
display: flex;
@media(max-width: 500px) {
    font-size: 14px;
}
`

const CardsPost = styled.div`
width: 99%;
height: 80px;
display: flex;
margin-bottom: 10px;
border-radius: 5px;
box-shadow: 0 3px 4px 1px #343a4078;
transition: .5s;
cursor: pointer;
:hover{
    border: 2px solid #161819;
    height: 82px;
}
`

const PostCat = styled.div`
width: 20%;
height: 100%;
display: flex;
background: #ffffff; 
align-items: center;
justify-content: center;
border-top-left-radius: 20px;
border-top-right-radius: 5px;
border-left: 5px solid #090a0b;
@media(max-width: 500px) {
    border-left: 2px solid #090a0b;
    width: 23%;
}
`

const CardTit = styled.h1`
font-size: 20px;
color: #e66e07;
@media(max-width: 620px) {
    font-size: 13px;
}
`
const ContainerCard = styled.div`
width: 80%;
height: 100%;
padding: 0 15px;
`
const HeaderCard = styled.div`
width: 100%;
height: 60%;
display: flex;
justify-content: space-between;
align-items: flex-end;
@media(max-width: 500px) {
    height: 50%;
}
`
const LikePost = styled.button`
width: 25px;
height: 25px;
background: none;
display: flex;
border-radius: 50%;
align-items: center;
justify-content: center;
border: 1px solid #090a0b;
`

const CommentPost = styled(Link)`
width: 25px;
height: 25px;
background: none;
display: flex;
border-radius: 50%;
align-items: center;
justify-content: center;
text-decoration: none;
border: 1px solid #000;
`

const DatePost = styled.span`
font-size: 13px;
display: flex;
color: #2b2e2e;
`

const BtnDetais = styled(Link)`
height: 100%;
width: 20%;
display: flex;
align-items: center;
justify-content: flex-end;
color: #2b2e2e;
border-radius: 10px;
font-weight: 100;
`