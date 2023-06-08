# Xadar Adventures (Project Athena)

Source code for the Xadar Adventures Scavenger hunt application available on the [ios app store](https://apps.apple.com/ca/app/xadar-adventures/id1540450403) and the [android play store](https://play.google.com/store/apps/details?id=com.joshuakaluba.xadaradventures&hl=en)

## Getting Started

The preferred method to run the web and api project is using docker-compose. The instructions are below.

1. First fill out the [sample.env](sample.env) file with your database and application credentials then rename the file to `.env`
2. Then `docker-compose up -d` from the root of this repository. Both the api and web will begin running

If docker is not installed, follow the instructions in the /web and /api folders to run the applications.
