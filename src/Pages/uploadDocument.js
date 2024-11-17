import React from 'react';
import GrantTable from '../components/upload';
import Layout from '../components/layout';


function UploadDocument() {
  return (   
    <Layout> 
    <div>
      <h1 className='center'>File Upload</h1>
      <br />
      <h4 className='description'>Upload documents related to your current grants to keep everything organized and easily accessible in one centralized location.</h4>
      <GrantTable />
    </div>
    </Layout>
  );
}

export default UploadDocument;  
