import React from 'react';
import Layout from '../components/layout';
import GrantStatusChart from '../components/grantStatusChart';

function Dashboard() {
  return (
    <Layout>
      <div className="dashboard-container">
        <section id="dashboard-section" className="dashboard">
          <h2 className='center'>Dashboard</h2>
          <br />
          <h4 className='description'>Welcome to your Dashboard. Here you can choose to add widgets specified to you that will aid in your grant search processes. </h4>
          <div className="dashboard-widgets">
            <div className="widget">
              <h3>Status</h3>
            </div>
            <br />
            <div className="widget">
              <h3>Amount Paid</h3>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}

export default Dashboard;