import React from 'react'
import './Signup.scss'
import {Button,TextField,Dialog,DialogActions,DialogContent,DialogContentText,DialogTitle,FormControl} from '@material-ui/core';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import Slide from '@material-ui/core/Slide';
import {useHistory} from 'react-router-dom'
import {auth,createUserProfileDocument} from '../firestore/firebase'


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Signup = () => {

  const history = useHistory();
  const [state, setState] = React.useState({
   role:'',
   emailAddress:'',
   password:'',
   userName:''
  });

  const handleChange = (event) => {
    const name = event.target.name;
    setState({
      ...state,
      [name]: event.target.value,
    });
  };

  const handleClose = () => {
    history.push('/')
  };

  const handleSignup= async ()=>{
    
    if(state.role==='') {
      alert('UserRole is mandatory. Please select the Role to complete the SignUp');
      return;
    }
    try{
    const {user} = await auth.createUserWithEmailAndPassword(state.emailAddress, state.password)
      createUserProfileDocument(user, {userRole: state.role, displayName: state.userName});
      history.push('./homepage');}
      catch(error){
        alert(error)
      }
  }


  return (
        <div>
                <Dialog
        open={true}
        TransitionComponent={Transition}
        keepMounted
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
        >
        <DialogTitle id="alert-dialog-slide-title">{'SIGNUP'}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
         <TextField
          autoFocus
          margin="dense"
          id="name"
          label="UserName"
          type="text"
          name='userName'
          value={state.userName}
          onChange={handleChange}
          fullWidth
        />
          <TextField
            autoFocus
            margin="dense"
            id="email"
            label="Email Address"
            type="email"
            name='emailAddress'
            value={state.emailAddress}
            onChange={handleChange}
            fullWidth
          />          
          
          <TextField
            margin="dense"
            id="password"
            label="Password"
            type="password"
            name='password'
            fullWidth
            value={state.password}
            onChange={handleChange}
          />
        <FormControl>
        <InputLabel htmlFor="role-native-simple">Role</InputLabel>
        <Select
          native
          value={state.age}
          onChange={handleChange}
          inputProps={{
            name: 'role',
            id: 'role-native-simple',
          }}
        >
          <option aria-label="None" value="" />
          <option value='Admin'>Admin</option>
          <option value='ContentWriter'>ContentWriter</option>
        </Select>
        </FormControl>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant='outlined' color="primary">
            Cancel
          </Button>
          <Button variant='contained' onClick={handleSignup}
            color="secondary">
            Signup
          </Button>
        </DialogActions>
      </Dialog>
            
        </div>
    )
}

export default Signup
