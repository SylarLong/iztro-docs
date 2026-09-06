# Iztro AI

Beyond the open-source **iztro** chart library, we offer four public hosted Ziwei and Qimen AI models:

- `iztro-ziwei-v3`: natal, compatibility, and longer-term fortune-cycle analysis.
- `iztro-qimen-v3`: decisions, development, and timing for one concrete current matter.
- `iztro-ziwei-v3-fast`: a lower-latency Ziwei model that exposes only the fast `get_ziwei` tool.
- `iztro-qimen-v3-fast`: a lower-latency Qimen model that exposes only `qigua` and `yingqi`.

There are two integration paths, and both let you select any public model above. Pick the one that matches what you are building.

## iztro-chat-api — call our API

Send a message and get an answer. We host the agent, run the chart calculations, and keep conversation memory, so you write no astrology or AI code.

- **Use it if** you want Ziwei or Qimen answers inside your app.
- Base URL: `https://chat-api.iztro.com`
- 👉 [Read the API documentation](https://platform.iztro.com/docs)

## iztro-agents-sdk — build your own agent (Python / TypeScript)

Build an agent on any public hosted Iztro model and add your own tools, MCP servers, and human-in-the-loop. It is a thin layer on the OpenAI Agents SDK.

```bash
pip install openai-iztro-agents
```

```python
import os

from agents import Runner
from iztro_agents import iztro_ziwei_fast_agent

agent = iztro_ziwei_fast_agent(api_key=os.environ["ZIWEI_API_KEY"])
result = await Runner.run(agent, "Read my 2028 career changes.")
print(result.final_output)
```

- **Use it if** you want to extend the agent with your own logic.
- 👉 [Python SDK](https://github.com/SylarLong/openai-iztro-agents-python) · [TypeScript / JavaScript SDK](https://github.com/SylarLong/openai-iztro-agents-js) · [PyPI](https://pypi.org/project/openai-iztro-agents/)

---

> This is separate from the open-source `iztro` library documented elsewhere on this site: the **library calculates** charts, while **Iztro AI interprets and advises**.
