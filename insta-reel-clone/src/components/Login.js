import React, { useContext, useState } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import './Login.css';
import insta from '../images/ig-logo.png';
import { makeStyles } from '@mui/styles';
import Alert from '@mui/material/Alert';
import TextField from '@mui/material/TextField';
import { Link, useNavigate } from 'react-router-dom';
import { CarouselProvider, Slider, Slide, Image } from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';
import item1 from '../images/carousel-item2.jpg';
import item2 from '../images/carousel-item1.png';
import item3 from '../images/carousel-item3.jpg';
import { AuthContext } from '../context/AuthContext';

const useStyles = makeStyles({
    textTheme: {
        color: 'grey'
    },
    cardLogin: {
        marginTop: '0.5em'
    }
})

export default function Signup() {
    const classes = useStyles();
    const {login} = useContext(AuthContext);
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate()

    async function handleLogin() {
        try {
            setLoading(true);
            await login(email, password);
            navigate('/');
            setLoading(false);
        } catch (error) {
            setError('Some Error has occured, Please try again! : \n'+ error + '\n' +'Wait for page to reload');
            console.log("LOGIN ERROR", error);
            setTimeout(() => {
                setError('');
                setLoading(false);
            }, 1000);
        }
    }


    return (
        <div className='login-wrapper'>
            <div className='carousel-wrapper'>
                <div className='carousel-images'>
                    {/* <img src={phone}></img> */}
                    <CarouselProvider interval="2000" isPlaying="true" infinite="true"
                        orientation="vertical"
                        naturalSlideWidth={100}
                        naturalSlideHeight={213}
                        totalSlides={3}
                    >
                        <Slider>
                            <Slide index={0}><Image src={item1} className='slider-img'></Image></Slide>
                            <Slide index={1}><Image src={item2} className='slider-img'></Image></Slide>
                            <Slide index={2}><Image src={item3} className='slider-img'></Image></Slide>
                        </Slider>
                    </CarouselProvider>
                </div>
            </div>



            <div className='login-form'>
                <Card sx={{ maxWidth: 420 }} variant="outlined">
                    <div className='insta-image-wrapper'>
                        <img className='ig-logo' src={insta} alt='ig-logo'></img>
                    </div>
                    <CardContent>
                        {error!='' && <Alert severity="error">{error}</Alert>}
                        <TextField id="outlined-basic" fullWidth margin="dense" label="Enter Email/Number" variant="outlined" value={email} onChange={(e)=>{setEmail(e.target.value)}} />
                        <TextField id="outlined-basic" type='password' fullWidth margin="dense" label="Enter Password" variant="outlined" value={password} onChange={((e)=>{setPassword(e.target.value)})} />
                    </CardContent>
                    <CardActions>
                        <Button variant="contained" fullWidth={true} disabled={loading} onClick={handleLogin}>Login</Button>
                    </CardActions>
                </Card>
                <Card variant="outlined" className={classes.cardLogin}>
                    <CardContent>
                        <Typography variant="subtitle1" className={classes.textTheme}>
                            Don't Have an Account? <Link to='/signup'>Signup</Link>
                        </Typography>
                    </CardContent>
                </Card>
            </div>
        </div>
        
    )
}
