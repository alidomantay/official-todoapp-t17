import React, {PropTypes} from 'react';
import {
  Link
} from 'react-router-dom'
import { Button, Form, Card, Container, Grid, Segment, Label, Header } from 'semantic-ui-react'


const LoginForm= (props)=>{
    let s1 = {padding: "130px 0px"}
    let s2 = {backgroundColor: "white"}
    let signButton={position: "absolute", right:"0"}
    return (
        <Container style={s1}>
            <Grid verticalAlign='middle' centered>
                <Grid.Column textAlign='left' width={7} >
                    <Segment raised style={s2}>
                        <Label as='a' color='red' ribbon>Login</Label>
                        <span><Header as='h3' textAlign='center'>Welcome back! </Header></span>
                        <Form onSubmit={props.onLogin}>
                            <Form.Field>
                                <label>Email</label>
                                <input name="username" id="email" type="email" placeholder='Email' onChange={props.onChange}/>
                            </Form.Field>
                            <Form.Field>
                                <label>Password</label>
                                <input name="password" id="password" type="password" placeholder='Password' type="password" onChange={props.onChange}/>
                            </Form.Field>
                                <Button color='blue' type='submit'>Submit</Button>
                                <Link to="/signup"><Button basic color='teal' style={signButton}>Sign Up Here!</Button></Link>
                        </Form>     
                    </Segment>
                </Grid.Column>
            </Grid>
        </Container>
    );
}

LoginForm.propTypes={
  onLogin: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired
}

export default LoginForm;