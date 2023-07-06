import React from 'react';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <>
      <Button
          color="primary"
          variant="contained"
          sx={{ textTransform: 'capitalize' }}
          onClick={() => navigate('/admin/home')}>
          Back to Dashboard
        </Button>
        404 NotFound
    </>
  );
};

export default NotFound;
