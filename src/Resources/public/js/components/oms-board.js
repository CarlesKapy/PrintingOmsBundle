import React from 'react';
import { connect as connectFetch } from 'react-refetch'
import { connect } from 'react-redux'
import Board from 'react-trello';
import { PropagateLoader } from 'react-spinners';

import Typography from '@material-ui/core/Typography';
import grey from '@material-ui/core/colors/grey';
import CssBaseline from '@material-ui/core/CssBaseline';

// Custom components
import OrderCard from './order-card';
import LaneHeader from './lane-header';

// Assets
import Background from '../../img/background.jpg';
import {withStyles} from "@material-ui/core/styles/index";

const styles = {
    boardContainer: {
        flexDirection: "row",
        justifyContent: "center",
        backgroundColor: "white",

        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)) ,url(${Background})`,
        backgroundPosition: "center center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover"
    },
    lane: {
        flex:1,
    },
    loadingWrapper: {
        width: "100vw",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center"
    }
};

class OmsBoard extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    publishEvent = (action) => {
        this.eventBus.publish(action);
    };

    setEventBus = (handle) => {
        this.eventBus = handle
    };

    sortCards = (card1, card2) => {
        return card1.id.localeCompare(card2.id);
    };

    render() {
        const { classes } = this.props;

        const areAllColumnsFullfilled = this.props.toDo.fulfilled && this.props.inProgress.fulfilled && this.props.done.fulfilled;
        const isError = areAllColumnsFullfilled && ("error" in this.props.toDo.value || "error" in this.props.inProgress.value || "error" in this.props.done.value);

        let errorLiterals = [];
        if (isError) {
            ["toDo", "inProgress", "done"].forEach((status) => {
                if ("error" in this.props[status].value) {
                    errorLiterals.push(this.props[status].value.error);
                }
            });
        }

        const loading =
            <div className={classes.loadingWrapper}>
                <PropagateLoader
                    color='#0255A5'
                    loading={!areAllColumnsFullfilled}
                />
            </div>
        ;

        const board =
            <Board
                style={styles.boardContainer}
                data={{
                    lanes: [
                        {
                            id: 0,
                            title: "Pendiente",
                            style: styles.lane,
                            cards: this.props.toDo.value
                        },
                        {
                            id: 1,
                            title: "En progreso",
                            style: styles.lane,
                            cards: this.props.inProgress.value
                        },
                        {
                            id: 2,
                            title: "Completado",
                            style: styles.lane,
                            cards: this.props.done.value
                        },
                    ]
                }}
                eventBusHandle={this.setEventBus}
                laneSortFunction={this.sortCards}
                draggable={false}
                customCardLayout
                customLaneHeader={<LaneHeader/>}>
                <OrderCard publishEvent={this.publishEvent}/>
            </Board>
        ;

        const serverError =
            <div className={classes.loadingWrapper}>
                <Typography
                    color={grey[600]}
                    variant="h3"
                    align="center"
                >
                    Problema con la conexión al servidor.
                </Typography>
                {
                    errorLiterals.map((literal) => {
                        return (
                            <Typography
                                color={grey[600]}
                                variant="caption"
                                align="center"
                            >
                                {literal}
                            </Typography>
                        );
                    })
                }
                <PropagateLoader
                    color={grey[600]}
                    loading={isError}
                />

            </div>
        ;

        return (
            <React.Fragment>
                <CssBaseline />
                {
                    areAllColumnsFullfilled ?
                        ( isError ? serverError : board ) : loading
                }
            </React.Fragment>
        )
    }
}

const handleResponse = (response) => {
    let ordersPromise;

    if (response.status === 200) {
        ordersPromise = response.json();
    } else {
        return response.text().then( (body) => {
            return new Promise(resolve => resolve({error: body}));
        });
    }

    return ordersPromise;
};

const mapStateToProps = (state, ownProps) => {
    return {}
};

const mapPropsToRequestsToProps = props => ({
    toDo: { url: 'api/v1/order?status[]=0', refreshInterval: 100000, refreshing: true },
    inProgress: { url: 'api/v1/order?status[]=1', refreshInterval: 100000, refreshing: true },
    done: { url: `api/v1/order?status[]=2`, refreshInterval: 100000, refreshing: true },
});

const mapDispatchToProps = (dispatch, ownProps) => {
    return {}
};

export default withStyles(styles)(
    connect(mapStateToProps, mapDispatchToProps)(
        connectFetch.defaults({ handleResponse: handleResponse })(mapPropsToRequestsToProps)(
            OmsBoard
        )
    )
);

