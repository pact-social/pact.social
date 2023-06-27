import { createContext, ReactNode, FC, useContext, useState } from "react";
import { useAccount } from "wagmi";

type BoxContext = {
  nextView: (view: FC) => void;
  previousView: () => void;
  store: any;
  currentView?: FC;
  views?: [ReactNode?];
  account?: ReturnType<typeof useAccount>;
 };

 const initalState: BoxContext = {
  nextView: () => {},
  previousView: () => {},
  store: {},
  currentView: undefined,
  views: [],
 };

const BoxContext = createContext(initalState);

export const useBoxContext = () => useContext(BoxContext);

export const BoxContent: React.FC<{ children: ReactNode, boxNodes?: [ReactNode] }> = ({ children, boxNodes }) => {
  const [store, setStore] = useState<any>();
  const [currentView, setCurrentView] = useState<FC>();
  const account = useAccount()
  // const { modalType, modalProps } = store || {};

  const nextView = (view: FC) => {
    setCurrentView(view)
  };
 
  const previousView = () => {
    setStore({
      ...store,
      modalType: null,
      modalProps: {},
    });
  };
 
  const renderComponent = () => {
    if (!currentView) return (
      <>
        {children}
      </>
    )
    const ViewComponent = currentView;
    // if (!modalType || !ModalComponent) {
    //   return null;
    // }
    return <ViewComponent />;
  };
 
  return (
    <BoxContext.Provider value={{ store, nextView, previousView, account }}>
      {renderComponent()}
      {/* {children} */}
    </BoxContext.Provider>
  );
 };
