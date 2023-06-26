import React, { useState } from 'react';
import styles from './JobDataTable.module.css';
import check from '../../assets/check-solid.svg';
import xmark from '../../assets/xmark-solid.svg';

const JobDataTable = ({ dataTable, updateDataTable }) => {
  const [ deleteList, setDeleteList ] = useState([])
  const [ selectedOption, setSelectedOption ] = useState("")

  const handleCheckboxChange = (e) => {
    let { value, checked } = e.target;
    value = parseInt(value);

    if (checked) {
      setDeleteList((prevWebStack) => [...prevWebStack, value]);
    } else {
      setDeleteList((prevWebStack) => prevWebStack.filter((stack) => stack !== value));
    }
  };

  const handleSelectAll = (e) => {
    let { checked } = e.target;

    if (checked) {
      const allJobIDs = dataTable.map(job => {
        return job.id
      })
      setDeleteList(allJobIDs)
    } else {
      setDeleteList([])
    }
  };

  const handleDeleteDropDown = (e) => {
    if (e.target.value === "delete") {
      deleteSelectedJobs()
    }
  }

  const deleteSelectedJobs = async () => {
    await fetch('http://localhost:8000/jobs/delete/', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Basic ' + btoa('admin:password'),
      },
      body: JSON.stringify({ job_ids: deleteList }),
    })
      .then(response => {
        if (response.ok) {
          // update data table
          updateDataTable(deleteList);
          
          // reset state values
          setDeleteList([])
          setSelectedOption("")

        }
      })
      .catch(error => console.error(error));
  }

  return (
    <div className={styles.Component}>
      <h1>Job Applications</h1>
        <table className={styles.Table}>
          <thead>
            <tr>
              <th className={styles.DeleteCheckbox}>        
                <input
                  type="checkbox"
                  checked={deleteList.length > 0 && deleteList.length === dataTable.length}
                  onChange={handleSelectAll}
                />
                <select id="dropdown" name="dropdown" className={styles.DeleteDropDown} value={selectedOption} onChange={handleDeleteDropDown}>
                  <option value="" default></option>
                  {deleteList.length > 0 && <option value="delete">Delete</option>}
                </select>
              </th>
              <th>Position</th>
              <th>Company</th>
              <th>Location</th>            
              <th>Date Applied</th>
              <th>Received Offer</th>
              <th className={styles.TextAlignLeft}>Web Stack</th>
            </tr>
          </thead>
          <tbody>
            {dataTable.map((job) => (
              <tr key={job.id}>
                <td className={styles.DeleteCheckbox}>        
                  <input
                    type="checkbox"
                    value={job.id}
                    checked={deleteList.includes(job.id)}
                    onChange={handleCheckboxChange}
                  />
                </td>
                <td>{job.position}</td>
                <td>{job.company}</td>
                <td>{job.location}</td>
                <td>{job.date_applied}</td>
                <td>
                  <div className={job.received_offer ? styles.CheckIcon : styles.XMarkIcon}>
                    <img src={job.received_offer ? check : xmark} alt={job.received_offer ? "check" : "xmark"} />
                  </div>
                </td>
                <td className={styles.WebStackColumn}>
                  {job.web_stack.length > 0 ? 
                    job.web_stack.map((item, index) => (
                      <div key={index} className={styles.StackItem}>{item}</div>
                    ))
                    : null
                  }
                </td>
              </tr>
            ))}
          </tbody>
        </table>
    </div> 
  );
};

export default JobDataTable;