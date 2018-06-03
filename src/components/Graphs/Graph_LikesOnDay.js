import React, { Component } from 'react'
import {Bar} from 'react-chartjs-2'

class Graph_LikesOnDay extends Component{
    constructor(props){
        super(props)
        this.state={ parsedUserData: props.parsedUserData }
        this.sortByDay = this.sortByDay.bind(this)
        this.calculateAverageLikes = this.calculateAverageLikes.bind(this)
    }

    sortByDay(){
        var parsedUserData = this.state.parsedUserData
        /*Had to use bubble sort because .sort() wasnt working for this instance
        if(parsedUserData){
            for(var i=0; i<parsedUserData.length-1; i++){
                for(var j=0; j<parsedUserData.length-i-1; j++){
                    if(parsedUserData[j+1].postDate.getDay() < parsedUserData[j].postDate.getDay()){
                        var tempPost = parsedUserData[i]
                        parsedUserData[j]= parsedUserData[j+1]
                        parsedUserData[j+1] = tempPost
                    }
                }
            }
            //this.setState({parsedUserData: parsedUserData})
        }
       */
        if(parsedUserData){
            parsedUserData.sort((post1, post2) => {
                var day1 = post1.postDate.getDay()
                var day2 = post2.postDate.getDay()
                return(day1-day2)
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
                colors: [],
                recomendedPostDay: undefined
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
                graphData.x.push(daysOfWeek[post.postDate.getDay()])
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
            
            var recommendedPostDay = graphData.y[0]
            for(i=0; i<graphData.y.length; i++){
                if(graphData.y[i] > recommendedPostDay){
                    graphData.colors.push('rgba(255,215,0,0.6)')
                    recommendedPostDay = graphData.x[i]
                } 
                else graphData.colors.push(defaultColor)
            }
            graphData.recommendedPostDay = recommendedPostDay;
            return graphData
        }else return undefined
    }

    componentDidMount(){
        this.sortByDay()
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
                <div className="component-graph graphdaylike">
                    <h2 className='recommended-post-time'>You should post pictures at: {graphData.recommendedPostTime}</h2>
                    <Bar
                        data={chartData}
                        options={
                            {
                                title:{
                                    display:true,
                                    text:'Average likes at a time of the week',
                                    fontSize:30
                                },
                                legend:{
                                    display: true,
                                    position:'top'
                                }
                            }
                        }
                    />
                </div>
            )
        }else return(<div></div>)
    }
}
export default Graph_LikesOnDay