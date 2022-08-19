import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/effect-cards";
import { EffectCards } from "swiper";
import aims from "../assets/afapUI.png";
import incu from "../assets/incu.png";
import ball from "../assets/8ball.png";
import credit from "../assets/credit.png";
import concert23 from "../assets/concert23.png";
import cottage_rental from "../assets/cottage_rental.png";
import eventBooking from "../assets/eventBooking.png";
import red_district from "../assets/red-district.png";
import champange from "../assets/champange.mp4";
import amaarae from "../assets/amaarae.png";
import { FiFigma } from "react-icons/fi";
import {
  FaCss3,
  FaHtml5,
  FaJs,
  FaNodeJs,
  FaReact,
  FaTelegram,
} from "react-icons/fa";
import { SiAdobexd, SiTailwindcss } from "react-icons/si";
import { GrGatsbyjs } from "react-icons/gr";
import SwipeSlideCard from "../Components.js/SwipeSlideCard/SwipeSlideCard";

export default function Portfolio() {
  return (
    <div className="p-10 md:h-screen">
      <h3 className="text-xl font-bold text-center text-blue-400 md:text-4xl md-8 ">
        Portfolio
      </h3>
      <div className="grid items-center justify-center grid-cols-1 md:grid-cols-2">
        <div>
          <h3 className="font-semibold text-center text-white md:text-xl md-8 ">
            Front-End Dev
          </h3>
          <Swiper
            effect={"cards"}
            grabCursor={true}
            modules={[EffectCards]}
            className="w-2/3 mySwiper h-2/3"
          >
            <SwiperSlide className="flex items-center justify-center rounded-xl">
              <SwipeSlideCard
                picture={aims}
                stack={[<FaReact />, <FaCss3 />, <FaJs />, <SiTailwindcss />]}
                title="Inventory Management System"
                description="This project was developed to aid Agro Dealer Retailers and Distributors manage their inventory and sales. The users (Agro Dealer Retailers and Distributors ) are to access the application via the mobile application.On the mobile application , they are allowed to manage their various outlets,"
              />
            </SwiperSlide>
            <SwiperSlide className="flex items-center justify-center rounded-xl">
              <SwipeSlideCard
                picture={incu}
                stack={[<FaHtml5 />, <FaCss3 />, <FaJs />, <SiTailwindcss />]}
                title="Incubator and Accelerator"
                description="We the developed a web application for students, facilitators and IESO Administrators . Students we allowed to receive announcement from facilitators, get assignments , get access to their facilitator contact and react out to them. They were also able to view the course outline, material "
              />
            </SwiperSlide>
            <SwiperSlide className="flex items-center justify-center rounded-xl">
              <SwipeSlideCard
                picture={credit}
                stack={[<FaReact />, <FaCss3 />, <FaJs />, <SiTailwindcss />]}
                title="Credit and Guarantee Risk Management"
                description="This project was made to help credit guarantee companies and financial institutions make guided decisions when providing credit for members of the agricultural value chain. the system allowed for user to get scores based on set scoring metrics with guided machine learning algorithms . These score "
              />
            </SwiperSlide>
            <SwiperSlide className="flex items-center justify-center rounded-xl">
              <SwipeSlideCard
                picture={ball}
                stack={[<FaReact />, <FaCss3 />, <FaJs />, <SiTailwindcss />]}
                title="Motivational 8 Ball"
                description="This project was made to test mimic the 8 ball and get a random motivational quote for the user."
              />
            </SwiperSlide>
          </Swiper>
        </div>
        <div>
          <h3 className="text-xl font-semibold text-center text-white md-8 ">
            UI/UX
          </h3>

          <Swiper
            effect={"cards"}
            grabCursor={true}
            modules={[EffectCards]}
            className="w-2/3 mySwiper h-2/3"
          >
            <SwiperSlide className="flex items-center justify-center h-full rounded-xl">
              <SwipeSlideCard
                picture={cottage_rental}
                stack={[<FiFigma />]}
                title="Woods Cottage Rental"
                description="This prototype was created to show a basic hotel or guest house room reservation system. The user can view the room, book a room and pay for the room as well as other ammenities. The user can also cancel the reservation and pay for the room as well as other amenities and events the business has to offer."
              />
            </SwiperSlide>
            <SwiperSlide className="flex items-center justify-center h-full rounded-xl">
              <SwipeSlideCard
                picture={eventBooking}
                title="Event Booking Website"
                stack={[<FiFigma />]}
                description="This prototype was created to show a basic event booking system. Users can upload events and mode of payment. Clients users can view the event, book an event and pay for the event as well as other amenities. The user can also cancel"
              />
            </SwiperSlide>

            <SwiperSlide className="flex items-center justify-center rounded-xl">
              <SwipeSlideCard
                picture={amaarae}
                title="Musician Website"
                stack={[<SiAdobexd />]}
                description="Musician website was created to show bio and portfolio of Amaarae (a ghanaian musician ). The user can view the  artiste, videos and photos. The user can also contact the artiste."
              />
            </SwiperSlide>
            <SwiperSlide className="flex items-center justify-center rounded-xl">
              <SwipeSlideCard
                picture={concert23}
                stack={[<FiFigma />]}
                title="Concert Website"
                description="This prototype was created to show a basic concert booking system. Users can upload events and mode of payment. Clients users can view the event, book an event and pay for the event as well as other amenities. The user can also cancel"
              />
            </SwiperSlide>
            <SwiperSlide className="flex items-center justify-center rounded-xl">
              <SwipeSlideCard
                video={champange}
                title="Champagne Company Website"
                stack={[<SiAdobexd />]}
                description=" This prototype was created to show a basic company website. The user can view the company, products and services. The user can also contact the company."
              />
            </SwiperSlide>
            <SwiperSlide className="flex items-center justify-center rounded-xl">
              <SwipeSlideCard
                picture={red_district}
                title="Urban Designer Wear Website"
                stack={[<FiFigma />]}
                description="This prototype was created to show a basic hotel or guest house room reservation system. The user can view the room, book a room and pay for the room as well as other ammenities. The user can also cancel the reservation and pay for the room as well as other amenities and events the business has to offer."
              />
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
    </div>
  );
}
