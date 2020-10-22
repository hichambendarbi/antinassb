import React, { useEffect, useState, Fragment } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import Post from '../Layout_Posts/Post'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getPostsByStatus, addNewPost } from '../../../controlers/post'
import PostItem from '../Layout_Posts/PostItem'
import NewConflict from '../Conflict/NewConflict'
import { ReactComponent as Wtp} from '../../imgs/whatsap.svg'

const Home = ({getPostsByStatus, post: { posts, loading }}) => {
    // Search State 
    const [more, setMore] = useState(20)
    // const [condition, setCondition] = useState(false)

    const [dataSearch, setdataSearch] = useState ({
        search: '',
        search2:'',
        search3:''
       })
 
       const {
         search,
         search2
         } = dataSearch;

         const onSearchCategory = (e, text) => {
            e.preventDefault()
            setdataSearch({
            ...dataSearch,
            search3:text}
            )
         }

         const onSearch = e => {
            setdataSearch({
              ...dataSearch,
               [e.target.name]:e.target.value}
               )
          }

    useEffect(()=> { 
        getPostsByStatus();
    }, [getPostsByStatus]);

        // Search Into Table Filter
        let Test=[];
   
        if (posts === null || loading) {
            // <div><ImgSpi alt="دلائل" src={require('../../imgs/spinner.gif')} /></div>
            console.log("Spinner")
        }else{
          Test = posts.filter(
        (post) => {
          const query = dataSearch.search.toLowerCase();
          const query2 = dataSearch.search2.toLowerCase();
          const query3 = dataSearch.search3.toLowerCase();
          return post.nameSpam.toLowerCase().indexOf(query)>=0 &&
          post.country.toLowerCase().indexOf(query2)>=0 &&
          post.category.toLowerCase().indexOf(query3)>=0
        }
          );
        }
        
        var PaginationPosts = Test.splice(0,more)
        
        
        const onMore = (e) => {
            if(PaginationPosts.length>= more)
                setMore(more + 20)
                PaginationPosts = Test.splice(0, more)
        }

    return ( 
      
            <HomeContainer>
            <ContainerAds href="https://wa.me/+212657962008"> 
                  <BannerAds alt="ADS publicit" src={require('../../imgs/ADS_CREATOR_WEB_SITE.jpg')} />
            </ContainerAds>
        <div className="centertext">
            {/* <h1>بلاك ليست</h1> */}
            <p>لن يتعرض أحد للنصب بعد الآن</p>
         </div>
         <Post /> 
         <WhatsappContact href="https://wa.me/+212690824703"> 
         <Wtp width="20px" height="20px" fill="green"/>
        ! المساعدة
         </WhatsappContact>
         <SectiionSearch>  
         <DivsInputs>
             <InputSearch placeholder="ابحث عن نصاب" name="search" value={search} onChange={e=> onSearch(e)}  dir="rtl"/>
         </DivsInputs>
             <DivsInputs>
             <ComSlect className="select">
                <SelectOpts  name="search2" value={search2} onChange={e=> onSearch(e)} id="format" dir="rtl">
                    <OptionSearch selected value="" >جميع المدن</OptionSearch>
                    <OptionSearch value="سطات" >
                        سطات   
                    </OptionSearch>
                    <OptionSearch value="أكادير">
                        أكادير
                    </OptionSearch>
                    <OptionSearch value="أصيلة">
                        أصيلة   
                    </OptionSearch>
                    <OptionSearch value="أزرو">
                         أزرو
                    </OptionSearch>       
                    <OptionSearch value="أزيلال">
                        أزيلال 
                    </OptionSearch>
                    <OptionSearch value="أزمور">
                        أزمور 
                    </OptionSearch>
                    <OptionSearch value="بني ملال">
                        ابني ملالت 
                    </OptionSearch>
                    <OptionSearch value="بركان">
                        بركان 
                    </OptionSearch>
                    <OptionSearch value="بن طيب"> 
                       بن طيب 
                    </OptionSearch>
                    <OptionSearch value="الدار البيضاء"> 
                    الدار البيضاء 
                    </OptionSearch>
                    <OptionSearch value="شفشاون"> 
                    شفشاون 
                    </OptionSearch>
                    <OptionSearch value="الجديدة"> 
                    الجديدة 
                    </OptionSearch>
                    <OptionSearch value="الرشيدية"> 
                    الرشيدية 
                    </OptionSearch>
                    <OptionSearch value="الصويرة"> 
                    الصويرة 
                    </OptionSearch>
                    <OptionSearch value="فكيك"> 
                    فكيك 
                    </OptionSearch>
                    <OptionSearch value="فاس"> 
                    فاس 
                    </OptionSearch>
                    <OptionSearch value="كلميم"> 
                    كلميم 
                    </OptionSearch>
                    <OptionSearch value="الحسيمة"> 
                    الحسيمة 
                    </OptionSearch>
                    <OptionSearch value="إفران"> 
                    إفران 
                    </OptionSearch>
                    <OptionSearch value="إمزور"> 
                    إمزور 
                    </OptionSearch>
                    <OptionSearch value="إنزكان"> 
                    إنزكان 
                    </OptionSearch>
                    <OptionSearch value="القنيطرة"> 
                    القنيطرة 
                    </OptionSearch>
                    <OptionSearch value="الخميسات"> 
                    الخميسات 
                    </OptionSearch>
                    <OptionSearch value="خنيفرة"> 
                    خنيفرة 
                    </OptionSearch>
                    <OptionSearch value="خريبكة"> 
                    خريبكة 
                    </OptionSearch>
                    <OptionSearch value="القصر الكبير"> 
                    القصر الكبير 
                    </OptionSearch>
                    <OptionSearch value="العرائش"> 
                    العرائش 
                    </OptionSearch>
                    <OptionSearch value="مراكش"> 
                    مراكش 
                    </OptionSearch>
                    <OptionSearch value="مكناس"> 
                    مكناس 
                    </OptionSearch>
                    <OptionSearch value="المحمدية"> 
                    المحمدية 
                    </OptionSearch>
                    <OptionSearch value="ناظور"> 
                    ناظور 
                    </OptionSearch>
                    <OptionSearch value="ورززات"> 
                    ورززات 
                    </OptionSearch>
                    <OptionSearch value="وجدة"> 
                    وجدة 
                    </OptionSearch>
                    <OptionSearch value="الرباط"> 
                    الرباط 
                    </OptionSearch>
                    <OptionSearch value="أسفي"> 
                    أسفي 
                    </OptionSearch>
                    <OptionSearch value="سلا"> 
                    سلا 
                    </OptionSearch>
                    <OptionSearch value="صفرو"> 
                    صفرو 
                    </OptionSearch>
                    <OptionSearch value="طنجة"> 
                    طنجة 
                    </OptionSearch>
                    <OptionSearch value="طانطان"> 
                    طانطان 
                    </OptionSearch>
                    <OptionSearch value="طرفايا"> 
                    طرفايا 
                    </OptionSearch>
                    <OptionSearch value="تارودانت"> 
                    تارودانت 
                    </OptionSearch>
                    <OptionSearch value="تازة"> 
                    تازة 
                    </OptionSearch>
                    <OptionSearch value="تطوان"> 
                    تطوان 
                    </OptionSearch>
                    <OptionSearch value="تنزيت"> 
                    تنزيت 
                    </OptionSearch>
                    <OptionSearch value="زاكورة"> 
                    زاكورة 
                    </OptionSearch>
                </SelectOpts>
             </ComSlect>
             </DivsInputs>
         </SectiionSearch>
         {/* Cards Categoogy */}
         <SectionCategorys>
             {/* Line 1 */}
             <ContainerCards>
                <CardsCategorys>
                    <LinkCat to="/serach" onClick={(e)=> onSearchCategory(e, "تجارة")}>
                      تجارة 
                    </LinkCat>
                </CardsCategorys>
                <CardsCategorys>
                    <LinkCat to="/serach" onClick={(e)=> onSearchCategory(e, "موقع")}>
                    موقع </LinkCat>
                    </CardsCategorys>
                <CardsCategorys>
                    <LinkCat to="/serach" onClick={(e)=> onSearchCategory(e, "إيباي")}>
                    إيباي</LinkCat>
                </CardsCategorys>
                <CardsCategorys> 
                    <LinkCat to="/serach" onClick={(e)=> onSearchCategory(e, "")}>
                    الكل</LinkCat>
                </CardsCategorys>
             </ContainerCards>
            
             {/* Line 3 */}
             <ContainerCards>
                <CardsCategorys><LinkCat to="/serach" onClick={(e)=> onSearchCategory(e, "بايبال")}>
                    بايبال</LinkCat></CardsCategorys>
                <CardsCategorys><LinkCat to="/serach" onClick={(e)=> onSearchCategory(e, "مُشغل")}>
                    مُشغل</LinkCat></CardsCategorys> 
                <CardsCategorys><LinkCat to="/serach" onClick={(e)=> onSearchCategory(e, "خدمات")}>
                    خدمات </LinkCat></CardsCategorys>
                <CardsCategorys>
                 <LinkCat to="" onClick={e=>onSearchCategory(e, "يوتيوب")}>
                    يوتيوب
                 </LinkCat>
                 </CardsCategorys>
             </ContainerCards>
         </SectionCategorys> 
         <SectionSpamer dir="rtl"> 
             <SectionList> 
             <TitleList>
                 <Titleh>أشهر نصابين العالم العربي</Titleh>
             </TitleList>
             
             {loading ? <div><ImgSpi alt="دلائل" src={require('../../imgs/spinner.gif')} /></div> : (
             <Fragment>
                     {PaginationPosts.map(post => (
                         <PostItem status={post.status} key={post._id} post={post} id={post._id}/>
                     ))}
            </Fragment>
             )}
             {posts.length===0 ? <div></div> : <ButtonMore onClick={(e)=> onMore(e)}>المزيد +</ButtonMore>}
             </SectionList>
             <SectionPub> 
                 <SpanPub>أنا لست نصاب هناك خطب ما </SpanPub>
                 <ParaPub>هل تريد فتح نزاع ؟</ParaPub>
                 <NewConflict text='من هنا'/>
                 <ImgCorona alt="دلائل" src={require('../../imgs/corona.PNG')}/>
                 <ImgCorona alt="ads" src={require('../../imgs/adshome.jpg')} style={{height:"300px"}}/>      
             </SectionPub>
         </SectionSpamer>
         </HomeContainer>
       
         
    )
}

