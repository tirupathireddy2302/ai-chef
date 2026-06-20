import { useNavigate } from "react-router-dom";

function LiveChannelsPage() {
  const navigate = useNavigate();

  const channels = [
    {
      name: "Food Network",
      subscribers: "2.5M",
      video:
        "https://www.youtube.com/embed/dQw4w9WgXcQ",
    },
    {
      name: "Indian Kitchen",
      subscribers: "1.8M",
      video:
        "https://www.youtube.com/embed/dQw4w9WgXcQ",
    },
  ];

  return (
    <div className="live-page">

      <button
        className="back-btn"
        onClick={() => navigate("/")}
      >
        🏠 Back Home
      </button>

      <h1>
        🔴 Live Cooking Channels
      </h1>

      {channels.map(
        (channel, index) => (
          <div
            key={index}
            className="channel-card"
          >
            <h2>
              {channel.name}
            </h2>

            <p>
              👥 {channel.subscribers}
              Subscribers
            </p>

            <iframe
              width="100%"
              height="400"
              src={channel.video}
              title={channel.name}
              allowFullScreen
            />

            <button
              className="subscribe-btn"
            >
              Subscribe
            </button>

          </div>
        )
      )}

    </div>
  );
}

export default LiveChannelsPage;