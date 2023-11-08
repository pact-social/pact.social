export const profile = function () {
  return `
    type EncryptedLitContent {
      encryptedString: String! @string(maxLength: 10000)
      encryptedSymmetricKey: String! @string(maxLength: 600)
      accessControlConditions: String! @string(minLength: 100, maxLength: 3000)
    }

    type PactProfile @createModel(accountRelation: SINGLE, description: "pact.social Profile") {
      name: String @string(maxLength: 100)
      bio: String @string(maxLength: 200)
      profilePicture: CID
      profileBanner: CID
      organisation: String @string(maxLength: 100)
      title: String @string(maxLength: 100)
      locale: Locale
      country: CountryCode
      city: String @string(maxLength: 100)
      latitude: Latitude
      longitude: Longitude

      email: EncryptedLitContent
    }
  `
}
