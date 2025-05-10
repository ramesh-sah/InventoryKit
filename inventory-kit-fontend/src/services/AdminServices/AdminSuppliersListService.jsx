
import axiosClient from './../../Axios/axios';


const AdminSuppliersListService = {
    fetchSuppliers: async () => {
        try {
            const response = await axiosClient.get('/admin-suppliers/');
            return response.data.results; // Return only the results array
        } catch (error) {
            console.error('Error fetching customers:', error.message);
            throw error;
        }
    },
};

export default AdminSuppliersListService;
