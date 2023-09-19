import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { DID } from "dids";
import useProfile from "../hooks/useProfile";
import usePrivateStore, { PrivateType } from "../hooks/usePrivateStore";
import { Mutation, Pact, PactProfile, PactSignature, PactSignatureVisibilityType } from "../src/gql";
import useMySignatures from "../hooks/useMySignatures";
import type { ExecutionResult } from "graphql";

export const ProfileContext = createContext<{
  profile?: PactProfile, 
  privateStore?: PrivateType[], 
  signatures?: Map<string, PactSignature>, 
  drafts?: Pact[],
  add?: (input: any, __typename: string, id: string) => Promise<ExecutionResult<Mutation>>
  update?: (input: any, __typename: string, id: string) => Promise<ExecutionResult>
  hasSigned?: (pactID: string) => PactSignatureVisibilityType | undefined,
  isLoading: boolean
}>({isLoading: false});

export const ProfileProvider = ({ 
  did,
  children
}: {
  did: DID; 
  children: ReactNode
}) => {
  const {
    profile,
  } = useProfile(did.parent)

  const { privateStore, pactSignatures, add, update, isLoading: isLoadingPrivate, drafts } = usePrivateStore()
  const { data: publicSignatures, isLoading: isLoadingPublic } = useMySignatures()
  const [ signatures, setSignatures ] = useState<Map<string,PactSignature>>(new Map())
  const [ isLoading, setIsLoading ] = useState<boolean>(false)

  useEffect(() => {
    if (publicSignatures) {
      const sigs = publicSignatures.reduce<PactSignature[]>((acc, current) => {
        if (current?.node) {
          acc.push(current.node)
        }
        return acc
      }, [])
      for (const sig of sigs) {
        signatures.set(sig.pactID, sig)
      }
    }
    if (pactSignatures) {
      for (const sig of pactSignatures) {
        signatures.set(sig.pactID, sig)
      }
    }
    setSignatures(new Map(signatures.entries()))
  }, [pactSignatures, publicSignatures, setSignatures, signatures])

  useEffect(() => setIsLoading(isLoadingPrivate || isLoadingPublic), [isLoadingPrivate, isLoadingPublic])

  function hasSigned(pactID: string) {
    const sig = signatures.get(pactID)
    return sig?.visibility || undefined
  }

  return (
    <ProfileContext.Provider value={{ profile, privateStore, signatures, drafts, add, hasSigned, isLoading, update }}>
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfileContext = () => useContext(ProfileContext);
