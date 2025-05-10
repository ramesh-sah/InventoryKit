import axios from "axios";

// Create an Axios instance
const axiosClient = axios.create({
    baseURL: "http://127.0.0.1:8000/api/", // Base URL for API
    headers: {
        "Content-Type": "multipart/form-data", // Correct Content-Type for file upload
        Accept: "application/json", // Optional: specify the response format
    },
});

// Request interceptor to add the Authorization header if an access token exists
axiosClient.interceptors.request.use(
    (config) => {
        const access = localStorage.getItem("access");
        if (access) {
            config.headers.Authorization = `Bearer ${access}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor to handle login success and token storage
axiosClient.interceptors.response.use(
    (response) => {
        // Check if the response contains an 'access' token (assuming login response contains access and refresh tokens)
        if (response.data && response.data.token) {
            const { access, refresh } = response.data.token;

            // Store the tokens in localStorage for further use
            if (access) {
                localStorage.setItem("access", access); // Save access token
            }
            if (refresh) {
                localStorage.setItem("refresh", refresh); // Save refresh token
            }
        }

        // Return the response to be used by the component or service calling the API
        return response;
    },
    async (error) => {
        // Handle errors (e.g., 401 Unauthorized, etc.)
        if (error.response) {
            // Remove tokens if 401 error is encountered
            if (error.response.status === 401) {
                localStorage.removeItem("access");
                localStorage.removeItem("refresh");
                window.location.href = "/"; // Redirect to login page
            }

            // Optionally, handle specific error messages for display
            const errorMessage = error.response.data?.msg || "An error occurred.";
            console.error(errorMessage);

            // Check if the error is due to an expired token
            if (error.response.status === 403) {
                try {
                    // Attempt to refresh the token using the refresh token
                    const refreshResponse = await axiosClient.post('/token/refresh/', {
                        refresh: localStorage.getItem('refresh'),
                    });

                    // If the token refresh is successful, update the access token and retry the original request
                    if (refreshResponse.data.access) {
                        localStorage.setItem('access', refreshResponse.data.access);
                        error.config.headers.Authorization = `Bearer ${refreshResponse.data.access}`;
                        return axiosClient(error.config);
                    } else {
                        // If the token refresh fails, remove the tokens and redirect to the login page
                        localStorage.removeItem('access');
                        localStorage.removeItem('refresh');
                        window.location.href = '/';
                    }
                } catch (refreshError) {
                    // If the token refresh fails, remove the tokens and redirect to the login page
                    localStorage.removeItem('access');
                    localStorage.removeItem('refresh');
                    window.location.href = '/';
                }
            }
        } else {
            // Handle network or connection errors
            console.error("Network Error:", error.message);
        }

        // Reject the promise to allow further error handling
        return Promise.reject(error);
    }
);

export default axiosClient;