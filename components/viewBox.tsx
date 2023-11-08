import { useState, createContext, FC, forwardRef, ForwardRefRenderFunction, ReactNode, useRef, useCallback, useImperativeHandle, useContext, RefObject } from 'react';

export interface ViewBoxRefAttributes {
  openUpload: () => void;
}

interface ViewBoxProps {
  name: string;
  children?: ReactNode;
  className?: string;
}

export interface ViewBoxAttr {
  nextView: (ref: ReactNode) => void;
  children: () => ReactNode;
}

export type IViewContext = {
  setView: (_view?: ReactNode) => void;
  previousView: () => boolean;
}

export const ViewContext = createContext<IViewContext>({
  setView: (_view?: ReactNode) => {},
  previousView: () => false,
});

export const useViewContext = () => useContext(ViewContext)

export const ViewProvider: FC<{ children: ReactNode, refNode: RefObject<ViewBoxAttr> }> = ({ children, refNode }) => {
  const [current, setCurrent] = useState<ReactNode>(children);
  const [previous, setPrevious] = useState<ReactNode[]>([])
  
  const setView = (_view: ReactNode) => {
    setPrevious([...previous, current]);
    setCurrent(_view);
    refNode.current?.nextView(_view);

  }
  
  const previousView = () => {
    
    try {
      const previousView = previous.pop();
      setPrevious([...previous]);
      setCurrent(previousView);
      refNode.current?.nextView(previousView);
      return true
    } catch (error) {

      return false
    }
  }
  
  const value = {
    setView,
    previousView,
  }
  return <ViewContext.Provider value={value} >{children}</ViewContext.Provider>
}

const ViewWrapper: ForwardRefRenderFunction<
ViewBoxAttr,
ViewBoxProps
> = (props, ref) => {
  const { name, ...otherprops } = props;
  const [children, setChildren] = useState<ReactNode>(props.children);
  const elRef = useRef<HTMLDivElement>();

  const elRefCB = useCallback((node: any) => {
    if (node !== null) {
      elRef.current = node;
    }
  }, []);

useImperativeHandle(ref, () => ({
  nextView: (nextRef: ReactNode) => {
    setChildren(nextRef)
  },
  children: () => {
    return children
  }
}));

  return (
    <div ref={elRefCB} {...otherprops}>
      {children}
    </div>
  )
};

export const ViewContainer = forwardRef<ViewBoxAttr, ViewBoxProps>(ViewWrapper);

type StreamProps = {
  children: ReactNode;
  className?: string;
}

export default function ViewBox({ children, ...props }: StreamProps) {

  const containerRef = useRef<ViewBoxAttr>(null);

  return (
    <ViewProvider refNode={containerRef}>
      <ViewContainer 
        name="viewBox" 
        ref={containerRef}
        {...props}
      >
        {children}
      </ViewContainer>
    </ViewProvider>
  )
}
