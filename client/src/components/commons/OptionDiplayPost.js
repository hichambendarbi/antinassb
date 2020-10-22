import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import NewConflict from '../static/Conflict/NewConflict';
import ProfileUser from './ProfileUser';



const ITEM_HEIGHT = 48;

const OptionDiplayPost = (props) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleShow = () => {
    setAnchorEl(null);
  }

  return (
    <div>
      <IconButton
        aria-label="more"
        aria-controls="long-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="long-menu"
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: '20ch',
            direction: 'rtl'
          },
        }}
      >
          <MenuItem key={"تعديل"} onClick={handleShow} style={{height: "36px"}}>
             <ProfileUser id_user={props.id_user} nm={props.nm}/>
          </MenuItem>
          <MenuItem key={"حذف"} style={{height: "36px"}}>
             <NewConflict text="فتح نزاع"/>
          </MenuItem>
      </Menu>
    </div>
  );
}


export default OptionDiplayPost