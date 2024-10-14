import React, { useContext, useState } from 'react';
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
import { Link ,useNavigate } from 'react-router-dom';
// import Button from '@mui/material/Button';
import { AuthContext } from '../context/AuthContext';
import { uploadUserProfile } from '../profileStorage';
// import { firestoreCollection, addDocsFirestore } from '../firebase';
import { add } from '../firebaseCRUD';

const useStyles = makeStyles({
    textTheme: {
        color: 'grey'
    },
    cardLogin: {
        marginTop:'0.5em'
    }
})

export default function Signup() {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [userName, setUserName] = useState();
    const [confirmPassword, setConfirmPassword] = useState();
    const [error, setError] = useState('');
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const { signup } = useContext(AuthContext);
    const navigate = useNavigate();

    const classes = useStyles();

    async function handleSignup() {
        setLoading(true);
        if (!file) {
            setError('Profile Picture Upload is Required');
            setTimeout(() => {
                setError('');
                setLoading(false);

            }, 3000);
            return;
        }
        if (confirmPassword != password) {
            setError('Passwords should be same');
            setTimeout(() => {
                setError('');
                setLoading(false);
            }, 3000);
            return;
        }
        try {
            let res = await signup(email, password);
            // console.log("------------", res);
            await uploadUserProfile(res.user, file, userName);
            setLoading(false);
            navigate("/");
        } catch (error) {
            setError('Some Error has occured, Please try again!');
            console.log("SIGNUP ERROR", error);
            setTimeout(() => {
                setError('');
                setLoading(false);
            }, 10000);
            // return;
        }
    }
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
                      {error!='' && <Alert severity="error">{error}</Alert>}
                      <TextField id="outlined-basic" fullWidth margin="dense" label="Enter Email" variant="outlined" value={email} onChange={(e) => setEmail(e.target.value)} />
                      <TextField id="outlined-basic" type='text' fullWidth margin="dense" label="UserName" variant="outlined" value={userName} onChange={(e) => setUserName(e.target.value)} />
                      <TextField id="outlined-basic" type='password' fullWidth margin="dense" label="Enter Password" variant="outlined" value={password} onChange={(e) => setPassword(e.target.value)} />
                      <TextField id="outlined-basic" type='password' fullWidth margin="dense" label="Confirm Password" variant="outlined" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                      <Button variant="outlined" fullWidth startIcon={<CloudUploadIcon />} component="label">
                          Upload Profile Picture
                          <input type="file" accept='image/*' hidden onChange={(e)=>setFile(e.target.files[0])} />
                      </Button>

                  </CardContent>
                  <CardActions>
                      <Button variant="contained" fullWidth={true} disabled={loading} onClick={handleSignup}>Signup</Button>
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
