import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import "./home.css";

export const Home = () => {
  const [coins, setCoins] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const getAllCoins = async () => {
    try {
      const response = await fetch(
        "https://coingecko-proxy-nodejs.vercel.app/coins"
      );
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      setCoins(data);
    } catch (err) {
      console.error("Error fetching data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllCoins();
  }, []);

  const filteredCoins = coins.filter((coin) => {
    return coin.name.toLowerCase().includes(search.toLowerCase());
  });

  return (
    <main>
      <section className="container">
        <div className="search">
          <input
            type="text"
            name="search"
            id="search"
            placeholder="Search..."
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="heading">
          <p>#</p>
          <p className="coin-field">Coin</p>
          <p>Price</p>
          <p>24h %</p>
          <p className="hide-mobile">Volume</p>
          <p className="hide-mobile">Market cap</p>
        </div>
        {loading ? (
          <p className="loading">Loading...</p>
        ) : coins.length > 0 ? (
          filteredCoins.map((coin, index) => (
            <div
              key={index}
              className="coin-row"
              onClick={() => navigate(`/coin/${coin.id}`)}
            >
              <p>{coin.market_cap_rank}</p>
              <div className="img-symbol">
                <img src={coin.image} alt={coin.id} />
                <p>{coin.symbol.toUpperCase()}</p>
              </div>
              <p>${coin.current_price}</p>
              <p
                className={`${
                  coin.price_change_percentage_24h < 0 ? "red" : "green"
                }`}
              >
                {coin.price_change_percentage_24h.toFixed(2)}%
              </p>
              <p className="hide-mobile">{coin.total_volume}</p>
              <p className="hide-mobile">{coin.market_cap}</p>
            </div>
          ))
        ) : (
          <p className="no-data">No data found.</p>
        )}
      </section>
    </main>
  );
};
