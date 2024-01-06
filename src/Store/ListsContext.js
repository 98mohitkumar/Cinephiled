import useGetAllLists from "hooks/useGetAllLists";
import { createContext, useContext } from "react";

const ListsContext = createContext({
  lists: [],
  updateList: () => {}
});

export const useListsContext = () => {
  const context = useContext(ListsContext);

  if (context === undefined) {
    throw new Error("useListsContext must be used within ListsContextProvider");
  }

  return context;
};

const ListsContextProvider = ({ children }) => {
  const { lists, updateList } = useGetAllLists();

  return <ListsContext.Provider value={{ lists, updateList }}>{children}</ListsContext.Provider>;
};

export default ListsContextProvider;
