import React, {PropTypes} from 'react';
import { Button, Statistic, Menu } from 'semantic-ui-react'



const TodoCounter = (props)=>{
    let s1 = {padding: "130px 0px"};
    let s2 = {padding: "0px 10px" };
    let p = {cursor:'pointer'};
    return(
        <Menu>
            <Statistic.Group style={s2} horizontal widths='four' size='mini' color='red'>
                <Statistic>
                    <Statistic.Value >{props.onCompletedCount} / {props.onCount}</Statistic.Value>
                    <Statistic.Label>Todos</Statistic.Label>
                </Statistic>
            </Statistic.Group>
            <Menu.Menu position='right'>
                <Menu.Item style={p} onClick={props.getAll}>All</Menu.Item>
                <Menu.Item style={p} onClick={props.getOpen}>Open</Menu.Item>
                <Menu.Item style={p} onClick={props.getCompleted}>Completed</Menu.Item>
            </Menu.Menu>
        </Menu>
    );
}

TodoCounter.propTypes = {
    onCount: PropTypes.number.isRequired,
    getCompleted: PropTypes.func.isRequired,
    getOpen: PropTypes.func.isRequired,
    getAll: PropTypes.func.isRequired,
    onCompletedCount: PropTypes.number.isRequired
};

export default TodoCounter;