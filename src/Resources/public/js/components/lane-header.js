import React from 'react';

import PropTypes from 'prop-types';

// Material UI
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import grey from '@material-ui/core/colors/grey';
import voca from 'voca';


const styles = theme => ({
    root: {
        width: "100%",
    },
    primary: {
        color: grey[100],
        textShadow: '#777777 3px 3px 5px'
    },
});


class LaneHeader extends React.Component {

    constructor(props) {
        super(props);

    }

    render() {
        const { classes } = this.props;

        return (
            <Typography
                classes={{colorPrimary: classes.primary, root: classes.root}}
                align="center"
                variant="display2"
                color="primary" >
                    {voca.capitalize(this.props.title)}
            </Typography>
        )
    }
}

export default withStyles(styles)(LaneHeader);