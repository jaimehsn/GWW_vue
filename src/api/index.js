import axios from "axios";
import qs from "querystring"
import bus from "@/bus"
const ENDPOINT_PATH = "https://ec2-13-59-126-158.us-east-2.compute.amazonaws.com:8443/api/";

export default {

    userInfo(email, token) {
        axios.defaults.headers.common['Authorization'] = token;
        console.log(ENDPOINT_PATH)
        return axios.get(ENDPOINT_PATH + "users/" + email)
            .then((response) => {
                console.log("Response from API Rest USER INFO: OK :")
                //bus.$emit("feedback", )
                return response.data
            }).catch((error) => {
                console.log("ERROR USERINFO:", error.response.message)
                bus.$emit("feedback", error.response.message)
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
        ).then(() => {
            bus.$emit("feedback", 'Updated profile.')
        }).catch(() => {
            bus.$emit("feedback", "Update error.")
        });
    },

    findAllNotes(group, token) {
        axios.defaults.headers.common['Authorization'] = token;
        return axios.get(ENDPOINT_PATH + "notes/" + group)
            .then((response) => {
                console.log("Response from API Rest FIND ALL NOTES:", response.data[0])
                return response.data
            }).catch((error) => {
                console.log("ERROR FINDALLNOTES:", error.response.message)
                return error.response.message
            });

    },

    findAllGroups(email, token) {
        axios.defaults.headers.common['Authorization'] = token;

        return axios.get(ENDPOINT_PATH + "listGroups")
            .then((response) => {
                console.log("Response from API Rest FIND ALL GROUPS: OK")
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
                console.log("ExitGroup: OK")
                bus.$emit("feedback", 'Successful exit.')
                return response.status
            }).catch((error) => {
                console.log("ERROR EXITGROUP:", error.response.message)
                bus.$emit("feedback", 'An error occurred while exiting.')
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
                console.log("Response from API Rest CREATE GRUOP : OK")
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
                console.log("DELETE GROUP: OK")
                bus.$emit("feedback", 'Completely removed.')
                return response.status
            }).catch((error) => {
                console.log("ERROR DELETEAGROUP:", error.response.message)
                bus.$emit("feedback", 'Delete error.')
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
                console.log("Response from API Rest USER ADDED : OK")
                return response.status
            }).catch((error) => {
                console.log("ERROR ADDUSER:", error.response.message)
                bus.$emit("feedback", 'Insert user error.')
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
                console.log("Response from API Rest USER LISTS : OK")
                return response.data
            }).catch((error) => {
                console.log("ERROR LISTUSERGROUP:", error.response.message)
                return error.response.message
            });
    },

    createNote(title, content, state, grpName, autor, token) {
        axios.defaults.headers.common['Authorization'] = token;
        const datas = qs.stringify({
            title,
            content,
            grpName,
            state,
            autor,
        })
        return axios.post(ENDPOINT_PATH + "notes", datas)
            .then((response) => {
                console.log("Response from API Rest CREATE NOTE : OK")
                //socket emiter
                return response.data
            }).catch((error) => {
                console.log("ERROR CREATENOTE:", error.response.message)
                return error.response.message
            });
    },

    updateNote(id, title, content, state, autor, token) {
        axios.defaults.headers.common['Authorization'] = token;
        const datas = qs.stringify({
            title,
            content,
            state,
            autor,
        })
        return axios.put(ENDPOINT_PATH + "notes/" + id, datas)
            .then((response) => {
                console.log("Response from API Rest UPDATE NOTE : OK")
                return response.data
            }).catch((error) => {
                console.log("ERROR UPDATENOTE:", error.response.message)
                return error.response.message
            });
    },

    deleteNote(id, token) {
        axios.defaults.headers.common['Authorization'] = token;
        return axios.delete(ENDPOINT_PATH + "notes/delOnes/" + id)
            .then((response) => {
                console.log("Response from API Rest DELETE NOTE : OK", response.data)
                bus.$emit("feedback", 'Completely removed.')
                return response.data
            }).catch((error) => {
                console.log("ERROR DELETENOTE:", error.response.message)
                bus.$emit("feedback", 'Delete error.')
                return error.response.message
            });
    }



};