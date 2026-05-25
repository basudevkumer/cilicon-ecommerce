import Star from "@/components/commonComponent/commonStar/Star";
import { allIcons } from "@/helpers/IconProvider";
import React, { useState } from "react";
import { data } from "react-router-dom";

const MoreDetails = ({ productInfo }) => {
  const { productFeatures } = allIcons;

  const [activeTab, setActiveTab] = useState("description");

  let shippingInformation = [
    {
      id: 1,
      title: "Courier",
      details: "2 - 4 days, free shipping",
    },
    {
      id: 2,
      title: "Local Shipping",
      details: "up to one week, $19.00",
    },
    {
      id: 3,
      title: "UPS Ground Shipping",
      details: "4 - 6 days, $29.00",
    },
    {
      id: 4,
      title: "Unishop Global Export",
      details: "3 - 4 days, $39.00",
    },
  ];

  const tabs = [
    { id: "description", label: "Description" },
    { id: "additional", label: "Additional Information" },
    { id: "specification", label: "Specification" },
    { id: "review", label: "Review" },
  ];

  const handleClick = (id) => {
    setActiveTab(id);
  };

  return (
    <div className="border border-gray_100  rounded">
      <div className="flex justify-center gap-x-4 sm:gap-x-8 lg:gap-x-10 py-3 sm:py-[18px] px-3 sm:px-5 border-b border-gray_100 overflow-x-auto ">
        {tabs.map((items, index) => {
          return (
            <button
              className={`label3  cursor-pointer relative ${
                items.id === activeTab ? "text-gray_900" : "text-gray_600"
              }`}
              onClick={() => handleClick(items.id)}
            >
              {items.label}

              {items.id === activeTab && (
                <span className="absolute left-[-5px] top-[37px] w-[115%] h-[3px] bg-primary_500 "></span>
              )}
            </button>
          );
        })}
      </div>
      {activeTab === "description" && (
        <div className="p-4 sm:p-6 lg:p-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-4 sm:gap-x-6 gap-y-4">
            <div className="col-span-2 ">
              <p className="md_600 text-gray_900 ">Description</p>
              <p className="py-3 sm_400 text-gray_600">
                The most powerful MacBook Pro ever is here. With the
                blazing-fast M1 Pro or M1 Max chip — the first Apple silicon
                designed for pros — you get groundbreaking performance and
                amazing battery life. Add to that a stunning Liquid Retina XDR
                display, the best camera and audio ever in a Mac notebook, and
                all the ports you need. The first notebook of its kind, this
                MacBook Pro is a beast. M1 Pro takes the exceptional performance
                of the M1 architecture to a whole new level for pro users.
              </p>
              <p className="sm_400 text-gray_600">
                Even the most ambitious projects are easily handled with up to
                10 CPU cores, up to 16 GPU cores, a 16‑core Neural Engine, and
                dedicated encode and decode media engines that support H.264,
                HEVC, and ProRes codecs.
              </p>
            </div>
            <div className="col-span-1 ">
              <p className="md_600 text-gray_900 mb-4">Shipping Information</p>
              {productFeatures.map((items, index) => {
                return (
                  <div className="flex  gap-x-3 space-y-[25px]" key={index}>
                    <span className="text-primary_500 text-xl">
                      {items.icon}
                    </span>
                    <p className="sm_400 text-gray_900">{items.title}</p>
                  </div>
                );
              })}
            </div>
            <div className="col-span-1">
              <p className="md_600 text-gray_900 mb-4">Shipping Information</p>
              <div className="flex flex-col gap-y-3">
                {shippingInformation.map((items, index) => {
                  return (
                    <p className="sm_500 text-gray_900 " key={index}>
                      {items.title}{" "}
                      <span className="sm_400 text-gray_600">
                        {items.details}
                      </span>
                    </p>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === "additional" && (
        <div className="text-gray-700 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-3 gap-y-4 p-4 sm:p-6 lg:p-10">
          <p className="sm_400 text-gray_600">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse, dicta
            odit incidunt recusandae ullam veritatis, voluptatibus facere
            ducimus quasi beatae a illo laboriosam sunt? Inventore, nisi modi!
            Dolore perspiciatis labore perferendis officia nulla sequi deserunt
            numquam, consequuntur ullam quod iusto illum accusantium laborum
            itaque aliquam sed. Optio minus dolorum ratione praesentium delectus
            alias pariatur adipisci, sunt, corporis, voluptatem aut. Perferendis
            sapiente enim odit aliquam accusamus officia, dicta iste impedit
            architecto ullam, consequatur facere veritatis quam ex. Ad,
            veritatis. Explicabo consequuntur praesentium temporibus itaque
            voluptas ex alias id ad numquam? Aperiam sit tempora mollitia quam.
            A cupiditate dolores sequi numquam doloremque!
          </p>
          <p className="sm_400 text-primary_500">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse, dicta
            odit incidunt recusandae ullam veritatis, voluptatibus facere
            ducimus quasi beatae a illo laboriosam sunt? Inventore, nisi modi!
            Dolore perspiciatis labore perferendis officia nulla sequi deserunt
            numquam, consequuntur ullam quod iusto illum accusantium laborum
            itaque aliquam sed. Optio minus dolorum ratione praesentium delectus
            alias pariatur adipisci, sunt, corporis, voluptatem aut. Perferendis
            sapiente enim odit aliquam accusamus officia, dicta iste impedit
            architecto ullam, consequatur facere veritatis quam ex. Ad,
            veritatis. Explicabo consequuntur praesentium temporibus itaque
            voluptas ex alias id ad numquam? Aperiam sit tempora mollitia quam.
            A cupiditate dolores sequi numquam doloremque!
          </p>
          <p className="sm_400 text-success_500">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse, dicta
            odit incidunt recusandae ullam veritatis, voluptatibus facere
            ducimus quasi beatae a illo laboriosam sunt? Inventore, nisi modi!
            Dolore perspiciatis labore perferendis officia nulla sequi deserunt
            numquam, consequuntur ullam quod iusto illum accusantium laborum
            itaque aliquam sed. Optio minus dolorum ratione praesentium delectus
            alias pariatur adipisci, sunt, corporis, voluptatem aut. Perferendis
            sapiente enim odit aliquam accusamus officia, dicta iste impedit
            architecto ullam, consequatur facere veritatis quam ex. Ad,
            veritatis. Explicabo consequuntur praesentium temporibus itaque
            voluptas ex alias id ad numquam? Aperiam sit tempora mollitia quam.
            A cupiditate dolores sequi numquam doloremque!
          </p>
        </div>
      )}

      {activeTab === "specification" && (
        <div className="text-gray-700 p-4 sm:p-6 lg:p-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-3 gap-y-4">
          <div>
            <h3 className="text-2xl font-semibold mb-4">
              Technical Specification
            </h3>
            <ul className="space-y-2">
              <li>
                <strong>Chip:</strong> Apple M1 Pro or M1 Max
              </li>
              <li>
                <strong>Display:</strong> 16-inch Liquid Retina XDR
              </li>
              <li>
                <strong>RAM:</strong> Up to 64GB
              </li>
              <li>
                <strong>Storage:</strong> Up to 8TB SSD
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-2xl font-semibold mb-4">
              Technical Specification
            </h3>
            <ul className="space-y-2">
              <li>
                <strong>Chip:</strong> Apple M1 Pro or M1 Max
              </li>
              <li>
                <strong>Display:</strong> 16-inch Liquid Retina XDR
              </li>
              <li>
                <strong>RAM:</strong> Up to 64GB
              </li>
              <li>
                <strong>Storage:</strong> Up to 8TB SSD
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-2xl font-semibold mb-4">
              Technical Specification
            </h3>
            <ul className="space-y-2">
              <li>
                <strong>Chip:</strong> Apple M1 Pro or M1 Max
              </li>
              <li>
                <strong>Display:</strong> 16-inch Liquid Retina XDR
              </li>
              <li>
                <strong>RAM:</strong> Up to 64GB
              </li>
              <li>
                <strong>Storage:</strong> Up to 8TB SSD
              </li>
            </ul>
          </div>
        </div>
      )}

      {activeTab === "review" && (
        <div className="text-gray_900 p-4 sm:p-6 lg:p-10">
          <p className="md_600 text-gray_900 pb-5">Customer Reviews</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {productInfo?.reviews?.map((items, index) => {
              return (
                <div className="border border-gray_100 rounded-lg p-4 flex flex-col gap-3 bg-gray_00">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h4 className="md_600 text-gray_900">{items.reviewerName}</h4>
                      <p className="sm_400 text-gray_500">
                        {items.reviewerEmail}
                      </p>
                    </div>

                    <div className="flex gap-1">
                      <Star starsCard={items.rating} />
                    </div>
                  </div>

                  <p className="md_400 text-gray_700 italic">
                    {items.comment}
                  </p>

                  <p className="xs_400 text-gray_400">{items.date}</p>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default MoreDetails;
