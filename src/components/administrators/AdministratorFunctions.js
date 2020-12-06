import axios from "axios";
import Strings from "../../res/strings";

// POST: Register
export const registerAdministrator = async newCredentials => {
    return await axios.post(`${Strings.NAQEL_SERVER}administrators/register`, {
        Username: newCredentials.Username,
        PhoneNumber: newCredentials.PhoneNumber,
        Password: newCredentials.Password,
        RegisterAs: newCredentials.RegisterAs,
    }).then(response => {
        return response.data;
    });
};

// POST: AccountSetup
export const setupAdministratorAccount = async newAdministrator => {
    return await axios.post(`${Strings.NAQEL_SERVER}administrators/setupAccount`, {
        Username: newAdministrator.Username,
        Email: newAdministrator.Email,
        Password: newAdministrator.Password,
        RegisterAs: newAdministrator.RegisterAs,
        Email: newAdministrator.Email,
        FirstName: newAdministrator.FirstName,
        LastName: newAdministrator.LastName,
        AdministratorSecret: newAdministrator.AdministratorSecret
    }).then(response => {
        return response.data;
    });
};

// POST: Login
export const loginAdministrator = async administrator => {
    console.log(`Sending HTTP POST request on ${Strings.NAQEL_SERVER}administrators/login`);
    return await axios.post(`${Strings.NAQEL_SERVER}administrators/login`, {
        PhoneNumberOrUsername: administrator.PhoneNumberOrUsername,
        Password: administrator.Password,
        SignInAs: administrator.SignInAs,
    }).then(response => {
        return response.data;
    })
};

// POST: RecoverPassword
export const recoverPassword = async recoverPasswordPackage => {
    return await axios.post(`${Strings.NAQEL_SERVER}administrators/recoverPassword`, {
        PhoneNumber: recoverPasswordPackage.PhoneNumber,
        Password: recoverPasswordPackage.Password
    }).then(response => {
        return response.data;
    });
};

// GET: GetData
export const getData = async request => {
    console.log(`Sending GET request to ${Strings.NAQEL_SERVER}administrators/get${request.Get}...`);
    return await axios.get(`${Strings.NAQEL_SERVER}administrators/get${request.Get}`, {
        params: request.Params,
        headers: { Authorization: `JWT ${request.Token}` }
    }).then(response => {
        return response.data;
    });
};

// GET: GetPublicData
export const getPublicData = async request => {
    console.log(`Sending GET request to ${Strings.NAQEL_SERVER}users/get${request.Get}...`);
    return await axios.get(`${Strings.NAQEL_SERVER}users/get${request.Get}`, {
        params: request.Params
    }).then(response => {
        return response.data;
    });
};

// POST: uploadProfilePhoto
export const uploadProfilePhoto = async profilePhoto => {
    console.log(`Sending HTTP POST request to ${Strings.NAQEL_SERVER}administrators/uploadProfilePhoto`);
    return await axios.post(`${Strings.NAQEL_SERVER}administrators/uploadProfilePhoto`, {
        PhotoURL: profilePhoto.PhotoURL
    }, {
        headers: { Authorization: `JWT ${profilePhoto.Token}` }
    }).then(response => {
        return response.data;
    });
};

// POST: GeneralSettings
export const generalSettings = async updatedAdministrator => {
    return await axios.post(`${Strings.NAQEL_SERVER}administrators/generalSettings`, {
        FirstName: updatedAdministrator.FirstName,
        LastName: updatedAdministrator.LastName,
        PhoneNumber: updatedAdministrator.PhoneNumber
    }, {
        headers: { Authorization: `JWT ${updatedAdministrator.Token}` }
    }).then(response => {
        return response.data;
    });
};

// POST: ValidateUsername
export const validateUsername = async username => {
    return await axios.post(`${Strings.NAQEL_SERVER}administrators/validateUsername`, {
        Username: username
    }).then(response => {
        return response.data;
    });
};

// POST: ValidateEmail
export const validateEmail = async email => {
    return await axios.post(`${Strings.NAQEL_SERVER}administrators/validateEmail`, {
        Email: email
    }).then(response => {
        return response.data;
    });
};

