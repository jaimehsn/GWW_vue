import axios from "axios";
import qs from "querystring"
axios.defaults.headers.common['Authorization'] = "AUTH_TOKEN";


const ENDPOINT_PATH = "https://ec2-13-59-126-158.us-east-2.compute.amazonaws.com:8443/api/";

export default {
    register(email, password) {
        const user = qs.stringify({
            email,
            password
        })
        const config = qs.stringify({
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            }
        })
        return axios.post(ENDPOINT_PATH + "users", user,
        config,
        );
    },
    login(email, password) {
        const user = qs.stringify({
            email,
            password
        })
        const config = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }
        return axios.post(ENDPOINT_PATH + "auth", user,
        config,
        );
    }
};