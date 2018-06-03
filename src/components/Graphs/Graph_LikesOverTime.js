import React, { Component } from 'react'
import {Line} from 'react-chartjs-2'
class Graph_LikesOverTime extends Component{
    constructor(props){
        super(props)
        this.state={ parsedUserData: props.parsedUserData }
        this.sortOverTime = this.sortOverTime.bind(this)
    }
    sortOverTime(){
        var parsedUserData = this.state.parsedUserData
        if(parsedUserData){
            parsedUserData = parsedUserData.sort((post1, post2) => {
                var date1 = post1.postDate
                var date2 = post2.postDate
                return(date1-date2)
            })
            var likesOverTime = {
                x: [],
                y: []
            } 
            for(var i=0; parsedUserData && i<parsedUserData.length; i++){
                var post = parsedUserData[i]
                likesOverTime.x.push(post.postDate.getFullYear().toString().substring(2)+"'"+(i+1))
                likesOverTime.y.push(post.postLikes)
            }
            return likesOverTime
        }
        else return undefined
    }
    render(){
        const graphData = this.sortOverTime()
        if(!graphData) return(<div></div>)
        else{
            const chartData = {
                labels: graphData.x,
                datasets: [{
                    label: 'Likes',
                    data: graphData.y,
                    backgroundColor: [
                        'rgba(245, 95, 46, 0.6)'
                    ]
                }]
            }
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
export default Graph_LikesOverTime