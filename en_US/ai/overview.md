# Iztro AI {#iztro-ai}

Alongside the open-source **iztro** charting library, we offer four publicly available hosted AI models for Zi Wei Dou Shu（紫微斗數） and Qi Men Dun Jia（奇門遁甲）:

- `iztro-ziwei-v3`: natal-chart, relationship-compatibility and medium- to long-term horoscope analysis.
- `iztro-qimen-v3`: decision-making for a specific current matter, how it may develop, and when an outcome may occur.
- `iztro-ziwei-v3-fast`: faster Zi Wei Dou Shu（紫微斗數） responses, fewer tokens and lower API request costs; the response structure and user-visible information match `iztro-ziwei-v3`.
- `iztro-qimen-v3-fast`: faster Qi Men Dun Jia（奇門） responses, fewer tokens and lower API request costs; the response structure and user-visible information match `iztro-qimen-v3`.

There are two integration methods, and both let you choose any of the models above. Choose the method that suits what you want to build.

## iztro-chat-api - call our API   {#iztro-chat-api-——-调用我们的-api}

Send a message and receive an answer directly. We host the agent, chart calculations, and conversation memory, so you do not need to write any astrology or AI code.

-   **Suitable for**: users who simply want answers about Zi Wei Dou Shu（紫微斗數） or Qi Men Dun Jia（奇門遁甲） in their own applications.
- API address: `https://chat-api.iztro.com`
- 👉 [View the API documentation](https://platform.iztro.com/docs)

## iztro-agents-sdk - Build your own agents (Python/TypeScript)   {#iztro-agents-sdk-——-构建你自己的智能体-python-typescript}

Build your own agent using any publicly available Iztro-hosted model, and add your own tools, MCP servers, and human confirmation steps. This SDK is a lightweight wrapper around the OpenAI Agents SDK.

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

-   **Suitable for**: users who want to extend an agent with their own logic.
- 👉 [Python SDK](https://github.com/SylarLong/openai-iztro-agents-python) · [TypeScript / JavaScript SDK](https://github.com/SylarLong/openai-iztro-agents-js) · [PyPI](https://pypi.org/project/openai-iztro-agents/)

---

> This is separate from the open-source `iztro` library covered in the other chapters of this site: **the library calculates charts**, while **Iztro AI interprets them and provides assessments**.
