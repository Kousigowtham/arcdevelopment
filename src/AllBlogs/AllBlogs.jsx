import React,{useState, useEffect} from 'react'
import {Grid,Button} from '@material-ui/core'
import {makeStyles} from '@material-ui/styles'
import {TextField,Dialog,DialogActions,DialogContent,DialogTitle,Slide} from '@material-ui/core';
import {connect} from 'react-redux'
import {getBlobsByUser,createBlogForUser,getAllBlobs,saveBlog,deleteBlog} from '../firestore/firebase.js'
import Blog from '../Blog/Blog'
import EditBlog from '../EditBlog/EditBlog'
import Loading from '../Loading/Loading'

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const useStyles= makeStyles(theme=>({
    root:{
        backgroundColor:'#c7fffe'
    },
    btn_contain:{
      margin:'2rem 0 2rem 2rem',
    },
    btn:{
        backgroundColor:'#1c60e8',
        color:'white',
        "&:hover":{
            backgroundColor:'#1c60e8' 
        }   
    },
    blogcontainer:{
        margin: ' 0 1rem'
    },
    gridcontainer:{
      margin:'1rem'
    }
  }))


const AllBlogs = ({currentUser}) => {
    const classes= useStyles();
    const [Blogs, setBlogs]=useState(null);
    const [open, setOpen] = useState(false);
    const [EditDialog, setEditDialog]= useState(false);
    const [ActionBlog,setActionBlog]= useState(null);
    const [updated, setupdated] = useState(false);
    const [state, setState] = useState({
        blogTitle:'',
        blogDesc:''
       });

       const handleChange = (event) => {
        const name = event.target.name;
        setState({
          ...state,
          [name]: event.target.value,
        });
      };

const handleClickOpen = () => {
  setOpen(true);
};

const handleClose = () => {
  setOpen(false);
};

    const handleBlogCreate=()=>{
        if(currentUser !== null){
        createBlogForUser(currentUser.id,Blogs,state)
        }
        setState({
            blogTitle:'',
            blogDesc:''
           });
        handleClose();
        setupdated(true)

    }

    const handleEditDialog=(blog)=>{
      setEditDialog(previousState=>!previousState)
      setActionBlog(blog)
  }

  const handleSaveEdit = (blog)=>{
    saveBlog(blog, currentUser).then(()=>
                setupdated(true))
    setEditDialog(previousState=>!previousState)
}

const handleDelete=(blog)=>{
  const result = window.confirm("Are you sure, you want to delete?")
  if(result){
  deleteBlog(blog, currentUser).then(()=>
  setupdated(true))
}
}


  useEffect(()=>{
    const fullfill =async (BlogSnap) =>{
      const BlogsArray = await Promise.all(BlogSnap)
      var final=[];
      BlogsArray.forEach(blog=>{
        if(blog !== null)
          final.push(...blog);
      })
       setBlogs(final) 
    }

    if(updated===true){
    if(currentUser.userRole ==='ContentWriter'){
      getBlobsByUser(currentUser.id).then( userBlogs =>{
          setBlogs(userBlogs);
      })
      }else if(currentUser.userRole ==='Admin'){
          getAllBlobs().then( BlogSnap =>{
            fullfill(BlogSnap);

    })
      }
    }
      setupdated(false)
  },[updated,currentUser])

useEffect(()=>{

  const fullfill =async (BlogSnap) =>{
    const BlogsArray = await Promise.all(BlogSnap)
    var final=[];
    BlogsArray.forEach(blog=>{
      if(blog !== null)
        final.push(...blog);
    })
     setBlogs(final) 
  }

  if(currentUser !== null){
      if(currentUser.userRole ==='ContentWriter'){
    getBlobsByUser(currentUser.id).then( userBlogs =>{
        setBlogs(userBlogs);
    })
    }if(currentUser.userRole ==='Admin'){
        getAllBlobs().then( BlogSnap =>{
            fullfill(BlogSnap);
    })
  }
}
},[currentUser])



    return (
        <div>
                <Grid className={classes.gridcontainer}>
                    <Button variant='contained' onClick={handleClickOpen} className={classes.btn}>
                        Create
                    </Button>
                </Grid>
            { 
            (Blogs=== null || Blogs === undefined) ? <Loading/>
                :
                <Blog blogs={Blogs} handleDelete={handleDelete} handleEditDialog={handleEditDialog}/>
            }
    {EditDialog === true ? <EditBlog blog={ActionBlog}  handleSaveEdit={handleSaveEdit} handleEditDialog={handleEditDialog}/> : null}
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      aria-labelledby="alert-dialog-slide-title"
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle id="alert-dialog-slide-title">{"CREATE BLOG"}</DialogTitle>
      <DialogContent>
      <TextField
            autoFocus
            margin="dense"
            id="blogTitle"
            label="Title"
            type="text"
            name='blogTitle'
            value={state.blogTitle}
            onChange={handleChange}
            fullWidth
          />
      <TextField
            autoFocus
            margin="dense"
            id="blogDesc"
            label="Description"
            type="textarea"
            name='blogDesc'
            value={state.blogDesc}
            onChange={handleChange}
            fullWidth
          />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} variant='outlined'>
          Cancel
        </Button>
        <Button onClick={handleBlogCreate} className={classes.btn}>
          Create
            </Button>
          </DialogActions>
        </Dialog>
        </div>
    )
}

const mapsStateToProps=state=>({
    currentUser: state.user.currentUser
})

export default connect(mapsStateToProps)(AllBlogs);
