import { streamText, consumeStream, convertToModelMessages, UIMessage } from 'ai'

export const maxDuration = 60

export async function POST(req: Request) {
  const { messages }: { messages: UIMessage[] } = await req.json()

  // Use Gemini Flash with image generation capabilities
  const result = streamText({
    model: 'google/gemini-2.0-flash-preview-image-generation',
    system: `You are a diagram and visual content generator for educational purposes.
    - Generate clear, educational diagrams and illustrations
    - Focus on scientific diagrams, flowcharts, concept maps, and educational visuals
    - Label all parts clearly
    - Use appropriate colors for clarity
    - Make diagrams exam and study-friendly`,
    messages: await convertToModelMessages(messages),
    abortSignal: req.signal,
    providerOptions: {
      google: {
        responseModalities: ['TEXT', 'IMAGE'],
      },
    },
  })

  return result.toUIMessageStreamResponse({
    originalMessages: messages,
    consumeSseStream: consumeStream,
  })
}
