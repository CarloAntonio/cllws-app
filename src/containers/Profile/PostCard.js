
// libraries
import React from 'react';
import { useSelector } from 'react-redux';
import dateFormat from 'dateformat';

// material-ui
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';

const useStyles = makeStyles((theme) => ({
    card: {
      marginTop: "8px",
      width: "100%",
    },
  }));

export default function PostCard(props){
    const classes = useStyles();

    const user = useSelector(state => state.user);

    const formatedDate = dateFormat(new Date(props.post.date), "dddd, mmmm dS, yyyy, h:MM TT");

    return (
        <Card className={classes.card}>
            <CardHeader
                avatar={ <Avatar aria-label="recipe" src={user.pic} className={classes.avatar}/> }
                title={props.post.text}
                subheader={formatedDate}
            />
        </Card>
    )
}