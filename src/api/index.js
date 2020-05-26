import axios from "axios";
import qs from "querystring"

const ENDPOINT_PATH = "http://192.168.31.62:9000/api/";

export default {

    userInfo(email, token) {
        axios.defaults.headers.common['Authorization'] = token;

        return axios.get(ENDPOINT_PATH + "users/" + email)
            .then((response) => {
                console.log("Response from API Rest USER INFO:", response.data)
                return response.data
            }).catch((error) => {
                console.log("ERROR USERINFO:", error.response.message)
                return error.response.message
            });
    },

    updateInfo(email, token, name, lastname, phone, category) {
        axios.defaults.headers.common['Authorization'] = token;
        const user = qs.stringify({
            name,
            lastname,
            phone,
            category
        })
        return axios.put(ENDPOINT_PATH + "users/" + email, user,
        );
    },

    findAllNotes(group, token) {
        axios.defaults.headers.common['Authorization'] = token;
        return axios.get(ENDPOINT_PATH + "notes/" + group)
            .then((response) => {
                //console.log("Response from API Rest FIND ALL NOTES:", response.data)
                return response.data
            }).catch((error) => {
                console.log("ERROR FINDALLNOTES:", error.response.message)
                return error.response.message
            });

    },

    findAllGroups(email, token) {
        axios.defaults.headers.common['Authorization'] = token;

        return axios.get(ENDPOINT_PATH + "listGroups",)
            .then((response) => {
                console.log("Response from API Rest FIND ALL GROUPS:", response.data)
                return response.data
            }).catch((error) => {
                console.log("ERROR FINDALLGROUPS:", error.response.message)
                return error.response.message
            });

    },

    exitGroup(email, grpName, token) {
        axios.defaults.headers.common['Authorization'] = token;
        return axios.delete(ENDPOINT_PATH + "del", {
            data: {
                email: email,
                grpName: grpName
            }
        })
            .then((response) => {
                console.log("Response message:", response.data)
                return response.status
            }).catch((error) => {
                console.log("ERROR EXITGROUP:", error.response.message)
                return error.response.message
            });
    },

    createGroup(grpName, token) {
        axios.defaults.headers.common['Authorization'] = token;
        const datas = qs.stringify({
            grpName,
        })
        return axios.post(ENDPOINT_PATH + "groups", datas)
            .then((response) => {
                console.log("Response from API Rest CREATE GRUOP :", response.status)
                return response.status
            }).catch((error) => {
                console.log("ERROR CREATEAGROUP:", error.response.message)
                return error.response.message
            });
    },

    deleteGroup(grpName, token) {
        axios.defaults.headers.common['Authorization'] = token;
        return axios.delete(ENDPOINT_PATH + "groups", {
            data: {
                grpName: grpName
            }
        })
            .then((response) => {
                console.log("Response message:", response.data)
                return response.status
            }).catch((error) => {
                console.log("ERROR DELETEAGROUP:", error.response.message)
                return error.response.message
            });
    },

    addUser(email, grpName, token) {
        axios.defaults.headers.common['Authorization'] = token;
        const datas = qs.stringify({
            email,
            grpName,
        })
        return axios.post(ENDPOINT_PATH + "add", datas)
            .then((response) => {
                console.log("Response from API Rest USER ADDED :", response.status)
                return response.status
            }).catch((error) => {
                console.log("ERROR ADDUSER:", error.response.message)
                return error.response.message
            });
    },

    listUserGroup(grpName, token) {
        axios.defaults.headers.common['Authorization'] = token;
        console.log("NOMBRE DEL GRUPO: ", grpName)
        return axios.get(ENDPOINT_PATH + "listUsers", {
            params: {
                grpName: grpName
            }
        })
            .then((response) => {
                console.log("Response from API Rest USER LISTS :", response.data)
                return response.data
            }).catch((error) => {
                console.log("ERROR LISTUSERGROUP:", error.response.message)
                return error.response.message
            });
    }



};