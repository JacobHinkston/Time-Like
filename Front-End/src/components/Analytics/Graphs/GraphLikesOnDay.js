import React, { Component } from 'react'

export default class GraphLikesOnDay extends Component {
    constructor(props){
        super(props);
        this.state = {};
    }
    render() {
        return (
            <div>
                
            </div>
        )
    }
}
/*
import React, { Component } from 'react'
import {Bar} from 'react-chartjs-2'

class GraphLikesOnDay extends Component{
    constructor(props){
        super(props)
        this.state={ parsedUserData: props.parsedUserData }
        this.parseGraphData = this.parseGraphData.bind(this)
        this.calculateAverageLikes = this.calculateAverageLikes.bind(this)
        this.calculateGraphColors = this.calculateGraphColors.bind(this)
    }
    parseGraphData(){
        if(this.state.parsedUserData){
            var graphData = {
                x: [],
                y: [],
                colors: [],
                recommendedPostDay: undefined
            }
            const daysOfWeek=[
                'Sunday',
                'Monday',
                'Tuesday',
                'Wednesday',
                'Thursday',
                'Friday',
                'Saturday'
            ]
            this.state.parsedUserData.forEach(post => {
                graphData.x.push(daysOfWeek[post.postDay])
                graphData.y.push(post.postLikes)
            })
            graphData=this.calculateAverageLikes(graphData)
            var calculatedGraphColors = this.calculateGraphColors(graphData.y, graphData.x)
            graphData.graphColors = calculatedGraphColors.graphColors
            graphData.recommendedPostTime = calculatedGraphColors.recommendedPostTime
            graphData.recommendedPostDay = calculatedGraphColors.mostLikedPostDay.split(' ')[0];
            return graphData
        }else return undefined
    }
    calculateAverageLikes(graphData){
        for(var i=0; i<graphData.x.length-1; i++){
            var postLikes = graphData.y[i]
            var countOfPosts = 1
            if(graphData.x[i] === graphData.x[i+1]){ 
                for(
                    var j=i+1;
                    j<graphData.x.length
                    &&
                    graphData.x[i]===graphData.x[j];
                    j++,
                    countOfPosts++
                ){
                    postLikes+=graphData.y[j]
                }
                graphData.x[i]+=(' - (' + countOfPosts + ' posts)')
                graphData.y[i] = postLikes/countOfPosts
                graphData.x.splice(i+1, countOfPosts-1)
                graphData.y.splice(i+1, countOfPosts-1)
            }
        }
        return graphData
    }
    calculateGraphColors(yGraphData, xGraphData){
        const lowColor = 'rgba(255,0,0, 0.6)'
        const mediumColor = 'rgba(255,255,0,0.6)'
        const medhighColor = 'rgba(255, 128, 0, 0.6)'
        const highColor = 'rgba(0,255,0, 0.6)'
        
        var mostLikedPost = yGraphData[0], mostLikedPostDay = xGraphData[0]
        var leastLikedPost = yGraphData[0]
        for(var i=0;i<yGraphData.length; i++){
            if(yGraphData[i] > mostLikedPost){
                mostLikedPost = yGraphData[i]
                mostLikedPostDay = xGraphData[i]
            } 
            if(yGraphData[i] < leastLikedPost) leastLikedPost = yGraphData[i]
        }
        var threshHold = mostLikedPost-leastLikedPost;
        var lowThreshhold = leastLikedPost + threshHold*(1/3)
        var medThreshhold = leastLikedPost + threshHold*(2/3)

        var graphColors = yGraphData.map(data => {
            if(data <= lowThreshhold) return lowColor
            else if(data <= medThreshhold) return mediumColor
            else if(data > medThreshhold && data < mostLikedPost) return medhighColor
            else return highColor
        })
        return {
            graphColors: graphColors,
            mostLikedPostDay: mostLikedPostDay
        }
    }
    render(){
        const graphData = this.parseGraphData()
        if(graphData){
            //this.props.bestPostTime('bestPostDay', graphData.recommendedPostDay)
            const xData = graphData.x
            const yData = graphData.y
            const colors = graphData.graphColors
            const chartData = {
                labels: xData,
                datasets: [{
                    label: 'Average Likes',
                    data: yData,
                    backgroundColor: colors
                }]
            }
            return(
                <div className="component-graph graphdaylike">
                    <p className='graph-info'>
                        The graph shown below, displays thee average likes of all posts durring the week. This will allow you to estimate WHAT DAY durring the week you should post a picture to instagram in order to maximize your likes.
                    </p>
                    <Bar
                        data={chartData}
                        options={
                            {
                                title:{
                                    display:true,
                                    text:'- Average likes of posts on days of the week -',
                                    fontSize:25
                                },
                                legend:{
                                    display: false,
                                    position:'top'
                                }
                            }
                        }
                    />
                    <h2 className='recommended-post-time'>You should post pictures on {graphData.recommendedPostDay}</h2>
                </div>
            )
        }else return(<div></div>)
    }
}
export default GraphLikesOnDay
*/