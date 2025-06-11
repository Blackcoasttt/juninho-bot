# 🤖 Juninho Bot - WhatsApp Helper

Juninho é um bot para **WhatsApp** desenvolvido com a biblioteca [`whatsapp-web.js`](https://github.com/pedroslopez/whatsapp-web.js).  
Ele responde a comandos de pesquisa de programação no **Google** e **Stack Overflow**, além de permitir menções em grupos.

---

## 📦 Funcionalidades

- 🔍 Pesquisas no Google com `!google`
- 🧠 Dúvidas técnicas com `!stackoverflow`
- 🤖 Resposta automática ao comando `/juninho`
- 👥 Suporte a grupos e mensagens privadas

---

## ⚙️ Requisitos

- [Node.js](https://nodejs.org/) (versão 18+ recomendada)
- Conta no WhatsApp
- Token das APIs:
  - Google Custom Search
  - Stack Exchange

---

## 📁 Instalação

1. **Clone o repositório:**

```bash
git clone https://github.com/Blackcoasttt/juninho-bot.git
cd juninho-bot
```

2. **Instale as dependências:**

```bash
npm install
```

3. **Crie o arquivo `.env`:**

```env
API_GOOGLE_KEY=SuaChaveDaGoogleAPI
SEARCH_ENGINE_ID=SeuIDdoGoogleSearch
STACK_EXCHANGE_KEY=SuaChaveDoStackExchange
```

---

## 🚀 Executando o bot

```bash
node juninho.js
```

Escaneie o QR Code com seu WhatsApp quando solicitado.

---

## 💬 Comandos disponíveis

| Comando | Descrição |
|--------|-----------|
| `/juninho` | Saudação padrão do bot |
| `!google <termo>` | Pesquisa no Google |
| `!stackoverflow <termo>` | Busca perguntas no Stack Overflow |

---

## 💡 Observações

- Em **grupos**, o bot precisa estar **mencionado** ou receber comandos diretamente.
- Sessão é armazenada localmente com `LocalAuth` (sem necessidade de login repetido).

---

## 📄 Licença

Este projeto está sob a licença MIT. Sinta-se livre para usar, modificar e contribuir.

---

## 👨‍💻 Autor

Desenvolvido por Alysson ([@Blackcoasttt](https://github.com/Blackcoasttt)) 🚀
