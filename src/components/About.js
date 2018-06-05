import React from 'react'
import instagram from '../assets/Logos/instagram-socialmedia.png'
import linkedIn from '../assets/Logos/linkedin-socialmedia.png'
import twitter from '../assets/Logos/twitter-socialmedia.png'
const About = () => {
    return(
        <section className='component-about'>
            <h1>About</h1>
            <section className='main-information'>
                <h3>
                    What is 'Time-Like'?:
                </h3>
                <p>
                    TimeLike is an app I created that tries to solve the 'active instagramers' crisis. <br/> The active instagramers crisis can be described as follows: Due to the rapid growth of social media, everyone and they mother is using instagram, because of this, people are recieveing lots of followers all the time, and who can keep up?! There are so many confounding variables as to why any said person may not recieve even half of the likes that they should get (within reason). Some of these variables include:
                </p> 
                <ul>
                    <li>People busy with work durring the day, and/or other activities.</li>
                    <li>Inactive accounts.(dont see your post)</li>
                    <li>Some of your followers might have a lot of followers and cant keep up.</li>
                    <li>etc etc...</li>
                </ul>
                <p>
                    This is solved by analyzing data from instagram to find at what time of the day, to post, based on how many likes you recieved at any said time.
                    Unfortunately, without advanced buisness tools, I cannot account for how many followers a person had at any time durring their instagram account's growth,so there is a slight skew. 
                </p>
                <h3>
                    How do you use Time-Like?
                </h3>
                <p>
                    First, sign in above by hitting the 'Login Button', then it will do the rest! Sign into instagram through instagrams secure login page. Once authenticated, it will redirect you to the app and it will being doing everything for you :)
                </p>
                <h3>
                    Contact
                </h3>
                <p>
                    My names Jacob, I'm an ex-Computer Science student at the university of Colorado Boulder and now attending Galvanize Inc's Web Development immersive for Full-Stack software development, you can contact me below!
                </p>
                <section className='contact'>
                    <a href='https://www.instagram.com/jacobhinkston/'><img src={instagram} alt="#"/></a>
                    <a href='https://twitter.com/JacobHinkston'><img src={twitter} alt="#"/></a>
                    <a href='https://www.linkedin.com/in/jacobhinkston/'><img src={linkedIn} alt="#"/></a>
                </section>
            </section>   
        </section>
    )
}
export default About