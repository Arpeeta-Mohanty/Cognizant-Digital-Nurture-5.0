using Confluent.Kafka;
using System.Windows.Forms;

namespace ChatWindows;

/// <summary>
/// Windows Forms Chat Application – Hands-On 6.
/// Each form instance is an independent Kafka producer + consumer.
/// </summary>
public class ChatForm : Form
{
    private const string BootstrapServers = "localhost:9092";
    private const string Topic            = "chat-topic";

    private readonly string _userName;
    private IProducer<Null, string>? _producer;
    private CancellationTokenSource _cts = new();

    // ── UI Controls ────────────────────────────────────────────────────────
    private readonly RichTextBox _chatBox   = new() { Dock = DockStyle.Fill, ReadOnly = true, BackColor = Color.White };
    private readonly TextBox     _inputBox  = new() { Dock = DockStyle.Fill, PlaceholderText = "Type a message..." };
    private readonly Button      _sendBtn   = new() { Text = "Send", Dock = DockStyle.Right, Width = 80 };
    private readonly StatusStrip _status    = new();
    private readonly ToolStripStatusLabel _statusLabel = new() { Text = "Connecting..." };

    public ChatForm(string userName)
    {
        _userName = userName;
        Text      = $"Kafka Chat – {userName}";
        Size      = new Size(600, 450);
        MinimumSize = new Size(400, 300);

        BuildUI();
        Load += async (_, _) => await InitKafkaAsync();
        FormClosing += (_, _) => { _cts.Cancel(); _producer?.Dispose(); };
    }

    private void BuildUI()
    {
        _status.Items.Add(_statusLabel);

        var bottomPanel = new Panel { Dock = DockStyle.Bottom, Height = 40 };
        bottomPanel.Controls.Add(_inputBox);
        bottomPanel.Controls.Add(_sendBtn);

        Controls.Add(_chatBox);
        Controls.Add(bottomPanel);
        Controls.Add(_status);

        _sendBtn.Click += async (_, _) => await SendMessageAsync();
        _inputBox.KeyDown += async (_, e) =>
        {
            if (e.KeyCode == Keys.Enter) { e.SuppressKeyPress = true; await SendMessageAsync(); }
        };
    }

    private async Task InitKafkaAsync()
    {
        _producer = new ProducerBuilder<Null, string>(
            new ProducerConfig { BootstrapServers = BootstrapServers }).Build();

        _statusLabel.Text = $"Connected as {_userName}";
        AppendChat($"[System] Connected to topic '{Topic}' as {_userName}");

        // Start consumer on background thread
        await Task.Run(() => ConsumeMessages(_cts.Token));
    }

    private async Task SendMessageAsync()
    {
        var text = _inputBox.Text.Trim();
        if (string.IsNullOrEmpty(text) || _producer is null) return;

        _inputBox.Clear();
        var payload = $"[{_userName}] {text}";

        try
        {
            await _producer.ProduceAsync(Topic, new Message<Null, string> { Value = payload });
            AppendChat($"You: {text}");
        }
        catch (Exception ex)
        {
            AppendChat($"[Error] {ex.Message}");
        }
    }

    private void ConsumeMessages(CancellationToken token)
    {
        var cfg = new ConsumerConfig
        {
            BootstrapServers = BootstrapServers,
            GroupId          = $"winforms-{_userName}-{Guid.NewGuid():N}",
            AutoOffsetReset  = AutoOffsetReset.Latest
        };

        using var consumer = new ConsumerBuilder<Ignore, string>(cfg).Build();
        consumer.Subscribe(Topic);

        try
        {
            while (!token.IsCancellationRequested)
            {
                var result = consumer.Consume(token);
                var msg    = result.Message.Value;

                // Skip own messages (already shown on send)
                if (msg.StartsWith($"[{_userName}]")) continue;

                Invoke(() => AppendChat(msg));
            }
        }
        catch (OperationCanceledException) { }
        finally { consumer.Close(); }
    }

    private void AppendChat(string message)
    {
        _chatBox.AppendText($"[{DateTime.Now:HH:mm:ss}] {message}{Environment.NewLine}");
        _chatBox.ScrollToCaret();
    }
}
