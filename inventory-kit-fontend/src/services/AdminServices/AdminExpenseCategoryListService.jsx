import axiosClient from './../../Axios/axios';

const AdminExpenseCategoryListService = {
    fetchExpenseCategory: async (page, pageSize) => {
        try {
            // Sending page and pageSize as query parameters to the backend
            const response = await axiosClient.get('/admin-expense-categories/', {
                params: {
                    page,       // 1-based page index
                    page_size: pageSize, // Number of items per page
                },
            });
            return response.data; // Return full API response
        } catch (error) {
            console.error('Error fetching expense categories:', error.message);
            throw error;
        }
    },
};

export default AdminExpenseCategoryListService;