// POST: ValidatePhoneNumber
export const validatePhoneNumber = async phoneNumber => {
    return await axios.post(`${Strings.NAQEL_SERVER}administrators/validatePhoneNumber`, {
        PhoneNumber: phoneNumber
    }).then(response => {
        return response.data;
    });
};

// POSTL SendCode
export const sendCode = async email => {
    console.log(`Sending HTTP POST request to ${Strings.NAQEL_SERVER}users/sendCode...`);
    return await axios.post(`${Strings.NAQEL_SERVER}users/sendCode`, {
        Email: email
    }).then(response => {
        return response.data;
    });
};

// POST: UsernameAndEmailSettings
export const usernameAndEmailSettings = async updatedAdministrator => {
    console.log(`Sending HTTP POST request to ${Strings.NAQEL_SERVER}administrators/usernameAndEmailSettings...`);
    return await axios.post(`${Strings.NAQEL_SERVER}administrators/usernameAndEmailSettings`, {
        Username: updatedAdministrator.Username,
        Email: updatedAdministrator.Email
    }, {
        headers: { Authorization: `JWT ${updatedAdministrator.Token}` }
    }).then(response => {
        return response.data;
    });
};

// POST: ValidatePassword
export const validatePassword = async passwordPackage => {
    return await axios.post(`${Strings.NAQEL_SERVER}administrators/validatePassword`, {
        Password: passwordPackage.Password
    }, {
        headers: { Authorization: `JWT ${passwordPackage.Token}` }
    }).then(response => {
        return response.data;
    });
};

// POST: PasswordSettings
export const passwordSettings = async updatedAdministrator => {
    return await axios.post(`${Strings.NAQEL_SERVER}administrators/passwordSettings`, {
        Password: updatedAdministrator.Password,
    }, {
        headers: { Authorization: `JWT ${updatedAdministrator.Token}` }
    }).then(response => {
        return response.data;
    });
};

// POST: UpdateNaqelSettings
export const updateNaqelSettings = async updatedNaqelSettings => {
    return await axios.post(`${Strings.NAQEL_SERVER}administrators/updateNaqelSettings`, {
        Street: updatedNaqelSettings.Street,
        City: updatedNaqelSettings.City,
        Country: updatedNaqelSettings.Country,
        ZIPCode: updatedNaqelSettings.ZIPCode,
        PhoneNumber: updatedNaqelSettings.PhoneNumber,
        Website: updatedNaqelSettings.Website,
        BusinessName: updatedNaqelSettings.BusinessName,
        BankName: updatedNaqelSettings.BankName,
        AccountNumber: updatedNaqelSettings.AccountNumber,
    }, {
        headers: { Authorization: `JWT ${updatedNaqelSettings.Token}` }
    }).then(response => {
        return response.data;
    });
};

// POST: UpdateAdminSecret
export const updateAdminSecret = async updatedAdminSecret => {
    return await axios.post(`${Strings.NAQEL_SERVER}administrators/updateAdminSecret`, {
        AdminSecret: updatedAdminSecret.AdminSecret,
    }, {
        headers: { Authorization: `JWT ${updatedAdminSecret.Token}` }
    }).then(response => {
        return response.data;
    });
};

// POST: ActivateDriverAccount
export const activateDriverAccount = async activatedDriver => {
    console.log(`Sending HTTP POST request to ${Strings.NAQEL_SERVER}administrators/activateDriverAccount...`);
    return await axios.post(`${Strings.NAQEL_SERVER}administrators/activateDriverAccount`, {
        DriverID: activatedDriver.DriverID
    }, {
        headers: { Authorization: `JWT ${activatedDriver.Token}` }
    }).then(response => {
        return response.data;
    });
};

// POST: BlockDriverAccount
export const blockDriverAccount = async blockedDriver => {
    console.log(`Sending HTTP POST request to ${Strings.NAQEL_SERVER}administrators/blockDriverAccount...`);
    return await axios.post(`${Strings.NAQEL_SERVER}administrators/blockDriverAccount`, {
        DriverID: blockedDriver.DriverID,
        BlockDate: blockedDriver.BlockDate,
        Reason: blockedDriver.Reason
    }, {
        headers: { Authorization: `JWT ${blockedDriver.Token}` }
    }).then(response => {
        return response.data;
    });
};

