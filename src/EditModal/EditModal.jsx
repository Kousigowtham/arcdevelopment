import React,{useState} from 'react'
import {Select,TextField,FormControl,Button,InputLabel,Dialog,DialogActions,DialogContent,DialogTitle,Slide} from '@material-ui/core';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });


const EditModal =({EditDialog,handleEditDialog,writer,handleSaveEdit})=>{
    const [state,setState] = useState(writer);
    const handleChange = (event) => {
            setState({...state, userRole : event.target.value});
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
            id="blogTitle"
            label="UserName"
            type="text"
            name='blogTitle'
            value={state.displayName}
            disabled
            fullWidth
          />
            <TextField
            autoFocus
            margin="dense"
            id="Email"
            label="EmailAddress"
            type="email"
            name='blogTitle'
            value={state.email}
            disabled
            fullWidth
          />
        <FormControl>
        <InputLabel htmlFor="role-native-simple">Role</InputLabel>
        <Select
          native
          value={state.userRole}
          onChange={handleChange}
          inputProps={{
            name: 'userRole',
            id: 'role-native-simple',
          }}
        >
          <option aria-label="None" value="" />
          <option value='Admin'>Admin</option>
          <option value='ContentWriter'>ContentWriter</option>
        </Select>
        </FormControl>
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


export default EditModal;