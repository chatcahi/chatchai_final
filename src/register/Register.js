import React, {Component} from "react";
import axios from "axios";
import {ip,port} from "../setIP/setting";

export default class Register extends Component{
    constructor() {
        super();
        this.state = {
            idkey:"",
            name:"",    
            size:"",
            quantity:"",
            email:localStorage.getItem("user").email,
        }
        this.handleChang = this.handleChang.bind(this);
        this.handleClicked = this.handleClicked.bind(this);
    }
    handleChang = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        });
    }
    handleClicked(){
        let url = `https://localhost:3000/data`;
        let data = {
            idkey:this.state.idkey,
            name:this.state.name,
            size:this.state.size,
            quantity:this.state.quantity,
            email:JSON.parse(localStorage.getItem('user')).email,
            
        }
        axios.post(url,data)
        this.setState({
            idkey:"",
            name:"",    
            size:"",
            quantity:"",
            email:""
        });
    }

    render() {
        return(
            <div>
                <div className="App">
                <h2 className="my-4">Register<br/></h2>
                    <hr/>
                </div>
                <form className="container">
                <div className="form-group">
                        <label className="text-white"  htmlFor="id">หมายเลข</label>
                        <input type="text" className="form-control" size="10" id="idkey" onChange={this.handleChang} value={this.state.idkey}/>
                        </div>
                    <div className="form-group">
                        <label className="text-white" >ชื่อ</label>
                        <input type="text" className="form-control" id="name" onChange={this.handleChang} value={this.state.name}/>
                    </div>
                    <div className="form-group">
                        <label className="text-white"  >ไซส์</label>
                        <input type="text" className="form-control" id="size" onChange={this.handleChang} value={this.state.size}/>
                    </div>
                    <div className="form-group">
                    <label className="text-white"  htmlFor="quantity">จำนวน</label>
                        <input type="text" className="form-control" size="255" id="quantity" onChange={this.handleChang} value={this.state.quantity}/>
                    </div>
                    <a href="/Showdata">
                    <button type="button" className="btn btn-primary" onClick={this.handleClicked}>Submit</button>
                    </a>
                </form>
            </div>
        );
    }
}
