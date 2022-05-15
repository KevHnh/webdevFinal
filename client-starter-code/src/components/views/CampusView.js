/*==================================================
CampusView.js

The Views component is responsible for rendering web page with data provided by the corresponding Container component.
It constructs a React component to display a single campus and its students (if any).
================================================== */
import { Link } from "react-router-dom";

// Take in props data to construct the component
const CampusView = (props) => {
  const {campus} = props;

  {/*if(campus.students.length < 1){
    return <div>There are no enrolled students at this campus</div>
  }*/}
  // Render a single Campus view with list of its students
  return (
    <div>
      <h1>{campus.name}</h1>
      <img src={campus.images} width="300"></img>
      <p>campus address: {campus.address}</p>
      <p>campus description: {campus.description}</p>
      <p>Enrolled students</p>

      { 
        campus.students.length > 0 ?
        (
          campus.students.map( student => {
            let name = student.firstname + " " + student.lastname;
            return (
              <div key={student.id}>
                <Link to={`/student/${student.id}`}>
                  <h2>{name}</h2>
                </Link>             
              </div>
            );
          })
        ): 
        (
          <div>There are no enrolled students at this campus</div>
        )
      }
    </div>
  );
};

export default CampusView;