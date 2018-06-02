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
        for(var i=0; this.state.parsedUserInfo && i<this.state.parsedUserInfo.length; i++){
            var post = this.state.parsedUserInfo[i]
            likes_Time.x.push(post.postDate.getFullYear().toString().substring(2)+"'"+(i+1))
            likes_Time.y.push(post.postLikes)
        }
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
        if(!this.state.parsedUserInfo) return(<div></div>)
        else{
            return(
                <div className="component-graph graphtimelike">
                
                    <Line
                        data={chartData}
                        options={
                            {
                            title:{
                                display:true,
                                text:'Likes Over Time',
                                fontSize:30
                            },
                            legend:{
                                display:true,
                                position:'top'
                            }
                            }
                        }
                    />
                </div>
            )
        }
        
    }
}
export default GraphTimeLike