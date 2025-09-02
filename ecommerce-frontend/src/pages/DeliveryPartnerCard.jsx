import { Phone, Star } from "lucide-react";

const DeliveryPartnerCard = ({ deliveryPartner }) => {
  if (!deliveryPartner) return null;

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-5 mb-6 shadow-sm hover:shadow-md transition-shadow duration-300">
      <h3 className="font-semibold text-lg mb-3 text-gray-800">Delivery Partner Assigned</h3>

      <div className="flex items-center space-x-4">
        {/* Optional: Avatar or Placeholder */}
        <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center text-green-600 font-bold text-xl">
          {deliveryPartner.name ? deliveryPartner.name.charAt(0) : "D"}
        </div>

        <div className="flex-1">
          <p className="font-medium text-gray-900">{deliveryPartner.name}</p>

          <div className="flex items-center text-gray-600 mt-1 space-x-3">
            <div className="flex items-center space-x-1">
              <Phone className="w-4 h-4" />
              <span className="text-sm">{deliveryPartner.phone}</span>
            </div>

            <div className="flex items-center space-x-1">
              <Star className="w-4 h-4 text-yellow-400" />
              <span className="text-sm">{deliveryPartner.rating || "N/A"}/5</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeliveryPartnerCard;
