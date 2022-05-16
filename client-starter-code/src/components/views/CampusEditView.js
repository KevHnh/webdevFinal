/*==================================================
NewStudentView.js

The Views component is responsible for rendering web page with data provided by the corresponding Container component.
It constructs a React component to display the new student page.
================================================== */
import Header from '../containers/Header';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import {useParams} from 'react-router-dom'
import axios from 'axios'
import { useEffect, useState } from 'react';
import { Alert } from '@material-ui/lab'
import { Snackbar } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
//import { useNavigate } from 'react-router-dom';
// Create styling for the input form
const useStyles = makeStyles( () => ({
  formContainer:{  
    width: '500px',
    backgroundColor: '#f0f0f5',
    borderRadius: '5px',
    margin: 'auto',
  },
  title: {
    flexGrow: 1,
    textAlign: 'left',
    textDecoration: 'none'
  }, 
  customizeAppBar:{
    backgroundColor: '#11153e',
    shadows: ['none'],
  },
  formTitle:{
    backgroundColor:'#c5c8d6',
    marginBottom: '15px',
    textAlign: 'center',
    borderRadius: '5px 5px 0px 0px',
    padding: '3px'
  },
}));

const CampusEditView = (props) => {
  //const {handleChange, handleSubmit } = props;
  const classes = useStyles();
  const {id: campusId} = useParams()
  const [items, setItems] = useState([])
  const [allStudents, setAllStudents] = useState([])
  const [campusName, setCampusName] = useState("")
  const [campusAddress, setCampusAddress] = useState("")
  const [campusDescription, setCampusDescription] = useState("")
  const [campusImage, setCampusImage] = useState("")
  const [ saveNotify, setSaveNotify ] = useState({isOpen:false, message:"", type:""})
  const [ removeNotify, setRemoveNotify ] = useState({isOpen:false, message:"", type:""})

const navigate = useHistory();
//const navigate = useNavigate();
//const redirectPage = (path) => {
 //   navigate.push(path)
//} 

useEffect(()=>{
    loadAllStudents();
},[])

function loadAllStudents(){
    axios.get(`http://localhost:9000/api/students`, {
    })
    fetchStudentJson()
 }

const fetchStudentJson = async () => {
    const data = await fetch(`http://localhost:9000/api/students`,{mode: 'cors'})
    const allStudents = await data.json()
    setAllStudents(allStudents)
}


useEffect(()=>{
    loadCampus();
},[])

function loadCampus(){
    axios.get(`http://localhost:9000/api/campuses/${campusId}`, {
    })
    fetchJson()
 }

const fetchJson = async () => {
    const data = await fetch(`http://localhost:9000/api/campuses/${campusId}`,{mode: 'cors'})
    const items = await data.json()
    setItems(items)
    setCampusName(items.name)
    setCampusAddress(items.address)
    setCampusDescription(items.description)
    setCampusImage(items.images)
}

async function submitEditCampus(){
   
    await axios.put(`http://localhost:9000/api/campuses/${campusId}`, {
        "name":campusName, 
        "address": campusAddress, 
        "description": campusDescription,
        "images" : campusImage,
    })
    
    //redirectPage(`/campuses`)
    //navigate.push(`/campuses`)
    
    
}

function addStudentToCampus(student){
    axios.put(`http://localhost:9000/api/students/${student.id}`, {
        "campus":student.campus, 
        "campusId": campusId, 
        "firstname": student.firstname,
        "lastname": student.lastname,
        "id": student.id,
        "images": student.images
    })

    setSaveNotify({
        isOpen: true,
        message: `added ${student.firstname},${student.lastname} to ${items.name}`,
        type: 'success'
    })

    loadAllStudents();
    
}

function removeStudentFromCampus(student){
    axios.put(`http://localhost:9000/api/students/${student.id}`, {
        "campus":student.campus, 
        "campusId": null, 
        "firstname": student.firstname,
        "lastname": student.lastname,
        "id": student.id,
        "images": student.images
    })

    setRemoveNotify({
        isOpen: true,
        message: `removed ${student.firstname},${student.lastname} to ${items.name}`,
        type: 'error'
    })

    loadAllStudents();
}

const handleSave = (event, reason) =>{
    setSaveNotify({
       ...saveNotify,
       isOpen:false
    })

    window.location.reload(false)
}

const handleRemove = (event, reason) =>{
    setRemoveNotify({
       ...saveNotify,
       isOpen:false
    })

    window.location.reload(false)
}


console.log(items)
console.log(allStudents)
  // Render a New Student view with an input form
  return (
    <div>
      <Header/>
      <h1>Edit Campus</h1>

      <div className={classes.root}>
        <div className={classes.formContainer}>
          <div className={classes.formTitle}>
            <Typography style={{fontWeight: 'bold', fontFamily: 'Courier, sans-serif', fontSize: '20px', color: '#11153e'}}>
              Edit Campus
            </Typography>
          </div>
          <form style={{textAlign: 'center'}} onSubmit={() => submitEditCampus()}>
            <label style= {{color:'#11153e', fontWeight: 'bold'}}>Campus Name: </label>
            <input type="text" name="name" required value={campusName} onChange ={(e) => setCampusName(e.target.value)} />
            <br/>
            <br/>

            <label style={{color:'#11153e', fontWeight: 'bold'}}>Address: </label>
            <input type="text" name="address" required value={campusAddress} onChange={(e) => setCampusAddress(e.target.value)} />
            <br/>
            <br/>

            <label style={{color:'#11153e', fontWeight: 'bold'}}>Description: </label>
            <input type="text" name="description" value={campusDescription} onChange={(e) => setCampusDescription(e.target.value)} />
            <br/>
            <br/>

            <label style={{color:'#11153e', fontWeight: 'bold'}}>Image: </label>
            <input type="text" name="images" value={campusImage} onChange={(e) => setCampusImage(e.target.value)} />
            <br/>
            <br/>

            <Button variant="contained" color="primary" type="submit">
              Submit
            </Button>
            <br/>
            <br/>

          </form>
            <div>Currently enrolled students</div>


            {
                items.length !== 0 && items.students.length > 0 ?
                (
                items.students.map((item,pos)=>{
                    return(
                        <div key={pos}>{item.firstname}, {item.lastname}</div>
                    )
                })
                ): ""
            
            }

            <br/>
            <br/>
            <div>All Students</div>
            {
                allStudents.map((students,pos)=>{
                    return(
                        <div key={pos}>
                            
                            <div>{students.firstname}, {students.lastname}</div>
                                                       
                            <Button variant="contained" color="primary" onClick={() => addStudentToCampus(students)}>Add</Button>
                            <Button variant="contained" style={{fontSize:"14px",backgroundColor: "#ae0000",}} onClick={()=> removeStudentFromCampus(students)}> Remove</Button>
                                                    
                        </div>
                    )
                })
            }

          </div>
      </div>
      
      {/* adding a student to campus notification*/}
      <Snackbar
            open={saveNotify.isOpen}
            autoHideDuration={3000}
            anchorOrigin={{vertical:'top', horizontal:'right'}}
            onClose={handleSave}
            >
                <Alert 
                onClose={handleSave}
                severity={saveNotify.type}>
                    {saveNotify.message}
                </Alert>  
        </Snackbar>

         {/* removing a student from campus notification*/}
        <Snackbar
            open={removeNotify.isOpen}
            autoHideDuration={1000}
            anchorOrigin={{vertical:'top', horizontal:'right'}}
            onClose={handleRemove}
            >
                <Alert 
                onClose={handleRemove}
                severity={removeNotify.type}>
                    {removeNotify.message}
                </Alert>  
        </Snackbar>
    </div>    
  )
}

export default CampusEditView;