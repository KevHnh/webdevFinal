/*==================================================
NewStudentView.js

The Views component is responsible for rendering web page with data provided by the corresponding Container component.
It constructs a React component to display the new student page.
================================================== */
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import {useParams} from 'react-router-dom'
import axios from 'axios'
import { useEffect, useState } from 'react';
import { Alert } from '@material-ui/lab'
import { Snackbar } from '@material-ui/core';
import { useHistory } from 'react-router-dom';

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
  const [studentFirstName, setStudentFirstName] = useState("")
  const [studentLastName, setStudentLastName] = useState("")
  const [studentCampusId, setStudentCampusId] = useState("")

useEffect(()=>{
    loadStudent();
},[])

function loadStudent(){
    axios.get(`http://localhost:9000/api/students/${studentId}`, {
    })
    fetchJson()
 }

const fetchJson = async () => {
    const data = await fetch(`http://localhost:9000/api/students/${studentId}`,{mode: 'cors'})
    const items = await data.json()
    setItems(items)
    setStudentFirstName(items.firstname)
    setStudentLastName(items.lastname)
    setStudentCampusId(items.campusId)
}

async function submitEditStudent(){
   
    await axios.put(`http://localhost:9000/api/students/${studentId}`, {
        "firstname": studentFirstName, 
        "lastname": studentLastName, 
        "campusId": studentCampusId
    })
    
    
}

console.log(items)
  // Render a New Student view with an input form
  return (
    <div>
      <h1>Edit Student</h1>

      <div className={classes.root}>
        <div className={classes.formContainer}>
          <div className={classes.formTitle}>
            <Typography style={{fontWeight: 'bold', fontFamily: 'Courier, sans-serif', fontSize: '20px', color: '#11153e'}}>
                Edit Student
            </Typography>
          </div>
          <form style={{textAlign: 'center'}} onSubmit={() => submitEditStudent()}>
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

            <Button variant="contained" color="primary" type="submit">
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