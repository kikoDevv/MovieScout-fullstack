import React from "react";
import Image from "next/image";
import styles from "./contact.module.css";
import { IoMdSend } from "react-icons/io";

export default function Contact() {
  return (
    <div>
      <section className="min-h-screen grid bg-gradient-to-br from-gray-900 via-slate-900 to-slate-800 lg:px-30">
        <section className="relative flex flex-col lg:flex-row h-auto lg:h-170 mx-4 sm:mx-8 md:mx-20 lg:mx-8 mt-10 lg:mt-20 mb-10 lg:mb-50 rounded-2xl lg:rounded-4xl overflow-hidden shadow-2xl shadow-black/40 border border-amber-50/20 mb-40">
          <section className="w-full lg:w-[40%] relative overflow-hidden min-h-[300px] lg:min-h-0">
            <div className="absolute top-0 right-0 w-48 md:w-72 h-48 md:h-72 bg-purple-500/20 rounded-full blur-2xl -translate-y-20 translate-x-20 will-change-transform"></div>
            {/*--------- left container ----------*/}
            <Image
              src="/seat.jpg"
              alt="Cinema seats image not found"
              className="object-cover opacity-20"
              fill
              priority
              quality={75}
            />
            <div className={styles.phoneContainer}>
              <Image
                src="/phone.png"
                alt="Phone image not found"
                className={styles.phoneImage}
                fill
                priority
                quality={100}
              />
            </div>
          </section>

          {/*--------- right container ----------*/}
          <section className={styles.containerRight}>
            <div className="grid gap-4 md:gap-6 p-6 md:p-8 lg:p-10 h-full text-white select-none">
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 md:mb-6 lg:mb-8 bg-gradient-to-r from-white via-purple-700 to-blue-700 bg-clip-text text-transparent place-self-center">
                Contact Form
              </h1>
              <input
                type="text"
                placeholder="Enter Your Name"
                className="px-4 py-2 rounded-lg border bg-white/10 border-white/20 text-white placeholder-white/50 outline-none focus:border-white/40 transition-colors h-fit"
              />
              <input
                type="email"
                placeholder="Enter Your Email Adress"
                className="px-4 py-2 rounded-lg border bg-white/10 border-white/20 text-white placeholder-white/50 outline-none focus:border-white/40 transition-colors h-fit"
              />
              <input
                type="tel"
                placeholder="Enter Your Phone Number"
                pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                title="Phone number format: XXX-XXX-XXXX"
                className="px-4 py-2 rounded-lg border bg-white/10 border-white/20 text-white placeholder-white/50 outline-none focus:border-white/40 transition-colors h-fit"
              />
              <div>
                <p className="ml-2">Leave your feedback</p>
                <textarea
                  placeholder="What do you have in mind?"
                  className="rounded-lg border bg-white/10 border-white/20 text-white placeholder-white/50 outline-none focus:border-white/40 transition-colors w-full p-4 min-h-[150px] align-top resize-none"></textarea>
              </div>
              <button className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-purple-600 py-2 px-4 rounded-full cursor-pointer group hover:scale-105 transition-all duration-200 w-fit h-fit place-self-center">
                <div className="absolute inset-0 bg-gradient-to-l from-blue-600 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <span className="relative flex items-center gap-2">
                  Submit
                  <IoMdSend className="w-5 h-5" />
                </span>
              </button>
              <div></div>
            </div>
          </section>
        </section>
      </section>
    </div>
  );
}
