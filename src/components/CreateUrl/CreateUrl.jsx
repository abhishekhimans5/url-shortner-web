import React, { useState } from 'react';
import './create-url.css';
import Spinner from '../Spinner/Spinner';
import { urlModel } from '../../models/url';
import { createUrl } from '../../api/createUrl';

const CreateUrl = () => {
  const [urlData, setUrlData] = useState(urlModel);
  const [isLoading, setIsLoading] = useState(false);
  const [apiError,setApiError] = useState('');

  const handleChange = (e) => {
    setUrlData({ ...urlData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!urlData.originalUrl) {
      alert("Please enter a valid URL");
      return;
    }else if(urlData.accessType === 'protected' && (!urlData.accessCode || urlData.accessCode.trim().length < 4)) {
      alert("Please enter a valid access code with at least 4 characters");
      return;
    }
    setIsLoading(true);
    try {
      const result = await createUrl(urlData);
    } catch (error) {
      setApiError(error.message);
    }
    setIsLoading(false)
    // API Call Logic
  };

  return (
    <div className="create-container">
      <div className="create-card">
        <h2 className="create-title">Shorten a New URL</h2>
        <form className="create-form" onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Name</label>
            <input 
              type="text" 
              name="urlName" 
              placeholder="Short It"  
              onChange={handleChange}
            />
          </div>
          <div className="input-group">
            <label>Destination URL</label>
            <input 
              type="url" 
              name="originalUrl" 
              placeholder="https://example.com/very-long-link" 
              required 
              onChange={handleChange}
            />
          </div>

          <div className="input-row">
            <div className="input-group">
              <label>Access Type</label>
              <select 
                name="accessType" 
                className="create-select" 
                onChange={handleChange}
                value={urlData.accessType}
              >
                <option value="public">Public</option>
                <option value="protected">Protected (Code)</option>
                <option value="private">Private (Only Me)</option>
              </select>
            </div>
          </div>

          <div className="input-row">
            <div className="input-group">
              <label>Access Code {urlData.accessType == 'public' && `${`(Optional)`}`}</label>
              <input 
                type="text" 
                name="accessCode" 
                placeholder="Set a password" 
                required={urlData.accessType === 'protected'}
                onChange={handleChange}
              />
            </div>
            <div className="input-group">
              <label>Expiration Date</label>
              <input 
                type="date" 
                name="expiresAt" 
                onChange={handleChange}
              />
            </div>
          </div>

          <button type="submit" 
                className="submit-btn"
                disabled={isLoading}>
            {isLoading ? 'Generating...' : 'Create Short Link'}
          </button>
        </form>
        {isLoading && <Spinner fullPage={false} />}
        {apiError && <div className="error-msg"
                            style={{
                              color: 'red',
                              display : 'flex',
                              alignItems : 'center',
                              justifyContent : 'center'
                            }}>{apiError}</div>}
      </div>
        
    </div>
  );
};

export default CreateUrl;