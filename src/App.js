import React,{useEffect} from 'react'
import './App.css';
import {theme} from './MaterialUI/Theme'
import { ThemeProvider } from '@material-ui/core/styles'
import Header from './Header/Header'
import {BrowserRouter, Switch, Route, Redirect} from 'react-router-dom'
import Homepage from './Homepage/Homepage'
import AllBlogs from './AllBlogs/AllBlogs'
import {makeStyles} from '@material-ui/styles'
import {Toolbar} from '@material-ui/core'
import Loginpage from './Loginpage/Loginpage';
import Signup from './Signup/Signup';
import {connect } from 'react-redux';
import {setCurrentUser} from './Redux/UserReducer/userAction'
import ContentWriter from './ContentWriter/ContentWriter'
import {auth, createUserProfileDocument} from './firestore/firebase.js'


const useStyles= makeStyles(theme=>({
  toolbarContainer:{
    
  }
}))




function App({setCurrentUser,currentUser}) {
  const classes=useStyles(theme);

  useEffect(() => {
   
    auth.onAuthStateChanged(async userAuth=>{
  
      if(userAuth){
      const userRef= await createUserProfileDocument(userAuth);
      
        userRef.onSnapshot(snapshot=>{
          setCurrentUser({
                          id:snapshot.id,
                          ...snapshot.data()});
                            }); 
                            
                                                      
      }else{
        setCurrentUser(userAuth);
      }
    });

  
  }, [setCurrentUser])
  
  


  return (
    <ThemeProvider theme={theme}>
    <BrowserRouter>
      <Header/>
      <Toolbar/>
      <div className={classes.toolbarContainer}/>
      <Switch>
        <Route exact path='/' component={Homepage} />
        <Route exact path='/allBlogs'>
          {currentUser === null ? <Redirect to='/login'/> : <AllBlogs />}
        </Route>
        <Route exact path='/login' component={Loginpage} />
        <Route exact path='/signup' component={Signup} />
        <Route exact path='/contentwriters'>
          {currentUser === null ? <Redirect to='/login'/> : <ContentWriter/>}
        </Route>
      </Switch>
    </BrowserRouter>
    </ThemeProvider>
  );
}

const mapsStateToProps = state =>({
  currentUser : state.user.currentUser
})

const mapDispatchToProps = dispatch=>({

  setCurrentUser : user=> dispatch(setCurrentUser(user))

})

export default connect(mapsStateToProps,mapDispatchToProps)(App);

