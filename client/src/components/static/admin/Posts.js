import React from 'react'
import styled from 'styled-components'
import moment from 'moment'
import OptionP from '../../commons/OptionP'
import OptionPost from '../../commons/OptionPost'

const Posts = ({myPosts}) => {

    return (
        <ContainerPost>
            <CardPost>
               <Fields>إسم النصاب</Fields>
               <Fields className="sp_phone">هاتف النصاب</Fields>
               <Fields className="sp_city">مدينة النصاب</Fields> 
               <Fields>مجال النصاب</Fields> 
               <Fields>التاريخ</Fields>
               <Fields style={{width: "10%"}}>آخر</Fields>
            </CardPost>  
             {myPosts.map(post=> post.statusUser=="visible" &&
                            <PostInfo>
                            <Fields>{post.nameSpam}</Fields>
                            <Fields>
                            <OptionPost preuves={post.image}/>
                            </Fields>
                            <Fields className="sp_city">{post.country}</Fields>
                            <Fields>{post.category}</Fields>
                            <Fields className="sp_phone">{ moment(post.date).format('YYYY-MM-DD HH:MM') }</Fields>
                            <Fields style={{width: "10%"}}><OptionP post={post}/></Fields>
                           </PostInfo>

             )}

        </ContainerPost>
    )
}

export default Posts

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
width: 18%;
font-weight: 400;
text-align: center;
@media(max-width: 1100px) {
    width: 30%;
}
`

const PostInfo = styled.div`
width: 100%;
direction: rtl;
background: #ffffff;
color: #9E9E9E;
display: flex;
padding: 10px 15px;
border-bottom: 1px solid #e0e0e0;
height: 50px;
align-items: center;
`
