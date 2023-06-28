import { ReactNode } from "react";
import { MetaProps, Metas } from "./metas";

export default function Layout({
  children,
  metas,
  noContainer,
  className = '',
}: {
  children: ReactNode;
  metas?: MetaProps;
  noContainer?: Boolean;
  className?: string;
}) {
  return (
    <>
      <Metas {...metas} />
      {noContainer &&
        <>{children}</>
      }
      {!noContainer &&
        <>
        {className &&
          <div className={className}>
            <div className={`container min-h-[calc(100vh-5rem)]`}>
              {children}
            </div>
          </div>
        }
        {!className &&
          <div className={`container min-h-[calc(100vh-5rem)]`}>
            {children}
          </div>
        }
        </>
      }
    </>
  )
}
