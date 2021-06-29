import React,{useState} from 'react'
import {TextField,Button,Dialog,DialogActions,DialogContent,DialogTitle,Slide} from '@material-ui/core';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

const EditBlog = ({blog,handleEditDialog,handleSaveEdit}) => {
    const [state,setState] = useState(blog);
    const handleChange = (event) => {
            setState({...state, [event.target.name] : event.target.value});
      };
    return(
        <React.Fragment>
    <Dialog
      open={true}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleEditDialog}
    >
      <DialogTitle>{"EDIT BLOG"}</DialogTitle>
      <DialogContent>
      <TextField
            autoFocus
            margin="dense"
            id="BlogTitle"
            label="BlogTitle"
            type="BlogTitle"
            name='BlogTitle'
            value={state.BlogTitle}
            onChange={handleChange}
            fullWidth
          />
            <TextField
            margin="dense"
            id="BlogDescription"
            label="BlogDescription"
            type="BlogDescription"
            name='BlogDescription'
            onChange={handleChange}
            value={state.BlogDescription}
            fullWidth
          />
      </DialogContent>
      <DialogActions>
        <Button onClick={()=>handleEditDialog(null)} variant='outlined'>
          Cancel
        </Button>
        <Button onClick={()=>handleSaveEdit(state)} variant='contained' color='primary'>
          Save
            </Button>
          </DialogActions>
        </Dialog>
        </React.Fragment>
    );
}

export default EditBlog
