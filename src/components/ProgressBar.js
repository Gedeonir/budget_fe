import React from 'react'
import { CircularProgressbar,buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const ProgressBar = (props) => {
    
  return (
    
        <CircularProgressbar 
        value={props.percentage} 
        text={`${props.percentage}%`}
        styles={buildStyles({
            // Colors
            pathColor: `#26B2AB`,
            textColor: '#26B2AB',
            trailColor: '#d6d6d6',
            backgroundColor: '#3e98c7',
        })}
        />

  )
}

export default ProgressBar