/*==================================================
StudentView.js

The Views component is responsible for rendering web page with data provided by the corresponding Container component.
It constructs a React component to display the single student view page.
================================================== */
const StudentView = (props) => {
  const { student } = props;

  // Render a single Student view 
  return (
    <div>
      <h1>{student.firstname + " " + student.lastname}</h1>
      <img src={student.images} width="300"></img>
      {
        student.campusId !== null ?
        (
          <h1>{student.campus.name}</h1>
        ): 
        (
          <div>Currently not enrolled in Any campus</div>
        )
      }

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