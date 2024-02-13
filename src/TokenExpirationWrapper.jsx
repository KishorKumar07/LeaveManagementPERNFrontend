import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useNavigate, useLocation } from 'react-router-dom';

const TokenExpirationWrapper = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();


  useEffect(() => {
    const checkTokenExpiration = () => {
      const token = localStorage.getItem('token');
      if (token) {
        const decodedPayload = atob(token.split('.')[1]);
        const decodedToken = JSON.parse(decodedPayload);
        const isTokenExpired = decodedToken.exp < Date.now() / 1000;

        if (isTokenExpired && location.pathname !== '/login') {
         
          window.alert('Token has expired. Please log in again.');
          navigate('/login');
          window.location.reload();
        }
      }
    };

    checkTokenExpiration();
  }, [ location, navigate]);

  return <>{children}</>;
};

TokenExpirationWrapper.propTypes = {
  children: PropTypes.node.isRequired,
};

export default TokenExpirationWrapper;
