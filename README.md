# webapi

## Requirements

- Ubuntu (latest LTS version recommended)
- Node.js (Latest LTS version)

## Installation

1. Update your system's package index
2. Install curl if not already installed
3. Download and run the NodeSource installation 
    script:  curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -
4. Install Node.js and npm: sudo apt install -y nodejs
5. Verify the installation:
    node --version
    npm --version

6. Clone this repository:
   git clone https://github.com/ShoppingDem/webapi
   cd webapi

7. Install project dependencies:
    npm install


## Usage

To start the GraphQL server:
    npm start

For development with auto-restart:
    npm run dev
    
Once the server is running, you can access the GraphQL Playground for automatic API documentation by opening a web browser and navigating to:

http://localhost:4000

The GraphQL Playground provides an interactive interface where you can explore the API schema, write queries, and view documentation automatically generated from your GraphQL schema.

## API Documentation

The API documentation is automatically generated and can be explored using the GraphQL Playground. To access it:

1. Start the server as described in the Usage section.
2. Open a web browser and navigate to http://localhost:4000
3. In the Playground interface, you can:
   - View the schema by clicking on the "SCHEMA" tab on the right side
   - Write and execute queries in the left panel
   - View query results in the right panel
   - Explore available types and fields in the "DOCS" tab on the right side

The documentation is always up-to-date as it's generated directly from your GraphQL schema.


## auth
For production, make sure to set the following environment variables:
NODE_ENV=production
OKTA_ISSUER=https://YOUR_OKTA_DOMAIN/oauth2/default
OKTA_CLIENT_ID=YOUR_CLIENT_ID

## Contributing



## License

This project is licensed under the [LICENSE](LICENSE) file in the repository.


