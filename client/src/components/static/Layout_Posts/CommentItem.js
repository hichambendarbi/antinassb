import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { ReactComponent as User} from '../../imgs/user.svg'
import Moment from 'react-moment'

const CommentItem = ({
    postId,
    comment: { _id, text, name, image, user, date},
    auth
}) => (
        <ContainerComments>
             <ContUser>
                 <User width="40px" height="40px"/>
             </ContUser> 

             <ContTest>
             <ContainerCom>
                <NameUser> {name} </NameUser>
                <Pdate><Moment format='YYYY/MM/DD'>{date}</Moment></Pdate>
             </ContainerCom>
             <CommentText> {text} </CommentText>
             </ContTest>

        </ContainerComments>
    )

CommentItem.propTypes = {
    postId: PropTypes.number.isRequired,
    comment:  PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth
})
 
export default connect(mapStateToProps, { }) (CommentItem);


const Pdate = styled.p`
font-size: 12px;
color: gray;
`

const ContainerComments = styled.div`
padding: 10px 10px 0;
direction: rtl;
display: flex;
flex-direction: row;
border-radius: 10px;
border: 1px solid gray;
margin-top: 10px;

`

const ContUser = styled.div`
width: 50px;
height: 50px;
margin-left: 10px;
`

const ContainerCom = styled.div`
display: flex;
justify-content: space-between;
width: -webkit-fill-available;
align-items: baseline;
`
const ContTest = styled.div`
display: flex;
width: 100%;
flex-direction: column;
`

const CommentText = styled.p`
font-size: 14px;
color: #343a40bf;
font-weight: 300;
margin-top: 0;
`

const NameUser = styled.h3`
font-size: 16px;
font-weight: 600;
color: #343a40;
`