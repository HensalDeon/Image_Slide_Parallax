import "./App.scss";

import { useEffect, useRef } from "react";

const App = () => {
    const carouselRef = useRef(null);
    const imgsRef = useRef([]);
    const transformProp = typeof document.documentElement.style.transform === "string" ? "transform" : "WebkitTransform";

    useEffect(() => {
        const elem = carouselRef.current;
        // eslint-disable-next-line no-undef
        const flkty = new Flickity(elem, {
            imagesLoaded: true,
            cellAlign: "center",
            contain: true,
        });

        // setting the scroll effect
        flkty.on("scroll", () => {
            flkty.slides.forEach((slide, i) => {
                const img = imgsRef.current[i];
                const x = ((slide.target + flkty.x) * -1.7) / 2.5;

                img.style[transformProp] = `translateX(${x}px)`;
            });
        });

        return () => {
            flkty.destroy();
        };
    }, [transformProp]);

    // create cards as you wish
    const carouselItems = [];
    for (let i = 0; i < 6; i++) {
        carouselItems.push(
            <div className="carousel-item" key={i}>
                <div className="card">
                    <div className="card__image" ref={(el) => (imgsRef.current[i] = el)}>
                        <img src={`http://unsplash.it/300/?image=${i * 29}`} alt="img" />
                    </div>
                    <div className="card__info">
                        <h2 className="card__title">
                            Card No<sup>{i + 1}</sup>
                        </h2>
                        <div className="card__desc">Just another simple card user interface</div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="phone-viewport">
            <div className="carousel" ref={carouselRef}>
                {carouselItems}
            </div>
        </div>
    );
};

export default App;
