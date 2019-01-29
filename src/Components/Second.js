import React, { Component } from 'react'
import {connect} from 'react-redux'
//import userData from '../reducers/userData';

class Second extends Component {
     // componentDidMount(){
    //     const userData111 = this.props.userData
    //      this.setState({name :userData111.name, email: userData111.email})
    // }
    render () {
        const data = this.props.userData.user;
        console.log("SECOND : ",data)
        if(!data){
             return <div>Loading....</div>
        }
        else {
            return (
                <div>
                    UserName : {data.name}<br />
                    Email : {data.email}
                </div>
            )
        }
        
    }
}

const mapStateToProps = state =>{
    console.log("map", state.userData)
   return {userData : state.userData}
}

export default connect(mapStateToProps)(Second);