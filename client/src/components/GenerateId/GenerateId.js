import React from 'react'
import styles from './GenerateId.module.css'
import CancelButton from '../CustomButton/CancelButton';
import CustomInput from '../Input/CustomInput';
import IconButton from '../CustomButton/IconButton';
import AssignmentIcon from '@mui/icons-material/Assignment';


const GenerateId = () => {
  return (
    <div className={styles.generateIdContainer}>
      <div className={styles.cancelButton}>
        <CancelButton name="generateId" />
      </div>


      <div className={styles.form}>

        <CustomInput label="Enter Your Name" name="nameInput" />

        <div className={styles.button}>
          <IconButton
            name="copyId"
            content="COPY YOUR ID"
            icon={<AssignmentIcon />}
          />
        </div>

      </div>
    </div>
  )
}

export default GenerateId