
import React, { Component } from 'react';
import { Card } from 'react-bootstrap';

export default class Classroom extends Component {
    constructor(props){
        super(props);
    
    }

    render(){
        return(
        <Card>
            <p>{this.props.dataClass.name}</p>
        </Card>
        )
    }
}