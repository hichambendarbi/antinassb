import React, { Fragment } from 'react';
import styled from 'styled-components';
import { Link, useLocation } from 'react-router-dom';
import CustomizedMenus from './Menu';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../../controlers/auth' ;
import Administration from '../admin/Administration';
import { ReactComponent as Logo} from '../../imgs/antinassb3.svg';
import { ReactComponent as MenuMobile} from '../../imgs/menu-btn.svg';
import { ReactComponent as Logout} from '../../imgs/logout.svg';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';


const useStyles = makeStyles({
    list: {
      width: 250,
    },
    fullList: {
      width: 'auto',
    },
  });

export const Navbar = ({auth: { isAuthenticated, loading, user}, logout, history}) => {
        let location = useLocation();



        var namesplity = ''
        if(user && user.name) {
            namesplity = user.name.split(' ');
        }

        const classes = useStyles();
        const [state, setState] = React.useState({
          right: false,
        });
      
        const toggleDrawer = (anchor, open) => (event) => {
          if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
          }
          setState({ ...state, [anchor]: open });
        };

        const list = (anchor) => (
            <div
              className={clsx(classes.list, {
                [classes.fullList]: anchor === 'top' || anchor === 'bottom',
              })}
              role="presentation"
              onClick={toggleDrawer(anchor, false)}
              onKeyDown={toggleDrawer(anchor, false)}
            >
                <List>
                  <ListItem button>
                  {isAuthenticated && user && <BtnMobile to="/dashboard">{user && user.name && namesplity[1]} </BtnMobile>} 
                  {!isAuthenticated && !user && <BtnMobile to="تسجيل-الدخول">تسجيل الدخول</BtnMobile>} 
                  </ListItem>
                  <ListItem button>
                    <LinkToProd to='/لائحة-النصابين'>
                      لائحة النصابين</LinkToProd> 
                  </ListItem>
                  <ListItem button>
                    <LinkToProd to='/من-نحن'>
                      من نحن ؟
                      </LinkToProd>
                  </ListItem>
                  <ListItem button>
                   <LinkToProd to='/تواصل-معنا'>
                     تواصل معنا</LinkToProd> 
                  </ListItem>
              </List>
              <Divider />
              {isAuthenticated && user && user.admin && <ListItem button><LinkToProd to='/administration'>لوحة التحكم</LinkToProd> </ListItem>}
              {isAuthenticated && user && <ListItem button> <LinkToProd onClick={()=> logout()}>
                  <Logout width="30px" heigth="30px" fill="red"/>
                </LinkToProd></ListItem>}
            {!isAuthenticated && !user && <ListItem button> <LinkToProd to='حساب-جديد'>حساب جديد</LinkToProd></ListItem>}
            </div>
          );


    return (
        <Fragment>
            {location.pathname==="/administration" || location.pathname===`/administration/verifyNewPoste` ||
            location.pathname===`/administration/msg` || location.pathname===`/administration/advertising` ||
            location.pathname===`/administration/conflicts`
            ? <Administration/> : 
            <Header> 
                <LinksComponent> 
                <LinkToProd to='/من-نحن'>
                من نحن ؟</LinkToProd>
                    <LinkToProd to='/تواصل-معنا'>
                      تواصل معنا</LinkToProd> 
                    <LinkToProd to='/لائحة-النصابين'>
                      لائحة النصابين</LinkToProd>
                    <BtnAuth> 
                        {isAuthenticated && user && user.admin &&
                        <CustomizedMenus canlogout onLogout={logout} linklogin="/dashboard" linkadmin="/administration" admintext="لوحة التحكم" linkregister="/" myAccount={user && user.name && namesplity[1]}  login="حسابي" register="تسجيل الخروج"/>} 
                        {isAuthenticated && user && user.admin===false &&
                        <CustomizedMenus canlogout onLogout={logout} linklogin="/dashboard"  linkregister="/" myAccount={user && user.name}  login="حسابي" register="تسجيل الخروج"/>} 
                        {!isAuthenticated && <CustomizedMenus canlogout linklogin="تسجيل-الدخول" linkregister="حساب-جديد" myAccount="حسابي"  login="تسجيل الدخول" register="حساب جديد"/>}  
                    </BtnAuth>
                </LinksComponent> 
                {/*Start MObile navbar version */}
                <LinksComponentMobile>
                
                          <Fragment >
                            <Button onClick={toggleDrawer("right", true)}>
                                <MenuMobile fill="black" width="35px" height="40px" />
                            </Button>
                            <Drawer anchor={"right"} open={state["right"]} onClose={toggleDrawer("right", false)} >
                                {list("right")}
                            </Drawer>
                          </Fragment>
                     
                </LinksComponentMobile>
                {/* End Mobile navbar versuon */}
                   {/* <LinkToProd to='/'><LogoComponent>بلاك ليست</LogoComponent></LinkToProd> */}
                   <LinkToProdLogo to='/'> 
                      <LogoText>Antinassb</LogoText>
                      <Logo  height="40px"/>
                </LinkToProdLogo>
            </Header> 
            }
        </Fragment>

    )     
}
 
Navbar.propTypes = {  
    logout: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(mapStateToProps, {logout})(Navbar)

const Header = styled.div`
width: 100%;
height: 60px;
background: #ffffff;
display: flex;
justify-content: space-between;
padding: 0 150px;
direction: rtl;
box-shadow: 0 2px 4px -2px #343a405c;
margin-bottom: 15px;
@media(max-width: 900px) {
    padding: 0 50px;
}
@media(max-width: 620px) {
    justify-content: space-between;
    padding: 0 10px;
    position: fixed;
    top: 0;
    z-index: 1;

}
`


const LinksComponent = styled.div`
display: flex;
height: 100%;
align-items: center;
direction: ltr;
 @media(max-width: 915px) {
  display: none;
  }
// @media(max-width: 620px) {
//     align-items: center;
//     justify-content: space-between;
//     width: 100%;
//     margin-bottom: 5px;
// }
`

const LinksComponentMobile = styled.div`
display: none;
height: 100%;
align-items: center;
direction: ltr;
color: #FFF;
fonnt-size: 20px;
 @media(max-width: 915px) {
  display: flex;
  }
`

const LinkToProd = styled(Link)`
cursor: pointer;
color: #646363;
margin-left: 10px;
text-decoration: none; 
font-size: 20px;
font-weight: 500;
margin-left: 25px;
:hover {
    color: #e66e07;
}
@media(max-width: 950px) {
    font-size: 17px;
    color: black;
    width: 100%;
    justify-content: center;
    display: flex;
    margin: 3px 0;
    border: 1px solid #80808073;
    padding: 5px;
}

`

const LinkToProdLogo = styled(Link)`
cursor: pointer;
color: black;
text-decoration: none; 
font-size: 20px;
font-weight: 500;
display: flex;
align-items: center;
`

const BtnAuth = styled.button`
    cursor: pointer;
    font-size: 16px;
    font-weight: 500;
    background: none;
    border: none;
    border-radius: 2px;
    margin-left: 25px;
:hover {
    color: #e66e07;
}
@media(max-width: 620px) {
    margin: 0;
}`

const BtnMobile = styled(Link)`
color: #e66e07;
width: 100%;
height: 40px;
display: flex;
align-items: center;
justify-content: center;
text-decoration: none;
font-size: 20px;
font-weight: 700;
padding-bottom: 2px;
border-radius: 3px;
box-shadow: 0px 3px 1px -2px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 1px 5px 0px rgba(0,0,0,0.12);
`
const LogoText= styled.h1`
font-size: auto;
cursor: pointer;
font-size: 20px;
`