import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import { Link } from 'react-router-dom';

import endpoints from '../../../instagram.config';

import './SideNavigator.sass';
export default class SideNavigator extends Component{
	constructor(props){
		super(props);
		this.state = {
			open: false
		};
	}
	toggleDrawer = (open) => event => {
		if (event.type === 'keydown' && 
			(event.key === 'Tab' || 
			event.key === 'Shift')
		) {
			return;
		}
		this.setState({ open });
	};
	render(){
		const classes = makeStyles({
			list: {
				width: 300,
			},
				fullList: {
				width: 'auto',
			},
		});
		return (
			<div className="sidenavigator-component">
				<Button 
					onClick={ this.toggleDrawer(true) }
				>
					<img
						src={'./assets/SideNavigator/menu.png'}
						id="side-nav-menu"
						alt="#"
					/>
				</Button>
				<Drawer 
					anchor="right" 
					open={this.state.open} 
					onClose={this.toggleDrawer(false)}
				>
					<div
						className={classes.list}
						role="presentation"
						onClick={this.toggleDrawer(false)}
						onKeyDown={this.toggleDrawer(false)}
					>
						<List>
							<ListItem
								className="side-nav-link"
							>
								<ListItemIcon>
									<img 
										src='./assets/SideNavigator/home.png' 
										alt="#"
										className="side-navigator-icon"
									/>
								</ListItemIcon>
								<Link
									to="/"
								>
									Home
								</Link>
							</ListItem>
							<ListItem
								className="side-nav-link"
							>
								<ListItemIcon>
									<img 
										src='./assets/SideNavigator/analytics.png' 
										alt="#"
										className="side-navigator-icon"
									/>
								</ListItemIcon>
								<Link
									to="/analytics"
								>
									Analytics
								</Link>
							</ListItem>
							<ListItem
								className="side-nav-link"
							>
								<ListItemIcon>
									<img
										src='./assets/SideNavigator/about.png' 
										alt="#"
										className="side-navigator-icon"
									/>
								</ListItemIcon>
								<Link
									to="/about"
								>
									About
								</Link>
							</ListItem>
						</List>
						<Divider />
						<List>
							<ListItem
								className="side-nav-link"
							> {
								this.props.loading ? (
									null
								) : this.props.isLoggedIn ? (
									<React.Fragment>
										<ListItemIcon>
											<img
												src={this.props.userInfo.profilePicture}
												id="side-nav-logged-in"
												alt="#"
											/>
										</ListItemIcon>
										<a
											href={endpoints.instagram}
											onClick={() => {
												alert('You must log out of instagram to logout of TimeLike. Redirecting you to Instagram.');
											}}
										>
											Logout
										</a>
									</React.Fragment>
								) : (
									<React.Fragment>
										<ListItemIcon>
											<img
												src='./assets/SideNavigator/login.png'
												alt="#"
											/>
										</ListItemIcon>
										<a
											href={endpoints.token_url}
										>
											Login
										</a>
									</React.Fragment>
								) 
							} </ListItem>
						</List>
					</div>
				</Drawer>
			</div>
		);
	}
}

// import React, { Component } from 'react';
// import PropTypes from 'prop-types';
// import { Link } from 'react-router-dom';

// //Material UI 
// import Drawer from '@material-ui/core/Drawer';
// import Button from '@material-ui/core/Button';
// import List from '@material-ui/core/List';
// import Divider from '@material-ui/core/Divider';

// import endpoints from '../../../instagram.config';

// import {withStyles} from '@material-ui/core/styles';
// import './SideNavigator.sass';

// const styles = {
//     list: {
//         width: 200,
//     },
//     fullList: {
//         width: 'auto',
//     },
// };

// class TemporaryDrawer extends React.Component {
//     constructor(props){
//         super(props)
//         this.state = {
//             top: false,
//             left: false,
//             bottom: false,
//             right: false,
//             // isLoggedIn: props.isLoggedIn,
//             // loading: props.loading,
//             // userInfo: props.userInfo
//         };
//     }
//     toggleDrawer = (side, open) => () => {
//         this.setState({
//             [side]: open,
//         });
//     };
//     render(props) {
//         const {classes} = this.props;

//         const sideList = (
//             <div className={classes.list}>
//                 <Divider/>
//             </div>
//         );

//         const fullList = (
//             <div className={classes.fullList}>
//                 <Divider/>
//             </div>
//         );

