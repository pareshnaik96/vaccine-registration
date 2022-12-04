export interface IUser {
    role: string;
    name: string;
    phoneNumber: string;
    age: number;
    pincode: number;
    aadharNo: string;
    password: string;
}

export interface ISlot {
    date: string;
    time: string;
    bookedSlot: number;
    availableSlot: number;
}

export interface IBooking {
    doseType: string;
    slotDate: string;
    slotTime: string;
    status: string;
    cancellable: boolean;
}