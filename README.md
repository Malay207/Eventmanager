                        API DOCUMENTATION OF TASK-2

Description:
The event Creation API allows users to create events for their events. A event is a notification or reminder that includes a title, cover image, scheduled sending time, description, icon, and a one-line invitation. This API provides endpoints to perform CRUD (Create, Read, Update, Delete) operations on events.

Object Data Model:

id (integer): Unique identifier for the event.
event_id (integer): ID of the event the event is associated with.
title (string): Title of the event.
cover_image (string): URL of the image to be used as the event's cover/ upload the image from pc.
send_time (datetime): Scheduled time for sending the event.
description (string): Description of the event.
icon (string): URL of the icon to be displayed with the event.
invitation (string): One-line invitation text for the event.

API Endpoints:

GET /events: Retrieve a list of all events.
GET /events/{event_id}: Retrieve details of a specific event.
POST /events: Create a new event.
PUT /events/{event_id}: Update an existing event.
DELETE /events/{event_id}: Delete a event.
Payload:

GET /events:
No request payload .

GET /events/{event_id}:
No request payload .

POST /events:

{
  "event_id": integer,
  "title": string,
  "cover_image": string,
  "send_time": string (formatted as YYYY-MM-DD HH:MM:SS),
  "description": string,
  "icon": string,
  "invitation": string
}
PUT /events/{event_id}:

{
  "title": string,
  "cover_image": string,
  "send_time": string (formatted as YYYY-MM-DD HH:MM:SS),
  "description": string,
  "icon": string,
  "invitation": string
}

DELETE /events/{event_id}:
No request payload required.

CRUD Functionalities:
Create event:
Endpoint: POST /events
Request Payload: event object attributes 

Read event:

Retrieve a list of all events:
Endpoint: GET /events
Response: Array of event objects

Retrieve details of a specific event:
Endpoint: GET /events/{event_id}
Response: event object with the specified ID

Update event:
Endpoint: PUT /events/{event_id}
Request Payload: Updated event object attributes 
Response: Updated event object

Delete event:
Endpoint: DELETE /events/{event_id}
Response: delete the event from the databse