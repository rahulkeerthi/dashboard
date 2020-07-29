## Childminder Dashboard (Tech Test)

User stories contained in this app are as follows:

1. As a dashboard user, I have access to a summary view of all providers and can sort them by name. The summary should show the childminder's personal information and the list of active enrollments identified by the children names.

2. As a dashboard user, I can filter and find the childminders that have no active enrollments.
   For instance:

    - childminder `prv_M99ifW2EFnX333DY` has no active enrollments
    - childminder `prv_jVUpRgpDL4D9B1iu` have 4 enrollments listed but the enrolled children are missing in the `children` database

3. As a dashboard user, I can view the details of a given enrollment. The detailed view should display the start date, the child's and guardians personal information.

4. As a dashboard user, I can add a new childminder (don't worry about children or enrollment for now) with the following required properties :

    - a randomised slug `/prv_\S{16}/`
    - a valid name
    - a valid email
    - a valid date of birth (must be at least 18 years old)

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `yarn start-api`

Runs the json-server in development mode using the `db.json` file in the root folder.<br />
Open [http://localhost:3001](http://localhost:3001) to view it in the browser.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