// POST: UnblockDriverAccount
export const unblockDriverAccount = async unblockedDriver => {
    console.log(`Sending HTTP POST request to ${Strings.NAQEL_SERVER}administrators/unblockDriverAccount...`);
    return await axios.post(`${Strings.NAQEL_SERVER}administrators/unblockDriverAccount`, {
        DriverID: unblockedDriver.DriverID,
    }, {
        headers: { Authorization: `JWT ${unblockedDriver.Token}` }
    }).then(response => {
        return response.data;
    });
};

// POST: SetRefundRate
export const setRefundRate = async traderRefundRate => {
    console.log(`Sending HTTP POST request to ${Strings.NAQEL_SERVER}administrators/setRefundRate...`);
    return await axios.post(`${Strings.NAQEL_SERVER}administrators/setRefundRate`, {
        TraderID: traderRefundRate.TraderID,
        RefundRate: traderRefundRate.RefundRate
    }, {
        headers: { Authorization: `JWT ${traderRefundRate.Token}` }
    }).then(response => {
        return response.data;
    });
};

// POST: ExonerateTrader
export const exonerateTrader = async exoneratedTrader => {
    return await axios.post(`${Strings.NAQEL_SERVER}administrators/exonerateTrader`, {
        TraderID: exoneratedTrader.TraderID,
        ExonerateDate: exoneratedTrader.ExonerateDate,
        Reason: exoneratedTrader.Reason
    }, {
        headers: { Authorization: `JWT ${exoneratedTrader.Token}` }
    }).then(response => {
        return response.data;
    });
};

// POST: ChargeTrader
export const chargeTrader = async chargedTrader => {
    return await axios.post(`${Strings.NAQEL_SERVER}administrators/chargeTrader`, {
        TraderID: chargedTrader.TraderID,
    }, {
        headers: { Authorization: `JWT ${chargedTrader.Token}` }
    }).then(response => {
        return response.data;
    });
};

// POST: AddTraderObjectionReason
export const addTraderObjectionReason = async newTraderObjectionReason => {
    console.log(`Sending HTTP POST request to ${Strings.NAQEL_SERVER}administrators/addTraderObjectionReason...`);
    return await axios.post(`${Strings.NAQEL_SERVER}administrators/addTraderObjectionReason`, {
        Reason: newTraderObjectionReason.Reason
    }, {
        headers: { Authorization: `JWT ${newTraderObjectionReason.Token}` }
    }).then(response => {
        return response.data;
    });
};

// DELETE: DeleteTraderObjectionReason
export const deleteTraderObjectionReason = async discardedTraderObjectionReason => {
    console.log(`Sending HTTP DELETE request to ${Strings.NAQEL_SERVER}administrators/deleteTraderObjectionReason...`);
    return await axios.delete(`${Strings.NAQEL_SERVER}administrators/deleteTraderObjectionReason`, {
        headers: { Authorization: `JWT ${discardedTraderObjectionReason.Token}` },
        data: { DriverObjectionReasonID: discardedTraderObjectionReason.DriverObjectionReasonID }
    }).then(response => {
        return response.data;
    });
};

// POST: verifyTraderObjectionReason
export const verifyTraderObjectionReason = async verifiedTraderObjectionReason => {
    console.log(`Sending HTTP POST request to ${Strings.NAQEL_SERVER}administrators/verifyTraderObjectionReason...`);
    return await axios.post(`${Strings.NAQEL_SERVER}administrators/verifyTraderObjectionReason`, {
        DriverObjectionReasonID: verifiedTraderObjectionReason.DriverObjectionReasonID
    }, {
        headers: { Authorization: `JWT ${verifiedTraderObjectionReason.Token}` }
    }).then(response => {
        return response.data;
    });
};

// POST: AddDriverObjectionReason
export const addDriverObjectionReason = async newDriverObjectionReason => {
    console.log(`Sending HTTP POST request to ${Strings.NAQEL_SERVER}administrators/addDriverObjectionReason...`);
    return await axios.post(`${Strings.NAQEL_SERVER}administrators/addDriverObjectionReason`, {
        Reason: newDriverObjectionReason.Reason
    }, {
        headers: { Authorization: `JWT ${newDriverObjectionReason.Token}` }
    }).then(response => {
        return response.data;
    });
};

