
// libraries
import React from 'react';
import { useSelector } from 'react-redux';
import dateFormat from 'dateformat';

// material-ui
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import CommentIcon from '@material-ui/icons/Comment';

const useStyles = makeStyles((theme) => ({
    card: {
      marginTop: "8px",
      width: "100%",
    },
}));

export default function PostCard(props){
    const classes = useStyles();

    const formatedDate = dateFormat(new Date(props.post.date), "dddd, mmmm dS, yyyy, h:MM TT");

    return (
        <Card className={classes.card}>
            <CardHeader
                avatar={ <Avatar aria-label="recipe" src={props.post.pic} className={classes.avatar}/> }
                title={props.post.text}
                subheader={formatedDate}/>
            {/* <CardMedia
                component="iframe"
                height="345"
                src="https://www.youtube.com/embed/rYcTosuhKFU"
                title="Test"/> */}
            <CardActions disableSpacing>
                <IconButton aria-label="like">
                    <ThumbUpIcon />
                </IconButton>
                <IconButton aria-label="dislike">
                    <ThumbDownIcon />
                </IconButton>
                <IconButton aria-label="comment">
                    <CommentIcon />
                </IconButton>
            </CardActions>
        </Card>
    )
}