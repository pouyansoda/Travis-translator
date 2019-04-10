{
    "name": "travis",
    "version": "1.0.0",
    "description": "React version of BLK Design System by Creative Tim",
    "main": "index.js",
    "author": "Pouyan",
    "license": "MIT",
    "dependencies": {
        "antd": "^3.15.0",
        "axios": "^0.18.0",
        "chart.js": "2.7.3",
        "classnames": "2.2.6",
        "moment": "2.24.0",
        "node": "^11.11.0",
        "node-sass": "4.11.0",
        "nodemon": "^1.18.10",
        "nouislider": "13.1.1",
        "perfect-scrollbar": "1.4.0",
        "react": "16.8.3",
        "react-bootstrap-switch": "15.5.3",
        "react-chartjs-2": "2.7.4",
        "react-datetime": "2.16.3",
        "react-dom": "16.8.3",
        "react-player": "^1.9.3",
        "react-router-dom": "4.3.1",
        "react-script": "^2.0.5",
        "react-scripts": "2.1.5",
        "react-sliding-pane": "^3.1.0",
        "react-speech": "^0.3.2",
        "react-speech-recognition": "^1.0.7",
        "reactstrap": "7.1.0"
    },
    "scripts": {
        "start": "react-scripts start",
        "build": "react-scripts build",
        "test": "react-scripts test",
        "eject": "react-scripts eject",
        "install:clean": "rm -rf node_modules/ && rm -rf package-lock.json && npm install && npm start",
        "compile-sass": "node-sass src/assets/scss/blk-design-system-react.scss src/assets/css/blk-design-system-react.css",
        "minify-sass": "node-sass src/assets/scss/blk-design-system-react.scss src/assets/css/blk-design-system-react.min.css --output-style compressed",
        "map-sass": "node-sass src/assets/scss/blk-design-system-react.scss src/assets/css/blk-design-system-react.css --source-map true"
    },
    "eslintConfig": {
        "extends": "react-app"
    },
    "browserslist": [
        ">0.2%",
        "not dead",
        "not ie <= 11",
        "not op_mini all"
    ]
}