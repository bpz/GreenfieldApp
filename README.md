# GreenFieldApp
A simple app without techology restrictions.

## What I can find here?
**GreenFieldApp** is just a simple web application done for a job selection process. It didn't have lots of technology restrictions, but a did have a few non-functional requirements.

The main idea is represented with this user story:
``` text
As a user, I should be able to log in with my email and password into the platform. This log in process will generate a session token which should be persisted into the application so I don’t have to type my credentials when opening the app again and again. Once the user is logged in, we should show them a button to close the user session.
```

As there is no server for the requests, it has been mocked up.

## App functional description

It displays two pages, a Login Page and a Logout Page

Login page
- The Login Page allows the user to log in the application. It accepts any non-empty values as name and password.
- When clicking in the Login button, it navigates to the Logout page.

Logout page
- The Logout page is displayed when the user is logged in. It only shows a Logout button.
- When clicking in the button, it cleans the session nad navigates to Login Page.
- If the user has previously logged in, the app will shows this page.

![Login Page Image](/documentation/loginpage.png)
![Logout Page Image](/documentation/logoutpage.png)

## App technologies

This solution has been implemented using the following techologies:
- [Angular framework](https://angular.io/docs) that works with:
  - TypeScript
  - HTML
  - CSS

To know more about the implementation, visit the wiki page (TBD).

## How to run the project

### Prerequisites

This project is compiled in the CI pipeline, when every time a pull request is accepted, it produces a compiled **bundle**. To run the bundle the following packages are needed:

- **npm and Node.js.** [Download Node.js](https://nodejs.org/es/download/) directly or consider using a package manager like [Conda](https://docs.conda.io/projects/conda/en/latest/user-guide/install/index.html).
- **lite-server**. Review the documentation [here](https://github.com/johnpapa/lite-server).

### Download bundle and unzip it

The Actions of the project produce two bundles, one is the application compiled and the other the code coverage report.

First, download unzip it:
1. **Go to the last executed workflow.** *Actions* -> *Worflow* section.
2. **Download the bundle**. In *Artifacts* select 'bundle'. It will download the files.
3. **Unzip the bundle** in a destination of your choice, in my case is *greenfieldApp-bundle*. Inside, it will be a folder called *greenfield*. It contains the compiled files.

### Set up lite-server

1. Open a comand line window and first move to the *greenfieldApp-bundle* directory.
2. Create a *package.json* file with the following content:
    ``` JSON
    {
        "scripts": {
            "ng": "ng",
            "dev": "lite-server"
        },
        "dependencies": {
            "lite-server": "~2.5.4"
        }
    }
    ```
3. Install lite-server.
    ``` bash
    npm install
    ```
4. Create a file called `bs-config.json` inside *greenfieldApp-bundle* with this content:
    ``` JSON
    {
        "port": 4200,
        "files": ["./greenfield/**/*.{html,htm,css,js}"],
        "server": { "baseDir": "./greenfield" }
    }
    ```

The folder structure will look like this:

![Login Page Image](/documentation/greenfieldApp-bundle.png)


### Run the application

And finally, run litle-server with:

``` bash
npm run-script dev
```
