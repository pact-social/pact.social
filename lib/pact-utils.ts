import { Pact } from "../src/gql";

export const formatMessage = (pact: Pact) => {
  const time = new Date();
  const message = `I am signing in support of the following ${pact?.type}:\n\ntitle: ${pact?.title}\n\n${pact?.type} content:\n${pact?.content.replace(/<[^>]+>/g, '')}\ncreated by:\n ${pact?.author?.id}\nsigned at:\n ${time.valueOf()}\n`;
  return {
    message,
    time
  }
}
