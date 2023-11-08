import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { DID } from "dids";
import useProfile from "../hooks/useProfile";
import usePrivateStore, { PrivateType } from "../hooks/usePrivateStore";
import { Mutation, Pact, PactProfile, PactProfileEncryptedLitContent, PactSignature, PactSignatureVisibilityType, PrivateStore } from "../src/gql";
import useMySignatures from "../hooks/useMySignatures";
import type { ExecutionResult } from "graphql";
import { KeyedMutator } from "swr";
import { litClient } from "./lit";
import { generateAccessControlConditionsForRecipients } from "../lib/litUtils";

export const ProfileContext = createContext<{
  profile?: PactProfile, 
  privateStore?: PrivateType[], 
  signatures?: Map<string, PactSignature>, 
  drafts?: Pact[],
  add?: (input: any, __typename: string, id: string, recipients?: string[]) => Promise<ExecutionResult<Mutation>>
  update?: (input: any, __typename: string, id: string, archived?: boolean) => Promise<ExecutionResult>
  hasSigned?: (pactID: string) => PactSignatureVisibilityType | undefined,
  refreshSignatures: (isPublic: boolean) => void,
  refreshProfile: () => void,
  isLoading: boolean
  encryptContent: (__typename: string, id: string, content: any, recipients: [string]) => Promise<{
    accessControlConditions: string;
    encryptedSymmetricKey: string;
    encryptedString: unknown;
    solRpcConditions?: undefined;
  } | {
    solRpcConditions: string;
    encryptedSymmetricKey: string;
    encryptedString: unknown;
    accessControlConditions?: undefined;
  } | undefined>,
  decryptContent: (data: PactProfileEncryptedLitContent | undefined) => Promise<any | undefined>

}>({
  isLoading: false,
  refreshSignatures: () => {},
  refreshProfile: () => {},
  encryptContent: async () => undefined,
  decryptContent: async () => undefined,
});

export const ProfileProvider = ({ 
  did,
  children
}: {
  did: DID; 
  children: ReactNode
}) => {
  const {
    profile,
    mutate: mutateProfile,
  } = useProfile(did.parent)

  const { 
    privateStore, 
    pactSignatures, 
    isLoading: isLoadingPrivate, 
    drafts, 
    add, 
    update, 
    mutate: mutatePrivateStore,
    encryptContent,
    decryptContent,
  } = usePrivateStore()
  const { data: publicSignatures, isLoading: isLoadingPublic, mutate: mutatePublicSignatures } = useMySignatures()
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
  }, [pactSignatures, publicSignatures, setSignatures, privateStore])

  useEffect(() => setIsLoading(isLoadingPrivate || isLoadingPublic), [isLoadingPrivate, isLoadingPublic])
  
  useEffect(() => {
    if (did.parent && signatures.size > 0) {
      signatures.clear()
      refreshSignatures()
      refreshSignatures(false)
      refreshProfile()
    }
  }, [did.parent])

  function hasSigned(pactID: string) {
    const sig = signatures.get(pactID)
    return sig?.visibility || undefined
  }


  function refreshSignatures(isPublic: boolean = true) {
    if (isPublic) {
      mutatePublicSignatures()
    } else {
      mutatePrivateStore()
    }
  }

  function refreshProfile() {
    mutateProfile()
  }

  

  return (
    <ProfileContext.Provider value={{ 
      profile, 
      privateStore, 
      signatures, 
      drafts, 
      isLoading, 
      add, 
      update, 
      hasSigned, 
      refreshSignatures, 
      refreshProfile,
      encryptContent,
      decryptContent,
    }}>
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfileContext = () => useContext(ProfileContext);
