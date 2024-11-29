import React, {useEffect} from 'react';
import GrantResearch from '../components/grantResearch';
import Layout from '../components/layout';

function TrackGrantResearch() {
  useEffect(() => {
    document.title = "Eunoia - Grant Research"; 
  }, []);
  return (
    <Layout>
    <div>
      <GrantResearch />
    </div>
    </Layout>
  );
}

export default TrackGrantResearch;  