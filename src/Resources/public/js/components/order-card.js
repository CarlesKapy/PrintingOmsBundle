import React from 'react';

//import Moment from 'react-moment';

// Material UI
import { withStyles } from '@material-ui/core/styles';

import Icon from '@material-ui/core/Icon';

import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';

import MoreVertIcon from '@material-ui/icons/MoreVert';

import red from '@material-ui/core/colors/red';
import blue from '@material-ui/core/colors/blue';
import green from '@material-ui/core/colors/green';
import deepOrange from '@material-ui/core/colors/deepOrange';
import yellow from '@material-ui/core/colors/yellow';

//import voca from 'voca';

import OrderLine from './order-line'


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
    cardTitle: {
        fontSize: theme.typography.pxToRem(18),
    },
    webAvatar: {
        backgroundColor: green[500],
    },
    webCard: {
        width: "100%",
        backgroundColor: green[100],
    },
    storeAvatar: {
        backgroundColor: '#0255A5',
    },
    storeCard: {
        width: "100%",
        backgroundColor: blue[100],
    },
    expandSummaryColumn: {
        flexBasis: '40%',
    },
    expandSummaryIconColumn: {
        flexBasis: '20%',
        justifyContent: 'flex-end'
    },
    expandDetailColumn:{
        flexBasis: '50%',
    },
    expandHeading: {
        fontSize: theme.typography.pxToRem(15),
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
    button: {
        margin: theme.spacing.unit,
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
        backgroundColor: green[500],
        color: "white",
    },
});

class OrderCard extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isFinished: this.props.status == 2
        };
        this.onOrderLineStart = this.onOrderLineStart.bind(this);
        this.onOrderLineFinish = this.onOrderLineFinish.bind(this);
        this.isOrderPending = this.isOrderPending.bind(this);
    }

    isOrderPending() {
        return this.props.laneId === 0;
    };

    onOrderLineStart = (orderLine) => {
        fetch(`api/v1/orderline/${orderLine.id}/status/1`, {
            method: 'PUT'
        })
            .then((response) => {
                return response.json()
            })
            .catch(console.error);

        // Check if order card is on pending state
        if (this.isOrderPending()) {
            // Move card to in progress
            this.props.publishEvent({type: 'MOVE_CARD', fromLaneId: this.props.laneId, toLaneId: 1, cardId: this.props.id, index:0});
            this.props.status = 1;
            orderLine.status = 1;
        }
    };

    onOrderLineFinish = (orderLine) => {
        fetch(`api/v1/orderline/${orderLine.id}/status/2`, {
            method: 'PUT'
        })
            .then((response) => {
                response.json().then((order) => {
                    if (order.status === 2) {
                        // Move card to finished
                        console.log("Moving card to Finished");
                        this.props.status = order.status;
                        this.props.order_lines = this.props.order_lines.map((ol) => {ol.status = 2; return ol});
                        this.setState({isFinished: true});
                        this.props.publishEvent({type: 'MOVE_CARD', fromLaneId: this.props.laneId, toLaneId: 2, cardId: this.props.id, index:0});
                    }
                });
            })
            .catch(console.error);
    };

    onOrderDelivered = () => {
        fetch(`api/v1/order/${this.props.id}/status/3`, {
            method: 'PUT'
        })
            .then((response) => {
                response.json().then((order) => {
                    if (order.status === 3) {
                        // Move card to finished
                        console.log("Moving card to Delivered");
                        this.props.publishEvent({type: 'REMOVE_CARD', laneId: this.props.laneId, cardId: this.props.id});
                    }
                })
            })
            .catch(console.error);
    };

    _renderOrderLines = (order) => {
        const { classes } = this.props;

        const orderLines = order.order_lines.map((ol) => {
            return (
                <OrderLine
                    key={ol.id}
                    orderLine={ol}
                    onStart={this.onOrderLineStart}
                    onFinish={this.onOrderLineFinish}
                    serigraphyName={ol.serigraphy_data.name}
                    serigraphyNumber={ol.serigraphy_data.number}
                    serigraphyPatch1={ol.serigraphy_data.patch1}
                    serigraphyPatch2={ol.serigraphy_data.patch2}
                    productDescription={ol.product_data.description}
                    productReference={ol.product_data.id}
                    productCategory={"N/A"}
                    productSize={ol.product_data.size}
                    productImage={null}
                    status={ol.status}
                />
            )
        });
        return orderLines;
    };

    render() {
        const { classes } = this.props;

        return (
            <Card>

                <CardHeader
                    avatar={
                        <Avatar aria-label="Printing order" className={classes.storeAvatar}>
                            RM
                        </Avatar>
                    }
                    action={
                        <IconButton>
                            <MoreVertIcon />
                        </IconButton>
                    }
                    title={this.props.id}
                    subheader={""}
                    classes={{title: classes.cardTitle}}
                />

                <CardContent>
                    {this._renderOrderLines(this.props)}
                </CardContent>

                { this.state.isFinished || this.props.laneId == 2 ?
                    (
                        <CardActions>
                            <Button variant="contained" className={classes.buttonDone} onClick={this.onOrderDelivered}>
                                Entregar
                                <Icon className={classes.rightIcon}>done</Icon>
                            </Button>
                        </CardActions>
                    ) :  ""
                }

            </Card>
        )
    }
}

export default withStyles(styles)(OrderCard);