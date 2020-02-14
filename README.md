# Gatsby Auth with AWS Amplify

## Create new Gatsby project

`gatsby new gatsby-auth-amplify`

## Add TS (optional)

This step is optional but highly recommended

### Add TS plugin

```BASH
yarn add gatsby-plugin-typescript
```

### Add TypeScript definitions

```BASH
yarn add -D @types/react @types/react-dom @types/node
```

### Change files extensions

`.js` —> `.tsx`

## Hook up AWS Amplify Framework

Auth is handled by AWS Cognito

Steps:

1. Install AWS Amplify CLI
2. Configure Amplify
3. Initialize inside Gatsby project
4. Add Auth API
5. Deploy the config to AWS
6. Protect the ‘protected-page’

### Step 1. Install AWS Amplify CLI

```BASH
npm install -g @aws-amplify/cli
amplify --version
```

### Configure Amplify

```BASH
amplify configure
```

Actionable bash response:

```BASH
Sign in to your AWS administrator account:
https://console.aws.amazon.com/
Press Enter to continue
```

Actionable bash response:

```BASH
Specify the AWS Region
? region:  (Use arrow keys)
❯ us-east-1
  us-east-2
  us-west-2
  eu-west-1
  eu-west-2
  eu-central-1
  ap-northeast-1
```

You will also need to provide user name and configure IAM user within the console.
NB: Save you credentials (download .csv or copy access keys)

Actionable bash response:

```BASH
Enter the access key of the newly created user:
? accessKeyId:  AKIA355I4O**********
? secretAccessKey:  ehf7gWSzPULXtNN0d0v******************
This would update/create the AWS Profile in your local machine
? Profile Name:  olegchursin

Successfully set up the new user.
```

### Step 2. Initialize inside Gatsby project

from the root of your project run:

```BASH
amplify init
```

Actionable bash response:

```BASH
? Enter a name for the project gatsby-auth-amplify
? Enter a name for the environment dev
? Choose your default editor: Visual Studio Code
? Choose the type of app that you're building javascript
Please tell us about your project
? What javascript framework are you using react
? Source Directory Path:  src
? Distribution Directory Path: build
? Build Command:  npm run-script build
? Start Command: npm run-script start
```

Actionable bash response:

```BASH
Do you want to use an AWS profile? Yes
? Please choose the profile you want to use default
Adding backend environment dev to AWS Amplify Console app: d1mhcdbiatabfc
⠧ Initializing project in the cloud...
```

Explore the newly generated `amplify` folder: [Screenshot: amplify folder structure](https://share.getcloudapp.com/mXuqRmY2)

### Step 3. Add Auth API

```BASH
amplify add auth
```

Actionable bash response:

```BASH
Do you want to use the default authentication and security configuration? Default configuration
 Warning: you will not be able to edit these selections.
 How do you want users to be able to sign in? Username
 Do you want to configure advanced settings? No, I am done.
Successfully added resource gatsbyauthamplifycba7570a locally
```

### Step 4. Deploy the config to AWS

```BASH
amplify push
```

Actionable bash response:

```BASH
✔ Successfully pulled backend environment dev from the cloud.

Current Environment: dev

| Category | Resource name             | Operation | Provider plugin   |
| -------- | ------------------------- | --------- | ----------------- |
| Auth     | gatsbyauthamplifycba7570a | Create    | awscloudformation |
? Are you sure you want to continue? (Y/n)
```

You should have a new `auth` folder inside `amplify/backend`.

Go to AWS console `Cognito —> User Pools` and make sure your generated pool is there as well.

### Step 5. Protect the ‘protected-page’

Install new libraries:

```BASH
yarn add aws-amplify aws-amplify-react
```

Add the following to `gatsby-browser.js`

```JS
import Amplify, { Auth } from "aws-amplify"
import awsConfig from "./src/aws-exports"
Amplify.configure(awsConfig)
```

Add `withAuthenticator` to your protected-page:

* import it:
`import { withAuthenticator } from “aws-amplify-react”`

* wrap the export:
`export default withAuthenticator(ProtectedPage)`

Now you should be greeted with the login view: [Screenshot: Login view](https://share.getcloudapp.com/BluBLZLk)

Click `Create account`, provide an email address that you have access to (for a confirmation code), have fun!

#### Resources

Gatsby Auth Amplify Starter by nadir Dabit: [gatsby-auth-starter-aws-amplify: Gatsby Starter | GatsbyJS](https://www.gatsbyjs.org/starters/dabit3/gatsby-auth-starter-aws-amplify/)

* Video tutorial by Arbaoui Mehdi: [Gatsby and AWS Amplify Authentication - YouTube](https://www.youtube.com/watch?v=Rrv_rYhAQw0)

* Deploying to AWS Amplify: [Deploying to AWS Amplify | GatsbyJS](https://www.gatsbyjs.org/docs/deploying-to-aws-amplify/)

`#GatsbyNYC`
