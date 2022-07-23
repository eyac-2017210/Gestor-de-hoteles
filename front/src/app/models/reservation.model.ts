export class ReservationModel {
    constructor(
        public id: String,
        public user: String,
        public dateStart: Date,
        public days: Number,
        public quantity: Number,
        public hotel: String,
        public rooms: [],
        public events: [],
        public total: Number
    ){

    }
}