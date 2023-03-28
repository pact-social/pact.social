// This is an auto-generated file, do not edit manually
export const definition = {"models":{"BasicProfile":{"id":"kjzl6hvfrbw6c890xjb0alh5kzxc5ebaxvhzcvo03w1npo8s8uqa0muigwn15a0","accountRelation":{"type":"single"}},"Topic":{"id":"kjzl6hvfrbw6c64flvg8scssg663ortm0eu92kr0fmpa7li6ajgx7t3ytga3o3y","accountRelation":{"type":"list"}},"Manifest":{"id":"kjzl6hvfrbw6c80demq3vjvve97x23uh33xxr5n9kabeqxj462xzh1r34n6zm4p","accountRelation":{"type":"list"}},"ManifestSignature":{"id":"kjzl6hvfrbw6c83gtdh8z7fs8uxlncpxupbt18xfv4gbc41mj9by4827v4gxv4u","accountRelation":{"type":"list"}}},"objects":{"BasicProfile":{"name":{"type":"string","required":true},"emoji":{"type":"string","required":false},"gender":{"type":"string","required":false},"description":{"type":"string","required":false}},"Topic":{"name":{"type":"string","required":true},"author":{"type":"view","viewType":"documentAccount"},"manifests":{"type":"view","viewType":"relation","relation":{"source":"queryConnection","model":"kjzl6hvfrbw6c80demq3vjvve97x23uh33xxr5n9kabeqxj462xzh1r34n6zm4p","property":"topicID"}}},"Manifest":{"scope":{"type":"reference","refType":"enum","refName":"ManifestRegionScope","required":false},"title":{"type":"string","required":true},"content":{"type":"string","required":true},"picture":{"type":"cid","required":false},"topicID":{"type":"streamid","required":true},"topic":{"type":"view","viewType":"relation","relation":{"source":"document","model":"kjzl6hvfrbw6c64flvg8scssg663ortm0eu92kr0fmpa7li6ajgx7t3ytga3o3y","property":"topicID"}},"author":{"type":"view","viewType":"documentAccount"}},"ManifestSignature":{"jwe":{"type":"string","required":true},"createdAt":{"type":"datetime","required":true},"validator":{"type":"did","required":true},"manifestID":{"type":"streamid","required":true},"author":{"type":"view","viewType":"documentAccount"},"manifest":{"type":"view","viewType":"relation","relation":{"source":"document","model":"kjzl6hvfrbw6c80demq3vjvve97x23uh33xxr5n9kabeqxj462xzh1r34n6zm4p","property":"manifestID"}}}},"enums":{"ManifestRegionScope":["local","national","global"]},"accountData":{"basicProfile":{"type":"node","name":"BasicProfile"},"topicList":{"type":"connection","name":"Topic"},"manifestList":{"type":"connection","name":"Manifest"},"manifestSignatureList":{"type":"connection","name":"ManifestSignature"}}}