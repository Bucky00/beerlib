let Firebase = require('firebase');
//comment

let beerObject = {
    beerID: 1516476457520,
    weekKegOrdered: '1/19/18',
    beername: 'Kathy Ale',
    distributor: 'Shangy',
    kegQuantity: '',
    kegSize: '50L',
    cost: 95.95,
    price: 3.00,
    serving: '16oz',
    tapstyle: 'German Seasonal Tap',
    style: 'Bock',
    tap: 4,
    beerorder: 2
};

class BeerData {
    constructor(dataSrc) {
        this._dataSrc = dataSrc + '/';
        this._beerRec = {
            weekKegOrdered: '1/19/18',
            beername: 'Bucky Ale',
            distributor: 'Shangy',
            kegQuantity: '',
            kegSize: '50L',
            cost: 95.95,
            price: 3.00,
            serving: '16oz',
            tapstyle: 'German Seasonal Tap',
            style: 'Bock',
            tap: 4,
            beerorder: 2
        },
            this._todayDate = new Date().toDateString();
    }

    get beerRec() {
        return this._beerRec;
    };

    get dataSrc() {
        return this._dataSrc;
    };

    async addBeer(beerRec) {

        beerRec.dateStr = this._todayDate;
        beerRec.beerID = new Date().getTime();
        beerRec.dateRec = new Date().getTime();
        beerRec.beerRecOrder = Number.MAX_SAFE_INTEGER - Date.now();

        
        let db = Firebase.database();
        let ref = db.ref(this._dataSrc + beerRec.dateRec);
        //let ref = Firebase.database().ref(this._dataSrc + beerRec.dateRec);
        await ref.set(beerRec);


    }

    async editBeer(beerRec, beerID) {

        beerRec.dateStr = this._todayDate;

        
        let db = Firebase.database();
        let ref = db.ref(this._dataSrc).orderByChild("beerID").equalTo(beerID);

        await ref.once("child_added", function (snapshot) {
            snapshot.ref.update(beerRec)
        });

    }

    async removeBeer(beerID) {

        
        let db = Firebase.database();
        let ref = db.ref(this._dataSrc).orderByChild('beerID').equalTo(beerID);
        await ref.once("child_added", function (snapshot) {
            snapshot.ref.remove()
        });

    }

    getBeers(orderByFld, callback) {

        //initialize Firebase DB
        let db = Firebase.database();
        let ref = db.ref(this._dataSrc).orderByChild(orderByFld);
        ref.on("value", snapshot => {
            // to maintain sort, get posts via forEach
            const beers = [];
            snapshot.forEach(c => {
                beers.push(c.val());
            });
            //console.log(beers); Removed

            callback(beers);
        });
    }

    getABeerRec(beerID, callback) {

        let db = Firebase.database();
        let ref = db.ref(this._dataSrc);
        ref.orderByChild('beerID').equalTo(beerID).on("child_added", beerRecord => {
            //console.log(beerRecord.val());
            callback(beerRecord.val());
        });
    }
}

class KickedBeer extends BeerData {
    constructor() {
        super('deadKegs');
    }
}

class LiveBeers extends BeerData {
    constructor() {
        super('beerInv');
    }
}

class ReOrderBeers extends BeerData {
    constructor() {
        super('reOrderBeers');
    }
}

class BeerOrders extends BeerData {
    constructor() {
        super('beerOrders');
    }
}

//specific 
class LLKBeer {
    constructor(dataSrc, beerObject) {
    }
    //Create Objects, create methods like move data, resort, etc.
    //const BeerOrders = new BeerOrders();
    //const newBeer = new BeerOrders(); test

    async initFirebase(config) {
        if (!Firebase.apps || Firebase.apps.length == 0) {
            Firebase.initializeApp(config);
        }
    }

    get BeerOrders() {
        return BeerOrders;
    }

    get ReOrderBeers() {
        return ReOrderBeers;
    }
    
    get LiveBeers() {
        return LiveBeers;
    }
    
    get KickedBeer() {
        return KickedBeer;
    }    
}

//const beer = new BeerOrders();

//Add
//beer.addBeer(beerObject);

//Edit
//beerObject.beername = "Honey Ale"
//beer.editBeer(beerObject, beerObject.beerID);

//Remove
//beer.removeBeer(beerObject.beerID);

//Get rec
//let locBeerRec = beer.getABeerRec(1516476457520);
//console.log(locBeerRec);
//console.log(locBeerRec.beername);

//Get Recs
//beer.getBeers('beername', (beers) => {
//    console.log(beers);
//});


//process.exit(0);

export default new LLKBeer();