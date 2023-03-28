import { ReactNode } from "react";
import Footer from "./footer";
import { MetaProps, Metas } from "./metas";
import NavBar from "./navbar";

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
      <NavBar />
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
