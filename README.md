Honeypot for Security Monitoring

A customizable and scalable honeypot designed for security monitoring. This honeypot listens on multiple ports and provides detailed logs, attack detection, and alerts. It can be configured to handle different types of attacks, collect IP information, and send notifications via Telegram.
Features

    Multi-Port Support: Run honeypots on multiple ports simultaneously.
    Attack Detection: Detect and log various types of attacks such as SQL Injection and Brute Force.
    IP Information: Retrieve and log information about the IP addresses that connect to the honeypot.
    Customizable Response: Send customizable response messages to connecting clients.
    Telegram Alerts: Send real-time alerts to a Telegram chat about detected attacks and connection events.
    Configurable Settings: Easily enable or disable features through a configuration file.

Installation
Clone the Repository:

    git clone https://github.com/rauandeveloper/honeypot.git
    cd honeypot

Install Dependencies:

    npm install axios telegraf

Create Configuration File:

Copy config.example.json to config.json and update the settings as needed.

Run the Honeypot:

    node honeypot.js

Configuration

The honeypot is configured via a config.json file. Key settings include:

    PORTS: List of ports to listen on.
    LOG_FILE: Path to the file where logs are stored.
    REPORT_FILE: Path to the file where attack reports are stored.
    IPINFO_ENABLED: Enable or disable IP information retrieval.
    REPORT_ENABLED: Enable or disable attack reports.
    TELEGRAM_ENABLED: Enable or disable Telegram alerts.
    TELEGRAM_BOT_TOKEN: Your Telegram bot token.
    TELEGRAM_CHAT_ID: Your Telegram chat ID.
    RESPONSE_MESSAGE: Custom message to send to connecting clients.
    ATTACK_DETECTION_ENABLED: Enable or disable attack detection.

Usage

    Start the Honeypot: Run node honeypot.js to start the honeypot.
    View Logs: Check the log file specified in the configuration for connection details and attack logs.
    Receive Alerts: Get real-time alerts in your Telegram chat about detected attacks and connection events.

Contributing

Contributions are welcome! Please follow the contributing guidelines for submitting pull requests and issues.
