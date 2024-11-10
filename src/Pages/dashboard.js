import React from 'react';
import Navigation from '../components/navigation';
import { BrowserRouter, Routes, Route } from 'react-router-dom';


function Dashboard() {
  return (
    <main>

      <div className="dashboard-container">
        <h2>Hello, *Name*! Welcome to your Dashboard.</h2>

        <section id="dashboard-section" className="dashboard">
          <h2>Dashboard Overview</h2>

          <div className="dashboard-widgets">
            <div className="widget">
              <h3>Widget 1</h3>
            </div>

            <div className="widget">
              <h3>Widget 2</h3>
              <p>More metrics or interactive content.</p>
            </div>

            <div className="widget">
              <h3>Widget 3</h3>
              <p>Other content</p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}


export default Dashboard;