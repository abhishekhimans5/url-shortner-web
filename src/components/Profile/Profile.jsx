import React, { useContext, useState } from 'react';
import './profile.css';
import Spinner from '../Spinner/Spinner';
import LoginContextProvider from '../../utils/LoginContextProvider';

const Profile = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({ type: 'error', text: 'h' });
  const {user} = useContext(LoginContextProvider)

      console.log("User details fetched:", user);

  const handleVerify = async () => {
    setIsLoading(true);
    // Logic for sending verification email
  };

  const handleResetPassword = async () => {
    setIsLoading(true);
    // Logic for password reset trigger
  };

  return (
    <div className="profile-container">
      <div className="profile-card">
        <div className="profile-header">
          <div className="avatar">{user?.name?.charAt(0) || 'U'}</div>
          <h2>{user?.name || 'User Name'}</h2>
          <p>{user?.email || 'user@example.com'}</p>
        </div>

        <div className="profile-sections">
          <div className="info-row">
            <span>Account Status</span>
            <span className={`status-tag ${user?.isVerified ? 'verified' : 'unverified'}`}>
              {user?.isVerified ? 'Verified' : 'Unverified'}
            </span>
          </div>

          <div className="action-group">
            {!user?.isVerified && (
              <div className="action-item">
                <div>
                  <p className="action-title">Verify Account</p>
                  <p className="action-desc">Get access to advanced analytics.</p>
                </div>
                <button className="action-btn verify" onClick={handleVerify}>Verify</button>
              </div>
            )}

            <div className="action-item">
              <div>
                <p className="action-title">Security</p>
                <p className="action-desc">Reset your account password.</p>
              </div>
              <button className="action-btn reset" onClick={handleResetPassword}>Reset</button>
            </div>
          </div>
        </div>

        {message.text && (
          <div className={`profile-msg ${message.type}`}>{message.text}</div>
        )}
        
        {isLoading && <Spinner fullPage={false} />}
      </div>
    </div>
  );
};

export default Profile;