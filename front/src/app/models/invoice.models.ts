export class invoiceModel {
    constructor(
        public id: String,
        public user: String,
        public hotel: String,
        public dateStart: Date,
        public days: Number,
        public total: Number,
        public condition: String
    ){

    }
}