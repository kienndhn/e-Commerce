import React from 'react'

const Rating = ({ value, text, color }) => {
  return (
    <div className='rating'>
      <span>
        <i
          style={{ color }}
          className={
            value >= 1
              ? 'fas fa-star fa-xs'
              : value >= 0.5
              ? 'fas fa-star-half-alt fa-xs'
              : 'far fa-star fa-xs'
          }
        ></i>
      </span>
      <span>
        <i
          style={{ color }}
          className={
            value >= 2
              ? 'fas fa-star fa-xs'
              : value >= 1.5
              ? 'fas fa-star-half-alt fa-xs'
              : 'far fa-star fa-xs'
          }
        ></i>
      </span>
      <span>
        <i
          style={{ color }}
          className={
            value >= 3
              ? 'fas fa-star fa-xs'
              : value >= 2.5
              ? 'fas fa-star-half-alt fa-xs'
              : 'far fa-star fa-xs'
          }
        ></i>
      </span>
      <span>
        <i
          style={{ color }}
          className={
            value >= 4
              ? 'fas fa-star fa-xs'
              : value >= 3.5
              ? 'fas fa-star-half-alt fa-xs'
              : 'far fa-star fa-xs'
          }
        ></i>
      </span>
      <span>
        <i
          style={{ color }}
          className={
            value >= 5
              ? 'fas fa-star fa-xs'
              : value >= 4.5
              ? 'fas fa-star-half-alt fa-xs'
              : 'far fa-star fa-xs'
          }
        ></i>
      </span>
      <span style={{fontSize:"0.75rem"}}>{text && text}</span>
    </div>
  )
}

Rating.defaultProps = {
  color: '#f8e825',
}

export default Rating
