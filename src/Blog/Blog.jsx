import React from 'react'
import {Grid, CardContent, Typography, Card, CardActions,IconButton} from '@material-ui/core'
import {makeStyles} from '@material-ui/styles'
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { green,red } from '@material-ui/core/colors';


const useStyles= makeStyles(({
    
    blogcontainer:{
        margin: '1rem',
        width: '300px',
        borderBottom:'5px solid #03fc94',
    }
  }))





const Blog = ({blogs,handleEditDialog,handleDelete}) => {

    const classes= useStyles();
    return (
        <React.Fragment>
            <Grid container >
                    {
                    blogs.map((blog,index)=>(
                        <Grid item component={Card} className={classes.blogcontainer}>
                            <CardContent>
                            <Typography  variant='h5' color="textSecondary" gutterBottom>
                            {blog.BlogTitle}
                            </Typography>
                            <Typography variant='body' color="textSecondary" gutterBottom>
                            {blog.BlogDescription}
                            </Typography>
                            </CardContent>
                            <CardActions>
                                <IconButton><EditIcon onClick={()=>handleEditDialog(blog)} style={{color: green[500]}}/></IconButton>
                                <IconButton><DeleteIcon onClick={()=>handleDelete(blog)} style={{color: red[500]}}/></IconButton>
                            </CardActions>

                        </Grid>
                    ))
                    }

            </Grid>
        </React.Fragment>
    )
}

export default Blog
