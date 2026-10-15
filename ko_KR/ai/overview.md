# Iztro AI {#iztro-ai}

오픈 소스 **iztro** 명반 작성 라이브러리 외에도, 자미두수（紫微斗數）와 기문둔갑（奇門遁甲）을 위한 공개된 호스팅 AI 모델 네 가지를 제공합니다:

- `iztro-ziwei-v3`: 본명반, 관계 궁합, 중장기 운한 분석.
- `iztro-qimen-v3`: 현재의 구체적인 사안에 대한 판단, 진행 양상, 결과가 나타날 시점.
- `iztro-ziwei-v3-fast`: 자미두수（紫微斗數） 요청에 더 빠르게 응답하고 토큰과 API 호출 비용을 줄입니다. 응답 구조와 사용자에게 보이는 정보는 `iztro-ziwei-v3`와 같습니다.
- `iztro-qimen-v3-fast`: 기문둔갑（奇門遁甲） 요청에 더 빠르게 응답하고 토큰과 API 호출 비용을 줄입니다. 응답 구조와 사용자에게 보이는 정보는 `iztro-qimen-v3`와 같습니다.

연동 방식은 두 가지이며, 어느 방식에서든 위의 모델을 선택할 수 있습니다. 구현하려는 기능에 맞는 방식을 선택하세요.

## iztro-chat-api - API 호출   {#iztro-chat-api-——-调用我们的-api}

메시지를 보내면 바로 답변을 받을 수 있습니다. AI 에이전트, 명반 계산, 대화 기억은 모두 저희가 관리하므로, 별도의 점술 계산 코드나 AI 코드를 작성할 필요가 없습니다.

-   **추천 대상**: 자신의 앱에서 자미두수（紫微斗數）나 기문둔갑（奇門遁甲）에 관한 답변을 받고 싶은 분.
- 인터페이스 주소: `https://chat-api.iztro.com`
- 👉 [API 문서 보기](https://platform.iztro.com/docs)

## iztro-agents-sdk - 나만의 에이전트 구축(Python/TypeScript)   {#iztro-agents-sdk-——-构建你自己的智能体-python-typescript}

공개된 Iztro 호스팅 모델 중 하나를 사용해 자신만의 AI 에이전트를 만들고, 자체 도구, MCP 서버, 사람이 확인하는 절차를 추가할 수 있습니다. 이 SDK는 OpenAI Agents SDK를 가볍게 감싼 라이브러리입니다.

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

-   **추천 대상**: 자신만의 로직으로 AI 에이전트의 기능을 확장하고 싶은 분.
- 👉 [Python SDK](https://github.com/SylarLong/openai-iztro-agents-python) · [TypeScript / JavaScript SDK](https://github.com/SylarLong/openai-iztro-agents-js) · [PyPI](https://pypi.org/project/openai-iztro-agents/)

---

> 이 서비스는 이 사이트의 다른 장에서 소개하는 오픈 소스 `iztro` 라이브러리와 역할이 다릅니다. **라이브러리는 명반을 계산**하고, **Iztro AI는 해석과 판단을 담당**합니다.
