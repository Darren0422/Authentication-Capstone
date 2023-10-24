# Authentication-Capstone

## Description 
A full-stack MERN (Mongo, Express, React and Node.js) web app making use of JWT authentication. I was tasked with building an internal web app for credential management for a company called "Cool Tech". Due to the value of the credentials to be stored in the app, it is of utmost importance that the app is authenticated.

The web app has user login and registration, different user roles, and different resource access for each user.

### Task Details
Cool Tech has multiple organisational units (OU) and each of these OUs has over 10 different divisions within them. Divisions take care of subtasks like finances, IT, writing, development, and so on. Each division has its own credential repository which contains a list of login details for various places. All employees of the division should have access to it. Most employees are only part of one OU and one division with it, but there are some that are part of more than one OU and division. 

Furthermore, there should be different user roles for the employees.
● Normal users can read the credential repository, and add new credentials in.
● Management users can do the above plus update credentials.
● Admin users can do the above plus they can assign and unassign users from divisions and OUs. They can also change the user role of any user

## Importance 
This repository is important as the web app will consolidate all the concepts that I have learned about the MERN stack, additionally displaying my understanding and use of JWT authentication. It also provides insights to my understanding and comprehension of HTML and CSS fundamentals.

## Installation

To install this project locally, open the repository in your web browser: [Authentication-Capstone](https://github.com/Darren0422/Authentication-Capstone). On the repository page, click on the green "Code" button located near the top-right of the page. From the dropdown menu, select "Download ZIP". This will start the download of the repository as a ZIP file to your computer. Save it on your local storage device. 

##  Usage

You must navigate to the repository and open this file with a code editor of your choice, such as, VSCode.

### Available Scripts

In the project terminal, you can run:

#### "npm start"

Runs the app in the development mode.

##### Start the server:
Navigate to the "server" directory and run the command to start the server.

##### Start the web app:
Navigate to the "client" directory and run the command to start the web app.

Ensure that the server and web app are both running.

Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.
You may also see any errors in the console.

## Web App
### Login and Registration
The user must enter their correct "username" and corresponding "password" in order to successfully log into the Credential Management App.

<img width="1728" alt="Screenshot 2023-10-24 at 11 27 16" src="https://github.com/Darren0422/Authentication-Capstone/assets/134398985/cfef8752-603e-4238-bbe6-04c62f676a85">

Alternatively, if the user doesn't posses these credentials, they can Register. The user will be prompted to provide personal details and then they may continue to login to the App.

<img width="1728" alt="Screenshot 2023-10-24 at 11 27 21" src="https://github.com/Darren0422/Authentication-Capstone/assets/134398985/997defd5-3d19-4713-ab42-44a1d991cc68">

### Dashboard
The Dashboard is the landing page once the user has successfully logged into the App. They are shown their profile details.

<img width="1728" alt="Screenshot 2023-10-24 at 11 42 35" src="https://github.com/Darren0422/Authentication-Capstone/assets/134398985/6622e603-c44a-4a54-891a-ac19b7d52071">

#### Organisational Units & Divisions
The Dashboard also displays all the existing Organisational Units and their corresponding Divisions. A link to each Division's Credential Repository is also provided.

<img width="1728" alt="Screenshot 2023-10-24 at 11 42 43" src="https://github.com/Darren0422/Authentication-Capstone/assets/134398985/5c5168e7-4515-4bd6-9901-3246899705fb">

### Division Credential Repository
If the user doesn't possess the required permissions to access the Division's Credential Repository, they are denied access.

If the user does possess the necessary permissions to access the Division's Credential Repository, they are able to view the credentials. Additionally, the user has the option to add a new credential and update an existing credential.

<img width="1728" alt="Screenshot 2023-10-24 at 11 43 40" src="https://github.com/Darren0422/Authentication-Capstone/assets/134398985/c2c37f81-8f0b-4dc6-abc7-fdcd15685c31">

#### Add Credential
To Add a new credential to the division's repository, the user is prompted add the "Organisation name",	"Username" and "Password".

<img width="1728" alt="Screenshot 2023-10-24 at 11 50 04" src="https://github.com/Darren0422/Authentication-Capstone/assets/134398985/239826db-d78d-4389-9f14-8c5af37de6d4">

#### Update Credential
To Update an existing credential from the division's repository, the user is prompted to select the user "ID" and complete the updated "Organisation name",	"Username" and "Password".

Note: The user must have a role of "Management" or "Admin" to perform this function or access will be denied. 

<img width="1728" alt="Screenshot 2023-10-24 at 11 50 11" src="https://github.com/Darren0422/Authentication-Capstone/assets/134398985/bca66469-eda4-446a-9a12-9ebd68946880">

### Manage Users
The "Manage Users" functionality and options are only accesible to users with the role of "Admin". Other users are denied access and are also not able to view it.
The "Admin" user has the option to update a users Role, Organisational Unit and Division

<img width="1728" alt="Screenshot 2023-10-24 at 11 44 21" src="https://github.com/Darren0422/Authentication-Capstone/assets/134398985/ac567f63-a689-4619-912b-1396d6f448f7">

#### Update Role
To Update an existing users Role, the user is prompted to select the user "ID" (from the displayed users) and provide the updated "Role".

<img width="1728" alt="Screenshot 2023-10-24 at 11 45 13" src="https://github.com/Darren0422/Authentication-Capstone/assets/134398985/e0ba3985-131e-4d1a-ba9b-2db449c5143a">

#### Update Organisational Units
The "Admin" user has the option to Assign or Deassign a user from an Organisational Unit.

<img width="1728" alt="Screenshot 2023-10-24 at 11 45 34" src="https://github.com/Darren0422/Authentication-Capstone/assets/134398985/afe5f039-38e2-4f3c-9c24-f53de34e9976">

##### Assign Organisational Unit
To Assign an existing user to an Organisational Unit, the user is prompted to select the user "ID" (from the displayed users) and provide the "Organisational Unit" that they will be assigned to.

<img width="1728" alt="Screenshot 2023-10-24 at 11 45 41" src="https://github.com/Darren0422/Authentication-Capstone/assets/134398985/030f8305-4686-4445-b4cb-20543293bb15">

##### Deassign Organisational Unit
To Deassign an existing user from an Organisational Unit, the user is prompted to select the user "ID" (from the displayed users) and provide the "Organisational Unit" that they will be removed from.

<img width="1728" alt="Screenshot 2023-10-24 at 11 45 47" src="https://github.com/Darren0422/Authentication-Capstone/assets/134398985/1a4d812a-9ddc-49c9-9221-f7c02da28141">

#### Update Division
The "Admin" user has the option to Assign or Deassign a user from a Division.

<img width="1728" alt="Screenshot 2023-10-24 at 11 47 50" src="https://github.com/Darren0422/Authentication-Capstone/assets/134398985/97232807-30a2-48dc-9b77-a046bc4743fb">

##### Assign Division
To Assign an existing user to a Division, the user is prompted to select the user "ID" (from the displayed users) and provide the "Organisational Unit" and the corresponding "Division" that they will be assigned to.

<img width="1728" alt="Screenshot 2023-10-24 at 11 48 00" src="https://github.com/Darren0422/Authentication-Capstone/assets/134398985/d32545e2-9a02-44c1-8cb6-e53564830a16">

##### Deassign Division
To Deassign an existing user from a Division, the user is prompted to select the user "ID" (from the displayed users) and provide the "Organisational Unit" and the corresponding "Division" that they will be removed from.

<img width="1728" alt="Screenshot 2023-10-24 at 11 48 04" src="https://github.com/Darren0422/Authentication-Capstone/assets/134398985/49efa260-8843-43d5-9034-017b8d2caf54">


## Credits
[Darren Chen](https://github.com/Darren0422)
