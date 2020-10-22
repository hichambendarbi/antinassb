import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

const PrivacyPolicy = () => {
    return (
        <ContainerGlob>
        {/* Ads and pub */}
        <ContainerAds>
            <Newpost to='/'>التبليغ عن نصاب</Newpost>
           <ImgCorona alt="دلائل" src={require('../imgs/corona.PNG')}/>
        </ContainerAds>

        <ContainerPrivacy>
            <TitleAbout>
               سياسة الخصوصية  
            </TitleAbout>

            <TitAbout>جمع المعلومات</TitAbout>
            <Para> 
            المعلومات التي يقوم بإذخالها المستخدمين عن أنفسهم هي معلومات غير حساسة أو تشكل أي 
            خطر عليهم لأن الموقع لا يطلب أي بيانات حساسة كمعلومات بطائق الإئتمان أو
             فصيلة الدم أو غيرها من المعلومات التي يمنك أن تستخدم في ما بعد
             لأغراض غير قانونية فالموقع لا يجمع أية معلومات عن مستخدميه.
            </Para>

            <TitAbout>استخدام المعلومات</TitAbout>
            <Para>
            عزيزى المستخدم ، سياسة الخصوصية أو
             سياسة الاستخدام الخاصة بموقع "أونتي نصب" متغيرة، ويمكن
             تطبيق أى تغيرات عليها فى أي وقت، لذلك عليك مراجعة هذه 
            الصفحة بشكل دورى للتعرف على مستجدات الخصوصية بموقعنا.
            يتوجب عليك أن تعلم أنه من الممكن أن يتم جمع المعلومات والبيانات تلقائيا من
            خلال استخدام الملفات النصية (كوكيز). وهي ملفات نصية صغيرة يتم من 
            خلالها حفظ المعلومات الأساسية التي يستخدمها موقع اليوم السابع من
            أجل تحديد الاستخدامات المتكررة للموقع قد نستخدم هذه المعلومات
            من أجل متابعة السلوك وتجميع بيانات كلية من أجل تحسين الموقع، 
            واستهداف الإعلانات وتقييم الفعالية العامة لمثل هذه الإعلانات. وأى
            بيانات تقوم بكتابتها مثل الاسم أو البريد الإلكترونى للاستفادة
            من بعض الخدمات الموجودة بالموقع مثل إضافة التعليقات   

بيانات الرأى هى البيانات التى ربما يحتاج لها الموقع كنوع من أنواع تحسين تجربة المستخدم للتعرف على رأيك فيما يمكن تعديلة أو إضافته للموقع للحصول على تجربة تصفح ممتعة بموقعنا، وهى لا تعتبر بيانات شخصية إنما هى بعض المعلومات التى توضح الاقتراحات الخاصة بك لتطوير موقعنا.
            </Para>

            <TitAbout>اعتبارات التجارة الإلكترونية</TitAbout>
            <Para>
            و كذالك تخصص الموقع بعيد كل البعد عن ما هو تجاري أو تسويقي لذالك لن 
            يستعمل الموقع معلومات المستخدمين لأغراض تجارية أو إلكترونية.
            </Para>

            <TitAbout>خصوصية المعلومات</TitAbout>
            <Para>
            ويتعهد الموقع بالحفاظ على معلومات و خصوصية المستخدمين كما أنه يقر بمسؤوليته إذا ما تم الكشف عن أي معلومة لأي جهات خارجية.
            </Para>

            <TitAbout>حماية المعلومات ذات الطابع الشخصي</TitAbout>
            <Para>
            ومن المؤكد أن حماية المعطيات و 
            المعلومات و العمليات التي تتم على مستوى الموقع من واجبات و من 
            أساسيات الموقع الجيد و المحمي من الاختراق و القرصنة لذلك فقد طور 
            الموقع باستعمال و اعتماد آخر و أحدث التكنولوجيات الحديثة.
            و قد أعطى الموقع الحق للمستخدمين في 
            إلغاء اشتراكاتهم و مسح بروفايلاتهم و معطياتهم من الموقع متى 
            ما أرادوا ذالك و بصفة نهائية دون أدنى تدخل من إدارة الموقع.
            </Para>
            <Para>
            إلا أن كل هذه العمليات و الخدمات لا يمكن أن تتم 
            إلا بموافقة المستخدمين على سياسة الخصوصية ليؤكدوا أنهم
             على علم بسياسة الموقع وأنهم موافقون عليها و على بنوذها.
            </Para>
        </ContainerPrivacy>
    </ContainerGlob>
    )
}

export default PrivacyPolicy

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


const TitleAbout = styled.h1`
    background: #d0b49d;
    margin-top: 0;
    margin-bottom: 0;
    padding: 5px 10px;
    padding-bottom: 8px;
    font-size: 22px;
    border-bottom: 1px solid gray;
    font-weight: 500;
    @media(max-width: 500px) {
        font-size: 16px;
        height: 44px;
        padding: 10px 10px;
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