// This is an auto-generated file, do not edit manually
export const definition = {"models":{"BasicProfile":{"id":"kjzl6hvfrbw6c890xjb0alh5kzxc5ebaxvhzcvo03w1npo8s8uqa0muigwn15a0","accountRelation":{"type":"single"}},"Topic":{"id":"kjzl6hvfrbw6c6h0icw2cq55qt167d13dsd4a9rj3rwcxff2ybyf36oaxejca4h","accountRelation":{"type":"single"}},"Manifest":{"id":"kjzl6hvfrbw6c6cfigtz8uti5a26uzngdd94cuz4b03oa4vonva1eiq4y7ex6bq","accountRelation":{"type":"list"}}},"objects":{"BasicProfile":{"name":{"type":"string","required":true},"emoji":{"type":"string","required":false},"gender":{"type":"string","required":false},"description":{"type":"string","required":false}},"Topic":{"name":{"type":"string","required":true}},"Manifest":{"scope":{"type":"reference","refType":"enum","refName":"ManifestRegionScope","required":false},"title":{"type":"string","required":true},"content":{"type":"string","required":true},"picture":{"type":"cid","required":false},"author":{"type":"view","viewType":"documentAccount"}}},"enums":{"ManifestRegionScope":["local","national","global"]},"accountData":{"basicProfile":{"type":"node","name":"BasicProfile"},"topic":{"type":"node","name":"Topic"},"manifestList":{"type":"connection","name":"Manifest"}}}