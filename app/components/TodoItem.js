import React, {PropTypes} from 'react';
import { Button, List, Checkbox, Header, Grid,} from 'semantic-ui-react';

const TodoItem = (props)=>{
    let s2 = {position: "absolute", top: "226px", right: "29px"}
    let s3 = {wordWrap: "break-word", maxWidth: "350px", textAlign: "justify"}
    let s4 = {height: "inherit"}
    let s5 = {width: "100%"}

    return(
        <List.Item style={s4}>  
            <List.Icon>
                <Checkbox checked={props.todo.isCompleted} onChange={()=>{
                    props.onClickTodo(props.todo, props.index);
                }}/>
            </List.Icon>
            <List.Content style={s5}>
                <Grid columns={2}>
                    <Grid.Row>
                        <Grid.Column width={13} >
                            <List.Header>
                                <Header style={s3} color='blue' as='h5'>{props.todo.name}</Header>
                            </List.Header>
                            <List.Description>{props.todo.isCompleted?'Completed':'Open'}</List.Description>
                        </Grid.Column>
                        <Grid.Column width={3}>
                            <Button floated="right" circular icon='remove' onClick={(e)=>{
                                e.preventDefault()
                                props.onDeleteTodo(props.index,props.todo)}
                            }/>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </List.Content>
        </List.Item>
    );
}

TodoItem.propTypes = {
   todo: PropTypes.object.isRequired,
   onDeleteTodo: PropTypes.func.isRequired,
   onClickTodo: PropTypes.func.isRequired
};

export default TodoItem;