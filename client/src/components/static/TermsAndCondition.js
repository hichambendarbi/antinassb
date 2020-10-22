import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

const TermsAndCondition = () => {
    return (
        <ContainerGlob>
        {/* Ads and pub */}
        <ContainerAds>
            <Newpost to='/'>التبليغ عن نصاب</Newpost>
           <ImgCorona alt="دلائل" src={require('../imgs/corona.PNG')}/>
        </ContainerAds>

        <ContainerPrivacy>
            <TitleAbout>
              شروط الاستخدام  
            </TitleAbout>
            <Para>
            يجب أن تكون التبليغات غير كاذبة و ذات 
            مصداقية أكثر و ذالك بإرفاقها بدلائل ملموسة مصورة صور
             أو دردشة و شرح المشكلة و طريقة النصب بشكل مفصل و
             ذالك بهدف إقناع الموقع بقبول النشر و أيضا من أجل 
            توفير معلومة جيدة تساعد على توعية الناس في تجنب و
             تفادي السقوط في فخ النصابين المدرجين على الموقع.
            </Para>

            <TitAbout>التوفر على حساب</TitAbout>
            <Para> 
            لا يمكن لأي كان أن ينشر على الموقع الموقع دون أن يتوفر 
            على حساب و ذالك للرفع من جودة و مصداقية المستخدمين.
            </Para>

            <TitAbout>التبليغات ذات مصداقية أكثر.</TitAbout>
            <Para>
            يجب أن تكون التبليغات غير كاذبة و ذات مصداقية
             و ذالك بإرفاقها بدلائل ملموسة مصورة و شرح المشكلة 
            و حيتاثها بشكل مفصل و ذالك بهذف إقناع الموقع بقبول النشر
             و أيضا توعية الناس لتفادي السقوط في مثل هذا المشكل.
            </Para>

            <TitAbout>التوفر على بروفايل</TitAbout>
            <Para>
            التوفر على بروفايل كامل يعطي 
            الأحقية للمبلغ عليه في التواصل مع المبلغ و ذالك إما عن طريق الهاتف أو 
            إحدى روابطه على مواقع التواصل الإجتماعي التي يضعها في البرفايل الخاص به، 
            و أيضا يزيد من مصداقيته و جديته بكونه شخص معروف كما أنه قد يحصل على
             عمل أو مهمة من إحدى العملاء الذين قد يجدون خدمة من الخدمات 
            التي يبحثون عنها ضمن الخدمات التي يقدمها صاحب البروفايل.
            </Para>

            <TitAbout>في حالة تعرضك للنصب على الأنتنت.</TitAbout>
            <Para>
            تبحث في جوجل عن موقع أونتي نصب و تقوم بفتح حساب لأن فتح الحساب مسألة 
            ضرورية من أجل السماح للمستخدمين بنشر تبليغاتهم عن النصابين. بعد فتح 
            الحساب تقوم بالضغط على التبليغ عن نصاب و ملئ جميع المعلومات الخاصة
             بالنصاب كالإسم و المدينة و الطريقة التي استعمل في النصب عليك و وضع 
            روابطه الشخصية، مع إرفاق هذه المعلومات هذه المعلومات بدلائل
             مصورة تتبث أنه فعلا أنه تم النصب عليك من طرف هذا الشخص.
            </Para>
            <Para>
             في مدة أقصاها 48 ساعة و بعد أن يتم التحقق آليا و يدويا
             من محتوى منشورك يتم إما الموافقة أو إلغاء منشورك
             إذا ما لم يتوافق مع شروط و سياسة الموقع.
            </Para>

            <TitAbout>مسح التبليغ</TitAbout>
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
            إمكانية مسح المنشور إذا ما تم التوصل 
            إلى اتفاق بين الطرفين المتنازين أي المُبلّغ و المبلغ عليه، 
            إذ يمكن للمبلغ أن يدخل على لوحة التحكم الخاصة به على 
            الموقع و الدخول على لائحة التبليغات التي قام بها منذ 
            أن قام بفتح حسابه على الموقع و اختيار الشخص الذي يريد
             إزالته من لائحة النصابين و الضغط على زر مشاهدة التفاصيل ثم المسح نهائيا.
            </Para>

            <TitAbout>في حالة الخطأ</TitAbout>
            <Para>
            في حالة ما تم وضعك ضمن لائحة النصابين على الموقع عن طريق الخطأ أو تعمدا من
             أجل الإسائة إلى سمعتك، يمكنك إبلاغ الموقع و ذالك عن طريق الضغط على 
            المنشور يعنيك و بعد ذالك الضغط على فتح نزاع و تملئ المعلومات 
            المطلوبة و تضغط على زر الإرسال و في أجل أقصاه 48 ساعة سيتم
             مراجعة طلبك و حذفك من الموقع بعد أن يتحقق أحد موظفينا من
             عدم توفر المبلغ أو المشتكي على دلائل كافية لنصبك عليه.
            </Para>
        </ContainerPrivacy>
    </ContainerGlob>
    )
}

export default TermsAndCondition

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
    margin-bottom: 10px;
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