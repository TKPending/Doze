"use client";

import ContactClient from "@/util/clients/contactClient";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

const ContactPage = () => {
  const [messageSent, setMessageSent] = useState(false);
  const [contactForm, setContactForm] = useState({});
  const router = useRouter();

  const handleValueChange = (e) => {
    const valueName = e.target.name;
    const value = e.target.value;

    setContactForm((prevContactForm) => ({
      ...prevContactForm,
      [valueName]: value,
    }));
  };

  const submitMessage = async (e) => {
    e.preventDefault();
    const response = await ContactClient.sendMessage(contactForm);

    if (!response.success) {
        console.log(response.error);
    }

    setMessageSent(true);
  };

  useEffect(() => {
    if (messageSent) {
      setTimeout(() => {
        setMessageSent(false);
        router.push("/");
      }, 2000);
    }
  }, [messageSent]);

  return (
    <div className="w-screen flex-col h-full flex items-center justify-center lg:px-40 md:px-10 px-5 py-">
      {/* Contact Text */}
      <div className="text-center mt-[8%] w-1/2">
        <h1 className="mb-6 text-4xl tracking-tight font-extrabold">
          Contact <span className="text-indigo-600">Us</span>
        </h1>
        <p className="mb-8 lg:mb-16 font-light text-center text-gray-500 dark:text-gray-600 sm:text-xl">
          Got a technical issue? Want to send feedback about a feature? Need
          more details from the{" "}
          <span className="text-indigo-600 font-bold">Doze</span> team?{" "}
          <span className="text-indigo-600 font-bold">Let us know.</span>
        </p>
      </div>

      {/* Form */}
      <form
        onSubmit={submitMessage}
        className="h-full w-3/4 mt-2 my-8 flex flex-col gap-8"
      >
        {/* Name */}
        <div className="flex flex-col gap-2 items-start justify-center">
          <label for="" className="text-indigo-600 font-bold text-xl">
            Name
          </label>
          <input
            type="text"
            className="w-full h-12 border border-indigo-600 border-2 rounded-lg px-4 outline-none"
            name="name"
            placeholder="Let us know your name"
            onChange={(e) => handleValueChange(e)}
            required
          />
        </div>

        {/* Email */}
        <div className="flex flex-col gap-2 items-start justify-center">
          <label for="" className="text-indigo-600 font-bold text-xl">
            Email
          </label>
          <input
            type="email"
            className="w-full h-12 border border-indigo-600 border-2 rounded-lg px-4 outline-none"
            placeholder="doze@example.com"
            name="email"
            onChange={handleValueChange}
            required
          />
        </div>

        {/* Subject */}
        <div className="flex flex-col gap-2 items-start justify-center">
          <label for="" className="text-indigo-600 font-bold text-xl">
            Subject
          </label>
          <input
            type="text"
            className="w-full h-12 border border-indigo-600 border-2 rounded-lg px-4 outline-none"
            name="subject"
            placeholder="Let us know how we can help you"
            onChange={handleValueChange}
            required
          />
        </div>

        {/* Description */}
        <div className="flex flex-col gap-2 mb-4 items-start justify-center">
          <label for="" className="text-indigo-600 font-bold text-xl">
            Your Message
          </label>
          <input
            type="textarea"
            className="w-full text-start min-h-[200px] border border-indigo-600 border-2 rounded-lg px-4 outline-none"
            name="message"
            placeholder="Leave a message"
            onChange={handleValueChange}
            required
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          className={`max-w-[30%] h-16 font-bold ${messageSent ? "bg-green-500" : "hover:bg-white hover:text-indigo-600 hover:border hover:border-indigo-600 bg-indigo-600"} text-white py-3 px-5 text-center rounded-lg`}
        >
          {messageSent ? "Message Sent" : "Send message"}
        </button>
      </form>
    </div>
  );
};

export default ContactPage;
