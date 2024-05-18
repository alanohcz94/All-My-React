import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { getBookings } from "../../services/apiBookings";
import { PAGE_SIZE } from "../../utils/constants";

export function useBookings() {
    const queryClient = useQueryClient();
    const [searchParams] = useSearchParams();

    const filterValue = searchParams.get('status');
    const filter = !filterValue || filterValue === "all" ? null : {field: 'status', value: filterValue, method: 'eq'};
    const sortByValues = searchParams.get('sortBy') || "startDate-desc";
    const [field, direction] = sortByValues.split('-');
    const sortBy = {field, direction};

    // pagination
    const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));
    
    // React Query
    const {
        isLoading,
        data: {data: bookings, count} = {},
        error,
    } = useQuery({
        queryFn: () => getBookings({filter, sortBy, page}),
        queryKey: ['bookings', filter, sortBy, page],
    });

    // Do Pre-fetching of the data to allow a better user-experience (What is prefetchInfinateQuery?)
    // NEXT
    if(page < Math.ceil(count / PAGE_SIZE))
    queryClient.prefetchQuery({ 
        queryFn: () => getBookings({filter, sortBy, page: page+1}),
        queryKey: ["booking", filter , sortBy, page+1],
    })

    // PREV
    if(page > 1) 
    queryClient.prefetchQuery({  
        queryFn: () => getBookings({filter, sortBy, page: page-1}),
        queryKey: ["booking", filter , sortBy, page-1],
    })
    
    return { isLoading, bookings, error, count };
}