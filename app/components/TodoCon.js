import React, {PropTypes} from 'react';
import { Container, Grid, Segment, Label, Header, Button,Icon } from 'semantic-ui-react'



const TodoCon = (props)=>{
    let s1 = {padding: "130px 0px"}
    let s2 = {backgroundColor: "white"}
    let s3 = {padding:"20px 0"}
    let s4 = {padding:"0 10px"}
    let s5 = {position: "absolute", top: "19px"}
    return(
        <Container style={s1}>
            <Grid verticalAlign='middle' centered>
                <Grid.Column textAlign='left' width={7} >
                    <Segment id="userTodo">
                        <Label as='a' color='teal' ribbon='right' style={{cursor:'pointer'}} onClick={props.logout}>Logout</Label>
                        <Container style={s5}>
                            <Icon name="user"/> {props.user.firstName} | {props.user.username}
                        </Container>
                    </Segment>
                    <Segment raised style={s2}>
                        <Label as='a' color='red' ribbon>Todos</Label>
                            <span><Header as='h2' textAlign='center' style={s3} >TODOS </Header></span> 
                            {props.children}
                    </Segment>
                </Grid.Column>
            </Grid>
        </Container>
    );
}

export default TodoCon;