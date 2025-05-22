# Strudel Local Setup

This repository contains a local setup for running [Strudel](https://strudel.cc), a browser-based live coding environment.

## Project Structure

- `strudel_working/` - Full Strudel repository clone
  - `website/` - Contains the Strudel website code
    - `dist/` - Built website files (created after building)

## Running Strudel Website Locally

1. Navigate to the website directory:
   ```bash
   cd strudel_working/website
   ```

2. Install all dependencies from the root:
   ```bash
   cd ..
   pnpm install
   ```

3. Go back to website directory and build it:
   ```bash
   cd website
   pnpm run build
   ```

4. Navigate to the built files and serve them:
   ```bash
   cd dist
   npx serve
   ```

5. Open your browser and go to the URL shown in the terminal (typically http://localhost:3000)

## Requirements

- Node.js
- pnpm package manager (`npm install -g pnpm`)

## Notes

- The website needs to be built before it can be served
- Always run `pnpm install` from the `strudel_working` directory to ensure all workspace dependencies are properly installed
- The built website will be in the `dist` directory, which is what needs to be served
