using Confluent.Kafka;

// ── Console Chat Application – Hands-On 6 ────────────────────────────────
// Each instance acts as both producer and consumer.
// Run multiple instances to simulate multi-user chat.

const string BootstrapServers = "localhost:9092";
const string Topic            = "chat-topic";
const string GroupId          = "chat-group";

Console.Write("Enter your display name: ");
var userName = Console.ReadLine()?.Trim() ?? "Anonymous";

var cts = new CancellationTokenSource();
Console.CancelKeyPress += (_, e) => { e.Cancel = true; cts.Cancel(); };

// ── Consumer thread ────────────────────────────────────────────────────────
var consumerThread = Task.Run(() =>
{
    var cfg = new ConsumerConfig
    {
        BootstrapServers = BootstrapServers,
        GroupId          = $"{GroupId}-{userName}",
        AutoOffsetReset  = AutoOffsetReset.Latest
    };

    using var consumer = new ConsumerBuilder<Ignore, string>(cfg).Build();
    consumer.Subscribe(Topic);

    try
    {
        while (!cts.Token.IsCancellationRequested)
        {
            var result = consumer.Consume(cts.Token);
            // Only print messages from others
            if (!result.Message.Value.StartsWith($"[{userName}]"))
                Console.WriteLine($"\n  ← {result.Message.Value}");
        }
    }
    catch (OperationCanceledException) { }
    finally { consumer.Close(); }
});

// ── Producer (main thread) ─────────────────────────────────────────────────
var producerCfg = new ProducerConfig { BootstrapServers = BootstrapServers };
using var producer = new ProducerBuilder<Null, string>(producerCfg).Build();

Console.WriteLine($"\nChat started as '{userName}'. Type messages below (Ctrl+C to exit):\n");

while (!cts.Token.IsCancellationRequested)
{
    var input = Console.ReadLine();
    if (string.IsNullOrWhiteSpace(input)) continue;

    var payload = $"[{userName}] {input}";
    await producer.ProduceAsync(Topic, new Message<Null, string> { Value = payload }, cts.Token);
}

await consumerThread;
Console.WriteLine("Chat closed.");
