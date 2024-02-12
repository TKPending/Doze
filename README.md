# **Doze**

## **Getting Started**

### **What is Doze?**

Doze is a project centered around the concept of 12 Week Goals, aiming to assist users in achieving their objectives within a 3-month period. Doze platform allows users to define main goals and break them down into sub-goals, providing a structured approach to goal setting and accomplishment.

### **Who Created Doze?**

Doze owes it’s existence to the collective efforts of three talented developers, [Illona](https://github.com/illonab), [Sophie](https://github.com/Szoph) and [Tony](https://github.com/TKPending). Each contributing their own unique skills and perspectives, to create a platform that not only meets technical demands of goal tracking. But also prioritises user experience and satisfaction. 

The Doze platform stands as a testament to their collaborative spirit, passion for development, and commitment to helping users achieve their goals effectively.

# Tech Stack

### **Brief explanation of the project technologies:**

Doze adopts a cutting-edge and streamlined tech stack to ensure a smooth and intuitive user experience. The chosen technologies encompass:

- **React (Next.js)**: Empowering the frontend with Next.js, a React framework that facilitates dynamic, responsive, and SEO-friendly user interfaces.
- **Tailwind CSS**: Enhancing styling and design with Tailwind CSS, a utility-first CSS framework that accelerates the development process.
- **Node.js & Express**: Driving server-side development, handling requests, and managing the application's logic efficiently.
- **MongoDB**: Serving as the NoSQL database, MongoDB excels in storing and managing data with scalability and flexibility.
- **Redux**: Ensuring effective state management, Redux maintains a predictable state and optimises the data flow within the application.
- **Jest:** Jest ensures efficient and reliable testing, making it an integral part of the testing toolkit for JavaScript developers.
- **SuperTest:** Enables developers to create comprehensive tests for API interactions, ensuring the correctness and reliability of the backend functionality.

### **List of technologies used and why:**

- **NextJS**: Selected for its seamless integration with React, Next.js empowers Doze with server-side rendering, improved performance, and simplified deployment.
- **Tailwind CSS**: Chosen for its utility-first approach, Tailwind CSS streamlines styling and accelerates the development of a consistent and visually appealing UI.
- **Node.js & Express**: These backend technologies were chosen for their efficiency in handling server-side operations, managing routes, and ensuring the smooth execution of the application's logic.
- **MongoDB**: As a NoSQL database, MongoDB offers flexibility and scalability, accommodating Doze's data storage and management requirements.
- **Redux**: Included for its ability to maintain a centralized state, Redux ensures a predictable data flow, making it instrumental in the management of complex application states.
- **Jest & SuperTest**: Leveraged for automated testing, Jest and SuperTest enhance Doze's code reliability and robustness by facilitating unit and integration testing.

# Github & Trello - Project Management

### **Why we used Github?**

GitHub serves as a collaborative platform for version control, facilitating team collaboration and code management. It enables developers to work on different aspects of the project simultaneously, ensuring a coherent and well-organised codebase.

### **Why we used Trello?**

Trello is employed as a project management tool, enabling efficient task tracking and team coordination. It provides a visual representation of project progress, task assignment, and helps organise development sprints.

### **How we mixed them together, used stand up meetings to organise tasks**

The project management workflow of Doze relies on a seamless integration of Github and Trello. A combination of GitHub and Trello is utilised for effective project management. GitHub manages version control and code collaboration, while Trello tracks tasks and project milestones. 

Using a Trello extension that established a direct link between Trello tasks to our Github issues, branches and pull request. This integration provides a comprehensive overview of ongoing work, contributors, and the status of each task. Regular stand-up meetings ensure clear communication and help in organising tasks based on priority and team member availability. 

# Project Folder Structure

### **Brief explanation of working in a team:**

Working in a team involves effective collaboration and organisation. The project folder structure is designed to enhance collaboration, streamline development, and maintain a clear separation of concerns.

### **Project Structure Overview:**

The Doze project adheres to a modular structure, emphasising clear organisation and efficient collaboration. Each major feature or module is allocated its dedicated folder, contributing to enhanced code readability and maintainability.

```jsx
Doze
│
├── next
│
├── app
│
├── components
│
├── public
│
├── server
│
├── .gitignore
│
├── .env
│
├── jsconfig.json
│
├── next.config.mjs
│
├── package-lock.json
│
├── postcss.config.js
│
├── [README.md](http://readme.md/)
│
└── tailwind.config.js
```

- **next:** The **`next`** folder houses configuration files and settings for the Next.js framework, providing server-side rendering and other performance optimisations.
- **app:** The **`app`** folder contains the frontend components, ensuring a structured approach to building user interfaces and managing application states.
- **components:** This folder consolidates reusable **`components`** utilised across the application, promoting code reuse and maintainability.
- **public:** The **`public`** folder stores static assets such as images, which can be easily referenced in the application.
- **server:** The **`server`** folder encompasses the backend logic, utilising Node.js and Express for server-side development.
- **.gitignore:** The **`.gitignore`** file specifies files and directories to be ignored by version control, preventing unnecessary files from being included in the repository.
- **.env:** The **`.env`** file stores environment variables, allowing secure configuration and management of sensitive information.
- **jsconfig.json:** The **`jsconfig.json`** file configures the JavaScript project settings, facilitating module resolution and path mapping.
- **next.config.mjs:** The **`next.config.mjs`** file contains configuration settings for the Next.js framework, enabling customisation and optimisation.
- **package-lock.json:** The **`package-lock.json`** file records the exact versions of installed packages, ensuring consistent dependencies across team members.
- **postcss.config.js:** The **`postcss.config.js`** file configures PostCSS, a tool for transforming styles with JavaScript plugins, enhancing the styling workflow.
- **README.md:** The **`README.md`** file serves as documentation, providing essential information about the project, its structure, and how to set it up.
- **tailwind.config.js:** The **`tailwind.config.js`** file configures Tailwind CSS, a utility-first CSS framework, to tailor the styling of the application.

This well-organised structure contributes to a collaborative and efficient development environment, facilitating seamless coordination among team members.

# UI Components

### **Explain the components and what they do?**

Doze incorporates various UI components for an intuitive and user-friendly interface. These include components for goal creation, task management, and progress tracking. Each component serves a specific purpose, contributing to the overall functionality of the application.

```jsx
components
│
├── DashboardComponents
│   ├── HeaderContainer
│   │   ├── components
│   │   │   ├── HeaderBackground.jsx
│   │   ├── HeaderContainer.jsx
│
│   ├── MainGoalsContainer
│   │   ├── components
│   │   │   ├── AddGoal.jsx
│   │   │   ├── Goal.jsx
│   ├── MainGoalsContainer.jsx
│
│   ├── SubGoalsContainer
│   │   ├── components
│   │   │   ├── AddSubGoal.jsx
│   │   │   ├── ProgressionContainer.jsx
│   │   │   ├── SmallSubGoals.jsx
│   │   │   ├── SubGoalTitleContainer.jsx
│   ├── SubGoalsContainer.jsx
│
├── MainGoalComponents
│   ├── components
│   │   ├── AddSubGoal.jsx
│   │   ├── ClearSubGoals.jsx
│   │   ├── SubGoalComponent.jsx
│   ├── MainGoal.jsx
│
├── SignInComponent
│   ├── SignIn.jsx
│
├── Footer.jsx
├── Header.jsx
```

## DashboardComponents

### HeaderContainer

### Components

### HeaderBackground.jsx

### isImage:

Takes a `string URL` as a parameter then, checks if URL includes image file types. Returns true or false based on if it includes file types.

```jsx
const isImage = (url) => {
    const imageFileType = ["jpg", "jpeg", "png", "gif", "bmp", "svg"];

    const imageType = url.split(".").pop().toLowerCase();

    return imageFileType.includes(imageType);
  };
```

### handleImageChange:

Checks if the String URL included the image file type. If True, the image is set to the background image of the header

```jsx
const handleImageChange = (e) => {
    const inputValue = e.target.value;

    if (!isImage(inputValue)) {
      setValidHeader(false);
      return;
    }

    setHeaderImage(inputValue);
    setValidHeader(true);
  };
```

Returns an element which allows user to change the background of the header container

### HeaderContainer.jsx

### handleValueChange:

Handles the live changing of the value

```jsx
const handleValueChange = (e, setValue) => {
    setValue(e.target.value);
  };
```

### handleEnterOrBlur:

Once the user presses on enter or clicks off element. It removes the focus, from that element. Also, checks if string is empty. If so, string is set to it’s default

```jsx
const handleEnterOrBlur = (e, setValue, defaultValue) => {
    e.preventDefault();
    const inputValue = e.target.value;
    
    setValue(inputValue === "" ? defaultValue : inputValue);

    setIsHeader(false);
  };
```

### handleClickOutside:

Handles removing the focus from the element. 

```jsx
const handleClickOutside = (e) => {
    if (headerRef.current && !headerRef.current.contains(e.target)) {
      setIsHeader(false);
    }
  };
```

Returns an element which displays the header section. Which includes the header image, header title and the header quote

### MainGoalsContainer

### Components

### AddGoal.jsx

### handleAddGoal

This function sends a post request to the database, which deals with adding a goal to Main Goal collection.

```jsx
const handleAddGoal = () => {
    // Code to be added
  };
```

Returns an button that displays and deals with adding Main Goals to the ‘Main Goals Page’ and database

### Goal.jsx

Functions compares the Main Goal with the Main Goals in the database. Once a match is found it sends user to the Main Goals Page, which will display more information on the Main Goal selected

```jsx
const handleGoalPressed = () => {
    // Code to be added
  };
```

Returns an element which displays the title and icon of the main goal

### MainGoalsContainer.jsx

### handleRemoveGoal

Functions searches for the Main Goal inside of the database, once a match is found it removes the Goal from the main page and the database

```jsx
const handleRemoveGoal = (goalToRemove) => {
    // Code to be added
  };
```

### SubGoalsContainer

### Components

### AddSubGoal.jsx

### handleAddSubTask

Function deals with adding Sub-Goals to the dashboard. On default these Sub-Goals, are not connected to any main goal. So they’re added from a different side of our database

```jsx
const handleAddSubTask = () => {
    // Code to be added
  };
```

Returns a button element, which deals with adding Sub-Goals.

### ProgressionContainer.jsx

Returns an element which holds all the components related to the specific stage of a task. This includes the `SubGoalTitleContainer`, `SmallSubGoals`, `SubGoals`, and `AddSubGoal`.

### SmallSubGoals.jsx

### openModal

Functions that deals with displaying the SubGoal Modal

```jsx
const openModal = () => {
    setIsModalVisible(true);
    setTaskClicked({ title: task });
  };
```

Returns an element which displays the title and icon of SubGoals.

### SubGoalTitleComponent.jsx

### handleRemoveAllTasks

Function makes a **DELETE** request to the database, which removes all SubGoals from a specific stage. Along with re-rendering the section, updating the component with no tasks.

```jsx
const handleRemoveAllTasks = () => {
    // Code to be added
  };
```

### SubGoalsContainer.jsx

Returns an element which renders the three stages (To-do, In Progress and Done)

## MainGoalComponents

### Components

### AddSubGoal.jsx

### handleAddSubTask

Functions deals with adding a Sub-Goal to the Main-Goal collection. Along with re-rendering the Sub-Goals inside of the page

```jsx
const handleAddSubTask = () => {
    // Code to be added
  };
```

Returns an button element, adding Sub-Goals to Main-Goals.

### ClearSubGoals.jsx

Returns a button element which clears all tasks from the Sub-Goals section. (Function that handles the removing is found in `MainGoal.jsx` )

### SubGoalComponent.jsx

### handleRemoveTask

Function finds the Sub-Goal inside of the database, and removes the Sub-Goal and also re-renders the list with the updated changes

```jsx
const handleRemoveTask = () => {
        // Code to be added
    }
```

Returns an element which displays the title and icon of a Sub-Goal, also including a trash bin icon for removing the specific task

### MainGoal.jsx

### emojiPicture

Function that checks whether an emoji is inputted or not. If not, it will be defaulted to a smiley face

```jsx
const emojiPicture = () => {
    if (emoji !== "") {
      return emoji;
    } else {
      return "😁";
    }
  };
```

### submitHandler

Function that deals with preventing the page from refreshing

```jsx
const submitHandler = (e) => {
    e.preventDefault();
  };
```

### handleEmoji

Function that deals with setting the emoji state

```jsx
const handleEmoji = (e) => {
    setEmoji(e.native);
  };
```

### toggleEmojiPicker

Functions that displays the Emoji Picker, depending on state

```jsx
const toggleEmojiPicker = () => {
    setIsOpen(!isOpen);
  };
```

### handleTagInputChange

Function that deals with what tag has been selected

```jsx
const handleTagInputChange = (e) => {
    setTagInput(e.target.value);
  };
```

### handleColourChange

Function that deals with the selection of colours

```jsx
const handleColourChange = (colour) => {
    setSelectedColour(colour);
  };
```

### handleAddTag

Functions that ensures that a user has selected both a tag name and a colour. Without both being chosen, an error will show up

```jsx
const handleAddTag = () => {
    try {
      if (tagInput !== "" && selectedColour !== "") {
        setTags([...tags, { text: tagInput, colour: selectedColour }]);
        setTagInput("");
        setSelectedColour("");
      } else {
        alert("Please enter a tag and select a colour");
      }
    } catch (error) {
      console.log(error);
    }
  };
```

### handleRemoveTag

Function that deals with removing selected tags

```jsx
const handleRemoveTag = (index) => {
    const newTags = [...tags];
    newTags.splice(index, 1);
    setTags(newTags);
  };
```

Returns an element which handles the inputs a user will change to give information to their Main-Goals.

## SignInComponents

### SignIn.jsx

### submitHandler

Function deals with preventing the page from reloading on submit

```jsx
const submitHandler = (e) => {
        e.preventDefault();
    }
```

Returns an element which displays the user sign in page. Including username, password, Instagram, Github and Facebook

## Footer.jsx

Returns an element which displays the footer of the page, which also links to other sections of our platform.

## Header.jsx

Returns an element which displays the navigator of the page. This handles linking different sections of our page. The design of this element is dependent on the users login status. Different design for being logged in and logged out.

# **Testing & Unit Testing Development**

### **Explain what testing is and why we did testing?**

Testing is a critical aspect of software development that ensures the reliability and functionality of the application. In Doze, testing is implemented to identify and fix bugs, validate features, and enhance the overall quality of the codebase.

### **Include descriptions on why we used Jest and SuperTest?**

[Jest](https://jestjs.io/) is employed for JavaScript testing, offering a comprehensive testing solution for React applications. SuperTest is utilised for API endpoint testing, providing a simple and expressive syntax for HTTP assertions.

### **Explain how we incorporated this throughout our project**

Testing is integrated into the development process, with unit tests for individual components and API routes. Continuous integration tools ensure that tests are run automatically, providing rapid feedback to developers.

# Redux - HAVEN’T IMPLEMENTED YET

### **What is Redux, why did we use it for our project?**

Redux is a predictable state container for JavaScript applications. It is used in Doze to manage the application state in a centralized manner, making it easier to maintain and update the state across various components.

### **How is it used within our project?**

Redux is employed to manage global state, ensuring consistent data flow throughout the application. Actions trigger state changes, and React components subscribe to the Redux store to receive updates.

# Mongo DB

### **Why we used MongoDB and the benefits of using it for this sort of project**

[MongoDB](https://www.mongodb.com/) is chosen as the database for Doze due to its flexibility, scalability, and document-oriented structure. It accommodates the diverse data needs of the project, provides efficient querying, and seamlessly integrates with the Node.js backend.

# Third-Pary Libraries

### **Why we used third-party libraries and the benefits it has**

Third-party libraries enhance Doze's functionality by providing pre-built solutions for common tasks. These libraries save development time, offer robust features, and contribute to the overall efficiency and performance of the application.
