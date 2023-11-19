import { useEffect, useMemo, useState } from "react";
import Layout from "../../components/layout";
import { useLitContext } from "../../context/lit";
import { SESSION_DAYS } from '../../lib/constants';
import { LitAbility, LitActionResource } from '@lit-protocol/auth-helpers';
import { AuthMethod, IRelayRequestData } from "@lit-protocol/types";
import { BigNumber, ethers } from "ethers";

type OtpInputProps = {
  value: string;
  valueLength: number;
  onChange: (value: string) => void;
};

type SendResponse = {
  status: string;
  details: string;
}

const RE_DIGIT = new RegExp(/^\d+$/);

function OtpInput({ value, valueLength, onChange }: OtpInputProps) {
  const valueItems = useMemo(() => {
    const valueArray = value.split('');
    const items: Array<string> = [];

    for (let i = 0; i < valueLength; i++) {
      const char = valueArray[i];

      if (RE_DIGIT.test(char)) {
        items.push(char);
      } else {
        items.push('');
      }
    }

    return items;
  }, [value, valueLength]);

  const focusToNextInput = (target: HTMLElement) => {
    const nextElementSibling =
      target.nextElementSibling as HTMLInputElement | null;

    if (nextElementSibling) {
      nextElementSibling.focus();
    }
  };
  const focusToPrevInput = (target: HTMLElement) => {
    const previousElementSibling =
      target.previousElementSibling as HTMLInputElement | null;

    if (previousElementSibling) {
      previousElementSibling.focus();
    }
  };
  const inputOnChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    idx: number
  ) => {
    const target = e.target;
    let targetValue = target.value.trim();
    const isTargetValueDigit = RE_DIGIT.test(targetValue);

    if (!isTargetValueDigit && targetValue !== '') {
      return;
    }

    const nextInputEl = target.nextElementSibling as HTMLInputElement | null;

    // only delete digit if next input element has no value
    if (!isTargetValueDigit && nextInputEl && nextInputEl.value !== '') {
      return;
    }

    targetValue = isTargetValueDigit ? targetValue : ' ';

    const targetValueLength = targetValue.length;

    if (targetValueLength === 1) {
      const newValue =
        value.substring(0, idx) + targetValue + value.substring(idx + 1);

      onChange(newValue);

      if (!isTargetValueDigit) {
        return;
      }

      focusToNextInput(target);
    } else if (targetValueLength === valueLength) {
      onChange(targetValue);

      target.blur();
    }
  };
  const inputOnKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const { key } = e;
    const target = e.target as HTMLInputElement;

    if (key === 'ArrowRight' || key === 'ArrowDown') {
      e.preventDefault();
      return focusToNextInput(target);
    }

    if (key === 'ArrowLeft' || key === 'ArrowUp') {
      e.preventDefault();
      return focusToPrevInput(target);
    }

    const targetValue = target.value;

    // keep the selection range position
    // if the same digit was typed
    target.setSelectionRange(0, targetValue.length);

    if (e.key !== 'Backspace' || targetValue !== '') {
      return;
    }

    focusToPrevInput(target);
  };
  const inputOnFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    const { target } = e;

    // keep focusing back until previous input
    // element has value
    const prevInputEl =
      target.previousElementSibling as HTMLInputElement | null;

    if (prevInputEl && prevInputEl.value === '') {
      return prevInputEl.focus();
    }

    target.setSelectionRange(0, target.value.length);
  };

  return (
    <div className="flex gap-2">
      {valueItems.map((digit, idx) => (
        <input
          key={idx}
          type="text"
          inputMode="numeric"
          autoComplete="one-time-code"
          pattern="\d{1}"
          maxLength={valueLength}
          className="input input-md input-bordered w-9 text-center font-bold px-1"
          value={digit}
          onChange={(e) => inputOnChange(e, idx)}
          onKeyDown={inputOnKeyDown}
          onFocus={inputOnFocus}
        />
      ))}
    </div>
  );
}

