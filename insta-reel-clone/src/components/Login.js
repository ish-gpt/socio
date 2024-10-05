import React from 'react';
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
import { Link } from 'react-router-dom';
import phone from '../images/phone-insta1.jpg';
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext, Image } from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';
import item1 from '../images/carousel-item2.jpg';
import item2 from '../images/carousel-item1.png';
import item3 from '../images/carousel-item3.jpg';

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
                        {true && <Alert severity="error">This is an error Alert.</Alert>}
                        <TextField id="outlined-basic" fullWidth margin="dense" label="Enter Email/Number" variant="outlined" />
                        <TextField id="outlined-basic" type='password' fullWidth margin="dense" label="Enter Password" variant="outlined" />
                    </CardContent>
                    <CardActions>
                        <Button variant="contained" fullWidth={true}>Login</Button>
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
