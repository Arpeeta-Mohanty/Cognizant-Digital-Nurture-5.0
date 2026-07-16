using Confluent.Kafka;

// ── Kafka Producer – Hands-On 6 ───────────────────────────────────────────
// Sends user-typed messages to the configured Kafka topic.
// Prerequisites: Kafka broker running on localhost:9092

const string BootstrapServers = "localhost:9092";
const string Topic            = "chat-topic";

var config = new ProducerConfig { BootstrapServers = BootstrapServers };

Console.WriteLine("=== Kafka Producer ===");
Console.WriteLine($"Topic: {Topic}");
Console.WriteLine("Type a message and press Enter. Type 'exit' to quit.\n");

using var producer = new ProducerBuilder<Null, string>(config).Build();

while (true)
{
    Console.Write("Message: ");
    var message = Console.ReadLine();

    if (string.IsNullOrWhiteSpace(message)) continue;
    if (message.Equals("exit", StringComparison.OrdinalIgnoreCase)) break;

    try
    {
        var result = await producer.ProduceAsync(Topic, new Message<Null, string> { Value = message });
        Console.WriteLine($"  ✓ Delivered to [{result.TopicPartitionOffset}]");
    }
    catch (ProduceException<Null, string> ex)
    {
        Console.WriteLine($"  ✗ Delivery failed: {ex.Error.Reason}");
    }
}

Console.WriteLine("Producer closed.");
