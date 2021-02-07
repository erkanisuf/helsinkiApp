import React from 'react'
import { ItemsCard } from '../Styles'

const ItemCard = () => {
    return (
        <div style={{width:'100%',margin:'250px auto',display:'flex',justifyContent:'flex-start',flexWrap:'wrap'}}>

        
        <ItemsCard>
           
            <div className="card-img" style={{backgroundImage:"url('https://img.yle.fi/uutiset/uutisen-ims-kuvat/article11604636.ece/ALTERNATES/w960/39-7322545f8eeda7822ce')"}}></div>
            <p>Hello World</p>
        </ItemsCard>
        <ItemsCard>
           
            <div className="card-img" style={{backgroundImage:"url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRfpZB0_3qGRT0vx7Jlw662goIgQc9en4esg&usqp=CAU')"}}></div>
            <p>Hello World</p>
        </ItemsCard>
        <ItemsCard>
           
            <div className="card-img" style={{backgroundImage:"url('https://img.yle.fi/uutiset/uutisen-ims-kuvat/article11604636.ece/ALTERNATES/w960/39-7322545f8eeda7822ce')"}}></div>
            <p>Hello World</p>
        </ItemsCard>
        <ItemsCard>
           
            <div className="card-img" style={{backgroundImage:"url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRfpZB0_3qGRT0vx7Jlw662goIgQc9en4esg&usqp=CAU')"}}></div>
            <p>Hello World</p>
        </ItemsCard>
        <ItemsCard>
           
            <div className="card-img" style={{backgroundImage:"url('https://img.yle.fi/uutiset/uutisen-ims-kuvat/article11604636.ece/ALTERNATES/w960/39-7322545f8eeda7822ce')"}}></div>
            <p>Hello World</p>
        </ItemsCard>
        <ItemsCard>
           
            <div className="card-img" style={{backgroundImage:"url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRfpZB0_3qGRT0vx7Jlw662goIgQc9en4esg&usqp=CAU')"}}></div>
            <p>Hello World</p>
        </ItemsCard>
        </div>
    )
}

export default ItemCard
