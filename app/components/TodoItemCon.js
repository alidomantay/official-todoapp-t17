import React, {PropTypes} from 'react';
import { List, Container} from 'semantic-ui-react';

const TodoItemCon = (props)=>{
    let s1 = {padding: "10px 10px"}

    return(
        <Container>
            <List style = {s1} divided relaxed>
               {props.children}
            </List>
        </Container>
    );
}

export default TodoItemCon;