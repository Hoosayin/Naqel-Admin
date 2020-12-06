import React, { Component } from "react";
import Preloader from "../../../../../controls/Preloader";
import { getData, updateNaqelSettings } from "../../../AdministratorFunctions";

class NaqelSettings extends Component {
    constructor() {
        super();

        this.state = {
            Street: "",
            City: "",
            Country: "",
            ZIPCode: "",
            PhoneNumber: "",
            Website: "",
            BusinessName: "",
            BankName: "",
            AccountNumber: "",

            ValidStreet: true,
            ValidCity: true,
            ValidCountry: true,
            ValidZIPCode: true,
            ValidPhoneNumber: true,
            ValidWebsite: true,
            ValidBusinessName: true,
            ValidBankName: true,
            ValidAccountNumber: true,

            ValidForm: false,
            SettingsSaved: false,
            ShowPreloader: false,

            Errors: {
                Street: "",
                City: "",
                Country: "",
                ZIPCode: "",
                PhoneNumber: "",
                Website: "",
                BusinessName: "",
                BankName: "",
                AccountNumber: ""
            }
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    async componentDidMount() {
        if (sessionStorage.Token) {
            let request = {
                Token: sessionStorage.Token,
                Get: "NaqelSettings"
            };

            await getData(request).then(response => {
                if (response.Message === "Naqel settings found.") {
                    let naqelSettings = response.NaqelSettings;

                    this.setState({
                        Street: naqelSettings.Street,
                        City: naqelSettings.City,
                        Country: naqelSettings.Country,
                        ZIPCode: naqelSettings.ZIPCode,
                        PhoneNumber: naqelSettings.PhoneNumber,
                        Website: naqelSettings.Website,
                        BusinessName: naqelSettings.BusinessName,
                        BankName: naqelSettings.BankName,
                        AccountNumber: naqelSettings.AccountNumber,
                    });
                }
                else {
                    this.setState({
                        Street: "",
                        City: "",
                        Country: "",
                        ZIPCode: "",
                        PhoneNumber: "",
                        Website: "",
                        BusinessName: "",
                        BankName: "",
                        AccountNumber: ""
                    });
                }
            });
        }
    }

    onChange = event => {
        const name = event.target.name;
        const value = event.target.value;

        this.setState({ [name]: value },
            () => { this.validateField(name, value) });
    }

    validateField(field, value) {
        let {
            Errors,
            ValidStreet,
            ValidCity,
            ValidCountry,
            ValidZIPCode,
            ValidPhoneNumber,
            ValidWebsite,
            ValidBusinessName,
            ValidBankName,
            ValidAccountNumber,
        } = this.state;

        switch (field) {
            case "Street":
                ValidStreet = value !== "";
                Errors.Street = ValidStreet ? "" : Dictionary.StreetError;
                break;
            case "City":
                ValidCity = value !== "";
                Errors.City = ValidCity ? "" : Dictionary.CityError;
                break;
            case "Country":
                ValidCountry = value !== "";
                Errors.Country = ValidCountry ? "" : Dictionary.CountryError;
                break;
            case "ZIPCode":
                ValidZIPCode = value !== "";
                Errors.ZIPCode = ValidZIPCode ? "" : Dictionary.ZIPCodeError;
                break;
            case "PhoneNumber":
                ValidPhoneNumber = value !== "";
                Errors.PhoneNumber = ValidPhoneNumber ? "" : Dictionary.PhoneNumberError;
                break;
            case "Website":
                ValidWebsite = value !== "";
                Errors.Website = ValidWebsite ? "" : Dictionary.WebsiteError;
                break;
            case "BusinessName":
                ValidBusinessName = value !== "";
                Errors.BusinessName = ValidBusinessName ? "" : Dictionary.BusinessNameError;
                break;
            case "BankName":
                ValidBankName = value !== "";
                Errors.BankName = ValidBankName ? "" : Dictionary.BankNameError;
                break;
            case "AccountNumber":
                ValidAccountNumber = value !== "";
                Errors.AccountNumber = ValidAccountNumber ? "" : Dictionary.AccountNumberError;
                break;
            default:
                break;
        }

        this.setState({
            Errors: Errors,
            ValidStreet: ValidStreet,
            ValidCity: ValidCity,
            ValidCountry: ValidCountry,
            ValidZIPCode: ValidZIPCode,
            ValidPhoneNumber: ValidPhoneNumber,
            ValidWebsite: ValidWebsite,
            ValidBusinessName: ValidBusinessName,
            ValidBankName: ValidBankName,
            ValidAccountNumber: ValidAccountNumber,
        }, () => {
            this.setState({
                ValidForm: ValidStreet &&
                    ValidCity &&
                    ValidCountry &&
                    ValidZIPCode &&
                    ValidPhoneNumber &&
                    ValidWebsite &&
                    ValidBusinessName &&
                    ValidBankName &&
                    ValidAccountNumber
            });
        });
    }

    onSubmit = async event => {
        event.preventDefault();

        if (!this.state.ValidForm) {
            return;
        }

        const updatedNaqelSettings = {
            Token: sessionStorage.Token,
            Street: this.state.Street,
            City: this.state.City,
            Country: this.state.Country,
            ZIPCode: this.state.ZIPCode,
            PhoneNumber: this.state.PhoneNumber,
            Website: this.state.Website,
            BusinessName: this.state.BusinessName,
            BankName: this.state.BankName,
            AccountNumber: this.state.AccountNumber,
        };

        this.setState({
            ShowPreloader: true
        });

        await updateNaqelSettings(updatedNaqelSettings).then(response => {
            this.setState({
                ShowPreloader: false
            });

            if (response.Message === "Naqel settings are updated.") {
                this.props.OnSettingsSaved();
            }
        });
    }

    render() {
        const {
            Street,
            City,
            Country,
            ZIPCode,
            PhoneNumber,
            Website,
            BusinessName,
            BankName,
            AccountNumber,
            ShowPreloader,
            ValidForm,
            Errors
        } = this.state;

        return <section>
            <div style={{ width: "100%", height: "2px", backgroundColor: "#008575" }}></div>
            <div className="h3" style={{ margin: "0px", padding: "10px", backgroundColor: "#EFEFEF", }}>{Dictionary.NaqelSettings}</div>
            <form noValidate onSubmit={this.onSubmit}>
                <div className="entity-list entity-list-expandable">
                    <div className="entity-list-item">
                        <div className="item-icon">
                            <span className="fas fa-map-marker-alt"></span>
                        </div>
                        <div className="item-content-secondary">
                            <div className="form-group">
                                <input type="text" className="form-control" name="Street" autoComplete="off"
                                    value={Street} onChange={this.onChange} style={{ width: "193px", }} />
                            </div>
                        </div>
                        <div className="item-content-primary">
                            <div className="content-text-primary">{Dictionary.Street}</div>
                            <div className="text-danger">{Errors.Street}</div>
                        </div>
                    </div>
                    <div className="entity-list-item">
                        <div className="item-icon">
                            <span className="fas fa-map-marker-alt"></span>
                        </div>
                        <div className="item-content-secondary">
                            <div className="form-group">
                                <input type="text" className="form-control" name="City" autoComplete="off"
                                    value={City} onChange={this.onChange} style={{ width: "193px", }} />
                            </div>
                        </div>
                        <div className="item-content-primary">
                            <div className="content-text-primary">{Dictionary.City}</div>
                            <div className="text-danger">{Errors.City}</div>
                        </div>
                    </div>
                    <div className="entity-list-item">
                        <div className="item-icon">
                            <span className="fas fa-map-marker-alt"></span>
                        </div>
                        <div className="item-content-secondary">
                            <div className="form-group">
                                <input type="text" className="form-control" name="Country" autoComplete="off"
                                    value={Country} onChange={this.onChange} style={{ width: "193px", }} />
                            </div>
                        </div>
                        <div className="item-content-primary">
                            <div className="content-text-primary">{Dictionary.Country}</div>
                            <div className="text-danger">{Errors.Country}</div>
                        </div>
                    </div>
                    <div className="entity-list-item">
                        <div className="item-icon">
                            <span className="fas fa-map-marker-alt"></span>
                        </div>
                        <div className="item-content-secondary">
                            <div className="form-group">
                                <input type="text" className="form-control" name="ZIPCode" autoComplete="off"
                                    value={ZIPCode} onChange={this.onChange} style={{ width: "193px", }} />
                            </div>
                        </div>
                        <div className="item-content-primary">
                            <div className="content-text-primary">{Dictionary.ZIPCode}</div>
                            <div className="text-danger">{Errors.ZIPCode}</div>
                        </div>
                    </div>
                    <div className="entity-list-item">
                        <div className="item-icon">
                            <span className="fas fa-phone"></span>
                        </div>
                        <div className="item-content-secondary">
                            <div className="form-group">
                                <input type="text" className="form-control" name="PhoneNumber" autoComplete="off"
                                    value={PhoneNumber} onChange={this.onChange} style={{ width: "193px", }} />
                            </div>
                        </div>
                        <div className="item-content-primary">
                            <div className="content-text-primary">{Dictionary.PhoneNumber}</div>
                            <div className="text-danger">{Errors.PhoneNumber}</div>
                        </div>
                    </div>
                    <div className="entity-list-item">
                        <div className="item-icon">
                            <span className="fas fa-globe"></span>
                        </div>
                        <div className="item-content-secondary">
                            <div className="form-group">
                                <input type="text" className="form-control" name="Website" autoComplete="off"
                                    value={Website} onChange={this.onChange} style={{ width: "193px", }} />
                            </div>
                        </div>
                        <div className="item-content-primary">
                            <div className="content-text-primary">{Dictionary.Website}</div>
                            <div className="text-danger">{Errors.Website}</div>
                        </div>
                    </div>
                    <div className="entity-list-item">
                        <div className="item-icon">
                            <span className="fas fa-cog"></span>
                        </div>
                        <div className="item-content-secondary">
                            <div className="form-group">
                                <input type="text" className="form-control" name="BusinessName" autoComplete="off"
                                    value={BusinessName} onChange={this.onChange} style={{ width: "193px", }} />
                            </div>
                        </div>
                        <div className="item-content-primary">
                            <div className="content-text-primary">{Dictionary.BusinessName}</div>
                            <div className="text-danger">{Errors.BusinessName}</div>
                        </div>
                    </div>
                    <div className="entity-list-item">
                        <div className="item-icon">
                            <span className="fas fa-cog"></span>
                        </div>
                        <div className="item-content-secondary">
                            <div className="form-group">
                                <input type="text" className="form-control" name="BankName" autoComplete="off"
                                    value={BankName} onChange={this.onChange} style={{ width: "193px", }} />
                            </div>
                        </div>
                        <div className="item-content-primary">
                            <div className="content-text-primary">{Dictionary.BankName}</div>
                            <div className="text-danger">{Errors.BankName}</div>
                        </div>
                    </div>
                    <div className="entity-list-item">
                        <div className="item-icon">
                            <span className="fas fa-list"></span>
                        </div>
                        <div className="item-content-secondary">
                            <div className="form-group">
                                <input type="text" className="form-control" name="AccountNumber" autoComplete="off"
                                    value={AccountNumber} onChange={this.onChange} style={{ width: "193px", }} />
                            </div>
                        </div>
                        <div className="item-content-primary">
                            <div className="content-text-primary">{Dictionary.AccountNumber}</div>
                            <div className="text-danger">{Errors.AccountNumber}</div>
                        </div>
                    </div>
                    <div className="entity-list-item active">
                        <div className="item-icon">
                            <span className="fas fa-save"></span>
                        </div>
                        <div className="item-content-primary">
                            <div className="content-text-primary">{Dictionary.SaveChanges}</div>
                            <div className="content-text-secondary">{Dictionary.Undone}</div>
                        </div>
                        <div className="item-content-expanded">
                            <input type="submit" value={Dictionary.Save} className="btn btn-primary" disabled={!ValidForm} />
                        </div>
                    </div>
                </div>
            </form>
            {ShowPreloader ? <Preloader /> : null}
        </section>;
    }
};

const GetDirection = () => {
    return (!Language || Language === "English") ? "ltr" : "rtl";
};

const Language = sessionStorage.Language;
let Dictionary;

if (Language === "Arabic") {
    Dictionary = {
        NaqelSettings: "إعدادات ناقل",
        Street: "شارع",
        City: "مدينة",
        Country: "بلد",
        ZIPCode: "الرمز البريدي",
        PhoneNumber: "رقم الهاتف",
        Website: "موقع الكتروني",
        BusinessName: "الاسم التجاري",
        BankName: "اسم البنك",
        AccountNumber: "رقم حساب",
        SaveChanges: "حفظ التغييرات؟",
        Undone: ".هذا لا يمكن التراجع عنها",
        Save: "حفظ",
        StreetError: ".الشارع مطلوب",
        CityError: ".المدينة مطلوبة",
        CountryError: ".الدولة مطلوبة",
        ZIPCodeError: ".الرمز البريدي مطلوب",
        PhoneNumberError: ".رقم الهاتف مطلوب",
        WebsiteError: ".الموقع الإلكتروني مطلوب",
        BusinessNameError: ".اسم العمل مطلوب",
        BankNameError: ".اسم البنك مطلوب",
        AccountNumberError: ".رقم الحساب مطلوب",
    };
}
else {
    Dictionary = {
        NaqelSettings: "Naqel Settings",
        Street: "Street",
        City: "City",
        Country: "Country",
        ZIPCode: "ZIP Code",
        PhoneNumber: "Phone Number",
        Website: "Website",
        BusinessName: "Business Name",
        BankName: "Bank Name",
        AccountNumber: "Account Number",
        SaveChanges: "Save Changes?",
        Undone: "This cannot be undone.",
        Save: "Save",
        StreetError: "Street is required.",
        CityError: "City is required.",
        CountryError: "Country is required.",
        ZIPCodeError: "ZIP code is required.",
        PhoneNumberError: "Phone number is required.",
        WebsiteError: "Website is required.",
        BusinessNameError: "Business name is required.",
        BankNameError: "Bank name is required.",
        AccountNumberError: "Account number is required.",
    };
}

export default NaqelSettings;