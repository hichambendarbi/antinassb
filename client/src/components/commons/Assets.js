import styled from 'styled-components'
import {Link} from 'react-router-dom'


export const AuthContainer = styled.div`
width: 600px;
flex-direction: column;
margin: 30px auto;
border: 2px solid #151414de;
border-radius: 5px;
display: flex;
background: #000000;
@media(max-width: 620px) {
    width: auto;
    margin: 70px 10px;
   }

`

export const Retour = styled(Link)`
cursor: pointer;
padding: 12px 25px;
left: 30px;
border-bottom: 4px solid #201f1f;
font-weight: 900;
box-shadow: 0 2px 2px -2px #020202;
text-decoration: none;
color: #e66e07;
text-align: center;
background: #1c1919;
`

export const AuthNavigation = styled.div`
width: 100%;
height: 50px;
align-items: center;
display: flex;
justify-content: space-between;
border-bottom: 2px solid #e66e07;
margin-top: 30px;
`

export const Links = styled(Link)`
text-decoration: none;
font-size: 15px;
padding: 12px;
display: flex;
width: 45%;
align-items: center;
justify-content: center;
color: #f4f4f4;
:hover{
    color: #f5770b;
}
@media(max-width: 410px) {
    font-size: 13px;
}
@media(max-width: 350px) {
    font-size: 10px;
}
`

export const ContainerInputs = styled.div`
width: 100%;
// height: 50vh;
padding: 40px 5px;
display: flex;
flex-direction: column;
`

export const InputsDiv = styled.div`
width: 100%;
height: 40px;
margin-bottom: 20px;
`

export const Button = styled.button`
width: 100%;
height: 40px;
background: #f5770b;
color: #fff;
border: none;
border-radius: 3px;
margin-top: 10px;
padding: 1em;
cursor: pointer;
`

export const FooterLogin = styled.div`
width: 100%;
text-align: center;
margin-top: 30px;
font-size: 15px;
display: flex;
flex-direction: column;
`

// export const LinkRec = styled(Link)`
// color: #f5770b;
// font-size: 15px;
// text-decoration: none;
// `