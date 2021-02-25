import React from 'react'

import './SVGbackgorund.css'
interface MyProps {
    children?: React.ReactNode
  }
const SVGFooterPage : React.FunctionComponent<MyProps>= (props )=> {
    return (
        <div>
       
        <div>
        
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" fill="url(#gradientFooter)">
            
            <linearGradient id="gradientFooter">
              <stop offset="0%" stopColor="#80D0C7" />
        <stop offset="100%" stopColor="#0093E9" />
       
        
            </linearGradient>
            <path fill="#gradientFooter" fillOpacity="1" d="M0,32L48,69.3C96,107,192,181,288,181.3C384,181,480,107,576,112C672,117,768,203,864,218.7C960,235,1056,181,1152,170.7C1248,160,1344,192,1392,208L1440,224L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
</svg>
                
        </div>
        
        
            
          </div>
    )
}

export default SVGFooterPage
