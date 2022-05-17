/*==================================================
AllCampusesView.js

The Views component is responsible for rendering web page with data provided by the corresponding Container component.
It constructs a React component to display all campuses.
================================================== */
import PropTypes from "prop-types";
import { Link } from "react-router-dom";



const AllCampusesView = (props) => {
  const {campuses, deleteCampus, editCampus} = props;
  
  // If there is no campus, display a message.
  if (!props.allCampuses.length) {
    return(
      <div>
        <div>There are no campuses.</div>
        <br/>
        <Link to={"/newcampus"}>
          <button>Add New Campus</button>
        </Link>
      </div>
    ) 
  }

  //console.log(allCampuses)
  console.log(props.allCampuses)
  // If there is at least one campus, render All Campuses view 
  return (
    <div>
      <h1>All Campuses</h1>

      {props.allCampuses.map((campus) => (
        <div key={campus.id}>
          <Link to={`/campus/${campus.id}`}>
            <h2>{campus.name}</h2>
          </Link>
          <h4>campus id: {campus.id}</h4>
          <p>campus address: {campus.address}</p>
          <p>campus description: {campus.description}</p>
          <div>
            <img src={campus.images} width="300"></img>
          </div>
          
          <Link to={`/editcampus/${campus.id}`}>
            <button>Edit</button>
          </Link>
          <button onClick={() => deleteCampus(campus.id)}>Delete</button>
          <hr/>
        </div>
      ))}
      <br/>
      <Link to={"/newcampus"}>
        <button>Add New Campus</button>
      </Link>
      <br/><br/>
    </div>
  );
};

AllCampusesView.propTypes = {
  allCampuses: PropTypes.array.isRequired,
};

export default AllCampusesView;