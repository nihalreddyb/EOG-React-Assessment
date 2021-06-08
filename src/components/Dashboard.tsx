import React from 'react';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import TelemetrySelect from '../Features/TelemetrySelect/TelemetrySelect';
import TelemetryCard from './TelemetryCard/TelemetryCard';
import TelemetryChart from './TelemetryChart/TelemetryChart';

const useStyles = makeStyles({
    container: {
        width: '100%',
        height: '100vh'
    },
    telemetryInfo: {
        width: '100%',
        boxSizing: 'border-box',
        padding: '1%'
    },
    telemetrySelect: {
        width: '40%',
        boxSizing: 'border-box',
        padding: '1%'
    },
    telemetryCard: {
        width: '60%',
        boxSizing: 'border-box',
        padding: '1%'
    },
    telemetryChart: {
        width: '100%',
        boxSizing: 'border-box',
        padding: '1%'
    }
})

export default () => {

    const classes = useStyles();

    return (
        <Box className={classes.container} display="flex" flexDirection="column">
            <Box display="flex" flexWrap="wrap" className={classes.telemetryInfo}>
                <Box display="flex" flexWrap="wrap" className={classes.telemetryCard}>
                    <TelemetryCard></TelemetryCard>
                </Box>
                <Box display="flex" flexWrap="wrap" className={classes.telemetrySelect}>
                    <TelemetrySelect></TelemetrySelect>
                </Box>
            </Box>
            <Box className={classes.telemetryChart}>
                <TelemetryChart></TelemetryChart>
            </Box>
        </Box>
    );
}