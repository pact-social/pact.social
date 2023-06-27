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
        <div className={`container ${className} min-h-[calc(100dvh-11.5rem)]`}>
          {children}
        </div>
      }
    </>
  )
}
