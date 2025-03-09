# OAEG Web Cloudflare Worker

Serverless function for the OAEG Website.

## Description

This repository contains a serverless function implemented using Cloudflare Workers for the OAEG Website. The function is designed to handle various tasks such as processing HTTP requests, performing API calls, and handling data specific to the website's needs.

## Features

- **Serverless Architecture**: Utilizes Cloudflare Workers to deploy code at the edge, reducing server management and increasing scalability.
- **TypeScript**: Entirely written in TypeScript, ensuring type safety and leveraging modern JavaScript features.

## Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/OAEG-Student-Chapter/oaeg-web-cloudflare-worker.git
   ```
2. Navigate to the project directory:
   ```sh
   cd oaeg-web-cloudflare-worker
   ```
3. Install dependencies:
   ```sh
   npm install
   ```

## Usage

To deploy the Cloudflare Worker, follow these steps:

1. Authenticate with Cloudflare:
   ```sh
   wrangler login
   ```
2. Publish the worker:
   ```sh
   wrangler publish
   ```

## Contributing

Contributions are welcome! Please create a pull request or raise an issue to discuss your changes.
