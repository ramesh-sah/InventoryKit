import axiosClient from "../../Axios/axios";

const SalesStaffAddCustomersService = {
    SalesStaffAddCustomers(data) {
        return axiosClient.post("/sale-staff-customers/", data)
            .then(response => {
                return response.data;
            })
            .catch(error => {
                if (error.response) {
                    // Check if there's an error response from the backend
                    if (error.response.data && error.response.data.detail) {
                        throw new Error(`Operation failed: ${error.response.data.detail}`);
                    } else {
                        throw new Error(`Operation failed: ${error.response.status} - ${error.response.statusText}`);
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

export default SalesStaffAddCustomersService;
