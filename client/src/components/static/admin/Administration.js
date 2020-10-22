import React, { useState } from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import CssBaseline from '@material-ui/core/CssBaseline';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MailIcon from '@material-ui/icons/Mail';
import SupervisedUserCircleIcon from '@material-ui/icons/SupervisedUserCircle';
import EqualizerIcon from '@material-ui/icons/Equalizer';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import AllPosts from '../ApplicationDashbord/AllPosts';
import AllAdvertising from '../ApplicationDashbord/AllAdvertising';
import AllMessages from '../ApplicationDashbord/AllMessages';
import styled from 'styled-components';
import { withRouter, Link, useLocation } from 'react-router-dom';
import PosteVerifi from '../ApplicationDashbord/PosteVerifi';
import AllConflicts from '../ApplicationDashbord/AllConflicts';
import { ReactComponent as ConflictIcon} from '../../imgs/conflict.svg'
import { ReactComponent as AdvertisingIcon} from '../../imgs/ads.svg'
import { ReactComponent as ScamIcon} from '../../imgs/scam.svg'
import { ReactComponent as PromotionIcon} from '../../imgs/promotion.svg'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { logout } from '../../../controlers/auth' 

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginRight: drawerWidth,
  },
  title: {
    flexGrow: 1,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-start',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginRight: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginRight: 0,
  },
}));

const Administration = ( {auth: { isAuthenticated, loading, user}, logout,match, history}) => {
  const [postPage, setPostPage] = useState(true)
  const [messagePage, setMessagePage] = useState(false)
  const [adsPage, setAdsPage] = useState(false)
  const [conflictPage, setConflictPage] = useState(false)
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false); 

  const showPage = (inde) => {
    if(inde==="post") {
      setPostPage(true)
      setMessagePage(false)
      setAdsPage(false)
      setConflictPage(false)
      history.push('/administration')
    }
    if(inde==="msg") {
      setMessagePage(true)
      setPostPage(false)
      setAdsPage(false)
      setConflictPage(false)
      history.push('/administration/msg')
    }
    if(inde==="ads") {
      setAdsPage(true)
      setMessagePage(false)
      setPostPage(false)
      setConflictPage(false)
      history.push('/administration/advertising')
    }

    if(inde==="conflict") {
      // setConflictPage(true)
      // setAdsPage(false)
      // setMessagePage(false)
      // setPostPage(false)
      history.push('/administration/conflicts')
    }

  }

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  let location = useLocation();


  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          
          <Typography variant="h6" noWrap className={classes.title} id="head_admini">
            {isAuthenticated ?
                       <Linkt  onClick={()=> history.push('/')}>
                           {user && user.name} 
                       </Linkt> : 
                        <Linkt to='/'>
                          غير متصل
                        </Linkt> 
            }

          <Linkt to='/' style={{marginRight: "10px"}}>
              بلاك ليست
          </Linkt>
          </Typography>
         
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="end"
            onClick={handleDrawerOpen}
            className={clsx(open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        <div className={classes.drawerHeader} />
        {location.pathname===`/administration/verifyNewPoste` && <PosteVerifi/>}
        {location.pathname===`/administration/msg` && <ContainerPost><AllMessages /></ContainerPost>}
        {location.pathname===`/administration/advertising` && <ContainerPost><AllAdvertising /></ContainerPost>}
        {location.pathname===`/administration/conflicts` && <ContainerPost> <AllConflicts/> </ContainerPost>}
        {location.pathname==="/administration" && <ContainerPost>{postPage && <AllPosts />}</ContainerPost>}
      </main>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="right"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </div>
        <Divider />
        <List>

        <ListItem button onClick={()=> showPage("post")}>
            <ListItemIcon><ScamIcon width="25px" height="25px" fill="#757575"/></ListItemIcon>
            <ListItemText>تبليغات جديدة</ListItemText>
          </ListItem>
           
           <ListItem button onClick={()=> showPage("msg")}>
            <ListItemIcon><MailIcon /></ListItemIcon> 
            <ListItemText>الرسائل</ListItemText>
          </ListItem> 

          <ListItem button onClick={()=> showPage("ads")}>
            <ListItemIcon><PromotionIcon width="25px" height="25px" fill="#757575"/></ListItemIcon>
            <ListItemText>طلبات الإعلانات</ListItemText>
          </ListItem>

          <ListItem button onClick={()=> showPage("conflict")}>
            <ListItemIcon><ConflictIcon width="30px" height="30px" fill="#757575"/></ListItemIcon>
            <ListItemText>الشكايات</ListItemText>
          </ListItem>

          <ListItem button>
            <ListItemIcon><AdvertisingIcon width="25px" height="25px" fill="#757575"/></ListItemIcon>
            <ListItemText>الإعلانات</ListItemText>
          </ListItem>

          <ListItem button>
            <ListItemIcon><SupervisedUserCircleIcon /></ListItemIcon>
            <ListItemText>المستخذمين</ListItemText>
          </ListItem>

        </List>
        <Divider />
        <List>
          <ListItem button>
            <ListItemIcon><EqualizerIcon /></ListItemIcon>
            <ListItemText>الإحصائيات</ListItemText>
          </ListItem>

          <ListItem button>
            <ListItemIcon><AccountBoxIcon /></ListItemIcon>
            <ListItemText>حسابي</ListItemText>
          </ListItem>

        </List>
      </Drawer>
    </div>
  );
}

Administration.propTypes = {  
  logout: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
auth: state.auth
})

export default connect(mapStateToProps, {logout})(withRouter(Administration)) 

const ContainerPost = styled.div`
width: 100%;
margin-top: 20px;
`

const Linkt = styled(Link)`
text-decoration: none;
color: #FFF;
`