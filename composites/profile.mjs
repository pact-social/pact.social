export const profile = function () {
  return `
    type EncryptedLitContent {
      encryptedString: String! @string(minLength: 60, maxLength: 120)
      encryptedSymmetricKey: String! @string(minLength: 100, maxLength: 600)
      accessControlConditions: String! @string(minLength: 100, maxLength: 10000)
    }

    type PactProfile @createModel(accountRelation: SINGLE, description: "pact.social Profile") {
      username: String! @string(minLength: 3, maxLength: 100)
      name: String @string(minLength: 2, maxLength: 100)
      bio: String @string(minLength: 3, maxLength: 100)
      profilePicture: CID
      organisation: String @string(minLength: 3, maxLength: 100)
      title: String @string(minLength: 3, maxLength: 100)
      locale: Locale
      country: CountryCode
      city: String @string(minLength: 3, maxLength: 100)
      latitude: Latitude
      longitude: Longitude

      email: EncryptedLitContent
    }
  `
}
