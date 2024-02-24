
<h1 align="center">
Frontend Technical Test for [TeamITG](https://teamitg.com/)
</h1>


<p align="center">
  <a target="__blank" rel="noopener" href="https://frontend-technical-test-theta.vercel.app/">Check out the Demo</a>
</p>

## Screens
<img width="433" alt="image" src="https://github.com/jmailey/frontend-technical-test/assets/8898189/c9f6b061-1e45-4098-9d47-b436c53ead2c">
<img width="833" alt="image" src="https://github.com/jmailey/frontend-technical-test/assets/8898189/53b1a847-0719-492d-8608-8e282980c3e9">
<img width="1470" alt="image" src="https://github.com/jmailey/frontend-technical-test/assets/8898189/27bddd75-bca6-4d6d-a5d7-c0d609f2a6f5">


## What has been done

 - Added @testing-library/react-hooks and tested useData hook.

 - Implemented getData function to fetch initial vehicle data > traverse vehicles returned for apiUrls > fetch apiUrls > check for rejected request and invalid values > merge media array from initial request into matching vehicle > return vehicles.

 - Got all getData tests passing and added new ones to cover media merging

 - Created Vehicle Component and Tests - handling media being present or not

 - Vehicle images are handled with srcSet, 1/1 images will be rendered before 768px and 16 / 9 images will be rendered after 768px.

 - Added test to vehicles list to test correct amount of children are rendered.

 - Tested all functions in helper.js

 - Styled Layout and Vehicle component using BEM naming conventions.

 - Introduced 4 min-width breakpoints. mobile: 0-576px, small: 576px, tablet: 768px, desktop:1024px


## Coverage Report
<img width="1450" alt="image" src="https://github.com/jmailey/frontend-technical-test/assets/8898189/368e0817-d542-4d20-bf74-20b597eb7bb1">

## Lighthouse score
<img width="484" alt="image" src="https://github.com/jmailey/frontend-technical-test/assets/8898189/45a1ebf5-3744-457b-b8ff-f975eddd8932">

## System requirements
You’ll want to ensure you have the following already installed on your local machine before getting started with the test:
* **Node 12+:** The current LTS (long-term support) release. We like to use a [Node Version Manager like NVM](https://github.com/nvm-sh/nvm).
* **NPM 6+ or Yarn:** Both of these package managers have ups and downs, choose whichever you prefer. Follow the installation instructions for Yarn or NPM to make sure you're using the latest version.

## Setup Instructions
1. Clone this repository
2. Type the following command to install the dependencies and run the project
````
npm install && npm start
````

## Task Instructions
1. API Implementation
    * You will receive a list of general vehicle information by making an initial api request to endpoint `/api/vehicles.json`
    * You are now required to traverse the API and make further calls on a detail endpoint (`apiUrl`) to get vehicle-specific details such as price and description
    * Ignore vehicles with broken apiUrl or without any price information
    * All API related logic should be implemented inside `getData()` available at `src/api/index.js`

2. Using `getData()` in a React component
    * React component `VehicleList` is configured to use `getData()` through a custom hook `useData`
    * If you prefer to use class-based component, then the rule to make a single function to obtain all vehicles through `getData()` needs to be respected
    * No other components are allowed to make any network request

3. UI Design
    * You are required to produce the following designs on different viewports to match as closely as possible, ready for a designer to review
    * [Mobile](https://raw.githubusercontent.com/connect-group/frontend-technical-test/master/designs/mobile.png)
    * [Tablet](https://raw.githubusercontent.com/connect-group/frontend-technical-test/master/designs/tablet.png)
    * [Desktop](https://raw.githubusercontent.com/connect-group/frontend-technical-test/master/designs/desktop.png)

## Browser Support
We expect the solution to work in the latest version of Chrome

## Acceptance criteria

**We have a high focus on attention to details in code**
* Solution should be written in either Reactjs or VanillaJS
* The formatting of the codebase should be consistent and written in a modular approach
* We expect the codebase to be written using ES6+ and libraries kept to a minimum
* We expect the code to be written with unit testing & performance in mind
* We expect the code to be included in the relevant files
* We prefer native Browser Api over JS libraries
* Mobile-first development approach using min-width media queries
* Solution should be accessible and meet WCAG 2.1
* No CSS framework allowed
* Internally, we use BEM - but we are open to other CSS naming conventions as long as it's built with scale and maintenance in mind

**We have a high focus on attention to details in design**
* We expect the designs to match as closely as possible, ready for a designer to review
* Correct semantic HTML mark-up and/or CSS should be used to achieve the size and aspect ratio of the images in the design
* Interactions and animations to be considered but not distracting users away from the experience
* Minimal visual bugs when going resizing to mobile and large screen sizes

## Nice to have
If you have achieved primary tasks and would like to showcase your skills by implementing additional feature(s) then you can consider the following:
- An [accessible modal implementation](https://www.w3.org/TR/wai-aria-practices-1.1/#dialog_modal) which displays the additional vehicle information e.g. emission, bodystyle
- Implement "Read more" which Show/Hide additional vehicle information
- A staggered fade in vehicle cards on load
- Redux
- Anything else which we cannot think of!

## Tips
Use linting to format the code and autofix most of the formatting issues
```shell script
npm run lint
```
