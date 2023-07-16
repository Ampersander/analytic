import PropTypes from 'prop-types'
import { useState, useEffect } from 'react'

import {
	autocompleteClasses,
	Autocomplete,
	Box,
	Button,
	ButtonBase,
	Card,
	CardContent,
	Chip,
	ClickAwayListener,
	Container,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	FormControl,
	Grid,
	IconButton,
	InputBase,
	Popper,
	styled,
	TextField,
	Typography,
	useTheme
} from '@mui/material'
import { Close, Done, Edit } from '@mui/icons-material'

import tunnelService from 'services/tunnel.service'
import DashboardNavbar from 'examples/Navbars/DashboardNavbar'
import DashboardLayout from 'examples/LayoutContainers/DashboardLayout'

const StyledAutocompletePopper = styled('div')(({ theme }) => ({
	[`& .${autocompleteClasses.paper}`]: {
		boxShadow: 'none',
		margin: 0,
		color: 'inherit',
		fontSize: 13,
	},
	[`& .${autocompleteClasses.listbox}`]: {
		backgroundColor: theme.palette.mode === 'light' ? '#fff' : '#1c2128',
		padding: 0,
		[`& .${autocompleteClasses.option}`]: {
			minHeight: 'auto',
			alignItems: 'flex-start',
			padding: 8,
			borderBottom: `1px solid  ${theme.palette.mode === 'light' ? ' #eaecef' : '#30363d'
				}`,
			'&[aria-selected="true"]': {
				backgroundColor: 'transparent',
			},
			[`&.${autocompleteClasses.focused}, &.${autocompleteClasses.focused}[aria-selected="true"]`]:
			{
				backgroundColor: theme.palette.action.hover,
			}
		}
	},
	[`&.${autocompleteClasses.popperDisablePortal}`]: {
		position: 'relative',
	}
}))

function PopperComponent(props) {
	const { disablePortal, anchorEl, open, ...other } = props
	return <StyledAutocompletePopper {...other} />
}

PopperComponent.propTypes = {
	anchorEl: PropTypes.any,
	disablePortal: PropTypes.bool,
	open: PropTypes.bool.isRequired
}

const StyledPopper = styled(Popper)(({ theme }) => ({
	width: 300,
	fontSize: 13,
	borderRadius: 6,
	zIndex: theme.zIndex.modal,
	color: theme.palette.mode === 'light' ? '#24292e' : '#c9d1d9',
	backgroundColor: theme.palette.mode === 'light' ? '#fff' : '#1c2128',
	border: `1px solid ${theme.palette.mode === 'light' ? '#e1e4e8' : '#30363d'}`,
	boxShadow: `0 8px 24px ${theme.palette.mode === 'light' ? 'rgba(149, 157, 165, 0.2)' : 'rgb(1, 4, 9)'}`
}))

const StyledInput = styled(InputBase)(({ theme }) => ({
	padding: 10,
	width: '100%',
	borderBottom: `1px solid ${theme.palette.mode === 'light' ? '#eaecef' : '#30363d'}`,
	'& input': {
		padding: 8,
		fontSize: 14,
		borderRadius: 4,
		transition: theme.transitions.create(['border-color', 'box-shadow']),
		backgroundColor: theme.palette.mode === 'light' ? '#fff' : '#0d1117',
		border: `1px solid ${theme.palette.mode === 'light' ? '#eaecef' : '#30363d'}`,
		'&:focus': {
			borderColor: theme.palette.mode === 'light' ? '#0366d6' : '#388bfd',
			boxShadow: `0px 0px 0px 3px ${theme.palette.mode === 'light' ? 'rgba(3, 102, 214, 0.3)' : 'rgb(12, 45, 107)' }`
		}
	}
}))

const Btn = styled(ButtonBase)(({ theme }) => ({
	fontSize: 13,
	width: '100%',
	paddingBottom: 8,
	textAlign: 'left',
	fontWeight: 600,
	color: theme.palette.mode === 'light' ? '#586069' : '#8b949e',
	'&:hover, &:focus': {
		color: theme.palette.mode === 'light' ? '#0366d6' : '#58a6ff'
	},
	'& svg': {
		width: 16,
		height: 16
	},
	'& span': {
		width: '100%'
	}
}))