Home.propTypes = {
    getPostsByStatus: PropTypes.func.isRequired,
    addNewPost: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    post: state.post
})

export default connect(mapStateToProps, {getPostsByStatus, addNewPost}) (Home)


const HomeContainer = styled.div`
min-height: 200vh;
@media(max-width: 620px) {
    padding-top: 70px;
   }
`


const ContainerAds = styled.a`
display: flex;
justify-content: center;
margin: 10px 150px 20px 150px;
text-decoration: none;
cursor: pointer;
@media(max-width: 620px) {
    margin: 0px 0px 15px 0px;
    height: auto;
}
`

const BannerAds= styled.img`
cursor: pointer;
@media(max-width: 1300px) {
    width: 100%;
}
`

const ImgSpi = styled.img`
height: 100px;
`

const ImgCorona = styled.img`
margin-top: 30px;
border: 1px solid #e6e4e4;
@media(max-width: 1200px) {
    display: none;
}
`

const InputSearch = styled.input`
width: 100%;
border: none;
height: 100%;
border-radius: 5px;
background: none;
padding: 0 10px;
color: #2b2e2e;
::placeholder{
    color: #2b2e2e;
    font-size: 1.1em;
    font-weight: 700;
}
@media(max-width: 500px) {
    FONT-SIZE: 12px;
    ::placeholder{
        font-weight: 400;
    }
}
`

