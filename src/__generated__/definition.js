// This is an auto-generated file, do not edit manually
export const definition = {"models":{"PrivateStore":{"id":"kjzl6hvfrbw6c5919lt9mexg9nlnle5g5fvunson7n44cpbga36ug88w2om1p4w","accountRelation":{"type":"list"}},"PactProfile":{"id":"kjzl6hvfrbw6c6qcko9v7czcrmbkdfbnq6d1tk10vco95rxhj3mqw4i6dn196mn","accountRelation":{"type":"single"}},"PactRecipient":{"id":"kjzl6hvfrbw6c7wr3dcrul8p2qzuosybn91pqz4xanwvn7o0ry1cp1jrh08o53w","accountRelation":{"type":"list"}},"Topic":{"id":"kjzl6hvfrbw6c64flvg8scssg663ortm0eu92kr0fmpa7li6ajgx7t3ytga3o3y","accountRelation":{"type":"list"}},"Pact":{"id":"kjzl6hvfrbw6c67x7h663cfeduljp8fihe2r0eizhjllrdppe894ft14x7nyeu6","accountRelation":{"type":"list"}},"PactSignature":{"id":"kjzl6hvfrbw6c77jdfs9f4vs1a6n7e7t6v7errf4n6y88o7pisw01mwd7m1xof6","accountRelation":{"type":"list"}}},"objects":{"PrivateStore":{"jwe":{"type":"string","required":true}},"PactProfileEncryptedLitContent":{"encryptedString":{"type":"string","required":true},"encryptedSymmetricKey":{"type":"string","required":true},"accessControlConditions":{"type":"string","required":true}},"PactProfile":{"bio":{"type":"string","required":false},"city":{"type":"string","required":false},"email":{"type":"reference","refType":"object","refName":"PactProfileEncryptedLitContent","required":false},"locale":{"type":"locale","required":false},"country":{"type":"countrycode","required":false},"fullname":{"type":"string","required":false},"latitude":{"type":"float","required":false},"username":{"type":"string","required":true},"longitude":{"type":"float","required":false},"isMagicLink":{"type":"boolean","required":true},"organisation":{"type":"string","required":false},"profilePicture":{"type":"cid","required":false}},"PactRecipient":{"name":{"type":"string","required":true},"profile":{"type":"streamid","required":false},"isVerified":{"type":"boolean","required":true}},"Topic":{"name":{"type":"string","required":true},"author":{"type":"view","viewType":"documentAccount"},"pacts":{"type":"view","viewType":"relation","relation":{"source":"queryConnection","model":"kjzl6hvfrbw6c67x7h663cfeduljp8fihe2r0eizhjllrdppe894ft14x7nyeu6","property":"topicID"}},"pactsCount":{"type":"view","viewType":"relation","relation":{"source":"queryCount","model":"kjzl6hvfrbw6c67x7h663cfeduljp8fihe2r0eizhjllrdppe894ft14x7nyeu6","property":"topicID"}}},"Pact":{"type":{"type":"reference","refType":"enum","refName":"PactType","required":false},"title":{"type":"string","required":true},"content":{"type":"string","required":true},"picture":{"type":"cid","required":false},"topicID":{"type":"streamid","required":true},"recipientList":{"type":"list","required":false,"item":{"type":"streamid","required":false}},"topic":{"type":"view","viewType":"relation","relation":{"source":"document","model":"kjzl6hvfrbw6c64flvg8scssg663ortm0eu92kr0fmpa7li6ajgx7t3ytga3o3y","property":"topicID"}},"author":{"type":"view","viewType":"documentAccount"},"version":{"type":"view","viewType":"documentVersion"},"signatures":{"type":"view","viewType":"relation","relation":{"source":"queryConnection","model":"kjzl6hvfrbw6c77jdfs9f4vs1a6n7e7t6v7errf4n6y88o7pisw01mwd7m1xof6","property":"pactID"}},"signaturesCount":{"type":"view","viewType":"relation","relation":{"source":"queryCount","model":"kjzl6hvfrbw6c77jdfs9f4vs1a6n7e7t6v7errf4n6y88o7pisw01mwd7m1xof6","property":"pactID"}}},"PactSignature":{"jwe":{"type":"cid","required":true},"pactID":{"type":"streamid","required":true},"metadata":{"type":"string","required":false},"signedAt":{"type":"datetime","required":true},"validator":{"type":"did","required":true},"visibility":{"type":"reference","refType":"enum","refName":"PactSignatureVisibilityType","required":false},"pactVersion":{"type":"commitid","required":true},"pact":{"type":"view","viewType":"relation","relation":{"source":"document","model":"kjzl6hvfrbw6c67x7h663cfeduljp8fihe2r0eizhjllrdppe894ft14x7nyeu6","property":"pactID"}},"author":{"type":"view","viewType":"documentAccount"}}},"enums":{"PactType":["manifesto","openletter","petition"],"PactSignatureVisibilityType":["anon","private","public"]},"accountData":{"privateStoreList":{"type":"connection","name":"PrivateStore"},"pactProfile":{"type":"node","name":"PactProfile"},"pactRecipientList":{"type":"connection","name":"PactRecipient"},"topicList":{"type":"connection","name":"Topic"},"pactList":{"type":"connection","name":"Pact"},"pactSignatureList":{"type":"connection","name":"PactSignature"}}}