// ./app/api/chat/route.ts
import {
  ChatCompletionRequestMessageRoleEnum,
  Configuration,
  OpenAIApi,
} from "openai-edge";
import { OpenAIStream, StreamingTextResponse } from "ai";

// TODO: Add your better system prompt here
const systemPrompt = {
  role: "system",
  content: `The following is a conversation with an AI assistant. The assistant is helpful, creative, clever, and very friendly.`,
} as const;

// Create an OpenAI API client (that's edge friendly!)
const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(config);

// IMPORTANT! Set the runtime to edge
export const runtime = "edge";

export async function POST(req: Request) {
  // Extract the `prompt` from the body of the request
  const { messages } = (await req.json()) as {
    messages: { content: string; role: ChatCompletionRequestMessageRoleEnum }[];
  };
  const lastMessage = messages.pop();

  if (!lastMessage) {
    throw new Error("No messages provided");
  }

  // Ask OpenAI for a streaming chat completion given the prompt
  const response = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    stream: true,
    messages: [systemPrompt, lastMessage],
  });

  // Convert the response into a friendly text-stream
  const stream = OpenAIStream(response);
  // Respond with the stream
  return new StreamingTextResponse(stream);
}
