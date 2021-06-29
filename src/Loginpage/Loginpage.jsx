import React,{useEffect,useState} from 'react'
import './Loginpage.scss'
import {Button,TextField,Dialog,DialogActions,DialogContent,DialogContentText,DialogTitle} from '@material-ui/core';
import Slide from '@material-ui/core/Slide';
import {useHistory} from 'react-router-dom'
import {auth} from '../firestore/firebase'
import {connect} from 'react-redux'


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Loginpage = ({currentUser}) => {

  const history = useHistory();
  const [openDialog, setopendialog] = useState(true)
  const [state, setState] = React.useState({
   emailAddress:'',
   password:''
  });


useEffect(() => {
  if(currentUser!== null && currentUser !== undefined)
        setopendialog(false)
  else
        setopendialog(true)
}, [currentUser])


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
    
  const handleLogin= async ()=>{
      const {user} = await auth.signInWithEmailAndPassword(state.emailAddress, state.password)
      
      if(user)
        history.push('/')

  }

  return (
        <React.Fragment>
                <Dialog
        open={openDialog}
        TransitionComponent={Transition}
        keepMounted
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">{'Login'}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
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
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant='outlined' color="primary">
            Cancel
          </Button>
          <Button variant='contained'  onClick={handleLogin} color="secondary">
            Login
          </Button>
        </DialogActions>
      </Dialog>
            
        </React.Fragment>
    )
}

const mapsStateToProps = state =>({
  currentUser : state.currentUser
})
export default connect(mapsStateToProps)(Loginpage)
