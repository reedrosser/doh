# D'oh!

D'oh is a Vue app that lets even the simplest amongst us find information about their favorite publicly traded companies.

## Installation

Use git to clone D'oh!

```bash
git clone git@github.com:reedrosser/doh.git
```

Then use your favorite package manager to install the dependencies

```bash
yarn install
or
npm i
```

## Configuration

The Express server needs access to stock data csv files in order to provide them to D'oh. Copy your stock data files in to the /src/assets/CSVs directoy in .csv format.

## Deployment

To run this local version of D'oh you'll need to run an express server in one terminal to provide JSON data to the app.

```bash
yarn run stockServer
```

Then you start the D'oh app in another terminal.

```bash
yarn run serve
```

Navigate a web browser to http://localhost:8080

## Usage

From the home screen you can search for any company name or stock symbol and see what their average stock price has been over the last month.

## Roadmap

Future updates could include getting the CSV data from an API call on initialization
Replacing Apex-Charts with D3 and better customizing the experience
More Error checking
Updating the "search results" portion of the Search Bar

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License

[MIT](https://choosealicense.com/licenses/mit/)
