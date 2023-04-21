import { ReactNode } from "react";
import Footer from "./footer";
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
        <div className={`container mx-auto ${className}`}>
          <div className=" min-h-[100dvh]">
            {children}
          </div>
        </div>
      }
    </>
  )
}
