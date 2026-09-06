# Iztro AI

除了開源的 **iztro** 排盤庫，我們還提供四個公開的託管紫微與奇門 AI 模型：

- `iztro-ziwei-v3`：本命、合盤與中長期運勢分析。
- `iztro-qimen-v3`：一件當下具體事情的決斷、發展與應期。
- `iztro-ziwei-v3-fast`：低延遲紫微模型，只開放快速紫微工具 `get_ziwei`。
- `iztro-qimen-v3-fast`：低延遲奇門模型，只開放 `qigua`、`yingqi`。

有兩種接入方式，兩者都可以選擇上述公開模型。依你要做的事情選擇即可。

## iztro-chat-api —— 呼叫我們的 API

傳送一則訊息，直接取得回答。智能體、排盤計算、對話記憶都由我們託管——你無需撰寫任何占星或 AI 程式碼。

- **適合**：只想在自己的應用裡得到紫微或奇門回答。
- 介面位址：`https://chat-api.iztro.com`
- 👉 [查看 API 文件](https://platform.iztro.com/docs)

## iztro-agents-sdk —— 建立你自己的智能體（Python / TypeScript）

在任一公開 Iztro 託管模型上建立自己的智能體，並加入自己的工具、MCP 伺服器與人工確認。它是對 OpenAI Agents SDK 的輕量封裝。

```bash
pip install openai-iztro-agents
```

```python
import os

from agents import Runner
from iztro_agents import iztro_ziwei_fast_agent

agent = iztro_ziwei_fast_agent(api_key=os.environ["ZIWEI_API_KEY"])
result = await Runner.run(agent, "看看我 2028 年的事業變化。")
print(result.final_output)
```

- **適合**：想用自己的邏輯擴充智能體。
- 👉 [Python SDK](https://github.com/SylarLong/openai-iztro-agents-python) · [TypeScript / JavaScript SDK](https://github.com/SylarLong/openai-iztro-agents-js) · [PyPI](https://pypi.org/project/openai-iztro-agents/)

---

> 這與本站其他章節介紹的開源 `iztro` 庫是兩回事：**庫負責排盤計算**，而 **Iztro AI 負責解讀與判斷**。
