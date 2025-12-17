******🚀 Serverless Todo Web Application using AWS

A production-style serverless web application built using AWS Free Tier services, demonstrating authentication, secure hosting, REST APIs, serverless compute, NoSQL storage, monitoring, and billing control.

📌 Live Demo

🌐 Frontend (CloudFront HTTPS):
https://<your-cloudfront-id>.cloudfront.net

🧠 Project Overview

This project implements a scalable serverless Todo application where users can securely log in and manage their tasks.

The application is fully deployed on AWS cloud infrastructure using managed services to ensure high availability, scalability, security, and cost efficiency.

🎯 Objectives

* Build a real-world serverless web application

* Use AWS-managed services instead of traditional servers

* Implement secure authentication using Amazon Cognito

* Host frontend with HTTPS using CloudFront

* Perform CRUD operations via REST APIs

* Store data in a NoSQL database

* Enable monitoring, logging, and billing alerts

🧰 Tech Stack
🌐 Frontend

* HTML

* CSS

* JavaScript

* Amazon S3 – Static website hosting

* Amazon CloudFront – HTTPS distribution

⚙ Backend

* AWS Lambda (Node.js) – Business logic

* Amazon API Gateway – REST APIs

🗄 Database

* Amazon DynamoDB – NoSQL storage

🔐 Authentication

* Amazon Cognito (User Pools) – Signup & Login

📊 Monitoring & Cost Control

* Amazon CloudWatch – Logs & metrics

* AWS Budgets – Billing alerts

🏗️ Architecture

🔄 Architecture Flow

* Users access the application through a web browser

* Requests are served via Amazon CloudFront (HTTPS)

* Static frontend files are hosted in Amazon S3

* Users authenticate using Amazon Cognito Hosted UI

* API requests are sent to Amazon API Gateway

* API Gateway invokes AWS Lambda functions

* Lambda performs CRUD operations on DynamoDB

* Logs and metrics are captured by Amazon CloudWatch

🔐 Authentication Flow (Cognito)

* User clicks Login

* Redirected to Cognito Hosted UI

* After successful authentication:

* Cognito issues a JWT token

* User is redirected back to CloudFront URL

* Authentication is handled entirely by AWS (no password storage in app)

✨ Application Features

🔑 User authentication (signup & login)

➕ Add todo items

👀 View all todos

✅ Mark todos as completed

🗑 Delete todos

🌍 HTTPS secure access

⚡ Serverless auto-scaling

💸 Free Tier cost protection

🚀 Deployment Steps (High Level)
1️⃣ Frontend

* Upload index.html and script.js to S3

* Enable static website hosting

* Create CloudFront distribution for HTTPS

2️⃣ Authentication

* Create Cognito User Pool

* Configure App Client & Hosted UI

* Integrate login with frontend

3️⃣ Backend

* Create Lambda function (CRUD logic)

* Create REST API in API Gateway

* Connect API Gateway to Lambda

4️⃣ Database

* Create DynamoDB table

* Configure IAM permissions

5️⃣ Monitoring & Billing

* Enable CloudWatch logging

* Configure AWS Budget alerts

💰 Cost & Free Tier Usage

This project is deployed entirely within AWS Free Tier limits.

Services under Free Tier:

* AWS Lambda

* Amazon API Gateway

* Amazon DynamoDB

* Amazon S3

* Amazon CloudFront

* Amazon Cognito

* Amazon CloudWatch

📌 Estimated monthly cost: $0

A billing budget and alerts are configured to avoid unexpected charges.

⚠️ Known Limitations

* API Gateway is not protected with Cognito Authorizer (JWT not enforced)

* Basic frontend UI (no framework used)

* Single-region deployment

🔮 Future Enhancements

* Secure APIs using Cognito Authorizers

* Role-based access control

* Pagination and filtering

* CI/CD pipeline using GitHub Actions or AWS CodePipeline

* Frontend framework (React / Vue)

📂 Project Structure
.
├── frontend
│   ├── index.html
│   └── script.js
│
├── backend
│   └── lambda.js
│
├── architecture-diagram.png
└── README.md

🧠 Key Learnings

* Serverless architecture design

* AWS authentication with Cognito

* Secure frontend hosting using CloudFront

* API-driven backend using Lambda & API Gateway

* NoSQL data modeling with DynamoDB

* Cloud monitoring & cost management

📌 Resume / Interview One-Liner

Built a serverless Todo web application using AWS S3, CloudFront, Cognito, API Gateway, Lambda, DynamoDB, and CloudWatch, fully deployed within AWS Free Tier.

🏁 Status

✅ Completed
✅ Deployed


⭐ If you like this project, give it a star!******
