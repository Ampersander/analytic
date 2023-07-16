import { useEffect, useState } from 'react'

import {
	Autocomplete,
	Box,
	Button,
	Card,
	CardContent,
	Chip,
	Container,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	FormControl,
	FormHelperText,
	Grid,
	TextField,
	Typography
} from '@mui/material'
import { Close } from '@mui/icons-material'

import TagService from 'services/tag.service'
import TunnelService from 'services/tunnel.service'
import DashboardNavbar from 'examples/Navbars/DashboardNavbar'
import DashboardLayout from 'examples/LayoutContainers/DashboardLayout'

export default function Tunnels() {
	const defaults = { tags: [], comment: '' }
	const [tags, setTags] = useState([])
	const [items, setItems] = useState([])
	const [inputs, setInputs] = useState(defaults)
	const [editInputs, setEditInputs] = useState(defaults)
	const [openEditDialog, setOpenEditDialog] = useState(false)

	const handleChange = (name, value) => setInputs(values => ({ ...values, [name]: value }))
	const handleEditChange = (name, value) => setEditInputs(values => ({ ...values, [name]: value }))

	const handleAdd = async () => {
		const created = await TunnelService.create(inputs)

		// TODO show success toast
		setItems([...items, created])
		setInputs(defaults)
	}

	const handleEdit = item => {
		setEditInputs(item)
		setOpenEditDialog(true)
	}

	const handleSaveEdit = async () => {
		await TunnelService.update(editInputs._id, editInputs)
		// TODO show success toast

		await fetchTags()
		await fetchItems()
		handleCloseEditDialog()
	}

	const handleCloseEditDialog = () => {
		setOpenEditDialog(false)
		setEditInputs(defaults)
	}

	const handleDelete = async item => {
		await TunnelService.delete(item._id)
		// TODO show success toast

		setItems(items.filter(_ => _._id !== item._id))
	}

	const fetchTags = async () => {
		const data = await TagService.getAll()
		setTags(data)
	}

	const fetchItems = async () => {
		const data = await TunnelService.getAll()
		setItems(data)
	}

	// Fetch data on component mount
	useEffect(() => {
		fetchTags()
		fetchItems()
	}, [])

	// Trim inputs of type string after 1s
	useEffect(() => {
		const t = setTimeout(() => {
			setInputs(inputs => ({ ...inputs, comment: inputs.comment.trim() }))
			setEditInputs(editInputs => ({ ...editInputs, comment: editInputs.comment.trim() }))
		}, 1000)
		return () => clearTimeout(t)
	}, [inputs.comment, editInputs.comment])

	return (
		<DashboardLayout>
			<DashboardNavbar />

			<Container maxWidth="md">
				<Box my={4}>
					<Typography variant="h5" component="h1" align="center" style={{ marginBottom: 24 }} gutterBottom>
						Ajouter un Tunnel
					</Typography>

					<Card>
						<CardContent style={{ paddingTop: 24 }}>
							<Grid container spacing={2} alignItems="center" justifyContent="center">
								<Grid item xs={12} sm={12}>
									<FormControl fullWidth>
										<TextField
											label="Commentaire"
											value={inputs.comment}
											onBlur={e => handleChange('comment', e.target.value)}
											onChange={e => handleChange('comment', e.target.value)}
											fullWidth
										/>

										{inputs.comment.trim() === ''
											? (<FormHelperText sx={{ color: 'red' }}>Le commentaire est obligatoire.</FormHelperText>)
											: (<FormHelperText>Le commentaire du tunnel.</FormHelperText>)
										}
									</FormControl>
								</Grid>

								<Grid item xs={12} sm={12}>
									<FormControl fullWidth>
										<Autocomplete
											multiple
											fullWidth
											openOnFocus
											limitTags={5}
											options={tags}
											value={tags.filter(_ => inputs.tags.includes(_._id))}
											getOptionLabel={_ => _.comment}
											isOptionEqualToValue={(option, value) => option._id === value._id}
											renderInput={params => <TextField {...params} label="Tags" placeholder="Tags" />}
											onChange={(e, value) => handleChange('tags', value.map(_ => _._id))}
										/>

										{inputs.tags.length === 0
											? (<FormHelperText sx={{ color: 'red' }}>Au moins un tag est obligatoire.</FormHelperText>)
											: (<FormHelperText>Les tags du tunnel.</FormHelperText>)
										}
									</FormControl>
								</Grid>

								<Grid item xs={12} sm={12}>
									<Button
										sx={{ color: '#fff' }}
										color="primary"
										variant="contained"
										disabled={inputs.comment.trim() === '' || inputs.tags.length === 0}
										fullWidth
										onClick={handleAdd}
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
					<DialogTitle>Modifier le tunnel</DialogTitle>

					<DialogContent style={{ paddingTop: 24 }}>
						<Grid container spacing={2} alignItems="center" justifyContent="center">
							<Grid item xs={12} sm={12}>
								<FormControl fullWidth>
									<TextField
										label="Commentaire"
										value={editInputs.comment}
										onBlur={e => handleEditChange('comment', e.target.value)}
										onChange={e => handleEditChange('comment', e.target.value)}
										fullWidth
									/>

									{editInputs.comment.trim() === ''
										? (<FormHelperText sx={{ color: 'red' }}>Le commentaire est obligatoire.</FormHelperText>)
										: (<FormHelperText>Le commentaire du tunnel.</FormHelperText>)
									}
								</FormControl>
							</Grid>

							<Grid item xs={12} sm={12}>
								<FormControl fullWidth>
									<Autocomplete
										multiple
										readOnly
										fullWidth
										options={tags}
										value={tags.filter(_ => editInputs.tags.includes(_._id))}
										getOptionLabel={_ => _.comment}
										isOptionEqualToValue={(option, value) => option._id === value._id}
										renderInput={params => <TextField {...params} label="Tags" placeholder="Tags" />}
									/>

									{editInputs.tags.length === 0
										? (<FormHelperText sx={{ color: 'red' }}>Au moins un tag est obligatoire.</FormHelperText>)
										: (<FormHelperText>Les tags du tunnel (non modifiable).</FormHelperText>)
									}
								</FormControl>
							</Grid>
						</Grid>
					</DialogContent>

					<DialogActions>
						<Button onClick={handleCloseEditDialog}>Cancel</Button>
						<Button color="primary" disabled={editInputs.comment.trim() === '' || editInputs.tags.length === 0} onClick={handleSaveEdit}>Save</Button>
					</DialogActions>
				</Dialog>
			</Container>
		</DashboardLayout>
	)
}