import React from 'react'
import UserModal from '../../User/UserModal'
import { NavBarContainer } from '../Styles'
import './SVGbackgorund.css'
interface MyProps {
    children?: React.ReactNode
  }
const SVGbackground : React.FunctionComponent<MyProps>= (props )=> {
    return (
        <NavBarContainer >
            <UserModal  />
        <div className="custom-shape-divider-bottom-1612725718">
              <svg 
               fillRule="evenodd"
               fill="white"
            
              data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 30 1200 90" preserveAspectRatio="none">
                  
                

                  <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="shape-fill"></path>
              </svg>
          </div>
          {props.children}
          </NavBarContainer>
    )
}

export default SVGbackground
