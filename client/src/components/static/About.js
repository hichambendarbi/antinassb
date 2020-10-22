import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

const About = () => {
    return (
        <ContainerGlob> 
        {/* Ads and pub */}  
        <ContainerAds>
            <Newpost to='/'>التبليغ عن نصاب</Newpost>
           <ImgCorona alt="دلائل" src={require('../imgs/corona.PNG')}/>
        </ContainerAds>

        <ContainerPrivacy> 
            <TitleAbout>
            موقع <LinkSite  href='https://antinassb.com' style={{marginRight:"3px"}}>antinassb.com</LinkSite>
            </TitleAbout>
            <Para>
            موقع أونتي نصب طور من أجل الحد من ظاهرة النصب على الأنترنت خاصة و حماية 
            الشباب و مستعملي الأنترنت من التعرض للتلاعب أو النصب، و تقدم
             هذه الخدمات من طرف الموقع مجانا و قد طور هذا الموقع من طرف 
            إحدى الشركات الرائضة في مجال البرمجة و التطوير المعلوماتي.
            </Para>
            
            <TitAbout>من نحن ؟</TitAbout>

            <Para> 
            بعد تنامي و تفشي ظاهرة النصب 
            على الأنترنت كان من الضروري البحث عن حلول جدرية للحد من هذه 
            الظاهرة التي أصبحت مؤخرا منتشرة إلى حد كبير في دول العالم
             العربي خاصة و العالم التالث عامة، حيث أصبح التعامل عبر
             الأنترنت حاجة ملحة لقضاء جميع الحوائج و الأغراض و الصفقات 
            التجارية الإلكترونية و الخدماتية و البنكية الشيئ الذي جعل 
            هذا المجال أرضا خصبة للنصابين و المخادعين الغير جادين
             الذين يتحيلون الفرص و يبدعون في إيجاد و خلق فرص و طرق 
            جديدة للنصب و الاحتيال، لذالك و بعد دراسة معمقة للظاهرة
             تمت برمجة وتطوير الموقع للكشف عن النصابين و تحذير الناس
             منهم قبل التعامل و عقد الصفقات معهم و السقوط في شباكهم.
            </Para>

            <TitAbout>أهداف الموقع.</TitAbout>

            <Para>
            يتجلى الهدف الأسمى و
             الرئيسي من موقع أونتي نصب في مساعدة مستعملي خدمات الويب
             على تفادي السقوط ضحايا عمليات النصب و الإحتيال و ذالك 
            عن طريق البحث في الموقع عن إسم الشخص أو الشركة الذين
             هم على وشك التعامل معها هذا الفعل البسيط قد يجنبهم
             خسائر فادحة ، وإذا ما تعرض أحدهم للنصب يمكنه أيضا
             أن يساعد و يجنب أناس آخرين التعرض للنصب من طرف
             نفس الشخص و ذالك عن طريق التبليغ عن إسم النصاب 
            في الموقع حيث يصبح إسمه مدرج ضمن لائحة النصابين.
            </Para>

            <Para>
            اليوم بعد أن أصبح الموقع مرجعا للتحقق من جدية ونزاهة الأشخاص و الشباب
             الذين يعملون و يعقدون صفقاتهم على الأنترنت ، أصبح تفادي 
            التعرض للنصب سهل كما أنه تم إلى حد ما إنصاف المشتكين 
            و المبلغين بإعطائهم فرصة تنبيه و توعية الناس من النصابين.
            </Para>
        </ContainerPrivacy>
    </ContainerGlob>
    )
}

export default About

const ImgCorona = styled.img`

@media(max-width: 500px) {
    display: none;
}
`
const Newpost = styled(Link)`
text-decoration: none;
height: 40px;
margin-bottom: 5px;
text-align: center;
background: none;
border: 1px solid gray;
color: #343a40;
display: flex;
align-items: center;
justify-content: center;
font-size: 20px;
font-weight: bold;
`

const ContainerGlob = styled.div`
display: flex;
margin: 30px 150px;
justify-content: space-between;
@media(max-width: 1300px) {
    margin: 30px 10px;
}

@media(max-width: 1000px) {
    flex-direction: column-reverse;
}
@media(max-width: 620px) {
    margin-top: 70px;
   }
`

const TitAbout = styled.h2`
font-size: 22px;
padding: 0 10px;
font-weight: 600;
margin: 10px 0;
color: #414141;
margin-bottom: 0;
@media(max-width: 500px) {
    margin: 5px 0 0 0;
    font-size: 20px;
}
`



const ContainerPrivacy = styled.div`
direction: rtl;
width: 70%;
border: 1px solid gray;
background: #FFF;
@media(max-width: 1000px) {
    width: 100%;
}
`

const ContainerAds = styled.div`
width: 25%;
display: flex;
flex-direction: column;
@media(max-width: 1000px) {
    width: 100%;
    display: flex;
    justify-content: center;
    margin-top: 10px;
}
`

const LinkSite = styled.a`
font-size: 22px;
text-decoration: none;
color: #343a40;
font-weight: 500;
@media(max-width: 500px) {
    font-size: 16px;
}`

const TitleAbout = styled.h1`
    background: #d0b49d;
    margin-top: 0;
    margin-bottom: 10px;
    padding: 5px 10px;
    padding-bottom: 8px;
    font-size: 22px;
    border-bottom: 1px solid gray;
    font-weight: 500;
    @media(max-width: 500px) {
        font-size: 16px;
        height: 44px;
        align-items: center;
        display: flex;
    }

    @media(max-width: 370px) {
        font-size: 14px;
    }
    @media(max-width: 360px) {
        font-size: 16px;
    }
    @media(max-width: 359px) {
        font-size: 13px;
    }
`

const Para = styled.p`
padding: 1px 10px 0 10px;
margin-top: 5px;
margin-bottom: 30px;
color: #414141;
FONT-WEIGHT: 300;
line-height: 28px;
font-size: 18px;
@media(max-width: 500px) {
    line-height: 20px;
    margin-top: 0px;
}
`