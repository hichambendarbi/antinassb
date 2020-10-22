import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { addComment } from '../../../controlers/post'
import styled from 'styled-components'

const CommentForm = ({auth,postId, addComment, history}) => {
    const [text, setText] = useState('')

    const onSubmit = (e) => {
        if(!auth.loading && auth.isAuthenticated) {
            e.preventDefault();
            addComment(postId, { text });
            setText('')
        } else {
            e.preventDefault();
            history.push('/تسجيل-الدخول')
        }
    }
    return (
        <ContainComm>
            <Containform onSubmit={e=> onSubmit(e)}>
                <TextAr
                 name="text"
                 placeholder='ضع تعليقك...'
                 value={text}
                 onChange={e=> setText(e.target.value)}> 
                </TextAr>
                <InputComm type='submit' value='إرسال'/>
            </Containform>
        </ContainComm>
    )
}

CommentForm.propTypes = {
    addComment: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect( mapStateToProps, { addComment }) (withRouter(CommentForm))

const ContainComm = styled.div`
direction: rtl;
margin-top: 20px;
`

const Containform = styled.form`
width: 100%;
display: flex;
flex-direction: column;
`

const InputComm = styled.input`
width: 25%;
margin-top: 10px;
padding-top: 10px;
padding-bottom: 10px;
border: 1px solid gray;
background: none;
border-radius: 3px;
transition: .3s;
cursor: pointer;
:hover{
    background: #f5770b;
    border: 1px solid #f5770b;
}
`

const TextAr = styled.textarea`
height: 60px;
padding: 10px;
`
