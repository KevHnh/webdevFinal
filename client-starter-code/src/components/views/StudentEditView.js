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
  const [studentImage, setStudentImage] = useState("")
  const [studentGPA, setStudentGPA] = useState("")
  


// get the students information when the page is first loaded
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
    setStudentImage(items.images)
}


// get all campus information when the page loads
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


// submit the edited student information
async function submitEditStudent(){

    var x = true
    var scampusId = studentCampusId
    // check if studentCampusId is null
    if(scampusId === null || scampusId === "" || scampusId === undefined){
      scampusId = ""
      x = false
    }
    
    // check if campus Id exists
    else{
      for(let i = 0; i < allCampuses.length; i++){
        if(scampusId.toString() === allCampuses[i].id.toString()){
            x = false
        }
      }
    }
    
    if(x){
      alert(`There is no campus with the id ${scampusId}`)
    }
    
    else if(parseFloat(studentGPA) > 4.0 || parseFloat(studentGPA) < 0.0){
      alert("GPA must be a decimal between 0.0 and 4.0")
      
    }

    else if(isNaN(parseFloat(studentGPA))){
      alert("GPA is not a number")
    }
   
    else{
      alert("submitted successfuly")
      if(scampusId.length === 0){
          await axios.put(`http://localhost:9000/api/students/${studentId}`, {
            "firstname": studentFirstName, 
            "lastname": studentLastName, 
            "campusId": null,
            "email": studentEmail,
            "GPA" : studentGPA,
            "images" : studentImage
        })
      }
      else{
        await axios.put(`http://localhost:9000/api/students/${studentId}`, {
            "firstname": studentFirstName, 
            "lastname": studentLastName, 
            "campusId": scampusId,
            "email": studentEmail,
            "GPA" : studentGPA,
            "images" : studentImage
        })
        
   
      }
    }
    
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
            <input type="text" name="firstname" required value={studentFirstName} onChange ={(e) => setStudentFirstName(e.target.value)} />
            <br/>
            <br/>

            <label style={{color:'#11153e', fontWeight: 'bold'}}>Last Name: </label>
            <input type="text" name="lastname" required value={studentLastName} onChange ={(e) => setStudentLastName(e.target.value)} />
            <br/>
            <br/>

            <label style={{color:'#11153e', fontWeight: 'bold'}}>Campus Id: </label>
            <input type="text" name="campusId" value={studentCampusId === null ? "" : studentCampusId} onChange ={(e) => setStudentCampusId(e.target.value)} />
            <br/>
            <br/>

            <label style={{color:'#11153e', fontWeight: 'bold'}}>Email: </label>
            <input type="text" name="email" value={studentEmail} onChange ={(e) => setStudentEmail(e.target.value)} />
            <br/>
            <br/>

            <label style={{color:'#11153e', fontWeight: 'bold'}}>GPA: </label>
            <input type="text" name="GPA" required value={studentGPA} onChange ={(e) => setStudentGPA(e.target.value)} />
            <br/>
            <br/>

            <label style={{color:'#11153e', fontWeight: 'bold'}}>Images: </label>
            <input type="text" name="Image" required value={studentImage} onChange ={(e) => setStudentImage(e.target.value)} />
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
    </div>    
  )
}

export default StudentEditView;