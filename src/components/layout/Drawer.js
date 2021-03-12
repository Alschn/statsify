import React from "react";
import Drawer from "@material-ui/core/Drawer";
import withStyles from "@material-ui/core/styles/withStyles";
import {
	List,
	ListItem,
	ListItemIcon,
	ListItemText,
	Divider, ListItemAvatar, Avatar, Typography
} from "@material-ui/core";
import {Link} from "react-router-dom";
import HomeIcon from '@material-ui/icons/Home';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';
import AlbumIcon from '@material-ui/icons/Album';
import NewReleasesIcon from '@material-ui/icons/NewReleases';
import SearchIcon from '@material-ui/icons/Search';
import FeaturedPlayListIcon from '@material-ui/icons/FeaturedPlayList';
import SpeakerIcon from '@material-ui/icons/Speaker';
import QueueMusicIcon from '@material-ui/icons/QueueMusic';
import RecordVoiceOverIcon from '@material-ui/icons/RecordVoiceOver';

const routes = [
	{endpoint: "/", desc: "Home", icon: <HomeIcon/>},
	{endpoint: "/top-tracks", desc: "Your top tracks", icon: <TrendingUpIcon/>},
	{endpoint: "/top-artists", desc: "Your top artists", icon: <RecordVoiceOverIcon/>},
	{endpoint: "/saved-library", desc: "Saved tracks and albums", icon: <AlbumIcon/>},
	{endpoint: "/playlists", desc: "Your playlists", icon: <QueueMusicIcon/>},
	{endpoint: "/recently-played", desc: "Recently played tracks", icon: <SpeakerIcon/>},
	{endpoint: "/featured-playlists", desc: "Featured playlists", icon: <FeaturedPlayListIcon/>},
	{endpoint: "/new-releases", desc: "New releases", icon: <NewReleasesIcon/>},
	{endpoint: "/search", desc: "Search for items", icon: <SearchIcon/>},
]

const styles = theme => ({
	list: {
		width: 250
	},
	fullList: {
		width: "auto"
	}
});

class DrawerComponent extends React.Component {
	state = {
		left: false
	};

	render() {
		const {classes, toggleDrawerHandler} = this.props;

		const sideList = () => (
			<div
				className={classes.list}
				role="presentation"
				onClick={toggleDrawerHandler}
				onKeyDown={toggleDrawerHandler}
			>
				<List>
					<ListItem key={"StatsifyLabel"}>
						<ListItemAvatar>
							<Avatar
								src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/Spotify_logo_without_text.svg/168px-Spotify_logo_without_text.svg.png"
							/>
						</ListItemAvatar>
						<ListItemText>
							<Typography variant="h5" component="h5">Statsify</Typography>
						</ListItemText>
					</ListItem>
				</List>
				<Divider/>
				<List>
					{routes.map(({endpoint, desc, icon}, index) => (
						<Link to={endpoint}>
							<ListItem button key={endpoint}>
								<ListItemIcon>
									{icon}
								</ListItemIcon>
								<ListItemText primary={desc}/>
							</ListItem>
						</Link>
					))}
				</List>
				<Divider/>
			</div>
		);

		return (
			<Drawer open={this.props.left} onClose={this.props.toggleDrawerHandler}>
				{sideList()}
			</Drawer>
		);
	}
}

export default withStyles(styles)(DrawerComponent);

