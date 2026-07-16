using Confluent.Kafka;

// ── Kafka Consumer – Hands-On 6 ───────────────────────────────────────────
// Continuously polls the Kafka topic and prints received messages.

const string BootstrapServers = "localhost:9092";
const string Topic            = "chat-topic";
const string GroupId          = "chat-consumer-group";

var config = new ConsumerConfig
{
    BootstrapServers = BootstrapServers,
    GroupId          = GroupId,
    AutoOffsetReset  = AutoOffsetReset.Earliest
};

Console.WriteLine("=== Kafka Consumer ===");
Console.WriteLine($"Topic: {Topic}  |  Group: {GroupId}");
Console.WriteLine("Listening for messages... Press Ctrl+C to stop.\n");

using var consumer = new ConsumerBuilder<Ignore, string>(config).Build();
consumer.Subscribe(Topic);

var cts = new CancellationTokenSource();
Console.CancelKeyPress += (_, e) => { e.Cancel = true; cts.Cancel(); };

try
{
    while (!cts.Token.IsCancellationRequested)
    {
        var result = consumer.Consume(cts.Token);
        Console.WriteLine($"[{result.TopicPartitionOffset}] {result.Message.Value}");
    }
}
catch (OperationCanceledException) { }
finally
{
    consumer.Close();
    Console.WriteLine("\nConsumer closed.");
}
