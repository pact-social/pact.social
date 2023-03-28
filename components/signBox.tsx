import { useEffect, useState, createContext, FC, forwardRef, ForwardRefRenderFunction, ReactNode, useRef, useCallback, useImperativeHandle, MutableRefObject, useContext, RefObject } from 'react';
import { useAccount } from 'wagmi';
import { useCeramicContext } from '../context';
import { BoxContent } from '../context/box';
import { ManifestProvider } from '../context/manifest';
import useManifest from '../hooks/useManifest';
import SignStats from './sign/stats';
import WalletSign from './sign/wallet';

export interface SignBoxRefAttributes {
  openUpload: () => void;
}

interface SignBoxProps {
  name: string;
  // error?: string;
  // borderRadius?: number;
  // placeholder?: string;
  // defaultPictureUrl?: string;
  // onBlur?: () => void;
  // value?: string | FileList;
  // borderColor: string;
  // onChange?: (data: FileList | null) => void;
  children?: ReactNode;
  className?: string;
}

export interface SignBoxAttr {
  nextView: (ref: ReactNode) => void;
  children: () => ReactNode;
}

export type IViewContext = {
  // current?: ReactNode;
  // previous: ReactNode[];
  setView: (_view?: ReactNode) => void;
  previousView: () => void;
}

export const ViewContext = createContext<IViewContext>({
  // current: null,
  // previous: [],
  setView: (_view?: ReactNode) => {},
  previousView: () => {},
});

// export const useView = (
//   _view = <></>
// ): IViewContext  => {
//   const [view, setView] = useState<ReactNode>(_view);
//   return {
//     current: view, 
//     setView,
//     previous,
//   };
// };

export const useViewContext = () => useContext(ViewContext)

export const ViewProvider: FC<{ children: ReactNode, refNode: RefObject<SignBoxAttr> }> = ({ children, refNode }) => {
  const [current, setCurrent] = useState<ReactNode>(children);
  const [previous, setPrevious] = useState<ReactNode[]>([])
  const setView = (_view: ReactNode) => {
    console.log('setView', _view)
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
    // current,
    // previous,
    setView,
    previousView,
  }
  return <ViewContext.Provider value={value} >{children}</ViewContext.Provider>
}

// const Container: FC<{children: ReactNode}> = ({children}) => <div>{children}</div>

const ViewWrapper: ForwardRefRenderFunction<
SignBoxAttr,
SignBoxProps
> = (props, ref) => {
  const { name, ...otherprops } = props;
  const [children, setChildren] = useState<ReactNode>(props.children);
  const elRef = useRef();

  const elRefCB = useCallback((node: ReactNode) => {
    if (node !== null) {
      console.log('node callback', node);
      // node.style.background = "lightblue";
      elRef.current = node;
    }
  }, []);
  console.log("I am rendering");

useImperativeHandle(ref, () => ({
  nextView: (nextRef: ReactNode) => {
    console.log('nextView', nextRef, elRef)
    // children = nextRef;
    setChildren(nextRef)
    // elRef.current = nextRef
    // elRefCB()
    // elRefCB(<div ref={elRefCB} {...otherprops}>
    //   {nextRef}
    // </div>);
    // handleOnUploadClick();
  },
  children: () => {
    return children
  }
}))
  
  useEffect(() => {
    console.log('elRef update', elRef.current);
  }, [elRef]);
  
  useEffect(() => {
    console.log('node children update', elRef.current);
    // elRefCB(<div ref={elRefCB} {...otherprops}>{children}</div>);
  }, [children]);

  return (
    <div ref={elRefCB} {...otherprops}>
      {children}
    </div>
  )
};

export const ViewContainer = forwardRef<SignBoxAttr, SignBoxProps>(ViewWrapper);

export default function SignBox({ streamID, children }: FC & { streamID: string, children: ReactNode}) {
  // const [ started, setStarted ] = useState(false);
  // const [ Current, setCurrent ] = useState<Function>(() => <></>);
  // const { ceramic } = useCeramicContext();
  // const { address, isConnected } = useAccount();
  // const { data, error } = useManifest({
  //   __typename: "Manifest",
  //   stream: streamID,
  // })

  const containerRef = useRef<SignBoxAttr>(null);
  // const nextView = (Component: () => JSX.Element) => {
  //   console.log('nextView', Component)
  //   setCurrent(Component);
  //   setStarted(true);
  //   // return <Component></Component>
  // }
  // console.log('compose did', did);
  // console.log('wallet ', address, isConnected);

  // useEffect(() => {
  //   console.log('did effect', ceramic.did)
  //   if(isConnected && ceramic.did?.authenticated) {
  //     // fetch if already signed
  //   }
  // }, [isConnected, ceramic])
  return (
    <>
    {/* <BoxContent> */}
    <ManifestProvider manifestId={streamID}>
      <ViewProvider refNode={containerRef}>
        <ViewContainer name="signBox" className="stats shadow stats-vertical xl:w-64 min-h-[18rem]" ref={containerRef}>
          {children}
        </ViewContainer>
      </ViewProvider>
    </ManifestProvider>
    {/* </BoxContent> */}
      {/* {!started &&
        
      }
      {started &&
        <>
          {Current()}
        </>
      }
      <WalletSign manifest={data} /> */}
    </>
  )
}
