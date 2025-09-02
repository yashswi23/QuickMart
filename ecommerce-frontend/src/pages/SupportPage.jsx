
import { Truck, Package, MessageCircle } from "lucide-react";

const SupportPage = ({
  setCurrentPage,
  chatMessages,
  chatEnabled,
  currentMessage,
  setCurrentMessage,
  handleConcernClick,
  sendMessage
}) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center mb-6">
          <button
            onClick={() => setCurrentPage('trackOrder')}
            className="text-blue-600 hover:text-blue-700 mr-4"
          >
            ← Back to Order
          </button>
          <h1 className="text-2xl font-bold">Help & Support</h1>
        </div>

        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-lg shadow-md">
            {/* Chat Header */}
            <div className="bg-blue-600 text-white p-4 rounded-t-lg">
              <div className="flex items-center">
                <MessageCircle className="w-6 h-6 mr-2" />
                <span className="font-semibold">Support Chat</span>
              </div>
            </div>

            {/* Chat Messages */}
            <div className="p-4 h-96 overflow-y-auto bg-gray-50">
              {chatMessages.length === 0 && (
                <div className="text-center text-gray-500 mt-8">
                  <MessageCircle className="w-12 h-12 mx-auto mb-2 text-gray-400" />
                  <p>Select a concern below to start chatting</p>
                </div>
              )}

              {chatMessages.map((msg, index) => (
                <div key={index} className={`mb-4 ${msg.type === 'user' ? 'text-right' : 'text-left'}`}>
                  <div className={`inline-block p-3 rounded-lg max-w-xs ${
                    msg.type === 'user' ? 'bg-blue-600 text-white' : 'bg-white border shadow-sm'
                  }`}>
                    {msg.message}
                  </div>
                </div>
              ))}
            </div>

            {/* Concerns Section */}
            {!chatEnabled && (
              <div className="p-4 border-t">
                <h3 className="font-semibold mb-3">What can we help you with?</h3>
                <div className="grid grid-cols-2 gap-2">
                  <button onClick={() => handleConcernClick('delivery')} className="p-3 border rounded-lg hover:bg-gray-50 text-left">
                    <Truck className="w-5 h-5 mb-1" />
                    <p className="text-sm font-medium">Delivery Issues</p>
                  </button>
                  <button onClick={() => handleConcernClick('payment')} className="p-3 border rounded-lg hover:bg-gray-50 text-left">
                    <div className="w-5 h-5 mb-1 bg-green-500 rounded"></div>
                    <p className="text-sm font-medium">Payment Issues</p>
                  </button>
                  <button onClick={() => handleConcernClick('product')} className="p-3 border rounded-lg hover:bg-gray-50 text-left">
                    <Package className="w-5 h-5 mb-1" />
                    <p className="text-sm font-medium">Product Quality</p>
                  </button>
                  <button onClick={() => handleConcernClick('other')} className="p-3 border rounded-lg hover:bg-gray-50 text-left">
                    <MessageCircle className="w-5 h-5 mb-1" />
                    <p className="text-sm font-medium">Other Concerns</p>
                  </button>
                </div>
              </div>
            )}

            {/* Chat Input */}
            {chatEnabled && (
              <div className="p-4 border-t">
                <div className="flex">
                  <input 
                    type="text"
                    value={currentMessage}
                    onChange={(e) => setCurrentMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                    placeholder="Type your message..."
                    className="flex-1 border rounded-l-lg px-3 py-2 focus:outline-none focus:border-blue-500"
                  />
                  <button 
                    onClick={sendMessage}
                    disabled={!currentMessage.trim()}
                    className="bg-blue-600 text-white px-4 py-2 rounded-r-lg hover:bg-blue-700 disabled:bg-gray-400"
                  >
                    Send
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupportPage;

