import axios from 'axios';

export default {
      // Get all store by tags
    getStoreByTags: async (tags, page, orderby, limit) => {
        let stores = await axios.get(`/api/store/tag?name=${tags}&page=${page}&orderby=${orderby}&limit=${limit}`);
        return stores || [];
    },
    
    // Get store by :slug
    getStoreBySlug: async (slug) => {
        let store = await axios.get(`/api/store/${slug}`);
        return store || [];
    },

    // Get notifications :token
    getStoreNotification: async (token) => {
        let notification = await axios.get('/api/notification/' + token);
        return notification || [];
    },

    // Get notifications :storeToken
    getStoreNotifications: async (storeToken) => {
        let notifications = await axios.get('/api/store/notifications/' + storeToken);
        return notifications || [];
    }
}