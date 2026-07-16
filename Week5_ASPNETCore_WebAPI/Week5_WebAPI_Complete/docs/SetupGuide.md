# Setup Guide

## Prerequisites

| Tool | Version | Download |
|---|---|---|
| Visual Studio 2022 | 17.x | https://visualstudio.microsoft.com |
| .NET SDK | 8.0 | https://dotnet.microsoft.com/download |
| Postman | Latest | https://www.postman.com/downloads |
| Apache Kafka | 3.x | https://kafka.apache.org/downloads |
| Java JDK | 11+ | Required by Kafka |

---

## 1. Run the Web API

```bash
cd Week5_WebAPI_Complete\Week5_WebAPI
dotnet restore
dotnet run
```

Navigate to: http://localhost:5000/swagger

---

## 2. Kafka Installation on Windows

### Step 1 – Download Kafka
1. Go to https://kafka.apache.org/downloads
2. Download the latest binary (e.g. `kafka_2.13-3.7.0.tgz`)
3. Extract to `C:\kafka`

### Step 2 – Start ZooKeeper
```cmd
cd C:\kafka
.\bin\windows\zookeeper-server-start.bat .\config\zookeeper.properties
```

### Step 3 – Start Kafka Broker
Open a new terminal:
```cmd
cd C:\kafka
.\bin\windows\kafka-server-start.bat .\config\server.properties
```

### Step 4 – Create Topic
Open a new terminal:
```cmd
cd C:\kafka
.\bin\windows\kafka-topics.bat --create --topic chat-topic --bootstrap-server localhost:9092 --partitions 1 --replication-factor 1
```

### Step 5 – Verify Topic
```cmd
.\bin\windows\kafka-topics.bat --list --bootstrap-server localhost:9092
```

---

## 3. Run Kafka Projects

### Producer
```bash
cd Kafka\Producer
dotnet run
```

### Consumer
```bash
cd Kafka\Consumer
dotnet run
```

### Console Chat (run 2+ instances)
```bash
cd Kafka\ChatConsole
dotnet run
```

### Windows Forms Chat
```bash
cd Kafka\ChatWindows
dotnet run
```

---

## 4. JWT Testing Flow

1. POST `http://localhost:5000/api/Auth/login` with `{ "username": "admin", "password": "Admin@123" }`
2. Copy the `token` from the response
3. In Swagger UI → click **Authorize** → enter `Bearer <token>`
4. Call any `api/Emp` endpoint

---

## 5. Kafka Architecture Concepts

| Concept | Description |
|---|---|
| **Broker** | Kafka server that stores and serves messages |
| **Topic** | Named channel/category for messages |
| **Partition** | Ordered, immutable log within a topic |
| **Producer** | Client that publishes messages to a topic |
| **Consumer** | Client that reads messages from a topic |
| **Consumer Group** | Group of consumers sharing topic partitions |
| **ZooKeeper** | Coordinates Kafka cluster metadata (legacy; KRaft replaces it in Kafka 3.x) |
| **Offset** | Position of a message within a partition |
