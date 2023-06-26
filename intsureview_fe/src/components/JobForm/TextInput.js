import React from "react";
import styles from './TextInput.module.css'

const TextInput = React.forwardRef(({ label, placeholder, value, maxLength, isRequired, onChange }, ref) => {
  return (
    <div className={styles.TextInput}>
      <label className={styles.Label}>{label}{isRequired && <span className={styles.Red}>*</span>}</label>
      <input className={styles.Input} type="text" placeholder={placeholder} value={value} maxLength={maxLength} required={isRequired} ref={ref} onChange={onChange} />
    </div>
  );
});

export default TextInput;