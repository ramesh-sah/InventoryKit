import axiosClient from "../../Axios/axios";

const AdminUpdateSalesStaffService = {
    AdminUpdateSalesStaff(data, id) {
        return axiosClient.patch("account/admin-sale-staff/" + id + "/", data)
            .then(response => {
                return response.data;
            })
            .catch(error => {
                if (error.response) {
                    // Check if there's an error response from the backend
                    if (error.response.data && error.response.data.detail) {
                        throw new Error(`Login failed: ${error.response.data.detail}`);
                    } else {
                        throw new Error(`Login failed: ${error.response.status} - ${error.response.statusText}`);
                    }
                } else if (error.request) {
                    // This can happen if there's no response from the backend (network error)
                    throw new Error("No response received from the server.");
                } else {
                    // Any other errors (such as request setup errors)
                    throw new Error("Error setting up the request.");
                }
            });
    }
};

export default AdminUpdateSalesStaffService;
