import axios from 'axios'
import authHeader from './auth-header'

const ENDPOINT = process.env.REACT_APP_API_URL + '/tunnels'

class TunnelService {
	async getAll() {
		try {
			const response = await axios.get(ENDPOINT, { headers: authHeader() })
			return response.data
		} catch (err) {
			console.error('Erreur lors de la récupération des tunnels :', err)
			return []
		}
	}

	async getById(id) {
		try {
			const response = await axios.get(`${ENDPOINT}/${id}`, { headers: authHeader() })
			return response.data
		} catch (err) {
			console.error('Erreur lors de la récupération du tunnel :', err)
			return null
		}
	}

	async create(body) {
		try {
			const response = await axios.post(ENDPOINT, body)
			return response.data
		} catch (err) {
			console.error('Erreur lors de la création du tunnel :', err)
			return null
		}
	}

	async update(id, body) {
		try {
			const response = await axios.put(`${ENDPOINT}/${id}`, body, { headers: authHeader() })
			return response.data
		} catch (err) {
			console.error('Erreur lors de la mise à jour du tunnel :', err)
			return null
		}
	}

	async delete(id) {
		try {
			const response = await axios.delete(`${ENDPOINT}/${id}`, { headers: authHeader() })
			return response.data
		} catch (err) {
			console.error('Erreur lors de la suppression du tunnel :', err)
			return null
		}
	}
}

export default new TunnelService()