using ChatWindows;

// ── Windows Forms Chat – Entry Point ──────────────────────────────────────
ApplicationConfiguration.Initialize();

var name = Microsoft.VisualBasic.Interaction.InputBox(
    "Enter your display name:", "Kafka Chat", "User1");

if (string.IsNullOrWhiteSpace(name)) name = "User1";

Application.Run(new ChatForm(name));
