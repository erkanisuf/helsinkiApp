import styled from 'styled-components'


const defaultMargin:number = 0
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
border-bottom:5px solid #3590c5;
border-top:5px solid #3adce7;
border-radius:10px;
margin:0 10px;
cursor: pointer;
transition:0.5s;

&:hover{
    transform:scale(1.1);
    
  
}
p{margin:0;}`

export const NavBarContainer = styled.div`
position:relative;
display:flex;
flex-direction:column;
justify-content:center;
align-items:center;
background-color: #0093E9;
background-image: linear-gradient(160deg, #0093E9 0%, #80D0C7 100%);

z-index:1;
height:500px;`

interface RowDivProps {
 readonly marginBottom: number
};
export const RowDiv= styled.div<RowDivProps  >`display:flex;
flex-direction:row;
margin-bottom:${props => props.marginBottom}px;
justify-content:center;
align-items:center;
font-family: 'Kalam', cursive;
font-size:18px;
p{
  
color:black;
}
a{text-decoration:none ;}`

export const SearchBarStyle = styled.input`
width:400px;
height:50px;
outline:none;
border:none;
`

export const SelectStyle = styled.select`
width:100px;
height:52px;
outline:none;
border:none;
border-left:5px solid #5eb7eb;
border-top-right-radius:5px;
border-bottom-right-radius:5px;
`



export const SearchButton = styled.button`
width:50px;
background-color:#094263;
height:52px;
cursor: pointer;
outline:none;
border:none;
display:flex;
align-items:center;
border-top-left-radius:5px;
border-bottom-left-radius:5px;`

export const ItemsCard = styled.div`
display:'flex';
flex-direction:column;
justify-content:center;
font-family: 'Open Sans', sans-serif;
font-weight:600;
color:#2e2d2d;
align-content:center;
align-items:center;
width:250px;
background-color:white;
height: 250px;
box-shadow:1px 1px 5px 0px #adadad;
border-radius:10px;
margin: 10px ;
cursor: pointer;
transition:0.1s;
overflow:hidden;
border-bottom:12px solid #fdfdfd;
&:hover{
    border-bottom:12px solid #094263;
    
}
p{margin:10px;}
div{  background-size: cover;
   background-repeat: no-repeat;
   background-position: center center;
   border-top-right-radius:10px;
   border-top-left-radius:10px;
   width:100%;
   padding:5px;
   height: 150px;}`

export const CarouselContainer = styled.div`
width:80%;
display:flex;
flex-direction:column;
justify-content:flex-start;
margin: 0 auto;

border-bottom:1px solid #a3b4c7;
padding:50px;
h1{
  text-align:left;
}`

interface SVGProps {
  width:number;
  height:number;
 };
 export const SvgContainer= styled.div<SVGProps >`display:flex;
 display:flex;
 align-items:center;
 justify-content:center;
 margin-bottom:-50px;
 width:${props => props.width}px;
 height:${props => props.height}px;
 
 `

export const PageContainer= styled.div`display:flex;
display:flex;
width:75%;
margin:0 auto;
align-items:flex-start;
justify-content:flex-start;
flex-wrap:wrap;
margin-bottom:20px;


`

export const PageHeader = styled.div`

display:flex;
flex-direction:row;
width:100%;
margin:0 auto;
background-color: #10a7ff;
background-image: linear-gradient(160deg, #0093E9 60%, #80D0C7 100%);
justify-content:space-around;
padding-top:50px;
align-items:center;
align-self:center;
`


export const NextPrevbtn = styled.button`

background:none;
border:none;
outline:none;
cursor: pointer;
border-bottom:5px solid white;
border-radius:5px;
&:active{
  background:none;
border:none;
outline:none;


}
&:hover{
  border-bottom:5px solid #10a7ff;

}
`

export const PagesNav = styled.div`

display:flex;
width:30%;
justify-content:space-between;
color:white;

font-size:20px;

a{
  font-family: 'Open Sans', sans-serif;
  color:white;
  text-decoration:none;
  font-weight:400;
  text-transform: uppercase;
  padding:5px 10px;
  border:1px solid #0093E9;
  border-radius:15px;
  transition:0.5s ;
  &:hover{
    background-color: #54b4ec;
 border:1px solid #ffffff;
 }
}


`