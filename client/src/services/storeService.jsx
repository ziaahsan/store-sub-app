import axios from 'axios';

export default {
      // Get all store by tags
    getStoresByTags: async (tags, page, orderby, limit) => {
        tags = encodeURIComponent(tags);
        page = encodeURIComponent(page);
        orderby = encodeURIComponent(orderby);

        let stores = await axios.get(`/api/stores/tag?name=${tags}&page=${page}&orderby=${orderby}&limit=${limit}`);
        return stores || [];
    },
    
    // Get :slug store
    getStoreBySlug: async (slug) => {
        slug = encodeURIComponent(slug);
        
        let store = await axios.get(`/api/store/${slug}`);
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