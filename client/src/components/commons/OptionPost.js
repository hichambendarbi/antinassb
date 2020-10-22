import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import styled from 'styled-components'

const OptionPost = (props) => {
  const [open, setOpen] = React.useState(false);
  const [scroll, setScroll] = React.useState('paper');

  const handleClickOpen = (scrollType) => () => {
    setOpen(true);
    setScroll(scrollType);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const descriptionElementRef = React.useRef(null);
  React.useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

  return (
    <div>
      <Button onClick={handleClickOpen('paper')}>شاهد الدلائل</Button>
      <Dialog
        open={open}
        onClose={handleClose}
        scroll={scroll}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle id="scroll-dialog-title" style={{direction: "rtl"}}>دلائل مادية</DialogTitle>
        <DialogContent dividers={scroll === 'paper'} style={{textAlign: "center"}}>
            {props.preuves ? props.preuves.map(prv=> <ImgP src= {prv} alt="Spammer dalil"/>)  : "ليست هناك أية دلائل"}
          
        </DialogContent>
        <DialogActions>
          <Button id="returnDis" onClick={handleClose} color="primary" styled={{fontWeight: "800px !important", fontSize: "20px"}}>
             عودة   
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default OptionPost


const ImgP = styled.img`
width: 90%;
`