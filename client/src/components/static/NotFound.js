import React from 'react'
import styled from 'styled-components'

const NotFound = () => {
    return (
        <ContNotFound>
           <h1 style={{letterSpacing: "5px"}}>Oops!</h1>
           <div>
               <SpanError>
                   <Lbl1>
                       4
                   </Lbl1>
                   <Lbl2>
                       0
                   </Lbl2>
                   <Lbl3>
                       4
                   </Lbl3>
                </SpanError>
                <LabelTest>
                    <span>باراكا من لعب الدراري</span>
                    <span style={{color: "gray"}} >Page not found</span>  
                </LabelTest>
            </div>
        </ContNotFound>
    )
}

export default NotFound

const ContNotFound = styled.div`
height: 400px;
padding: 20px 150px;
display: flex;
flex-direction: column;
align-items: center;
@media(max-width: 620px) {
    margin-top: 70px;
    padding: 20px 10px;
   }
`

const SpanError = styled.span`
margin: 0 10px;
display: flex;
justify-content: space-around;
align-items: center;
`

const Lbl1 = styled.label`
color: red;
font-size: 100px;
font-weight: 500;
`

const Lbl2 = styled.label`
color: red;
font-size: 15px;
`

const Lbl3 = styled.label`
color: red;
font-size: 22px;
`

const LabelTest = styled.label`
display: flex;
flex-direction: column;
align-items: center;
margin-top: 20px;
font-size: 30px;
`
