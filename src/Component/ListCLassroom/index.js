
import React, { Component } from 'react';
import { Modal } from 'react-bootstrap';
import Axios from 'axios';
import Classroom from '../Classroom';

export default class ListClassRoom extends Component {
    constructor(props){
        super(props);
        this.state = {
            arrayClassRoom:[],
            show: false,
            name: ""
        }
        
    }

    listClassRoom = (listCls) => {
        return listCls.map((ele) => <Classroom dataClass={ele}/>)
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
    
    onSubmitHandler = async(e) => {
        e.preventDefault();

        await fetch("https://classroom-api-w03.herokuapp.com/classes", {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({name: this.state.name}) // body data type must match "Content-Type" header
        });
        
        window.location.reload();
    }

    onChangeHandler = (e) => this.setState({ name: e.target.value });
    onHandleClose = () => this.setState({show: false});
    onHandleShow = () => this.setState({show: true});

    render(){
        return(
        <div className="p-3">
            <div className="btn-new">
                <button className="btn btn-success" onClick={this.onHandleShow}> New Class </button>
            </div>
            <div className="text-center">
                {this.listClassRoom(this.state.arrayClassRoom)}
            </div>

            <Modal show={this.state.show} onHide={this.onHandleClose}>
                <Modal.Header closeButton>
                <Modal.Title>Adding Classroom</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={this.onSubmitHandler} action="https://classroom-api-w03.herokuapp.com/classes" method="POST">
                        <div className="row">
                            <div className="col-9">
                                <input type="text" name="name" className="form-control" placeholder="New class name..." onChange={this.onChangeHandler} />
                            </div>
                            <div className="col">
                                <button type="submit" className="btn btn-success"> Add Class </button>
                            </div>
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                <div onClick={this.onHandleClose}>
                    <button className="btn btn-dark" onClick={this.onHandleShow}> Close </button>
                </div>
                </Modal.Footer>
            </Modal>
        </div>
        )
    }
}