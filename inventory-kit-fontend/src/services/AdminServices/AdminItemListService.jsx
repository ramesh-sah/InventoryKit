
import axiosClient from './../../Axios/axios';


const AdminItemListService = {
    fetchItem: async () => {
        try {
            const response = await axiosClient.get('/admin-items/');
            return response.data.results; // Return only the results array
            
        } catch (error) {
            console.error('Error fetching customers:', error.message);
            throw error;
        }
    },
};

export default AdminItemListService;
