Project Overview
This project is a Node.js-based API that allows users to process tasks with strict rate limiting. The API is designed to handle one task per second and a maximum of 20 tasks per minute per user. Tasks are queued when the rate limit is reached, ensuring that tasks are processed according to the set limits. The API uses MongoDB to manage user-specific rate limits and task queues.

Key Features
Rate Limiting: Enforces one task per second and 20 tasks per minute per user.
Task Queueing: Tasks exceeding the rate limit are queued and processed sequentially.
Logging: Task completions are logged with user ID and timestamp and stored in a log file.
MongoDB Integration: MongoDB is used to persist user rate limits and manage task queues.

Setup Instructions
Prerequisites
Node.js (v14 or above)
MongoDB (local instance or MongoDB Atlas)
Installation
Clone the repository:

bash
Copy code
git clone https://github.com/your-username/task-queue-api.git
cd task-queue-api
Install dependencies:

bash
Copy code
npm install
Configure MongoDB:

Make sure MongoDB is running locally or update the connection string in server.js to point to your MongoDB Atlas cluster.

Run the application:

bash
Copy code
node server.js
The server should now be running on http://localhost:3000.

API Usage
Task Route
URL: /api/v1/task

Method: POST

Body: JSON

json
Copy code
{
  "user_id": "123"
}
Testing with Postman
Open Postman and create a new POST request.

Set the URL to http://localhost:3000/api/v1/task.

In the Body tab, select raw and set the format to JSON. Enter the JSON data with the user_id:

json
Copy code
{
  "user_id": "123"
}
Send the request. The server will process the task and return a response confirming that the task is queued or completed, depending on the rate limit.

Check the Logs: Logs will be stored in the logs/ directory with details about task completion, including the user ID and timestamp.

Example of Rate Limiting
If you send more than one request per second or more than 20 requests per minute for the same user_id, the excess requests will be queued.
The queue will ensure that the tasks are processed according to the rate limit.
Additional Notes
Scalability: This project is designed to be scalable by using MongoDB for persistence, ensuring that the application can handle multiple users and tasks efficiently.
Resilience: The application is resilient to edge cases, ensuring that rate limits are strictly enforced even under heavy load.
Future Enhancements
Add more detailed error handling to cover additional edge cases.
Implement a distributed queueing mechanism for even higher scalability in a clustered environment.
Extend the rate limiting logic to be configurable per user or task type.
Conclusion
This project demonstrates a robust way to implement rate-limited task processing in a Node.js application with MongoDB as the backend. It ensures that tasks are handled fairly per user and provides a foundation that can be extended for more complex use cases
