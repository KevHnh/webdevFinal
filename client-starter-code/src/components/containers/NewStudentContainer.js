/*==================================================
NewStudentContainer.js

The Container component is responsible for stateful logic and data fetching, and
passes data (if any) as props to the corresponding View component.
If needed, it also defines the component's "connect" function.
================================================== */
import Header from "./Header";
import { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import NewStudentView from "../views/NewStudentView";
import { addStudentThunk, fetchAllCampusesThunk } from "../../store/thunks";

class NewStudentContainer extends Component {
  // Initialize state
  constructor(props) {
    super(props);
    this.state = {
      firstname: "",
      lastname: "",
      campusId: null,
      email: "",
      images: "",
      GPA: "",

      redirect: false,
      redirectId: null,
    };
  }


  // Capture input data when it is entered
  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  // Take action after user click the submit button
  handleSubmit = async (event) => {
    event.preventDefault(); // Prevent browser reload/refresh after submit.
    let campId = this.state.campusId;
    let imageLink = this.state.images;

    // check if campus id is null
    if (
      this.state.campusId === "" ||
      this.state.campusId === null ||
      this.state.campusId === undefined
    ) {
      campId = null;
    }

    // check if images is empty
    if (
      this.state.images === "" ||
      this.state.images === null ||
      this.state.images === undefined
    ) {
      imageLink =
        "https://static.vecteezy.com/system/resources/previews/002/318/271/original/user-profile-icon-free-vector.jpg";
    }

    let student = {
      firstname: this.state.firstname,
      lastname: this.state.lastname,
      campusId: campId,
      email: this.state.email,
      images: imageLink,
      GPA: this.state.GPA,
    };

    // Add new student in back-end database

    // Update state, and trigger redirect to show the new student
    const axios = require("axios");
    const array = [];
    let newStudent;
    let allCamp = await axios.get(`http://localhost:9000/api/campuses`);

    for (let i = 0; i < allCamp.data.length; i++) {
      array.push(allCamp.data[i].id);
    }

    if (student.GPA > 4 || student.GPA < 0) {
      alert("Student GPA Not Valid");
    } else if (
      student.campusId === null ||
      array.includes(parseInt(student.campusId))
    ) {
      newStudent = await this.props.addStudent(student);

      this.setState({
        firstname: "",
        lastname: "",
        campusId: "",
        email: "",
        GPA: "",
        images: "",
        redirect: true,
        redirectId: newStudent.id,
      });
    } else {
      alert("Campus ID Does Not Exist");
    }
  };

  // Unmount when the component is being removed from the DOM:
  componentWillUnmount() {
    this.setState({ redirect: false, redirectId: null });
  }

  // Render new student input form
  render() {
    // Redirect to new student's page after submit
    if (this.state.redirect) {
      return <Redirect to={`/student/${this.state.redirectId}`} />;
    }

    // Display the input form via the corresponding View component
    return (
      <div>
        <Header />
        <NewStudentView
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
        />
      </div>
    );
  }
}

// The following input argument is passed to the "connect" function used by "NewStudentContainer" component to connect to Redux Store.
// The "mapDispatch" argument is used to dispatch Action (Redux Thunk) to Redux Store.
// The "mapDispatch" calls the specific Thunk to dispatch its action. The "dispatch" is a function of Redux Store.
const mapDispatch = (dispatch) => {
  return {
    fetchAllCampuses: () => dispatch(fetchAllCampusesThunk()),
    addStudent: (student) => dispatch(addStudentThunk(student)),
  };
};

// Export store-connected container by default
// NewStudentContainer uses "connect" function to connect to Redux Store and to read values from the Store
// (and re-read the values when the Store State updates).
export default connect(null, mapDispatch)(NewStudentContainer);
