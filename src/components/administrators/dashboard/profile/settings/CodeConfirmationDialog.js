import React, { Component } from "react";
import Preloader from "../../../../../controls/Preloader";
import { usernameAndEmailSettings } from "../../../AdministratorFunctions";

class CodeConfirmationDialog extends Component {
    constructor(props) {
        super(props);

        this.state = {
            ConfirmCode: "",

            ValidConfirmCode: false,

            ValidForm: false,
            ShowPreloader: false,

            Errors: {
                ConfirmCode: "",
            }
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.validateField = this.validateField.bind(this);
    }

    onChange = event => {
        const name = event.target.name;
        const value = event.target.value;

        this.setState({ [name]: value },
            () => { this.validateField(name, value) });
    }

    validateField(field, value) {
        let Errors = this.state.Errors;
        let ValidConfirmCode = this.state.ValidConfirmCode;

        ValidConfirmCode = value === "12345";
        Errors.ConfirmCode = ValidConfirmCode ? "" : "Invalid code.";

        this.setState({
            Errors: Errors,
            ValidConfirmCode: ValidConfirmCode,
        }, () => {
                this.setState({
                    ValidForm: this.state.ValidConfirmCode
                });
        });
    }

    onSubmit = async event => {
        event.preventDefault();

        if (!this.state.ValidForm) {
            return;
        }

        this.setState({
            ShowPreloader: true
        });

        const updatedAdministrator = {
            Token: sessionStorage.Token,
            Username: this.props.Username,
            Email: this.props.Email,
        };

        await usernameAndEmailSettings(updatedAdministrator).then(response => {
            this.setState({
                ShowPreloader: false
            });

            if (response.Message === "Administrator is updated.") {
                this.props.OnOK(this.cancelButton);
            }
        });
    }

    render() {
        const {
            ConfirmCode,
            ValidForm,
            ShowPreloader,
            Errors
        } = this.state;

        return <section>
            <div className="modal in" id="code-confirmation-dialog" tabIndex="-1"
                role="dialog" aria-labelledby="modal-sample-label" aria-hidden="true"
                style={{ display: "block" }}>
                {ShowPreloader ? <Preloader /> : null}
                <div className="modal-dialog" style={{ width: "auto", maxWidth: "95%" }}>
                    <div className="modal-content" style={{ backgroundColor: "#FEFEFE" }}>
                        <div className="modal-header">
                            <div className="text-right">
                                <button className="btn btn-primary" style={{ minWidth: "0px" }}
                                    data-dismiss="modal" onClick={this.props.OnCancel}
                                    ref={cancelButton => this.cancelButton = cancelButton}>
                                    <span className="fas fa-times"></span>
                                </button>
                            </div>
                        </div>
                        <div className="modal-body">
                            <form noValidate onSubmit={this.onSubmit}>
                                <div className="jumbotron theme-default">
                                    <div className="container">
                                        <div className="row">
                                            <div className="col-md-24">
                                                <div className="type-h3 color-default p-t-n">Email Confirmation</div>
                                                <div className="type-sh3 m-b-xxs">We delivered a confirmation code to your email.</div>
                                                <div className="form-group">
                                                    <label className="control-label">Confirmation Code</label>
                                                    <span className="text-danger m-l-xxxs">*</span>
                                                    <input type="text" name="ConfirmCode" className="form-control" autoComplete="off"
                                                        value={ConfirmCode} onChange={this.onChange} />
                                                    <span className="text-danger">{Errors.ConfirmCode}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <input type="submit" value="Confirm" className="btn btn-primary" disabled={!ValidForm} />
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>;
    }
};

export default CodeConfirmationDialog;