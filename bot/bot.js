const mineflayer = require('mineflayer')

function createBot() {
  const bot = mineflayer.createBot({
    host: "billionairemc.freezehost.com", // change if needed
    port: 25565,
    username: "KeepAliveBot",            // bot username
    version: "1.21.4",
  })

  // Auto login / register for LoginSecurity / AuthMe
  bot.on('messagestr', (msg) => {
    msg = msg.toLowerCase()

    if (msg.includes("register")) {
      bot.chat("/register yourpassword yourpassword")
    }
    if (msg.includes("login")) {
      bot.chat("/login yourpassword")
    }
  })

  // Keep server awake by moving
  bot.on('spawn', () => {
    console.log("Bot spawned!")

    setInterval(() => {
      bot.setControlState("forward", true)
      setTimeout(() => bot.setControlState("forward", false), 300)
    }, 20000)

    setInterval(() => {
      bot.setControlState("jump", true)
      setTimeout(() => bot.setControlState("jump", false), 200)
    }, 25000)
  })

  // Auto reconnect
  bot.on('end', () => {
    console.log("Bot disconnected. Reconnecting in 5s...")
    setTimeout(createBot, 5000)
  })

  bot.on('error', (err) => {
    console.log("Bot Error:", err)
  })
}

createBot()
