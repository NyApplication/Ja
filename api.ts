const { API } = require("easy-api.ts"); // Use: import { API } from 'easy-api.ts'; for TypeScript.

const api = new API({
    dots: false,
    reverse: false
});

api.route({
    url: '/color',
    method: "GET",
    code: `
    $ignore[Check docs to see how does functions work ;)]
    $if[$or[$query[hex]==null;$isValidHex[$query[hex]]==false];
        $reply[
            $setCode[400]
            $setType[json]
            $setBody[{
                "error": "Invalid hex color code provided"
            }]
        ]
        $ignore[IMPORTANT!!]
        $break
    ]

    $createCanvas[
        $setDimentions[512;512]
        $color[$query[hex]]
        $drawRect[0;0;512;512]
    ]
    $reply[
        $setCode[200]
        $setType[canvas]
        $setBody[%default%]
    ]
    `
})

// Lets load the handler...
api.load('./routes')
console.log('Source loaded.')

api.connect({ port: process.env["PORT"] || 3000 }) // We're connecting to the API when the source is loaded.
