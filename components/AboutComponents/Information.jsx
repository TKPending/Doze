"use client";
import Image from 'next/image';
import DozeSnapshot from "../../public/DozeSnapshot.png";
import DozeWindow from "../../public/DozeWindow.png";
import { useContext } from "react";
import { Context } from "../ContextUser";



const Information = () => {
    const { user } = useContext(Context);

  return (
    <div className="w-screen h-full flex justify-center items-center flex-col">
       
       {/* Doze Concept / Overview */}
       <h2 className="md:text-5xl lg:text-5xl text-3xl font-bold mt-24">Introducing <span className="text-indigo-600">Doze</span></h2>
        <div className="flex lg:flex-row flex-col items-center justify-around px-5 my-24">
            
        <p className="mx-6 lg:w-1/2 w-full md:text-lg lg:text-lg text-base p-6 md:text-left lg:text-left text-center">Doze was created based on a 12-week goal concept, which allows you to achieve long-term objectives through short-term, focused implementation. It empowers users to set their goals and break them down into manageable sub-tasks, providing a clear path to success.</p>

        <Image
        src={DozeSnapshot}
        alt="Image of Doze sub task dashboard"
        className="shadow-xl overflow-hidden lg:w-1/2 w-full h-full mx-6"
        width={1280}
        height={720} />
        </div>

        {/* Mission Statement */}
        <div className="flex items-center justify-around lg:flex-row flex-col  px-5 my-24">
            <h2 className="md:text-5xl lg:text-5xl text-3xl font-bold">Our <span className="text-indigo-600">Mission</span></h2>
        <p className="lg:w-1/2 w-full text-lg p-6 md:text-left lg:text-left text-center">At Doze, our mission is to empower you to achieve your goals. With our 12-week goal focus, intuitive interface, customisable tasks, and progress tracking features,
            we aim to support you every step of the way. By breaking down your goals into sub tasks, we help you boost productivity and improve time management.
            </p>
            </div>



    {/* Features */}
        <div className="mb-24 flex justify-between flex-col-reverse gap-10 lg:flex-row items-center px-5">
            <div className="mockup-window border bg-base-300 lg:mx-6 md:w-3/4 h-auto">
  <div className="flex justify-center bg-base-200"><Image src={DozeWindow}
  className="w-full h-full"
  alt="Image of Doze Dashboard"
  width={1280}
  height={720} /></div>
            </div>
           <div className="mx-6">
        <h2 className="md:text-5xl lg:text-5xl text-3xl font-bold text-center mb-5"><span className="text-indigo-600">Doze </span>Features</h2>
        <li className="list-disc text-lg font-semibold text-indigo-600">12 Week Goal Focus</li>
        <p className="p-1 ">Set your goals for the next 12 weeks, ensuring focused and achievable targets.</p>
        <li className="list-disc text-lg font-semibold text-indigo-600">Intuitive Interface</li>
        <p className="p-1 ">Enjoy a user-friendly interface designed for seamless navigation and effortless task management.</p>
        <li className="list-disc text-lg font-semibold text-indigo-600">Customisable Tasks</li>
        <p className="p-1 ">Tailor you tasks to suit your needs and preferences, maximising efficiency.</p>
        <li className="list-disc text-lg font-semibold text-indigo-600">Progress Tracking</li>
        <p className="p-1 ">Monitor your progress towards your goals in real-time, staying motivated and on track.</p>
        </div>
         </div>

    {/* Developer Information */}
        <div>
            <h2 className="md:text-5xl lg:text-5xl text-3xl font-bold text-center">The <span className="text-indigo-600">Team</span> Behind <span className="text-indigo-600">Doze</span></h2>
            <div className="flex md:flex-col justify-center items-center mx-5 px-4 lg:flex-row flex-col gap-4 my-16 w-screen">
            <div className="card w-5/6 bg-base-100 shadow-xl">
  <div className="card-body">
    <h2 className="card-title">Ilona Beshchuk</h2>
    <p className="md:text-lg lg:text-lg text-sm font-semibold">Full-Stack Developer</p>
    <p className="md:text-base lg:text-base text-sm pb-6 md:pb-20">Ilona is a skilled full-stack developer who played a pivotal role in implementing features accross the entire stack. She worked closely with the team to ensure seamless integration between the front-end and back-end components.</p>
    <div className="card-actions justify-end">
    <a href="mailto:ilona.b.mail@gmail.com" className="btn btn-primary bg-indigo-600"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-mail"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg></a>
      <a href="https://github.com/illonab" target="_blank" className="btn btn-primary bg-indigo-600"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-github"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg></a>
    </div>
  </div>
</div>
<div className="card w-5/6 bg-base-100 shadow-xl">
  <div className="card-body">
    <h2 className="card-title">Tony Koke</h2>
    <p className="md:text-lg lg:text-lg text-sm font-semibold">Scrum Master & Full-Stack Developer</p>
    <p className="md:text-base lg:text-base text-sm lg:pb-12 pb-6">Tony assumed the role of Scrum Master, facilitating agile practices and ensuring the team's productivity and collaboration. Additionally, he contributed to both front-end and back-end development, leveraging his expertise to tackle technical challenges effectively.</p>
    <div className="card-actions justify-end">
    <a href="mailto:tony-koke@outlook.com" className="btn btn-primary bg-indigo-600"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-mail"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg></a>
      <a href="https://github.com/TKPending" target="_blank" className="btn btn-primary bg-indigo-600"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-github"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg></a>
    </div>
  </div>
</div>
<div className="card w-5/6 bg-base-100 shadow-xl">
  <div className="card-body">
    <h2 className="card-title">Sophie Woodcock</h2>
    <p className="md:text-lg lg:text-lg text-sm font-semibold">Full-Stack Developer</p>
    <p className="md:text-base lg:text-base text-sm pb-6 md:pb-20">Sophie is a versatile developer with experience in both front-end and back-end technologies. She contributed to various aspects of the project, focusing on creating intuitive user interfaces and robust backend functionalities.</p>
    <div className="card-actions justify-end">
    <a href="mailto:szoph101@hotmail.co.uk" className="btn btn-primary bg-indigo-600"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-mail"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg></a>
      <a href="https://github.com/Szoph" target="_blank" className="btn btn-primary bg-indigo-600"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-github"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg></a>
    </div>
  </div>
</div>
            </div>
        </div>

       {/* Call to Action */}
        <div>
            <h2 className="md:text-5xl lg:text-5xl text-3xl text-center font-bold">Ready to take control of your <span className="text-indigo-600">goals?</span></h2>
            <div className="my-10 flex justify-center">
            <ul className="steps steps-vertical lg:steps-horizontal">
                <li className="step step-primary font-semibold">Create Account</li>
                <li className="step step-primary font-semibold">Log In</li>
                <li className="step step-primary font-semibold">Create Goals</li>
                <li className="step step-primary font-semibold">Create Sub Tasks</li>
                <li className="step step-primary font-semibold">Achieve</li>
            </ul>
        </div>
            <h2 className="md:text-5xl lg:text-5xl text-3xl text-center font-bold my-16">Try out <span className="text-indigo-600">Doze</span> now!</h2>
            <div className="flex justify-center items-center gap-5 mb-24">
                {/* Dashboard Link or Sign In/Sign Up Link based on weather user is signed in or not */}
                {user ? (
                    <a href="/dashboard" className="btn btn-primary bg-indigo-600">Get Started</a>
                ) : (
                    <>
                    <a href="/signin" className="btn btn-primary bg-indigo-600">Sign In</a>
            <a href="/signup" className="btn btn-primary bg-indigo-600">Sign Up</a>
            </>
                )}
            
            </div>
        </div>
    </div>
  )
}

export default Information