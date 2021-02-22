import React, { forwardRef }  from 'react'
import { useFetch } from '../../Hook/useFetch';
import ItemCard from '../StyledComponents/ItemCard/ItemCard';

import {List,AutoSizer} from 'react-virtualized';
import './Page.css'


interface Props {
    link:string;
    type:string;
}


const Page:React.FC<Props>= ({link,type}) => {
    const allItems = useFetch(link);
    const {data}:any = allItems;
    console.log(allItems ,'ITEMS');
  
  
    function rowRenderer({key, index, style}:any) {
        return (
          <div key={key} style={style}>
            <ItemCard key={index} type={type} data={data[index]} />
          </div>
        );
      }
      const ITEMS_COUNT = data.length
const ITEM_SIZE = 300
    return (
        <div>
            <h1>Page</h1>
            
     
            <AutoSizer>
    {({ height, width }) => {
      const itemsPerRow = Math.floor(width / ITEM_SIZE);
      const rowCount = Math.ceil(ITEMS_COUNT / itemsPerRow);
      
      return (
        <List
          className='List'
          width={600}
          height={600}
          rowCount={rowCount}
          rowHeight={ITEM_SIZE}
          rowRenderer={
            ({ index, key, style }) => {
              const items = [];
              const fromIndex = index * itemsPerRow;
              const toIndex = Math.min(fromIndex + itemsPerRow, ITEMS_COUNT);

              for (let i = fromIndex; i < data.length; i++) {
                items.push(
                  <div
                    className='Item'
                    key={i}
                  >
                      <ItemCard key={i} type={type} data={data[i]} />
                    
                  </div>
                )
              }

              return (
                <div
                  className='Row'
                  key={key}
                  style={style}
                >
                  {items}
                </div>
              )
            }
          }
        />
      )
    }}
  </AutoSizer>,
      
        </div>
          /* <ItemCard key={rowIndex} type={type} data={data[rowIndex]} /> */
    )
}

export default Page;
