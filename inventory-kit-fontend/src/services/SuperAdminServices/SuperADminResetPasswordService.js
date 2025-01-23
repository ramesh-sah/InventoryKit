import axiosClient from "../../Axios/axios";

const SuperAdminLoginService = {
    SuperAdminLogin(data) {
        return axiosClient.post("/account/login/", data)
            .then(response => {
                return response.data;
            })
            .catch(error => {
                // Handle error response from backend
                if (error.error) {
                    const errorMessage = Object.values(error.error)
                        .flat()
                        .join(", ");
                    throw new Error(`Login failed: ${errorMessage}`);
                } else {
                    throw new Error("Login failed. Please try again.");
                }
            });
    }
};

export default SuperAdminLoginService;