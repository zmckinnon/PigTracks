# PigTracks

## Technical Details

- Angular 7
- Typescript application
- Publish it in the cloud (https://pigtracks.pages.dev/)

## Project Details

- Users should be able to manage projects, which have a name and a set of named tasks to be completed. A project should be considered complete when all of its tasks are completed.
- Use the browser to store the project data. No server-side backend! Users' project data should be reloaded when they close the browser and reopen it.
- Publish as a static site using cloud storage. No need to do a custom DNS name or anything like that.
- CI/CD including meaningful tests that prevent deployment upon failure.

## To Do

- [x] Automatically deploy to CloudFlare Pages
- [x] Update README to have project information
- [x] Setup GitHub Actions to build & test
- [x] Create a Project List page w/ unit & e2e tests
- [x] Create a Project Details page w/ unit & e2e tests
- [x] Add Task List to Project Details page
- [ ] Add Project Status to Project List page
- [ ] Add Project Status to Project Details page
- [ ] Polish the look and feel

## Helpful Commands

- `ng serve` - Run the dev server at `http://localhost:4200/`.
- `ng build` - Build the project.
- `ng test` - Run unit tests.
- `ng e2e` - Run end-to-end tests.
