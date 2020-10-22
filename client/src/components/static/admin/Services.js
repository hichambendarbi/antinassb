import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { deleteActivity } from '../../../controlers/profile'
import AddServices  from './AddServices'
import moment from 'moment'
import { connect } from 'react-redux'
import OptionEdit from '../../commons/OptionEdit'
import Tooltip from '@material-ui/core/Tooltip';


const Services = ({activity}) => {

    return (
        <ContainerPost>
            <AddServices/>
            <CardPost>
               <Fields>النشاط</Fields>
               <Fields>نبدة عن النشاط</Fields>
               <Fields className="act_date">من - إلى</Fields>
               <Fields style={{width: "10%"}}>آخر</Fields> 
            </CardPost>
             {activity.map(act=> (
                            <PostInfo>
                            <Fields>{act.title}</Fields>   
                            <Fields>
                                <Tooltip title={act.description} interactive id="desc_act">
                                  <Btn>تفاصيل</Btn>
                                </Tooltip>
                            </Fields>
                            <Fields className="act_date">{ moment(act.from).format('YYYY-MM-DD') } - { moment(act.to).format('YYYY-MM-DD') }</Fields>
                            <Fields style={{width: "10%"}}><OptionEdit id={act._id} activity={act}/></Fields>
                         </PostInfo>
             ))}

        </ContainerPost>
    )
}

Services.propTypes = {
    deleteActivity: PropTypes.func.isRequired
}

export default connect(null, { deleteActivity }) (Services)

const ContainerPost = styled.div`
display: flex;
width: 100%;
justify-content: center;
flex-direction: column;
align-items: center;
flex-direction: column;
@media(max-width: 700px) {
    font-size: 11px;
}
`

const CardPost = styled.div`
width: 100%;
direction: rtl;
padding: 15px;
background: #556080;
color: #e0e0e0;
display: flex;
border: 2px solid #343a40;

`

const Fields = styled.div`
width: 30%;
font-weight: 400;
text-align: center;
@media(max-width: 1100px) {
    width: 45%;
}
`

const PostInfo = styled.div`
width: 100%;
direction: rtl;
display: flex;
padding: 10px 15px;
border-bottom: 1px solid #e0e0e0;
height: 50px;
align-items: center;
background: #ffffff;
color: #9E9E9E;
`

const Btn = styled.button`
font-size: 15px !important;
font-weight: 100 !important;
color: #ffffff !important;
background: #607D8B !important;
padding: 2px 5px;
border: none;
`