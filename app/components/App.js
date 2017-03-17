import React, {Component} from 'react';
import LoginForm from '../components/Login';
import { Container} from 'semantic-ui-react';
import { Grid } from 'semantic-ui-react'

class App extends Component{
    constructor(props){
        super(props)
        this.state={
            count: 1
        }
    }
    render(){
        return (
            <Container>
                <Grid padded centered >
                    <Grid.Row>
                        <Grid.Column>
                            {this.props.children}
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Container>
        )
    }
}
export default App;
