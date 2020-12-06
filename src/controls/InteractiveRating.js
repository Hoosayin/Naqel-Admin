import React, { Component } from "react";

class InteractiveRating extends Component {
    constructor(props) {
        super(props);

        this.state = {
            Rating: 0
        };

        this.onRate = this.onRate.bind(this);
    }

    onRate = rating => {
        this.props.OnRated(rating);

        this.setState({
            Rating: rating
        });
    };

    render() {
        return <section>
            <div class="rating">
                <div class="rating-stars">
                    <ul class="rating-stars-background">
                        <li><i class="glyph glyph-star"></i></li><li>
                            <i class="glyph glyph-star"></i></li><li>
                            <i class="glyph glyph-star"></i></li><li>
                            <i class="glyph glyph-star"></i></li><li>
                            <i class="glyph glyph-star"></i></li>
                    </ul>
                    <ul class="rating-stars-value" style={{ width: `${this.state.Rating}%` }}>
                        <li><i class="glyph glyph-star"></i></li><li>
                            <i class="glyph glyph-star"></i></li><li>
                            <i class="glyph glyph-star"></i></li><li>
                            <i class="glyph glyph-star"></i></li><li>
                            <i class="glyph glyph-star"></i></li>
                    </ul>
                    <div class="rating-stars-input">
                        <button class="rating-btn" title="1" onClick={() => { this.onRate(20); }}><i class="glyph glyph-star"></i></button>
                        <button class="rating-btn" title="2" onClick={() => { this.onRate(40); }}><i class="glyph glyph-star"></i></button>
                        <button class="rating-btn" title="3" onClick={() => { this.onRate(60); }}><i class="glyph glyph-star"></i></button>
                        <button class="rating-btn" title="4" onClick={() => { this.onRate(80); }}><i class="glyph glyph-star"></i></button>
                        <button class="rating-btn" title="5" onClick={() => { this.onRate(100); }}><i class="glyph glyph-star"></i></button>
                    </div>
                </div>
            </div>
        </section>;
    }
};

export default InteractiveRating;