const SectiionSearch = styled.div`  
display: flex;
width: auto;
margin: 15px 150px 20px 150px;
background: #343a402e;
height: 120px;
border-radius: 5px;
justify-content: space-around;
align-items: center;
box-shadow: 0 3px 4px 1px #343a4078;
border: 1px solid gray;
@media(max-width: 900px) {
    margin: 80px 50px 20px 50px; 
    height: auto;
}
@media(max-width: 620px) {
    margin: 20px 10px 20px 10px;
    justify-content: space-between;
    // padding-right: 5px;
}
`

const OptionSearch = styled.option`
background-color: #2b2e2e;
color: #FFF;
`

const DivsInputs = styled.div`
display: flex;
height: 50px;
width: 35%;
border: 2px solid #343a40;
border-radius: 5px;
background: #FFF;
@media(max-width: 900px) {
    width: 45%;
    border: none;
    border-right: 2px solid #b9bcc0;
}
`

const SelectOpts = styled.select`
appearance:none;
outline:0;
box-shadow:none;
border:0!important;
background: transparent;
background-image: none;
flex: 1;
padding: .8em 0.8em;
color: #2b2e2e;
cursor: pointer;
font-size: 1.1em;
font-family: 'Open Sans', sans-serif;
@media(max-width: 700px) {
    padding: 0 20px 0 0;
    font-size: .9em;
}
@media(max-width: 360px) {
    padding: 0 10px 0 0;
    font-size: .8em;
}
`

