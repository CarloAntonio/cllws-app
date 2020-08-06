import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';

// material-ui
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

// actions
// import { getAccessableLessons } from '../../store/actions';


const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 345,
    },
    media: {
        height: 140,
    },
}));

export default function Subject() {

    const history = useHistory()
    const location = useLocation();
    const classes = useStyles();

    const subjectName = location.pathname.split('/')[2];
    React.useEffect(() => {
        dispatch(getAccessableLessons(auth.token, subjectName))
    }, [auth.token, subjectName]);

    // lifecycle
    React.useEffect(() => {
        window.scrollTo(0, 0)
        
        // async function fetchMyLessons(){
        //     if(auth.token && username) {
        //         const lessons = await dispatch(getAccessableLessons(auth.token, subjectName))
        //         setLessons(lessons);
        //     }
        // }
        // fetchMyLessons();
    }, [auth.token, username, dispatch]);

    const subjectNames = [];
    const subjectCards = [];
    subjectNames.forEach(subjectName => {
        subjectCards.push(
            <Grid item xs={3} key={subjectName} >
                <Card className={classes.root} onClick={null}>
                    <CardActionArea>
                        <CardMedia
                            className={classes.media}
                            image="/static/images/cards/contemplative-reptile.jpg"
                            title="Contemplative Reptile"/>
                        <CardContent>
                        {/* <Typography gutterBottom variant="h5" component="h2">
                            {subjects[subjectName].title.charAt(0).toUpperCase() + subjects[subjectName].title.slice(1)}
                        </Typography> */}
                        <Typography variant="body2" color="textSecondary" component="p">
                            Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
                            across all continents except Antarctica
                        </Typography>
                        </CardContent>
                    </CardActionArea>
                    <CardActions>
                        <Button size="small" color="primary">
                            See Lessons
                        </Button>
                    </CardActions>
                </Card>
            </Grid>
        )
    })

    return (
        <header className="App-header">
            <Grid container spacing={3} justify="center" alignItems="center">
                {subjectCards}
            </Grid>
        </header>
    );
}