import React from "react";
import {withStyles} from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import MenuIcon from "@material-ui/icons/Menu";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MoreIcon from "@material-ui/icons/MoreVert";
import {Avatar, Tab, Tabs} from "@material-ui/core";
import {withRouter} from "react-router-dom";

const styles = theme => ({
	grow: {
		flexGrow: 1,
	},
	menuButton: {
		marginRight: theme.spacing(2),
	},
	title: {
		display: "none",
		[theme.breakpoints.up("sm")]: {
			display: "block",
		}
	},
	sectionDesktop: {
		display: "none",
		[theme.breakpoints.up("md")]: {
			display: "flex",
		}
	},
	sectionTables: {
		display: "none",
		[theme.breakpoints.up("xl")]: {
			display: "flex",
		}
	},
	sectionMobile: {
		display: "flex",
		[theme.breakpoints.up("md")]: {
			display: "none",
		}
	},
	navbar: {
		backgroundColor: "#1DB954",
	}
});

class ToolbarComponent extends React.Component {
	state = {
		anchorEl: false,
		mobileMoreAnchorEl: false,
	};

	handleProfileMenuOpen = event => {
		this.setState({
			anchorEl: event.currentTarget,
		});
	};

	handleMobileMenuClose = () => {
		this.setState({
			mobileMoreAnchorEl: null,
		});
	};

	handleMenuClose = () => {
		this.setState({
			anchorEl: null,
			mobileMoreAnchorEl: null,
		});
	};

	handleMobileMenuOpen = event => {
		this.setState({
			mobileMoreAnchorEl: event.currentTarget,
		});
	};

	handleTabValueChange = (event, newValue) => {
		this.props.history.push(newValue);
	}

	render() {
		const {classes} = this.props;
		const isMenuOpen = Boolean(this.state.anchorEl);
		const isMobileMenuOpen = Boolean(this.state.mobileMoreAnchorEl);

		const menuId = "primary-search-account-menu";
		const renderMenu = (
			<Menu
				anchorEl={this.state.anchorEl}
				anchorOrigin={{vertical: "top", horizontal: "right"}}
				id={menuId}
				keepMounted
				transformOrigin={{vertical: "top", horizontal: "right"}}
				open={isMenuOpen}
				onClose={this.handleMenuClose}
			>
				<MenuItem onClick={this.handleMenuClose}>Profile</MenuItem>
				<MenuItem onClick={() => {}}>Logout</MenuItem>
			</Menu>
		);

		const mobileMenuId = "primary-search-account-menu-mobile";
		const renderMobileMenu = (
			<Menu
				anchorEl={this.state.mobileMoreAnchorEl}
				anchorOrigin={{vertical: "top", horizontal: "right"}}
				id={mobileMenuId}
				keepMounted
				transformOrigin={{vertical: "top", horizontal: "right"}}
				open={isMobileMenuOpen}
				onClose={this.handleMobileMenuClose}
			>
				<MenuItem onClick={this.handleProfileMenuOpen}>
					<IconButton
						aria-label="account of current user"
						aria-controls="primary-search-account-menu"
						aria-haspopup="true"
						color="inherit"
					>
						<AccountCircle />
					</IconButton>
					<p>Profile</p>
				</MenuItem>
			</Menu>
		);

		return (
			<div className={classes.grow}>
				<AppBar position="static" className={classes.navbar}>
					<Toolbar>
						<IconButton
							edge="start"
							className={classes.menuButton}
							color="inherit"
							aria-label="open drawer"
							onClick={this.props.openDrawerHandler}
						>
							<MenuIcon/>
						</IconButton>
						<Typography className={classes.title} variant="h6" noWrap>
							Statsify
						</Typography>
						<div className={classes.grow}>
							<Tabs
								className={classes.sectionTables}
								indicatorColor="primary"
								centered
								value={this.props.history.location.pathname}
								onChange={this.handleTabValueChange}
							>
								<Tab value={"/"} label={"Home"}/>
								<Tab value={"/top-tracks"} label={"Top tracks"}/>
								<Tab value={"/top-artists"} label={"Top artists"}/>
								<Tab value={"/saved-library"} label={"Saved"}/>
								<Tab value={"/playlists"} label={"Your playlists"}/>
								<Tab value={"/recently-played"} label={"Recently played"}/>
								<Tab value={"/featured-playlists"} label={"Featured"}/>
								<Tab value={"/new-releases"} label={"New releases"}/>
								<Tab value={"/search"} label={"Search"}/>
							</Tabs>
						</div>

						<div className={classes.sectionDesktop}>
							<IconButton
								edge="end"
								aria-label="account of current user"
								aria-controls={menuId}
								aria-haspopup="true"
								onClick={this.handleProfileMenuOpen}
								color="inherit"
							>
								<Avatar src={this.props.userInfo.image_url} alt=""/>
							</IconButton>
						</div>
						<div className={classes.sectionMobile}>
							<IconButton
								aria-label="show more"
								aria-controls={mobileMenuId}
								aria-haspopup="true"
								onClick={this.handleMobileMenuOpen}
								color="inherit"
							>
								<MoreIcon/>
							</IconButton>
						</div>
					</Toolbar>
				</AppBar>
				{renderMobileMenu}
				{renderMenu}
			</div>
		);
	}
}

export default withStyles(styles)(withRouter(ToolbarComponent));
