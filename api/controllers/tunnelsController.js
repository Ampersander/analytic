const Tag = require('../models/tagModel')
const Tunnel = require('../models/tunnelModel')
const debug = require('debug')('analytic:server')

// Récupérer tous les tunnels
exports.getAll = async (req, res) => {
	try {
		const tunnels = await Tunnel.find()

		debug('Tunnels trouvés :', tunnels.length)
		res.json(tunnels)
	} catch (err) {
		debug('Erreur lors de la récupération des tunnels :', err)
		res.status(500).json({ message: 'Une erreur est survenue lors de la récupération des tunnels.' })
	}
}

// Récupérer un tunnel par son ID
exports.getById = async (req, res) => {
	try {
		const tunnel = await Tunnel.findById(req.params.id)

		if (!tunnel) {
			debug('Tunnel non trouvé :', req.params.id)
			return res.status(404).json({ message: 'Visiteur non trouvé.' })
		}

		debug('Tunnel trouvé :', tunnel._id)
		res.json(tunnel)
	} catch (err) {
		debug('Erreur lors de la récupération du tunnel :', err)
		res.status(500).json({ message: 'Une erreur est survenue lors de la récupération du visiteur.' })
	}
}

// Créer un tunnel
exports.create = async (req, res) => {
	try {
		// Validate request
		var message = ''
		if (!req.body.comment) message = 'Le commentaire est obligatoire.'
		if (!req.body.tags || req.body.tags.length === 0) message = 'Les tags sont obligatoires.'

		if (message !== '') {
			debug('Erreur lors de la création du tunnel :', message)
			return res.status(400).json({ message })
		}

		// Check if tags exist in database
		const tags = await Tag.find({ _id: { $in: req.body.tags } })
		if (tags.length !== req.body.tags.length) message = 'Un ou plusieurs tags n\'existent pas.'

		if (message !== '') {
			debug('Erreur lors de la création du tunnel :', message)
			return res.status(400).json({ message })
		}

		const tunnel = await Tunnel.create(req.body)

		debug('Tunnel créé :', tunnel._id)
		res.status(201).json(tunnel)
	} catch (err) {
		debug('Erreur lors de la création du tunnel :', err)
		res.status(500).json({ message: 'Une erreur est survenue lors de la création du tunnel.' })
	}
}

// Mettre à jour un tunnel
exports.update = async (req, res) => {
	try {
		const { id } = req.params
		const { tags, comment } = req.body

		// Vérifier si le tunnel existe
		const tunnel = await Tunnel.findById(id)

		if (!tunnel) {
			debug('Tunnel non trouvé :', id)
			return res.status(404).json({ message: 'Tunnel non trouvé.' })
		}

		// Mettre à jour les champs du tunnel
		tunnel.tags = tags
		tunnel.comment = comment
		await tunnel.save()

		debug('Tunnel mis à jour :', tunnel._id)
		res.json(tunnel)
	} catch (err) {
		debug('Erreur lors de la récupération du tunnel :', err)
		res.status(500).json({ message: 'Une erreur est survenue lors de la mise à jour du tunnel.' })
	}
}

// Supprimer un tunnel
exports.delete = async (req, res) => {
	try {
		const { id } = req.params

		const deleted = await Tunnel.deleteById(id)

		if (!deleted) {
			debug('Tunnel non trouvé :', id)
			return res.status(404).json({ message: 'Tunnel non trouvé.' })
		}

		debug('Tunnel supprimé :', deleted._id)
		res.json(deleted)
	} catch (err) {
		debug('Erreur lors de la suppression du tunnel :', err)
		res.status(500).json({ message: 'Une erreur s\'est produite lors de la suppression du tunnel.' })
	}
}