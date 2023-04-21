import { useState, createContext, FC, forwardRef, ForwardRefRenderFunction, ReactNode, useRef, useCallback, useImperativeHandle, useContext, RefObject } from 'react';

export interface SignBoxRefAttributes {
  openUpload: () => void;
}

interface SignBoxProps {
  name: string;
  children?: ReactNode;
  className?: string;
}

export interface SignBoxAttr {
  nextView: (ref: ReactNode) => void;
  children: () => ReactNode;
}

export type IViewContext = {
  setView: (_view?: ReactNode) => void;
  previousView: () => void;
}

export const ViewContext = createContext<IViewContext>({
  setView: (_view?: ReactNode) => {},
  previousView: () => {},
});

export const useViewContext = () => useContext(ViewContext)

export const ViewProvider: FC<{ children: ReactNode, refNode: RefObject<SignBoxAttr> }> = ({ children, refNode }) => {
  const [current, setCurrent] = useState<ReactNode>(children);
  const [previous, setPrevious] = useState<ReactNode[]>([])
  
  const setView = (_view: ReactNode) => {
    setPrevious([...previous, current]);
    setCurrent(_view);
    refNode.current?.nextView(_view);
  }
  
  const previousView = () => {
    const previousView = previous.pop();
    setPrevious([...previous]);
    setCurrent(previousView);
    refNode.current?.nextView(previousView);
  }
  
  const value = {
    setView,
    previousView,
  }
  return <ViewContext.Provider value={value} >{children}</ViewContext.Provider>
}

const ViewWrapper: ForwardRefRenderFunction<
SignBoxAttr,
SignBoxProps
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

export const ViewContainer = forwardRef<SignBoxAttr, SignBoxProps>(ViewWrapper);

type StreamProps = {
  children: ReactNode;
  className?: string;
}

export default function SignBox({ children, ...props }: StreamProps) {

  const containerRef = useRef<SignBoxAttr>(null);

  return (
    <>
        <ViewProvider refNode={containerRef}>
          <ViewContainer 
            name="signBox" 
            ref={containerRef}
            {...props}
          >
            {children}
          </ViewContainer>
        </ViewProvider>
    </>
  )
}
