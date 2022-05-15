/*==================================================
NewStudentView.js

The Views component is responsible for rendering web page with data provided by the corresponding Container component.
It constructs a React component to display the new student page.
================================================== */
import Header from '../containers/Header';
import { Button, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import {useParams} from 'react-router-dom'
import axios from 'axios'
import { useEffect, useState } from 'react';
import { Alert } from '@material-ui/lab'
import { Snackbar } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { Dialog, DialogContent} from '@material-ui/core'

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

const StudentEditView = (props) => {
  //const {handleChange, handleSubmit } = props;
  const classes = useStyles();
  const {id: studentId} = useParams()
  const [items, setItems] = useState([])
  const [allCampuses, setAllCampuses] = useState([])
  const [studentFirstName, setStudentFirstName] = useState("")
  const [studentLastName, setStudentLastName] = useState("")
  const [studentCampusId, setStudentCampusId] = useState("")
  const [studentEmail, setStudentEmail] = useState("")
  const [studentGPA, setStudentGPA] = useState("")
  const [ gpaNotify, setGPANotify ] = useState(false)


useEffect(()=>{
    loadStudent();
},[])

function loadStudent(){
    axios.get(`http://localhost:9000/api/students/${studentId}`, {
    })
    fetchStudentJson()
 }

const fetchStudentJson = async () => {
    const data = await fetch(`http://localhost:9000/api/students/${studentId}`,{mode: 'cors'})
    const items = await data.json()
    setItems(items)
    setStudentFirstName(items.firstname)
    setStudentLastName(items.lastname)
    setStudentCampusId(items.campusId)
    setStudentEmail(items.email)
    setStudentGPA(items.GPA)
}

useEffect(()=>{
  loadCampus();
},[])

function loadCampus(){
  axios.get(`http://localhost:9000/api/campuses`, {
  })
  fetchCampusJson()
}

const fetchCampusJson = async () => {
  const data = await fetch(`http://localhost:9000/api/campuses`,{mode: 'cors'})
  const allCampuses = await data.json()
  setAllCampuses(allCampuses)
  
}


console.log(allCampuses)
async function submitEditStudent(){

    var x = true
    for(let i = 0; i < allCampuses.length; i++){
      if(studentCampusId.toString() === allCampuses[i].id.toString()){
          x = false
      }
    }
   
    if(x){
      alert(`There is no campus with the id ${studentCampusId}`)
    }
    
    else if(parseFloat(studentGPA) > 4.0 || parseFloat(studentGPA) < 0.0){
      alert("GPA must be a decimal between 0.0 and 4.0")
      //setGPANotify(true)
    }

    else if(isNaN(parseFloat(studentGPA))){
      alert("GPA is not a number")
    }
   
    else{
      alert("submitted successfuly")
      await axios.put(`http://localhost:9000/api/students/${studentId}`, {
          "firstname": studentFirstName, 
          "lastname": studentLastName, 
          "campusId": studentCampusId,
          "email": studentEmail,
          "GPA" : studentGPA,
      })
      
  }
    
}

function handleConfirmDialog(){
  setGPANotify(false)
}

console.log(items)
  // Render a New Student view with an input form
  return (
    <div>
      <Header/>
      <h1>Edit Student</h1>

      <div className={classes.root}>
        <div className={classes.formContainer}>
          <div className={classes.formTitle}>
            <Typography style={{fontWeight: 'bold', fontFamily: 'Courier, sans-serif', fontSize: '20px', color: '#11153e'}}>
                Edit Student
            </Typography>
          </div>
          <form style={{textAlign: 'center'}} >
            <label style= {{color:'#11153e', fontWeight: 'bold'}}>First Name: </label>
            <input type="text" name="firstname" value={studentFirstName} onChange ={(e) => setStudentFirstName(e.target.value)} />
            <br/>
            <br/>

            <label style={{color:'#11153e', fontWeight: 'bold'}}>Last Name: </label>
            <input type="text" name="lastname" value={studentLastName} onChange ={(e) => setStudentLastName(e.target.value)} />
            <br/>
            <br/>

            <label style={{color:'#11153e', fontWeight: 'bold'}}>Campus Id: </label>
            <input type="text" name="campusId" value={studentCampusId} onChange ={(e) => setStudentCampusId(e.target.value)} />
            <br/>
            <br/>

            <label style={{color:'#11153e', fontWeight: 'bold'}}>Email: </label>
            <input type="text" name="email" value={studentEmail} onChange ={(e) => setStudentEmail(e.target.value)} />
            <br/>
            <br/>

            <label style={{color:'#11153e', fontWeight: 'bold'}}>GPA: </label>
            <input type="text" name="GPA" value={studentGPA} onChange ={(e) => setStudentGPA(e.target.value)} />
            <br/>
            <br/>

            <Button variant="contained" color="primary" type="submit" onClick={()=> submitEditStudent()}>
              Submit
            </Button>
            <br/>
            <br/>
          </form>
          </div>
          
      </div>
      <Dialog open={gpaNotify} >
          <DialogContent>
              <Typography variant='h6'>
                  GPA must be a decimal between 0.0 and 4.0
              </Typography>
              <Button variant='contained' color="primary" onClick={handleConfirmDialog} style={{fontSize:"14px"}}>Ok</Button>
          </DialogContent>
      </Dialog>
    </div>    
  )
}

export default StudentEditView;