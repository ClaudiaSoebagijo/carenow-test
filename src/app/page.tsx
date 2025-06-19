'use client'

import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './styles.css'

type PatientsData = {
  firstName: string;
  middleName?: string;
  lastName: string;
  patientID: string;
  dateOfTreatment: Date;
  treatmentDescription: string[];
  medicationPrescribed: string[];
  cost: number;
}

const treatments = ['Dental Checkup', 'Surgery', 'Vaccination'];
const medications = ['Tylenol', 'Nyquil', 'Panadol'];

export default function Home() {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<PatientsData>();
  const [submitted, setSubmitted] = useState(false);

  const onSubmit = async (data: PatientsData) => {
    try {
       await fetch('/api/patient', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      setSubmitted(true);
      alert('Form submitted successfully!');
      console.log('Data submitted successfully:', data);
      reset();
    } catch(err) {
      console.error('Failed to submit data');
    }
  };

  return (
    <>
    <div className="container">

      {/* header */}
      <div className="header-container">
        <img src='./carenow-logo.png' alt='CareNow Logo' width='122.5px' height='35px' />
        <nav>
          <a href="https://youtu.be/pS57UX6s-xw?si=KrncDLx_RVlNl93I">Medication Records</a>
          <a href="https://youtu.be/FAscULbM1uY?si=5GpSdrfySylmAsns">Treatment Records</a>
          <button className="logout">Logout</button>
        </nav>
      </div>

      {/* main form container */}
      <main>
        <h2>Patient Treatment Forms</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="form">

          {/* first row, names */}
          <div className="row">
            {/* field: first name */}
            <div className="field">
              <label>First Name<span className="required-star">*</span></label>
              <input {...register("firstName", { required: true })} />
            </div>
            {/* field: middle name */}
            <div className="field">
              <label>Middle Name</label>
              <input {...register("middleName")} />
            </div>
            {/* field: last name */}
            <div className="field">
              <label>Last Name<span className="required-star">*</span></label>
              <input {...register("lastName", { required: true })} />
            </div>
          </div>

          {/* second row, patient ID, date of treatment, cost */}
          <div className="row">
            {/* field: patientID */}
            <div className="field">
              <label>Patient ID<span className="required-star">*</span></label>
              <input {...register("patientID", { required: true })} />
            </div>
            {/* field: date of treatment */}
            <div className="field">
              <label>Date of Treatment<span className="required-star">*</span></label>
              <input type="date" placeholder="dd/mm/yyyy" {...register("dateOfTreatment", { required: true })} />
            </div>
            {/* field: cost */}
            <div className="field">
              <label>Cost of Treatment<span className="required-star">*</span></label>
              <input placeholder="Rp***.***.***,-" type="number" {...register("cost", { required: true })} />
            </div>
          </div>

          {/* third row, treatment description, medication prescribed */}
          <div className="row">
            {/* field: treatment description, dropdown selection */}
            <div className="field">
              <label>Treatment Description<span className="required-star">*</span></label>
              <select {...register("treatmentDescription", { required: true })}>
                <option value="">Select...</option>
                {
                  treatments.map((treatment, index) => (
                    <option key={index} value={treatment}>{treatment}</option>
                  ))
                }
              </select>
            </div>
            {/* field: medication prescribed, dropdown selection */}
            <div className="field">
              <label>Medication Prescribed<span className="required-star">*</span></label>
              <select {...register("medicationPrescribed", { required: true })}>
                <option value="">Select...</option>
                {
                  medications.map((medication, index) => (
                    <option key={index} value={medication}>{medication}</option>
                  ))
                }
              </select>
            </div>
          </div>

          <button type="submit" className="submit">Submit</button>
        </form>
      </main>
    </div>
    </>
  );
}
