import React from 'react';
import GrantInfo from '../components/grantInfo';
import Layout from '../components/layout';

function GrantDetails() {
  return (
    <Layout>
    <div>
      <h1 className='center'>Current Grants</h1>
      <br />
      <h4 className='description'>Manage your current grants by adding new entries, editing details, updating statuses, and removing grants as needed.</h4>
      <GrantInfo />
    </div>
    </Layout>
  );
}

export default GrantDetails;