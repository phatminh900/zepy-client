import { useQuery } from "@tanstack/react-query";
import { QueryKey } from "src/constants/query-key.constant";
import { searchContact } from "src/services/contact.service";
const useSearchContact = (email?: string) => {
  const { data, isFetching, refetch, isFetched } = useQuery({
    queryKey: [QueryKey.FRIEND_SEARCH, email],
    queryFn: () => {
      if (email) return searchContact(email);
      return new Promise((resolve) => resolve([]));
    },

    retry: false,
    enabled: false,
  });
  return { data, isFetching, refetch, isFetched };
};
export default useSearchContact;
