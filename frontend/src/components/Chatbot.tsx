import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { FaComments, FaXmark } from "react-icons/fa6";
import { askChatbot } from "../api";

interface Message {
  role: "user" | "bot";
  text: string;
}

const Chatbot = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: "bot", text: "Hey! Ask me anything about Ria's resume." },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const send = async () => {
    const question = input.trim();
    if (!question || loading) return;
    setMessages((m) => [...m, { role: "user", text: question }]);
    setInput("");
    setLoading(true);
    try {
      const answer = await askChatbot(question);
      setMessages((m) => [...m, { role: "bot", text: answer }]);
    } catch (err) {
      const text = err instanceof Error ? err.message : "Something went wrong";
      setMessages((m) => [...m, { role: "bot", text }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.97 }}
            transition={{ duration: 0.2 }}
            className="glass rounded-2xl w-80 h-96 mb-4 flex flex-col overflow-hidden"
          >
            <div className="px-4 py-3 border-b border-(--color-border) font-display font-medium text-sm">
              Ask my resume bot
            </div>
            <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3 text-sm">
              {messages.map((m, i) => (
                <div
                  key={i}
                  className={`max-w-[85%] px-3 py-2 rounded-lg ${
                    m.role === "user"
                      ? "ml-auto bg-(--color-accent) text-white"
                      : "bg-(--color-surface-2)"
                  }`}
                >
                  {m.text}
                </div>
              ))}
              {loading && (
                <div className="bg-(--color-surface-2) max-w-[85%] px-3 py-2 rounded-lg text-(--color-muted)">
                  Thinking…
                </div>
              )}
            </div>
            <div className="p-3 border-t border-(--color-border) flex gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && send()}
                placeholder="Type a question…"
                className="flex-1 bg-(--color-surface) rounded-lg px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-(--color-accent)"
              />
              <button
                onClick={send}
                className="px-3 py-2 rounded-lg bg-(--color-accent) text-sm font-medium hover:opacity-90"
              >
                Go
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setOpen((o) => !o)}
        className="w-14 h-14 rounded-full bg-(--color-accent) flex items-center justify-center shadow-lg hover:opacity-90 transition-opacity"
        aria-label="Toggle chatbot"
      >
        {open ? <FaXmark size={20} /> : <FaComments size={20} />}
      </button>
    </div>
  );
};

export default Chatbot;