// DELETE: DeleteDriverObjectionReason
export const deleteDriverObjectionReason = async discardedDriverObjectionReason => {
    console.log(`Sending HTTP DELETE request to ${Strings.NAQEL_SERVER}administrators/deleteDriverObjectionReason...`);
    return await axios.delete(`${Strings.NAQEL_SERVER}administrators/deleteDriverObjectionReason`, {
        headers: { Authorization: `JWT ${discardedDriverObjectionReason.Token}` },
        data: { DriverObjectionReasonID: discardedDriverObjectionReason.DriverObjectionReasonID }
    }).then(response => {
        return response.data;
    });
};

// POST: verifyDriverObjectionReason
export const verifyDriverObjectionReason = async verifiedDriverObjectionReason => {
    console.log(`Sending HTTP POST request to ${Strings.NAQEL_SERVER}administrators/verifyDriverObjectionReason...`);
    return await axios.post(`${Strings.NAQEL_SERVER}administrators/verifyDriverObjectionReason`, {
        DriverObjectionReasonID: verifiedDriverObjectionReason.DriverObjectionReasonID
    }, {
        headers: { Authorization: `JWT ${verifiedDriverObjectionReason.Token}` }
    }).then(response => {
        return response.data;
    });
};

// DELETE: DiscardObjectionableJob
export const discardObjectionableJob = async discardedObjectionableJob => {
    console.log(`Sending HTTP DELETE request to ${Strings.NAQEL_SERVER}administrators/discardObjectionableJob...`);
    return await axios.delete(`${Strings.NAQEL_SERVER}administrators/discardObjectionableJob`, {
        headers: { Authorization: `JWT ${discardedObjectionableJob.Token}` },
        data: { OnGoingJobID: discardedObjectionableJob.OnGoingJobID }
    }).then(response => {
        return response.data;
    });
};

// POST: AddDriverAnswer
export const addDriverAnswer = async driverAnswer => {
    console.log(`Sending HTTP POST request to ${Strings.NAQEL_SERVER}administrators/addDriverAnswer...`);
    return await axios.post(`${Strings.NAQEL_SERVER}administrators/addDriverAnswer`, {
        DriverQuestionID: driverAnswer.DriverQuestionID,
        Answer: driverAnswer.Answer
    }, {
        headers: { Authorization: `JWT ${driverAnswer.Token}` }
    }).then(response => {
        return response.data;
    });
};

// POST: AddDriverQuestionClass
export const addDriverQuestionClass = async newDriverQuestionClass => {
    console.log(`Sending HTTP POST request to ${Strings.NAQEL_SERVER}administrators/addDriverQuestionClass...`);
    return await axios.post(`${Strings.NAQEL_SERVER}administrators/addDriverQuestionClass`, {
        Class: newDriverQuestionClass.Class
    }, {
        headers: { Authorization: `JWT ${newDriverQuestionClass.Token}` }
    }).then(response => {
        return response.data;
    });
};

// POST: ClassifyDriverQuestion
export const classifyDriverQuestion = async classifiedDriverQuestion => {
    console.log(`Sending HTTP POST request to ${Strings.NAQEL_SERVER}administrators/classifyDriverQuestion...`);
    return await axios.post(`${Strings.NAQEL_SERVER}administrators/classifyDriverQuestion`, {
        DriverQuestionID: classifiedDriverQuestion.DriverQuestionID,
        Class: classifiedDriverQuestion.Class
    }, {
        headers: { Authorization: `JWT ${classifiedDriverQuestion.Token}` }
    }).then(response => {
        return response.data;
    });
};

// POST: AddTraderAnswer
export const addTraderAnswer = async traderAnswer => {
    console.log(`Sending HTTP POST request to ${Strings.NAQEL_SERVER}administrators/addTraderAnswer...`);
    return await axios.post(`${Strings.NAQEL_SERVER}administrators/addTraderAnswer`, {
        TraderQuestionID: traderAnswer.TraderQuestionID,
        Answer: traderAnswer.Answer
    }, {
        headers: { Authorization: `JWT ${traderAnswer.Token}` }
    }).then(response => {
        return response.data;
    });
};

