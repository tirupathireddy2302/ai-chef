import { useNavigate } from "react-router-dom";
import "./../styles/home.css";

function LiveChannels() {
  const navigate = useNavigate();

  const channels = [
    {
      name: "Food Network",
      viewers: "12K",
      image:
        "https://images.unsplash.com/photo-1556911220-bff31c812dba?w=500",
    },
    {
      name: "Chef Master",
      viewers: "8K",
      image:
        "https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?w=500",
    },
    {
      name: "Indian Kitchen",
      viewers: "15K",
      image:
        "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=500",
    },
  ];

  return (
    <section className="live-section">
      <div className="section-header">
        <h2>🔴 Live Cooking Channels</h2>

        <span
          onClick={() =>
            navigate("/live-channels")
          }
        >
          See All
        </span>
      </div>

      <div className="live-grid">
        {channels.map((channel, index) => (
          <div
            key={index}
            className="live-channel"
            onClick={() =>
              navigate("/live-channels")
            }
          >
            <div className="live-avatar">
              <img
                src={channel.image}
                alt={channel.name}
              />
            </div>

            <h4>{channel.name}</h4>

            <p>🔴 {channel.viewers}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default LiveChannels;