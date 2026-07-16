# Kafka – Hands-On 6

## Architecture

```
Producer → [Topic: chat-topic] → Consumer
              ↕ Broker (localhost:9092)
           ZooKeeper (port 2181)
```

| Component | Role |
|---|---|
| **Broker** | Kafka server; stores messages in topics |
| **Topic** | Named log of messages (e.g. `chat-topic`) |
| **Partition** | Ordered sub-log within a topic; enables parallelism |
| **Producer** | Publishes messages to a topic |
| **Consumer** | Reads messages from a topic |
| **Consumer Group** | Multiple consumers sharing partitions for load balancing |
| **ZooKeeper** | Manages broker metadata (replaced by KRaft in Kafka 3.3+) |
| **Offset** | Sequential ID of a message within a partition |

---

## Projects

| Project | Description |
|---|---|
| `Producer/` | Standalone console producer – type messages, send to Kafka |
| `Consumer/` | Standalone console consumer – reads and prints all messages |
| `ChatConsole/` | Bidirectional chat – each instance is producer + consumer |
| `ChatWindows/` | Windows Forms GUI chat – multiple windows = multiple clients |

---

## Quick Start

### 1. Start Kafka (Windows)
```cmd
# Terminal 1 – ZooKeeper
C:\kafka\bin\windows\zookeeper-server-start.bat C:\kafka\config\zookeeper.properties

# Terminal 2 – Broker
C:\kafka\bin\windows\kafka-server-start.bat C:\kafka\config\server.properties

# Terminal 3 – Create topic (once)
C:\kafka\bin\windows\kafka-topics.bat --create --topic chat-topic --bootstrap-server localhost:9092 --partitions 1 --replication-factor 1
```

### 2. Run Producer + Consumer
```bash
# Terminal A
cd Kafka\Producer && dotnet run

# Terminal B
cd Kafka\Consumer && dotnet run
```

### 3. Run Console Chat (2 instances)
```bash
# Terminal A
cd Kafka\ChatConsole && dotnet run
# Enter name: Alice

# Terminal B
cd Kafka\ChatConsole && dotnet run
# Enter name: Bob
```

### 4. Run Windows Forms Chat
```bash
cd Kafka\ChatWindows && dotnet run
# Opens GUI – launch multiple times for multiple clients
```

---

## Expected Output

**Producer terminal:**
```
=== Kafka Producer ===
Topic: chat-topic
Message: Hello Kafka!
  ✓ Delivered to [chat-topic [[0]] @5]
```

**Consumer terminal:**
```
=== Kafka Consumer ===
[chat-topic [[0]] @5] Hello Kafka!
```
