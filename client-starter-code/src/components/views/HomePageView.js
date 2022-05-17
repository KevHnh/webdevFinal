/*==================================================
HomePageView.js

The Views component is responsible for rendering web page with data provided by the corresponding Container component.
It constructs a React component to display the home page.
================================================== */
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    overflow: 'hidden',
  },
  title: {
    flexGrow: 1,
    textAlign: 'left',
    fontType: 'bold',
    fontFamily: 'sans-serif', 
    fontSize: '35px', 
    color: 'darkblue'
  },
  appBar:{
    backgroundColor: '#fcb6bb',
    shadows: ['none'],
  },
  greeting:{
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: 'white',
    width: "50%",
    margin: "auto",
  },
  linksContainer:{
    textDecoration: 'none',
    marginTop: '10px',
    marginBottom: '10px',
  },
  buttonHome: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    width: '100%'
  },
  buttonContainer: {
    paddingRight: '150px',
    paddingLeft: '150px',
    fontSize: '40px',
    paddingTop: '30px',
    paddingBottom: '30px',
  },
  titleHome: {
    fontSize: '60px',
    margin: '0',
    color:'white',
    paddingTop: '200px',
  },
  brightness: {
    background: 'rgba(0, 0, 0, 0.5)',
    width: '100%',
    height: '93.4vh',
    display: 'fixed',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: '500',
  },
  background1: {
    background: 'url("https://www.collegedata.com/hs-fs/collegedata/images/article/being-involved-header.jpg")',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: '50% 0',
    backgroundSize: 'cover',
  },
  homeContainer: {
    margin: '0',
    height: 'auto',
  }
}));

const HomePageView = () => {
  // Render Home page view
  const classes = useStyles();
  return (
    <div className={classes.homeContainer}>
      <div className={classes.background1}>
        <div className={classes.brightness}>
          <h1 className={classes.titleHome}>Home</h1>
            <div className={classes.buttonHome}>
              <Link className={classes.linksContainer} to={'/campuses'} >
                    <Button variant="contained" color="primary" className={classes.buttonContainer}>
                      All Campuses
                    </Button>
                  </Link>

              <Link className={classes.linksContainer} to={'/students'} >
                <Button variant="contained" color="primary" className={classes.buttonContainer}>
                  All Students
                </Button>
              </Link>
              </div>
            </div>
        </div>
    </div>
  );    
}

export default HomePageView;