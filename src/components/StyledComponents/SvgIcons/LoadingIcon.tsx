import React from 'react'

const LoadingIcon = () => {
    return (
        <svg
        fillRule="evenodd"
        fill="url(#gradientloading)"
        className="LoadingIcon"
        viewBox="0 0 25 25"
        xmlns="http://www.w3.org/2000/svg"
      >
          
          <linearGradient id="gradientloading">
          <stop offset="5%" stopColor="#0093E9" />
    <stop offset="90%" stopColor="#b9bdbc" />
   
    
        </linearGradient>
          
          <path d="M0 10.996A12.042 12.042 0 0110.996 0v2.009c-4.737.473-8.515 4.25-8.987 8.987H0zm13.004-8.987c4.737.473 8.515 4.25 8.987 8.987H24A12.042 12.042 0 0013.004 0v2.009zm-2.008 19.982c-4.737-.473-8.515-4.25-8.987-8.987H0A12.042 12.042 0 0010.996 24v-2.009zm10.995-8.987c-.473 4.737-4.25 8.514-8.987 8.987V24A12.042 12.042 0 0024 13.004h-2.009z" />
    </svg>
    )
}

export default LoadingIcon