// POST: AddTraderQuestionClass
export const addTraderQuestionClass = async newTraderQuestionClass => {
    console.log(`Sending HTTP POST request to ${Strings.NAQEL_SERVER}administrators/addTraderQuestionClass...`);
    return await axios.post(`${Strings.NAQEL_SERVER}administrators/addTraderQuestionClass`, {
        Class: newTraderQuestionClass.Class
    }, {
        headers: { Authorization: `JWT ${newTraderQuestionClass.Token}` }
    }).then(response => {
        return response.data;
    });
};

// POST: ClassifyTraderQuestion
export const classifyTraderQuestion = async classifiedTraderQuestion => {
    console.log(`Sending HTTP POST request to ${Strings.NAQEL_SERVER}administrators/classifyTraderQuestion...`);
    return await axios.post(`${Strings.NAQEL_SERVER}administrators/classifyTraderQuestion`, {
        TraderQuestionID: classifiedTraderQuestion.TraderQuestionID,
        Class: classifiedTraderQuestion.Class
    }, {
        headers: { Authorization: `JWT ${classifiedTraderQuestion.Token}` }
    }).then(response => {
        return response.data;
    });
};

// POST: AddResponsibleAnswer
export const addResponsibleAnswer = async responsibleAnswer => {
    return await axios.post(`${Strings.NAQEL_SERVER}administrators/addResponsibleAnswer`, {
        ResponsibleQuestionID: responsibleAnswer.ResponsibleQuestionID,
        Answer: responsibleAnswer.Answer
    }, {
        headers: { Authorization: `JWT ${responsibleAnswer.Token}` }
    }).then(response => {
        return response.data;
    });
};

// POST: AddResponsibleQuestionClass
export const addResponsibleQuestionClass = async newResponsibleQuestionClass => {
    return await axios.post(`${Strings.NAQEL_SERVER}administrators/addResponsibleQuestionClass`, {
        Class: newResponsibleQuestionClass.Class
    }, {
        headers: { Authorization: `JWT ${newResponsibleQuestionClass.Token}` }
    }).then(response => {
        return response.data;
    });
};

// POST: ClassifyResponsibleQuestion
export const classifyResponsibleQuestion = async classifiedResponsibleQuestion => {
    return await axios.post(`${Strings.NAQEL_SERVER}administrators/classifyResponsibleQuestion`, {
        ResponsibleQuestionID: classifiedResponsibleQuestion.ResponsibleQuestionID,
        Class: classifiedResponsibleQuestion.Class
    }, {
        headers: { Authorization: `JWT ${classifiedResponsibleQuestion.Token}` }
    }).then(response => {
        return response.data;
    });
};

// POST: SetGlobalFeeRate
export const setGlobalFeeRate = async feeRate => {
    console.log(`Sending HTTP POST request to ${Strings.NAQEL_SERVER}administrators/setGlobalFeeRate...`);
    return await axios.post(`${Strings.NAQEL_SERVER}administrators/setGlobalFeeRate`, {
        FeeRate: feeRate.FeeRate
    }, {
        headers: { Authorization: `JWT ${feeRate.Token}` }
    }).then(response => {
        return response.data;
    });
};

// POST: SetTemporaryFeeRate
export const setTemporaryFeeRate = async temporaryFeeRateDate => {
    console.log(`Sending HTTP POST request to ${Strings.NAQEL_SERVER}administrators/setTemporaryFeeRate...`);
    return await axios.post(`${Strings.NAQEL_SERVER}administrators/setTemporaryFeeRate`, {
        FeeRate: temporaryFeeRateDate.FeeRate,
        Date: temporaryFeeRateDate.Date
    }, {
        headers: { Authorization: `JWT ${temporaryFeeRateDate.Token}` }
    }).then(response => {
        return response.data;
    });
};

