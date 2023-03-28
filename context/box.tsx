import { createContext, ReactNode, FC, useContext, useState } from "react";
import { useAccount, useSigner } from "wagmi";

type BoxContext = {
  nextView: (view: FC) => void;
  previousView: () => void;
  store: any;
  currentView?: FC;
  views?: [ReactNode?];
  signer?: ReturnType<typeof useSigner>;
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
  const signer = useSigner()
  const account = useAccount()
  // const { modalType, modalProps } = store || {};

  const nextView = (view: FC) => {
    console.log('nextView', view)
    setCurrentView(view)
  };
 
  const previousView = () => {
    console.log('previousView')
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
    console.log('rendering currentView', currentView)
    // if (!modalType || !ModalComponent) {
    //   return null;
    // }
    return <ViewComponent />;
  };
 
  return (
    <BoxContext.Provider value={{ store, nextView, previousView, signer, account }}>
      {renderComponent()}
      {/* {children} */}
    </BoxContext.Provider>
  );
 };
