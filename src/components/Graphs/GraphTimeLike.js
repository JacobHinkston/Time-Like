import React, { Component } from 'react'
import {Line} from 'react-chartjs-2'
class GraphTimeLike extends Component{
    constructor(props){
        super(props)
        this.state={
            userInfo: props.userInfo,
            userPosts: props.userPosts,
            parsedUserInfo: props.parsedUserInfo
        }
        this.likesOverTime = this.likesOverTime.bind(this)
    }
    likesOverTime(){
        var likes_Time = {
            x: [],
            y: []
        }
        for(var i=0; i<this.state.parsedUserInfo.length; i++){
            var post = this.state.parsedUserInfo[i]
            likes_Time.x.push(post.postDate.getFullYear().toString().substring(2)+"'"+(i+1))
            likes_Time.y.push(post.postLikes)
        }
        console.log(likes_Time)
        return likes_Time
    }
    render(){
        const chartData = {
            labels: this.likesOverTime().x,
            datasets: [{
                label: 'Likes',
                data: this.likesOverTime().y,
                backgroundColor: [
                    'rgba(245, 95, 46, 0.6)'
                ]
            }]
        }
        return(
            <div className="chart">
                <Line
                    data={chartData}
                    options={{
                        title:{
                            display:true,
                            text:'Likes over time:',
                            fontSize:12
                    },
                    legend:{
                        display:true,
                        position:'right'
                    }
                }}
                />
            </div>
        )
    }
}
export default GraphTimeLike