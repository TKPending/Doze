"use client";

import Image from "next/image";
import HeroDesktop from "../public/DozeWindow.png";
import HeroMobile from "../public/DozePhone.png"
import Link from "next/link";
export default function Home() {
  return (
    <main>
      <section className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            It is time to achieve your goals
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Doze simplifies goal management, allowing users to effortlessly set,
            organize, and track progress for a more engaging and organized goal
            pursuit experience.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link
              href="/dashboard"
              className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Set your goals
            </Link>
            <a
              href="/about"
              className="text-sm font-semibold leading-6 text-gray-900"
            >
              Learn more <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      </section>

      <section className="overflow-hidden bg-white py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
            <div className="lg:pr-8 lg:pt-4">
              <div className="lg:max-w-lg">
                <h2 className="text-base font-semibold leading-7 text-indigo-600">
                  Achieve your goals
                </h2>
                <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                  What sets Doze apart
                </p>
                <p className="mt-6 text-lg leading-8 text-gray-600">
                  Doze is a task management tool. It's innovative approach is centered around a 12-week goal concept. Unlike traditional task managers, Doze doesn't just focus on day-to-day tasks; it encourages users to set overall goals for a defined period.
                  With the ability to create main goals and break them down into manageable subtasks, Doze empowers users to tackle their goals more effectively. 
                </p>
                <div className="mt-10 max-w-xl space-y-8 text-base leading-7 text-gray-600 lg:max-w-none">
                  <div className="pl-4">
                    <dt className="font-bold text-indigo-600 flex items-center gap-1">
                      <svg
                        className="w-5 h-5"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M14 19.2857L15.8 21L20 17M16.5 14.4018C16.2052 14.2315 15.8784 14.1098 15.5303 14.0472C15.4548 14.0337 15.3748 14.024 15.2842 14.0171C15.059 14 14.9464 13.9915 14.7961 14.0027C14.6399 14.0143 14.5527 14.0297 14.4019 14.0723C14.2569 14.1132 13.9957 14.2315 13.4732 14.4682C12.7191 14.8098 11.8817 15 11 15C10.1183 15 9.28093 14.8098 8.52682 14.4682C8.00429 14.2315 7.74302 14.1131 7.59797 14.0722C7.4472 14.0297 7.35983 14.0143 7.20361 14.0026C7.05331 13.9914 6.94079 14 6.71575 14.0172C6.6237 14.0242 6.5425 14.0341 6.46558 14.048C5.23442 14.2709 4.27087 15.2344 4.04798 16.4656C4 16.7306 4 17.0485 4 17.6841V19.4C4 19.9601 4 20.2401 4.10899 20.454C4.20487 20.6422 4.35785 20.7951 4.54601 20.891C4.75992 21 5.03995 21 5.6 21H10.5M15 7C15 9.20914 13.2091 11 11 11C8.79086 11 7 9.20914 7 7C7 4.79086 8.79086 3 11 3C13.2091 3 15 4.79086 15 7Z"
                          stroke="#5A67D8"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      Goal-Focused Approach
                    </dt>
                    <dd>
                      Doze understands that personal goals can be daunting. We
                      want to help you break them down effortlessly by adding
                      sub-tasks, giving you a clear roadmap for success.
                    </dd>
                  </div>
                  <div className="pl-4">
                    <dt className="font-bold text-indigo-600 flex items-center gap-1">
                      <svg
                        className="w-5 h-5"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M14 19.2857L15.8 21L20 17M16.5 14.4018C16.2052 14.2315 15.8784 14.1098 15.5303 14.0472C15.4548 14.0337 15.3748 14.024 15.2842 14.0171C15.059 14 14.9464 13.9915 14.7961 14.0027C14.6399 14.0143 14.5527 14.0297 14.4019 14.0723C14.2569 14.1132 13.9957 14.2315 13.4732 14.4682C12.7191 14.8098 11.8817 15 11 15C10.1183 15 9.28093 14.8098 8.52682 14.4682C8.00429 14.2315 7.74302 14.1131 7.59797 14.0722C7.4472 14.0297 7.35983 14.0143 7.20361 14.0026C7.05331 13.9914 6.94079 14 6.71575 14.0172C6.6237 14.0242 6.5425 14.0341 6.46558 14.048C5.23442 14.2709 4.27087 15.2344 4.04798 16.4656C4 16.7306 4 17.0485 4 17.6841V19.4C4 19.9601 4 20.2401 4.10899 20.454C4.20487 20.6422 4.35785 20.7951 4.54601 20.891C4.75992 21 5.03995 21 5.6 21H10.5M15 7C15 9.20914 13.2091 11 11 11C8.79086 11 7 9.20914 7 7C7 4.79086 8.79086 3 11 3C13.2091 3 15 4.79086 15 7Z"
                          stroke="#5A67D8"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      User-Friendly Interface
                    </dt>
                    <dd>
                      Creating your tasks shouldn’t be a task itself. Doze will
                      let you easily add, customize and organize tasks without
                      the hassle
                    </dd>
                  </div>
                  <div className="pl-4">
                    <dt className="font-bold text-indigo-600 flex items-center gap-1">
                      <svg
                        className="w-5 h-5"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M14 19.2857L15.8 21L20 17M16.5 14.4018C16.2052 14.2315 15.8784 14.1098 15.5303 14.0472C15.4548 14.0337 15.3748 14.024 15.2842 14.0171C15.059 14 14.9464 13.9915 14.7961 14.0027C14.6399 14.0143 14.5527 14.0297 14.4019 14.0723C14.2569 14.1132 13.9957 14.2315 13.4732 14.4682C12.7191 14.8098 11.8817 15 11 15C10.1183 15 9.28093 14.8098 8.52682 14.4682C8.00429 14.2315 7.74302 14.1131 7.59797 14.0722C7.4472 14.0297 7.35983 14.0143 7.20361 14.0026C7.05331 13.9914 6.94079 14 6.71575 14.0172C6.6237 14.0242 6.5425 14.0341 6.46558 14.048C5.23442 14.2709 4.27087 15.2344 4.04798 16.4656C4 16.7306 4 17.0485 4 17.6841V19.4C4 19.9601 4 20.2401 4.10899 20.454C4.20487 20.6422 4.35785 20.7951 4.54601 20.891C4.75992 21 5.03995 21 5.6 21H10.5M15 7C15 9.20914 13.2091 11 11 11C8.79086 11 7 9.20914 7 7C7 4.79086 8.79086 3 11 3C13.2091 3 15 4.79086 15 7Z"
                          stroke="#5A67D8"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      Progress Tracking
                    </dt>
                    <dd>
                      Stay motivated by tracking your long-term goals. See your
                      progress when your tasks are moved from “In progress” to
                      “Completed” with just a glance.
                    </dd>
                  </div>
                </div>
              </div>
            </div>
            <div className="lg:hidden">
              <Image
                src={HeroMobile}
                alt="Mobile Product screenshot"
                className="w-[32rem] max-w-screen rounded-xl shadow-xl ring-1 ring-gray-400/10 sm:w-[40rem]"
                href="/signup"
                width={1616}
                height={955}
              />
            </div>

            {/* Desktop Hero Image (Hidden on smaller screens) */}
            <div className="hidden lg:block">
              <Image
                src={HeroDesktop}
                alt="Desktop Product screenshot"
                className="w-[48rem] max-w-none rounded-xl shadow-xl ring-1 ring-gray-400/10 sm:w-[57rem] md:-ml-4 lg:-ml-0"
                width={2432}
                height={1442}
              />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
