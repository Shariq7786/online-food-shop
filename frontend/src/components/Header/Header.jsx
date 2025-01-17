import React, { useState, useEffect, useContext } from 'react';
import './Header.css';
import { StoreContext } from '../../Context/StoreContext';
import { assets } from '../../assets/assets';

const Header = () => {
    const { food_list, url, addToCart, cartItems } = useContext(StoreContext);
    const [currentSlide, setCurrentSlide] = useState(0);
    const [specialItems, setSpecialItems] = useState([]);

    useEffect(() => {
        // Filter items marked as special
        const specials = food_list.filter(item => item.isSpecial);
        setSpecialItems(specials);
    }, [food_list]);

    useEffect(() => {
        if (specialItems.length <= 1) return;

        const timer = setInterval(() => {
            setCurrentSlide((prev) => 
                prev === specialItems.length - 1 ? 0 : prev + 1
            );
        }, 3000);

        return () => clearInterval(timer);
    }, [specialItems.length]);

    const goToMenu = () => {
        document.getElementById('explore-menu')?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <div className='header'>
            <div className='header-contents'>
                <h2>Today's Special Menu</h2>
                {specialItems.length > 0 ? (
                    <div className="special-items-container">
                        <div className="special-item">
                            <div className="special-item-image">
                                <img 
                                    src={`${url}/images/${specialItems[currentSlide]?.image}`} 
                                    alt={specialItems[currentSlide]?.name} 
                                />
                            </div>
                            <div className="special-item-info">
                                <h3>{specialItems[currentSlide]?.name}</h3>
                                <p>{specialItems[currentSlide]?.description}</p>
                                <div className="special-item-price">
                                    <span>${specialItems[currentSlide]?.price}</span>
                                    <button 
                                        onClick={() => addToCart(specialItems[currentSlide]?._id)}
                                        className="order-button"
                                    >
                                        {!cartItems[specialItems[currentSlide]?._id] ? (
                                            <>
                                                <img src={assets.add_icon_white} alt="add" />
                                                Add to Cart
                                            </>
                                        ) : (
                                            `In Cart (${cartItems[specialItems[currentSlide]?._id]})`
                                        )}
                                    </button>
                                </div>
                                {specialItems.length > 1 && (
                                    <div className="slide-dots">
                                        {specialItems.map((_, index) => (
                                            <div
                                                key={index}
                                                className={`dot ${index === currentSlide ? 'active' : ''}`}
                                                onClick={() => setCurrentSlide(index)}
                                            />
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                        <button onClick={goToMenu} className="view-menu-button">View Full Menu</button>
                    </div>
                ) : (
                    <div className="no-specials">
                        <p>No special items available For today</p>
                        <button onClick={goToMenu}>View Our Regular Menu</button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Header;