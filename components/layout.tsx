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
        <div className={`container ${className}`}>
          <div className=" min-h-[100dvh]">
            {children}
          </div>
        </div>
      }
    </>
  )
}
