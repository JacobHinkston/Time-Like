import React, { Component } from 'react'
import {Bar} from 'react-chartjs-2'

class GraphLikesAtTime extends Component{
    constructor(props){
        super(props)
        this.state = { parsedUserData: props.parsedUserData }
        this.parseGraphData = this.parseGraphData.bind(this)
        this.calculateAverageLikes = this.calculateAverageLikes.bind(this)
        this.calculateGraphColors = this.calculateGraphColors.bind(this)
    }
    parseGraphData(){
        if(this.state.parsedUserData){
            var graphData = {
                x: [],
                y: [],
                graphColors:[],
                recommendedPostTime: undefined
            }
            this.state.parsedUserData.forEach(post => {
                var militaryPostTime = post.postTime
                var timeParse = (militaryPostTime + 12) % 12
                var timeOfPost;
                if (timeParse === militaryPostTime) timeOfPost = (timeParse + "am")
                else if (timeParse === 0) timeOfPost = (12 + "pm")
                else timeOfPost = (timeParse + "pm")
                graphData.x.push(timeOfPost)
                graphData.y.push(post.postLikes)
            })
            graphData = this.calculateAverageLikes(graphData)
            var calculatedGraphColors = this.calculateGraphColors(graphData.y, graphData.x)
            graphData.graphColors = calculatedGraphColors.graphColors
            graphData.recommendedPostTime = calculatedGraphColors.mostLikedPostTime.split(' ')[0]
            return graphData
        }else return undefined
    }
    calculateAverageLikes(graphData){
        for(var i=0; i<graphData.x.length-1; i++){
            var postLikes = graphData.y[i]
            var countOfPosts = 1
            if(graphData.x[i] === graphData.x[i+1]){ for(
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
        const mediumColor = 'rgba(255, 128, 0, 0.6)'
        const medhighColor = 'rgba(255,255,0,0.6)'
        const highColor = 'rgba(0,255,0, 0.6)'
        
        var mostLikedPost = yGraphData[0], mostLikedPostTime = xGraphData[0]
        var leastLikedPost = yGraphData[0]
        for(var i=0;i<yGraphData.length; i++){
            if(yGraphData[i] > mostLikedPost){
                mostLikedPost = yGraphData[i]
                mostLikedPostTime = xGraphData[i]
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
            mostLikedPostTime: mostLikedPostTime
        }
    }
    render(){
        const graphData = this.parseGraphData()
        if(graphData){
            //this.props.bestPostTime('bestPostTime', graphData.recommendedPostTime)
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
                <div className="component-graph graphtimeodlike">
                    <p className='graph-info'>
                        The graph shown below, displays thee average likes of all posts in a 24 hour range. This will allow you to estimate WHAT TIME you should post a picture to instagram in order to maximize your likes.
                    </p>
                    <Bar
                        data={chartData}
                        options={
                            {
                                title:{
                                    display:true,
                                    text:'- Average likes of a post, posted at any time of day -',
                                    fontSize:25
                                },
                                legend:{
                                    display: false,
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
export default GraphLikesAtTime