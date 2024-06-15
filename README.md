# into-the-rest-area
휴식 공간

### 문제 해결노트
<details>
<summary>openai API 구 버전 문법 사용</summary>
  
```
const response = await openai.chat.completions.create({
    messages: [
      { role: "user", content: prompt }
    ],
    model: "gpt-3.5-turbo",
  });
  if (response.choices[0].message.content) {
    const completionText = response.choices[0].message.content;
    res.json({ content: completionText });
  }
```
  
이부분 에서 구버전의 문법인

```ts
  await openai.createChatCompletion({});
  const completionText = response.data.choices[0].message.content;
```
이 두개의 바뀐 부분때문에 시간을 많이 잡아먹었다.
response뒤에 data를 쓰지 않아도 되며 createChatCompletion은 위의 코드처럼 chat.completions.create로 바꼈다.
최신 공식자료를 확인하면서 사용하는게 중요한듯 하다.

</details>