// POST: ClearTemporaryFeeRate
export const clearTemporaryFeeRate = async clearedtemporaryFeeRate => {
    console.log(`Sending HTTP POST request to ${Strings.NAQEL_SERVER}administrators/clearTemporaryFeeRate...`);
    return await axios.post(`${Strings.NAQEL_SERVER}administrators/clearTemporaryFeeRate`, {}, {
        headers: { Authorization: `JWT ${clearedtemporaryFeeRate.Token}` }
    }).then(response => {
        return response.data;
    });
};

// POST: AddPriceRange
export const addPriceRange = async newPriceRange => {
    console.log(`Sending HTTP POST request to ${Strings.NAQEL_SERVER}administrators/addPriceRange...`);
    return await axios.post(`${Strings.NAQEL_SERVER}administrators/addPriceRange`, {
        StartRange: newPriceRange.StartRange,
        EndRange: newPriceRange.EndRange,
        FeeRate: newPriceRange.FeeRate
    }, {
        headers: { Authorization: `JWT ${newPriceRange.Token}` }
    }).then(response => {
        return response.data;
    });
};

// POST: UpdatePriceRange
export const updatePriceRange = async updatedPriceRange => {
    console.log(`Sending HTTP POST request to ${Strings.NAQEL_SERVER}administrators/updatePriceRange...`);
    return await axios.post(`${Strings.NAQEL_SERVER}administrators/updatePriceRange`, {
        PriceRangeID: updatedPriceRange.PriceRangeID,
        FeeRate: updatedPriceRange.FeeRate
    }, {
        headers: { Authorization: `JWT ${updatedPriceRange.Token}` }
    }).then(response => {
        return response.data;
    });
};

// DELETE: DeletePriceRange
export const deletePriceRange = async discardedPriceRange => {
    console.log(`Sending HTTP DELETE request to ${Strings.NAQEL_SERVER}administrators/deletePriceRange...`);
    return await axios.delete(`${Strings.NAQEL_SERVER}administrators/deletePriceRange`, {
        headers: { Authorization: `JWT ${discardedPriceRange.Token}` },
        data: { PriceRangeID: discardedPriceRange.PriceRangeID }
    }).then(response => {
        return response.data;
    });
};

// POST: AddTraderRate
export const addTraderRate = async newTraderRate => {
    console.log(`Sending HTTP POST request to ${Strings.NAQEL_SERVER}administrators/addTraderRate...`);
    return await axios.post(`${Strings.NAQEL_SERVER}administrators/addTraderRate`, {
        Username: newTraderRate.Username,
        FeeRate: newTraderRate.FeeRate
    }, {
        headers: { Authorization: `JWT ${newTraderRate.Token}` }
    }).then(response => {
        return response.data;
    });
};

// POST: UpdateTraderRate
export const updateTraderRate = async updatedTraderRate => {
    console.log(`Sending HTTP POST request to ${Strings.NAQEL_SERVER}administrators/updateTraderRate...`);
    return await axios.post(`${Strings.NAQEL_SERVER}administrators/updateTraderRate`, {
        TraderRateID: updatedTraderRate.TraderRateID,
        FeeRate: updatedTraderRate.FeeRate
    }, {
        headers: { Authorization: `JWT ${updatedTraderRate.Token}` }
    }).then(response => {
        return response.data;
    });
};

// DELETE: DeleteTraderRate
export const deleteTraderRate = async discardedTraderRate => {
    console.log(`Sending HTTP DELETE request to ${Strings.NAQEL_SERVER}administrators/deleteTraderRate...`);
    return await axios.delete(`${Strings.NAQEL_SERVER}administrators/deleteTraderRate`, {
        headers: { Authorization: `JWT ${discardedTraderRate.Token}` },
        data: { TraderRateID: discardedTraderRate.TraderRateID }
    }).then(response => {
        return response.data;
    });
};

// POST: ApproveDiverPayProof
export const approveDriverPayProof = async approvedDriverPayProof => {
    console.log(`Sending HTTP POST request to ${Strings.NAQEL_SERVER}administrators/approveDriverPayProof...`);
    return await axios.post(`${Strings.NAQEL_SERVER}administrators/approveDriverPayProof`, {
        DriverPayProofID: approvedDriverPayProof.DriverPayProofID
    }, {
        headers: { Authorization: `JWT ${approvedDriverPayProof.Token}` }
    }).then(response => {
        return response.data;
    });
};

