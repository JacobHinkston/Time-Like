import React, { Component } from 'react'
import {Bar} from 'react-chartjs-2'

class GraphTimeODLikes extends Component{
    constructor(props){
        super(props)
        this.state = {
            userInfo: props.userInfo,
            userPosts: props.userPosts,
            parsedUserInfo: props.parsedUserInfo
        }
        this.sortByTimeme = this.sortByTime.bind(this)
        this.calculateAverageLikes = this.calculateAverageLikes.bind(this)
        this.genBackroundColor = this.genBackroundColor.bind(this)

    }
    sortByTime(){
        var parsedUserInfo = this.state.parsedUserInfo
        parsedUserInfo.sort((post1, post2) => {
            var time1 = post1.postDate.getHours()
            var time2 = post2.postDate.getHours()
            return(time1-time2)
        })
        this.setState({ parsedUserInfo: parsedUserInfo })
    }
    genBackroundColor(posts){
        for(var i=0; i<posts.length; i++){

        }
    }
    calculateAverageLikes(){
        var posts = {
            x: [],
            y: []
        }
        this.state.parsedUserInfo.forEach(post => {
            var militaryPostTime = post.postDate.getHours()
            var timeParse = (militaryPostTime + 12) % 12
            var timeOfPost;
            if (timeParse == militaryPostTime) timeOfPost = (timeParse + "am")
            else if (timeParse == 0) timeOfPost = (12 + "pm")
            else timeOfPost = (timeParse + "pm")
            posts.x.push(timeOfPost)
            posts.y.push(post.postLikes)
        })
        
        for(var i=0; i<posts.x.length; i++){
            if(posts.x[i]==posts.x[i+1]){
                var numLikes = posts.y[i]
                var count = 1;
                for(var j=i; j<posts.x.length && posts.x[j]==posts.x[i]; j++, count++){
                    numLikes+=posts.y[j]
                }
                posts.y[i] = numLikes / count
                posts.x[i] += " - (" + count + " posts)"
                posts.y.splice(i+1, count-1)
                posts.x.splice(i+1, count-1)
                i-=(count-1)
            }
        }
        return posts
    }

    componentDidMount(){
        this.sortByTime()
    }
    render(){
        const xData = this.calculateAverageLikes().x
        const yData = this.calculateAverageLikes().y
        const chartData = {
            labels: xData,
            datasets: [{
                label: 'Likes',
                data: yData,
                backgroundColor: 'rgba(245, 95, 46, 0.6)'
            }]
        }
        return(
            <div className="component-graph graphtimeodlike">
                <Bar
                    data={chartData}
                    options={{
                        title:{
                            display:true,
                            text:'Likes over time - Time of day VS Likes',
                            fontSize:40
                    },
                    legend:{
                        display: true,
                        position:'top'
                    }
                }}
                />
            </div>
        )
    }
}
export default GraphTimeODLikes