
import {httpResource} from '@services/http';
const resource = "stackloan";

export default {
    all(){
        return httpResource.get(`${resource}/users`);
    },
    store(payload) {
        return httpResource.post(`${resource}/user`, payload);
    },
    saveContract(payload){
        return httpResource.post(`${resource}/contract`, payload);
    }
}
