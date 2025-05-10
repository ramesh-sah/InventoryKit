
import axiosClient from './../../Axios/axios';


const PurchaseStaffSuppliersListService = {
    fetchSuppliers: async () => {
        try {
            const response = await axiosClient.get('/purchase-staff-suppliers/');
            return response.data.results; // Return only the results array
        } catch (error) {
            console.error('Error fetching customers:', error.message);
            throw error;
        }
    },
};

export default PurchaseStaffSuppliersListService;
