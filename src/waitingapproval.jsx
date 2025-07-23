import React from 'react';
import { Link } from 'react-router-dom';

const WaitingApproval = () => {
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#f4f6f8'
    }}>
      <div style={{
        width: 400,
        padding: 30,
        background: '#fff',
        borderRadius: 10,
        boxShadow: '0px 4px 20px rgba(0,0,0,0.1)',
        textAlign: 'center'
      }}>
        <h2>Awaiting Approval</h2>
        <p>Your moderator account is pending approval by an admin.</p>
        <p>Please check back later.</p>
        <p>Redirect to <Link to= "/login">Login</Link> </p>
      </div>
    </div>
  );
};

export default WaitingApproval;
