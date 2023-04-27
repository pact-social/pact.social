
declare module '@orbisclub/components' {
  type DiscussionProps = {
    context: string;
  }
  export class Discussion extends React.Component<DiscussionProps> {

  }
}

type OrbisUpdateResponse = {
  status: number;
  doc: string;
  result: string;
}

type OrbisConnectResponse = {
  status: number;
  did: string;
  details: {
    profile: Profile
  };
}

declare module '@orbisclub/orbis-sdk' {
  export class Orbis {
    updateProfile: (profile: Profile) => Promise<OrbisUpdateResponse>
    connect: (provider?: any, withLit?: boolean = false) => Promise<Profile>
    isConnected: (did: any) => Promise<OrbisUpdateResponse>
    connect_v2: (provider: any) => Promise<OrbisConnectResponse>
  }
}
