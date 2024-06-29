import axios from "axios"
import { BASE_URL } from "./constants";

export const getDocumentById = async (id) => {
    try {
        const { data } = await axios.get(`${BASE_URL}/document/${id}`);
        return { success: true, data };
    } catch (error) {
        return { success: false, message: error.message };
    }
}

export const createDocument = async (payload) => {
    try {
        const { data } = await axios.post(`${BASE_URL}/document`, payload);
        return { success: true, data };
    } catch (error) {
        return { success: false, message: error.message };
    }
}

export const updateDocument = async (id, payload) => {
    try {
        const { data } = await axios.put(`${BASE_URL}/document/${id}`, payload);
        return { success: true, data };
    } catch (error) {
        return { success: false, message: error.message };
    }
}

export const getAllDocuments = async () => {
    try {
        const { data } = await axios.get(`${BASE_URL}/document/all`);
        return { success: true, data };
    } catch (error) {
        return { success: false, message: error.message };
    }
}