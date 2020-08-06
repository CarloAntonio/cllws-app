
// libraries
import React from 'react';
import { useHistory } from 'react-router-dom';

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

// styles
// import './index.css';

const subjects = ['math', 'science', 'language']

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 345,
    },
    media: {
        height: 140,
    },
}));

export default function Learn(props) {

    const classes = useStyles();
    const history = useHistory();

    let subjectCards = [];
    subjects.forEach(gradeTitle => {
        subjectCards.push(
            <Grid item xs={3} key={gradeTitle} >
                <Card className={classes.root} onClick={() => history.push(`learn/${gradeTitle}`)}>
                    <CardActionArea>
                        <CardMedia
                        className={classes.media}
                        image="/static/images/cards/contemplative-reptile.jpg"
                        title="Contemplative Reptile"
                        />
                        <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                            {gradeTitle.charAt(0).toUpperCase() + gradeTitle.slice(1)}
                        </Typography>
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
        <Grid container spacing={3} justify="center" alignItems="center">
            {subjectCards}
        </Grid>
    );
}
    