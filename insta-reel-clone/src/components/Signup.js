import React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
// import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import './Signup.css';
import insta from '../images/ig-logo.png';
import { makeStyles } from '@mui/styles';
import Alert from '@mui/material/Alert';
import TextField from '@mui/material/TextField';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { Link } from 'react-router-dom';
// import Button from '@mui/material/Button';

const useStyles = makeStyles({
    textTheme: {
        color: 'grey'
    },
    cardLogin: {
        marginTop:'0.5em'
    }
})

export default function Signup() {
    const classes = useStyles();
  return (
      <div className='signup-wrapper'>
          <div className='signup-form'>
              <Card sx={{ maxWidth: 420 }} variant="outlined">
                  <div className='insta-image-wrapper'>
                      <img className='ig-logo' src={insta} alt='ig-logo'></img>
                  </div>
                  <CardContent>
                      <Typography variant="subtitle1" className={classes.textTheme}>
                        Signup to see photos and videos from your friends
                      </Typography>
                      {true && <Alert severity="error">This is an error Alert.</Alert>}
                      <TextField id="outlined-basic" fullWidth margin="dense" label="Enter Email/Number" variant="outlined" />
                      <TextField id="outlined-basic" type='password' fullWidth margin="dense" label="Enter Password" variant="outlined" />
                      <TextField id="outlined-basic" type='password' fullWidth margin="dense" label="Confirm Password" variant="outlined" />
                      <Button variant="outlined" fullWidth startIcon={<CloudUploadIcon />} component="label">
                          Upload Profile Picture
                          <input type="file" accept='image/*' hidden />
                      </Button>

                  </CardContent>
                  <CardActions>
                      <Button variant="contained" fullWidth={true}>Signup</Button>
                  </CardActions>
                  <CardContent>
                      <Typography variant="subtitle1" className={classes.textTheme}>
                          By signing up, you agree to our Terms, Data Policy and Cookies Policy
                      </Typography>
                  </CardContent>
              </Card>
              <Card variant="outlined" className={classes.cardLogin}>
                  <CardContent>
                      <Typography variant="subtitle1" className={classes.textTheme}>
                          Having an Account? <Link to='/login'>login</Link> 
                      </Typography>
                  </CardContent>
              </Card>

          </div>
    </div>
  )
}
