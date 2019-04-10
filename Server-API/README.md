# Travis Foundation Translation API

Copyright 2019 Travis Foundation

Permission to use, copy, modify, and/or distribute this software for any purpose with or without fee is hereby granted, provided that the above copyright notice and this permission notice appear in all copies.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.


## API endpoint
http://localhost:8080

## Authorization;
JWT style, use Authorization Header

Retreive a test token: 

curl http://localhost:8080/token



### Request

/translate
{
	"source_lang": "",
	"target_lang": "",
	"phrase": "Hello, how are you?"
}

curl \
	--request POST \
	--header "Content-Type: application/json" \
	--header "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ijg2Mzg0NDFiLWYzYTgtNDIyNC05ZmRiLWI2YWMxYzdmMmI5OSIsImVtYWlsIjoiaGVsbG9AdHJhdmlzLmZvdW5kYXRpb24iLCJmdWxsX25hbWUiOiJUcmF2aXMgRm91bmRhdGlvbiIsInJvbGUiOiJhcGktY2xpZW50IiwiaWF0IjoxNTUxMzA2MjMzLCJuYmYiOjE1NTEzMDYxNzMsImV4cCI6MTU4Mjg2MzgzMywiaXNzIjoiaHR0cDovL3RyYXZpcy5mb3VuZGF0aW9uIiwic3ViIjoiaGVsbG9AdHJhdmlzLmZvdW5kYXRpb24iLCJqdGkiOiJ0cmF2aXMtZm91bmRhdGlvbi10cmFuc2xhdGlvbi1hcGkifQ.TUjINnAwQAC3LOVTZOti1IoGf9Wi730e2jFEqdOxkkQ" \
	--data '{"source_lang":"en","target_lang": "ti","phrase":"Hello, how are you?"}' \
	http://127.0.0.1:8080/translate



### Response format;
{
	translations: [{
		text: ""
	}]
}



## Profiling
Profiling can be done on the Restify server with dtrace, for convenience a npm command was added;
npm run profiler
