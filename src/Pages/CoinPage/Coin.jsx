import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import DOMPurify from "dompurify";

import "./coin.css";

export const Coin = () => {
  const [coin, setCoin] = useState({});
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    const getSingleCoin = async () => {
      try {
        const response = await fetch(
          `https://coingecko-proxy-nodejs.vercel.app/coin/${id}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        setCoin(data);
      } catch (err) {
        console.error("Error fetching data: ", err);
      } finally {
        setLoading(false);
      }
    };

    getSingleCoin();
  }, [id]);

  return (
    <main>
      <section className="container">
        {loading ? (
          <p className="loading">Loading...</p>
        ) : coin.name ? (
          <div>
            <div className="content">
              <h1>{coin.name}</h1>
            </div>
            <div className="content">
              <div className="coin-rank">
                <span>Rank #{coin.market_cap_rank}</span>
              </div>
              <div className="coin-info">
                <div className="coin-img-name">
                  {coin.image ? (
                    <img src={coin.image.small} alt={coin.id} />
                  ) : null}
                  <p>{coin.name}</p>
                  <p>
                    &#x28;{" "}
                    {coin.symbol ? coin.symbol.toUpperCase() + "/USD" : null}{" "}
                    &#x29;
                  </p>
                </div>
                <div className="coin-price">
                  {coin.market_data ? (
                    <h1>${coin.market_data.current_price.usd}</h1>
                  ) : null}
                </div>
              </div>
            </div>

            <div className="content">
              <table className="coin-price-change">
                <thead>
                  <tr>
                    <th>1h</th>
                    <th>24h</th>
                    <th>7d</th>
                    <th>14d</th>
                    <th className="hide-mobile">30d</th>
                    <th className="hide-mobile">1y</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td
                      className={`${
                        coin.market_data
                          ? coin.market_data
                              .price_change_percentage_1h_in_currency.usd > 0
                            ? "green"
                            : "red"
                          : " "
                      }`}
                    >
                      {coin.market_data
                        ? coin.market_data
                            .price_change_percentage_1h_in_currency.usd + "%"
                        : null}
                    </td>
                    <td
                      className={`${
                        coin.market_data
                          ? coin.market_data
                              .price_change_percentage_24h_in_currency.usd > 0
                            ? "green"
                            : "red"
                          : " "
                      }`}
                    >
                      {coin.market_data
                        ? coin.market_data
                            .price_change_percentage_24h_in_currency.usd + "%"
                        : null}
                    </td>
                    <td
                      className={`${
                        coin.market_data
                          ? coin.market_data
                              .price_change_percentage_7d_in_currency.usd > 0
                            ? "green"
                            : "red"
                          : " "
                      }`}
                    >
                      {coin.market_data
                        ? coin.market_data
                            .price_change_percentage_7d_in_currency.usd + "%"
                        : null}
                    </td>
                    <td
                      className={`${
                        coin.market_data
                          ? coin.market_data
                              .price_change_percentage_14d_in_currency.usd > 0
                            ? "green"
                            : "red"
                          : " "
                      }`}
                    >
                      {coin.market_data
                        ? coin.market_data
                            .price_change_percentage_14d_in_currency.usd + "%"
                        : null}
                    </td>
                    <td
                      className={`${
                        coin.market_data
                          ? coin.market_data
                              .price_change_percentage_30d_in_currency.usd > 0
                            ? "green"
                            : "red"
                          : " "
                      } hide-mobile`}
                    >
                      {coin.market_data
                        ? coin.market_data
                            .price_change_percentage_30d_in_currency.usd + "%"
                        : null}
                    </td>
                    <td
                      className={`${
                        coin.market_data
                          ? coin.market_data
                              .price_change_percentage_1y_in_currency.usd > 0
                            ? "green"
                            : "red"
                          : " "
                      } hide-mobile`}
                    >
                      {coin.market_data
                        ? coin.market_data
                            .price_change_percentage_1y_in_currency.usd + "%"
                        : null}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="content">
              <div className="about">
                <h2>About</h2>
                <div
                  dangerouslySetInnerHTML={{
                    __html: coin.description
                      ? DOMPurify.sanitize(coin.description.en)
                      : "",
                  }}
                ></div>
              </div>
            </div>
          </div>
        ) : (
          <p className="no-data">No data found.</p>
        )}
      </section>
    </main>
  );
};
