import React from 'react'
import Filter from '../../ui/Filter';
import TableOperations from '../../ui/TableOperations';

const CabinOperations = () => {
  const options = [{value:'all', label:'All'},{value:'discount', label:'Discount'},{value:'noDiscount', label:'No Discount'}];

  return (
    <TableOperations><Filter filterField={'discount'} options={options}/></TableOperations>
  )
}

export default CabinOperations