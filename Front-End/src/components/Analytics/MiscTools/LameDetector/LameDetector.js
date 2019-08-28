import React, { Component } from 'react'
import './LameDetector.sass';
export default class HowLame extends Component {
    constructor(props){
        super(props);
        this.state={
            userPosts: props.userPosts.reverse()
        };
    }
    findNumRows = (numColumns, numPics) => {
        return (
            numPics % numColumns === 0 ?
            Math.round(numPics / numColumns) :
            Math.round((numPics + 1) / numColumns)
        );
    }
    renderUserPosts = (numColumns) => {
        let userPosts = []
        const numRows = this.findNumRows(numColumns, this.state.userPosts.length)
        for(let r = 1, i = 0; r <= numRows; r++){
            let columnPosts = []
            for(let c = 1; c <= numColumns; c++, i++){
                let picture = this.state.userPosts[i]
                if(picture !== undefined){
                    columnPosts.push(
                        <img 
                            className="component-user-picture col-1"
                            src={picture.thumbnail}
                        />
                    )
                } else {
                    columnPosts.push( 
                        <div className='component-user-picture col-1'></div>
                    )
                }
            }
            userPosts.push( 
                <section className='user-picture-row row center-y'>
                    {columnPosts}
                </section>
            )
        }
        return userPosts
    }
    calcHowLame = () => {
        let numLikedPosts = 0;
        this.state.forEach(post => {
            if(post.likedOwnPost){
                numLikedPosts++;
            }
        });
    }
    render() {
        
        return (
            <div className="lame-detector-component">
                <h2
                    className="analytics-header"
                >
                    How Lame are you?
                </h2>
                <h3
                    className="analytics-header-2"
                >
                    What is the LameDetector?
                </h3>
                <p>The Lamedetector will tell you how lame you are, based on several criteria.</p>
                <h3
                    className="analytics-header-2"
                >
                    How does the LameDetector work?
                </h3>
                <p>
                    The Lamedetector will tell you how lame you are, based on several criteria.
                </p>
                {/* <div className="">
                    {this.renderUserPosts()}
                </div> */}
            </div>
            
        )
    }
}


