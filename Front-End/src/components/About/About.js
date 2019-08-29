import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import endpoints from '../../instagram.config';
import './About.sass';
export default class About extends Component {
    constructor(props){
        super(props);
        this.state = {};
    }
    render() {
        return (
            <main className="about-component col center-x center-y">
                <section>
                    <h2>
                        🎉 Introducing TimeLike 🎉
                    </h2>
                    <h2>Grow your instagram with free open-source tools!</h2>
                    <div className='about-info'>
                        <h3>What is TimeLike?</h3>
                        <p>TimeLike is simply put, a free instagram account anlyzer.</p>
                        <h4>The Inspiration</h4>
                        <p>
                            As per my second project at <a href="https://www.galvanize.com/web-development">Galvanize's Software Development Immersive</a> back in 2018, I was instructed to build a webapp using a front-end framework, and one API. I decided to build TimeLike with the following as a compass to drive development:
                        </p>
                        <div
                            style={
                                {
                                    padding: "10px",
                                    fontStyle: "italic",
                                    boxShadow: "0 2px 5px 0 rgba(0,0,0,.15)"

                                }
                            }
                        >
                            <p>
                                TimeLike is a web-app I created that attempts to solve the issue most people on instagram encounter when looking to promote or showoff something, only to find out no one liked it. Why could this be? The active instagramers crisis can be described as follows: Due to the rapid growth of social media, everyone and they mother is using instagram, because of this, people are recieveing lots of followers all the time, and who can keep up?! There are so many confounding variables as to why any said person may not recieve even half of the likes that they should get (within reason). Some of these variables include:
                            </p> 
                            <ul>
                                <li>People busy with work durring the day, and/or other activities.</li>
                                <li>Inactive accounts.(dont see your post)</li>
                                <li>Some of your followers might have a lot of followers and cant keep up.</li>
                                <li>etc etc...</li>
                            </ul>
                            <p>
                                This is solved by analyzing data from instagram to find at what time of the day, to post, based on how many likes you recieved at any said time.
                                Unfortunately, without advanced buisness tools, I cannot account for how many followers a person had at any time durring their instagram account's growth, so there is a slight skew; Instagrams api only allows peeople without buisness tools to pull the 20 most recent post - any data analyzed is recent.
                            </p>
                        </div>
                        <h4>What can it do?</h4> 
                        <p>The <a href="https://timelike-original.herokuapp.com">Old TimeLike</a> included features such as:</p>
                        <ul>
                            <li>Showing you a line graph of the likes of your post (y) and the date of the post (x) to show people how their likes do over time.</li>
                            <li>
                                Showing you a bar graph of the average likes of your post (y) and the day (Sunday - Saturday) of the post (x) to show people how the day might affect their likes.
                            </li>
                            <li>
                                Showing you a bar graph of the average likes of your post (y) and the time of day (12am - 11:59pm) of the post (x) to show people how the time might affect their likes.
                            </li>
                            <li>
                                Showing the user their most liked post. Idea was incorporated from <a target="_blank" href="https://linkedin.com/in/tommygaessler">Tommy Gaessler's</a> <a target="_blank" href="https://tommygaessler.com/mostliked/">MostLiked</a> instagram webapp.
                            </li>
                            <li>
                                Showing the user "How Lame" they were based on how many of their own posts they liked.
                            </li>
                        </ul>
                        <h4>What is new in TimeLike version 2.0?</h4>
                        <ul>
                            <li>New design and layout.</li>
                            <li>Mobile compatable and Responsive design</li>
                            <li>Demo-mode for those who want to see how it works.</li>
                            <li>
                                Features that are being worked on:
                                <ul>
                                    <li>State persitance with analytics that store other users most liked times and days to give a better guage on accuracy.</li>
                                    <li>Unlocked Instagram API endpoints, moving away from sandbox mode.</li>
                                </ul>
                            </li>
                        </ul>
                        
                    </div>
                    <div className='about-info'>
                        <h3>
                            How do you use TimeLike?
                        </h3>
                        {
                            endpoints.ig_sandboxMode ? (
                                <React.Fragment>
                                    <p
                                        style={
                                            {
                                                fontWeight: "bold",
                                                color: "rgb(231, 53, 58)" 
                                            }
                                        }
                                    >
                                        This app is still in SandBox Mode.
                                    </p>
                                    <p>
                                        This means that you will have to send me your Instagram username in order for me to send you an invite to use this app. Until then, this app will not be self-served. If you just wish to see how the app works, you can enable Demo Mode.
                                    </p>
                                    <p>If you have already followed the steps on the <Link to="/">Home Page</Link> then you can proceed to the following steps</p>
                                </React.Fragment>
                            ) : null

                        }
                        
                        <ol>
                            <li>
                                <a target="_blank" href={endpoints.token_url}>Login</a>
                            </li>
                            <li>
                                Return to TimeLike and you should be prompted to either Approve or Decline access for TimeLike. Approve access to continue.
                            </li>
                            <li>
                                You should be good to go! Check out the <Link to="/analytics">Analytics</Link> page to start.
                            </li>
                        </ol>
                    </div>
                    <div>
                        <h3>Thank you!</h3>
                        <p>
                            If you like TimeLike, or think there is something that can be changed / added, please feel free to <a href="mailto:jacobhinkston@gmail.com">Email me</a>.
                        </p>
                    </div>
                </section>
            </main>
        );
    }
}
