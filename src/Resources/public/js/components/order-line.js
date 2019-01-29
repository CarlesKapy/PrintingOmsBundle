import React from 'react';

import PropTypes from 'prop-types';

import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import Typography from '@material-ui/core/Typography';

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import voca from 'voca';
import {withStyles} from "@material-ui/core/styles/index";
import yellow from "@material-ui/core/colors/yellow";
import green from "@material-ui/core/colors/green";
import deepOrange from "@material-ui/core/colors/deepOrange";
import red from "@material-ui/core/colors/red";
import blue from "@material-ui/core/colors/blue";
import grey from "@material-ui/core/colors/grey";

const styles = theme => ({
    card: {
        width: "100%"
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    actions: {
        display: 'flex',
    },
    expand: {
        transform: 'rotate(0deg)',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
        marginLeft: 'auto',
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    webAvatar: {
        backgroundColor: red[500],
    },
    storeAvatar: {
        backgroundColor: blue[500],
    },
    expandSummaryNameColumn: {
        flexBasis: '60%',
    },
    expandSummaryNumberColumn: {
        flexBasis: '20%',
    },
    expandSummaryIconColumn: {
        flexBasis: '20%',
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems:'center'
    },
    expandDetailColumn:{
        //flexBasis: '50%',
    },
    expandMoreIcon: {
        right: 0
    },
    expandHeading: {
        fontSize: theme.typography.pxToRem(18),
    },
    expandHeadingNumber: {
        fontSize: theme.typography.pxToRem(18),
        textAlign: 'center'
    },
    expandHeadingSubtitle: {
        fontSize: theme.typography.pxToRem(13),
        color: grey[700]
    },
    expandSecondaryHeading: {
        fontSize: theme.typography.pxToRem(15),
        color: theme.palette.text.secondary,
    },
    productImage: {
        width: "100%"
    },
    rightIcon: {
        marginLeft: theme.spacing.unit,
    },
    statusIconDone: {
        color: green[500]
    },
    statusIconPending: {
        color: deepOrange[900]
    },
    statusIconInProgress: {
        color: yellow[600]
    },
    buttonDone: {
        margin: theme.spacing.unit,
        backgroundColor: grey[200],
        color:  green[500],
    },
    buttonInProgress: {
        margin: theme.spacing.unit,
        backgroundColor: yellow[700],
        color: "white",
    },
    buttonPending: {
        margin: theme.spacing.unit,
        backgroundColor: deepOrange[900],
        color: "white",
    },
    wrappedListItem: {
        whiteSpace: "normal",
    },
    patchTitle: {
        color: grey[500],
        fontSize: theme.typography.pxToRem(14),
    },
    patchName: {
        color: grey[800],
        fontSize: theme.typography.pxToRem(16),
    },
    notSoPaddedExpandedPanelSummary: {
        paddingRight: 10,
        paddingLeft: 10
    }
});

class OrderLine extends React.Component {

    constructor(props) {
        super(props);

        const {classes} = this.props;

        this.statusIcons = {
            0: <Icon className={classes.statusIconPending}>error</Icon>,
            1: <Icon className={classes.statusIconInProgress}>update</Icon>,
            2: <Icon className={classes.statusIconDone}>check_circle</Icon>
        };

        this.actionButtons = {
            0:
                <Button variant="contained" className={classes.buttonPending} onClick={this.onStartClick}>
                    Empezar
                    <Icon className={classes.rightIcon}>send</Icon>
                </Button>,
            1:
                <Button variant="contained" className={classes.buttonInProgress} onClick={this.onFinishClick}>
                    Finalizar
                    <Icon className={classes.rightIcon}>edit</Icon>
                </Button>,
            2:
                <Button variant="contained" className={classes.buttonDone}>
                    Completada
                    <Icon className={classes.rightIcon}>done</Icon>
                </Button>
        };

        this.state = {
            statusIcon: this.statusIcons[this.props.status],
            actionButton: this.actionButtons[this.props.status],
            statusStr: this.props.status
        }
    }

    onStartClick = () => {
        this.props.onStart(this.props.orderLine);
        this.props.status = 1;
        this.setState({
            statusIcon: this.statusIcons[this.props.status],
            actionButton: this.actionButtons[this.props.status],
        });
    };

    onFinishClick = () => {
        console.log('On Finish click');
        this.props.onFinish(this.props.orderLine);
        this.props.status = 2;
        this.setState({
            statusIcon: this.statusIcons[this.props.status],
            actionButton: this.actionButtons[this.props.status]
        });
    };

    render(){
        const { classes } = this.props;

        const listItemPatch1 =
            <ListItem className={classes.wrappedListItem}>
                <ListItemText
                    classes={{ primary: classes.patchTitle, secondary: classes.patchName}}
                    primary={"Parche #1"}
                    secondary={this.props.serigraphyPatch1}
                />
            </ListItem>
        ;

        const listItemPatch2 =
            <ListItem className={classes.wrappedListItem}>
                <ListItemText
                    classes={{ primary: classes.patchTitle, secondary: classes.patchName}}
                    primary={"Parche #2"}
                    secondary={this.props.serigraphyPatch2}
                />
            </ListItem>
        ;

        return (
            <ExpansionPanel>

                <ExpansionPanelSummary
                    classes={{ root: classes.notSoPaddedExpandedPanelSummary, expandIcon: classes.expandMoreIcon}}
                    expandIcon={<ExpandMoreIcon />}  >
                    <div className={classes.expandSummaryIconColumn}>
                        {this.state.statusIcon}
                    </div>
                    <div className={classes.expandSummaryNameColumn}>
                        <Typography className={classes.expandHeadingSubtitle}>Nombre</Typography>
                        <Typography className={classes.expandHeading}>{voca.upperCase(this.props.serigraphyName) || 'N/A'}</Typography>
                    </div>
                    <div className={classes.expandSummaryNumberColumn}>
                        <Typography className={classes.expandHeadingSubtitle}>Dorsal</Typography>
                        <Typography className={classes.expandHeadingNumber}>{this.props.serigraphyNumber || 'N/A'}</Typography>
                    </div>
                </ExpansionPanelSummary>

                <ExpansionPanelDetails classes={{ root: classes.notSoPaddedExpandedPanelSummary }}>

                    <div className={classes.expandDetailColumn}>
                        <List>
                            <ListItem className={classes.wrappedListItem}>
                                <ListItemText primary={this.props.productDescription} secondary={`${this.props.productReference}`} />
                            </ListItem>
                            <ListItem className={classes.wrappedListItem}>
                                <ListItemText primary={`Talla ${this.props.productSize}`} />
                            </ListItem>
                            { this.props.serigraphyPatch1.length > 0 && listItemPatch1 }
                            { this.props.serigraphyPatch2.length > 0 && listItemPatch2 }
                        </List>

                        {this.state.actionButton}

                    </div>

                    {/*
                    <div className={classes.expandDetailColumn}>
                        <img className={classes.productImage} src={this.props.productImage}/>
                    </div>
                    */}

                </ExpansionPanelDetails>

            </ExpansionPanel>
        );
    }
}

OrderLine.propTypes = {
    orderLine: PropTypes.any,
    onStart: PropTypes.func,
    onFinish: PropTypes.func,
    status: PropTypes.object,
    serigraphyName: PropTypes.string,
    serigraphyNumber: PropTypes.string,
    serigraphyPatch1: PropTypes.string,
    serigraphyPatch2: PropTypes.string,
    productDescription: PropTypes.string,
    productReference: PropTypes.string,
    productSize: PropTypes.string,
    productCategory: PropTypes.string,
    productImage: PropTypes.any,
};

export default withStyles(styles)(OrderLine);