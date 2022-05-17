/*==================================================
StudentView.js

The Views component is responsible for rendering web page with data provided by the corresponding Container component.
It constructs a React component to display the single student view page.
================================================== */
import { Link } from 'react-router-dom';

const StudentView = (props) => {
  const { student } = props;

  // Render a single Student view 
  return (
    <div>
      <h1>{student.firstname + " " + student.lastname}</h1>
      <img src={student.images} width="300"></img>

      {/* check if student has a campusId print it out. If not print they dont have a campus*/}
      {
        student.campusId !== null ?
        (
          <Link to={`/campus/${student.campus.id}`}>
            <h2>{student.campus.name}</h2>
          </Link>
        ): 
        (
          <div>Currently not enrolled in Any campus</div>
        )
      }

      {/* check if student has an email print it out. If not print NaN */}
      {
        student.email !== "" ?
        (
          <h1>Email: {student.email}</h1>
        ): 
        (
          <h1>Email: NaN</h1>
        )
      }
      
      <h1>Current GPA: {student.GPA}</h1>
      
    </div>
  );

};

export default StudentView;