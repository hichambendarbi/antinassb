import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import UpdatePost  from '../static/Layout_Posts/UpdatePost';

const ITEM_HEIGHT = 48;

const OptionEdit = ({post}) => {
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
          <MenuItem key={"تعديل"} onClick={handleShow}>
            <UpdatePost post={post}/>
          </MenuItem>
      </Menu>
    </div>
  );
}



export default OptionEdit