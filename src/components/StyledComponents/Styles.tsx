import styled from 'styled-components'

export const Button = styled.button`
  background: palevioletred;
  width:150px;
  height:50px;
  border-radius: 3px;
  border: none;
  color: white;
`
export const ButtonCards = styled.div`
display:'flex';
flex-direction:column;
justify-content:center;
padding:35px 5px;
align-content:center;
align-items:center;
width:200px;
background-color:white;
height: 160px;
box-shadow:0px 3px 6px 0px #a8a8a8;
border-radius:10px;
margin:0 10px;
cursor: pointer;
transition:0.5s;
&:hover{
    transform:scale(1.1);
  
}
p{margin:0;}`