import React, { useContext, useState } from 'react';
import './profile.css';
import Spinner from '../Spinner/Spinner';
import LoginContextProvider from '../../utils/LoginContextProvider';
import { verifyEmail,verifyOtpSubmission } from '../../api/verifyEmail.js';

const Profile = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({ type: 'error', text: '' });
  const {isLoggedIn, setIsLoggedIn,user,setUser} = useContext(LoginContextProvider);
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const token = localStorage.getItem('token');

  const handleVerify = async () => {
    setIsLoading(true);
    // Logic for sending verification email
    try {
      const result = await verifyEmail(token);
      setMessage({ type: 'success', text: 'Verification email sent!' });
      setOtpSent(true);
    } catch (error) {
      setMessage({ type: 'error', text: error.message });
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetPassword = async () => {
    setIsLoading(true);
    // Logic for password reset trigger
  };
  const handleLogout = () => {

  }
  const handleOtpSubmit = async () => {
    setIsLoading(true);
    // Logic for OTP submission
    try {
      const result = await verifyOtpSubmission(token, otp);
      setMessage({ type: 'success', text: 'Account verified successfully!' });
      setUser(result.data);
    } catch (error) {
      setMessage({ type: 'error', text: error.message });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="profile-container">
      <div className="profile-card">
        <div className="profile-header">
          <div className="avatar">{user?.name?.charAt(0).toUpperCase() || 'U'}</div>
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
        {/* <div>
          <button className="action-btn" onClick={handleLogout}>Log Out</button>
        </div> */}
        <div 
          style={{
            marginTop: '20px', 
            display: 'flex', 
            alignItems: 'center',
            justifyContent: 'center',
            visibility: (user?.isVerified || !otpSent )? 'hidden' : 'visible'
            }}>
          <input type='number' 
                  placeholder='Enter OTP sent to your email' 
                  className='otp-input'
                  onChange={(e) => setOtp(e.target.value)}
                  />
          <button className="action-btn verify"
                  style={{marginLeft: '10px'}}
                  onClick={handleOtpSubmit}
                  >Submit</button>
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