// // src/hooks/useAuth.js
// import { useEffect } from 'react';
// import { useGetUserQuery } from '../services/auth';

// const useAuth = () => {
//   const { data, error, isLoading } = useGetUserQuery();

//   useEffect(() => {
//     if (data) {
//       localStorage.setItem('is_auth', 'true');
//     } else if (error) {
//       localStorage.removeItem('is_auth');
//     }
//   }, [data, error]);

//   return {
//     isAuthenticated: Boolean(data),
//     isLoading,
//   };
// };

// export default useAuth;
