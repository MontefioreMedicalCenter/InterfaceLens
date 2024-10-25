import React from 'react'
import {Button} from '@mui/material';
const ButtonComponent = props => {
	return (
		<Button
			variant="contained"
			color="primary"
			onClick={props.onClick}
			{...props}>
			Login
		</Button>
	)
}

export default ButtonComponent
