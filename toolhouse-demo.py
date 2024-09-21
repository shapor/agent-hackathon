import argparse
import sys
from toolhouse import Toolhouse
from groq import Groq
from dotenv import load_dotenv

load_dotenv()

def main():
    parser = argparse.ArgumentParser(description="Website summarizer")
    parser.add_argument("url", help="URL of the website")
    args = parser.parse_args()

    th = Toolhouse(access_token="84f7f684-e1b5-4e43-a4c1-fef742e6228b")
    client = Groq()

    def llm_call(messages: list[dict]):
        return client.chat.completions.create(
            model="llama3-groq-70b-8192-tool-use-preview",
            max_tokens=1000,
            messages=messages,
            tools=th.get_tools(),
        )

    messages = [
        {"role": "system", "content": "Respond directly, do not preface or end your responses with anything."},
        {"role": "user", "content": f"Give me all the business details, website, address, etc from this url {args.url}"},
    ]

    response = llm_call(messages)
    messages += th.run_tools(response, append=True)
    final_response = llm_call(messages)

    print(final_response.choices[0].message.content)

    tools_called = response.choices[0].message.tool_calls
    for tool_called in tools_called:
        print(f"ID: {tool_called.id}")
        print(f"Type: {tool_called.type}")
        print(f"Function: {tool_called.function}")
        print('\n')

if __name__ == "__main__":
    main()
