To run front end 
cd .\frontend\cms
npm start

To run backend 
cd .\cmsbackend>
node server.js


Admin:
Login - credentials should be directly put from the backend
Admin config kept in .env and Code done in server.js


create employees - basic details - name, email, phone, password - validations required

Create Employee

curl --location 'http://localhost:5000/api/admin/create-employee' \
--header 'Content-Type: application/json' \
--data-raw '{
    "email": "emp1@example.com",
    "password": "emp1",
    "name":"Omk Sonv",
    "role":"EMPLOYEE"
}'


list employees
curl --location --request GET 'http://localhost:5000/api/admin/employees' \
--header 'Content-Type: application/json' \
--data-raw '{
    "email": "admin@example.com",
    "password": "admin123"
}'

curl --location --request PUT 'http://localhost:5000/api/admin/employee/5' \
--header 'Content-Type: application/json' \
--data-raw '{
  "name": "Omkrushana Updated Doe",
  "email": "Omk.doe@example.com",
  "role": "EMPLOYEE"
}'


Employee:
Login - with email password credentials

curl --location 'http://localhost:5000/api/auth/login' \
--header 'Content-Type: application/json' \
--data-raw '{
    "email": "emp2@example.com",
    "password": "emp2"
}'

Employee create task
curl --location 'http://localhost:5000/api/employee/create-task' \
--header 'Content-Type: application/json' \
--data '{
  "employee_id": 2,
  "task_description": "Complete project documentation"
}'

Employee Update task
curl --location --request PUT 'http://localhost:5000/api/employee/update-task?id=null' \
--header 'Content-Type: application/json' \
--data '{
  "employee_id": 2,
  "task_description": "Updated project documentation"
}'