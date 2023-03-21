import discord
import os
from dotenv import load_dotenv


class MyClient(discord.Client):
	async def on_ready(self):
		print(f"Logged in as {self.user.name, self.user.id} -----")

	async def on_message(self, message):
		if message.author.id == self.user.id:
			return

		if message.content.startswith('hello'):
			await message.channel.send("Hello {0.author.mention} you asshole".format(message))


if __name__ == '__main__':
	load_dotenv()
	client = MyClient(intents=discord.Intents.all())
	client.run(os.getenv('token'))
