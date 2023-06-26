import React, { useState, useRef } from 'react';
import styles from './JobForm.module.css'
import TextInput from './TextInput';

const JobForm = ({ updateDataTable }) => {
  const [position, setPosition] = useState('');
  const [company, setCompany] = useState('');
  const [location, setLocation] = useState('');
  const [dateApplied, setDateApplied] = useState('');
  const [receivedOffer, setReceivedOffer] = useState('No');
  const [webStack, setWebStack] = useState([]);
  const [errorMessages, setErrorMessages] = useState([]);

  const positionRef = useRef(null);
  const companyRef = useRef(null);
  const dateRef = useRef(null);

  const handlePositionChange = (e) => {
    setPosition(e.target.value);
  };

  const handleCompanyChange = (e) => {
    setCompany(e.target.value);
  };

  const handleLocationChange = (e) => {
    setLocation(e.target.value);
  };

  const handleDateAppliedChange = (e) => {
    setDateApplied(e.target.value);
  };

  const handleReceivedOfferChange = (e) => {
    setReceivedOffer(e.target.value);
  };

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;

    if (checked) {
      setWebStack((prevWebStack) => [...prevWebStack, value]);
    } else {
      setWebStack((prevWebStack) => prevWebStack.filter((stack) => stack !== value));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create new job
    await fetch('http://localhost:8000/jobs/create/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Basic ' + btoa('admin:password'),
      },
      body: JSON.stringify({
        position,
        company,
        location,
        date_applied: dateApplied,
        received_offer: receivedOffer === 'Yes' ? true : false,
        web_stack: webStack.join(','), // convert array to string
      }),
    })
    .then(response => {
      if (response.status === 200) {
        return response.json().then(data => {
          // reset all fields
          setPosition("");
          setCompany("");
          setLocation("");
          setDateApplied("");
          setReceivedOffer('No');
          setWebStack([])
          setErrorMessages([])

          // Add new job to data table
          updateDataTable(data)
        })
      } else {
        // Handle error messages
        return response.json().then(data => {
          setErrorMessages(data)

          // redirect focus to input
          if (data.position) {
            positionRef.current.focus();
            return;
          } else if (data.company) {
            companyRef.current.focus();
            return;
          } else if (data.date_applied) {
            dateRef.current.focus();
            return;
          }

        })
      }
    })
    .catch(error => console.error(error))
  }

  return (
    <div className={styles.Component}>
      <h1>Add a Job</h1>
      <form className={styles.Form} onSubmit={handleSubmit}>
        <section className={styles.Row}>
          <div className={styles.Flex}>
            <TextInput label="Position" placeholder="Position" value={position} maxLength={40} isRequired={true} ref={positionRef} onChange={handlePositionChange} />
            {errorMessages.position && <p className={styles.ErrorMessage}>{errorMessages.position[0]}</p>}
          </div>
          <div className={styles.Flex}>
            <TextInput label="Company" placeholder="Company" value={company} maxLength={40} isRequired={true} ref={companyRef} onChange={handleCompanyChange} /> 
            {errorMessages.company && <p className={styles.ErrorMessage}>{errorMessages.company[0]}</p>}
          </div>
        </section>
        <section className={styles.Row}>
          <div className={styles.Flex}>
            <TextInput label="Date Applied" placeholder="MM/DD/YYYY" value={dateApplied} maxLength={10} isRequired={true} ref={dateRef} onChange={handleDateAppliedChange} /> 
            {errorMessages.date_applied && <p className={styles.ErrorMessage}>{errorMessages.date_applied[0]}</p>}
          </div>
          <TextInput label="Location" placeholder="Location" value={location} maxLength={40} isRequired={false} onChange={handleLocationChange} />
        </section>
        <div className={styles.ReceivedOffer}>
          <label htmlFor="dropdown">Did you receive an offer?</label>
          <select id="dropdown" name="dropdown" value={receivedOffer} onChange={handleReceivedOfferChange}>
            <option value="Yes" >Yes</option>
            <option default value="No">No</option>
          </select>
        </div>
        <div className={styles.WebStack}>
          <label>Web Stack</label>
          <div className={styles.CheckBoxes}>
            <input type="checkbox" id="checkbox1" value="React" checked={webStack.includes('React')} onChange={handleCheckboxChange}/>
            <label htmlFor="checkbox1">React</label>

            <input type="checkbox" id="checkbox2" value="Django" checked={webStack.includes('Django')} onChange={handleCheckboxChange}/>
            <label htmlFor="checkbox2">Django</label>

            <input type="checkbox" id="checkbox3" value="JavaScript" checked={webStack.includes('JavaScript')} onChange={handleCheckboxChange}/>
            <label htmlFor="checkbox3">JavaScript</label>

            <input type="checkbox" id="checkbox4" value="HTML" checked={webStack.includes('HTML')} onChange={handleCheckboxChange}/>
            <label htmlFor="checkbox4">HTML</label>

            <input type="checkbox" id="checkbox5" value="CSS" checked={webStack.includes('CSS')} onChange={handleCheckboxChange}/>
            <label htmlFor="checkbox5">CSS</label>

            <input type="checkbox" id="checkbox6" value="Python" checked={webStack.includes('Python')} onChange={handleCheckboxChange}/>
            <label htmlFor="checkbox6">Python</label>
          </div>
        </div>
        <button className={styles.SubmitBtn} onClick={handleSubmit}>Submit</button>
      </form>
    </div>
  );
};

export default JobForm;