import React, { Component } from 'react'
class HowLame extends Component{
    constructor(props){
        super(props)
        this.state = {
            toggled: false,
            parsedUserData: props.parsedUserData,
            userPostsLength: props.userPostsLength
        }
        this.toggleHowLame = this.toggleHowLame.bind(this)
        this.findHowLame = this.findHowLame.bind(this)
    }
    toggleHowLame(){
        var toggled = this.state.toggled
        this.setState({ toggled: !toggled })
    }
    findHowLame(){
        var numPosts = this.state.userPostsLength
        var numLikedOwnPosts = this.state.parsedUserData.filter(post => {
            return(post.userLikedOwnPost)
        }).length
        if(numLikedOwnPosts===0) 
        return([
            'You have liked 0 of your own posts;', 
            'You are 0% lame!'
        ])
        else if(numPosts===0) return undefined
        else{
            const percentLame=(numLikedOwnPosts/numPosts)*10
            return([
                'You have liked ' + numLikedOwnPosts + ' of your own posts',
                'You are at the LEAST, ' + percentLame.toFixed(3) + "% lame"
            ])
        }
    }
    render(){
        var lameInfo
        var lameFeedback = this.findHowLame()
        if(!lameFeedback) return(<div></div>)
        if(this.state.toggled){
            lameInfo = (
                <div className ='lame-feedback'>
                    <h5>{lameFeedback[0]}</h5>
                    <h3 id='how-lame'>{lameFeedback[1]}</h3>
                </div> 
            )
        }
        return(
            <section className='component-howlame'>
                <section>
                    <button
                        className='toggle-lame'
                        onClick={this.toggleHowLame}
                    >Find out how LAME you are</button>
                    {lameInfo}
                </section>
            </section>
        )
    }
}
export default HowLame