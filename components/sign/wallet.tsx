import { useAccount } from "wagmi";
import { Manifest } from "../../types";
import { useViewContext } from "../signBox";
import AnonSign from "./anonSign";
import PrivateSign from "./privateSign";
import PublicSign from "./publicSign";


const DescriptionButton = ({
  title,
  description,
  onClick,
}: {
  title: string;
  description: string;
  onClick: () => void;
}) => {
  return (
    <div 
      className="btn btn-outline px-4 py-3 h-auto justify-start text-left shadow"
      onClick={onClick}
      >
        <div className="">
          <p className="text-sm">{title}</p>
          <p className="text-sm text-neutral-400 capitalize font-normal">{description}</p>
        </div>
    </div>
  );
}

export default function WalletSign() {
  const { address, status } = useAccount()
  const { setView, previousView } = useViewContext()
  console.log('wallet sign address', address)
  const anonSign = () => {
    // 
    setView(<AnonSign />)
  }
  
  const privateSign = () => {
    // 
    setView(<PrivateSign />)
  }
  
  const publicSign = () => {
    // 
    setView(<PublicSign />)
  }

  return (
    <div className="flex flex-col justify-around my-6 mx-4">
      {/* Ensure if wallet connected */}
      {/* Ensure DID session connected */}
      {/* Sign with wallet */}
      <p className=" text-lg font-semibold text-neutral-700">Select a privacy level</p>
      <div className="divider"></div>
      <div className="flex flex-col gap-4 ">
        <DescriptionButton 
          onClick={publicSign}
          title="Public"
          description="Description public"
        />
        <DescriptionButton 
          onClick={privateSign}
          title="Private"
          description="Description private"
        />
        <DescriptionButton 
          onClick={anonSign}
          title="Anon"
          description="Description anon"
        />
      </div>
      <div className="divider"></div>
      <div className=" self-start">
        <div
          className="btn"
          onClick={previousView}
        >
          Back
        </div>
      </div>
    </div>
  )
}
