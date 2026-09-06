# Iztro AI

除了开源的 **iztro** 排盘库，我们还提供四个公开的托管紫微与奇门 AI 模型：

- `iztro-ziwei-v3`：本命、合盘与中长期运势分析。
- `iztro-qimen-v3`：一件当下具体事情的决断、发展与应期。
- `iztro-ziwei-v3-fast`：紫微请求响应更快、消耗更少 Token、调用成本更低；响应结构和用户可见信息与 `iztro-ziwei-v3` 一致。
- `iztro-qimen-v3-fast`：奇门请求响应更快、消耗更少 Token、调用成本更低；响应结构和用户可见信息与 `iztro-qimen-v3` 一致。

有两种接入方式，两者都可以选择上述模型。按你要做的事情选择即可。

## iztro-chat-api —— 调用我们的 API

发送一条消息，直接拿到回答。智能体、排盘计算、对话记忆都由我们托管——你无需编写任何占星或 AI 代码。

- **适合**：只想在自己的应用里得到紫微或奇门回答。
- 接口地址：`https://chat-api.iztro.com`
- 👉 [查看 API 文档](https://platform.iztro.com/docs)

## iztro-agents-sdk —— 构建你自己的智能体（Python / TypeScript）

在任一公开 Iztro 托管模型上构建自己的智能体，并加入自己的工具、MCP 服务器和人工确认。它是对 OpenAI Agents SDK 的轻量封装。

```bash
pip install openai-iztro-agents
```

```python
import os

from agents import Runner
from iztro_agents import iztro_ziwei_fast_agent

agent = iztro_ziwei_fast_agent(api_key=os.environ["ZIWEI_API_KEY"])
result = await Runner.run(agent, "看看我 2028 年的事业变化。")
print(result.final_output)
```

- **适合**：想用自己的逻辑扩展智能体。
- 👉 [Python SDK](https://github.com/SylarLong/openai-iztro-agents-python) · [TypeScript / JavaScript SDK](https://github.com/SylarLong/openai-iztro-agents-js) · [PyPI](https://pypi.org/project/openai-iztro-agents/)

---

> 这与本站其他章节介绍的开源 `iztro` 库是两回事：**库负责排盘计算**，而 **Iztro AI 负责解读与判断**。
