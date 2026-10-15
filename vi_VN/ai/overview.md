# Iztro AI {#iztro-ai}

Bên cạnh thư viện lập lá số mã nguồn mở **iztro**, chúng tôi cung cấp bốn mô hình AI được lưu trữ và vận hành sẵn, dành cho Tử Vi Đẩu Số（紫微斗數） và Kỳ Môn Độn Giáp（奇門遁甲）:

- `iztro-ziwei-v3`: phân tích bản mệnh, hợp lá số để xem tương hợp và vận hạn trung, dài hạn.
- `iztro-qimen-v3`: nhận định về một sự việc cụ thể ở hiện tại, diễn biến của sự việc và thời điểm kết quả có thể xảy ra.
- `iztro-ziwei-v3-fast`: trả lời yêu cầu Tử Vi Đẩu Số（紫微斗數） nhanh hơn, dùng ít token hơn và giảm chi phí gọi API; cấu trúc phản hồi và thông tin người dùng nhìn thấy giống `iztro-ziwei-v3`.
- `iztro-qimen-v3-fast`: trả lời yêu cầu Kỳ Môn（奇門） nhanh hơn, dùng ít token hơn và giảm chi phí gọi API; cấu trúc phản hồi và thông tin người dùng nhìn thấy giống `iztro-qimen-v3`.

Có hai cách tích hợp, và cả hai đều cho phép chọn các mô hình ở trên. Hãy chọn cách phù hợp với chức năng bạn muốn xây dựng.

## iztro-chat-api - gọi API của chúng tôi   {#iztro-chat-api-——-调用我们的-api}

Gửi một tin nhắn để nhận câu trả lời trực tiếp. Chúng tôi quản lý tác tử AI, việc tính toán lá số và bộ nhớ hội thoại, nên bạn không cần viết mã xử lý chiêm tinh hay AI.

-   **Phù hợp với**: người chỉ muốn nhận câu trả lời về Tử Vi Đẩu Số（紫微斗數） hoặc Kỳ Môn Độn Giáp（奇門遁甲） trong ứng dụng của mình.
- Địa chỉ API: `https://chat-api.iztro.com`
- 👉 [Xem tài liệu API](https://platform.iztro.com/docs)

## iztro-agents-sdk - Xây dựng tác tử AI riêng (Python/TypeScript) {#iztro-agents-sdk-——-构建你自己的智能体-python-typescript}

Xây dựng tác tử AI riêng bằng bất kỳ mô hình công khai nào do Iztro vận hành, rồi bổ sung công cụ, máy chủ MCP và các bước xác nhận do con người thực hiện. SDK này là một lớp bọc nhẹ quanh OpenAI Agents SDK.

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

-   **Phù hợp với**: người muốn mở rộng tác tử AI bằng logic riêng.
- 👉 [Python SDK](https://github.com/SylarLong/openai-iztro-agents-python) · [TypeScript / JavaScript SDK](https://github.com/SylarLong/openai-iztro-agents-js) · [PyPI](https://pypi.org/project/openai-iztro-agents/)

---

> Dịch vụ này khác với thư viện mã nguồn mở `iztro` được giới thiệu ở các chương khác trên trang: **thư viện tính toán để lập lá số**, còn **Iztro AI phụ trách luận giải và nhận định**.
