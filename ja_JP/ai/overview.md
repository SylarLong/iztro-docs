---
title: "Iztro AI：紫微・奇門モデルと API・SDK"
description: "Iztro AI の紫微・奇門のホスト型モデルと fast 版を紹介し、iztro-chat-api や Python・TypeScript SDK を使った連携方法を説明します。"

---
# Iztro AI {#iztro-ai}

オープンソースの命盤作成ライブラリ **iztro** に加え、紫微斗数と奇門遁甲のホスティング型AIモデルを4つ公開しています。

- `iztro-ziwei-v3`：本命・相性をみる合盤・中長期の運勢分析。
- `iztro-qimen-v3`：現在の具体的な事柄についての判断、展開、結果が現れる時期。
- `iztro-ziwei-v3-fast`：紫微斗数の応答が速く、トークン消費とAPI呼び出し費用が少ないモデルです。応答構造とユーザーに表示される情報は `iztro-ziwei-v3` と同じです。
- `iztro-qimen-v3-fast`：奇門の応答が速く、トークン消費とAPI呼び出し費用が少ないモデルです。応答構造とユーザーに表示される情報は `iztro-qimen-v3` と同じです。

連携方法は2つあり、どちらでも上記のモデルを選択できます。実現したいことに合わせて連携方法を選んでください。

## iztro-chat-api - APIを利用する {#iztro-chat-api-——-调用我们的-api}

メッセージを送るだけで回答を受け取れます。AIエージェント、命盤の計算、会話の記憶はすべてこちらで管理するため、占術やAIのコードを書く必要はありません。

-  **向いている方**：自分のアプリで紫微斗数や奇門遁甲の回答を受け取りたい方。
- APIアドレス: `https://chat-api.iztro.com`
- 👉 [APIドキュメントを見る](https://platform.iztro.com/docs)

## iztro-agents-sdk - 独自のエージェントを構築する (Python/TypeScript)  {#iztro-agents-sdk-——-构建你自己的智能体-python-typescript}

公開されているIztroのホスティング型モデルを使って独自のAIエージェントを構築し、自分のツール、MCPサーバー、人による確認手順を追加できます。このSDKはOpenAI Agents SDKを軽量にラップしたものです。

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

-  **向いている方**：独自のロジックでAIエージェントを拡張したい方。
- 👉 [Python SDK](https://github.com/SylarLong/openai-iztro-agents-python) · [TypeScript / JavaScript SDK](https://github.com/SylarLong/openai-iztro-agents-js) · [PyPI](https://pypi.org/project/openai-iztro-agents/)

---

> これは、本サイトの他の章で紹介しているオープンソースの `iztro` ライブラリとは別のものです。**ライブラリは命盤を計算**し、**Iztro AIは解釈と判断を担当**します。
