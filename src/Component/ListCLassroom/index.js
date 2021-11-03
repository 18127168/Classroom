
import React, { Component } from 'react';
import Axios from 'axios';
import Classroom from '../Classroom';

export default class ListClassRoom extends Component {
    constructor(props){
        super(props);
        this.state={
            arrayClassRoom:[],
            formValue:{
                nameValue:'',
            }
        }
        
    }
    listClassRoom=(listCl)=>{
        console.log(this.state.arrayClassRoom);

        return listCl.map((classr,index)=>{
            return(<Classroom dataClass={classr}/>)
        })

    }

    componentWillMount(){
        Axios({
            method:'GET',
            url:'https://classroom-api-w03.herokuapp.com/classes'
        }).then((res)=>{
            this.setState({
                arrayClassRoom: res.data
            })
        }).catch((error)=>{
            console.log(error);
        });
    }   
    getValueFromForm=(e)=>{
        this.setState({
            formValue:{
                nameValue:e.target.value,
            }
        })

    }
    addDataToAPI=()=>{
        let arrayClassRoom1=[...this.state.arrayClassRoom];//copy aray
        arrayClassRoom1.push(this.state.formValue);
        Axios({
            method:'POST',
            url:'https://classroom-api-w03.herokuapp.com/classes',
            data:this.state.formValue
        }).then((res)=>{
            this.setState({
                arrayClassRoom:arrayClassRoom1
            })
        })
    }
    
    render(){
        return(
        <div>
            <form>
                <div>
                  <input type="text" name="name" placeholder="New class name..." onChange={this.getValueFromForm}/>
                </div>
                <button onClick={this.props.onClick}> Add Clas </button>
            </form>
            {this.listClassRoom(this.state.arrayClassRoom)}
        </div>
        )
    }
}