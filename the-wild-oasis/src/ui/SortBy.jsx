import React from 'react'
import { useSearchParams } from 'react-router-dom'
import Select from './Select';

const SortBy = ({options}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentSortByValue = searchParams.get('sortBy') || options.at(0);
  
  function handleOnChange(e) {
    searchParams.set('sortBy', e.target.value);
    setSearchParams(searchParams);
  }
  return (
    <Select 
      options={options} 
      type="white" 
      onChange={handleOnChange}  
      value={currentSortByValue}/>
  )
}
export default SortBy;