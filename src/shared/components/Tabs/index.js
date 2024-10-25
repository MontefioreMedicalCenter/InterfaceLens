// import React from 'react'
// // import { makeStyles, withStyles } from '@material-ui/core/styles'
// // import Tabs from '@material-ui/core/Tabs'
// // import Tab from '@material-ui/core/Tab'
// // import Typography from '@material-ui/core/Typography'
// import {Badge,Typography,Tab,Tabs} from '@mui/material';
// import {makeStyles,withStyles} from '@mui/styles';
// import { useHistory } from 'react-router-dom'

// const StyledTabs = withStyles({
// 	indicator: {
// 		height: props => props.customstyle.indicatorHeight,
// 		borderTopLeftRadius: 3,
// 		borderTopRightRadius: 3,
// 		backgroundColor: props => props.customstyle.indicatorColor
// 	},
// 	flexContainer: {
// 		width: props => (props.customstyle.centered ? 'fit-content' : '100%'),
// 		marginLeft: 'auto',
// 		marginRight: 'auto',
// 		height: "47px"
// 	},
// 	root: {
// 		minHeight: 'unset'
// 	}
// })((props) => {
// 	const { customStyle, ...rest } = props;
// 	return (
// 		<Tabs
// 			{...rest}
// 			textColor="primary"
// 			TabIndicatorProps={{ children: <div /> }}
// 		/>
// 	)
// }
// )

// const StyledTab = withStyles(theme => ({
// 	root: {
// 		textTransform: props => props.customstyle.textTransform,
// 		color: props => props.customstyle.tabColor,
// 		fontWeight: theme.typography.fontWeightRegular,
// 		width: '25%',
// 		minHeight: '35px',
// 		margin: '0px',
// 		maxWidth: 'unset',
// 		'&:focus': {
// 			opacity: 1
// 		}
// 	}
// }))(
// 	(props) => {
// 		const { customStyle, ...rest } = props;
// 		return <Tab style={{ outline: 0 }} disableRipple {...rest} />;
// 	}
// )

// const useStyles = makeStyles(theme => ({
// 	root: {
// 		flexGrow: 1
// 	},
// 	padding: {
// 		padding: theme.spacing(0)
// 	},
// 	demo: {
// 		backgroundColor: props => props.customstyle.backgroundColor,
// 		boxShadow: props => props.customstyle.boxShadow,
// 		width: props => (props.customstyle.centered ? 'fit-content' : '100%'),
// 		marginLeft: 'auto',
// 		marginRight: 'auto'
// 	}
// }))

// function CustomizedTabs(props) {
// 	const history = useHistory()

// 	const classes = useStyles(props)

// 	const handleCallToRouter = (event, value) => {
// 		history.push(value)
// 	}
// 	return (
// 		<div className={classes.root}>
// 			<div className={classes.demo}>
// 				<StyledTabs
// 					variant={props.variant}
// 					customstyle={{
// 						indicatorHeight: props.customstyle.indicatorHeight,
// 						centered: props.customstyle.centered,
// 						containerPadding: props.customstyle.containerPadding,
// 						indicatorColor: props.customstyle.indicatorColor
// 					}}
// 					value={history.location.pathname}
// 					onChange={handleCallToRouter}
// 					aria-label="styled tabs example">
// 					{props.tabList
// 						? props.tabList.map((tab, index) => (
// 							<StyledTab
// 								key={index}
// 								customstyle={{
// 									tabColor: props.customstyle.tabColor,
// 									textTransform: props.customstyle.textTransform,
// 								}}
// 								label={
// 									tab.badge ? (
// 										<Badge
// 											invisible={!tab.badge.active}
// 											badgeContent={'!'}
// 											color="secondary"
// 											variant="dot">
// 											{tab.label}
// 										</Badge>
// 									) : (
// 										tab.label
// 									)
// 								}
// 								value={tab.path}></StyledTab>
// 						))
// 						: ''}
// 				</StyledTabs>
// 				<Typography className={classes.padding} />
// 			</div>
// 		</div>
// 	)
// }

// export default CustomizedTabs
import React from 'react';
import { Badge, Typography, Tab, Tabs } from '@mui/material';
import { styled } from '@mui/system';
import { useHistory } from 'react-router-dom';

// Custom Styled Tabs
const StyledTabs = styled(Tabs)(({ theme, customstyle }) => ({
  '& .MuiTabs-indicator': {
    height: customstyle.indicatorHeight,
    borderTopLeftRadius: 3,
    borderTopRightRadius: 3,
    backgroundColor: customstyle.indicatorColor,
  },
  display: 'flex',
  justifyContent: customstyle.centered ? 'center' : 'flex-start',
  height: '47px',
}));

// Custom Styled Tab
const StyledTab = styled(Tab)(({ theme, customstyle }) => ({
  textTransform: customstyle.textTransform,
  color: customstyle.tabColor,
  fontWeight: theme.typography.fontWeightRegular,
  width: '25%',
  minHeight: '35px',
  margin: 0,
  maxWidth: 'unset',
  '&:focus': {
    opacity: 1,
  },
  outline: 0,
}));

function CustomizedTabs(props) {
  const history = useHistory();

  const handleCallToRouter = (event, value) => {
    history.push(value);
  };

  return (
    <div>
      <div
        style={{
          backgroundColor: props.customstyle.backgroundColor,
          boxShadow: props.customstyle.boxShadow,
          width: props.customstyle.centered ? 'fit-content' : '100%',
          marginLeft: 'auto',
          marginRight: 'auto',
        }}
      >
        <StyledTabs
          variant={props.variant}
          customstyle={props.customstyle}
          value={history.location.pathname}
          onChange={handleCallToRouter}
          aria-label="styled tabs example"
        >
          {props.tabList
            ? props.tabList.map((tab, index) => (
                <StyledTab
                  key={index}
                  customstyle={props.customstyle}
                  label={
                    tab.badge ? (
                      <Badge
                        invisible={!tab.badge.active}
                        badgeContent={'!'}
                        color="secondary"
                        variant="dot"
                      >
                        {tab.label}
                      </Badge>
                    ) : (
                      tab.label
                    )
                  }
                  value={tab.path}
                />
              ))
            : ''}
        </StyledTabs>
        <Typography />
      </div>
    </div>
  );
}

export default CustomizedTabs;
