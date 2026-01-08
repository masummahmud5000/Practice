import axios from 'axios'

let axiosIns = axios.create({baseURL: 'http://127.0.0.1:8000/', withCredentials: true});

axiosIns.interceptors.request.use(
    (config) => {
        const accessToken = localStorage.getItem('access_token');
        if (accessToken){
            config.headers['Authorization'] = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

axiosIns.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        const originalRequest = error.config;

        if (error.response && error.response.status === 401 && !originalRequest._retry){
            originalRequest._retry = true;

            try{
                const refreshToken = localStorage.getItem('refresh_token');
                const refreshApi = await axios.post('http://127.0.0.1:8000/refresh/', {refresh : refreshToken});
                if (refreshApi.status === 200){
                    const new_access_token = refreshApi.data.access;
                    localStorage.setItem('access_token', new_access_token);
                    
                    axiosIns.defaults.headers.common['Authorization'] = `Bearer ${new_access_token}`;
                    originalRequest.headers['Authorization'] = `Bearer ${new_access_token}`;
                    
                    return axiosIns(originalRequest);
                }
            }catch(refeshError){
                console.log({'Error': 'Refresh Token Expired LogOut!'});
                localStorage.removeItem('access_token');
                localStorage.removeItem('refresh_token');
                window.location.href = '/login';
                // console.log(localStorage.getItem('refresh_token'))
                return Promise.reject(refeshError);
            }
        }
        return Promise.reject(error)
    }
);

export default axiosIns;