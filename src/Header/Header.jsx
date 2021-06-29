import React,{useState,useEffect} from 'react'
import {AppBar,Tabs,Tab, Toolbar,Button } from '@material-ui/core'
import Logo from '../Assets/Logo1.png'
import {makeStyles} from '@material-ui/styles'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {auth} from '../firestore/firebase'

const useStyles= makeStyles({
    buttonContainer:{
        "&:hover":{
            backgroundColor: 'transparent'
        }
    },
    tabs:{
        marginLeft:'auto',
    },
    tab:{
        fontSize: '1rem',
        textTransform:'none',
        padding:0,
    },
    btn_signup:{
        backgroundImage: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
        borderRadius:'50px',
        padding:' 5px 25px',
        color:'white'
    },
    btn_login:{
        padding:' 5px 25px',
        color:'white',
        borderRadius:'50px',
        borderColor:'white',
        marginRight:'1rem'
    }
})

const Header = ({currentUser}) => {
    const classes=useStyles();
    const [value, setValue] = useState(0);

    useEffect(() => {
        if(window.location.pathname === '/' && value !==0)
            setValue(0)
        else if(window.location.pathname === '/allBlogs' && value !==1)
            setValue(1)

    }, [value])


    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
    return (
        <AppBar position='fixed' color='primary'>
            <Toolbar>
                <Button  className={classes.buttonContainer} disableRipple><img src={Logo} height='40px' width='40px' alt='company Logo'/></Button>
                <Tabs indicatorColor='primary' className={classes.tabs} value={value} onChange={handleChange}>
                    <Tab  disableRipple  className={classes.tab} onClick={()=>setValue(0)} component={Link} to='/' label='Home'/>
                   { currentUser ? (  currentUser.userRole === 'Admin' ? 
                    (<div>
                    <Tab disableRipple className={classes.tab} component={Link} onClick={()=>setValue(1)} to='/allBlogs' label='Blogs'/>
                    <Tab disableRipple className={classes.tab} component={Link} onClick={()=>setValue(1)} to='/n' label='ContentWriters'/>
                    </div>) :
                    <Tab disableRipple className={classes.tab} component={Link} onClick={()=>setValue(1)} to='/allBlogs' label='Blogs'/>)
                    : null
                   } 
                    <Tab disableRipple className={classes.tab} component={Link} to='/' label='AboutUs'/>
                </Tabs>
               {
                currentUser ? <Button variant='outlined' onClick={()=> auth.signOut()   } className={classes.btn_login}>Signout</Button> :<React.Fragment>
                <Button variant='outlined' component={Link} to='/login' className={classes.btn_login}>Login</Button>
                <Button variant='contained' component={Link} to='/signup' className={classes.btn_signup}>Signup</Button>
                </React.Fragment>
               }
            </Toolbar>
           
        </AppBar>
    )
}

const mapsStateToProps = state =>({
    currentUser : state.user.currentUser
})
export default connect(mapsStateToProps)(Header)
