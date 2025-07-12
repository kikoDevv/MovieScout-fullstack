import React from "react";
import Image from "next/image";
import styles from "./contact.module.css";

export default function Contact() {
  return (
    <div>
      <section className="min-h-screen grid bg-gradient-to-br from-gray-900 via-slate-900 to-slate-800">
        <section className="relative flex h-170 mx-50 mt-20 mb-30 rounded-4xl overflow-hidden shadow-2xl shadow-black/40">
          <section className="w-[40%] bg-gradient-to-br from-blue-600 via-indigo-700 to-purple-800 relative overflow-hidden">
            {/*--------- left container ----------*/}
            {/* <Image
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
            </div> */}
          </section>

          {/*--------- right container ----------*/}
          <section className={styles.containerRight}>
            <div className="grid p-10 h-full text-white select-none">
              <h1 className="text-4xl font-bold mb-8 bg-gradient-to-r from-white via-purple-700 to-blue-700 bg-clip-text text-transparent place-self-center">Contact Form</h1>
              <input
                type="text"
                placeholder="Enter your name"
                className="px-4 py-2 rounded-lg border bg-white/10 border-white/20 text-white placeholder-white/50 outline-none focus:border-white/40 transition-colors h-fit"
              />
              <input
                type="text"
                placeholder="Enter your name"
                className="px-4 py-2 rounded-lg border bg-white/10 border-white/20 text-white placeholder-white/50 outline-none focus:border-white/40 transition-colors h-fit"
              />
              <input
                type="text"
                placeholder="Enter your name"
                className="px-4 py-2 rounded-lg border bg-white/10 border-white/20 text-white placeholder-white/50 outline-none focus:border-white/40 transition-colors h-fit"
              />
              <div>
                <p className="ml-2">Leave your feedback</p>
                <input
                type="text"
                placeholder="What do you have in mind?"
                className="rounded-lg border bg-white/10 border-white/20 text-white placeholder-white/50 outline-none focus:border-white/40 transition-colors w-full py-10 pl-10 h-fit"
              />
              </div>
              <button>Submit</button>
              <div></div>
            </div>
          </section>
        </section>
      </section>
    </div>
  );
}
