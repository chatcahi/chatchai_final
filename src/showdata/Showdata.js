import React, {Component} from "react";
import axios from "axios";
import Modal from 'react-awesome-modal';
import './Showdata.css';
//import '../../server/app';
import {ip,port} from "../setIP/setting";

export default class Showdata extends Component{
    constructor() {
        super();
        this.state ={
            list:[],
            timestamp:"",
            idkey:"",
            name:"",
            size:"",
            email:"",
            quantity:""
        }
        this.handleChang = this.handleChang.bind(this);
        this.handleClicked = this.handleClicked.bind(this);
        //console.log("hello show data");
    }
    componentDidMount() {
        //console.log("before get data");
        this.getData();
        //console.log("after get data");
    }
    getData = () => {
        console.log("before fetch data");
        fetch('/data')
            .then(res => res.json())
            .then(list => this.setState({ list }))
        console.log("after fetch data");
    }

    onDelete=(user)=>{
        let url = `https://localhost:3000/delete`;
        let data = {
            idkey:user.id
        }
        axios.put(url,data)
        setTimeout(()=>{this.componentDidMount()},1)
    }

    openModal() {
        this.setState({
            visible : true
        });

    }
    closeModal() {
        this.setState({
            visible : false
        });
    }
    call=(user)=>{
        this.openModal();
        this.setState({
            timestamp:user.timestamp,
            idkey:user.id,
            name:user.name,
            size:user.size,
            email:user.email,
            quantity:user.quantity
        })
    }
    handleChang = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        });
        let url = `https://localhost:3000/data`;
        let data = {
            timestamp:this.timestamp,
            idkey:this.state.idkey,
            name:this.name,
            size:this.size,
            email:this.email,
            quantity:this.quantity
        }
        axios.put(url,data)
    }

    handleClicked(){
        let url = `https://localhost:3000/data`;
        let data = {
            timestamp:this.timestamp,
            idkey:this.state.idkey,
            name:this.state.name,
            size:this.state.size,
            email:this.state.email,
            quantity:this.state.quantity
        }
        axios.put(url,data)
        this.setState({
            timestamp:"",
            idkey:"",
            name:"",
            size:"",
            email:"",
            quantity:""
            
        });
	this.closeModal();
        setTimeout(()=>{this.componentDidMount()},1)
    }
    render() {
        let {list} = this.state;

        return (
            <div className="App">
                <h2 className="my-4">👕👕 ข้อมูลผู้สั่งซื้อเสื้อ 👕👕<br/></h2>
                <hr/>
                <form >
                    <label form="">ชื่อ</label>
                    <input type="text" placeholder="ป้อนชื่อที่ค้นหา" name="emname" class="form-control"></input>
                </form>
                <div className="container p-3 my-3 bg-dark text-white">
                    <table className="table table-dark">
                        <thead>
                            <tr>
                            <th>เวลาสั่งซื้อ</th>
                            <th>หมายเลข</th>
                            <th>ชื่อ</th>
                            <th>ไซส์</th>
                            <th>อีเมล์</th>
                            <th>จำนวน</th>
                            </tr>
                        </thead>
                        <tbody>
                                {list.map((user) =>{
                                    return(
                                        <tr>
                                            <td>{user.timestamp}</td>
                                            <td>{user.id}</td>
                                            <td>{user.name}</td>
                                            <td>{user.size}</td>
                                            <td>{user.email}</td>
                                            <td>{user.quantity}</td>
                                            <td><button type="button" class="btn btn-warning" onClick={()=>this.call(user)}>Edit</button></td>
                                            <td><button type="button" class="btn btn-danger"  onClick={()=>this.onDelete(user)}>Delete</button></td>
                                            <div className="box">
                                                <Modal visible={this.state.visible}
                                                       width="1200"
                                                       height="600"
                                                       effect="fadeInUp"
                                                       onClickAway={() => this.closeModal()}
                                                >
                                                    <form className="container" id='form'>
                                                        
                                                        <div className="form-group">
                                                            <h3><label htmlFor="id">TimeStamp: {this.state.timestamp}<br/></label></h3>
                                                        </div>
                                                        <div className="form-group">
                                                            <h3><label htmlFor="id">ID: {this.state.idkey}<br/></label></h3>
                                                        </div>
                                                        <div className="form-group">
                                                            <label>name:</label>
                                                            <input type="text" className="form-control" id="name" onChange={this.handleChang} value={this.state.name}/>
                                                        </div>
                                                        <div className="form-group">
                                                            <label>size:</label>
                                                            <input type="text" className="form-control" id="size" onChange={this.handleChang} value={this.state.size}/>
                                                        </div>
                                                        <div className="form-group">
                                                            <label>quantity:</label>
                                                            <h3><label htmlFor="quantity">quantity: {this.state.quantity}<br/></label></h3>
                                                        </div>
                                                        <button type="button" className="btn btn-primary" onClick={this.handleClicked}>Submit</button>
                                                    </form>
                                                </Modal>
                                            </div>
                                        </tr>
                                    )})}
                        </tbody>
                    </table>
                </div><br/>
            </div>
        );
    }
}
