import React, { PropTypes } from 'react';

const CustomerEdit = ({ params }) => (
  <h1>Customer {params.id}</h1>
);

CustomerEdit.propTypes = {
  params: PropTypes.objectOf({
    id: PropTypes.number
  })
};

export default CustomerEdit;
