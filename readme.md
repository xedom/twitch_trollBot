#### config.json
```json
{
    "channels": ["channel1","channel2","..."],
    "bots": [
        {
            "username" : "user1",
            "password": "token1"
        },
        {
            "username" : "user2",
            "password": "token2"
        },
        {
            "username" : "...",
            "password": "..."
        }
    ]
}
```

#### msg.json
```json
{
    "cooldown": 60,
    "phrases": [
        {
          "question": "hello",
          "answer": "",
          "delay": 0
        },
        {
          "question": "what do you play?",
          "answer": "i like pacman",
          "delay": 15
        },
        {
          "question": "...",
          "answer": "...",
          "delay": 0
        }
    ]
}
```