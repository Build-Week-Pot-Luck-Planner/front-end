import axios from 'axios';

const axiosWithAuth = () => {
  const token = localStorage.getItem('token');

  return axios.create({
    headers: {
      // baseUrl: "https://bw-potluckplanner.herokuapp.com/api",
      Authorization: token,
    },
  });
};

export default axiosWithAuth;