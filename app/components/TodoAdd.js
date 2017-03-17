import React, {PropTypes} from 'react';
import { Button, Form,} from 'semantic-ui-react';

const TodoAdd = (props)=>{
    let s1 = {padding: "130px 0px"}
    let s2 = {backgroundColor: "white"}
    let s3 = {padding:"20px 0"}
    //let s4 = {padding:"0 10px"}
    return(
        <div>
            <Form onSubmit={props.onAddItem}>
                <Form.Group inline>
                    <Form.Field width={13}>
                        <input placeholder='todo' />
                    </Form.Field>
                    <Button secondary floated="right" type='submit' disabled={props.isLoadingItem}>Submit</Button>
                </Form.Group>
            </Form>
        </div>
    );
}

TodoAdd.propTypes = {
    onAddItem: PropTypes.func.isRequired,
    isLoadingItem: PropTypes.bool.isRequired
};

export default TodoAdd;