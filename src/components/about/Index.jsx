import React from 'react';
import { FaCheckCircle, FaRocket, FaUsers, FaHandshake } from 'react-icons/fa';

const AboutPage = () => {
  return (
    <div className="bg-gray_00 font-publicSans">
      {/* Hero Section */}
      <section className="py-20 bg-gray_50">
        <div className="max-w-[1320px] mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="label4 text-secondary_500 uppercase font-bold tracking-widest">About Clicon</span>
            <h1 className="display4 text-gray_900 mt-4 mb-6 leading-tight">
              Your Trusted Destination for Premium Technology & Electronics
            </h1>
            <p className="md_400 text-gray_600 mb-8 leading-relaxed">
              Clicon is more than just an eCommerce store. We are a team of tech enthusiasts dedicated to bringing the latest and most reliable gadgets to your doorstep. Since our inception, we have focused on quality, innovation, and customer satisfaction.
            </p>
            <div className="flex flex-wrap gap-4">
              <button className="bg-primary_500 text-gray_00 px-8 py-4 rounded-md lg_600 hover:bg-primary_600 transition-all shadow-lg shadow-primary_100">
                Explore Products
              </button>
              <button className="border-2 border-primary_500 text-primary_500 px-8 py-4 rounded-md lg_600 hover:bg-primary_50 transition-all">
                Our Story
              </button>
            </div>
          </div>
          <div className="relative">
            <img 
              src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80" 
              alt="Tech Workspace" 
              className="rounded-2xl shadow-2xl z-10 relative"
            />
            <div className="absolute -bottom-6 -left-6 bg-secondary_500 p-8 rounded-xl hidden md:block">
              <p className="display5 text-gray_00">10+</p>
              <p className="sm_500 text-gray_50 uppercase">Years Experience</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features/Values Section */}
      <section className="py-20">
        <div className="max-w-[1320px] mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="heading1 text-gray_900 uppercase">Why Choose Clicon?</h2>
            <div className="w-20 h-1 bg-primary_500 mx-auto mt-4"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: <FaCheckCircle />, title: "Authentic Products", desc: "We guarantee 100% genuine products from top global brands." },
              { icon: <FaRocket />, title: "Fast Delivery", desc: "Experience lightning-fast shipping across the entire country." },
              { icon: <FaUsers />, title: "Customer Centric", desc: "Our support team is available 24/7 to solve your queries." },
              { icon: <FaHandshake />, title: "Secure Payment", desc: "Shop with confidence using our multiple secure payment gateways." }
            ].map((item, index) => (
              <div key={index} className="p-8 bg-gray_00 border border-gray_100 rounded-xl hover:shadow-xl transition-all group">
                <div className="text-4xl text-primary_500 mb-6 group-hover:scale-110 transition-transform">{item.icon}</div>
                <h4 className="label1 text-gray_900 mb-3">{item.title}</h4>
                <p className="sm_400 text-gray_500">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-secondary_900">
        <div className="max-w-[1320px] mx-auto px-4 grid grid-cols-2 lg:grid-cols-4 gap-8 text-center text-gray_00">
          <div>
            <p className="display5 font-bold">50K+</p>
            <p className="label3 text-gray_300 uppercase">Happy Customers</p>
          </div>
          <div>
            <p className="display5 font-bold">120+</p>
            <p className="label3 text-gray_300 uppercase">Global Brands</p>
          </div>
          <div>
            <p className="display5 font-bold">10M+</p>
            <p className="label3 text-gray_300 uppercase">Products Sold</p>
          </div>
          <div>
            <p className="display5 font-bold">99%</p>
            <p className="label3 text-gray_300 uppercase">Positive Feedback</p>
          </div>
        </div>
      </section>

      {/* Contact CTA Section */}
      <section className="py-20">
        <div className="max-w-[1000px] mx-auto px-4 text-center bg-primary_50 rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-12">
          <h2 className="heading1 text-gray_900 mb-4">Ready to upgrade your lifestyle?</h2>
          <p className="md_400 text-gray_700 mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied shoppers today. Explore our wide range of categories and find the perfect technology that fits your needs.
          </p>
          <button className="bg-primary_500 text-gray_00 px-6 sm:px-10 py-3 sm:py-4 rounded-md text-sm sm:text-base font-semibold hover:bg-primary_600 transition-all cursor-pointer">
            Start Shopping Now
          </button>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;