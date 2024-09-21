import argparse
import sys
from toolhouse import Toolhouse
from anthropic import Anthropic
from dotenv import load_dotenv

load_dotenv()

def main():
    parser = argparse.ArgumentParser(description="Convert PDF to CSV")
    parser.add_argument("url", help="URL of the website")
    args = parser.parse_args()

    th = Toolhouse(provider="anthropic", access_token="84f7f684-e1b5-4e43-a4c1-fef742e6228b")
    client = Anthropic()

    def llm_call(messages: list[dict]):
        return client.messages.create(
            model="claude-3-5-sonnet-20240620",
            system="Respond directly, do not preface or end your responses with anything.",
            max_tokens=1000,
            messages=messages,
            tools=th.get_tools(),
        )

    messages = [
        {"role": "user", "content": f"Give me all the business details, website, address, etc from this url {args.url}"},
    ]

    response = llm_call(messages)
    messages += th.run_tools(response, append=True)
    final_response = llm_call(messages)

    print(final_response.content[0].text)

if __name__ == "__main__":
    main()
