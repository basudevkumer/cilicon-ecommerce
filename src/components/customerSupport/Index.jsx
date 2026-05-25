import React from 'react';
import { FaHeadset, FaEnvelope, FaPhoneAlt, FaMapMarkerAlt } from 'react-icons/fa';

const CustomerSupports = () => {
  return (
    <div className="bg-gray_50 min-h-screen py-12 px-4 font-publicSans">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-12">
          <span className="label4 text-secondary_500 uppercase tracking-wider">
            Help Center
          </span>
          <h1 className="heading1 text-gray_900 mt-2">
            How can we assist you today?
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Info Cards */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-gray_00 p-6 rounded-lg border border-gray_100 flex items-start gap-4 transition-all hover:shadow-md">
              <div className="p-3 bg-primary_50 rounded-md text-primary_500 text-2xl">
                <FaPhoneAlt />
              </div>
              <div>
                <h4 className="md_600 text-gray_900 uppercase">Call to Us</h4>
                <p className="sm_400 text-gray_600">+1-202-555-0104</p>
              </div>
            </div>

            <div className="bg-gray_00 p-6 rounded-lg border border-gray_100 flex items-start gap-4 transition-all hover:shadow-md">
              <div className="p-3 bg-success_50 rounded-md text-success_500 text-2xl">
                <FaEnvelope />
              </div>
              <div>
                <h4 className="md_600 text-gray_900 uppercase">Email Support</h4>
                <p className="sm_400 text-gray_600">support@clicon.com</p>
              </div>
            </div>

            <div className="bg-gray_00 p-6 rounded-lg border border-gray_100 flex items-start gap-4 transition-all hover:shadow-md">
              <div className="p-3 bg-warning_50 rounded-md text-warning_500 text-2xl">
                <FaMapMarkerAlt />
              </div>
              <div>
                <h4 className="md_600 text-gray_900 uppercase">Our Office</h4>
                <p className="sm_400 text-gray_600">Uttara, Dhaka, Bangladesh</p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2 bg-gray_00 p-8 rounded-xl shadow-sm border border-gray_100">
            <h3 className="heading3 text-gray_900 mb-6 uppercase">Send us a message</h3>
            <form className="grid grid-cols-1 md:grid-cols-2 gap-6" onSubmit={(e) => e.preventDefault()}>
              <div className="flex flex-col gap-2">
                <label className="sm_500 text-gray_900">Your Name</label>
                <input
                  type="text"
                  placeholder="Enter your name"
                  className="border border-gray_100 p-3 rounded-md focus:border-primary_500 outline-none md_400 transition-colors"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="sm_500 text-gray_900">Email Address</label>
                <input
                  type="email"
                  placeholder="Email address"
                  className="border border-gray_100 p-3 rounded-md focus:border-primary_500 outline-none md_400 transition-colors"
                />
              </div>
              <div className="md:col-span-2 flex flex-col gap-2">
                <label className="sm_500 text-gray_900">Subject</label>
                <input
                  type="text"
                  placeholder="How can we help?"
                  className="border border-gray_100 p-3 rounded-md focus:border-primary_500 outline-none md_400 transition-colors"
                />
              </div>
              <div className="md:col-span-2 flex flex-col gap-2">
                <label className="sm_500 text-gray_900">Message</label>
                <textarea
                  rows="5"
                  placeholder="Write your message here..."
                  className="border border-gray_100 p-3 rounded-md focus:border-primary_500 outline-none md_400 transition-colors resize-none"
                ></textarea>
              </div>
              <button className="bg-primary_500 text-gray_00 py-4 px-10 rounded-md lg_600 hover:bg-primary_600 transition-all w-fit uppercase tracking-wide">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerSupports;