export class RoomModel {
    constructor(
        public id: String,
        public type: String,
        public available: number,
        public price: number,
        public hotel: String,
    ){

    }
}