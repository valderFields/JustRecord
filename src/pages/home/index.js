import React,{ Component } from 'react';
import {requestPost} from '../../../utils/api';
class Home extends Component {
	constructor(props) {
    	super(props);
  	}
    register = ()=>{
      requestPost({
        method:'user/signup',
        args:{
          username:'test',
          password:'test'
        },
        callback:(rsp)=>{
          console.log(rsp);
        }
      })
    }
   render() {
   	return(
   		<div onClick = {this.register}>
   			注册
   		</div>
   	)
   }
}
export default Home;