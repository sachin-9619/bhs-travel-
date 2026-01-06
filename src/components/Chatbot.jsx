import { useState, useEffect, useRef } from "react";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import { FaComments } from "react-icons/fa";

const STATIC_RESPONSES = [
  {
    keywords: ["hi", "hello", "hii"],
    reply: "Hello 👋 BHS Travels me aapka swagat hai!"
  },
  {
    keywords: ["route", "routes"],
    reply: "Available Routes:\n• Solapur → Pune\n• Pune → Solapur\n•"
  },
  {
    keywords: ["solapur", "pune"],
    reply: "Solapur → Pune\n🕗 Time: 8:00 AM\n💰 Fare: ₹500\n🚌 AC Bus available"
  },
  
  {
    keywords: ["fare", "price"],
    reply: "Solapur → Pune fare is ₹500 only."
  },
  {
    keywords: ["contact", "phone"],
    reply: "📞 Contact: 8767743975"
  },
  {
  keywords: ["timing", "time"],
  reply: "Our buses run daily with fixed timings. Please ask for a specific route."
},
{
  keywords: ["ac", "air"],
  reply: "Yes, all our buses are fully air-conditioned for a comfortable journey."
},
{
  keywords: ["seat", "seats"],
  reply: "Comfortable push-back seats are available on all buses."
},
{
  keywords: ["booking", "book"],
  reply: "Seat booking is available online and at our office."
},
{
  keywords: ["cancel", "cancellation"],
  reply: "For ticket cancellation, please contact our booking office."
},
{
  keywords: ["luggage", "bag"],
  reply: "Passengers are allowed to carry standard luggage as per policy."
},
{
  keywords: ["pickup", "pick up"],
  reply: "Pickup points are available at major locations in the city."
},
{
  keywords: ["drop", "drop point"],
  reply: "Drop points are available at convenient locations in Pune."
},
{
  keywords: ["driver"],
  reply: "Our drivers are experienced and trained for long-distance travel."
},
{
  keywords: ["safety", "secure"],
  reply: "Passenger safety is our top priority."
},
{
  keywords: ["break", "stop"],
  reply: "There will be a short refreshment break during the journey."
},
{
  keywords: ["duration", "hours"],
  reply: "The journey duration is approximately 4 hours."
},
{
  keywords: ["payment", "pay"],
  reply: "We accept cash and online payments."
},
{
  keywords: ["office", "address"],
  reply: "Our booking office is open daily from 6:00 AM to 11:00 PM."
},
{
  keywords: ["thanks", "thank you"],
  reply: "You're welcome! Have a safe and pleasant journey with BHS Travels 😊"
},
{
  keywords: ["bus", "type"],
  reply: "We operate AC luxury buses for a comfortable journey."
},
{
  keywords: ["restroom", "washroom", "toilet"],
  reply: "There is no restroom inside the bus, but a halt is provided during the journey."
},
{
  keywords: ["food", "snacks"],
  reply: "Passengers can carry their own food and snacks."
},
{
  keywords: ["water"],
  reply: "Please carry your own drinking water for the journey."
},
{
  keywords: ["late", "delay"],
  reply: "Minor delays may occur due to traffic or weather conditions."
},
{
  keywords: ["refund"],
  reply: "Refund policies depend on the time of cancellation. Please contact our office."
},
{
  keywords: ["child", "kids"],
  reply: "Children above 5 years require a full ticket."
},
{
  keywords: ["senior", "elder"],
  reply: "Senior citizens are requested to arrive early for easy boarding."
},
{
  keywords: ["women", "ladies"],
  reply: "Our buses are safe and suitable for women passengers."
},
{
  keywords: ["night", "overnight"],
  reply: "Night services are available on selected routes."
},
{
  keywords: ["emergency"],
  reply: "In case of emergency, please contact the bus staff immediately."
},
{
  keywords: ["festival", "holiday"],
  reply: "During festivals and holidays, fares and timings may change."
},
{
  keywords: ["covid", "clean"],
  reply: "Buses are cleaned regularly to maintain hygiene and safety."
},
{
  keywords: ["ticket", "print"],
  reply: "A digital ticket on your phone is sufficient. No printout required."
},
{
  keywords: ["help", "support"],
  reply: "For assistance, please contact our support team during office hours."
}

];

function getBotReply(message) {
  const msg = message.toLowerCase();

  for (let item of STATIC_RESPONSES) {
    if (item.keywords.some(k => msg.includes(k))) {
      return item.reply;
    }
  }

  return "Sorry 😔 mujhe ye samajh nahi aaya. Aap route puch sakte ho.";
}

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const scrollRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  // Close chatbot if clicked outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSend = (msg) => {
    if (!msg.trim()) return;

    setMessages(prev => [...prev, { type: "user", text: msg }]);
    setInput("");
    setTyping(true);

    setTimeout(() => {
      const reply = getBotReply(msg);
      setMessages(prev => [...prev, { type: "bot", text: reply }]);
      setTyping(false);
    }, 1000 + Math.random() * 500); // simulate AI typing delay
  };

  const handleToggle = () => {
    setOpen(prev => {
      if (!prev) setMessages([]); // clear old chat when opening
      return !prev;
    });
  };

  return (
    <div className="fixed bottom-6 right-6 z-50" ref={containerRef}>
      {/* Chat Button */}
      <motion.button
        onClick={handleToggle}
        className="w-16 h-16 rounded-full bg-linear-to-br from-orange-400 to-orange-600 text-white shadow-xl flex items-center justify-center hover:scale-110 transition-transform"
      >
        <FaComments size={24} />
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ y: 300, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 300, opacity: 0 }}
            className="w-80 max-h-96 p-4 bg-linear-to-tl from-white to-gray-50 rounded-2xl shadow-2xl flex flex-col"
          >
            {/* Messages */}
            <div className="flex-1 overflow-y-auto mb-2 space-y-2 px-1">
              {messages.map((m, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`p-2 rounded-xl max-w-[80%] wrap-break-word ${
                    m.type === "user"
                      ? "bg-orange-100 text-right self-end"
                      : "bg-linear-to-r from-orange-50 to-orange-200 text-left self-start"
                  }`}
                >
                  {m.text}
                </motion.div>
              ))}

              {/* Typing indicator */}
              {typing && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-orange-100 text-left self-start p-2 rounded-xl flex items-center space-x-2 w-max"
                >
                  <div className="w-2 h-2 bg-orange-400 rounded-full animate-bounce" />
                  <div className="w-2 h-2 bg-orange-400 rounded-full animate-bounce delay-200" />
                  <div className="w-2 h-2 bg-orange-400 rounded-full animate-bounce delay-400" />
                </motion.div>
              )}

              <div ref={scrollRef} />
            </div>

            {/* Input */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend(input);
              }}
              className="flex gap-2"
            >
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about routes, fares..."
                className="flex-1 border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
              />
              <button
                type="submit"
                className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg transition-colors"
              >
                Send
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
