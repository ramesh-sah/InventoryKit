
import axiosClient from './../../Axios/axios';


const SalesStaffViewCustomersService = {
    fetchCustomers: async () => {
        try {
            const response = await axiosClient.get('/sale-staff-customers/');
            return response.data.results; // Return only the results array
        } catch (error) {
            console.error('Error fetching customers:', error.message);
            throw error;
        }
    },
};

export default SalesStaffViewCustomersService;
