import React from 'react';
import { FaSearch, FaBox, FaUndoAlt, FaCreditCard, FaLock, FaChevronDown } from 'react-icons/fa';

const NeedHelps = () => {
  const helpCategories = [
    { 
      icon: <FaBox />, 
      title: "Order Tracking", 
      desc: "Check the current status of your orders" 
    },
    { 
      icon: <FaUndoAlt />, 
      title: "Return & Refund", 
      desc: "Our policy on product returns and refunds" 
    },
    { 
      icon: <FaCreditCard />, 
      title: "Payment Options", 
      desc: "Multiple ways to pay for your purchases" 
    },
    { 
      icon: <FaLock />, 
      title: "Account Security", 
      desc: "Manage passwords and account safety" 
    },
  ];

  const faqs = [
    {
      q: "How do I create a new account?",
      a: "Click on the 'User Icon' at the top right of our website and select the 'Register' option to create your account easily."
    },
    {
      q: "What is the average delivery time?",
      a: "Standard delivery typically takes 3-5 business days depending on your location."
    },
    {
      q: "How can I change my shipping address?",
      a: "You can update your shipping address within your account settings under the 'Addresses' tab."
    }
  ];

  return (
    <div className="bg-gray_00 min-h-screen font-publicSans">
      {/* Hero Search Section */}
      <div className="bg-secondary_900 py-12 sm:py-16 lg:py-24 px-4 text-center">
        <h2 className="display5 text-gray_00 mb-6 uppercase">What can we help you find?</h2>
        <div className="max-w-2xl mx-auto relative">
          <input 
            type="text" 
            placeholder="Search for help (e.g. tracking, returns...)" 
            className="w-full p-5 pl-14 rounded-lg bg-gray_00 outline-none md_400 text-gray_900 shadow-xl border-none focus:ring-2 focus:ring-primary_500 transition-all"
          />
          <FaSearch className="absolute left-5 top-1/2 -translate-y-1/2 text-gray_400 text-xl" />
        </div>
      </div>

      <div className="max-w-[1320px] mx-auto py-10 sm:py-14 lg:py-20 px-4 sm:px-6 lg:px-8">
        {/* Categories */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {helpCategories.map((item, index) => (
            <div key={index} className="p-8 border border-gray_100 rounded-xl hover:border-primary_500 hover:shadow-2xl transition-all duration-300 cursor-pointer group text-center bg-gray_00">
              <div className="text-4xl text-primary_500 mb-5 flex justify-center group-hover:scale-110 transition-transform duration-300">
                {item.icon}
              </div>
              <h4 className="label1 text-gray_900 mb-3 uppercase tracking-tight">{item.title}</h4>
              <p className="sm_400 text-gray_500 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* FAQ Section */}
        <div className="max-w-3xl mx-auto">
          <h3 className="heading2 text-center text-gray_900 mb-12 uppercase">Frequently Asked Questions</h3>
          <div className="space-y-5">
            {faqs.map((faq, i) => (
              <details key={i} className="group border border-gray_100 rounded-lg overflow-hidden transition-all duration-300">
                <summary className="label2 text-gray_900 p-6 bg-gray_50 cursor-pointer list-none flex justify-between items-center group-open:bg-primary_50 transition-colors">
                  {faq.q}
                  <FaChevronDown className="text-primary_500 text-sm transition-transform duration-300 group-open:rotate-180" />
                </summary>
                <div className="p-6 md_400 text-gray_600 border-t border-gray_100 bg-gray_00 leading-relaxed">
                  {faq.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NeedHelps;