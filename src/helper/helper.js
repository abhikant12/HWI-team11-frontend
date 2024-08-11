// import axios from 'axios';
// import jwt_decode from 'jwt-decode';

// axios.defaults.baseURL = process.env.REACT_APP_SERVER_DOMAIN;


// /** Make API Requests */


// export async function register({ username, location }) {
//     try {
//         if (username) {
//             const { data, headers } = await axios.post('/api/login', { username, password });
//             // here headers contain cookie and cookie contain token and data contain (success, token, user, message);
//             return { data };
//         }
//     } catch (error) {
//         throw { error: "Password doesn't Match...!" };
//     }
// }
