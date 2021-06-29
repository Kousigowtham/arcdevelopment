import React,{useState,useEffect} from 'react'
import {connect} from 'react-redux'
import {getWriterList,saveWriter,deleteWriter} from '../firestore/firebase.js'
import {TableContainer,Table,TableHead,TableRow,TableCell,Paper,TableBody} from '@material-ui/core'
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { green,red } from '@material-ui/core/colors';
import {makeStyles} from '@material-ui/styles'
import EditModal from '../EditModal/EditModal'
import Loading from '../Loading/Loading'

const useStyles= makeStyles(theme=>({
    table:{
        margin: 'auto',
        marginTop:'2rem',
        width:'90%'
    },
    tableheader:{
        fontSize:'1.1rem',
        fontWeight:700,
    }
  }))

  
const ContentWriter =({currentUser})=>{
    const classes =useStyles();
    const [writerList, setwriterList]= useState(null);
    const [EditDialog, setEditDialog]= useState(false);
    const [writer, setwriter]= useState(null);
    const [updated, setupdated] = useState(false);

    const handleEditDialog=(writer)=>{
        setEditDialog(previousState=>!previousState)
        setwriter(writer)
    }

    const handleSaveEdit = (writer)=>{
            saveWriter(writer, currentUser).then(()=>
                        setupdated(true))
            setEditDialog(previousState=>!previousState)
    }

    const handleDelete=(writer)=>{
        const result = window.confirm("Are you sure, you want to delete?")
        if(result){
        deleteWriter(writer, currentUser).then(()=>
        setupdated(true))
    }
}
    useEffect(()=>{
        
        getWriterList().then(userData =>{
        setwriterList(userData)
    })
    setupdated(false)
    
},[])

useEffect(()=>{
    
    if(updated ===true){
    getWriterList().then(userData =>{
    setwriterList(userData)
    setupdated(false)
})
}
},[updated])

    return(
        <React.Fragment>
        { writerList !== null ?
            <TableContainer component={Paper} className={classes.table}>
                <Table >
                    <TableHead >
                        <TableRow >
                            <TableCell className={classes.tableheader} align='left'>UserName</TableCell>
                            <TableCell className={classes.tableheader} align='left'>Email</TableCell>
                            <TableCell className={classes.tableheader} align='left'>UserRole</TableCell>
                            <TableCell align='left'></TableCell>
                            <TableCell align='left'></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            writerList.map((writer,index)=>(
                                <TableRow>
                                    <TableCell align='left'>{writer.displayName}</TableCell>
                                    <TableCell align='left'>{writer.email}</TableCell>
                                    <TableCell align='left'>{writer.userRole}</TableCell>
                                    <TableCell align='left'><EditIcon onClick={()=>handleEditDialog(writer)} style={{color: green[500]}}/></TableCell>
                                    <TableCell align='left'><DeleteIcon onClick={()=>handleDelete(writer)} style={{color: red[500]}}/></TableCell>
                                </TableRow>
                            ))
                        }
                    </TableBody>
                </Table>
            </TableContainer> : <Loading/>
        }
           { (EditDialog ===true && writer !==null) ? <EditModal handleSaveEdit={handleSaveEdit} EditDialog={EditDialog} handleEditDialog={handleEditDialog} writer={writer}/> : null}
        </React.Fragment>
    );
}

const mapsStateToProps=state=>({
    currentUser: state.user.currentUser
})

export default connect(mapsStateToProps)(ContentWriter);