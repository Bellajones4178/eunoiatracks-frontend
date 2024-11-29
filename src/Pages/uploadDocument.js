import React, {useEffect} from 'react';
import GrantTable from '../components/upload';
import Layout from '../components/layout';


function UploadDocument() {
  useEffect(() => {
    document.title = "Eunoia - Documents"; 
  }, []);
  return (   
    <Layout> 
    <div>
      <h1 className='center'>Documents</h1>
      <br />
      <h4 className='description'>Upload documents related to your current grants to keep everything organized and easily accessible in one centralized location.</h4>
      <GrantTable />
    </div>
    </Layout>
  );
}

export default UploadDocument;  
