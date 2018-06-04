import React, { Component } from 'react'
import {Bar} from 'react-chartjs-2'

class Graph_LikesAtTime extends Component{
    constructor(props){
        super(props)
        this.state = { parsedUserData: props.parsedUserData }
        this.sortByTime = this.sortByTime.bind(this)
        this.calculateAverageLikes = this.calculateAverageLikes.bind(this)
    }

    sortByTime(){
        var parsedUserData = this.state.parsedUserData
        if(parsedUserData){
            parsedUserData.sort((post1, post2) => {
                var time1 = post1.postDate.getHours()
                var time2 = post2.postDate.getHours()
                return(time1-time2)
            })
            this.setState({ parsedUserData: parsedUserData })
        }
    }

    calculateAverageLikes(){
        if(this.state.parsedUserData){
            const defaultColor = 'rgba(245, 95, 46, 0.6)'
            var graphData = {
                x: [],
                y: [],
                colors:[],
                recommendedPostTime: undefined
            }
            this.state.parsedUserData.forEach(post => {
                var militaryPostTime = post.postDate.getHours()
                var timeParse = (militaryPostTime + 12) % 12
                var timeOfPost;
                if (timeParse === militaryPostTime) timeOfPost = (timeParse + "am")
                else if (timeParse === 0) timeOfPost = (12 + "pm")
                else timeOfPost = (timeParse + "pm")
                graphData.x.push(timeOfPost)
                graphData.y.push(post.postLikes)
            })
            for(var i=0; i<graphData.x.length; i++){
                if(graphData.x[i]===graphData.x[i+1]){
                    var numLikes = graphData.y[i]
                    var count = 1;
                    for(var j=i; j<graphData.x.length && graphData.x[j]===graphData.x[i]; j++, count++){
                        numLikes+=graphData.y[j]
                    }
                    graphData.y[i] = numLikes / count
                    graphData.x[i] += " - (" + count + " posts)"
                    graphData.y.splice(i+1, count-1)
                    graphData.x.splice(i+1, count-1)
                    i-=(count-1)
                }
            }
            var recommendedPostTime = graphData.y[0]
            for(i=0; i<graphData.y.length; i++){
                if(graphData.y[i] > recommendedPostTime){
                    graphData.colors.push('rgba(255,215,0,0.6)')
                    recommendedPostTime = graphData.x[i]
                } 
                else graphData.colors.push(defaultColor)
            }
            graphData.recommendedPostTime = recommendedPostTime;
            return graphData
        }else return undefined
    }

    componentDidMount(){
        this.sortByTime()
    }

    render(){
        const graphData = this.calculateAverageLikes()
        if(graphData){
            const xData = graphData.x
            const yData = graphData.y
            const colors = graphData.colors
            const chartData = {
                labels: xData,
                datasets: [{
                    label: 'Average Likes',
                    data: yData,
                    backgroundColor: colors
                }]
            }
            return(
                <div className="component-graph graphtimeodlike">
                    
                    <Bar
                        data={chartData}
                        options={
                            {
                                title:{
                                    display:true,
                                    text:'Average Likes At A Time Of Day',
                                    fontSize:30
                                },
                                legend:{
                                    display: true,
                                    position:'top'
                                }
                            }
                        }
                    />
                    <h2 className='recommended-post-time'>You should post pictures around {graphData.recommendedPostTime}</h2>
                </div>
            )
        }else return(<div></div>)
    }
}
export default Graph_LikesAtTime