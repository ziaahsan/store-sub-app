import axios from 'axios';

export default {
    // Get all store service
    getStores: async () => {
        let stores = await axios.get('/api/stores');
        return stores || [];
    },

    // Get all store by tags
    getStoresByTags: async (tags, offset=0) => {
        let stores = await axios.get(`/api/stores/tag/${tags}/${offset}`);
        return stores || [];
    },
    
    // Get :token store
    getStore: async (token) => {
        let store = await axios.get('/api/store/' + token);
        return store || [];
    },

    // Get :token notifications
    getStoreNotification: async (token) => {
        let notification = await axios.get('/api/notification/' + token);
        return notification || [];
    },

    // Get :storeToken notifications
    getStoreNotifications: async (storeToken) => {
        let notifications = await axios.get('/api/store/notifications/' + storeToken);
        return notifications || [];
    }
}