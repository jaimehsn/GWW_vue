import axios from "axios";
import qs from "querystring"



const ENDPOINT_PATH = "http://localhost:9000/api/";

export default {
    findAllGroups(email,token) {
        axios.defaults.headers.common['Authorization'] = token;
        const datas = qs.stringify({
            email,
            'HTTP_CONTENT_LANGUAGE': self.language
        })
        const config =qs.stringify({
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'custom-header':'custom-header'
            }
        })
        axios.get(ENDPOINT_PATH + "listGroups", datas, config)
            .then((response) => {
                console.log("Response from API Rest:", response)
                return response
            }).catch((error) => {
                console.log("ERROR MESSAGE:", error.response.message)
                return error;
            });
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
        return axios.get(ENDPOINT_PATH + "auth", user,
            config,
        );
    }
};