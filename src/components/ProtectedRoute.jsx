// // src/components/ProtectedRoute.jsx
// import React from 'react';
// import { Route, Redirect } from 'react-router-dom';
// import useAuth from '../hooks/useAuth';

// const ProtectedRoute = ({ component: Component, ...rest }) => {
//   const { isAuthenticated, isLoading } = useAuth();

//   if (isLoading) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <Route
//       {...rest}
//       render={(props) =>
//         isAuthenticated ? (
//           <Component {...props} />
//         ) : (
//           <Redirect to="/account/login" />
//         )
//       }
//     />
//   );
// };

// export default ProtectedRoute;
