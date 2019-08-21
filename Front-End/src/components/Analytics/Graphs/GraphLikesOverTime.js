import React, { Component } from 'react'
import { Line } from 'react-chartjs-2'
export default class GraphLikesOverTime extends Component {
    constructor(props){
        super(props);
        this.state = {};
    }
    sortOverTime = () => {
        var parsedUserData = this.props.userPosts
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
            for(var i=0; i<parsedUserData.length; i++){
                var post = parsedUserData[i]
                likesOverTime.x.push(post.postDate.toDateString())
                likesOverTime.y.push(post.postLikes)
            }
            return likesOverTime
        }
        else return undefined
    }
    render() {
        const graphData = this.sortOverTime()
        if(!graphData) return(<div></div>)
        else{
            const chartData = {
                labels: graphData.x,
                datasets: [
                    {
                        label: 'Likes',
                        data: graphData.y,
                    }
                ]
            }
            return(
                <section className="graph-likes-at-time-component graph row center-x">
                    <Line
                        data={chartData}
                        options={
                            {
                                title:{
                                    display: true,
                                    fontSize: 25
                                },
                                legend:{
                                    display: false,
                                    position: 'top'
                                }
                            }
                        }
                    />
                </section>
            )
        }
    }
}

/*
import React, { Component } from 'react'
import {Line} from 'react-chartjs-2'
class GraphLikesOverTime extends Component{
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
            for(var i=0; i<parsedUserData.length; i++){
                var post = parsedUserData[i]
                likesOverTime.x.push(post.postDate.toDateString())
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
                                text:'- Likes over last '+ graphData.x.length + ' posts -',
                                fontSize:25
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
export default GraphLikesOverTime
*/