const ComSlect = styled.div`
position: relative;
display: flex;
width: 100%;
height: 3em;
line-height: 3;
background: transparent;
overflow: hidden;
border-radius: .25em;
`

// Styling Categorys Cards
const SectionCategorys = styled.div`
display: flex;
width: auto;
height: 240px;
margin: 0px 150px;
justify-content: space-around;
align-items: center;
background: #090a0b;
flex-direction: column;
border-radius: 5px;
// box-shadow: 0 3px 4px 1px #343a4078;
@media(max-width: 900px) {
    margin: 0px 50px; 
}
@media(max-width: 620px) {
    margin: 0px 10px; 
}
@media(max-width: 500px) {
    height: 100px;
}

`

const ContainerCards = styled.div`
    display: flex;
    width: 100%;
    justify-content: space-around;
    align-items: center;
`

const CardsCategorys = styled.div`
    display: flex;
    width: 22%;
    height: 80px;
    border: 1px solid #607D8B;
    border-radius: 5px;
    @media(max-width: 500px) {
        height: 40px;
    }
`

const LinkCat = styled(Link)`
text-decoration: none;
font-size: 25px;
width: 100%;
height: 100%;
display: flex;
align-items: center;
justify-content: center;
font-weight: 700;
transition: .5s;
color: gray;
:hover {
    font-size: 22px;
}
@media(max-width: 620px) {
    font-size: 11px;
    font-weight: 600;
    :hover {
        font-size: 13px;
    }
}
`

// Styling List des spamer
const SectionSpamer = styled.div`
margin: 0px 150px;
background: none;

display: flex;
justify-content: space-between;
@media(max-width: 1200px) {
    flex-direction: column;
    height: auto;
    flex-direction: COLUMN-REVERSE;
}
@media(max-width: 900px) {
    margin: 0px 50px;
}
@media(max-width: 620px) {
    margin: 0px 10px;
}
`

const TitleList = styled.div`
width: 98%;
align-items: flex-start;
display: flex;
margin-bottom: 15px;
@media(max-width: 500px) {
    margin-bottom: 0px;
}
`

const Titleh = styled.h1`
color: #090a0b;
font-size: 20px;
@media(max-width: 500px) {
    font-size: 15px;
}
`
 
const SectionList = styled.div`
background: #fff;
border: 1px solid #d6cfcf; 
height: fit-content;
margin: 10px 0 16px;
padding: 0 17px 15px;
width: 70%;
display: flex;
flex-direction: column;
align-items: center;
@media(max-width: 1200px) {
    width: 100%;
}
@media(max-width: 620px) {
 background: none;
}
@media(max-width: 500px) {
    width: 100%;
    margin: 0;
    padding: 0;
    border: none;
}
`

const SectionPub = styled.div`
width: 25%;
height: fit-content;
background: #090a0b;
display: flex;
margin-top: 10px;
border-radius: 5px;
flex-direction: column;
text-align: center;
padding-top: 10px;
@media(max-width: 1200px) {
    margin-top: 0px;
    width: auto;
    flex-direction: row;
    align-items: center;
    justify-content: right;
    background: none;
}

@media(max-width: 450px) {
font-size: 12px;
}


@media(max-width: 375px) {
    font-size: 12px;
    }

    @media(max-width: 340px) {
        font-size: 10px;
        }
`

const SpanPub = styled.span`
color: #FFF;
@media(max-width: 1200px) {
    color: #090a0b;
    margin-left: 30px;
}
@media(max-width: 450px) {
    margin-left: 10px;
}
`

const ParaPub = styled.p`
color: #FFF;
@media(max-width: 1200px) {
    color: #090a0b;
    margin-left: 10px;
}
`

const ButtonMore = styled.button`
background: #e66e07;
padding: 5px 30px;
margin-top: 20px;
margin-bottom: 20px;
border-radius: 5px;
border: 1px solid gray;
color: #161819;
font-weight: 600;
cursor: pointer;
transaction: 0.3s;
:hover {
    background: #343a402e;
}
`

const WhatsappContact = styled.a`
width: 100px;
height: 50px;
box-shadow: rgba(0, 0, 0, 0.3) 0px 4px 12px;
background: rgb(255, 255, 255);
border-radius: 15px 0px 0px 0px;
display: flex;
padding: 0px 4px;
-webkit-box-align: center;
align-items: center;
position: fixed;
bottom: 0;
margin-right: 10px;
right: 0;
color: rgb(0, 0, 0);
text-decoration: none;
justify-content: space-between;
z-index: 1;
font-weight: bold;
@media(max-width: 500px) {
    display: none;
}
`
