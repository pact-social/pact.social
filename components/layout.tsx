import { ReactNode } from "react";
import Footer from "./footer";
import { MetaProps, Metas } from "./metas";

export default function Layout({
  children,
  metas,
  noContainer,
}: {
  children: ReactNode;
  metas?: MetaProps;
  noContainer?: Boolean;
}) {
  return (
    <>
      <Metas {...metas} />
      {noContainer &&
        <>{children}</>
      }
      {!noContainer &&
        <div className="container mx-auto min-h-screen">
          {children}
        </div>
      }
      <Footer />
    </>
  )
}
