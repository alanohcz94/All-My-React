import React from "react";
import { useSearchParams } from "react-router-dom";
import Menus from "../../ui/Menus";
import Spinner from "../../ui/Spinner";
import Table from "../../ui/Table";
import CabinRow from "./CabinRow";
import { useCabins } from "./useCabins";
import Empty from '../../ui/Empty';

const CabinTable = () => {
  const { isLoading, cabins } = useCabins();
  const [ searchParams] = useSearchParams();

  if (isLoading) return <Spinner />;
  if(!cabins.length) return <Empty resource="cabins" />

  // Filtering data first
  const filterValues = searchParams.get('discount') || 'all';

  let filterCabins = cabins;

  switch(filterValues) {
    case 'noDiscount':
      filterCabins = cabins.filter(cabin => cabin.discount === 0);
      break;
    case 'discount':
      filterCabins = cabins.filter(cabin => cabin.discount >= 0);
      break;  
  }

  // Sort the data by
  const [field, sortByDirection] = searchParams.get('sortBy')?.split('-') || ""; 
  const modifier = sortByDirection === 'asc' ? 1 : -1;
  const sortByCabins = filterCabins.sort((a,b) => {
    if(typeof a[field] === 'string' || typeof b[field] === 'string') return (a[field].localeCompare(b[field])) * modifier;
    return (a[field] - b[field]) * modifier;
  });

  return (
    <Menus>
      <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
        <Table.Header>
          <div></div>
          <div>Cabin</div>
          <div>Capacity</div>
          <div>Price</div>
          <div>Discount</div>
          <div></div>
        </Table.Header>
        <Table.Body data={sortByCabins} render={(cabin) => (
            <CabinRow cabin={cabin} key={cabin.id} />
          )}/>
      </Table>
    </Menus>
  );
};

export default CabinTable;
