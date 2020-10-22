import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemText from '@material-ui/core/ListItemText';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const StyledMenu = withStyles({
  paper: {
    border: '1px solid #d3d4d5',
  },
})((props) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'center',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'center',
    }}
    {...props}
  />
));

const StyledMenuItem = withStyles((theme) => ({
  root: {
    '&:focus': {
      backgroundColor: theme.palette.primary.main,
      '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
        color: theme.palette.common.white,
      },
    },
  },
}))(MenuItem);

export default function CustomizedMenus(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };


  return (
    <div>
      <Button
        aria-controls="customized-menu"
        aria-haspopup="true"
        variant="contained"
        color="red"
        onClick={handleClick}
      > 
        {props.myAccount}
      </Button>
      <StyledMenu
        id="customized-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        dir="rtl"
      >
        <StyledMenuItem onClick={handleClose}>
          <LinkTo to={props.linklogin}><ListItemText primary={props.login} /></LinkTo>
        </StyledMenuItem>
        {props.admintext ? <StyledMenuItem>
          <LinkTo to={props.linkadmin}><ListItemText primary={props.admintext} /></LinkTo>
        </StyledMenuItem> : null}

        <StyledMenuItem onClick={handleClose}>
        {props.canlogout && <LinkTo to={props.linkregister}  onClick={props.onLogout}><ListItemText primary={props.register} /></LinkTo>}
        </StyledMenuItem>
      </StyledMenu>
    </div>
  );
}

const LinkTo = styled(Link)`
color: #FFF;
text-decoration: none;
`