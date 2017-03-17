import React, {PropTypes} from 'react';
import { Button, Form, Container} from 'semantic-ui-react';

const TodoClear = (props)=>{
    let s1 = {paddingTop: "15px"}
    return(
        <Container style={s1}>
            <Button onClick={props.clear} fluid primary>Clear Completed</Button>
        </Container>
    );
}

export default TodoClear;