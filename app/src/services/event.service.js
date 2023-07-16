import axios from 'axios'
import authHeader from './auth-header'

const API_URL = process.env.REACT_APP_API_URL

class EventService {
    getEventsByVisitorId(visitorIDRequest) {
        return axios.get(`${API_URL}/events/visitor` + visitorIDRequest, { headers: authHeader() })
    }

    getEvents() {
        return axios.get(`${API_URL}/events`, { headers: authHeader() })
    }

    createEvent(eventRequest) {
        return axios.post(`${API_URL}/events`, eventRequest)
    }

    deleteEvent(id) {
        return axios.delete(`${API_URL}/events/${id}`, { headers: authHeader() })
    }

    updateEvent(id, eventRequest) {
        return axios.put(`${API_URL}/events/${id}`, eventRequest, { headers: authHeader() })
    }
}

const service = new EventService()
export default service