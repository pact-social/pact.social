export const subscribeToPact = () => {
  const createSubscription = `
    mutation CreateSubscription($input: CreatePactSubscribeInput!) {
      createPactSubscribe(input: $input) {
        clientMutationId
          document {
            id
          }
      }
    }
  `
  return createSubscription
}