export default function Tunnels() {
	const [items, setItems] = useState([])
	const [anchorEl, setAnchorEl] = useState(null)
	const [newComment, setNewComment] = useState('')
	const [inputs, setInputs] = useState({ tags: [], comment: '' })
	const [errors, setErrors] = useState(inputs)
	const [editTunnel, setEditTunnel] = useState(inputs)
	const [openEditDialog, setOpenEditDialog] = useState(false)

	const handleChange = (name, value) => {
		setInputs(values => ({ ...values, [name]: value }))
		setErrors(values => ({ ...values, [name]: value === '' ? true : false }))
	}

	const handleAddTunnel = async () => {
		const createdTunnel = await tunnelService.create(inputs)
		console.log(createdTunnel)

		setItems([...items, inputs])
		setInputs({ tags: [], comment: '' })
	}

	const handleEdit = tunnel => {
		setEditTunnel(tunnel)
		setInputs(tunnel)
		setOpenEditDialog(true)
	}

	const handleSaveEditTunnel = async () => {
		await tunnelService.update({ ...editTunnel, comment: newComment })
		await fetchTunnels()
		handleCloseEditDialog()
	}

	const handleCloseEditDialog = () => {
		setOpenEditDialog(false)
		setEditTunnel(null)
		setInputs({ tags: [], comment: '' })
	}

	const handleDelete = async item => {
		await tunnelService.delete(item._id)
		setItems(items.filter(_ => _._id !== item._id))
	}

	const cardContentStyle = {
		paddingTop: 24,
	}

	const titleStyle = {
		marginBottom: 24,
	}

	const fetchTunnels = async () => {
		const tunnels = await tunnelService.getAll()
		setItems(tunnels)
	}

	useEffect(() => {
		fetchTunnels()
	}, [])

	return (
		<DashboardLayout>
			<DashboardNavbar />

			<Container maxWidth="md">
				<Box my={4}>
					<Typography variant="h5" component="h1" align="center" style={titleStyle} gutterBottom>
						Ajouter un Tunnel
					</Typography>

					<Card>
						<CardContent style={cardContentStyle}>
							<Grid container spacing={2} alignItems="center" justifyContent="center">
								{/* <Grid item xs={12} sm={12}>
									<FormControl fullWidth>
										<Autocomplete
											options={'Sélectionner des tags'}
											options={tags}
										/>
									</FormControl>
								</Grid> */}

								<Grid item xs={12} sm={12}>
									<FormControl fullWidth>
										<TextField
											label="Comment"
											value={inputs.comment}
											onBlur={e => handleChange('comment', e.target.value)}
											onChange={e => handleChange('comment', e.target.value)}
											fullWidth
										/>
									</FormControl>
								</Grid>

								<Grid item xs={12} sm={12}>
									<Button
										variant="contained"
										color="primary"
										onClick={handleAddTunnel}
										disabled={!newComment}
										fullWidth
										style={{ color: '#fff' }}
									>
										Add Tunnel
									</Button>
								</Grid>
							</Grid>
						</CardContent>
					</Card>

					<Box mt={4} display="flex" justifyContent="center" flexWrap="wrap">
						{items.map((tunnel) => (
							<Chip
								key={tunnel._id}
								sx={{ m: 1, cursor: 'pointer' }}
								variant="outlined"
								deleteIcon={<Close />}
								label={`${tunnel.comment} (${tunnel.tags.length})`}
								onClick={() => handleEdit(tunnel)}
								onDelete={() => handleDelete(tunnel)}
							/>
						))}
					</Box>
				</Box>

				<Dialog open={openEditDialog} onClose={handleCloseEditDialog}>
					<DialogTitle>Edit Tunnel</DialogTitle>

					<DialogContent>
						<FormControl fullWidth>
							<TextField
								label="Comment"
								value={inputs.comment}
								onBlur={e => handleChange('comment', e.target.value)}
								onChange={e => handleChange('comment', e.target.value)}
								fullWidth
							/>
						</FormControl>
					</DialogContent>
					<DialogActions>
						<Button onClick={handleCloseEditDialog}>Cancel</Button>
						<Button onClick={handleSaveEditTunnel} color="primary">
							Save
						</Button>
					</DialogActions>
				</Dialog>
			</Container>
		</DashboardLayout>
	)
}