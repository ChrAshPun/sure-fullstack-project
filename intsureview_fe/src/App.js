import React, { useState, useEffect } from 'react';
import styles from './App.module.css';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import JobForm from './components/JobForm/JobForm';
import JobDataTable from './components/JobDataTable/JobDataTable';

function App() {
  const [dataTable, setDataTable] = useState([]);

  const getDataTable = async () => {
    await fetch('http://localhost:8000/jobs', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Basic ' + btoa('admin:password'),
      },
    })
      .then(response => response.json())
      .then(data => {

        // convert web_stack from string to array
        const updated_data = data.results.map(item => {
          if (item.web_stack.length > 0) {
            const webStack = item.web_stack.split(",");
            return {
              ...item,
              web_stack: webStack,
            }
          }
          return item
        })

        setDataTable(updated_data)
      })
      .catch(error => console.error(error))
  }

  useEffect(() => {
    getDataTable()
  },[])

  const addJob = (job) => {
    setDataTable(prevState => {
      // convert web_stack from string to array
      job.web_stack = job.web_stack.length > 0 ? job.web_stack.split(",") : []

      // add job to data table
      let dataTable = [...prevState, job]

      // sort data table by date in descending order
      return dataTable.sort((a,b) => {
        return new Date(b.date_applied) - new Date(a.date_applied)
      })
    })
  }

  const removeJobs = (jobList) => {
    setDataTable(prevState => {
      return prevState.filter(job => !jobList.includes(job.id))
    })
  }

  return (
    <div className={styles.App}>
      <Header />
      <section className={styles.Section}>
        <div className={styles.TealBg}></div>
        <JobForm updateDataTable={addJob}/>
        <JobDataTable dataTable={dataTable} updateDataTable={removeJobs}/>
      </section>
      <Footer />
    </div>
  );
}

export default App;
