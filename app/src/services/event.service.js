import axios from 'axios';
import authHeader from './auth-header';

const API_URL = process.env.API_URL;

class AnalyticEventsService {
    getEventsByVisitorId(visitorIDRequest) {
        return axios.get(`${API_URL}/events/visitor` + visitorIDRequest, { headers: authHeader() });
    }

    getEvents() {
        return axios.get(`${API_URL}/events`, { headers: authHeader() });
    }

    createEvent(eventRequest) {
        return axios.post(`${API_URL}/events`, eventRequest);
    }

    deleteEvent(id) {
        return axios.delete(`${API_URL}/events/${id}`, { headers: authHeader() });
    }

    updateEvent(id, eventRequest) {
        return axios.put(`${API_URL}/events/${id}`, eventRequest, { headers: authHeader() });
    }
}

export default new AnalyticEventsService();
