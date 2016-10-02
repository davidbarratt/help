import React, { PropTypes } from 'react';

const CustomerDelete = ({ params }) => (
  <h1>Customer {params.id} Delete</h1>
);

CustomerDelete.propTypes = {
  params: PropTypes.objectOf({
    id: PropTypes.number
  })
};

export default CustomerDelete;
