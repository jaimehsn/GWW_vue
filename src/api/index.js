import axios from "axios";
import qs from "querystring"



const ENDPOINT_PATH = "http://192.168.31.62:9000/api/";

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
        return axios.get(ENDPOINT_PATH + "listGroups", datas, config)
            .then((response) => {
                console.log("Response from API Rest FIND ALL GROUPS:", response.data)
                return response.data
            }).catch((error) => {
                console.log("ERROR MESSAGE:", error.response.message)
                return error.response.message
            });
        
    },

    userInfo(email, token) {
        axios.defaults.headers.common['Authorization'] = token;

        return axios.get(ENDPOINT_PATH + "users/" + email )
            .then((response) => {
                console.log("Response from API Rest USER INFO:", response.data)
                return response.data
            }).catch((error) => {
                console.log("ERROR MESSAGE:", error.response.message)
                return error.response.message
            });
    },

    updateInfo(email,token,name,lastname,phone,category){
        axios.defaults.headers.common['Authorization'] = token;
        const user = qs.stringify({
            name,
            lastname,
            phone,
            category
        })
        return axios.put(ENDPOINT_PATH + "users/" + email, user,
        );
    }


};