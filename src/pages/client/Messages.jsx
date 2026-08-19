import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Send, Paperclip } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { messages as initialMessages } from '@/data/mockData'
import { cn } from '@/lib/utils'

export default function Messages() {
  const [messages, setMessages] = useState(initialMessages)
  const [input, setInput] = useState('')
  const bottomRef = useRef(null)

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }) }, [messages])

  function send() {
    if (!input.trim()) return
    setMessages(m => [...m, { id: 'm' + Date.now(), from: 'client', author: 'You', text: input, time: 'Just now' }])
    setInput('')
    setTimeout(() => {
      setMessages(m => [...m, { id: 'm' + (Date.now() + 1), from: 'team', author: 'Ahmed Raza', text: "Got it — I'll take a look and follow up shortly.", time: 'Just now' }])
    }, 1200)
  }

  return (
    <div className="space-y-5">
      <div>
        <h1 className="font-display font-bold text-2xl text-secondary">Messages</h1>
        <p className="text-sm text-muted mt-1">Talk directly with your finance team.</p>
      </div>

      <Card className="flex flex-col h-[calc(100vh-14rem)] max-h-[640px]">
        <div className="px-5 py-4 border-b border-border flex items-center gap-3">
          <div className="h-9 w-9 rounded-full bg-secondary text-white text-sm font-semibold flex items-center justify-center">AR</div>
          <div>
            <p className="text-sm font-semibold text-secondary">Ahmed Raza</p>
            <p className="text-xs text-success flex items-center gap-1"><span className="h-1.5 w-1.5 rounded-full bg-success" /> Finance Manager · Online</p>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
          {messages.map(m => (
            <motion.div key={m.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2 }}
              className={cn('flex', m.from === 'client' ? 'justify-end' : 'justify-start')}
            >
              <div className={cn('max-w-[75%] rounded-2xl px-4 py-2.5', m.from === 'client' ? 'bg-primary text-white rounded-br-sm' : 'bg-slate-100 text-secondary rounded-bl-sm')}>
                <p className="text-sm leading-relaxed">{m.text}</p>
                <p className={cn('text-[10px] mt-1', m.from === 'client' ? 'text-blue-100' : 'text-slate-400')}>{m.time}</p>
              </div>
            </motion.div>
          ))}
          <div ref={bottomRef} />
        </div>

        <div className="border-t border-border p-3 flex items-center gap-2">
          <button className="h-9 w-9 flex items-center justify-center rounded-lg text-muted hover:bg-slate-100 shrink-0">
            <Paperclip className="h-4 w-4" />
          </button>
          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && send()}
            placeholder="Type a message..."
            className="flex-1 h-10 rounded-lg border border-border bg-white px-3.5 text-sm focus-ring focus:border-primary"
          />
          <button onClick={send} className="h-10 w-10 flex items-center justify-center rounded-lg bg-primary text-white hover:bg-primary-dark shrink-0">
            <Send className="h-4 w-4" />
          </button>
        </div>
      </Card>
    </div>
  )
}
