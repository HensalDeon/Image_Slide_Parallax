import "./App.scss";

import { useEffect, useRef } from "react";

const App = () => {
    const carouselRef = useRef(null);
    const imgsRef = useRef([]);
    const transformProp = typeof document.documentElement.style.transform === "string" ? "transform" : "WebkitTransform";

    useEffect(() => {
        const elem = carouselRef.current;
        const flkty = new Flickity(elem, {
            imagesLoaded: true,
            cellAlign: "center",
            contain: true,
        });

        flkty.on("scroll", () => {
            flkty.slides.forEach((slide, i) => {
                const img = imgsRef.current[i];
                const x = ((slide.target + flkty.x) * -1.5) / 2.5;

                img.style[transformProp] = `translateX(${x}px)`;
            });
        });

        return () => {
            flkty.destroy();
        };
    }, [transformProp]);

    const images = [1, 2, 3, 4, 5];
    const numCards = 5; // Set the number of cards you want

    const generateCards = () => {
        let index = 0;
        const cards = [];

        while (index < numCards) {
            cards.push(
                <div className="carousel-item" key={index}>
                    <div className="card">
                        <div className="card__image" ref={(el) => (imgsRef.current[index] = el)}>
                            <img src={`http://unsplash.it/300/?image=${index * 29}`} alt="img" />
                        </div>
                        <div className="card__info">
                            <h2 className="card__title">
                                Card No<sup>{index + 1}</sup>
                            </h2>
                            <div className="card__desc">Just another simple card user interface</div>
                        </div>
                    </div>
                </div>
            );
            index++;
        }

        return cards;
    };

    return (
        <div className="phone-viewport">
            <div className="carousel" ref={carouselRef}>
                {/* {images.map((image, index) => (
                    <div className="carousel-item" key={index}>
                        <div className="card">
                            <div className="card__image" ref={(el) => (imgsRef.current[index] = el)}>
                                <img src={`http://unsplash.it/300/?image=${index * 29}`} alt="img" />
                            </div>
                            <div className="card__info">
                                <h2 className="card__title">
                                    Card No<sup>{index + 1}</sup>
                                </h2>
                                <div className="card__desc">Just another simple card user interface</div>
                            </div>
                        </div>
                    </div>
                ))} */}
                {generateCards()}
            </div>
        </div>
    );
};

export default App;
