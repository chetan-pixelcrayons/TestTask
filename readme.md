# Steps To Run this Project
1. Clone the Project
2. Run npm i inside the project root directory
3. Start MongoDB service
4. run Command node index.js

# Description of APIs
1. /allocateRequest - This API will save the request Information to Database
2. /allocateAndReport - This API will give the Information of Allocated Butlers

# Input
[
    {
        "clientId": 1,
        "requestId": "abc",
        "hours": 6
    },
    {
        "clientId": 2,
        "requestId": "ghi",
        "hours": 1
    }


]

# Output
{
    "butlers": [
        {
            "requests": [
                "abc",
                "xyz"
            ]
        }
    ],
    "spreadClientIds": [
        1,
        2
    ]
}