import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import './StockTicker.css';

interface Stock {
    symbol: string;
    price: number;
    change: number;
}

const initialStocks: Stock[] = [
    { symbol: 'SENSEX', price: 72840.25, change: 1.24 },
    { symbol: 'NIFTY', price: 22045.80, change: 0.87 },
    { symbol: 'BANKNIFTY', price: 46890.45, change: -0.32 },
    { symbol: 'RELIANCE', price: 2890.15, change: 1.56 },
    { symbol: 'TCS', price: 3945.60, change: 0.45 },
    { symbol: 'HDFC', price: 1680.30, change: -0.18 },
    { symbol: 'INFY', price: 1520.75, change: 2.12 },
    { symbol: 'ICICI', price: 1078.90, change: 0.93 },
];

const StockTicker = () => {
    const [stocks, setStocks] = useState(initialStocks);

    // Simulate live price updates - less frequent to reduce re-renders
    useEffect(() => {
        const interval = setInterval(() => {
            setStocks(prevStocks =>
                prevStocks.map(stock => ({
                    ...stock,
                    price: stock.price + (Math.random() - 0.5) * 10,
                    change: stock.change + (Math.random() - 0.5) * 0.5,
                }))
            );
        }, 5000); // Changed to 5 seconds

        return () => clearInterval(interval);
    }, []);

    // Duplicate stocks for seamless loop
    const tickerItems = [...stocks, ...stocks];

    return (
        <motion.div
            className="stock-ticker-container"
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
                duration: 0.8,
                delay: 1.2,
                ease: [0.4, 0, 0.2, 1]
            }}
        >
            <div className="stock-ticker">
                {tickerItems.map((stock, index) => (
                    <div key={`${stock.symbol}-${index}`} className="stock-item">
                        <span className="stock-symbol">{stock.symbol}</span>
                        <span className="stock-price">₹{stock.price.toFixed(2)}</span>
                        <span className={`stock-change ${stock.change >= 0 ? 'positive' : 'negative'}`}>
                            {stock.change >= 0 ? '▲' : '▼'} {Math.abs(stock.change).toFixed(2)}%
                        </span>
                        <div className="stock-bars">
                            <div className="stock-bar bar-1" style={{ backgroundColor: stock.change >= 0 ? '#22c55e' : '#ef4444' }} />
                            <div className="stock-bar bar-2" style={{ backgroundColor: stock.change >= 0 ? '#22c55e' : '#ef4444' }} />
                            <div className="stock-bar bar-3" style={{ backgroundColor: stock.change >= 0 ? '#22c55e' : '#ef4444' }} />
                            <div className="stock-bar bar-4" style={{ backgroundColor: stock.change >= 0 ? '#22c55e' : '#ef4444' }} />
                            <div className="stock-bar bar-5" style={{ backgroundColor: stock.change >= 0 ? '#22c55e' : '#ef4444' }} />
                        </div>
                    </div>
                ))}
            </div>
        </motion.div>
    );
};

export default StockTicker;
