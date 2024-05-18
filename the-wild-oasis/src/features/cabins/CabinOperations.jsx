import React from 'react'
import Filter from '../../ui/Filter';
import SortBy from '../../ui/SortBy';
import TableOperations from '../../ui/TableOperations';

const CabinOperations = () => {
  const options = [{value:'all', label:'All'},{value:'discount', label:'Discount'},{value:'noDiscount', label:'No Discount'}];

  const sortByOptions = [
    { value: "name-desc", label: "Sort by name (Z-A)" },
    { value: "name-asc", label: "Sort by name (A-Z)" },
    {
      value: "regularPrice-desc",
      label: "Sort by price (high - low)",
    },
    { value: "regularPrice-asc", label: "Sort by price (low - high)" },
    { value: "maxCapacity-desc", label: "Sort by capacity (high - low)" },
    { value: "maxCapacity-asc", label: "Sort by capacity (low - hight)" },
  ]

  return (
    <TableOperations>
        <Filter filterField={'discount'} options={options}/>
        <SortBy options={sortByOptions}/>
    </TableOperations>
  )
}

export default CabinOperations