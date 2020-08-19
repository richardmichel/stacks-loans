import axios from 'axios';
import {
	API_URL,
} from '@config/settings'

const httpResource = axios.create({
	baseURL: `${API_URL}`
});

httpResource.defaults.headers = {
	'Cache-Control': 'no-cache',
	'Pragma': 'no-cache',
	'Expires': '0',
};

export {
	httpResource
}