// POST: AddWaitingTime
export const addWaitingTime = async newWaitingTime => {
    console.log(`Sending HTTP POST request to ${Strings.NAQEL_SERVER}administrators/addWaitingTime...`);
    return await axios.post(`${Strings.NAQEL_SERVER}administrators/addWaitingTime`, {
        WaitingTime: newWaitingTime.WaitingTime
    }, {
        headers: { Authorization: `JWT ${newWaitingTime.Token}` }
    }).then(response => {
        return response.data;
    });
};

// DELETE: DeleteWaitingTime
export const deleteWaitingTime = async discardedWaitingTime => {
    console.log(`Sending HTTP DELETE request to ${Strings.NAQEL_SERVER}administrators/deleteWaitingTime...`);
    return await axios.delete(`${Strings.NAQEL_SERVER}administrators/deleteWaitingTime`, {
        headers: { Authorization: `JWT ${discardedWaitingTime.Token}` },
        data: { WaitingTimeID: discardedWaitingTime.WaitingTimeID }
    }).then(response => {
        return response.data;
    });
};

// POST: AddTruckSize
export const addTruckSize = async newTruckSize => {
    console.log(`Sending HTTP POST request to ${Strings.NAQEL_SERVER}administrators/addTruckSize...`);
    return await axios.post(`${Strings.NAQEL_SERVER}administrators/addTruckSize`, {
        TruckSize: newTruckSize.TruckSize
    }, {
        headers: { Authorization: `JWT ${newTruckSize.Token}` }
    }).then(response => {
        return response.data;
    });
};

// DELETE: DeleteTruckSize
export const deleteTruckSize = async discardedTruckSize => {
    console.log(`Sending HTTP DELETE request to ${Strings.NAQEL_SERVER}administrators/deleteTruckSize...`);
    return await axios.delete(`${Strings.NAQEL_SERVER}administrators/deleteTruckSize`, {
        headers: { Authorization: `JWT ${discardedTruckSize.Token}` },
        data: { TruckSizeID: discardedTruckSize.TruckSizeID }
    }).then(response => {
        return response.data;
    });
};

// POST: AddTruckType
export const addTruckType = async newTruckType => {
    console.log(`Sending HTTP POST request to ${Strings.NAQEL_SERVER}administrators/addTruckType...`);
    return await axios.post(`${Strings.NAQEL_SERVER}administrators/addTruckType`, {
        TruckType: newTruckType.TruckType
    }, {
        headers: { Authorization: `JWT ${newTruckType.Token}` }
    }).then(response => {
        return response.data;
    });
};

// DELETE: DeleteTruckType
export const deleteTruckType = async discardedTruckType => {
    console.log(`Sending HTTP DELETE request to ${Strings.NAQEL_SERVER}administrators/deleteTruckType...`);
    return await axios.delete(`${Strings.NAQEL_SERVER}administrators/deleteTruckType`, {
        headers: { Authorization: `JWT ${discardedTruckType.Token}` },
        data: { TruckTypeID: discardedTruckType.TruckTypeID }
    }).then(response => {
        return response.data;
    });
};

// POST: AddPermitType
export const addPermitType = async newPermitType => {
    console.log(`Sending HTTP POST request to ${Strings.NAQEL_SERVER}administrators/addPermitType...`);
    return await axios.post(`${Strings.NAQEL_SERVER}administrators/addPermitType`, {
        PermitType: newPermitType.PermitType
    }, {
        headers: { Authorization: `JWT ${newPermitType.Token}` }
    }).then(response => {
        return response.data;
    });
};

// DELETE: DeletePermitType
export const deletePermitType = async discardedPermitType => {
    console.log(`Sending HTTP DELETE request to ${Strings.NAQEL_SERVER}administrators/deletePermitType...`);
    return await axios.delete(`${Strings.NAQEL_SERVER}administrators/deletePermitType`, {
        headers: { Authorization: `JWT ${discardedPermitType.Token}` },
        data: { PermitTypeID: discardedPermitType.PermitTypeID }
    }).then(response => {
        return response.data;
    });
};