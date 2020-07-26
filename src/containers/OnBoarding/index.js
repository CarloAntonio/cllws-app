// libraries
import React from 'react';
import { useSelector } from 'react-redux';

// material-ui
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

// custom components
import WhiteText from '../../components/text/WhiteText';
import SeconaryText from '../../components/text/SecondaryText';
import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';

// utils
import { isEmptyObj } from '../../utils/helpers';

// assets
import image1 from '../../assets/images/slider-icon.png';
import bg from '../../assets/images/banner-bg.png';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        padding: "2rem 16rem 8rem",
        background: `url(${bg}) no-repeat center center fixed`,
        backgroundSize: "cover",
        height: "100vh"
    },
    img: {
        width: '100%',
        height: 'auto',
    },
}));

export default function Landing() {
    const classes = useStyles();

    // local state
    const [ step, setStep ] = React.useState(1);

    // redux state and dispatch
    const user = useSelector(state => state.user);

    // effect only activates if changes
    React.useEffect(() => {
        if(user && user.firstName) {
            if(user.pic) setStep(3);
            else setStep(2);
        }
    }, [user]);

    const handleNext = () => {
        setStep(step+1)
    }

    // check is user state has loaded
    if(isEmptyObj(user)) return null;

    return (
        <div className={classes.root}>
            <Grid container spacing={3} justify="space-between" alignItems="center">
                <Grid container item spacing={6} alignItems="center">
                    <Grid item xs={6}>
                        <div>
                            <WhiteText variant="h4">Akads is a learning platform made <strong>just for YOU</strong></WhiteText>
                            <br/>
                            <SeconaryText variant="subtitle1">We'll have the application up and running, but until then, feel free to join our mailing list to get updates!</SeconaryText>
                        </div>
                    </Grid>
                    <Grid item xs={6}>
                        <div>
                            <img src={image1} className={classes.img} alt="First Vector Graphic"/>
                        </div>
                    </Grid>
                </Grid>
            </Grid>

            {/* Step 1 Dialog */}
            <Step1 
                step={step} 
                handleNext={handleNext}/>

            {/* Step 2 Dialog */}
            <Step2 
                step={step} 
                handleNext={handleNext}/>

            {/* Step 3 Dialog */}
            <Step3 
                step={step} 
                handleNext={handleNext}/>
        </div>
    );
}