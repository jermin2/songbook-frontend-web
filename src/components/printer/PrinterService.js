import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

export default class PrinterService {

    create(page){
        //do something
        const url = `${API_URL}/api/printer/`;
        // const token = sessionStorage.getItem("token");
        // const headers = { headers: {"Authorization": `Bearer ${token}`}, }
        return axios.post(url,page).then(response => {
            alert("New Print Settings Created");
            return response.data;}
         ).catch(e => {
            console.log(e, page);
            throw e;
        })
    }

    save(page, id){
        const url = `${API_URL}/api/printer/${id}/`;
        return axios.put(url, page).then(response => {
            alert("Saved!");
            return response.data
        }).catch( e=> {
            console.log(e);
            throw e
        })
    }

    edit(page){
        //do something
        const url = `${API_URL}/api/printer/`;
        const token = sessionStorage.getItem("token");
        const headers = { headers: {"Authorization": `Bearer ${token}`}, }
        return axios.post(url,page, headers).then(response => {
            alert("Saved!");
            return response.data
        }).catch(e => {
            console.log(e, page);
            throw e
        })
    }

    get(id){
        const url = `${API_URL}/api/printer/${id}/`;
        return axios.get(url).then(response => {
            return response.data
        })
    }

    getAll(){
        const url = `${API_URL}/api/printer/`;
        return axios.get(url).then(response => {
            return response.data
        }).catch( e => {throw e})
    }
}