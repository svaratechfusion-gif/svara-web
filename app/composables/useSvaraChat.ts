// Session-scoped conversation state for SVARA AI. Wraps the framework-free engine
// (lib/chatbot.ts). Tracks `lastTopic` so follow-ups resolve in context ("it" → last
// topic). `reset()` fully destroys the session (used on close/open) — no persistence.
import { ref } from 'vue'
import { requestReply, type ChatMessage, type Suggestion, type Topic } from '~~/lib/chatbot'

export type ChatStatus = 'idle' | 'processing'

export function useSvaraChat() {
  const messages = ref<ChatMessage[]>([])
  const status = ref<ChatStatus>('idle')
  const suggestions = ref<Suggestion[]>([])

  let lastTopic: Topic = null
  let seq = 0
  const nextId = (): string => `m${++seq}`

  function reset(): void {
    messages.value = []
    status.value = 'idle'
    suggestions.value = []
    lastTopic = null
    seq = 0
  }

  async function send(raw: string): Promise<void> {
    const text = raw.trim()
    if (!text || status.value === 'processing') return

    messages.value = [...messages.value, { id: nextId(), role: 'user', text }]
    suggestions.value = [] // hide chips while processing
    status.value = 'processing'

    try {
      const reply = await requestReply(text, { lastTopic })
      lastTopic = reply.topic ?? lastTopic
      messages.value = [...messages.value, { id: nextId(), role: 'assistant', text: reply.text }]
      suggestions.value = [...reply.suggestions]
    }
    catch {
      messages.value = [
        ...messages.value,
        { id: nextId(), role: 'assistant', text: 'Something interrupted that request. Please try again.' },
      ]
    }
    finally {
      status.value = 'idle'
    }
  }

  return { messages, status, suggestions, send, reset }
}
