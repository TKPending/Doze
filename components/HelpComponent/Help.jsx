import React from 'react'
import Image from 'next/image';
import AddingMainGoal from '../../public/AddingMainGoal.png';
import NewSubGoal from '../../public/NewSubGoal.png';
import AddSubFromMain from '../../public/AddSubFromMain.png';
import CustomiseDashboard from '../../public/CustomiseDashboard.png';
import Profile from '../../public/Profile.png';


const HelpComponent = () => {
  return (
    <div className="w-full h-full">
     <div className="w-screen h-full flex justify-center items-center flex-col p-2.5 pt-24 pb-48">

    {/* Help Hero Section */}

       <div className="flex p-6 flex-col bg-white bg-opacity-75 pb-44 w-screen h-full justify-center items-center">
    <h2 className="lg:text-7xl md:text-6xl text-5xl text-gray-800 font-bold mb-5 text-center"><span className="text-indigo-600">Doze</span> Help Center</h2>
        <h2 className="lg:text-3xl md:text-2xl text-2xl font-medium pb-14">We're <span className="text-indigo-600">here</span> to help.</h2>
        <div className="flex lg:flex-row md:flex-row flex-col gap-3">
        <a href="#concept"><div className="btn btn-outline btn-primary text-indigo-600 hover:bg-indigo-600 outline-indigo-600">12 Week Goals</div></a>
        
        <a href="#set-goals"><div className="btn btn-outline btn-primary text-indigo-600 hover:bg-indigo-600 outline-indigo-600">Setting Goals</div></a>
        <a href="#dashboard-customisation"><div className="btn btn-outline btn-primary text-indigo-600 hover:bg-indigo-600 outline-indigo-600">Customise Dashboard</div></a>
        <a href="#profile"><div className="btn btn-outline btn-primary text-indigo-600 hover:bg-indigo-600 outline-indigo-600">Edit Profile</div></a>
       </div>
       </div>


    
    {/* 12 Week Goal Concept */}
    <div id="concept" className="flex items-center justify-center w-screen">
       <div className="flex items-center justify-center flex-col md:w-3/4 lg:w-3/4 w-full">
        <h2 className="md:text-5xl lg:text-5xl text-3xl font-bold mt-24 text-center">What is the <span className="text-indigo-600">12 week goal</span> concept?</h2>
        <p className="lg:text-lg md:text-lg text-base p-6 text-center">The 12 week goal concept is a strategic framework for goal setting and achievement that focuses on breaking down long term objectives into shorter, more manageable timeframes.
            Instead of setting yearly resolutions or indefinite goals, the 12 week goal concept encourages individuals to set specific, measurable targets to be achieved within a 12 week period. By narrowing the focus to a 12 week timeframe, individuals can maintain a high level of intensity and concentration on their goals, leading to greater productivity and progress.
        </p>
        <div>
        <h2 className="text-3xl font-bold pb-5 text-center">Benefits of the <span className="text-indigo-600">12 Week Goal </span>Concept</h2>
        <li className="lg:text-lg md:text-lg text-base font-semibold text-center">Increased Focus and Productivity</li>
        <li className="lg:text-lg md:text-lg text-base font-semibold text-center">Clearer Goal Setting and Measurement</li>
        <li className="lg:text-lg md:text-lg text-base font-semibold text-center">Greater Adaptability and Flexibility</li>
        <li className="lg:text-lg md:text-lg text-base font-semibold text-center">Enhanced Accountability and Motivation</li>
        </div>
        </div>
        </div>
    

{/* How to set goals */}
<div id="set-goals" className="flex items-center justify-center w-screen mt-44">
       <div className="flex items-center justify-center flex-col md:w-3/4 lg:w-3/4 w-full">
        <h2 className="md:text-5xl lg:text-5xl text-3xl font-bold">How do I set my <span className="text-indigo-600">goals?</span></h2>
        <h2 className="text-3xl font-bold text-center">Adding <span className="text-indigo-600">Main Goals</span></h2>
        <div className="flex flex-col justify-center items-center lg:px-20 md:px-10 px-5 w-screen">
        <p className="lg:text-lg md:text-lg text-base p-6 text-center  lg:w-2/3 md:w-2/3 w-full mb-4">From the dashboard, adding main goals is as simple as clicking a button. It will take you to the next page where you can change information of your new main goal such as title, status, icon, tags and description.
        Once your main goal is created, click on the main goal title to edit, or click on the red delete button to delete. The bar next to the main goal indicates the progress for that goal, and this will update when the sub tasks' status is changed.</p>
        <Image
        src={AddingMainGoal}
        alt="Add Main Goal button"
        width={1280}
        height={720}
        className="overflow-hidden w-96 h-44 border border-indigo-600 rounded-md mb-4"
        />
        </div>
        <h2 className="text-3xl font-bold text-center mt-8 mb-2.5">Adding <span className="text-indigo-600">Sub Tasks</span></h2>
        <div className="flex flex-col justify-center items-center w-screen lg:px-20 md:px-10 px-5">
        <div className="lg:w-2/3 md:w-2/3 w-full">
        <p className="text-center font-semibold text-lg text-indigo-600">Click on the 'New Sub Task' button on the board in the dashboard.</p>
        <p className="lg:text-lg md:text-lg text-base p-6 text-center">Clicking this button will open up the sub task form. Here you can set information for the sub task much like the main goal, such as title, status, icon, tags and description. There is also a dropdown to select the main goal this task will be connected to.</p>
        <p className="text-center font-semibold text-lg text-indigo-600">Click on the 'New Sub Task' button in the main goal editor.</p>
        <p className="lg:text-lg md:text-lg text-base p-6 text-center">Clicking this button in the main goal editor will open up the same sub task form where you can set the information. The main goal will default to the main goal that is currently being edited.</p>
        </div>
        <div className="flex md:flex-row lg:flex-row flex-col justify-center items-center w-screen gap-5">
        <Image
        src={NewSubGoal}
        alt="Add Sub Task from Dashboard"
        width={1280}
        height={720}
        className="overflow-hidden md:h-64 md:w-56 lg:h-64 lg:w-56 h-52 w-44 rounded-md border border-indigo-600"
        /><Image
        src={AddSubFromMain}
        alt="Add Sub Task from Main Goal"
        width={1280}
        height={720}
        className="overflow-hidden md:h-64 md:w-60 lg:h-64 lg:w-60 h-52 w-56 rounded-md border border-indigo-600"
        />
        </div>
        </div>
        </div>
        </div>



        {/* Customise Dashboard */}
        <div id="dashboard-customisation" className="flex items-center justify-center w-screen mt-44">
       <div className="flex items-center justify-center flex-col md:w-3/4 lg:w-3/4 w-full">
        <h2 className="md:text-5xl lg:text-5xl text-3xl font-bold text-center">How do I <span className="text-indigo-600">customise</span> my dashboard?</h2>
        <div className="flex flex-col justify-center items-center lg:px-20 md:px-10 px-5 w-screen">
        <p className="lg:text-lg md:text-lg text-base p-6 text-center  lg:w-2/3 md:w-2/3 w-full mb-4">On the dashboard, you are able to add some customisation to make it feel more personal. By clicking on the dashboard top, you can change the title of the dashboard, add an inspirational quote and add a picture using the url of the picture.</p>
        <Image
        src={CustomiseDashboard}
        alt="Customising dashboard title, quote and image"
        width={1280}
        height={720}
        className="overflow-hidden w-96 h-28 border border-indigo-600 rounded-md mb-4"
        />
        </div>
        </div>
        </div>

           
           {/* Change email and password */}
           <div id="profile" className="flex items-center justify-center w-screen mt-44">
       <div className="flex items-center justify-center flex-col md:w-3/4 lg:w-3/4 w-full">
        <h2 className="md:text-5xl lg:text-5xl text-3xl font-bold text-center">How do I change my <span className="text-indigo-600">email</span> and <span className="text-indigo-600">password?</span></h2>
        <div className="flex flex-col justify-center items-center lg:px-20 md:px-10 px-5 w-screen">
        <p className="lg:text-lg md:text-lg text-base p-6 text-center  lg:w-2/3 md:w-2/3 w-full mb-4">By navigating to the profile page from the navigation bar, you can change your email, password and username. All you need is your previous email or password, and then you can set a new one. There is also an option to delete your account here, although we hope you don't need it.</p>
        <Image
        src={Profile}
        alt="Customising dashboard title, quote and image"
        width={1280}
        height={720}
        className="overflow-hidden w-96 h-80 border border-indigo-600 rounded-md mb-4"
        />
        </div>
        </div>
        </div>

{/* Further questions */}
<div id="profile" className="flex items-center justify-center w-screen mt-44">
       <div className="flex items-center justify-center flex-col md:w-3/4 lg:w-3/4 w-full">
        <h2 className="md:text-5xl lg:text-5xl text-3xl font-bold text-center">If you have any other <span className="text-indigo-600">questions</span></h2>
        <h2 className="text-3xl font-bold text-center mt-8 mb-5">Please let us know, we're  <span className="text-indigo-600">happy to help</span></h2>
        <a href="/contact"><div className="btn btn-primary bg-indigo-600">Contact Us</div></a>

        </div>
        </div>
        
       </div>
       </div>

  )
}

export default HelpComponent