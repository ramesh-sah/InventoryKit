
import axiosClient from './../../Axios/axios';


const AdminSalesStaffListService = {
    fetchSalesStaff: async () => {
        try {
            const response = await axiosClient.get('/account/admin-sale-staff/');
            return response.data.results; // Return only the results array
        } catch (error) {
            console.error('Error fetching customers:', error.message);
            throw error;
        }
    },
};

export default AdminSalesStaffListService;
