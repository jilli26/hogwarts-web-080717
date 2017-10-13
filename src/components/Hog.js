import React from 'react'

const Hog = (props) => {

  return (
    <div className="ui four wide column" onClick={props.handleClick}>
      <h3 data-name={props.name}>{props.name}</h3>
      <img src={props.image} data-name={props.name}/>
      <div>
      {props.show ?
        <ul><small>
          <li><strong>Specialty:</strong> {props.specialty}</li>
          <li><strong>Highest Medal Achieved:</strong> {props.highestMedalAchieved}</li>
          <li><strong>Weight:</strong> {props.weight}</li>
        </small></ul>
        : null}
      </div>
    </div>

  )
}

export default Hog;