//         return (
//             <div className="sidenavigator-component">
//                 <Button id="nav-button" onClick={this.toggleDrawer('right', true)}>
//                     <svg width="30" height="30">
//                         <path
//                             d="M0, 5 30, 5"
//                             stroke="#000"
//                             stroke-width="5"
//                         />
//                         <path
//                             d="M0, 14 30, 14"
//                             stroke="#000"
//                             stroke-width="5"
//                         />
//                         <path
//                             d="M0, 23 30, 23"
//                             stroke="#000"
//                             stroke-width="5"
//                         />
//                     </svg>
//                 </Button>
//                 <Drawer
//                     open={this.state.left}
//                     onClose={this.toggleDrawer('left', false)}
//                 >
//                     <div
//                         tabIndex={0}
//                         role="button"
//                         onClick={this.toggleDrawer('left', false)}
//                         onKeyDown={this.toggleDrawer('left', false)}
//                     >
//                         {sideList}
//                     </div>
//                 </Drawer>
//                 <Drawer
//                     anchor="top"
//                     open={this.state.top}
//                     onClose={this.toggleDrawer('top', false)}
//                 >
//                     <div
//                         tabIndex={0}
//                         role="button"
//                         onClick={this.toggleDrawer('top', false)}
//                         onKeyDown={this.toggleDrawer('top', false)}
//                     >
//                         {fullList}
//                     </div>
//                 </Drawer>
//                 <Drawer
//                     anchor="bottom"
//                     open={this.state.bottom}
//                     onClose={this.toggleDrawer('bottom', false)}
//                 >
//                     <div
//                         tabIndex={0}
//                         role="button"
//                         onClick={this.toggleDrawer('bottom', false)}
//                         onKeyDown={this.toggleDrawer('bottom', false)}
//                     >
//                         {fullList}
//                     </div>
//                 </Drawer>
//                 <Drawer
//                     anchor="right"
//                     open={this.state.right}
//                     onClose={this.toggleDrawer('right', false)}
//                 >
//                     <div
//                         tabIndex={0}
//                         role="button"
//                         onClick={this.toggleDrawer('right', false)}
//                         onKeyDown={this.toggleDrawer('right', false)}
//                     >
//                         {sideList}
//                     </div>
//                     <Button
//                         href="#text-buttons"
//                         className={classes.button}
//                     >
//                         <div className="side-nav-link row">
//                             <Link
//                                 to="/"
//                                 class="side-links"
//                             >
//                                 Home
//                             </Link>
//                             <img
//                                 className="col-1"
//                                 src="./assets/SideNavigator/home.png"
//                                 alt="#"
//                             />
//                         </div>
                        
//                     </Button>
//                     <Button
//                         href="#text-buttons"
//                         className={classes.button}
//                     >
//                         <div className="side-nav-link row">
//                             <Link
//                                 to="/analytics"
//                                 class="side-links"
//                             >
//                                 Analytics
//                             </Link>
//                             <img
//                                 className="col-1"
//                                 src="./assets/SideNavigator/analytics.png"
//                                 alt="#"
//                             />
//                         </div>
                        
//                     </Button>
//                     <Button
//                         href="#text-buttons"
//                         className={classes.button}
//                     >
//                         <div className="side-nav-link row">
//                             <Link
//                                 to="/about"
//                                 class="side-links"
//                             >
//                                 About
//                             </Link>
//                             <img
//                                 className="col-1"
//                                 src="./assets/SideNavigator/about.png"
//                                 alt="#"
//                             />
//                         </div>
                        
//                     </Button>
//                     {
//                         this.props.isLoggedIn ? (
//                             this.props.userInfo !== undefined ? (
//                                 <Button
//                                     href="#text-buttons"
//                                     className={classes.button}
//                                 >   
//                                     <div className="side-nav-link row">
//                                         <a
//                                             href={endpoints.instagram}
//                                             className="side-links col-4"
//                                         >
//                                             Logout
//                                         </a>
//                                         <img
//                                             className="col-1"
//                                             src="./assets/SideNavigator/logout.png"
//                                             alt="#"
//                                         />
//                                     </div>
                                    
//                                 </Button>
//                             ) : (
//                                 <Button
//                                     href="#text-buttons"
//                                     className={classes.button + " loading"}
//                                 >
//                                     <div className="side-nav-link row">
//                                         <a
//                                             href={endpoints.instagram}
//                                             className="side-links col-4"
//                                         >
//                                             LOADING
//                                         </a>
//                                         {/* <img 
//                                             className="col-1 side-nav-btn"
//                                             src="./assets/SideNavigator/logout.png"
//                                             alt="#"
//                                         /> */}
//                                     </div>
                                    
//                                 </Button>
//                             )
//                         ) : (
//                             <Button
//                                 href="#text-buttons"
//                                 className={classes.button}
//                             >
//                                 <div className="side-nav-link row">
//                                     <a
//                                         href={endpoints.token_url}
//                                         className="side-links col-4"
//                                     >
//                                         Login
//                                     </a>
//                                     <img
//                                         className="col-1"
//                                         src="./assets/SideNavigator/login.png"
//                                         alt="#"
//                                     />
//                                 </div>
                                
//                             </Button>
//                         )
//                     }
//                 </Drawer>
//             </div>
//         );
//     }
// }

// TemporaryDrawer.propTypes = {
//     classes: PropTypes.object.isRequired,
// };

// export default withStyles(styles)(TemporaryDrawer);

