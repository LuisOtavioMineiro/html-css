import discord
from discord.ext import commands, tasks
import feedparser

intents = discord.Intents.default()
bot = commands.Bot(command_prefix="!", intents=intents)

# Fontes RSS com novidades sobre web dev
FEEDS = [
    "https://www.smashingmagazine.com/feed/",
    "https://css-tricks.com/feed/",
    "https://dev.to/feed/tag/webdev",
    "https://developer.mozilla.org/blog/feed/",
    "https://hnrss.org/frontpage",
]

@bot.event
async def on_ready():
    print(f"Bot online: {bot.user}")
    enviar_novidades.start()  # inicia a tarefa automática

def pegar_novidades():
    novidades = []
    for url in FEEDS:
        feed = feedparser.parse(url)
        for item in feed.entries[:2]:  # Pega as 2 primeiras de cada
            novidades.append(f"📰 [{item.title}]({item.link})")
    return novidades

@bot.command()
async def novidades(ctx):
    novidades = pegar_novidades()
    msg = "\n".join(novidades)
    await ctx.send(f"**Novidades de Desenvolvimento Web:**\n{msg}")

# Enviar novidades automaticamente todo dia às 10h
@tasks.loop(hours=24)
async def enviar_novidades():
    canal_id = SEU_CANAL_ID_AQUI  # substitua pelo ID do canal desejado
    canal = bot.get_channel(canal_id)
    if canal:
        novidades = pegar_novidades()
        msg = "\n".join(novidades)
        await canal.send(f"🆕 **Novidades Diárias sobre Web Dev:**\n{msg}")

bot.run("SEU_TOKEN_AQUI")
