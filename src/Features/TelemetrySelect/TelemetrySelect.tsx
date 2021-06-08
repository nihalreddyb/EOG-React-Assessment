import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Provider, useQuery } from 'urql';
import { actions } from './reducer';
import { makeStyles } from '@material-ui/core/styles';
import Chip from '../../components/Chip';
import ClearIcon from '@material-ui/icons/Clear';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';

import { IState } from '../../store';
import client from '../../API'

const useStyles = makeStyles({
    fullWidth: {
        width: '100%'
    },
    chipStyles: {
        margin: '5px'
    }
})

const query = `
query {
    getMetrics
}`

const getDataOptions = (state: IState) => {
    return state.telemetryDataOptions
}


export default () => {
    return (
        <Provider value={client}>
            <TelemetrySelect />
        </Provider>
    );
}

const renderSelectedChips = (options: Array<string>) => {
    const renderedChips = options.map((option) => {
        return <Chip label={`${option}`} />;
    })

    return renderedChips;
}

const TelemetrySelect = () => {


    const classes = useStyles();
    const dispatch = useDispatch();
    const selectOptions = useSelector(getDataOptions);

    const addToSelection = (newValues: Array<string>) => {
        dispatch(actions.updateTelemetryOptions({allOptions: selectOptions.allOptions, availableOptions: selectOptions.availableOptions, selectedOptions: newValues}));
      };
    
    
    const renderMultiSelectInput = () => {
        return(
            <div className={classes.fullWidth}>
                <ClearIcon></ClearIcon>
            </div>
        );
    }
    
    const handleDelete = (option: string) => {
        const newSelection = selectOptions.selectedOptions.filter(selected => selected !== option);
        console.log(newSelection);
        dispatch(actions.updateTelemetryOptions({allOptions: selectOptions.allOptions, availableOptions: selectOptions.availableOptions, selectedOptions: newSelection}));
      };

    const [result] = useQuery({
        query,
      });

    const {data, error} = result;

    useEffect(() => {
        if(error) {
            dispatch(actions.dataOptionsAPIErrorReceived({error: error.message}))
        }

        if(!data) return;
        
        const {getMetrics} = data;
        dispatch(actions.updateTelemetryOptions({allOptions: getMetrics, availableOptions: getMetrics, selectedOptions: []}));
    
    }, [dispatch, data, error]);


    return(
        <div className={classes.fullWidth}>
            <Autocomplete 
                multiple
                disableCloseOnSelect
                value={selectOptions.selectedOptions}
                onChange={(event, newValue) => {
                        addToSelection(newValue);
                  }}
                options={selectOptions.availableOptions}
                renderTags={(selectedOptions) => (
                    <div>
                      {(selectedOptions as string[]).map((value) => (
                        <Chip className={classes.chipStyles} variant="outlined" onDelete={() => handleDelete(value)} key={value} label={value} />
                      ))}
                    </div>)}
                renderInput={(params) => (
                    <TextField {...params} variant="outlined" placeholder="Select.." />
                  )} />
        </div>
    );
}