import React, {PropTypes} from 'react';
import { Button, Form , Card, Container, Grid, Segment, Label, Header  } from 'semantic-ui-react'

const SignupForm = (props)=>{
  let s1 = {padding: "130px 0px"}
  let s2 = {backgroundColor: "white"}
  let signButton={position: "absolute", right:"0"}
  return (
        <Container style={s1}>
          <Grid verticalAlign='middle' centered>
            <Grid.Column textAlign='left' width={7} >
              <Segment raised style={s2}>
                  <Label as='a' color='red' ribbon>Sign Up</Label>
                  <span><Header as='h3' textAlign='center'>Nice meeting you!</Header></span>
                  <div className="ui error message" style={{display:(props.error?'block':'none')}}>
                      <div className="content">
                        <div className="header" id="errField">Oooops!</div>
                      </div>
                  </div>
                  <Form onSubmit={props.onSignup}>
                    <Form.Field>
                      <label>First Name</label>
                      <input placeholder='First Name' required="true" name="firstName" onChange={props.onChange}/>
                    </Form.Field>
                    <Form.Field>
                      <label>Last Name</label>
                      <input placeholder='Last Name' required="true" name="lastName" onChange={props.onChange}/>
                    </Form.Field>
                    <Form.Field>
                      <label>Email</label>
                      <input type="email" onChange={props.onChange} placeholder='Email' required="true" name="username"/>
                    </Form.Field>
                    <Form.Field>
                      <label>Password</label>
                      <input placeholder='Password' type="password" required="true" name="password" onChange={props.onChange}/>
                    </Form.Field>
                    <Button type='submit'>Submit</Button>
                </Form>
              </Segment>
            </Grid.Column>
          </Grid>
        </Container>
  );
}

SignupForm.propTypes={
  error: PropTypes.bool.isRequired,
  onSignup: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired
}

export default SignupForm ;