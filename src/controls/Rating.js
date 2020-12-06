import React, { Component } from "react";

class Rating extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <section>
            <div class={`rating ${this.props.Size} ${this.props.Color}`}>
                <div class="rating-stars">
            <ul class="rating-stars-background">
                        <li><i class="glyph glyph-star"></i></li>
                        <li><i class="glyph glyph-star"></i></li>
                        <li><i class="glyph glyph-star"></i></li>
                        <li><i class="glyph glyph-star"></i></li>
                        <li><i class="glyph glyph-star"></i></li>
                    </ul>
                    <ul class="rating-stars-value" style={{ width: `${this.props.Rating}%` }}>
                        <li><i class="glyph glyph-star"></i></li>
                        <li><i class="glyph glyph-star"></i></li>
                        <li><i class="glyph glyph-star"></i></li>
                        <li><i class="glyph glyph-star"></i></li>
                        <li><i class="glyph glyph-star"></i></li>
                    </ul>
                </div>
                {this.props.Label ? <div class="rating-label rating-label-right">{this.props.Label}</div> : null}
            </div>
        </section>;
    }
};

export default Rating;