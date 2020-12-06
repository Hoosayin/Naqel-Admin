import React, { Component } from "react";
import axios from "axios";
import Strings from "../res/strings";

class ImageUploader extends Component {
    constructor(props) {
        super(props);

        this.state = {
            Image: null,
            UploadProgress: null,
        };

        this.onImageUpload = this.onImageUpload.bind(this);
    }

    onImageUpload = event => {
        this.state.Image = event.target.files[0];

        if (this.state.Image) {
            let mimeType = this.state.Image.type;

            if (!mimeType.startsWith("image")) {
                this.props.OnInvalidImageSelected();
                return;
            }
        }

        const formData = new FormData();

        try {
            formData.append("Image", this.state.Image, this.state.Image.name);
        }
        catch (exception) {
            this.setState({
                UploadProgress: null,
            });

            return;
        }

        axios.post(Strings.IMAGE_UPLOADER, formData, {
            onUploadProgress: event => {
                this.setState({
                    UploadProgress: (
                        <div className="progress-bar">
                            <div className="progress-circle"></div>
                            <div className="progress-circle"></div>
                            <div className="progress-circle"></div>
                            <div className="progress-circle"></div>
                            <div className="progress-circle"></div>
                        </div>
                    ),
                });
            }
        }).then(async response => {
            this.props.OnImageUploaded(response.data);

            this.setState({
                UploadProgress: null,
            });
        }).catch((error) => {
            this.props.OnImageUploaded(error);

            this.setState({
                UploadProgress: null,
            });
        });
    }

    onSubmit = async e => {
        e.preventDefault();
    }

    render() {
        return (
            <div>
                <input type="file" onChange={this.onImageUpload} style={{ display: "none", }} ref={fileInput => this.fileInput = fileInput} />
                <figure className="media">
                    <div className="media-img media-img-has-play ratio-1-1">
                        <a onClick={() => this.fileInput.click()}>
                            <img src={this.props.Source} alt="ProfilePhoto.png"
                                style={{
                                    border: "5px solid #3A3A3C"
                                }} />
                            <i className="glyph glyph-edit"></i>
                        </a>
                    </div>
                </figure>
                {this.state.UploadProgress}
            </div>
                
        );
    }
};

export default ImageUploader;