export default function Otp () {
  const [email, setEmail] = useState('pact.social0x01+1@gmail.com');
  const [otp, setOtp] = useState('');
  const [challenge, setChallenge] = useState('');

  const [authMethod, setAuthMethod] = useState()

  const { litClient } = useLitContext()
  
  const onChange = (value: string) => setOtp(value);

  const emailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target;
    let targetValue = target.value.trim();
    if (targetValue) {
      setEmail(targetValue)
    }
  }

  const sendEmail = async () => {
    console. log('sending code by email')
    const res = await fetch('http://localhost:3050/send', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({email}),
    })
    const data = await res.json() as SendResponse
    console.log('res', data)
    if (data.status === 'success') {
      setChallenge(data.details)
    }
  }

  const verifOtp = async () => {
    const res = await fetch('http://localhost:3050/verify', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        check: email,
        otp,
        verification_key: challenge,
      }),
    })
    const data = await res.json()
    if (data.token) {
      setAuthMethod(data)
      const publicKey = await authLit(data)
    }
  }

  function delay(milliseconds: number){
    return new Promise(resolve => {
        setTimeout(resolve, milliseconds);
    });
}

  const authLit = async (data: any) => {
    if (!data) {
      return console.log('no authMethod provided')
    }
    const authMethod: AuthMethod = {
      accessToken: data.token as string,
      authMethodType: 2,
      // authMethodPubKey: data?.userId
    }
    try {    
      await litClient.connect()
      const client = litClient.getClient()
      console.log('authMethod', data, data.token)
      const authClient = litClient.getAuthClient()
      // const relayProvider = await litClient.getOtpProvider(email)
      const { pkps: existingPKP } = await litClient.getAuthClient().relay.fetchPKPs(JSON.stringify({
        authMethodId: ethers.utils.keccak256(
          ethers.utils.toUtf8Bytes('QmZVFVp2xmnEtWQEJQs6eWnx8ndFUBjdj1qRDdbarmCuUK')
        ),
        authMethodType: 2,
        authMethodPubKey: data?.userId
      }))
      // const existingPKP = await otpProvider.fetchPKPsThroughRelayer(authMethod)
      console.log('user pkps', existingPKP)
      let pkp

      if (!existingPKP || existingPKP?.length === 0) {
        const tx = await MintOtpPKP()
        console.log('pkp minted', tx)
        // const tx = await otpProvider.mintPKPThroughRelayer(authMethod)
        await delay(1000*20)
        // const newPKP = await otpProvider.fetchPKPsThroughRelayer(authMethod)
        // pkp = newPKP[0].publicKey
        // console.log('new pkp', pkp)
        // return pkp
      } else {
        pkp = existingPKP[0].publicKey
      }
      if (!pkp) return

      const sessionKey = litClient.getClient().getSessionKey();
      console.log('sessionKey', sessionKey)
      
      litClient.getClient().executeJs({
        ipfsId: 'QmZVFVp2xmnEtWQEJQs6eWnx8ndFUBjdj1qRDdbarmCuUK',
        sessionSigs: {},
        // authSig: {},
        authMethods: [
          {
            authMethodType: 2,
            accessToken: authMethod.token,
          },
        ],
        jsParams: {
          token: "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IjM1ZDQ4Njg3MDdkN2M3MGEyNmIxMjdkOSJ9.eyJlbWFpbCI6InBhY3Quc29jaWFsMHgwMUBnbWFpbC5jb20iLCJ2ZXJpZmllZCI6dHJ1ZSwiaWF0IjoxNjk5MjUwODk5LCJleHAiOjE2OTkyNTQ0OTksImF1ZCI6Imh0dHBzOi8vcGFjdC5zb2NpYWwiLCJpc3MiOiJwYWN0LnNvY2lhbCIsInN1YiI6ImM5YTU2YWEyOTg2YzM0MjYzYTg1MzBjYTNlMmY4Njg1OGYyZjdlOTM1MDlhZWNiNGU0MDVlMWVkODE5YzViY2IifQ.Z8eQVVK7v-4cTj0uNVEAc7WniCoW59LQj_otlY6BXRDm7I6QU7x3rCwA1b11xZh9YGOvhXGoC4U87_b783pFaSzv9B0zGE1njmNFOVnKp5I4cWbVudnbyl6uB_NGK_45lxPmT-xwc2uD29PG30mKybuXVY_mN6eLwl2wcwefnJ-YvGSZ76fePWG4GBo8KMtU7v6Ss7Qw9FCvcGHsDxP6IYHTxGKQRWw8Kyozn_GV3t2g6kZwH-bhmadZHGKhQZzs3gkxLuiA4anvIdeHc2Cv_8LNgBqWlfX72btxJOMgrqsMoyDeKTXFrGFJw_ipV5IXs54VnwSz8pjx4X0SuG3i_5-tbQbgGd9CYGFyfkJo7toxv2qxc8d4Rlx5hVlO8q_ElE3pw04xdeqw4xXIc7A7QrcghvMAPx4ANiKZtLlqj8evyQGzKg4VvVUnsQwKEbZtlhzO9SHJp2-E0l_Iir0L-wJiOEfzcW8dOTVwtR2qLlJCLxNm4JzB-WaQBlWZ1Iyd7dnvt4lHt04zw1Ky2w5wv46NbP8rkoBTUgd0I7gQZNe8daQJ3tVQqLr6TDr-q8dpQuZxflKjVAoLI5os4H64p-0SS8LY07zdR6uR2q_X4otu-mNVI8Y-an7to8jaX-MKIfTAezfM_jISVQRUu_yUFvHnnkCXVIqGomnzixBYfz0",
          publicKey: pkp,
          sigName: "otp-action-sig",
          certs: {
            '35d4868707d7c70a26b127d9': `-----BEGIN PUBLIC KEY-----
            MIICIjANBgkqhkiG9w0BAQEFAAOCAg8AMIICCgKCAgEAriscRO/ZVKW8QP4CcKgl
            7xsrGgJFkp0XHaAtaksJlyDEoLf22xIFT9GB4V5uhYhmT6RQ+4nvebUQoBPEBchs
            9p9JTEFMoRxWloQqbU6no2RvSqMFOTzAD/EdcANydS6Xtj+Lv74i+qdqM3zGoPKN
            HBFoKN5VrkhjQ5nd5uWNfhNqjga1EVYGXP9zsbCJ04a32pgmSXsXXsi3oSW2NBQT
            R6Y5wh6ioeAGZJv89+4cdufmMyc0OgJbjrPbMHAg5/v3DvtopFlTTvTo0Ni/ixjt
            bAihCoOyX6dH2UUP+tDpnhsQEUiWGYDZ7CKUtKC/2izodb9BlnGz+le5ZPUPL2to
            X+kVjAwHZQtn0oFO+QRkBYgwVpLa8KOQCbtIy2VxWP0fOsfXH+xoh+PZjMV4uIC5
            wJ0DR4ymbn1uE0IKQbgnTjIMwzCz3DdwIsdNXL1OFdyR6n3N9wS/eO1p11jkxJzA
            V1n4Nfh+Tz1pYd4Os9s1+OQV241kSyqzRtO4wz+7CpM4NIYmfO8dph+HdoyHgLGy
            LPUUoBTZd+ZCOkyOpH27VmxVeUHETmQYIj67hpaBLzWNtMRWNxQcWn3jeQFV7OCl
            nG0csR+7pIo5lKalPM7aE3QCoQh/9IZD3EZJQwLPOt/1ZzHBIkq2adY9aXiUbkkQ
            Sk1DnOQG57Sbw43EtZqp3f8CAwEAAQ==
            -----END PUBLIC KEY-----`
          }
        },
      })
      // const signatures = await litClient.getSessionSigs({
      //   pkpPublicKey: pkp,
      //   authMethod,
      //   sessionSigsParams: {
      //     chain: 'ethereum',
      //     expiration: new Date(Date.now() + 1000 * 60 * 60 * 24 * SESSION_DAYS).toISOString(), // 1 week    
      //     resourceAbilityRequests: [
      //       {
      //         resource: new LitActionResource('*'),
      //         ability: LitAbility.PKPSigning,
      //       },
      //     ]
      //   }
      // });
      
      // console.log('signatures', signatures)
      //  otpProvider.getSessionSigs({
      //   pkpPublicKey: pkp,
      //   authMethod,
      //   sessionSigsParams: {
      //     chain: 'ethereum',
      //     expiration: new Date(Date.now() + 1000 * 60 * 60 * 24 * SESSION_DAYS).toISOString(), // 1 week    
      //     resourceAbilityRequests: [
      //       {
      //         resource: new LitActionResource('*'),
      //         ability: LitAbility.PKPSigning,
      //       },
      //     ]
      //   },
      //   litNodeClient: litClient,
      // });
    } catch (error) {
      console.log('error', error)
    }

  }


  async function MintOtpPKP() {

    const prepareMintBody =(data: IRelayRequestData): string => {
      const pubkey = data.authMethodPubKey || '0x';
      const authMethodId = ethers.utils.keccak256(
        ethers.utils.toUtf8Bytes(data.authMethodId)
      );
      const args = {
        keyType: 2,
        // 2 for action
        permittedAuthMethodTypes: [data.authMethodType],
        // id is the ipfs hash
        permittedAuthMethodIds: [authMethodId],
        permittedAuthMethodPubkeys: [pubkey],
        permittedAuthMethodScopes: [[BigNumber.from('0')]],
        addPkpEthAddressAsPermittedAddress: true,
        sendPkpToItself: true,
      };
      const body = JSON.stringify(args);
      return body;
    }

    const authMethodId = 'QmZVFVp2xmnEtWQEJQs6eWnx8ndFUBjdj1qRDdbarmCuUK'
    const authMethodType = 2
    const data = {
      authMethodType,
      authMethodId,
      authMethodPubKey: authMethod?.userId
    }
    const body = prepareMintBody(data);
    const mintRes = await litClient.getAuthClient().relay.mintPKP(body);
    if (!mintRes || !mintRes.requestId) {
      throw new Error('Missing mint response or request ID from relay server');
    }
    return mintRes.requestId;
  }

  return (
    <Layout>
      <div className="container">
        <h1>React TypeScript OTP Input</h1>
        <div className="join my-4">
          <input
            type="email"
            className="input input-bordered join-item"
            value="pact.social0x01+1@gmail.com"
            onChange={(e) => emailChange(e)}
          />
          <button
            className="btn join-item"
            onClick={sendEmail}
          >
            Send code
          </button>
        </div>
        <OtpInput value={otp} valueLength={6} onChange={onChange} />
        <div
          className="btn"
          onClick={verifOtp}
        >
          login
        </div>
        <footer className="footer">
          <a href="https://dominicarrojado.com/posts/how-to-create-your-own-otp-input-in-react-and-typescript-with-tests-part-1/">
            Learn how to build this OTP input in React and TypeScript
          </a>
        </footer>
      </div>
    </Layout>
  )
}
