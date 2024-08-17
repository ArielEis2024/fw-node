## fw-node
An express-based node framework that wraps all api endpoints with a controller that handles response and errors.


## Installation
Using npm:
<code>$ npm install fw-node &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; </code>

Using yarn:
<code>$ yarn add fw-node &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; </code>

Using pnpm:
<code>$ pnpm add fw-node &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; </code>

## Usage

Once the package is installed, you can import two functions using import approach:

`import { createFramework, createEndpoint } from 'fw-node'`

<br/>

## Framework:

A new framework can be created in the following way:

<code>
createFramework({<br />
  &nbsp; &nbsp; port: 4000,<br />
  &nbsp; &nbsp; name: 'FW-Server',<br />
}, [])<br />
</code>

createFramework function can receive the following parameters in the first arg:

| parameter    | type                |description |
| ------------ | ------------ |----------- |
| port        | number       |express listening port       |
| name         | string       |name of your service basically used for logs         |
| logLevel     | debug, info, warning, error| level of logs to print |
|jsonLimitSize| string   | express json limit|

createFramework receive array of routes in the second arg

<br/>

## Endpoints:

A new endpoint can be created in the following way:

<code>
import { createEndpoint } from 'fw-node'<br/>
&nbsp; const myEndpoint = createEndpoint({<br/>
  &nbsp; &nbsp; name: 'MyEndpoint',<br/>
  &nbsp; &nbsp; execute: (request) => {<br/>
    &nbsp; &nbsp; &nbsp; &nbsp; const { id } = request.params<br/>
    &nbsp; &nbsp; &nbsp; &nbsp; return exampleAPI.getSomeDataByID(id).then((data => {<br/>
      &nbsp; &nbsp; &nbsp; &nbsp; return data<br/>
    &nbsp; &nbsp; }))<br/>
  &nbsp; }})<br/>
</code>

createFramework function can receive the following parameters:

| parameter    | type                |description |
| ------------ | ------------ |----------- |
| name        | string       |name of your service basically used for logs|
| execute        | (request: any, response: any) => Promise<any>       | endpoint entry function       |
| normalizeData        | (data: any) => any       |manipulate data that your execute function return before return it with the response|
| headers        | {[key: string]: string}       |add some headers to the response       |
| withOwnResponse        | boolean       |if TRUE - return the response from the endpoint itself instead of the wrapper controller (false by default)|

## Routes:

you can create new route in the following way:

<code>
const getDataByIdRoute = {<br/>
  &nbsp; &nbsp;method: 'GET',<br/>
  &nbsp; &nbsp;path: '/data/:id',<br/>
  &nbsp; &nbsp;endpoint: myEndpoint<br/>
}
</code>

you can also create new route with middleware in the following way:

<code>
const postUploadFile = {<br/>
  &nbsp; &nbsp;method: 'POST',<br/>
  &nbsp; &nbsp;path: '/upload/file',<br/>
  &nbsp; &nbsp;endpoint: myUploadEndpoint<br/>
  &nbsp; &nbsp;setMiddleware: () => {<br/>
  &nbsp; &nbsp; &nbsp; &nbsp;import multer from 'multer';<br/>
  &nbsp; &nbsp; &nbsp; &nbsp;const upload = multer({ dest: 'uploads/' })<br/>
  &nbsp; &nbsp; &nbsp; &nbsp;return upload.single('file')<br/>
  &nbsp; &nbsp;}<br/>
}
</code>

