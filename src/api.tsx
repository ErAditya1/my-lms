import axios from 'axios';

export const API_URL = process.env.SERVER_URI || 'https://lms-backend-mh2d.onrender.com/api'

const createInstance = (baseURL:string)=>{
   
    return axios.create({
        baseURL: baseURL,
        headers: {
            'Content-Type': 'application/json',
        }
    })
}

export default createInstance(API_URL)
